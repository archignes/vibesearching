/**
 * @file EngineButtons.tsx
 * @description Renders search engine buttons with tooltips.
 */

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SEARCH_ENGINES } from "@/config/searchEngines";
import Image from "next/image";
interface EngineButtonsProps {
  /** Array of engine identifiers. */
  engines: string[];
  /** The query text. */
  text: string;
  /** Callback when a button is clicked. */
  onSelect: (text: string, engine: string) => void;
}

/**
 * EngineButtons component renders a list of buttons for each search engine.
 * @param {EngineButtonsProps} props - The component props.
 */
export const EngineButtons: React.FC<EngineButtonsProps> = ({
  engines,
  text,
  onSelect,
}) => {
  return (
    <>
      {engines.map((engine) => {
        const engineData = SEARCH_ENGINES.find((e) => e.id === engine);
        return (
          <Tooltip key={engine}>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(text, engine);
                }}
                className="px-1 py-1 text-xs rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1.5"
              >
                {engineData && (
                  <Image
                    src={engineData.favicon}
                    alt={engineData.name}
                    className="w-3.5 h-3.5 object-contain"
                  />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Search with {engineData?.name}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );
};
