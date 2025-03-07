"use client";

import { useState } from "react";
import useSearchStore from "@/store/useSearchStore";
import { Trash2, ChevronUp, ChevronDown, Star, Clock } from "lucide-react";

export default function Vibrary(): JSX.Element | null {
  const { searchHistory, clearHistory, starQuery } = useSearchStore();
  const [isExpanded, setIsExpanded] = useState(false);

  if (searchHistory.length === 0) {
    return null;
  }

  // Format timestamp
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          vibrary
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => clearHistory()}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear history"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-2 mt-2">
          {searchHistory.map((query) => (
            <div
              key={query.id}
              className="p-2 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-gray-400" />
                <span className="text-xs text-gray-500">
                  {formatTime(query.timestamp)}
                </span>
                <p className="text-sm truncate">{query.text}</p>
              </div>
              <button
                onClick={() => starQuery(query.id, !query.starred)}
                className={`text-gray-400 hover:text-yellow-500 ${
                  query.starred ? "text-yellow-500" : ""
                }`}
                aria-label={query.starred ? "Unstar" : "Star"}
              >
                <Star size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
