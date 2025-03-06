// src/components/VibedQueries.tsx

"use client";

import useInputStore from "@/store/useInputStore";
import useSearchStore from "@/store/useSearchStore";
import QueryItem from "./QueryItem";
import type { VibedQueriesProps } from "@/types/componentTypes";

export default function VibedQueries({ onSelect }: VibedQueriesProps) {
  const { showMoreVibes, toggleShowMoreVibes, setInputValue } = useInputStore();
  const { vibedQueries, isStarred, isDisliked, toggleStar, toggleDislike } =
    useSearchStore();
  if (vibedQueries.length === 0) return null;

  const displayedQueries = showMoreVibes
    ? [...vibedQueries].reverse()
    : [...vibedQueries].slice(-3).reverse();

  return (
    <div className="relative mt-6 h-[70vh] bg-white dark:bg-gray-800 rounded-lg">
      <div className="px-4 pb-4 flex flex-col justify-end h-full overflow-y-auto">
        {vibedQueries.length > 3 && (
          <button
            onClick={toggleShowMoreVibes}
            className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-2"
          >
            {showMoreVibes ? "Show fewer vibes" : "Show more vibes"}
          </button>
        )}
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
      </div>
    </div>
  );
}
