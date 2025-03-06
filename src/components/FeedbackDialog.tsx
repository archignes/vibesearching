import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ISSUE_TYPES, IssueId } from "@/types/feedbackTypes";
import useSearchStore from "@/store/useSearchStore";
import { Card } from "@/components/ui/card";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (note: string, issues: IssueId[]) => void;
  queryText: string;
}

export function FeedbackDialog({
  open,
  onOpenChange,
  onSubmit,
  queryText,
}: FeedbackDialogProps) {
  const [noteText, setNoteText] = useState("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const { inputValue, vibedQueries } = useSearchStore();

  // Find if the feedback is for a vibed query
  const isVibedQuery = vibedQueries.some((vq) => vq.vibedText === queryText);

  // Handle note text changes and show additional buttons when user starts typing
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNoteText(text);

    // Show additional buttons if user has started typing
    setShowAdditionalButtons(text.length > 0);
  };

  const handleSubmit = () => {
    onSubmit(noteText, selectedIssues as IssueId[]);
    setNoteText("");
    setSelectedIssues([]);
    setShowAdditionalButtons(false);
    onOpenChange(false);
  };

  const [isLoadingAssistance, setIsLoadingAssistance] = useState(false);

  const handleFeedbackAssistance = async () => {
    setIsLoadingAssistance(true);

    try {
      const response = await fetch("/api/feedback-assist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputQuery: inputValue,
          targetQuery: queryText,
          selectedIssues: selectedIssues as IssueId[],
          userComments: noteText,
          devMode: process.env.NEXT_PUBLIC_DEV_MODE === "true",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.assistedFeedback) {
        // Update the comment field with the AI-assisted feedback
        setNoteText(data.assistedFeedback);
      } else {
        console.error("No assisted feedback returned");
      }
    } catch (error) {
      console.error("Error fetching feedback assistance:", error);
    } finally {
      setIsLoadingAssistance(false);
    }
  };

  const handleGitHubIssue = () => {
    // Open GitHub issue form
    window.open(
      "https://github.com/archignes/vibesearching/issues/new",
      "_blank"
    );
  };

  const toggleIssue = (issueId: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Feedback - Not Helpful</DialogTitle>
        </DialogHeader>

        {/* Context section */}
        <div className="mb-6 space-y-3">
          {/* Original input query */}
          <div>
            <div className="text-sm font-medium mb-1">Input Query:</div>
            <Card className="p-3 text-sm bg-gray-50 dark:bg-gray-800">
              {inputValue}
            </Card>
          </div>

          {/* Query receiving feedback */}
          <div>
            <div className="text-sm font-medium mb-1 flex items-center">
              <span className="text-red-500 mr-2">★</span>
              Query you're providing feedback on:
            </div>
            <Card className="p-3 text-sm border-red-200 dark:border-red-800">
              {queryText}
            </Card>
          </div>

          {/* Other vibed queries if this is a vibed query */}
          {isVibedQuery && vibedQueries.length > 1 && (
            <div>
              <div className="text-sm font-medium mb-1">
                Other suggested queries:
              </div>
              <div className="space-y-2 max-h-[150px] overflow-y-auto">
                {vibedQueries
                  .filter((vq) => vq.vibedText !== queryText)
                  .map((vq) => (
                    <Card
                      key={vq.id}
                      className="p-2 text-sm bg-gray-50 dark:bg-gray-800"
                    >
                      {vq.vibedText}
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Issue selection - simplified approach */}
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">What's the issue?</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.values(ISSUE_TYPES).map((issue) => {
              const isSelected = selectedIssues.includes(issue.label);
              return (
                <button
                  key={issue.label}
                  onClick={() => toggleIssue(issue.label)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    isSelected
                      ? "bg-gray-700 text-white dark:bg-gray-200 dark:text-gray-800"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {issue.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Note textarea */}
        <div>
          <div className="text-sm font-medium mb-2">Comments?</div>
          <Textarea
            placeholder="What would have been more helpful? (optional)"
            value={noteText}
            onChange={handleNoteChange}
            className="min-h-[100px]"
          />
        </div>

        {/* Additional buttons that appear when user starts typing */}
        {showAdditionalButtons && (
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              className="text-xs sm:text-sm flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/30"
              onClick={handleFeedbackAssistance}
              disabled={isLoadingAssistance}
            >
              {isLoadingAssistance ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-700 dark:text-purple-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                "Ask for feedback assistance"
              )}
            </Button>
            <Button
              variant="outline"
              className="text-xs sm:text-sm flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30"
              onClick={handleGitHubIssue}
            >
              Submit public issue on GitHub
            </Button>
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700"
          >
            Submit feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
