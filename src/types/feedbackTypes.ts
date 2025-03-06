export const ISSUE_TYPES = {
  irrelevant: { label: "Irrelevant", color: "destructive" as const },
  unclear: { label: "Unclear", color: "secondary" as const },
  repetitive: { label: "Repetitive", color: "default" as const },
  offensive: { label: "Offensive", color: "destructive" as const },
  other: { label: "Other", color: "outline" as const },
} as const;

export type IssueId = keyof typeof ISSUE_TYPES;
