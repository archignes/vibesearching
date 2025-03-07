"use client";

import { useRef, useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import DirectCompletions from "./DirectCompletions";
import useInputStore from "@/store/useInputStore";
import type { SearchContainerProps } from "@/types/componentTypes";

export function SearchContainer({
  onSelect,
  handleKeyDown,
  activeSection,
  activeIndex,
}: SearchContainerProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { inputValue } = useInputStore();

  // Show/hide direct completions list
  const [showCompletions, setShowCompletions] = useState(true);

  // If user clicks anywhere outside container, we hide completions
  useEffect(() => {
    function handleClick(event: MouseEvent): void {
      if (containerRef.current?.contains(event.target as Node)) {
        setShowCompletions(true);
      } else {
        setShowCompletions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      className="w-full max-w-[60%] min-w-[300px] mx-auto"
      ref={containerRef}
    >
      <div className="relative w-full mb-0 pb-0 p-0 rounded-md overflow-visible">
        {/* We intercept keyDown on the SearchInput */}
        <SearchInput onKeyDown={handleKeyDown} />
        {inputValue.trim().length > 0 && showCompletions && (
          <DirectCompletions
            onSelect={onSelect}
            activeIndex={activeSection === "direct" ? activeIndex : -1}
          />
        )}
      </div>
    </div>
  );
}
