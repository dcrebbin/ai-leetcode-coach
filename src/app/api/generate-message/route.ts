import { MessageSchema } from "@/app/page";
const apiKey = process.env.OPEN_AI_API_KEY;

export async function POST(req: Request, res: Response) {
  const json = await req.json();
  const messages: MessageSchema[] = json.messages;

  const headers: any = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const body = JSON.stringify({
    model: "gpt-4-turbo-preview",
    messages: [...messages],
  });
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: headers,
    body: body,
    method: "POST",
  });
  const data = await response.json();
  const generatedMessage: MessageSchema = {
    role: "assistant",
    content: data.choices[0].message.content,
  };
  return new Response(JSON.stringify(generatedMessage));
}