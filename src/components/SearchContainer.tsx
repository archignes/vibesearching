"use client";

import { useRef, useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import DirectCompletions from "./DirectCompletions";
import useInputStore from "@/store/useInputStore";
import type { SearchContainerProps } from "@/types/componentTypes";

export default function SearchContainer({
  onSelect,
}: SearchContainerProps): JSX.Element {
  const { inputValue } = useInputStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCompletions, setShowCompletions] = useState(true);

  // Handle click outside and inside
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (containerRef.current?.contains(event.target as Node)) {
        setShowCompletions(true); // Show when clicking inside
      } else {
        setShowCompletions(false); // Hide when clicking outside
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div
      className="w-full max-w-[60%] min-w-[300px] mx-auto"
      ref={containerRef}
    >
      <div className="relative w-full mb-0 pb-0 p-0 rounded-md overflow-visible">
        <SearchInput />
        {inputValue.trim().length > 0 && showCompletions && (
          <DirectCompletions onSelect={onSelect} />
        )}
      </div>
    </div>
  );
}
