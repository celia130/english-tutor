"use client";

import { useState, useCallback } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import QuickActions from "./QuickActions";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");

  const handleSend = useCallback(
    async (text: string) => {
      const userMessage: Message = { role: "user", content: text };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);
      setStreamingContent("");

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        });

        if (!res.ok) {
          const err = await res.json();
          setStreamingContent(`错误：${err.error || "请求失败"}`);
          setIsLoading(false);
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) {
          setStreamingContent("错误：无法读取响应");
          setIsLoading(false);
          return;
        }

        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  fullContent += delta;
                  setStreamingContent(fullContent);
                }
              } catch {
                // skip unparseable chunks
              }
            }
          }
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: fullContent },
        ]);
        setStreamingContent("");
      } catch {
        setStreamingContent("错误：网络请求失败，请重试");
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const handleQuickSelect = useCallback((text: string) => {
    setInput(text);
  }, []);

  return (
    <div className="flex flex-col h-dvh bg-white">
      <header className="border-b bg-white px-4 py-3 text-center shrink-0">
        <h1 className="text-lg font-semibold text-gray-800">英语教学助手</h1>
        <p className="text-xs text-gray-400">AI 英语学习伙伴</p>
      </header>

      <ChatMessages
        messages={messages}
        streamingContent={streamingContent}
        isLoading={isLoading}
      />

      <div className="shrink-0">
        <QuickActions onSelect={handleQuickSelect} disabled={isLoading} />
        <ChatInput
          onSend={handleSend}
          isLoading={isLoading}
          value={input}
          onChange={setInput}
        />
      </div>
    </div>
  );
}
