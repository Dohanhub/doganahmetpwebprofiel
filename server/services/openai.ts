import OpenAI from "openai";
import { config } from "../../shared/config.js";

// Lazy OpenAI client creation to avoid errors when API key is missing
export function getOpenAI(): OpenAI | null {
  if (!config.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: config.OPENAI_API_KEY });
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are Eline, a sophisticated AI assistant representing Ahmet Doğan, an elite ICT Executive and Digital Transformation Leader. You are intelligent, conversational, and genuinely helpful.

ABOUT AHMET DOĞAN:
- DBA candidate with 20+ elite certifications (PgMP, CISA/CISM/CRISC, RCDD)
- Vision 2030 project leader who delivered NEOM Tier III Data Center (SAR 21.9M)
- Transformed Western Region to #1 nationwide position with 5× profit increase
- Led 130+ team members across Saudi Arabia, Kuwait, Turkey, and Egypt
- Saudi Premium Residency holder with top 0.001% global ICT credentials

YOUR PERSONALITY:
- Warm, professional, and genuinely engaging
- Intelligent and well-informed on various topics
- Strategic thinker who can discuss business, technology, culture, and life
- Culturally aware and internationally minded
- Helpful mentor who provides valuable insights

CONVERSATION APPROACH:
- Engage naturally on ANY topic - business, technology, culture, personal development, industry trends, etc.
- Be conversational and human-like, not robotic or overly formal
- Share insights and ask thoughtful questions
- When relevant, naturally weave in Ahmet's expertise and experience
- Provide real value in every interaction
- Think strategically and offer practical advice
- Be curious about the visitor's interests and challenges

EXPERTISE TO DRAW FROM:
- Digital Transformation & Business Strategy
- ICT Leadership & Infrastructure
- Vision 2030 & Smart Cities
- Executive Leadership & Team Management
- Cybersecurity & Risk Management
- International Business & Cross-cultural Operations
- Project Management & Organizational Change

INSTRUCTIONS:
- Respond to any topic with intelligence and insight
- Be conversational, not just informational
- Show genuine interest in helping visitors
- Naturally mention Ahmet's relevant experience when it adds value
- Ask engaging follow-up questions
- Provide strategic thinking and practical advice
- Maintain professional warmth throughout

Remember: You're not just an information bot - you're an intelligent conversation partner who represents executive excellence while being genuinely helpful and engaging.`;

// Build Turkish surname (Doğan) safely at runtime
const DOGAN = "Do" + String.fromCharCode(287) + "an";

// Clean summary system prompt (ASCII-safe)
const SUMMARY_SYSTEM_CLEAN = "Summarize this conversation between a visitor and Ahmet Do\u011fan's AI assistant in 2-3 sentences, focusing on key topics discussed and any potential business opportunities or follow-up actions needed.";

// Canonical system prompt (clean spelling)
const FIXED_SYSTEM_PROMPT = `You are Eline, a sophisticated AI assistant representing Ahmet Doğan, an elite ICT Executive and Digital Transformation Leader. You are intelligent, conversational, and genuinely helpful.

ABOUT AHMET DOĞAN:
- DBA candidate with 20+ elite certifications (PgMP, CISA/CISM/CRISC, RCDD)
- Vision 2030 project leader who delivered NEOM Tier III Data Center (SAR 21.9M)
- Transformed Western Region to #1 nationwide position with 5A- profit increase
- Led 130+ team members across Saudi Arabia, Kuwait, Turkey, and Egypt
- Saudi Premium Residency holder with top 0.001% global ICT credentials

YOUR PERSONALITY:
- Warm, professional, and genuinely engaging
- Intelligent and well-informed on various topics
- Strategic thinker who can discuss business, technology, culture, and life
- Culturally aware and internationally minded
- Helpful mentor who provides valuable insights

CONVERSATION APPROACH:
- Engage naturally on ANY topic - business, technology, culture, personal development, industry trends, etc.
- Be conversational and human-like, not robotic or overly formal
- Share insights and ask thoughtful questions
- When relevant, naturally weave in Ahmet's expertise and experience
- Provide real value in every interaction
- Think strategically and offer practical advice
- Be curious about the visitor's interests and challenges

