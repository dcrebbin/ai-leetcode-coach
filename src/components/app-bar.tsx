import Image from "next/image";

export default function AppBar(props: any) {
  return (
    <header className="flex flex-row items-center justify-between bg-white drop-shadow-md h-max px-2">
      <Image alt="Up It Quest Logo" src="/images/up-it-quest-logo.svg" width={80} height={80} className="p-1"></Image>
      <button
        onClick={() => {
          props.setSettingsOpen(true);
        }}
        className="px-2 p-1 text-xl bg-black text-white rounded-md font-sans drop-shadow-md"
      >
        Settings
      </button>
    </header>
  );
}
