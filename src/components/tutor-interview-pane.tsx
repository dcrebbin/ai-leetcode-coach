import React, { useState } from "react";

export default function TutorInterviewPane(props: any) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[150px] h-[150px] rounded-full bg-[#77A1DA] flex justify-center items-center drop-shadow-md z-10">
        <p className="text-7xl mb-2">{props.isEmojiTalking ? "😀" : "🙂"}</p>
      </div>
    </div>
  );
}
