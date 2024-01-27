import { PlayIcon, PaperAirplaneIcon, ArrowPathIcon } from "@heroicons/react/20/solid";

export default function ChatPane(props: any) {
  return (
    <div className="w-full h-full flex flex-col justify-start bg-blue-400 mb-20 items-center">
      <div className="flex flex-row w-full ">
        <input
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              props.sendMessage();
            }
          }}
          ref={props.input}
          placeholder="Type your message here"
          className="bg-white ml-8 m-2 w-[100%] px-3 py-2  h-9 active:border-none text-black rounded-md
    "
        ></input>
        {props.isLoading ? (
          <div className="flex items-center">
            <ArrowPathIcon className="h-6 w-6 text-white animate-spin" />
          </div>
        ) : (
          <button name="sendButton" className="text-3xl font-bold m-2 pr-4" onClick={props.sendMessage}>
            <PaperAirplaneIcon className="h-8 w-8 text-white" />
          </button>
        )}
      </div>
      {props.content.length === 0 ? <hr></hr> : <div className="hidden"></div>}
      <div className="flex flex-col-reverse">
        {props.content?.map((e: any, i: number) => {
          return (
            <div key={i} className="flex justify-start items-center mx-4">
              {e.role == "user" ? (
                <div className="w-[100%] m-2 bg-[#404045] px-4 py-2  text-white">
                  <strong>You</strong>
                  <br></br>
                  {e.content}
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-[100%] m-2 bg-[#3C3D63] px-4 py-2 text-white">
                    <strong>John Smith</strong>
                    <br></br>
                    {e.content}
                  </div>
                  {props.speechToTextLoading ? (
                    <div className="flex items-center">
                      <ArrowPathIcon className="h-6 w-6 text-white animate-spin" />
                    </div>
                  ) : (
                    <PlayIcon
                      onClick={async () => {
                        await props.textToSpeech(e.content);
                      }}
                      className="h-10 w-10 text-white cursor-pointer"
                    ></PlayIcon>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}