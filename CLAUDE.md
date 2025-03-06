# CLAUDE.md - Guide for AI Assistants

## Commands
- Dev server: `yarn dev` (port 3002) or `yarn dev:mock` (with mock data)
- Build: `yarn build`
- Start production: `yarn start`
- Lint: `yarn lint`
- Tests: `yarn test`

## Code Standards
- TypeScript: Strict typing with explicit imports (`import type {X}`)
- Components: PascalCase with .tsx extension (React Server Components)
- Hooks: camelCase with `use` prefix
- State: Zustand patterns in `/src/store` with `useXStore` naming
- Styling: Tailwind CSS with shadcn/ui components (New York variant)
- Imports: Use absolute paths with aliases (`@/components`, `@/lib`, etc.)
- Error handling: Try/catch with logger utility, AbortController support
- Project structure: Next.js App Router, feature-based organization

## Architecture
- API routes in `/src/app/api/`
- UI components in `/src/components/`
- Custom hooks in `/src/hooks/`
- Types in `/src/types/`
- State in `/src/store/`
- Utilities in `/src/lib/`