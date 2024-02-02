import { useRef } from "react";

export default function Settings(props: any) {
  const openAiKeyInput = useRef<HTMLInputElement>(null);
  const token = window.localStorage.getItem("OPEN_AI_API_KEY") || "";

  return (
    <div className="relative z-50" aria-labelledby="modal-title" aria-modal="true">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={() => {
          props.setSettingsOpen(false);
        }}
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto pointer-events-none">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="bottom-32 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg pointer-events-auto">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3 className="text-xl font-bold leading-6 text-gray-900" id="modal-title">
                    Settings
                  </h3>
                  <br></br>
                  <hr></hr>
                  <div className="mt-2 w-full flex flex-col">
                    <h4 className="font-bold">API Keys</h4>
                    <table className="w-full flex flex-col ">
                      <tbody>
                        <tr className="w-full flex justify-between">
                          <td className="">Open AI</td>
                          <div>
                            <input value={token} placeholder="Enter your Open AI API Key" ref={openAiKeyInput} type="text" className=" h-min border-black border-b-2"></input>
                            <button
                              onClick={() => {
                                if (openAiKeyInput?.current?.value) {
                                  window.localStorage.setItem("OPEN_AI_API_KEY", openAiKeyInput?.current?.value);
                                }
                              }}
                              className="bg-black mx-2 p-1 text-white rounded-md"
                            >
                              Save
                            </button>
                          </div>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => {
                  props.setSettingsOpen(false);
                }}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
