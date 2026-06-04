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
    "Hi, I can answer questions about this portfolio, skills, projects, case study, and contact info.",
};

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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    messagesEndRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, isSending, error]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || isSending) {
      return;
    }

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
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <div className="fixed inset-x-3 bottom-20 overflow-hidden rounded-lg border border-white/10 bg-background/85 shadow-[0_24px_90px_hsl(260_90%_4%_/_0.72),0_0_55px_hsl(var(--neon-cyan)/0.13)] backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:w-96">
          <div className="border-b border-white/10 bg-white/[0.045] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan">
                  AI Assistant
                </p>
                <h2 className="mt-1 text-base font-semibold text-foreground">
                  Portfolio chat
                </h2>
              </div>
              <button
                aria-label="Close AI assistant"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.045] text-sm font-semibold text-muted-foreground transition-colors hover:border-neon-pink/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-neon-pink focus:ring-offset-2 focus:ring-offset-background"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                x
              </button>
            </div>
          </div>

          <div className="max-h-[min(28rem,calc(100vh-14rem))] overflow-y-auto px-4 py-4">
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
                      "max-w-[85%] rounded-lg border px-3 py-2 text-sm leading-6",
                      message.role === "user"
                        ? "border-neon-cyan/30 bg-neon-cyan/12 text-foreground shadow-[0_0_26px_hsl(var(--neon-cyan)/0.1)]"
                        : "border-white/10 bg-white/[0.055] text-muted-foreground",
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isSending ? (
                <div className="flex justify-start">
                  <div className="rounded-lg border border-white/10 bg-white/[0.055] px-3 py-2 text-sm text-muted-foreground">
                    Thinking...
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

          <form
            className="border-t border-white/10 bg-white/[0.035] p-3"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2">
              <input
                aria-label="Ask the portfolio assistant"
                className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/25 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-white/20 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/35"
                disabled={isSending}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about skills or projects..."
                value={input}
              />
              <button
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-md border border-neon-cyan/40 bg-neon-cyan/15 px-4 text-sm font-semibold text-neon-cyan transition-colors hover:border-neon-cyan/70 hover:bg-neon-cyan/20 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
                disabled={isSending || !input.trim()}
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <button
        aria-expanded={isOpen}
        aria-label="Open AI portfolio assistant"
        className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-neon-cyan/45 bg-background/80 text-sm font-semibold text-neon-cyan shadow-[0_0_34px_hsl(var(--neon-cyan)/0.22),0_0_70px_hsl(var(--neon-purple)/0.14)] backdrop-blur-xl transition-colors hover:border-neon-pink/55 hover:text-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-background"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="absolute h-14 w-14 rounded-full bg-neon-cyan/10 blur-md transition-colors group-hover:bg-neon-pink/10" />
        <span className="relative">AI</span>
      </button>
    </div>
  );
}
