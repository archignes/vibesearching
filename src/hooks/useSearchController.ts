// src/hooks/useSearchController.ts

import { useEffect, useRef, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { v4 as uuidv4 } from "uuid";
import useSearchStore, {
  DirectCompletion,
  VibedQuery,
} from "@/store/useSearchStore";
import useInputStore from "@/store/useInputStore";

interface UseSearchControllerProps {
  devMode: boolean;
}

export function useSearchController({ devMode }: UseSearchControllerProps): {
  inputValue: string;
  setInputValue: (value: string) => void;
  debouncedInput: string;
  isStreaming: boolean;
  vibedQueries: VibedQuery[];
  directCompletions: DirectCompletion[];
  fetchSuggestions: () => Promise<void>;
} {
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

  const fetchSuggestions = useCallback(async (): Promise<void> => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setIsStreaming(true);

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

      // ...same code as before for formatting data, etc.

      // Example checks:
      const formattedVibedQueries = (data.vibedQueries ?? []).map(
        (q: VibedQuery) => {
          const queryText = q.vibedText || q.originalQuery || "Suggested query";
          return {
            id: q.id || uuidv4(),
            originalQuery: q.originalQuery || debouncedInput,
            vibedText: queryText,
            engines: q.engines || ["you"],
            timestamp: q.timestamp || Date.now(),
          };
        }
      );

      const formattedDirectCompletions = (data.directCompletions ?? []).map(
        (c: DirectCompletion) => {
          if (typeof c === "string") {
            return {
              id: uuidv4(),
              text: c,
              matchScore: 1,
              engines: ["you"],
            };
          }
          return {
            id: c.id || uuidv4(),
            text: c.text || "Suggested completion",
            matchScore: c.matchScore || 1,
            engines: c.engines || ["you"],
          };
        }
      );

      setVibedQueries(formattedVibedQueries);
      setDirectCompletions(formattedDirectCompletions);
    } catch (error) {
      if (
        error instanceof Error &&
        error.name !== "AbortError" &&
        process.env.NODE_ENV !== "production"
      ) {
        console.error("❌ Error in fetchSuggestions:", error);
      }
    } finally {
      setIsStreaming(false);
    }
  }, [
    debouncedInput,
    devMode,
    setVibedQueries,
    setDirectCompletions,
    setIsStreaming,
  ]);

  useEffect(() => {
    // --- IMPORTANT: if < 3 chars, don't fetch and ensure we clear streaming ---
    if (debouncedInput.trim().length < 3) {
      setVibedQueries([]);
      setDirectCompletions([]);
      setIsStreaming(false); // <-- fix: forcibly ensure no loading state
      return;
    }
    // -------------------------------------------------------------------------

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
    fetchSuggestions,
    setInputValue,
  ]);

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
