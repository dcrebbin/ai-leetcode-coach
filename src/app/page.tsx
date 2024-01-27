import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[url(/images/up-it-quest-background.svg)] items-stretch">
      <header className="flex flex-col items-start bg-white drop-shadow-md h-max">
        <Image alt="Up It Quest Logo" src="/images/up-it-quest-logo.svg" width={80} height={80} className="p-1"></Image>
      </header>
      <main className="bg-blue-400 self-stretch flex flex-grow">
        <div className="bg-green-400 w-full p-2">Code</div>
        <div className="bg-yellow-300 w-full p-2">User/Interviewer</div>
      </main>
    </div>
  );
}
