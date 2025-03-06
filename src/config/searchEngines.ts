export const SEARCH_ENGINES = [
  { id: "you", name: "You.com", favicon: "/favicons/you-com.webp" },
  { id: "google", name: "Google", favicon: "/favicons/google.ico" },
  { id: "bing", name: "Bing", favicon: "/favicons/bing.ico" },
  { id: "brave", name: "Brave", favicon: "/favicons/brave.ico" },
  {
    id: "perplexity",
    name: "Perplexity",
    favicon: "/favicons/perplexity-ai.ico",
  },
] as const;

export type SearchEngineId = (typeof SEARCH_ENGINES)[number]["id"];
