// src/store/useSearchStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SearchQuery = {
  id: string;
  text: string;
  timestamp: number;
  starred?: boolean;
  disliked?: boolean;
};

export type VibedQuery = {
  id: string;
  originalQuery: string;
  vibedText: string;
  engines: string[];
  timestamp: number;
};

export type DirectCompletion = {
  id: string;
  text: string;
  matchScore: number;
  engines: string[];
};

interface FeedbackItem {
  query: string;
  note?: string;
  timestamp: number;
}

type SearchStore = {
  // Results
  vibedQueries: VibedQuery[];
  setVibedQueries: (queries: VibedQuery[]) => void;
  addVibedQuery: (query: VibedQuery) => void;

  directCompletions: DirectCompletion[];
  setDirectCompletions: (completions: DirectCompletion[]) => void;

  // History
  searchHistory: SearchQuery[];
  addToHistory: (query: SearchQuery) => void;
  clearHistory: () => void;
  starQuery: (id: string, starred: boolean) => void;

  // Feedback
  starredQueries: FeedbackItem[];
  dislikedQueries: FeedbackItem[];
  toggleStar: (query: string, note?: string) => void;
  toggleDislike: (query: string, note?: string) => void;
  isStarred: (query: string) => boolean;
  isDisliked: (query: string) => boolean;
  getFeedbackNote: (query: string) => string | undefined;
};

const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      // Results
      vibedQueries: [],
      setVibedQueries: (queries) => set({ vibedQueries: queries }),
      addVibedQuery: (query) =>
        set((state) => ({
          vibedQueries: [query, ...state.vibedQueries],
        })),

      directCompletions: [],
      setDirectCompletions: (completions) =>
        set({ directCompletions: completions }),

      // History
      searchHistory: [],
      addToHistory: (query) =>
        set((state) => ({
          searchHistory: [query, ...state.searchHistory.slice(0, 19)],
        })),
      clearHistory: () => set({ searchHistory: [] }),
      starQuery: (id, starred) =>
        set((state) => ({
          searchHistory: state.searchHistory.map((q) =>
            q.id === id ? { ...q, starred } : q
          ),
        })),

      // Feedback
      starredQueries: [],
      dislikedQueries: [],
      toggleStar: (query: string, note?: string) =>
        set((state) => {
          const isCurrentlyStarred = state.starredQueries.some(
            (f) => f.query === query
          );
          const newDisliked = state.dislikedQueries.filter(
            (f) => f.query !== query
          );

          return {
            starredQueries: isCurrentlyStarred
              ? state.starredQueries.filter((f) => f.query !== query)
              : [
                  ...state.starredQueries,
                  { query, note, timestamp: Date.now() },
                ],
            dislikedQueries: newDisliked,
          };
        }),

      toggleDislike: (query: string, note?: string) =>
        set((state) => {
          const isCurrentlyDisliked = state.dislikedQueries.some(
            (f) => f.query === query
          );
          const newStarred = state.starredQueries.filter(
            (f) => f.query !== query
          );

          return {
            dislikedQueries: isCurrentlyDisliked
              ? state.dislikedQueries.filter((f) => f.query !== query)
              : [
                  ...state.dislikedQueries,
                  { query, note, timestamp: Date.now() },
                ],
            starredQueries: newStarred,
          };
        }),

      isStarred: (query: string) =>
        get().starredQueries.some((f) => f.query === query),
      isDisliked: (query: string) =>
        get().dislikedQueries.some((f) => f.query === query),
      getFeedbackNote: (query: string) => {
        const starred = get().starredQueries.find((f) => f.query === query);
        const disliked = get().dislikedQueries.find((f) => f.query === query);
        return starred?.note || disliked?.note;
      },
    }),
    {
      name: "vibesearching-persistent-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSearchStore;
