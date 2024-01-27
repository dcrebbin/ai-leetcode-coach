export default function WebCam(props: any) {
  return (
    <div className="w-full h-full bg-[#FFFA96] overflow-hidden flex items-center justify-center">
      <video autoPlay={true} style={{ display: "none" }} id="video"></video>
      {props.isCameraOn.value ? null : (
        <div className="w-[100px] h-[100px] rounded-full bg-[#77A1DA] flex justify-center items-center drop-shadow-md">
          <p className="text-5xl font-sans text-white">You</p>
        </div>
      )}
    </div>
  );
}
