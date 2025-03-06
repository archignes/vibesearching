// src/components/VibingAroundYou.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";
import QueryItem from "./QueryItem";
import useInputStore from "@/store/useInputStore";
import useSearchStore from "@/store/useSearchStore";
import { interestingQueries } from "@/data/interestingQueries";

export default function VibingAroundYou(): JSX.Element {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [shuffledQueries, setShuffledQueries] = useState<
    typeof interestingQueries
  >([]);
  const [visibleQueries, setVisibleQueries] = useState<
    typeof interestingQueries
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { setInputValue } = useInputStore();
  const { toggleStar, toggleDislike, isStarred, isDisliked } = useSearchStore();

  // Shuffle all the queries
  const shuffleQueries = () => {
    const shuffled = [...interestingQueries].sort(() => 0.5 - Math.random());
    setShuffledQueries(shuffled);
  };

  // Initialize with shuffled queries on first render
  useEffect(() => {
    shuffleQueries();
  }, []);

  // Calculate visible queries that fit within the container without scrolling
  useEffect(() => {
    if (!shuffledQueries.length || !containerRef.current) return;

    const calculateVisibleQueries = () => {
      if (!containerRef.current) return;
      // Container height minus header (for padding, borders, margins, and header)
      const containerHeight = containerRef.current.clientHeight;
      const headerHeight = 70; // Height of header area including margins and padding
      const availableHeight = containerHeight - headerHeight;

      // Use fixed height estimates based on query text length
      // Average query item height plus margin space
      const baseQueryHeight = 90;
      // Additional height per line of text (approximately)
      const heightPerTextLength = 0.1;

      // Start with no queries
      let tempVisibleQueries: typeof interestingQueries = [];
      let totalUsedHeight = 0;

      // Add queries until we run out of space
      for (let i = 0; i < shuffledQueries.length; i++) {
        // Estimate height based on text length (more text = more height)
        const query = shuffledQueries[i];
        // Basic calculation: base height + extra for text length + extra if it has source (20px)
        const estimatedHeight =
          baseQueryHeight +
          query.text.length * heightPerTextLength +
          (query.source ? 20 : 0);

        // If adding this query would exceed available height, stop
        if (totalUsedHeight + estimatedHeight > availableHeight) {
          break;
        }

        // Otherwise add it to our visible queries
        tempVisibleQueries.push(query);
        totalUsedHeight += estimatedHeight;
      }

      // Always show at least 1 query, even if it might overflow slightly
      if (tempVisibleQueries.length === 0 && shuffledQueries.length > 0) {
        tempVisibleQueries = [shuffledQueries[0]];
      }

      setVisibleQueries(tempVisibleQueries);
    };

    // Calculate initially
    calculateVisibleQueries();

    // Recalculate on window resize
    window.addEventListener("resize", calculateVisibleQueries);
    return () => window.removeEventListener("resize", calculateVisibleQueries);
  }, [shuffledQueries]);

  // Handle refresh - shuffle again
  const handleRefresh = () => {
    shuffleQueries();
  };

  const handleQueryClick = () => {
    setIsAnimating(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative mt-6 bg-white dark:bg-gray-800 rounded-lg h-[70vh] overflow-hidden transition-opacity duration-300 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleQueryClick}
    >
      <div className="p-4 flex justify-end">
        <button
          onClick={handleRefresh}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Refresh interesting vibes"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div ref={contentRef} className="px-4 pb-4 space-y-2 overflow-hidden">
        {visibleQueries.map((query) => (
          <QueryItem
            key={query.text}
            text={query.text}
            onSelect={() => {}} // No-op since we just want revibe functionality
            onRevibe={setInputValue}
            variant="vibingaroundyou"
            engines={[]}
            isStarred={isStarred(query.text)}
            isDisliked={isDisliked(query.text)}
            onStar={() => toggleStar(query.text)}
            onDislike={(text, note) => toggleDislike(text, note)}
            sourceInfo={query.source}
          />
        ))}
      </div>
    </div>
  );
}
