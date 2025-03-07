/**
 * @file DirectQueryItem.tsx
 * @description Component for the "direct" variant query item.
 */

import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, ThumbsDown } from "lucide-react";
import { SEARCH_ENGINES } from "@/config/searchEngines";
import { QueryItemProps } from "./QueryItem.types";
import Image from "next/image";

interface DirectQueryItemProps extends QueryItemProps {}

/**
 * DirectQueryItem component renders a simplified query item for the "direct" variant.
 * @param {DirectQueryItemProps} props - The component props.
 */
export const DirectQueryItem: React.FC<DirectQueryItemProps> = ({
  text,
  onRevibe,
  onSelect,
  onDislike,
}) => {
  const [showActions, setShowActions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle clicks outside the actions menu.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowActions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="group relative">
      <div
        className={`p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer flex items-center justify-between ${
          showActions ? "bg-gray-50 dark:bg-gray-700/50" : ""
        }`}
        onClick={() => onRevibe(text)}
      >
        <span>{text}</span>
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();
            setShowActions(!showActions);
          }}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label="More actions"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {showActions && (
        <div
          ref={menuRef}
          className="absolute md:left-full md:top-0 md:ml-2 top-full right-0 mt-2 md:mt-0 py-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20"
        >
          <div className="px-4 py-2 space-y-2">
            <div className="flex flex-wrap gap-2">
              {SEARCH_ENGINES.map((engine) => (
                <button
                  key={engine.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(text, engine.id);
                  }}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title={engine.name}
                >
                  <Image
                    src={engine.favicon}
                    alt={engine.name}
                    className="w-4 h-4 object-contain"
                  />
                </button>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDislike(text);
              }}
              className="flex items-center space-x-2 w-full px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ThumbsDown size={14} />
              <span>Not helpful</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
