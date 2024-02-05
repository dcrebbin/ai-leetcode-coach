import { ArrowPathIcon } from "@heroicons/react/20/solid";
import React, { SVGProps, useRef, useState } from "react";

function MdiGithub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path>
    </svg>
  );
}

export default function Settings(props: any) {
  const openAiKeyInput = useRef<HTMLInputElement>(null);
  const leetCodeQuestionInput = useRef<HTMLInputElement>(null);

  const [leetCodeQuestion, setLeetCodeQuestion] = React.useState("");
  const [token, setToken] = useState(props.openAiApiKey);

  return (
    <div className="relative z-50" aria-labelledby="modal-title" aria-modal="true">
      <button
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={() => {
          props.setSettingsOpen(false);
        }}
      ></button>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto pointer-events-none">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="bottom-32 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg pointer-events-auto">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3 className="text-xl font-bold leading-6 text-gray-900" id="modal-title">
                    Settings
                  </h3>
                  <p className="text-xs">
                    {"("}We only save your API key to local storage to then pass it to an API route within the app, too sus for you? Feel feel to deploy it locally! 🤠
                    {")"}
                  </p>
                  <hr></hr>
                  <div className="mt-2 w-full flex flex-col gap-4">
                    <h4 className="font-bold">API Keys</h4>
                    <div className="flex flex-row justify-between">
                      <div className="font-bold">Open AI</div>
                      <div>
                        <input
                          onChange={(e) => {
                            setToken(e.target.value);
                          }}
                          value={token}
                          placeholder="sk-"
                          ref={openAiKeyInput}
                          type="text"
                          className=" h-min border-black border-b-2"
                        ></input>
                        <button
                          onClick={() => {
                            if (openAiKeyInput?.current?.value) {
                              const newOpenAiKey = openAiKeyInput?.current?.value;
                              window.localStorage.setItem("OPEN_AI_API_KEY", newOpenAiKey);
                              props.setOpenAiApiKey(newOpenAiKey);
                              alert("API Key Saved");
                            } else {
                              window.localStorage.removeItem("OPEN_AI_API_KEY");
                              props.setOpenAiApiKey("");
                              alert("API Key Removed");
                            }
                          }}
                          className="bg-black mx-2 p-1 text-white rounded-md font-sans text-xl"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="font-bold">Auto Play Message</div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input
                          onChange={() => {
                            window.localStorage.setItem("AUTO_PLAY", JSON.stringify(!props.autoPlay));
                            props.setAutoPlay(!props.autoPlay);
                          }}
                          checked={props.autoPlay}
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        ></input>
                        <div className="mr-2 w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="font-bold">Load DSA Question</div>
                      <div className="flex">
                        <input
                          onChange={(e) => {
                            setLeetCodeQuestion(e.target.value);
                          }}
                          value={leetCodeQuestion}
                          placeholder="e.g: median-of-two-sorted-arrays"
                          ref={leetCodeQuestionInput}
                          type="text"
                          className=" h-min border-black border-b-2"
                        ></input>
                        <button
                          disabled={props.questionLoading}
                          onClick={() => {
                            const question = leetCodeQuestionInput?.current?.value;
                            if (!question) return alert("Please enter a question");
                            props.setQuestionLoading(true);
                            props.retrieveDsaQuestion(question);
                          }}
                          className="bg-black mx-2 p-1 text-white rounded-md font-sans text-xl w-12 h-9"
                        >
                          {props.questionLoading ? <ArrowPathIcon className="h-full w-full text-white animate-spin" /> : "Load"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="flex items-start flex-col justify-start mt-2">
                <p>Hey 👋</p>
                <div className="flex items-center gap-1">
                  <p>
                    We&apos;re <strong>open source!</strong> Find out more here
                  </p>
                  <a target="_" href="https://github.com/dcrebbin/up-it-quest-next">
                    <MdiGithub className="w-8 h-8 hover:text-blue-600"></MdiGithub>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => {
                  if (window.localStorage.getItem("OPEN_AI_API_KEY") == null) {
                    alert("Please enter an API Key");
                  }
                  props.setSettingsOpen(false);
                }}
                type="button"
                className="font-sans text-md mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto "
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
