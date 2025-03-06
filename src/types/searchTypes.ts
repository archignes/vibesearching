export interface HistoryItem {
  id: string;
  text: string;
  timestamp: number;
}

export interface VibedQuery {
  id: string;
  originalQuery: string;
  vibedText: string;
  engines: string[];
  timestamp: number;
}

export interface DirectCompletion {
  id: string;
  text: string;
  matchScore: number;
  engines: string[];
}

export interface FeedbackItem {
  query: string;
  note?: string;
  issues?: string[];
  timestamp: number;
}

export interface SearchStoreState {
  inputValue: string;
  isStreaming: boolean;
  vibedQueries: VibedQuery[];
  directCompletions: DirectCompletion[];
  searchHistory: HistoryItem[];
  starredQueries: FeedbackItem[];
  dislikedQueries: FeedbackItem[];
  isStarred: (query: string) => boolean;
  isDisliked: (query: string) => boolean;
  toggleStar: (query: string, note?: string) => void;
  toggleDislike: (query: string, note?: string, issues?: string[]) => void;
  setInputValue: (value: string) => void;
  setIsStreaming: (isStreaming: boolean) => void;
  setVibedQueries: (queries: VibedQuery[]) => void;
  setDirectCompletions: (completions: DirectCompletion[]) => void;
  addToHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
}
