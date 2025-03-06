// src/components/VibeConsole.tsx
"use client";

import { useEffect, useState } from "react";
import useSearchStore from "@/store/useSearchStore";
import VibedQueries from "./VibedQueries";
import SearchContainer from "./SearchContainer";
import VibingAroundYou from "./VibingAroundYou";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchController } from "@/hooks/useSearchController";
import { useSearchNavigator } from "@/hooks/useSearchNavigator";
import type { VibeConsoleProps } from "@/types/componentTypes";

export default function VibeConsole({
  devMode,
}: VibeConsoleProps): JSX.Element {
  const { setInputValue } = useSearchStore();
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
      <ScrollArea className="flex-1 w-full">
        <div className="p-4">
          {showVibingAround && (
            <div className="mt-4">
              <VibingAroundYou />
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="w-full pb-[18vh]">
        <div className="relative">
          {vibedQueries.length > 0 && (
            <div className="absolute bottom-full w-full mb-4">
              <VibedQueries onSelect={handleSearch} />
            </div>
          )}
          <SearchContainer onSelect={handleSearch} />
        </div>
      </div>
    </div>
  );
}
