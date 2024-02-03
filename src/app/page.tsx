"use client";

import TutorInterviewPane from "../components/tutor-interview-pane";
import UserInterviewPane from "../components/user-interview-pane";
import { use, useEffect, useRef, useState } from "react";
import FormData from "form-data";

import AppBar from "@/components/app-bar";
import ChatPane from "@/components/chat-pane";
import Settings from "@/components/settings";

export interface MessageSchema {
  role: "assistant" | "user" | "system";
  content: string;
}

export default function Home() {
  const [problemStarted, setProblemStarted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isEmojiTalking, setIsEmojiTalking] = useState(false);
  const [store, updateStore] = useState({
    interviewSettings: {
      targetRole: "tutor",
      codingInterview: false,
    },
  });

  const initialPrompt = "Hi, I'm Clara. Welcome to Up It Quest! An AI interview preparation platform. To begin I'm going to ask you to code up bubble sort!";
  const defaultContextSchema: MessageSchema = {
    role: "assistant",
    content: initialPrompt,
  };

  const [openAiApiKey, setOpenAiApiKey] = useState("");
  const [content, setContent]: any[] = useState([defaultContextSchema]);
  const [messagesArray, setMessagesArray] = useState([defaultContextSchema]);
  const [speechToTextLoading, setSpeechToTextLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    setOpenAiApiKey(window.localStorage.getItem("OPEN_AI_API_KEY") ?? "");
    setAutoPlay(window.localStorage.getItem("AUTO_PLAY") === "true" ?? true);
  }, []);

  const defaultCode = `#include <iostream>

using namespace std;

int main() {
  cout << "Hello, World!";
  return 0;
}`;
  const [code, setCode] = useState(defaultCode);

  const [whisperIsLoading, setWhisperIsLoading] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  async function sendMessage() {
    const inputValue = input.current!.value || "";
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
    input.current!.value = "";
  }

  async function retrievedMessage(inputValue: string) {
    updateMessagesArray(inputValue);
    const response = await fetch("/api/generate-message", {
      headers: {
        "x-api-key": openAiApiKey ?? "",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ messages: messagesArray }),
    });
    const generatedMessage = await response.json();
    console.log(generatedMessage);
    setMessagesArray((prevState) => [...prevState, generatedMessage]);
    const conversationArray = content;
    conversationArray.push(generatedMessage);
    if (autoPlay) {
      textToSpeech(generatedMessage.content);
    }
    setContent(conversationArray);
    setIsLoading(false);
  }

  let interval: any = null;

  function startTalking() {
    interval = setInterval(() => {
      setIsEmojiTalking((prevState) => !prevState);
    }, 200);
    return () => clearInterval(interval);
  }
  async function textToSpeech(inputString: string) {
    setSpeechToTextLoading(true);
    const data = {
      text: inputString,
    };
    const response = await fetch("/api/text-to-speech", {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "x-api-key": openAiApiKey ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const audioBlob = await response.blob();
    setSpeechToTextLoading(false);
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.volume = 0.5;
    audio.play();

    setIsEmojiTalking(true);
    startTalking();
    audio.onended = () => {
      clearInterval(interval);
      setIsEmojiTalking(false);
    };
  }

  async function whisperRequest(audioBlob: any) {
    setWhisperIsLoading(true);
    const audio = new File([audioBlob], "audio.wav");
    const formData: any = new FormData();
    formData.append("file", audio);
    const request: any = await fetch("/api/speech-to-text", {
      method: "POST",
      headers: {
        "x-api-key": openAiApiKey ?? "",
      },
      body: formData,
    });
    const { transcript } = await request.json();
    if (!input.current) return;
    input.current.value = transcript;
    setWhisperIsLoading(false);
    console.log(transcript);
    sendMessage();
  }

  const updateMessagesArray = (newMessage: string) => {
    const newMessageSchema: MessageSchema = {
      role: "user",
      content: `message: ${newMessage} \n code: ${code}`,
    };
    messagesArray.push(newMessageSchema);
    setMessagesArray(messagesArray);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url(/images/up-it-quest-background.svg)] items-stretch">
      <AppBar setSettingsOpen={setSettingsOpen}></AppBar>
      {settingsOpen || !openAiApiKey ? <Settings setAutoPlay={setAutoPlay} autoPlay={autoPlay} openAiApiKey={openAiApiKey} setOpenAiApiKey={setOpenAiApiKey} setSettingsOpen={setSettingsOpen}></Settings> : null}
      <main className="bg-blue-400 self-stretch flex flex-grow">
        <div className="bg-green-400 w-full p-2">
          <ChatPane setCode={setCode} code={code} whisperIsLoading={whisperIsLoading} isLoading={isLoading} speechToTextLoading={speechToTextLoading} content={content} input={input} sendMessage={sendMessage} textToSpeech={textToSpeech}></ChatPane>
        </div>
        <div className="bg-yellow-300 w-full p-2 flex items-center flex-col">
          <TutorInterviewPane problemStarted={false} interviewSettings={store.interviewSettings} updateTargetRole={null} updateCodingInterview={null} isEmojiTalking={isEmojiTalking}></TutorInterviewPane>
          <UserInterviewPane whisperRequest={whisperRequest} restartInterview={null} setIsAwaitingMessageResponse={null} sendMessage={sendMessage}></UserInterviewPane>
        </div>
      </main>
    </div>
  );
}
