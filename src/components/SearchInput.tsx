"use client";

import { useEffect, useRef } from "react";
import useInputStore from "@/store/useInputStore";

export default function SearchInput() {
  const { inputValue, setInputValue } = useInputStore();
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
        className="w-full min-h-[48px] max-h-[200px] p-3 pr-10 bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-400/30 dark:border-blue-500/20 shadow-sm resize-none overflow-hidden focus:outline-none focus:ring-0 focus:border-blue-500 relative z-10"
        rows={1}
      />
      {inputValue && (
        <button
          onClick={() => setInputValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 z-20"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
