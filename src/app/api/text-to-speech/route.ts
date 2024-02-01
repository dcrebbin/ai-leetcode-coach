const apiKey = process.env.OPEN_AI_API_KEY;

type OpenAiTtsRequest = {
  input: string;
  model: string;
  voice: string;
};

export async function POST(req: Request, res: Response) {
  const { text } = await req.json();
  const body: OpenAiTtsRequest = {
    input: text,
    model: "tts-1",
    voice: "alloy",
  };
  const headers: any = {
    accept: "audio/mpeg",
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    headers: headers,
    body: JSON.stringify(body),
    method: "POST",
  });

  const status = response.status;
  if (status !== 200) {
    console.log(await response.json());
    return new Response(response.statusText, { status });
  }

  const data = await response.blob();
  return new Response(data, {
    headers: {
      "Content-Type": "audio/mpeg",
    },
  });
}
