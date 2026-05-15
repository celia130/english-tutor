import { NextRequest } from "next/server";
import { streamDeepSeek, Message } from "@/lib/deepseek";
import { getSystemPrompt } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userMessages: Message[] = body.messages || [];

    const systemMessage: Message = {
      role: "system",
      content: getSystemPrompt(),
    };

    const allMessages = [systemMessage, ...userMessages];

    return await streamDeepSeek(allMessages);
  } catch {
    return new Response(
      JSON.stringify({ error: "请求格式错误，请检查输入" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
