import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, X, MessageCircle, Loader2 } from 'lucide-react';
import { AgentMessage, sendAgentMessage } from '../lib/agentClient';
import { leadInputProps, submitLeadAndOpenWhatsApp, validateLeadForm } from '../lib/leads';

const quickQuestions = [
  'איזה מסלול מתאים לי?',
  'מה ההבדל בין TF Tracker לתהליך אונליין?',
  'כמה עולה ליווי אישי מלא?',
  'האם יש החזר דרך ביטוח?',
];

const initialMessages: AgentMessage[] = [
  {
    role: 'assistant',
    content:
      'אני יכול לעזור לך לבחור מסלול, להבין מחירים, ולהבדיל בין TF Tracker, תהליך אונליין וליווי אישי מלא. מה המטרה שלך כרגע?',
  },
];

export default function GeminiAgentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AgentMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [isSending, setIsSending] = useState(false);

  const askAgent = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const nextMessages: AgentMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');

    setIsSending(true);
    void (async () => {
      const response = await sendAgentMessage(nextMessages);
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: response.answer,
        },
      ]);
      setIsSending(false);
    })();
  };

  const handleLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateLeadForm(event.currentTarget)) return;

    submitLeadAndOpenWhatsApp(
      {
        source: 'gemini-agent',
        name: leadName,
        phone: leadPhone,
        product: 'agent-fit-check',
        message: messages.map((message) => `${message.role}: ${message.content}`).join('\n').slice(-1800),
      },
      `שלום תומר, קוראים לי ${leadName}. דיברתי עם הסוכן באתר ורוצה להבין איזה מסלול מתאים לי. טלפון: ${leadPhone}`,
    );
    setLeadName('');
    setLeadPhone('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-energy px-5 py-4 text-white shadow-[0_18px_45px_rgba(28,141,255,0.35)] transition-transform hover:-translate-y-1"
        aria-label="פתח סוכן התאמת מסלול"
      >
        <Bot size={22} />
        <span className="hidden text-sm font-bold sm:inline">עזרה בבחירת מסלול</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-[2rem] border border-energy/20 bg-white shadow-[0_24px_80px_rgba(15,42,68,0.22)]"
            dir="rtl"
          >
            <div className="flex items-center justify-between border-b border-[#d9e8f5] bg-gradient-to-l from-[#f5fbff] to-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-energy/20 bg-white">
                  <img src="/tomer-logo.png" alt="תומר פרידמן" className="h-9 w-9 object-contain" />
                </div>
                <div>
                  <div className="text-sm font-black text-foreground">סוכן התאמת מסלול</div>
                  <div className="text-xs text-text-muted">מחירים, התאמה ו־FAQ בלבד</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-text-muted transition-colors hover:bg-[#e8f4ff] hover:text-foreground"
                aria-label="סגור"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[430px] space-y-3 overflow-y-auto bg-[#f7fbff] p-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === 'assistant'
                      ? 'mr-auto bg-white text-foreground shadow-sm border border-[#dbeaf6]'
                      : 'ml-auto bg-energy text-white'
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {isSending && (
                <div className="mr-auto flex max-w-[86%] items-center gap-2 rounded-2xl border border-[#dbeaf6] bg-white px-4 py-3 text-sm text-text-muted shadow-sm">
                  <Loader2 size={16} className="animate-spin text-energy" />
                  בודק התאמה...
                </div>
              )}
            </div>

            <div className="border-t border-[#d9e8f5] bg-white p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => askAgent(question)}
                    className="rounded-full border border-energy/20 bg-[#f2f8ff] px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-energy hover:text-white"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  askAgent(input);
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="כתוב שאלה קצרה..."
                  className="min-w-0 flex-1 rounded-full border border-[#cfe0ee] bg-white px-4 py-3 text-right text-sm text-foreground outline-none transition-colors focus:border-energy"
                />
                <button type="submit" className="rounded-full bg-energy p-3 text-white transition-colors hover:bg-[#0f6fc9]">
                  <Send size={18} />
                </button>
              </form>

              <form onSubmit={handleLeadSubmit} className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
                <input
                  name="name"
                  value={leadName}
                  onChange={(event) => setLeadName(event.target.value)}
                  {...leadInputProps.fullName}
                  placeholder="שם"
                  className="rounded-full border border-[#d6e5f1] px-4 py-2 text-right text-xs outline-none focus:border-energy"
                  required
                />
                <input
                  name="phone"
                  value={leadPhone}
                  onChange={(event) => setLeadPhone(event.target.value)}
                  {...leadInputProps.phone}
                  placeholder="טלפון"
                  dir="ltr"
                  className="rounded-full border border-[#d6e5f1] px-4 py-2 text-right text-xs outline-none focus:border-energy"
                  required
                />
                <button type="submit" className="rounded-full bg-[#0f2a44] px-4 py-2 text-xs font-bold text-white">
                  חזור אליי
                </button>
              </form>

              <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
                <MessageCircle size={14} className="text-energy" />
                הסוכן לא מחליף ייעוץ אישי. בשאלות רפואיות עוברים לתומר.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
