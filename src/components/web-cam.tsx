export default function WebCam(props: any) {
  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center">
      <video autoPlay={true} style={{ display: "none" }} id="video"></video>
      {props.isCameraOn.value ? null : (
        <div className="w-[200px] h-[200px] rounded-full bg-[#77A1DA] flex justify-center items-center drop-shadow-md drop-shadow-lg">
          <p className="text-7xl font-sans text-white">You</p>
        </div>
      )}
    </div>
  );
}
