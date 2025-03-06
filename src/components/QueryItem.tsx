import {
  ThumbsDown,
  Star,
  RefreshCw,
  MoreVertical,
  ArrowRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useSearchStore from "@/store/useSearchStore";
import { SEARCH_ENGINES } from "@/config/searchEngines";
import { FeedbackDialog } from "@/components/FeedbackDialog";
import type { QueryItemProps } from "@/types/componentTypes";

export default function QueryItem({
  text,
  engines = ["you"],
  onSelect,
  onRevibe,
  variant,
  isStarred,
  isDisliked,
  onStar,
  onDislike,
}: QueryItemProps) {
  const { toggleStar, toggleDislike } = useSearchStore();

  const [showActions, setShowActions] = useState(false);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [showDislikeOptions, setShowDislikeOptions] = useState(false);
  const dislikeButtonRef = useRef<HTMLButtonElement>(null);
  const dislikeMenuRef = useRef<HTMLDivElement>(null);

  const handleDislike = () => {
    if (isDisliked) {
      // Show options instead of toggling immediately
      setShowDislikeOptions(!showDislikeOptions);
    } else {
      // Not disliked yet, show feedback dialog
      setShowNoteDialog(true);
    }
  };

  // Handle clicks outside dislike menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dislikeMenuRef.current &&
        !dislikeMenuRef.current.contains(event.target as Node) &&
        !dislikeButtonRef.current?.contains(event.target as Node)
      ) {
        setShowDislikeOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmitNote = (note: string, issues: string[]) => {
    onDislike(text, note, issues);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
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

  const baseClasses = "shadow-sm border dark:border-gray-700";
  const variantClasses = {
    vibed:
      "p-3 rounded-lg border-black/10 bg-white dark:bg-gray-800 dark:border-white/10",
    direct: "p-1 border-transparent bg-white dark:bg-gray-900",
  };

  if (variant === "direct") {
    return (
      <div className="group relative">
        <div
          className={`p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer flex items-center justify-between
            ${showActions ? "bg-gray-50 dark:bg-gray-700/50" : ""}`}
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

        {/* Position dropdown - below on mobile, right on desktop */}
        {showActions && (
          <div
            ref={menuRef}
            className="absolute md:left-full md:top-0 md:ml-2 
                     top-full right-0 mt-2 md:mt-0
                     py-2 w-48 bg-white dark:bg-gray-800 rounded-md 
                     shadow-lg border border-gray-200 dark:border-gray-700 z-20"
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
                    <img
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
                  handleDislike();
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
  }

  // Original layout for vibed queries
  return (
    <>
      <div className={`${baseClasses} ${variantClasses[variant]}`}>
        <p className="text-sm mb-2">{text}</p>

        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            <TooltipProvider>
              {engines.map((engine) => {
                const engineData = SEARCH_ENGINES.find((e) => e.id === engine);
                return (
                  <Tooltip key={engine}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onSelect(text, engine)}
                        className="px-1 py-1 text-xs rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1.5"
                      >
                        {engineData && (
                          <img
                            src={engineData.favicon}
                            alt={engineData.name}
                            className="w-3.5 h-3.5 object-contain"
                          />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Search with {engineData?.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>

          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onRevibe(text)}
                    className="p-1 text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-500 transition-colors"
                    aria-label="Revibe"
                  >
                    <RefreshCw size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Revibe this query</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => toggleStar(text)}
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
                <TooltipContent>
                  <p>{isStarred ? "Remove from saved" : "Save for later"}</p>
                </TooltipContent>
              </Tooltip>

              <div className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      ref={dislikeButtonRef}
                      onClick={handleDislike}
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
                  <TooltipContent>
                    <p>{isDisliked ? "Feedback options" : "Not helpful"}</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* Popover for disliked items */}
                {showDislikeOptions && (
                  <div
                    ref={dislikeMenuRef}
                    className="absolute right-0 top-8 py-2 w-48 bg-white dark:bg-gray-800 rounded-md 
                           shadow-lg border border-gray-200 dark:border-gray-700 z-30"
                  >
                    <div className="px-4 py-1.5 space-y-2">
                      <button
                        onClick={() => {
                          setShowNoteDialog(true);
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
              </div>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <FeedbackDialog
        open={showNoteDialog}
        onOpenChange={setShowNoteDialog}
        onSubmit={handleSubmitNote}
        queryText={text}
      />
    </>
  );
}
