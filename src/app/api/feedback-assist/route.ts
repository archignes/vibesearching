import { logger } from "@/lib/logger";
import { FEEDBACK_ASSIST_PROMPT, getFeedbackAssistPromptWithTemplate } from "@/lib/prompts/feedback-assist";
import { ISSUE_TYPES, IssueId } from "@/types/feedbackTypes";
import Groq from "groq-sdk";

export const runtime = "edge";

// Generate a more contextual mock response based on actual input
const getMockResponse = (inputQuery: string, targetQuery: string, issues: IssueId[]) => {
  // Convert issue IDs to labels
  const issueLabels = issues.map(id => ISSUE_TYPES[id]?.label || id);
  const issuesText = issueLabels.length > 0 ? issueLabels.join(", ") : "relevance";
  
  return {
    assistedFeedback: `This suggested query "${targetQuery}" doesn't help with my original question about "${inputQuery}". It has issues with ${issuesText}. I was hoping for a suggestion that would directly address my specific needs rather than this unhelpful recommendation.`
  };
};

interface FeedbackAssistRequest {
  inputQuery: string;
  targetQuery: string;
  selectedIssues: IssueId[];
  userComments: string;
  devMode?: boolean;
  // Optional display-only fields that might be included
  selectedIssuesText?: string;
  previewText?: string;
  useTemplate?: boolean;
}

export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY) {
    logger.error("Missing GROQ_API_KEY");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500 }
    );
  }

  try {
    const { 
      inputQuery, 
      targetQuery, 
      selectedIssues, 
      userComments, 
      devMode,
      selectedIssuesText, 
      previewText,
      useTemplate = false
    } = await req.json() as FeedbackAssistRequest;

    // Return contextual mock data if in dev mode
    if (devMode) {
      logger.info("Dev mode: returning contextual mock feedback assist response");
      const mockResponse = getMockResponse(inputQuery, targetQuery, selectedIssues);
      return new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate required fields
    if (!inputQuery || !targetQuery) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { status: 400 }
      );
    }

    logger.info("Processing feedback assist request", { 
      inputQuery, 
      targetQuery, 
      selectedIssues 
    });

    // Format the message from either the previewText (if provided) or construct it ourselves
    let userMessage;
    
    if (req.body && previewText) {
      // Use the preview text from the frontend if available, and append user comments
      userMessage = `${previewText} ${userComments || "None yet"}
      
Please write a detailed and forceful feedback comment from my perspective.`;
    } else {
      // Otherwise construct the message from scratch
      const issueLabels = selectedIssues.map(id => ISSUE_TYPES[id]?.label || id);
      const issuesText = selectedIssuesText || (issueLabels.length > 0 ? issueLabels.join(", ") : "None selected");
      
      userMessage = `
I need help writing detailed feedback about a search suggestion I didn't find helpful.

Original input query: "${inputQuery}"

Suggested query I didn't like: "${targetQuery}"

Issues I selected: ${issuesText}

My initial comments: ${userComments || "None yet"}

Please write a detailed and forceful feedback comment from my perspective.
`;
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: getFeedbackAssistPromptWithTemplate(useTemplate),
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.95,
      stream: false,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      logger.error("Empty response from Groq");
      return new Response(
        JSON.stringify({
          assistedFeedback: "",
          error: "Could not generate feedback assistance"
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    logger.info("Successfully generated feedback assistance");

    return new Response(
      JSON.stringify({ assistedFeedback: content.trim() }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    logger.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}