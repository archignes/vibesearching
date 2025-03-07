/**
 * @file InteractiveQueryItem.tsx
 * @description Component for non-direct query items, handling "vibed" and "vibingaroundyou" variants.
 */

import React, { useState } from "react";
import { RefreshCw, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QueryItemProps, QueryVariant } from "./QueryItem.types";
import { EngineButtons } from "./EngineButtons";
import { DislikeMenu } from "./DislikeMenu";
import { FeedbackDialog } from "@/components/FeedbackDialog";
import Image from "next/image";
interface InteractiveQueryItemProps extends QueryItemProps {}

/**
 * InteractiveQueryItem component renders query items for the "vibed" and "vibingaroundyou" variants.
 * @param {InteractiveQueryItemProps} props - The component props.
 */
export const InteractiveQueryItem: React.FC<InteractiveQueryItemProps> = ({
  text,
  engines = ["you"],
  onSelect,
  onRevibe,
  variant,
  isStarred,
  isDisliked,
  isActive,
  onStar,
  onDislike,
  sourcesInfo,
}) => {
  const [showNoteDialog, setShowNoteDialog] = useState(false);

  const baseClasses = "shadow-sm border dark:border-gray-700";
  const variantClasses: Record<QueryVariant, string> = {
    vibed:
      "p-3 rounded-lg border-black/10 bg-white dark:bg-gray-800 dark:border-white/10 hover:border-purple-500 transition-colors",
    direct: "p-1 border-transparent bg-white dark:bg-gray-900", // not used in this component
    vibingaroundyou:
      "p-3 rounded-lg border-black/10 bg-white dark:bg-gray-800 dark:border-white/10 hover:border-purple-500 transition-colors",
  };

  const handleStar = (e: React.MouseEvent): void => {
    e.stopPropagation();
    if (onStar) {
      onStar(text);
    }
  };

  const handleSubmitNote = (note: string, issues: string[]): void => {
    onDislike(text, note, issues);
  };

  const content = (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${
        isActive ? "border-purple-500 ring-1 ring-purple-500" : ""
      }`}
      onClick={() => onRevibe(text)}
    >
      <p className="text-sm mb-2">{text}</p>
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          <EngineButtons engines={engines} text={text} onSelect={onSelect} />
        </div>
        <div className="flex mr-1 space-x-1 relative z-10">
          {variant === "vibingaroundyou" ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleStar}
                  className={`p-1 transition-colors ${
                    isStarred
                      ? "text-purple-500 dark:text-purple-500"
                      : "text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-500"
                  }`}
                  aria-label={isStarred ? "Unstar" : "Star"}
                >
                  <Star size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{isStarred ? "Remove from saved" : "Save for later"}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRevibe(text);
                    }}
                    className="p-1 text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-500 transition-colors"
                    aria-label="Revibe"
                  >
                    <RefreshCw size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Revibe this query</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleStar}
                    className={`p-1 transition-colors ${
                      isStarred
                        ? "text-yellow-500 dark:text-yellow-500"
                        : "text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-500"
                    }`}
                    aria-label={isStarred ? "Unstar" : "Star"}
                  >
                    <Star size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{isStarred ? "Remove from saved" : "Save for later"}</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
          <DislikeMenu
            text={text}
            isDisliked={isDisliked}
            onDislike={onDislike}
            onOpenFeedback={() => setShowNoteDialog(true)}
          />
        </div>
      </div>
      {variant === "vibingaroundyou" && sourcesInfo && (
        <div className="flex items-center justify-end space-x-1.5 text-xs text-gray-500 dark:text-gray-400 mt-.5 mb-0 relative z-10">
          {sourcesInfo.map((source) => (
            <Tooltip key={source.url}>
              <TooltipTrigger asChild>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded px-2 py-1 flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  {source.logo && (
                    <Image
                      src={source.logo}
                      alt={source.text}
                      className="w-4 h-4 object-contain inline-block"
                    />
                  )}
                  <span>{source.text}</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Click to open the query source</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );

  if (variant === "vibingaroundyou") {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={2000}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent
            side="left"
            className="flex flex-col items-center gap-2"
          >
            <RefreshCw size={40} className="text-purple-500" />
            <p className="text-center">Click to Revibe</p>
          </TooltipContent>
        </Tooltip>
        <FeedbackDialog
          open={showNoteDialog}
          onOpenChange={setShowNoteDialog}
          onSubmit={handleSubmitNote}
          queryText={text}
        />
      </TooltipProvider>
    );
  }

  return (
    <>
      {content}
      <FeedbackDialog
        open={showNoteDialog}
        onOpenChange={setShowNoteDialog}
        onSubmit={handleSubmitNote}
        queryText={text}
      />
    </>
  );
};
