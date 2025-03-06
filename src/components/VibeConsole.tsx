// src/components/VibeConsole.tsx

"use client";

import { useEffect, useState } from "react";
import VibedQueries from "./VibedQueries";
import SearchContainer from "./SearchContainer";
import VibingAroundYou from "./VibingAroundYou";
import { useSearchController } from "@/hooks/useSearchController";
import { useSearchNavigator } from "@/hooks/useSearchNavigator";
import type { VibeConsoleProps } from "@/types/componentTypes";
import useInputStore from "@/store/useInputStore";

export default function VibeConsole({
  devMode,
}: VibeConsoleProps): JSX.Element {
  const { setInputValue } = useInputStore();
  const [showVibingAround, setShowVibingAround] = useState(true);

  const { debouncedInput, isStreaming, vibedQueries, directCompletions } =
    useSearchController({ devMode });

  const { handleSearch } = useSearchNavigator();

  // Set initial input value in dev:mock mode
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEV_MODE === "true") {
      setInputValue("How to make pasta");
      const timer = setTimeout(() => {
        setInputValue("How to make pasta?");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [setInputValue]);

  // Hide VibingAroundYou when queries appear
  useEffect(() => {
    if (vibedQueries.length > 0) {
      setShowVibingAround(false);
    } else {
      setShowVibingAround(true);
    }
  }, [vibedQueries.length]);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)]">
      <div className="p-4 relative">
        {showVibingAround ? (
          <VibingAroundYou />
        ) : (
          <VibedQueries onSelect={handleSearch} />
        )}
      </div>

      <div className="relative left-0 right-0 pb-8 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900">
        <SearchContainer onSelect={handleSearch} />
      </div>
    </div>
  );
}
