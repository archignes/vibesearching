// src/app/page.tsx

import Logo from "@/components/Logo";
import VibingAroundYou from "@/components/VibingAroundYou";
import Vibrary from "@/components/Vibrary";
import VibeConsole from "@/components/VibeConsole";
import Settings from "@/components/Settings";

export default function Home(): JSX.Element {
  return (
    <div className="container mx-auto px-4 flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 z-20 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />
          <Settings />
        </div>
      </header>
      <div className="flex-grow flex flex-col relative pt-2 mx-auto w-full md:w-3/4">
        <VibeConsole devMode={process.env.NEXT_PUBLIC_DEV_MODE === "true"} />
        <div className="fixed bottom-0 left-0 right-0 z-0">
          <Vibrary />
        </div>
      </div>
    </div>
  );
}
