
import React, { useState, useRef, useEffect } from 'react';
import { Message, Therapy } from './types';
import { THERAPIES, APP_FEATURES } from './constants';
import { getAyurvedicResponse } from './geminiService';
import { 
  Leaf, 
  Send, 
  User, 
  Calendar, 
  Settings, 
  MessageSquare, 
  ChevronRight, 
  Info, 
  Clock,
  Menu,
  X,
  Plus
} from 'lucide-react';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Namaste! 🙏 I am your AyurCare Assistant. How can I guide your wellness journey today? Whether you have questions about Doshas, therapies like Shirodhara, or need help booking a session, I am here to help.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await getAyurvedicResponse(input, history);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || "I'm sorry, I couldn't process that request. Let's try talking about something else wellness-related.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: 'err',
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    let text = "";
    switch(action) {
      case 'BOOK_SESSION': text = "I'd like to book an Ayurvedic therapy session."; break;
      case 'VIEW_DOSHA': text = "Can you tell me more about Doshas and how to find mine?"; break;
      case 'VIEW_PLAN': text = "Where can I find my personalized treatment plan in the app?"; break;
    }
    setInput(text);
    // Trigger small delay for better feel
    setTimeout(() => {
      // In a real app we'd trigger a click or call handleSendMessage directly
    }, 100);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-600 p-2 rounded-lg text-white">
                <Leaf size={20} />
              </div>
              <span className="text-xl font-bold font-serif text-emerald-900 tracking-tight">AyurCare</span>
            </div>
            <button md:hidden="true" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Navigation</h3>
              <nav className="space-y-1">
                {[
                  { icon: MessageSquare, label: 'Support Chat', active: true },
                  { icon: Calendar, label: 'Appointments' },
                  { icon: User, label: 'My Wellness' },
                  { icon: Settings, label: 'Settings' }
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${item.active ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <item.icon size={18} className="mr-3" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Popular Therapies</h3>
              <div className="space-y-3">
                {THERAPIES.map(therapy => (
                  <div key={therapy.id} className="p-3 bg-slate-50 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer group">
                    <h4 className="text-sm font-semibold text-slate-800 flex items-center">
                      {therapy.name}
                      <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-1">{therapy.description}</p>
                    <div className="flex items-center mt-2 text-[10px] text-emerald-600 font-medium">
                      <Clock size={10} className="mr-1" />
                      {therapy.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-900 text-white m-4 rounded-xl shadow-lg">
            <h4 className="text-sm font-bold mb-1">New to Ayurveda?</h4>
            <p className="text-xs text-emerald-100/80 mb-3">Start your journey with a free 15-minute consultation.</p>
            <button className="w-full bg-white text-emerald-900 py-2 rounded-lg text-xs font-bold hover:bg-emerald-50 transition-colors">
              Request Trial
            </button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white shadow-inner relative">
        {/* Header */}
        <header className="h-16 flex items-center px-6 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <button className="md:hidden mr-4" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={20} className="text-slate-600" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-slate-900">Wellness Assistant</h2>
            <div className="flex items-center text-[10px] text-emerald-600 font-medium uppercase tracking-tighter">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
              Live Support
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-2">
             <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                <Info size={20} />
             </button>
          </div>
        </header>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto chat-container px-4 md:px-8 py-8 space-y-6">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm relative
                ${message.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none'}
              `}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                <div className={`text-[10px] mt-2 ${message.role === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-2xl p-4 rounded-tl-none shadow-sm flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 md:px-8 py-2 overflow-x-auto">
          <div className="flex space-x-2 whitespace-nowrap pb-2">
            {APP_FEATURES.map((feature, idx) => (
              <button 
                key={idx}
                onClick={() => handleQuickAction(feature.action)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 transition-all shadow-sm flex-shrink-0"
              >
                <span>{feature.icon}</span>
                <span>{feature.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-slate-100 bg-white">
          <form onSubmit={handleSendMessage} className="relative max-w-4xl mx-auto flex items-end space-x-2">
            <div className="flex-1 relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about treatments, doshas, or booking..."
                rows={1}
                className="w-full p-4 pr-12 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm resize-none group-hover:border-slate-300"
                style={{ minHeight: '52px', maxHeight: '150px' }}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className={`
                  absolute right-2 bottom-2 p-2 rounded-xl transition-all
                  ${input.trim() && !isTyping 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                `}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
          <p className="mt-3 text-center text-[10px] text-slate-400">
            AyurCare provides wellness guidance. Not a substitute for medical diagnosis. Consult an Ayurvedic doctor.
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
