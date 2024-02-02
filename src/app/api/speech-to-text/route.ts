export async function POST(request: Request) {
  const formData = await request.formData();
  formData.append("model", "whisper-1");
  formData.append("language", "en");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
    },
    body: formData,
  });
  const { text, error } = await response.json();
  if (response.ok) {
    return new Response(JSON.stringify({ transcript: text }), {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } else {
    console.log(error.message);
    return new Response(error.message, { status: 400 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
