"use client";

import { useEffect, useRef } from "react";
import useSearchStore from "@/store/useSearchStore";

export default function SearchInput() {
  const { inputValue, setInputValue } = useSearchStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to get the correct scrollHeight
    textarea.style.height = "auto";
    // Set new height based on scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [inputValue]);

  return (
    <div className="relative w-full m-0 p-0">
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search with vibes..."
        className="w-full min-h-[48px] max-h-[200px] p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-400/30 dark:border-blue-500/20 shadow-sm resize-none overflow-hidden focus:outline-none focus:ring-0 focus:border-blue-500 relative z-10"
        rows={1}
      />
    </div>
  );
}
