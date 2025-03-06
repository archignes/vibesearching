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
interface SourceInfo {
  logo?: string;
  text: string;
  url: string;
}

export interface QueryItemProps {
  text: string;
  engines?: string[];
  onSelect: (text: string, engine: string) => void;
  onRevibe: (text: string) => void;
  variant: "vibed" | "direct" | "vibingaroundyou";
  isStarred?: boolean;
  isDisliked?: boolean;
  onStar?: (text: string) => void;
  onDislike: (text: string, note?: string, issues?: string[]) => void;
  sourceInfo?: SourceInfo;
}

/**
 * Props for the SearchContainer component
 */
export type SearchContainerProps = {
  onSelect: (query: string, engine?: string) => void;
};
