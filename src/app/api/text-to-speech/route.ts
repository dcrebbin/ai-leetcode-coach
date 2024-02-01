import { NextApiRequest, NextApiResponse } from "next";
const apiKey = process.env.OPEN_AI_API_KEY;

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const textInput = JSON.parse(req.body).text;
  const body: any = {
    input: textInput,
    model: "tts-1",
    voice: "alloy",
  };
  const headers: any = {
    accept: "audio/mpeg",
    ContentType: "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    headers: headers,
    body: body,
    method: "POST",
  });

  const data = await response.blob();
  res.status(200).send(data);
}