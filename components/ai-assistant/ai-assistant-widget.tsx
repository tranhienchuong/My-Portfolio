"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type ChatResponse = {
  reply?: unknown;
};

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "THC.AI online. Mình có thể trả lời về project, kỹ năng, case study và cách liên hệ.",
};

const suggestedQuestions = [
  "Dự án nổi bật nhất?",
  "Kỹ năng chính của Chương?",
  "Project AI luật lao động là gì?",
  "Làm sao để liên hệ?",
];

function createMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const hasShownTooltipRef = useRef(false);
  const isSendingRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    messagesEndRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, isSending, error]);

  useEffect(() => {
    if (isOpen || hasShownTooltipRef.current) {
      return;
    }

    const showTimer = window.setTimeout(() => {
      hasShownTooltipRef.current = true;
      setShowTooltip(true);
    }, 1500);

    const hideTimer = window.setTimeout(() => {
      setShowTooltip(false);
    }, 7000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [isOpen]);

  async function sendMessage(question: string) {
    const trimmedInput = question.trim();

    if (!trimmedInput || isSendingRef.current) {
      return;
    }

    isSendingRef.current = true;

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmedInput,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedInput }),
      });

      const data = (await response.json().catch(() => null)) as ChatResponse | null;
      const reply = typeof data?.reply === "string" ? data.reply.trim() : "";

      if (!response.ok) {
        throw new Error(reply || "The assistant could not respond.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createMessageId(),
          role: "assistant",
          content: reply || "I could not find a portfolio answer for that.",
        },
      ]);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The assistant could not respond.",
      );
    } finally {
      isSendingRef.current = false;
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function resetChat() {
    setMessages([welcomeMessage]);
    setInput("");
    setError(null);
  }

  const showSuggestedQuestions = messages.length === 1 && messages[0]?.id === welcomeMessage.id;

  return (
    <div
      className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6"
      data-native-cursor="true"
    >
      {isOpen ? (
        <section
          aria-label="THC.AI assistant chat panel"
          className="fixed inset-x-3 bottom-[5.25rem] z-[80] flex max-h-[min(30rem,calc(100dvh-7rem))] overscroll-contain overflow-hidden rounded-lg border border-neon-cyan/30 bg-background/80 shadow-[0_20px_72px_hsl(260_90%_4%_/_0.74),0_0_42px_hsl(var(--neon-cyan)/0.16),0_0_64px_hsl(var(--neon-purple)/0.12)] backdrop-blur-2xl sm:inset-x-auto sm:bottom-[6rem] sm:right-6 sm:w-[22.5rem] sm:max-w-[calc(100vw-3rem)]"
          onTouchMoveCapture={(event) => event.stopPropagation()}
          onWheelCapture={(event) => event.stopPropagation()}
        >
          <div aria-hidden="true" className="thc-ai-terminal-overlay pointer-events-none absolute inset-0" />

          <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="border-b border-neon-cyan/15 bg-black/35 p-4 shadow-[inset_0_-1px_0_hsl(var(--neon-purple)/0.16)]">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="thc-ai-status-dot h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_hsl(var(--neon-cyan)/0.8)]"
                    />
                    <p className="text-xs font-semibold text-neon-cyan">
                      THC.AI ASSISTANT
                    </p>
                  </div>
                  <p className="mt-1 text-[0.68rem] font-medium text-muted-foreground">
                    ONLINE / GROQ FAST MODE
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    aria-label="Reset AI chat"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-neon-cyan/20 bg-white/[0.045] px-2.5 text-[0.68rem] font-semibold text-muted-foreground transition-colors hover:border-neon-cyan/45 hover:bg-neon-cyan/10 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
                    disabled={isSending}
                    onClick={resetChat}
                    type="button"
                  >
                    Reset
                  </button>
                  <button
                    aria-label="Close AI assistant"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neon-cyan/25 bg-white/[0.055] text-sm font-semibold text-muted-foreground transition-colors hover:border-neon-pink/55 hover:bg-neon-pink/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
                    onClick={() => setIsOpen(false)}
                    type="button"
                  >
                    <span aria-hidden="true">x</span>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="min-h-0 max-h-[16rem] overflow-y-auto overscroll-contain px-4 py-4 sm:max-h-[18rem]"
              onTouchMoveCapture={(event) => event.stopPropagation()}
              onWheelCapture={(event) => event.stopPropagation()}
            >
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                    key={message.id}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-md border px-3 py-2 text-sm leading-6 shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)]",
                        message.role === "user"
                          ? "border-neon-cyan/35 bg-neon-cyan/12 text-foreground shadow-[0_0_26px_hsl(var(--neon-cyan)/0.12)]"
                          : "border-neon-purple/20 bg-white/[0.055] text-muted-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "mb-1 block text-[0.63rem] font-semibold",
                          message.role === "user" ? "text-neon-cyan" : "text-neon-purple",
                        )}
                      >
                        {message.role === "user" ? "YOU" : "THC.AI"}
                      </span>
                      {message.content}
                    </div>
                  </div>
                ))}

                {isSending ? (
                  <div className="flex justify-start">
                    <div
                      aria-live="polite"
                      className="inline-flex items-center gap-2 rounded-md border border-neon-purple/20 bg-white/[0.055] px-3 py-2 text-sm text-muted-foreground shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)]"
                      role="status"
                    >
                      <span>THC.AI đang xử lý</span>
                      <span aria-hidden="true" className="inline-flex gap-1">
                        {[0, 1, 2].map((dotIndex) => (
                          <span
                            className="thc-ai-typing-dot h-1.5 w-1.5 rounded-full bg-neon-cyan"
                            key={dotIndex}
                            style={{ animationDelay: `${dotIndex * 160}ms` }}
                          />
                        ))}
                      </span>
                    </div>
                  </div>
                ) : null}

                {error ? (
                  <div className="rounded-lg border border-neon-pink/35 bg-neon-pink/10 px-3 py-2 text-sm leading-6 text-neon-pink">
                    {error}
                  </div>
                ) : null}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-neon-cyan/15 bg-black/30 p-3">
              {showSuggestedQuestions ? (
                <div
                  aria-label="Suggested questions"
                  className="mb-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2"
                  role="group"
                >
                  {suggestedQuestions.map((question) => (
                    <button
                      className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-left text-[0.68rem] font-medium leading-5 text-muted-foreground transition-colors hover:border-neon-cyan/40 hover:bg-neon-cyan/10 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
                      disabled={isSending}
                      key={question}
                      onClick={() => void sendMessage(question)}
                      type="button"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              ) : null}

              <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                  <input
                    aria-label="Ask the portfolio assistant"
                    className="min-w-0 flex-1 rounded-md border border-neon-cyan/20 bg-black/35 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-neon-cyan/35 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/35"
                    disabled={isSending}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Nhập câu hỏi..."
                    value={input}
                  />
                  <button
                    className="inline-flex h-10 shrink-0 items-center justify-center rounded-md border border-neon-cyan/45 bg-neon-cyan/15 px-4 text-sm font-semibold text-neon-cyan transition-colors hover:border-neon-cyan/75 hover:bg-neon-cyan/20 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
                    disabled={isSending || !input.trim()}
                    type="submit"
                  >
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : null}

      {showTooltip && !isOpen ? (
        <div
          aria-live="polite"
          className="thc-ai-tooltip absolute bottom-[4.25rem] right-0 w-[min(15.5rem,calc(100vw-2rem))] rounded-md border border-neon-cyan/20 bg-background/90 px-3 py-2 text-xs leading-5 text-muted-foreground shadow-[0_14px_42px_hsl(240_80%_3%_/_0.56),0_0_24px_hsl(var(--neon-cyan)/0.12)] backdrop-blur-xl"
          role="status"
        >
          <span className="block font-semibold text-foreground">👋 Hi there!</span>
          <span>Ask me about Chương&apos;s projects.</span>
        </div>
      ) : null}

      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close THC.AI assistant" : "Open THC.AI assistant"}
        className="group relative inline-flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-neon-cyan/40 bg-background/80 text-xs font-black text-neon-cyan shadow-[0_0_22px_hsl(var(--neon-cyan)/0.18),0_0_42px_hsl(var(--neon-purple)/0.12)] backdrop-blur-xl transition-[transform,box-shadow,border-color,background-color,color] duration-200 hover:scale-105 hover:border-neon-cyan/60 hover:bg-background/90 hover:text-foreground hover:shadow-[0_0_28px_hsl(var(--neon-cyan)/0.24),0_0_50px_hsl(var(--neon-purple)/0.14)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
        onClick={() => {
          setShowTooltip(false);
          setIsOpen((current) => !current);
        }}
        type="button"
      >
        <span
          aria-hidden="true"
          className="thc-ai-radar absolute inset-[-0.35rem] rounded-full border border-neon-cyan/20"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_24%,hsl(var(--foreground)/0.16),transparent_26%),linear-gradient(135deg,hsl(var(--neon-cyan)/0.13),hsl(var(--neon-purple)/0.1)_58%,hsl(var(--neon-pink)/0.08))] shadow-[inset_0_1px_0_hsl(var(--foreground)/0.16),inset_0_-14px_28px_hsl(240_90%_2%_/_0.42)]"
        />
        <span
          aria-hidden="true"
          className="thc-ai-status-dot absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-background bg-cyan-300 shadow-[0_0_10px_hsl(var(--neon-cyan)/0.72)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-full right-0 mb-2 hidden translate-y-1 whitespace-nowrap rounded-md border border-white/10 bg-background/90 px-2 py-1 text-[0.68rem] font-semibold text-muted-foreground opacity-0 shadow-[0_10px_28px_hsl(240_80%_3%_/_0.45)] backdrop-blur-xl transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:block"
        >
          Ask AI
        </span>
        <span className="thc-ai-mark relative z-10 inline-flex h-7 w-7 items-center justify-center">
          <svg
            aria-hidden="true"
            className="h-7 w-7"
            focusable="false"
            viewBox="0 0 32 32"
          >
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="thc-ai-orb-gradient"
                x1="6"
                x2="26"
                y1="6"
                y2="26"
              >
                <stop offset="0" stopColor="hsl(var(--neon-cyan))" />
                <stop offset="0.52" stopColor="hsl(var(--neon-purple))" />
                <stop offset="1" stopColor="hsl(var(--neon-pink))" />
              </linearGradient>
            </defs>
            <circle
              cx="16"
              cy="16"
              fill="url(#thc-ai-orb-gradient)"
              opacity="0.16"
              r="13"
            />
            <path
              d="M16 5.5l2.38 7.16L25.5 15l-7.12 2.34L16 24.5l-2.38-7.16L6.5 15l7.12-2.34L16 5.5Z"
              fill="url(#thc-ai-orb-gradient)"
              stroke="hsl(var(--foreground) / 0.42)"
              strokeWidth="0.55"
            />
            <path
              d="M23.2 4.9l.78 2.22 2.12.78-2.12.78-.78 2.22-.78-2.22-2.12-.78 2.12-.78.78-2.22Z"
              fill="hsl(var(--neon-cyan))"
              opacity="0.78"
            />
            <path
              d="M8.7 21.6l.56 1.58 1.54.56-1.54.56-.56 1.58-.56-1.58-1.54-.56 1.54-.56.56-1.58Z"
              fill="hsl(var(--neon-pink))"
              opacity="0.72"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