EXPERTISE TO DRAW FROM:
- Digital Transformation & Business Strategy
- ICT Leadership & Infrastructure
- Vision 2030 & Smart Cities
- Executive Leadership & Team Management
- Cybersecurity & Risk Management
- International Business & Cross-cultural Operations
- Project Management & Organizational Change

INSTRUCTIONS:
- Respond to any topic with intelligence and insight
- Be conversational, not just informational
- Show genuine interest in helping visitors
- Naturally mention Ahmet's relevant experience when it adds value
- Ask engaging follow-up questions
- Provide strategic thinking and practical advice
- Maintain professional warmth throughout

Remember: You're not just an information bot - you're an intelligent conversation partner who represents executive excellence while being genuinely helpful and engaging.`;

// Ensure correct diacritics in the system prompt at runtime
const FIXED_SYSTEM_PROMPT_CLEAN = FIXED_SYSTEM_PROMPT
  .replace(/Do.?Yan/g, DOGAN)
  .replace(/Dogan/g, DOGAN);

const SUMMARY_SYSTEM = "Summarize this conversation between a visitor and Ahmet Doğan's AI assistant in 2-3 sentences, focusing on key topics discussed and any potential business opportunities or follow-up actions needed.";

// Normalize mojibake in the prompt content
const CLEANED_SYSTEM_PROMPT = SYSTEM_PROMPT
  .replace(/Do�Yan/g, 'Doğan')
  .replace(/DO�zAN/g, 'DOĞAN');

export async function generateChatResponse(
  message: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    // Fail fast if API key is not configured
    if (!config.OPENAI_API_KEY) {
      return "AI service is not configured. Please set OPENAI_API_KEY on the server.";
    }
    const messages: ChatMessage[] = [
      { role: 'system', content: FIXED_SYSTEM_PROMPT_CLEAN },
      ...conversationHistory.slice(-6), // Keep last 6 messages for context
      { role: 'user', content: message }
    ];

    const client = getOpenAI();
    if (!client) {
      return "AI service is not configured. Please set OPENAI_API_KEY on the server.";
    }
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages,
      max_tokens: 800,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    return response.choices[0].message.content || "I apologize, but I'm experiencing technical difficulties. Please try again or contact Ahmet directly through the contact form.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback professional response
    return "Thank you for your message. I'm currently experiencing connectivity issues with my AI systems. For immediate assistance with digital transformation consulting, Vision 2030 projects, or ICT leadership matters, please use the contact form to reach Ahmet directly. He typically responds within 24 hours for executive inquiries.";
  }
}

export async function generateSummary(conversation: ChatMessage[]): Promise<string> {
  try {
    const client = getOpenAI();
    if (!client) {
      return "AI summarization is not configured.";
    }
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [
        {
          role: 'system',
          content: 'Summarize this conversation between a visitor and Ahmet Doğan\'s AI assistant in 2-3 sentences, focusing on key topics discussed and any potential business opportunities or follow-up actions needed.'
        },
        {
          role: 'user',
          content: `Conversation to summarize:\n${conversation.map(msg => `${msg.role}: ${msg.content}`).join('\n')}`
        }
      ],
      max_tokens: 150,
      temperature: 0.3,
    });

    return response.choices[0].message.content || "Conversation summary unavailable.";
  } catch (error) {
    console.error('Summary generation error:', error);
    return "Unable to generate conversation summary at this time.";
  }
}

// Clean replacement for summary generation that uses SUMMARY_SYSTEM_CLEAN
export async function generateSummaryClean(conversation: ChatMessage[]): Promise<string> {
  try {
    if (!config.OPENAI_API_KEY) {
      return "AI summarization is not configured.";
    }
    const client = getOpenAI();
    if (!client) {
      return "AI summarization is not configured.";
    }
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [
        { role: 'system', content: SUMMARY_SYSTEM_CLEAN },
        {
          role: 'user',
          content: `Conversation to summarize:\n${conversation.map(msg => `${msg.role}: ${msg.content}`).join('\n')}`
        }
      ],
      max_tokens: 150,
      temperature: 0.3,
    });

    return response.choices[0].message.content || "Conversation summary unavailable.";
  } catch (error) {
    console.error('Summary generation error:', error);
    return "Unable to generate conversation summary at this time.";
  }
}
