import { withFileUpload } from "next-multiparty";
const FormData = require("form-data");
import { createReadStream } from "fs";

export function POST(req: any) {
  withFileUpload(async (req: any, res: any) => {
    const file = req.file;

    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }

    const formData = new FormData();
    formData.append("file", createReadStream(file.filepath), "audio.wav");
    formData.append("model", "whisper-1");
    formData.append("language", "en");
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
      },
      body: formData,
    });
    const { text, error } = await response.json();
    if (response.ok) {
      res.status(200).json({ transcript: text });
    } else {
      console.log(error.message);
      res.status(400).send(new Error());
    }
  });
  return withFileUpload(req);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
