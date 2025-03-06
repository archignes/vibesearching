"use client";

import useSearchStore from "@/store/useSearchStore";
import { FeedbackItem } from "@/components/FeedbackItem";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StarredQueriesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function StarredQueries({
  open,
  onOpenChange,
}: StarredQueriesProps) {
  const { starredQueries } = useSearchStore();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Starred Queries</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto rounded-md border dark:border-gray-700">
          {starredQueries.length === 0 ? (
            <p className="p-4 text-center text-gray-500">No saved items yet</p>
          ) : (
            starredQueries
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((item) => <FeedbackItem key={item.query} {...item} />)
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
