"use client";

import useSearchStore from "@/store/useSearchStore";
import useInputStore from "@/store/useInputStore";
import QueryItem from "./QueryItem/Core";

type DirectCompletionsProps = {
  onSelect: (query: string, engine?: string) => void;
  activeIndex?: number; // index of which item is “highlighted”
};

export default function DirectCompletions({
  onSelect,
  activeIndex = -1,
}: DirectCompletionsProps): JSX.Element | null {
  const { directCompletions } = useSearchStore();
  const { inputValue, setInputValue } = useInputStore();
  if (directCompletions.length === 0 || !inputValue.trim()) return null;

  return (
    <div className="absolute top-full left-0 right-0 -mt-3 pt-1 bg-white dark:bg-gray-800 rounded-b-lg shadow-lg z-0 overflow-visible w-full border-2 border-t-0 border-blue-400/30 dark:border-blue-500/20">
      {directCompletions.map((completion, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={completion.id}
            className={`border-b border-gray-100 dark:border-gray-700 ${
              isActive ? "bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            <QueryItem
              text={completion.text}
              onSelect={onSelect}
              onRevibe={setInputValue}
              variant="direct"
              isStarred={false}
              isDisliked={false}
              isActive={isActive}
              onStar={() => {}}
              onDislike={() => {}}
            />
          </div>
        );
      })}
    </div>
  );
}
