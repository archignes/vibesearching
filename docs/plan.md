# Vibesearching: Project Implementation Plan

## Project Overview

Vibesearching (domain: vibesearching.com) revolutionizes the traditional search experience by focusing on query refinement rather than search results. It bridges the gap between what users initially type and what they truly seek to discover. The platform uses AI to transform basic queries into enhanced, context-aware search formulations that capture the user's underlying intent.

By suggesting both direct completions and thoughtfully reformulated alternatives, Vibesearching helps users articulate their information needs more precisely before directing them to the most appropriate search tool for their specific question. This approach eliminates the cycle of refining searches across multiple attempts, reduces cognitive load, and creates a more efficient path to relevant information.

## UI Requirements

### 1. Responsive Design

1.1. Mobile-first approach with adaptive layout for all screen sizes  
1.2. Touch-optimized on mobile, keyboard-optimized on desktop  
1.3. Performance-focused with minimal load time  
1.4. Accessibility compliant (WCAG 2.1 AA standards)

### 2. Minimal Branding

2.1. "vibe" as primary logo text, extremely compact  
2.2. Subtle gradient or monochrome color scheme  
2.3. No tagline or additional text in header  
2.4. Favicon/icon using "v" letterform

### 3. Prominent Search Input

3.1. Full-width input field, positioned near bottom of viewport  
3.2. Label "vibing input" (subtle, can be placeholder)  
3.3. Expandable text area that grows vertically with content  
3.4. Auto-focus on page load  
3.5. Smooth transitions when expanding/collapsing  
3.6. Character counter for optimal query length  
3.7. In-line completions appear directly in query box (Gmail-style)  
3.8. Tab key accepts the suggested completion  
3.9. Gray/ghosted text for suggested completion portion

### 4. Vibed (Enhanced) Queries

4.1. Labeled "vibed:" with subtle indicator (depracated: no label)
4.2. Visually distinct from regular completions  
4.3. Streaming in real-time from LLM as user types  
4.4. Older vibes (based on earlier versions of query) auto-collapse  
4.5. "Show more vibes" button reveals collapsed suggestions  
4.6. Visual indicator showing streaming/thinking state  
4.7. Prioritize freshest vibes based on complete query

### 5. Direct Completions

5.1. No visible label, visually separated from vibed queries  
5.2. Matching text highlighted for user's query  
5.3. Sorted by relevance/popularity  
5.4. Single line display format only  
5.5. Show only the last line of multi-line queries  
5.6. Store full query content behind the scenes  
5.7. Keyboard navigable (up/down arrows)

### 6. Query Interaction Options

6.1. Each query has 1-3 contextual search engine buttons  
6.2. "Revibe" button to insert query text back into input field for refinement  
6.3. Thumbs down hides that query permanently  
6.4. Star button for saving to favorites  
6.5. Subtle hover states to indicate interactivity  
6.6. One-tap/click execution to search engines  
6.7. Engine icons use consistent, recognizable design system  
6.8. Optional long-press/right-click menu for additional actions

### 7. User History ("Vibrary")

7.1. Labeled "vibrary" in a subtle header  
7.2. Positioned below search bar  
7.3. Shows recent user queries with timestamps  
7.4. Includes previously unseen vibed suggestions for past queries  
7.5. Incorporates random selection of starred/favorited queries  
7.6. One-click option to clear history  
7.7. Sync capability for logged-in users  
7.8. Visual indicator for previously successful searches  
7.9. Option to hide vibrary entirely

### 8. Discovery Section

8.1. Positioned above search bar on initial page load  
8.2. Contains trending, sponsored, or community-shared vibed queries  
8.3. Labeled clearly as "Sponsored vibe" when applicable  
8.4. Section titled "Vibing now" for trending content  
8.5. Refreshes periodically or on page reload  
8.6. Option to dismiss or hide  
8.7. Include source attribution for sponsored content  
8.8. Rotate through categories for variety

### 9. User Profile Access

9.1. Avatar icon positioned next to hamburger menu  
9.2. Shows login status (logged in/out)  
9.3. One-click access to profile settings  
9.4. Shows notification indicators when relevant  
9.5. Custom avatar support for personalization  
9.6. Guest mode for non-logged in users

### 10. Navigation & Settings

