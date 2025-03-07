"use client";

import useInputStore from "@/store/useInputStore";
import useSearchStore from "@/store/useSearchStore";
import QueryItem from "./QueryItem/Core";
import type { VibedQueriesProps } from "@/types/componentTypes";
import { ReactElement } from "react";

interface ExtendedVibedQueriesProps extends VibedQueriesProps {
  activeIndex: number;
}

export default function VibedQueries({
  onSelect,
  activeIndex,
}: ExtendedVibedQueriesProps): ReactElement | null {
  const { showMoreVibes, toggleShowMoreVibes, setInputValue } = useInputStore();
  const { vibedQueries, isStarred, isDisliked, toggleStar, toggleDislike } =
    useSearchStore();
  if (vibedQueries.length === 0) return null;

  // Take the first N items from the front if you want newest
  // because vibedQueries[0] is newest
  const displayedQueries = showMoreVibes
    ? vibedQueries
    : vibedQueries.slice(0, 3);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg">
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
          {displayedQueries.map((query, i) => (
            <div key={query.id}>
              <QueryItem
                text={query.vibedText}
                engines={query.engines}
                onSelect={onSelect}
                onRevibe={setInputValue}
                variant="vibed"
                isStarred={isStarred(query.vibedText)}
                isDisliked={isDisliked(query.vibedText)}
                isActive={i === activeIndex}
                onStar={toggleStar}
                onDislike={toggleDislike}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
