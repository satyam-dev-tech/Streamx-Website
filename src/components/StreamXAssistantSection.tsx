import { AlertCircle, ArrowUp, Bot, RotateCcw, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { StreamXRelease } from '../config/release';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface StreamXAssistantSectionProps {
  release: StreamXRelease;
}

const STARTER_PROMPTS = [
  "What's new in the StreamX v1.2.0 Liquid Glass update?",
  'How do I enable 4K video and EAX 4.1 surround sound?',
  'How do I install StreamX on Android?',
  'How do I add the Phisher98 Extensions repository?',
] as const;

export function StreamXAssistantSection({ release }: StreamXAssistantSectionProps) {
  const initialGreeting: ChatMessage = {
    id: 'greeting',
    role: 'assistant',
    content: `Ask me anything about StreamX v${release.version} — the Liquid Glass navigation bar, tap-and-drag water-fluid animations, APK size optimization, 4K UHD & EAX 4.1 surround sound, or Android setup.`,
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [typedText, setTypedText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastQuestion, setLastQuestion] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const typingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0].id === 'greeting'
        ? [
            {
              id: 'greeting',
              role: 'assistant',
              content: `Ask me anything about StreamX v${release.version} — the Liquid Glass navigation bar, tap-and-drag water-fluid animations, APK size optimization, 4K UHD & EAX 4.1 surround sound, or Android setup.`,
            },
          ]
        : prev,
    );
  }, [release.version]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading, typedText]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  const stopTypingAnimation = () => {
    if (typingTimerRef.current) {
      window.clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setTypingMessageId(null);
    setTypedText('');
  };

  const animateAssistantReply = (messageId: string, fullText: string) => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    stopTypingAnimation();
    setTypingMessageId(messageId);
    setTypedText('');

    let index = 0;
    const stepSize = fullText.length > 350 ? 4 : 2;

    typingTimerRef.current = window.setInterval(() => {
      index = Math.min(fullText.length, index + stepSize);
      setTypedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        stopTypingAnimation();
      }
    }, 16);
  };

  const sendQuestion = async (questionText: string, isRetry = false) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    stopTypingAnimation();
    setLastQuestion(trimmed);

    let nextHistory = messages;
    if (!isRetry) {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
      };
      nextHistory = [...messages, userMessage];
      setMessages(nextHistory);
      setInput('');
    }

    setErrorMsg(null);
    setIsLoading(true);

    try {
      const payloadMessages = nextHistory
        .filter((m) => m.id !== 'greeting')
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/streamx-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!res.ok || !data.reply) {
        setErrorMsg(
          data.error || 'StreamX Assistant could not respond right now. Please try again.',
        );
        return;
      }

      const replyId = `assistant-${Date.now()}`;
      const replyText = data.reply;

      setLastQuestion(null);
      setMessages((prev) => [
        ...prev,
        {
          id: replyId,
          role: 'assistant',
          content: replyText,
        },
      ]);

      animateAssistantReply(replyId, replyText);
    } catch {
      setErrorMsg('Network issue while contacting StreamX Assistant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendQuestion(input);
  };

  const handleReset = () => {
    stopTypingAnimation();
    setMessages([initialGreeting]);
    setErrorMsg(null);
    setLastQuestion(null);
    setInput('');
  };

  const isBusy = isLoading || typingMessageId !== null;

  return (
    <section
      id="assistant"
      className="border-b border-white/[0.06] bg-[#08080B] py-14 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Scope & Starter Questions */}
          <div className="min-w-0 lg:col-span-5">
            <p className="text-sm font-medium text-rose-400">StreamX AI</p>
            <h2
              className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              StreamX Support Assistant
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:mt-4 sm:text-base">
              Trained exclusively on StreamX. Ask about APK downloads, Android sideloading steps,
              4K playback, or setting up extension repositories.
            </p>

            <div className="mt-6">
              <p className="text-xs font-medium text-zinc-500">Quick Questions</p>
              <div className="mt-3 flex flex-col gap-2.5">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={isLoading}
                    onClick={() => void sendQuestion(prompt)}
                    className="flex min-h-[44px] w-full items-center justify-between rounded-xl border border-white/[0.08] bg-[#101016] px-4 py-2.5 text-left text-sm text-zinc-200 transition-colors duration-150 active:scale-[0.99] hover:border-white/[0.18] hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:opacity-50"
                  >
                    <span className="pr-2">{prompt}</span>
                    <ArrowUp className="h-4 w-4 shrink-0 rotate-45 text-zinc-500" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Interactive StreamX-only Chat Interface */}
          <div className="min-w-0 lg:col-span-7">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#101016]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-rose-400">
                    <Bot className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-white">
                      StreamX Assistant
                    </h3>
                    <p className="text-xs text-zinc-500">
                      {isLoading
                        ? 'Thinking...'
                        : typingMessageId
                          ? 'Typing reply...'
                          : `Scoped to StreamX v${release.version} & Extensions`}
                    </p>
                  </div>
                </div>

                {messages.length > 1 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    aria-label="Reset conversation"
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Conversation Thread */}
              <div
                ref={scrollContainerRef}
                className="flex h-[320px] flex-col gap-4 overflow-y-auto p-4 sm:h-[360px] sm:p-6"
              >
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  const isActivelyTyping = msg.id === typingMessageId;
                  const displayContent = isActivelyTyping ? typedText : msg.content;

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                          isUser
                            ? 'border-rose-500/30 bg-rose-600/20 text-rose-300'
                            : 'border-white/10 bg-white/[0.04] text-zinc-300'
                        }`}
                        aria-hidden="true"
                      >
                        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                          isUser
                            ? 'bg-rose-600 text-white'
                            : 'border border-white/[0.08] bg-white/[0.03] text-zinc-200'
                        }`}
                      >
                        <span>{displayContent}</span>
                        {isActivelyTyping && (
                          <motion.span
                            aria-hidden="true"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                            className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-rose-400 align-baseline"
                          />
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3"
                    role="status"
                    aria-label="StreamX Assistant is typing"
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300"
                      aria-hidden="true"
                    >
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5">
                      <span className="sr-only">StreamX Assistant is typing</span>
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          aria-hidden="true"
                          animate={{
                            y: [0, -4, 0],
                            opacity: [0.35, 1, 0.35],
                          }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: dot * 0.16,
                            ease: 'easeInOut',
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-rose-400"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {errorMsg && (
                  <div
                    role="alert"
                    className="flex items-center justify-between gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs leading-relaxed text-rose-200"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
                      <span>{errorMsg}</span>
                    </div>
                    {lastQuestion && (
                      <button
                        type="button"
                        onClick={() => void sendQuestion(lastQuestion, true)}
                        className="shrink-0 rounded-lg border border-rose-400/40 bg-rose-500/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-rose-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                      >
                        Retry
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Input Bar */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2.5 border-t border-white/[0.08] bg-black/30 p-3 sm:p-4"
              >
                <label htmlFor="streamx-ai-input" className="sr-only">
                  Ask a question about StreamX
                </label>
                <input
                  id="streamx-ai-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about StreamX APK, Android setup, 4K, or extensions..."
                  maxLength={500}
                  disabled={isLoading}
                  className="min-h-[44px] min-w-0 flex-1 rounded-xl border border-white/12 bg-[#0B0B10] px-4 text-sm text-white placeholder:text-zinc-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isBusy || !input.trim()}
                  aria-label="Send question"
                  className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white transition-all duration-150 active:scale-[0.98] hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <ArrowUp className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
