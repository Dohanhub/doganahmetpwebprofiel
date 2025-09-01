import express from 'express';
import rateLimit from 'express-rate-limit';
import { 
  insertContactSchema,
  insertConsultationSchema,
  insertTestimonialSchema,
  insertProjectSchema,
  insertProjectCalculationSchema
} from '../shared/schema.js';
import { storage } from './storage.js';
import { getOpenAI, generateChatResponse, generateSummaryClean as generateSummary } from './services/openai.js';

const router = express.Router();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
router.use(limiter);

// Contact form endpoint
router.post('/contact', async (req, res) => {
  try {
    // Validate input
    const validatedData = insertContactSchema.parse(req.body);
    
    // Insert contact
    const result = await storage.createContact(validatedData);
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.id
    });
    
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.errors
      });
    }
    
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all contacts (for admin purposes)
router.get('/contacts', async (_req, res) => {
  try {
    const contacts = await storage.getContacts();
    res.json({
      success: true,
      contacts
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Chat endpoint with separate rate limiting
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 messages per minute
  message: {
    error: 'Too many chat messages, please wait a moment before continuing the conversation.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Chat endpoint for AI-powered conversations
router.post('/chat', chatLimiter, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Message is required and must be a string'
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Message too long. Please keep messages under 1000 characters.'
      });
    }

    // Generate AI response
    const aiResponse = await generateChatResponse(message, conversationHistory);
    
    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'I apologize for the technical difficulty. Please try again or use the contact form for immediate assistance.',
      fallback: true
    });
  }
});

// Streaming chat via Server-Sent Events
router.post('/chat/stream', chatLimiter, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body || {};

    if (!message || typeof message !== 'string') {
      res.status(400).json({ success: false, message: 'Message is required and must be a string' });
      return;
    }

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const client = getOpenAI();
    if (!client) {
      // Fallback: send single response
      res.write(`data: ${JSON.stringify({ delta: 'AI service is not configured. Please set OPENAI_API_KEY.' })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }

    // Prepare messages
    const history = Array.isArray(conversationHistory) ? conversationHistory.slice(-6) : [];
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      ...history,
      { role: 'user', content: message },
    ];

    const stream = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages,
      temperature: 0.7,
      stream: true,
    });

    for await (const chunk of stream) {
      const delta = chunk.choices?.[0]?.delta?.content || '';
      if (delta) {
        res.write(`data: ${JSON.stringify({ delta })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Streaming chat error:', error);
    try {
      res.write(`event: error\n`);
      res.write(`data: ${JSON.stringify({ message: 'Streaming failed' })}\n\n`);
    } catch {}
    res.end();
  }
});

// Conversation summary endpoint
router.post('/chat/summary', async (req, res) => {
  try {
    const { conversation } = req.body;
    
    if (!conversation || !Array.isArray(conversation)) {
      return res.status(400).json({
        success: false,
        message: 'Conversation history is required'
      });
    }

    const summary = await generateSummary(conversation);
    
    res.json({
      success: true,
      summary
    });
    
  } catch (error: any) {
    console.error('Summary generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to generate conversation summary'
    });
  }
});

// Consultation endpoints
router.post('/consultations', async (req, res) => {
  try {
    const validatedData = insertConsultationSchema.parse(req.body);
    const consultation = await storage.createConsultation(validatedData);
    res.status(201).json({
      success: true,
      consultation
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.errors
      });
    }
    console.error('Consultation creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book consultation'
    });
  }
});

router.get('/consultations', async (req, res) => {
  try {
    const consultations = await storage.getConsultations();
    res.json({
      success: true,
      consultations
    });
  } catch (error: any) {
    console.error('Get consultations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consultations'
    });
  }
});

// Project calculation endpoints
router.post('/project-calculations', async (req, res) => {
  try {
    const validatedData = insertProjectCalculationSchema.parse(req.body);
    const calculation = await storage.createProjectCalculation(validatedData);
    res.status(201).json({
      success: true,
      calculation
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.errors
      });
    }
    console.error('Project calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save calculation'
    });
  }
});

router.get('/project-calculations', async (req, res) => {
  try {
    const calculations = await storage.getProjectCalculations();
    res.json({
      success: true,
      calculations
    });
  } catch (error: any) {
    console.error('Get calculations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch calculations'
    });
  }
});

// Testimonial endpoints
router.post('/testimonials', async (req, res) => {
  try {
    const validatedData = insertTestimonialSchema.parse(req.body);
    const testimonial = await storage.createTestimonial(validatedData);
    res.status(201).json({
      success: true,
      testimonial
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.errors
      });
    }
    console.error('Testimonial creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create testimonial'
    });
  }
});

router.get('/testimonials', async (req, res) => {
  try {
    const { industry, country, featured } = req.query;
    const filters: any = {};
    if (industry) filters.industry = industry as string;
    if (country) filters.country = country as string;
    if (featured !== undefined) filters.featured = featured === 'true';
    
    const testimonials = await storage.getTestimonials(filters);
    res.json({
      success: true,
      testimonials
    });
  } catch (error: any) {
    console.error('Get testimonials error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonials'
    });
  }
});

// Project endpoints
router.post('/projects', async (req, res) => {
  try {
    const validatedData = insertProjectSchema.parse(req.body);
    const project = await storage.createProject(validatedData);
    res.status(201).json({
      success: true,
      project
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.errors
      });
    }
    console.error('Project creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
});

router.get('/projects', async (req, res) => {
  try {
    const { industry, country, featured } = req.query;
    const filters: any = {};
    if (industry) filters.industry = industry as string;
    if (country) filters.country = country as string;
    if (featured !== undefined) filters.featured = featured === 'true';
    
    const projects = await storage.getProjects(filters);
    res.json({
      success: true,
      projects
    });
  } catch (error: any) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const project = await storage.getProject(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    res.json({
      success: true,
      project
    });
  } catch (error: any) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
});

export default router;
