"use client";

import { useState } from "react";
import { Menu, MessageSquare, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import FeedbackHistory from "./FeedbackHistory";
import StarredQueries from "./StarredQueries";
/**
/**
 * Settings dropdown component that displays a menu of options
 */
export default function Settings(): JSX.Element {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showStarred, setShowStarred] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-2">
          <Menu size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Help</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => setShowFeedback(true)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Feedback History</span>
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => setShowStarred(true)}>
            <Star className="mr-2 h-4 w-4" />
            <span>Starred Queries</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <FeedbackHistory open={showFeedback} onOpenChange={setShowFeedback} />
      <StarredQueries open={showStarred} onOpenChange={setShowStarred} />
    </>
  );
}