10.1. Hamburger menu contains all secondary functions  
10.2. Theme toggle (light/dark mode)  
10.3. Language settings  
10.4. Search engine preferences  
10.5. Privacy controls (history, cookies)  
10.6. Help/feedback section  
10.7. About/legal information  
10.8. Keyboard shortcut reference

### 11. Performance & Technical Requirements

11.1. Sub-200ms response time for query suggestions  
11.2. Client-side caching of frequent searches  
11.3. Progressive loading of UI elements  
11.4. Offline capability for basic functionality  
11.5. Graceful degradation for older browsers  
11.6. Data-saving mode option for limited connections  
11.7. Efficient streaming API connection for LLM suggestions

## File & Folder Structure

Below is the proposed file structure based on a React/Next.js setup:

```
vibesearching/
├─ public/
│   ├─ favicon.ico           // 'v' letterform icon
│   └─ other-static-assets
│
├─ src/                      // Main source code
│   ├─ components/
│   │   ├─ SearchInput/
│   │   │   ├─ SearchInput.tsx
│   │   │   ├─ SearchInput.css
│   │   │   └─ index.ts      // Export barrel
│   │   ├─ VibrantQueries/
│   │   │   ├─ VibedQueryItem.tsx
│   │   │   ├─ DirectCompletionItem.tsx
│   │   │   └─ ...
│   │   ├─ Vibrary/
│   │   ├─ Discovery/
│   │   ├─ Navbar/
│   │   ├─ ProfileMenu/
│   │   └─ ...
│   │
│   ├─ pages/                // (if using Next.js)
│   │   ├─ _app.tsx          // app entry (theme, layout, etc.)
│   │   ├─ index.tsx         // main page with search UI
│   │   ├─ settings.tsx      // user settings/hamburger menu
│   │   └─ ...
│   │
│   ├─ hooks/                // reusable custom hooks
│   ├─ utils/                // utility functions (streaming, LLM calls, etc.)
│   ├─ services/             // front-end service classes for LLM, search engines
│   ├─ styles/               // global CSS/SCSS
│   └─ App.tsx (if not Next.js) or main.tsx (entry point)
│
├─ server/                   // Backend logic if you're doing SSR or Node server
│   ├─ routes/
│   │   ├─ api/
│   │   │   ├─ queries.ts    // query logging, user history endpoints
│   │   │   ├─ sponsor.ts    // handle sponsored queries
│   │   │   └─ ...
│   ├─ services/
│   │   ├─ LLMService.ts     // wrap calls to Groq or other LLMs
│   │   ├─ SearchEngines.ts  // unify calls to Google/Bing/etc.
│   │   └─ DB.ts             // DB connection logic (Postgres)
│   ├─ config/
│   │   ├─ env.ts            // environment variable handling
│   │   └─ ...
│   └─ server.ts             // main server entry (Express, Next.js custom, etc.)
│
├─ db/                       // Database migration/schema files
│   ├─ migrations/
│   └─ seeds/
│
├─ package.json
├─ tsconfig.json (or jsconfig.json)
├─ .env                      // LLM keys, DB URLs, etc. (never commit to repo)
├─ README.md
└─ LICENSE
```

## Key Component Details

### Front-End Components

1. **SearchInput**

   - Responsible for the main input box, in-line completions (Gmail-style), character counters, and streaming suggestions.

2. **VibrantQueries** (or similar naming)

   - Contains VibedQueryItem (the "vibed:" suggestions) and DirectCompletionItem (the typical auto-complete suggestions).
   - Manages streaming from the LLM, handles "Show more vibes" expansions, etc.

3. **Vibrary**

   - The user history component—stores timestamps, starred queries, previous vibed suggestions.

4. **Discovery**

   - The "Vibing now" and "Sponsored vibe" content. Could be a carousel or list of trending queries.

5. **ProfileMenu** (or Navbar with Profile Access)
   - Shows avatar, login status, and access to settings.

### Back-End / API

- **LLMService.ts**: A unified place to handle calls to Groq (or the chosen LLM). Manages streaming and concurrency.
- **SearchEngines.ts**: Central integration for external search engines (Google, Bing, DuckDuckGo, Perplexity, etc.).
- **DB.ts**: Handles the Postgres connection, query logging, user data retrieval, etc.

### Config & Environment

- **env.ts** or similar to load .env variables for:
  - LLM keys
  - Database credentials
  - Any other third-party API keys

## Resolved Questions

