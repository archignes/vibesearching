"use client";

import { useState } from "react";
import { X } from "lucide-react";
import QueryItem from "./QueryItem";
import useSearchStore from "@/store/useSearchStore";

export default function VibingAroundYou(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { setInputValue } = useSearchStore();

  if (!isVisible) {
    return <></>;
  }

  const trendingQueries: string[] = [
    "how fast can an elephant run?",
    "best productivity apps 2025",
    "why did the titanic sink?",
    "learn typescript tutorial",
    "nextjs vs react comparison",
    "web development roadmap 2025",
  ];

  return (
    <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <X size={16} />
      </button>

      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
        trending vibes:
      </h2>

      <div className="space-y-1">
        {trendingQueries.map((query) => (
          <QueryItem
            key={query}
            text={query}
            onSelect={() => {}} // No-op since we just want revibe functionality
            onRevibe={setInputValue}
            variant="vibed"
            engines={[]}
            isStarred={false}
            isDisliked={false}
            onStar={() => {}}
            onDislike={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
