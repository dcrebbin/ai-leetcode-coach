import { MicrophoneIcon, StopCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

function AudioRecorder(props: any) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder]: any = useState(null);

  const startRecording = () => {
    if (window.MediaRecorder !== undefined) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const newMediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(newMediaRecorder);

        newMediaRecorder.start();
        setRecording(true);

        const audioChunks: any = [];
        newMediaRecorder.ondataavailable = (e) => {
          audioChunks.push(e.data);
        };
        newMediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          props.whisperRequest(audioBlob);
        };
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex w-[100%] justify-center">
      {recording ? (
        <button className="w-[100%]" onMouseUp={stopRecording}>
          <MicrophoneIcon className="h-8 w-8 text-red-500"></MicrophoneIcon>
        </button>
      ) : (
        <button className="w-[100%]" onMouseDown={startRecording}>
          <MicrophoneIcon className="h-8 w-8 text-white"></MicrophoneIcon>
        </button>
      )}
    </div>
  );
}

export default AudioRecorder;
