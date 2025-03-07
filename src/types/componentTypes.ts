// src/types/componentTypes.ts

import { KeyboardEventHandler } from "react";

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
 * Props for the VibingAroundYou component
 */
export interface VibingAroundYouProps {
  onVibeStart?: () => void;
}

/**
 * Props for the LoadingVibes component
 */
export interface LoadingVibesProps {
  isVisible: boolean;
}

/**
 * Props for the QueryItem component
 */
interface sourcesInfo {
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
  sourcesInfo?: sourcesInfo;
}

/**
 * Props for the SearchContainer component
 */
export interface SearchContainerProps {
  onSelect: (query: string, engine?: string) => void;
  handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
  activeSection: "input" | "direct" | "vibed";
  activeIndex: number;
}
