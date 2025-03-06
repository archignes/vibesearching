import { format } from "date-fns";

interface FeedbackItemProps {
  query: string;
  note?: string;
  timestamp: number;
}

export function FeedbackItem({ query, note, timestamp }: FeedbackItemProps) {
  return (
    <div className="p-4 border-b last:border-b-0 dark:border-gray-700">
      <p className="font-medium">{query}</p>
      {note && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{note}</p>
      )}
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
        {format(timestamp, "MMM d, yyyy 'at' h:mm a")}
      </p>
    </div>
  );
}
