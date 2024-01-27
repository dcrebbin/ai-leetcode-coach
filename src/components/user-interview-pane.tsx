import { useState } from "react";
import WebCam from "./web-cam";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { VideoCameraSlashIcon, VideoCameraIcon } from "@heroicons/react/20/solid";
import AudioRecorder from "./audio-recorder";

export default function UserInterviewPane(props: any) {
  const [isCameraOn, setIsCameraOn] = useState(false);

  function activateWebCam() {
    const constraints = { audio: false, video: true };
    const width = 700;
    const height = 600;
    const video = document.getElementById("video") as HTMLVideoElement;
    video.style.width = width + "px";
    video.style.display = "block";
    video.style.height = height + "px";
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
    });
  }

  function deactivateWebCam() {
    const video = document.getElementById("video") as HTMLVideoElement;
    video.style.display = "none";
    video.srcObject = null;
  }

  return (
    <div className="w-full h-full relative flex justify-center">
      <WebCam isCameraOn={isCameraOn}></WebCam>
      <div className="absolute z-20 justify-center flex bg-black/30 rounded-2xl p-3 m-3 w- items-center h-10 bottom-0">
        <button
          onClick={() => {
            setIsCameraOn(!isCameraOn);
            if (isCameraOn) activateWebCam();
            else deactivateWebCam();
          }}
          className="font-bold text-white flex items-center"
        >
          {isCameraOn ? <VideoCameraSlashIcon className="h-8 w-8 text-white"></VideoCameraSlashIcon> : <VideoCameraIcon className="h-8 w-8 text-white"></VideoCameraIcon>}
        </button>
        <AudioRecorder sendMessage={props.sendMessage} setIsAwaitingMessageResponse={props.setIsAwaitingMessageResponse}></AudioRecorder>
        <button
          className="text-3xl font-bold text-white hover:text-red-600 items-center flex justify-center"
          onClick={() => {
            props.restartInterview();
          }}
        >
          <XMarkIcon className="h-8 w-8 text-white"></XMarkIcon>
        </button>
      </div>
    </div>
  );
}
