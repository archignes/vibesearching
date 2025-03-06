// src/hooks/useSearchNavigator.ts

import { v4 as uuidv4 } from "uuid";
import useSearchStore from "@/store/useSearchStore";

export function useSearchNavigator() {
  const { addToHistory } = useSearchStore();

  const handleSearch = (query: string, engine: string = "you"): void => {
    // Add to history
    addToHistory({
      id: uuidv4(),
      text: query,
      timestamp: Date.now(),
    });

    // Construct search URL based on engine
    let searchUrl: string = "";

    switch (engine) {
      case "you":
        searchUrl = `https://you.com/search?q=${encodeURIComponent(query)}`;
        break;
      case "google":
        searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
          query
        )}`;
        break;
      case "bing":
        searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(
          query
        )}`;
        break;
      case "duckduckgo":
        searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        break;
      case "perplexity":
        searchUrl = `https://www.perplexity.ai/search?q=${encodeURIComponent(
          query
        )}`;
        break;
      case "kagi":
        searchUrl = `https://kagi.com/search?q=${encodeURIComponent(query)}`;
        break;
      case "brave":
        searchUrl = `https://search.brave.com/search?q=${encodeURIComponent(
          query
        )}`;
        break;
      case "youtube":
        searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
          query
        )}`;
        break;
      default:
        searchUrl = `https://you.com/search?q=${encodeURIComponent(query)}`;
    }

    // Open search in current window
    window.location.href = searchUrl;
  };

  return { handleSearch };
}
