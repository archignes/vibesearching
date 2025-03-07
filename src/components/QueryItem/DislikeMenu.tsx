/**
 * @file DislikeMenu.tsx
 * @description Renders a dislike button with feedback dropdown.
 */

import React, { useState, useRef } from "react";
import { ThumbsDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useClickOutside } from "./useClickOutside";

export interface DislikeMenuProps {
  /** The query text. */
  text: string;
  /** Whether the query is disliked. */
  isDisliked?: boolean;
  /**
   * Callback when a dislike action occurs.
   * @param text - The query text.
   * @param note - Optional feedback note.
   * @param issues - Optional issues array.
   */
  onDislike: (text: string, note?: string, issues?: string[]) => void;
  /** Callback to open the feedback dialog. */
  onOpenFeedback: () => void;
}

/**
 * DislikeMenu component provides a dislike action with a dropdown for feedback options.
 * @param {DislikeMenuProps} props - The component props.
 */
export const DislikeMenu: React.FC<DislikeMenuProps> = ({
  text,
  isDisliked,
  onDislike,
  onOpenFeedback,
}) => {
  const [showDislikeOptions, setShowDislikeOptions] = useState(false);
  const dislikeButtonRef = useRef<HTMLButtonElement>(null);
  const dislikeMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(dislikeMenuRef, () => {
    setShowDislikeOptions(false);
  });

  const handleDislike = () => {
    if (isDisliked) {
      setShowDislikeOptions(!showDislikeOptions);
    } else {
      onOpenFeedback();
    }
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            ref={dislikeButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              handleDislike();
            }}
            className={`p-1 transition-colors ${
              isDisliked
                ? "text-red-500 dark:text-red-500"
                : "text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500"
            }`}
            aria-label={isDisliked ? "Feedback options" : "Not helpful"}
          >
            <ThumbsDown size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{isDisliked ? "Feedback options" : "Not helpful"}</p>
        </TooltipContent>
      </Tooltip>

      {showDislikeOptions && (
        <div
          ref={dislikeMenuRef}
          className="absolute right-0 top-8 py-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-30"
        >
          <div className="px-4 py-1.5 space-y-2">
            <button
              onClick={() => {
                onOpenFeedback();
                setShowDislikeOptions(false);
              }}
              className="w-full text-left text-sm py-1.5 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
            >
              View/Edit feedback
            </button>
            <button
              onClick={() => {
                onDislike(text);
                setShowDislikeOptions(false);
              }}
              className="w-full text-left text-sm py-1.5 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Remove feedback
            </button>
          </div>
        </div>
      )}
    </>
  );
};
