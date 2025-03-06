import { logger } from "@/lib/logger";
import { VIBE_SYSTEM_PROMPT } from "@/lib/prompts/vibe";
import Groq from "groq-sdk";

export const runtime = "edge";

// Generate mock responses based on the actual query
const getMockResponse = (query: string) => {
  return {
    originalQuery: query,
    vibedQueries: [
      {
        id: "mock-1",
        originalQuery: query,
        text: `${query} for beginners`,
        engines: ["google", "you"],
        timestamp: Date.now(),
      },
      {
        id: "mock-2",
        originalQuery: query,
        text: `Best ${query.toLowerCase()} techniques and tips`,
        engines: ["you", "perplexity"],
        timestamp: Date.now(),
      },
      {
        id: "mock-3",
        originalQuery: query,
        text: `Step-by-step guide to ${query.toLowerCase()}`,
        engines: ["bing", "brave"],
        timestamp: Date.now(),
      },
    ],
    directCompletions: [
      {
        id: "dc-1",
        text: `${query}?`,
        matchScore: 0.95,
        engines: ["you"],
      },
      {
        id: "dc-2",
        text: `Easy ${query.toLowerCase()} instructions`,
        matchScore: 0.88,
        engines: ["you"],
      },
      {
        id: "dc-3",
        text: `How do I ${query.toLowerCase()}`,
        matchScore: 0.75,
        engines: ["you"],
      },
    ],
  };
};

export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY) {
    logger.error("Missing GROQ_API_KEY");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500 }
    );
  }

  try {
    const { query, devMode } = await req.json();

    // Return contextual mock data based on the actual query
    if (devMode) {
      logger.info("Dev mode: returning contextual mock response");
      const mockResponse = getMockResponse(query);
      return new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid query parameter" }),
        { status: 400 }
      );
    }

    logger.info("Processing vibe request:", { query });

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: VIBE_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: query,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.6,
      max_tokens: 4096,
      top_p: 0.95,
      stream: false,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      logger.error("Empty response from Groq");
      return new Response(
        JSON.stringify({
          vibedQueries: [],
          directCompletions: [],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Parse and validate the JSON response
    try {
      const parsedContent = JSON.parse(content);
      logger.info("Successfully processed query");

      return new Response(JSON.stringify(parsedContent), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      logger.error("Invalid JSON response from Groq:", { content });
      return new Response(
        JSON.stringify({
          vibedQueries: [],
          directCompletions: [],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
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