1. **Search Engine Integrations**

   - We will support: Google, Bing, DuckDuckGo, Perplexity AI, You.com, Kagi (account-required icon), Brave Search
   - Additional integrations: Copy to clipboard, LLM chatbot websites (Mistral, OpenAI, Anthropic, Llama), OpenRouter, Hackernews (with Algolia or Trieve), Twitter search, Grok
   - Implementation: One-click links that default to opening on the same page
   - User experience: Include a reminder about browser shortcuts to open in new tab (consider special handling for mobile)

2. **LLM Provider**

   - Using Groq with the following implementation:

   ```python
   from groq import Groq

   client = Groq()
   completion = client.chat.completions.create(
       model="llama-3.3-70b-versatile",
       messages=[
           {
               "role": "user",
               "content": "is this fast?"
           },
           {
               "role": "assistant",
               "content": "To answer whether something is fast, I would need more context or information about what \"this\" refers to. Could you please provide more details or clarify your question?"
           }
       ],
       temperature=1,
       max_completion_tokens=1024,
       top_p=1,
       stream=True,
       stop=None,
   )

   for chunk in completion:
       print(chunk.choices[0].delta.content or "", end="")
   ```

   - No fine-tuning at this time, focus on carefully refining prompts

3. **User Authentication & Data Privacy**

   - Initial approach: Guest-based with IP tracking for rate limiting and abuse prevention
   - Full sign-up functionality to be implemented in MVP
   - Social login integration planned for post-MVP quiet launch
   - We need to support Postgres server (can use Vercel)
   - We will log queries for improvement purposes

4. **Offline Capability**
   - Offline capability can be minimal
   - User's past query interactions should be supported if possible

## Open Questions & Deadlines

1. **Sponsored Content Guidelines**

   - **Outstanding Detail**: The exact design of labeling, how frequently they appear, how to ensure user clarity, and integration with regular search flow
   - **Deadline**: Design freeze (so the UI doesn't shift last-minute)

2. **Offline Capability**
   - **Outstanding Detail**: Confirm if local storage for vibrary is enough, or if we must handle bulk offline data sync
   - **Deadline**: Performance & technical scoping stage

## Next Steps & Action Items

1. **File/Tech Architecture Approval**

   - Confirm we're going with React/Next.js (or other) so we can set up the repo skeleton

2. **Database Schema**

   - Design tables for:
     - queries (user query text, timestamp, IP address, user ID if any, vibed suggestions logs)
     - favorites or starred (optional)
     - users (for full sign-up functionality in MVP)
     - rate limiting/abuse prevention tracking
     - sponsored (list of sponsored queries structure for future implementation)

3. **LLM Integration**

   - Spike a small proof-of-concept with Groq's streaming API to validate performance under test loads
   - Begin crafting and testing refined prompts for optimal "vibing" results
   - Implement prompt version control system for iterative improvements

4. **Search Engine Redirects**

   - Implement one-click search logic for each engine with same-page opening default
   - Create helper utilities for detecting mobile vs. desktop for appropriate "open in new tab" hints
   - Design a unified function that generates the correct search URL for each engine

5. **User Authentication Flow**

   - Implement guest mode as default with minimal friction
   - Design full sign-up UI and backend (username/password, email verification)
   - Create database structure to seamlessly transition guest activity to full accounts
   - Prepare architecture to support social login in post-MVP phases

6. **Offline Implementation**
   - Store user queries in localStorage or IndexedDB (for the "vibrary") to support offline history viewing
   - Implement simple offline indicator and fallback UI when connection is lost

## Development Phases

1. **Phase 1: Initial Setup and Architecture**

   - Repo setup with chosen framework
   - Basic component structure
   - Database schema design

2. **Phase 2: Core Functionality Development**

   - SearchInput with basic functionality
   - LLM integration
   - Direct completions
   - Vibed queries

3. **Phase 3: Feature Development**

   - Vibrary implementation
   - Search engine integrations
   - Discovery section
   - User profile basics

4. **Phase 4: Polish and Performance**

   - Performance optimization
   - UI/UX refinement
   - Offline capabilities
   - Final testing

5. **Phase 5: MVP Launch**
   - Public release
   - Monitoring and bug fixes
   - User feedback collection

This plan provides a comprehensive roadmap for implementing Vibesearching, with clear priorities, deliverables, and timelines to ensure successful development and launch.
