// src/hooks/useSearchController.ts

import { useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { v4 as uuidv4 } from "uuid";
import useSearchStore from "@/store/useSearchStore";
import useInputStore from "@/store/useInputStore";
interface UseSearchControllerProps {
  devMode: boolean;
}

export function useSearchController({ devMode }: UseSearchControllerProps) {
  const {
    vibedQueries,
    setVibedQueries,
    directCompletions,
    setDirectCompletions,
  } = useSearchStore();
  const { inputValue, setInputValue, isStreaming, setIsStreaming } =
    useInputStore();

  const [debouncedInput] = useDebounce(inputValue, 500);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (debouncedInput.trim().length < 3) {
      setVibedQueries([]);
      setDirectCompletions([]);
      return;
    }

    fetchSuggestions();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    debouncedInput,
    setVibedQueries,
    setDirectCompletions,
    setIsStreaming,
    devMode,
    inputValue,
    setInputValue,
  ]);

  const fetchSuggestions = async (): Promise<void> => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setIsStreaming(true);

      console.log("🚀 Fetching suggestions for:", debouncedInput);

      const response = await fetch("/api/vibe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: debouncedInput, devMode }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // In dev mode, update input if it's not already set
      if (devMode && data.originalQuery && !inputValue) {
        setInputValue(data.originalQuery);
      }

      console.log("📦 Received response:", data);

      // Check if vibedQueries exists and has the expected structure
      if (!data.vibedQueries || !Array.isArray(data.vibedQueries)) {
        console.error("❌ Invalid vibedQueries data:", data.vibedQueries);
        return; // Early return to prevent further processing
      }

      // Check if any vibedQueries are missing both vibedText and text properties
      const missingTextQueries = data.vibedQueries.filter(
        (q: { vibedText?: string; text?: string }) => !q.vibedText && !q.text
      );
      if (missingTextQueries.length > 0) {
        console.error("❌ Queries missing text content:", missingTextQueries);
      }

      const formattedVibedQueries =
        data.vibedQueries.map((q: any) => {
          // Check for either vibedText or text property (handle both formats)
          const queryText = q.vibedText || q.text;

          // Add more defensive logic with detailed logging
          if (!queryText) {
            console.error("❌ Query missing text/vibedText:", q);
            // Provide a fallback text to prevent empty entries
            q.vibedText =
              q.originalQuery || debouncedInput || "Suggested query";
          }

          return {
            id: q.id || uuidv4(),
            originalQuery: q.originalQuery || debouncedInput,
            vibedText:
              queryText ||
              q.originalQuery ||
              debouncedInput ||
              "Suggested query",
            engines: q.engines || ["you"],
            timestamp: q.timestamp || Date.now(),
          };
        }) || [];

      console.log("📝 Formatted vibed queries:", formattedVibedQueries);

      // Add debugging for directCompletions format
      console.log("🔎 Direct completions format:", data.directCompletions);

      // Handle both formats - array of strings or array of objects
      const formattedDirectCompletions =
        data.directCompletions?.map((c: any) => {
          // If directCompletions is an array of strings (as per the prompt format)
          if (typeof c === "string") {
            return {
              id: uuidv4(),
              text: c,
              matchScore: 1,
              engines: ["you"],
            };
          }

          // If directCompletions is an array of objects (as per our code's expectation)
          return {
            id: c.id || uuidv4(),
            text: c.text || "Suggested completion",
            matchScore: c.matchScore || 1,
            engines: c.engines || ["you"],
          };
        }) || [];

      console.log(
        "📝 Formatted direct completions:",
        formattedDirectCompletions
      );

      setVibedQueries(formattedVibedQueries);
      setDirectCompletions(formattedDirectCompletions);
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("❌ Error:", error);
      }
    } finally {
      setIsStreaming(false);
    }
  };

  return {
    inputValue,
    setInputValue,
    debouncedInput,
    isStreaming,
    vibedQueries,
    directCompletions,
    fetchSuggestions,
  };
}
