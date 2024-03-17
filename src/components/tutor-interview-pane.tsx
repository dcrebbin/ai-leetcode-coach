import React, { useState } from "react";

export default function TutorInterviewPane(props: any) {
  return (
    <div className="w-full h-full flex justify-center items-center drop-shadow-md">
      <div className="w-[200px] h-[200px] rounded-full bg-[#77A1DA] flex justify-center items-center drop-shadow-md z-10">
        <p className="text-[6rem] mb-2">{props.isEmojiTalking ? "😀" : "🙂"}</p>
      </div>
    </div>
  );
}
