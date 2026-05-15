export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function streamDeepSeek(messages: Message[]): Promise<Response> {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "请在 Vercel 环境变量中设置 DEEPSEEK_API_KEY",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      stream: true,
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    return new Response(
      JSON.stringify({
        error: `DeepSeek API 错误 (${res.status})：${error}`,
      }),
      {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(res.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
