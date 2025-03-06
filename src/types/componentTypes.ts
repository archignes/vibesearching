// src/types/componentTypes.ts

/**
 * Props for the VibeConsole component
 */
export interface VibeConsoleProps {
  devMode: boolean;
}

/**
 * Props for the VibedQueries component
 */
export type VibedQueriesProps = {
  onSelect: (query: string, engine: string) => void;
};

/**
 * Props for the QueryItem component
 */
export interface QueryItemProps {
  text: string;
  engines?: string[];
  onSelect: (query: string, engine: string) => void;
  onRevibe: (value: string) => void;
  variant: "vibed" | "direct";
  isStarred: boolean;
  isDisliked: boolean;
  onStar: (query: string, note?: string) => void;
  onDislike: (query: string, note?: string, issues?: string[]) => void;
}

/**
 * Props for the SearchContainer component
 */
export type SearchContainerProps = {
  onSelect: (query: string, engine?: string) => void;
};