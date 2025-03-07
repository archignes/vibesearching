// src/components/VibeConsole.tsx

"use client";

import { useEffect, useState, KeyboardEvent } from "react";
import VibedQueries from "./VibedQueries";
import { SearchContainer } from "./SearchContainer";
import VibingAroundYou from "./VibingAroundYou";
import LoadingVibes from "./LoadingVibes";
import { useSearchController } from "@/hooks/useSearchController";
import { useSearchNavigator } from "@/hooks/useSearchNavigator";
import type { VibeConsoleProps } from "@/types/componentTypes";
import useInputStore from "@/store/useInputStore";
import { useArrowNavigation } from "@/hooks/useArrowNavigation";

export default function VibeConsole({
  devMode,
}: VibeConsoleProps): JSX.Element {
  const { setInputValue } = useInputStore();
  const [showVibingAround, setShowVibingAround] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const { debouncedInput, isStreaming, vibedQueries, directCompletions } =
    useSearchController({ devMode });

  const { handleSearch } = useSearchNavigator();

  const {
    state: { activeSection, activeIndex },
    handleKeyDown: baseHandleKeyDown,
  } = useArrowNavigation(directCompletions.length, vibedQueries.length);

  // Enhanced handleKeyDown that includes Enter key functionality
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    baseHandleKeyDown(e);

    if (e.key === "Enter") {
      // If user is in direct completions, select that item
      if (activeSection === "direct" && activeIndex >= 0) {
        const item = directCompletions[activeIndex];
        if (item) {
          handleSearch(item.text, item.engines?.[0]);
        }
      }
      // If user is on a vibed item, open quick actions or do something
      else if (activeSection === "vibed" && activeIndex >= 0) {
        e.preventDefault();
        const vibed = vibedQueries[activeIndex];
        if (vibed) {
          // For example, you could open a small popover or show a list of quick actions
          alert(`Quick actions for: "${vibed.vibedText}"\n(placeholder)`);
        }
      }
    }
  };

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

  // Monitor input value to detect clearing
  useEffect(() => {
    if (debouncedInput.trim().length === 0 && vibedQueries.length > 0) {
      // Input was cleared, transition back to VibingAroundYou without loading screen
      setShowVibingAround(true);
      setShowLoader(false);
    }
  }, [debouncedInput, vibedQueries.length]);

  // Handle display states based on streaming status and query results
  useEffect(() => {
    if (isStreaming) {
      // Only show loader if we're actually fetching new queries
      if (debouncedInput.trim().length >= 3) {
        setShowVibingAround(false);
        setShowLoader(true);
      }
    } else if (vibedQueries.length > 0 && debouncedInput.trim().length >= 3) {
      // Only show results if we have a valid query
      setShowVibingAround(false);
      // Add a small delay before hiding loader to ensure smooth transition
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 300);
      return () => clearTimeout(timer);
    } else if (debouncedInput.trim().length < 3) {
      // Show VibingAroundYou when input is cleared or too short
      setShowVibingAround(true);
      setShowLoader(false);
    }
  }, [isStreaming, vibedQueries.length, debouncedInput]);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)]">
      {/* Content area with adjusted height to make room for search and completions */}
      <div className="relative flex-grow h-[calc(100vh-240px)]">
        {/* Container with fixed height for query content */}
        <div className="h-full p-4">
          {/* Fixed-height container for all content with absolute positioning */}
          <div className="relative h-full w-full">
            {/* VibingAroundYou */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                showVibingAround
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <VibingAroundYou onVibeStart={() => setShowLoader(true)} />
            </div>

            {/* LoadingVibes */}
            <div
              className={`absolute inset-0 z-20 ${
                !showLoader ? "pointer-events-none opacity-0" : ""
              }`}
            >
              <LoadingVibes isVisible={showLoader} />
            </div>

            {/* VibedQueries */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                !showVibingAround && !showLoader
                  ? "opacity-100 z-30"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <VibedQueries
                onSelect={handleSearch}
                activeIndex={activeSection === "vibed" ? activeIndex : -1}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search component with more space for completions */}
      <div className="relative z-40 mb-auto h-[160px]">
        <div className="relative inset-x-0 bottom-0 pb-8 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900">
          <SearchContainer
            onSelect={handleSearch}
            handleKeyDown={handleKeyDown}
            activeSection={activeSection}
            activeIndex={activeIndex}
          />
        </div>
      </div>
    </div>
  );
}
