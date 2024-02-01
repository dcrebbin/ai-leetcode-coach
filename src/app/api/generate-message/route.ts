import { MessageSchema } from "@/app/page";
import type { NextApiRequest, NextApiResponse } from "next";
const apiKey = process.env.OPEN_AI_API_KEY;

export async function POST(req: NextApiRequest, res: NextApiResponse<any>) {
  const requestBody = JSON.parse(req.body);
  console.log(requestBody);
  const messages: MessageSchema[] = requestBody.messages;
  const body: any = {
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: "Hello, I am a chatbot created by OpenAI. How can I help you today?",
      },
      {
        role: "user",
        content: messages[messages.length - 1].content,
      },
    ],
  };
  const headers: any = {
    ContentType: "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: headers,
    body: body,
    method: "POST",
  });
  res.status(200).json(response);
}
