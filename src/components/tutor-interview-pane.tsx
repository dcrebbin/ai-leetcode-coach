import React, { useState } from "react";

export default function TutorInterviewPane(props: any) {
  const seconds = 60;
  const minutes = 15;
  const totalTime = seconds * minutes;

  const circumference = 2 * Math.PI * 130;

  const [countDown, setCountDown] = useState(totalTime - 1);
  const [countDownColor, setCountDownColor] = useState("green");
  const [strokeDashOffset, setStrokeDashOffset] = useState(0);
  const circleRef = React.useRef<SVGCircleElement>(null);

  //   const updateCountDownColour => ()({
  //     if (countDown.value <= totalTime * 0.75) {
  //       countDownColor.value = "yellow";
  //     }
  //     if (countDown.value <= totalTime * 0.3) {
  //       countDownColor.value = "red";
  //     }
  //   });
  //   useVisibleTask$(({ cleanup }) => {
  //     const update = () => {
  //       if(!props.problemStarted){
  //         countDown.value = totalTime-1;
  //         return;
  //       }
  //       if (props.problemStarted === false) return;
  //       countDown.value -= 1;
  //       updateCountDownColour();
  //       if (countDown.value <= 0) {
  //         countDown.value = totalTime;
  //         countDownColor.value = "green";
  //       }
  //       const fraction = countDown.value / totalTime;
  //       const offset = circumference * fraction;
  //       strokeDashOffset.value = circumference - offset;
  //       console.log(strokeDashOffset.value);
  //     };
  //     const id = setInterval(update, 1000);
  //     cleanup(() => clearInterval(id));
  //   });

  function intToTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    console.log(minutes, seconds);
    return `${minutes}:${seconds}`;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[150px] h-[150px] rounded-full bg-[#77A1DA] flex justify-center items-center drop-shadow-md z-10">
        <p className="text-7xl mb-2">{props.isEmojiTalking ? "😀" : "🙂"}</p>
      </div>
      {/* <div className="absolute w-72 h-72  border-black border-8 border-transparent border-dashed flex items-end justify-center rounded-full" style={{ borderImage: `url(#circle)`, borderImageWidth: "" }}>
        <p className="text-white text-6xl drop-shadow-md font-bold z-10">{props.problemStarted ? intToTime(countDown) : "15:00"}</p>
        <svg id="circle" className="w-full h-full absolute rotate-[270deg]" style={{ strokeDashoffset: strokeDashOffset }}>
          <circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            style={{
              strokeWidth: "9",
              strokeDasharray: `${circumference} ${circumference}`,
            }}
            r="130"
            fill="none"
            stroke={countDownColor}
          />
        </svg>
      </div> */}
    </div>
  );
}
