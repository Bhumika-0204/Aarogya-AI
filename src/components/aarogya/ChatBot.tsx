import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useAppState, type AppContextValue as AppState } from '@/context/AppContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

const quickReplies = ['Check symptoms', 'Yoga for back pain', 'Ayurvedic remedies', 'Find a doctor'];

const getBotResponse = (msg: string, appState: AppState): string => {
  const lower = msg.toLowerCase();
  if (lower.includes('back pain') || lower.includes('back')) {
    return 'For back pain, I recommend Cat-Cow stretches and Ashwagandha 500mg. The Mahanarayan Oil massage is also highly effective. Would you like to see the full diagnosis? Click "Diagnosis" in the menu!';
  }
  if (lower.includes('yoga') || lower.includes('exercise')) {
    return 'Great choice! Yoga is excellent for holistic healing. For back pain, try: 1) Bhujangasana (Cobra Pose), 2) Cat-Cow Stretch, 3) Child\'s Pose. Head to the Wellness section for detailed instructions!';
  }
  if (lower.includes('ayurveda') || lower.includes('herb') || lower.includes('dosha')) {
    return `Ayurveda focuses on your Prakriti (body type). ${appState.prakriti ? `Your Prakriti is ${appState.prakriti} dominant. ` : ''}Have you taken our Dosha quiz in the Diagnosis section? It personalizes all your recommendations!`;
  }
  if (lower.includes('doctor') || lower.includes('specialist') || lower.includes('book')) {
    return 'I can help you find the right specialist! We have Orthopedic Surgeons, Ayurvedic Practitioners, Homeopathic Doctors, and more. Visit the Doctors section to book an appointment today!';
  }
  if (lower.includes('diet') || lower.includes('food') || lower.includes('eat')) {
    return 'For an anti-inflammatory diet, focus on: Turmeric, Walnuts, Salmon, Leafy Greens, and Ginger. Avoid processed foods and refined sugar. Check the Wellness section for your personalized diet chart!';
  }
  if (lower.includes('homeopathy') || lower.includes('homeopathic')) {
    return 'Homeopathy uses highly diluted natural substances. For back pain, Rhus Tox 30C is commonly recommended for stiffness, and Arnica Montana 200C for bruised, sore feelings. Always consult a qualified homeopath!';
  }
  if (lower.includes('symptom') || lower.includes('check') || lower.includes('diagnos')) {
    return 'Let\'s analyze your symptoms! Our AI cross-references Allopathic, Ayurvedic, and Homeopathic databases. Click "Diagnosis" in the navigation to start your 4-step health assessment!';
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return 'Hello! 👋 I\'m your Aarogya AI health assistant. I can help you with symptoms, remedies, yoga, diet, and finding doctors. What health concern can I help you with today?';
  }
  if (lower.includes('score') || lower.includes('health pulse')) {
    return `Your current Health Pulse score is ${appState.healthScore}/100. Complete yoga exercises and log healthy meals in the Wellness section to improve your score!`;
  }
  return 'I understand your concern. For the most accurate holistic health analysis, try our Symptom Checker — it combines Allopathic, Ayurvedic, and Homeopathic insights. Is there anything specific I can help you with?';
};

const now = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

export default function ChatBot() {
  const appState = useAppState();
  const { setCurrentView } = appState;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm your Aarogya AI health assistant. 🌿 Ask me about symptoms, remedies, yoga, or finding doctors. How can I help you today?", sender: 'bot', time: now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user', time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(text, appState);
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: response, sender: 'bot', time: now() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 600);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
    if (reply === 'Check symptoms') setTimeout(() => setCurrentView('diagnosis'), 1800);
    if (reply === 'Find a doctor') setTimeout(() => setCurrentView('doctors'), 1800);
    if (reply === 'Yoga for back pain') setTimeout(() => setCurrentView('wellness'), 1800);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#2563EB] hover:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center active:scale-95 transition-all"
        style={{ boxShadow: '0 8px 32px rgba(37,99,235,0.4)' }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#22C55E] rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ height: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-heading font-bold text-white text-sm">Aarogya AI Assistant</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                <span className="text-xs text-white/70">Online — Responds instantly</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-[75%] ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#2563EB] text-white rounded-br-sm'
                      : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-1">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot-1" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot-2" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot-3" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 bg-white border-t border-gray-100">
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {quickReplies.map(reply => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  className="flex-shrink-0 text-xs bg-blue-50 text-[#2563EB] border border-blue-100 px-3 py-1.5 rounded-full font-medium hover:bg-[#2563EB] hover:text-white transition-all active:scale-95"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-2xl border border-gray-200 px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask about symptoms, remedies..."
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-8 h-8 bg-[#2563EB] rounded-xl flex items-center justify-center text-white disabled:opacity-40 hover:bg-blue-700 active:scale-95 transition-all flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
