/**
 * @file QueryItem.types.ts
 * @description Contains types and interfaces for QueryItem components.
 */

/** Possible query variants. */
export type QueryVariant = "vibed" | "direct" | "vibingaroundyou";

/** Structure of a query’s source information. */
export interface InterestingQuerySource {
  url: string;
  logo?: string;
  text: string;
}

/** Props for the QueryItem components. */
export interface QueryItemProps {
  /** The text to display for the query. */
  text: string;
  /** The search engines to show (default is ["you"]). */
  engines?: string[];
  /** Callback when a search engine button is clicked. */
  onSelect: (text: string, engine: string) => void;
  /** Callback when the query is “revibed”. */
  onRevibe: (text: string) => void;
  /** The variant to render. */
  variant: QueryVariant;
  /** Whether the query is active. */
  isActive?: boolean;
  /** Whether the query is starred. */
  isStarred?: boolean;
  /** Whether the query is disliked. */
  isDisliked?: boolean;
  /** Callback when the star action is triggered. */
  onStar?: (text: string) => void;
  /**
   * Callback when a dislike action occurs.
   * @param text - The query text.
   * @param note - Optional feedback note.
   * @param issues - Optional issues array.
   */
  onDislike: (text: string, note?: string, issues?: string[]) => void;
  /** Additional source info for the query. */
  sourcesInfo?: InterestingQuerySource[];
}
