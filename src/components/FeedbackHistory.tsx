// src/components/FeedbackHistory.tsx

"use client";

import useSearchStore from "@/store/useSearchStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ISSUE_TYPES, IssueId } from "@/types/feedbackTypes";

// Define the disliked feedback item type
interface DislikedFeedbackItem {
  query: string;
  timestamp: number;
  issues?: IssueId[];
  note?: string;
}

interface FeedbackHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FeedbackHistory({
  open,
  onOpenChange,
}: FeedbackHistoryProps): JSX.Element {
  const { dislikedQueries } = useSearchStore() as {
    dislikedQueries: DislikedFeedbackItem[];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex flex-row items-center gap-2">
          <ThumbsDown size={16} className="text-red-500" />
          <DialogTitle>
            Not Helpful Queries ({dislikedQueries.length})
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto rounded-md border dark:border-gray-700">
          {dislikedQueries.length === 0 ? (
            <p className="p-4 text-center text-gray-500">
              No feedback items yet
            </p>
          ) : (
            dislikedQueries
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((item) => (
                <div
                  key={item.query}
                  className="border-b last:border-b-0 dark:border-gray-700 p-4"
                >
                  <p className="mb-2">{item.query}</p>
                  {item.issues && item.issues.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {item.issues.map((issueId: IssueId) => (
                        <Badge
                          key={issueId}
                          variant={ISSUE_TYPES[issueId].color}
                        >
                          {ISSUE_TYPES[issueId].label}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {item.note && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Note: {item.note}
                    </p>
                  )}
                </div>
              ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
