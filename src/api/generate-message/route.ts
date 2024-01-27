import type { NextApiRequest, NextApiResponse } from "next";
const apiKey = process.env.OPEN_AI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const textInput = JSON.parse(req.body).text;
  const body: any = {
    input: textInput,
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: "Hello, I am a chatbot created by OpenAI. How can I help you today?",
      },
      {
        role: "user",
        content: textInput,
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
