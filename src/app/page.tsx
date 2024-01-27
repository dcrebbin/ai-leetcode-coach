"use client";

import TutorInterviewPane from "../components/tutor-interview-pane";
import UserInterviewPane from "../components/user-interview-pane";
import { useRef, useState } from "react";

import AppBar from "@/components/app-bar";
import ChatPane from "@/components/chat-pane";

interface MessageSchema {
  role: "assistant" | "user" | "system";
  content: string;
}

export default function Home() {
  const [problemStarted, setProblemStarted] = useState(false);
  const [isEmojiTalking, setIsEmojiTalking] = useState(false);
  const [store, updateStore] = useState({
    interviewSettings: {
      targetRole: "tutor",
      codingInterview: false,
    },
  });

  const initialPrompt = "";
  const defaultContextSchema: MessageSchema = {
    role: "assistant",
    content: initialPrompt,
  };
  const [content, setContent]: any[] = useState([]);
  const [messagesArray, setMessagesArray] = useState([defaultContextSchema]);
  const [speechToTextLoading, setSpeechToTextLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [whisperIsLoading, setWhisperIsLoading] = useState(false);
  const [conversation, setConversation] = useState(`${initialPrompt}`);
  const input: any = useRef();

  async function sendMessage() {
    const inputValue = input.current.value;
    const newMessage = { content: inputValue, role: "user" };
    if (inputValue == "") {
      return;
    }
    const conversationArray = content;
    console.log(content);
    conversationArray.push(newMessage);
    await setContent(conversationArray);
    setIsLoading(true);
    retrievedMessage(inputValue);
    input.current.value = "";
  }

  async function retrievedMessage(inputValue: string) {
    updateMessagesArray(inputValue);
    const response: any = await (await fetch("/api/post-message", { method: "POST", body: JSON.stringify({ messages: messagesArray }) })).json();
    const gptResponse = response;

    setMessagesArray((prevState) => [...prevState, gptResponse]);
    const conversationArray = content;
    conversationArray.push(gptResponse);
    textToSpeech(gptResponse.content);
    setContent(conversationArray);
    setIsLoading(false);
  }
  async function textToSpeech(inputString: string) {
    setSpeechToTextLoading(true);
    const data: any = {
      text: inputString,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
      },
    };
    const headers: any = {
      Accept: "audio/mpeg",
      "Content-Type": "application/json",
      "xi-api-key": "",
    };
    const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB/stream", {
      headers: headers,
      body: JSON.stringify(data),
      method: "POST",
    });

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.volume = 0.5;
    audio.play();
    setSpeechToTextLoading(false);
  }

  async function whisperRequest(audioBlob: any) {
    setWhisperIsLoading(true);
    const audio = new File([audioBlob], "audio.wav");
    const formData = new FormData();
    formData.append("file", audio);

    const request: any = await fetch("/api/whisper", {
      method: "POST",
      body: formData,
    });
    const { transcript } = await request.json();
    input.current.value = transcript;
    setWhisperIsLoading(false);
    console.log(transcript);
    sendMessage();
  }

  const updateMessagesArray = (newMessage: string) => {
    const newMessageSchema: MessageSchema = {
      role: "user",
      content: newMessage,
    };
    console.log({ messagesArray });
    messagesArray.push(newMessageSchema);
    setMessagesArray(messagesArray);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url(/images/up-it-quest-background.svg)] items-stretch">
      <AppBar></AppBar>
      <main className="bg-blue-400 self-stretch flex flex-grow">
        <div className="bg-green-400 w-full p-2">
          <ChatPane isLoading={isLoading} speechToTextLoading={speechToTextLoading} content={content} input={input} sendMessage={sendMessage} textToSpeech={textToSpeech}></ChatPane>
        </div>
        <div className="bg-yellow-300 w-full p-2 flex items-center flex-col">
          <TutorInterviewPane problemStarted={false} interviewSettings={store.interviewSettings} updateTargetRole={null} updateCodingInterview={null} isEmojiTalking={isEmojiTalking}></TutorInterviewPane>
          <UserInterviewPane restartInterview={null} setIsAwaitingMessageResponse={null} sendMessage={sendMessage}></UserInterviewPane>
        </div>
      </main>
    </div>
  );
}
