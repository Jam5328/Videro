# VANTAGE

A premium property documentation and visual systems website for letting agencies and property managers. Tagline: "Added clarity = added confidence."

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/vantage run dev` — run the frontend (uses PORT env var from workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Framer Motion, wouter routing, shadcn/ui
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- DB schema: `lib/db/src/schema/leads.ts`
- API contract: `lib/api-spec/openapi.yaml`
- API routes: `artifacts/api-server/src/routes/leads.ts`
- Frontend pages: `artifacts/vantage/src/pages/`
- Lead form: `artifacts/vantage/src/components/forms/LeadForm.tsx`
- Theme/CSS: `artifacts/vantage/src/index.css`

## Architecture decisions

- Contract-first: OpenAPI spec → Orval codegen → React Query hooks + Zod schemas
- Lead capture stores in PostgreSQL via Drizzle ORM; email automation not yet wired (Nodemailer ready to add)
- Dark-mode-first design using CSS custom properties with HSL values
- wouter for client-side routing (no SSR needed)

## Product

VANTAGE serves letting agencies, property managers, serviced accommodation operators, and Airbnb hosts with:
- Residential property inventories (primary)
- 360° property tours (primary)
- Check-in/out reports, property inspections, documentation systems, marketing media (secondary)

Pages: Home, Services, About, Pricing

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Vantage frontend requires `PORT` and `BASE_PATH` env vars — these are injected by the workflow system, not available in bare `pnpm run dev`
- After any OpenAPI spec change, re-run codegen before touching the frontend
- Never import from `@workspace/api-client-react/src/generated/...` directly — import from `@workspace/api-client-react` only

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
