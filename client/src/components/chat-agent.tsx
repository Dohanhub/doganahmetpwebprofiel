import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  X, Send, User, Sparkles, 
  Mic, MicOff, Volume2, VolumeX, Brain, Award,
  Zap, Building2, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type: 'text' | 'voice' | 'quick-reply';
}

interface QuickReply {
  id: string;
  text: string;
  action: string;
  icon: React.ReactNode;
}

interface ConversationContext {
  currentPage: string;
  topicsDiscussed: string[];
  userPreferences: string[];
  lastInteraction: Date;
}

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAutoGreeting] = useState(false);
  const [, setIsSpeaking] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    currentPage: 'home',
    topicsDiscussed: [],
    userPreferences: [],
    lastInteraction: new Date()
  });
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Good day! I'm Eline, Ahmet Doğan's executive AI assistant. I'm here to provide insights into his digital transformation expertise, Vision 2030 leadership, and consulting services. How may I assist you with your strategic ICT or business transformation needs today?",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  // GPT handles all knowledge and context - no hardcoded data needed

  // Build Turkish surname with diacritic safely at runtime (Doğan)
  const DOGAN = "Do" + String.fromCharCode(287) + "an";
  const AHMET_FULL_NAME = "Ahmet " + DOGAN;

  // Normalize any preloaded message text before first paint
  useLayoutEffect(() => {
    setMessages((prev) => prev.map((m) => ({ ...m, text: sanitizeText(m.text) })));
  }, []);

  // Ensure surname shows correct Turkish character in any preloaded message text
  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) => ({ ...m, text: m.text.replace(/Do\W?Yan/gi, DOGAN) }))
    );
  }, []);

  // Name constants and sanitizers to remove mojibake at the source
  const AHMET_NAME = "Ahmet Doğan";
  const sanitizeText = (t: string) =>
    t
      // Normalize common encodings of the surname
      .replace(/Do\W?Yan/gi, "Doğan")
      .replace(/Do\\u011fan/gi, "Doğan")
      // Strip stray control/garbled sequences observed in assets
      .replace(/dY`</g, "")
      .replace(/dYOY/g, "")
      // Ensure Turkish diacritics for surname variants
      .replace(/Do\.?Yan/gi, DOGAN)
      .replace(/Dogan/gi, DOGAN)
      .replace(/[�]+/g, "")
      .trim();

  // Quick reply options based on context
  const getQuickReplies = (): QuickReply[] => {
    const baseReplies = [
      {
        id: '1',
        text: "Tell me about Ahmet",
        action: 'about',
        icon: <User className="w-4 h-4" />
      },
      {
        id: '2',
        text: "Digital transformation trends",
        action: 'trends',
        icon: <Zap className="w-4 h-4" />
      },
      {
        id: '3',
        text: "Vision 2030 insights",
        action: 'vision2030',
        icon: <Building2 className="w-4 h-4" />
      },
      {
        id: '4',
        text: "Leadership advice",
        action: 'leadership',
        icon: <Award className="w-4 h-4" />
      }
    ];

    // Add context-specific replies
    if (conversationContext.currentPage === 'career') {
      baseReplies.push({
        id: '4',
        text: "Walk me through his career",
        action: 'career',
        icon: <Building2 className="w-4 h-4" />
      });
    }

    if (conversationContext.currentPage === 'certifications') {
      baseReplies.push({
        id: '5',
        text: "Explain his certifications",
        action: 'certifications',
        icon: <Shield className="w-4 h-4" />
      });
    }

    return baseReplies;
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        handleSendMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice input error",
          description: "Please try typing instead",
          variant: "destructive"
        });
      };
    }

    // Auto-greeting after 8 seconds
    if (isAutoGreeting) {
      const timer = setTimeout(() => {
        if (!isOpen) {
          handleAutoGreeting();
        }
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isAutoGreeting, isOpen]);

  // Auto-greeting function
  const handleAutoGreeting = () => {
    const greetings = [
      "Hello there! 👋 Would you like me to walk you through Ahmet's executive profile?",
      "Merhaba! I'm here to help you discover Ahmet's expertise. Shall we start? ✨",
      "Hi! I can guide you through Ahmet's impressive credentials. Ready to explore? 🌟"
    ];
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    addMessage(randomGreeting.replace(/dY`</g, '').replace(/dYOY/g, '').replace(/[�]+/g, ''), false);
  };

  // Add message to conversation
  const addMessage = (text: string, isUser: boolean, type: 'text' | 'voice' | 'quick-reply' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Update conversation context
    setConversationContext(prev => ({
      ...prev,
      topicsDiscussed: [...prev.topicsDiscussed, text.toLowerCase()],
      lastInteraction: new Date()
    }));
  };

  // All responses now go through GPT - no hardcoded responses!

  // Handle quick reply selection
  const handleQuickReply = async (action: string) => {
    let message = '';
    switch (action) {
      case 'about':
        message = "Tell me about Ahmet Doğan";
        break;
      case 'trends':
        message = "What are the current digital transformation trends?";
        break;
      case 'vision2030':
        message = "Tell me about Vision 2030 insights";
        break;
      case 'leadership':
        message = "What leadership advice do you have?";
        break;
      case 'career':
        message = "Walk me through Ahmet's career";
        break;
      case 'certifications':
        message = "Explain Ahmet's certifications";
        break;
      default:
        message = "Tell me more";
    }
    
    // Normalize name to correct diacritics prior to use
    message = message
      .replace(/Ahmet\s+Do\W?Yan/gi, `Ahmet ${DOGAN}`)
      .replace(/Ahmet\s+Dogan/gi, `Ahmet ${DOGAN}`);

    addMessage(message, true, 'quick-reply');
    setInputValue(message);
    await handleSendMessage(message);
  };

  // Handle voice input
  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  // Handle text-to-speech
  const speakText = (text: string) => {
    if (isMuted) return;
    
    if ('speechSynthesis' in window) {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
      
      utteranceRef.current = new SpeechSynthesisUtterance(text);
      utteranceRef.current.rate = 0.9;
      utteranceRef.current.pitch = 1.1;
      utteranceRef.current.volume = 0.8;
      
      utteranceRef.current.onstart = () => setIsSpeaking(true);
      utteranceRef.current.onend = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utteranceRef.current);
    }
  };

  // Handle message sending with GPT integration
  const handleSendMessage = async (customInput?: string) => {
    const messageToSend = customInput || inputValue;
    if (!messageToSend.trim()) return;

    addMessage(messageToSend, true);
    setInputValue('');
    setIsTyping(true);
    setShowQuickReplies(false);

    try {
      // Prepare conversation history for GPT
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.isUser ? 'user' : 'assistant' as const,
        content: msg.text
      }));

      // Try streaming first
      const streamResp = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend, conversationHistory }),
      });

      if (streamResp.ok && streamResp.body) {
        // Insert placeholder assistant message to update as chunks arrive
        const placeholderId = crypto.randomUUID();
        setMessages(prev => [
          ...prev,
          { id: placeholderId, text: '', isUser: false, timestamp: new Date(), type: 'text' },
        ]);

        const reader = streamResp.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let assistantText = '';
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split(/\r?\n/);
          for (const line of lines) {
            if (!line) continue;
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6);
              if (dataStr === '[DONE]') {
                setIsTyping(false);
                if (!isMuted && assistantText.trim()) speakText(assistantText);
                setShowQuickReplies(true);
                break;
              }
              try {
                const payload = JSON.parse(dataStr);
                if (payload?.delta) {
                  assistantText += payload.delta;
                  setMessages(prev => prev.map(m => m.id === placeholderId ? { ...m, text: assistantText } : m));
                }
              } catch {}
            }
          }
        }
        setIsTyping(false);
        if (!isMuted && assistantText.trim()) speakText(assistantText);
        setShowQuickReplies(true);
        return;
      }

      // Fallback: non-streaming
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend, conversationHistory })
      });

      if (!response.ok) throw new Error('Failed to get AI response');
      const data = await response.json();
      const aiResponse = data.response;
      addMessage(aiResponse, false);
      setIsTyping(false);
      if (!isMuted) speakText(aiResponse);
      setShowQuickReplies(true);
    } catch (error) {
      console.error('Error generating response:', error);
      setIsTyping(false);
      
      // Fallback response for connectivity issues
      addMessage(
        "I apologize, but I'm having some technical difficulties right now. Please try again in a moment, or feel free to contact Ahmet directly through the contact form for immediate assistance.",
        false
      );
      setShowQuickReplies(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current?.scrollIntoView && typeof messagesEndRef.current.scrollIntoView === 'function') {
      try {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      } catch (error) {
        // Fallback for test environments where scrollIntoView might not work
        console.warn('scrollIntoView not supported in this environment');
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {/* Floating Hologram Chat Button - 3D Design */}
      {!isOpen && (
        <motion.div 
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="group relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform border-0 overflow-hidden"
              data-testid="chat-open-button"
            >
              {/* Professional Digital Human Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden border-2 border-white/30">
                  {/* Professional woman avatar with digital effects */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 rounded-full flex items-center justify-center relative">
                    {/* Human-like avatar */}
                    <div className="w-10 h-10 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full relative overflow-hidden">
                      {/* Face features */}
                      <div className="absolute top-3 left-2 w-1 h-1 bg-gray-700 rounded-full"></div>
                      <div className="absolute top-3 right-2 w-1 h-1 bg-gray-700 rounded-full"></div>
                      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-gray-600 rounded-full"></div>
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-red-400 rounded-full"></div>
                      {/* Hair */}
                      <div className="absolute -top-1 left-0 w-full h-6 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-full"></div>
                    </div>
                    {/* Digital glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent animate-pulse rounded-full"></div>
                  </div>
                </div>
                
                {/* Floating digital elements */}
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                </div>
                <div className="absolute -bottom-1 -left-1">
                  <Brain className="w-4 h-4 text-purple-300 animate-bounce" />
                </div>
                {/* Digital particles */}
                <div className="absolute top-0 left-0 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-2 right-0 w-1 h-1 bg-pink-400 rounded-full animate-ping animation-delay-500"></div>
              </div>
              
              {/* Floating Text */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Chat with Eline 🤖
              </div>
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Floating Hologram Chat Interface - 3D, Light, No Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[90vw]"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            {/* Header - Elegant, Light Design */}
            <motion.div 
              className="bg-gradient-to-r from-white/95 to-gray-50/95 backdrop-blur-md rounded-t-2xl shadow-2xl border border-white/20 mb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  {/* Eline Holographic Avatar */}
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-amber-200 via-rose-300 to-purple-400 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-xl relative z-10">👩‍💼</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </motion.div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800">Eline</h3>
                    <p className="text-xs text-gray-600">Your AI Assistant</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Voice controls */}
                  <Button
                    onClick={toggleVoiceInput}
                    variant="ghost"
                    size="sm"
                    className={`text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-full p-2 ${isListening ? 'text-red-500' : ''}`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    variant="ghost"
                    size="sm"
                    className={`text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-full p-2 ${isMuted ? 'text-red-500' : ''}`}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-full p-2"
                    data-testid="chat-close-button"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Messages Area - Light, Floating */}
            <motion.div 
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 max-h-96 overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.isUser
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                            : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 shadow-md border border-gray-100'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-2 ${message.isUser ? 'text-purple-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div 
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 p-3 rounded-2xl shadow-md border border-gray-100">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Reply Buttons */}
              {showQuickReplies && messages.length > 1 && (
                <motion.div 
                  className="px-4 pb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex flex-wrap gap-2">
                    {getQuickReplies().map((reply) => (
                      <Button
                        key={reply.id}
                        onClick={() => handleQuickReply(reply.action)}
                        variant="outline"
                        size="sm"
                        className="text-xs bg-white/80 hover:bg-purple-50 border-purple-200 hover:border-purple-300 text-purple-700 rounded-full px-3 py-1 h-auto"
                      >
                        {reply.icon}
                        <span className="ml-1">{reply.text}</span>
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Input Area - Light, Elegant */}
              <div className="p-4 border-t border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-white/50">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Eline anything... ✨"
                    className="flex-1 bg-white/80 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent shadow-sm"
                    data-testid="chat-input"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
                    data-testid="chat-send-button"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

