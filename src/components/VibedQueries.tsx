"use client";

import useSearchStore from "@/store/useSearchStore";
import QueryItem from "./QueryItem";
import type { VibedQueriesProps } from "@/types/componentTypes";

export default function VibedQueries({ onSelect }: VibedQueriesProps) {
  const {
    vibedQueries,
    showMoreVibes,
    toggleShowMoreVibes,
    setInputValue,
    isStarred,
    isDisliked,
    toggleStar,
    toggleDislike,
  } = useSearchStore();

  if (vibedQueries.length === 0) return null;

  const displayedQueries = showMoreVibes
    ? vibedQueries
    : vibedQueries.slice(0, 3);

  return (
    <div className="space-y-2 overflow-y-auto max-h-[60vh]">
      <div className="space-y-2">
        {displayedQueries.map((query) => (
          <QueryItem
            key={query.id}
            text={query.vibedText}
            engines={query.engines}
            onSelect={onSelect}
            onRevibe={setInputValue}
            variant="vibed"
            isStarred={isStarred(query.vibedText)}
            isDisliked={isDisliked(query.vibedText)}
            onStar={toggleStar}
            onDislike={toggleDislike}
          />
        ))}
      </div>

      {vibedQueries.length > 3 && (
        <button
          onClick={toggleShowMoreVibes}
          className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {showMoreVibes ? "Show fewer vibes" : "Show more vibes"}
        </button>
      )}
    </div>
  );
}
