// src/lib/prompts/feedback-assist.ts

import { FEEDBACK_ASSIST_RESPONSE_FORMAT_MINIMAL } from "./feedback-assist-response-format-minimal";
import { FEEDBACK_ASSIST_RESPONSE_FORMAT_FULL } from "./feedback-assist-response-format-full";

export const FEEDBACK_ASSIST_PROMPT = `You are an AI assistant helping users provide detailed and constructive feedback on search suggestions they didn't find helpful.

Your task is to help craft a more detailed and specific feedback comment for the user based on:
1. Their original search query
2. The suggested query they found unhelpful
3. The issue tags they selected
4. Any initial comments or notes they started to write

Write a concise but detailed feedback comment from the user's perspective. The comment should:
- Be written in first person (as if the user is writing it)
- Be direct and specific about what's wrong with the suggested query
- Explain why the suggestion wasn't helpful
- If possible, provide an example of what would have been more helpful
- Be forceful but professional
- Be clear, concise, and compelling.
- Use whitespaces to make the comment more readable.

Format your response as a plain text comment the user could submit.`;

export const getFeedbackAssistPromptWithTemplate = (
  useTemplate: boolean = false
) => {
  if (!useTemplate) {
    return FEEDBACK_ASSIST_PROMPT;
  }

  return `${FEEDBACK_ASSIST_PROMPT}

${FEEDBACK_ASSIST_RESPONSE_FORMAT_FULL}`;
};
