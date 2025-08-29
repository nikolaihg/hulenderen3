# hulenderen3
Calendar in next.js with sanity cms for events, hopefully it can be integrated into www.hulen.no. perhaps with the same sanity projects but different frontend. kalender.hulen.no?

## Tech
- `packageManager: "pnpm@10.15.0"`
- `date-fns: "^4.1.0"`
- `next: "15.5.2"`
- `next-auth: "^4.24.11"`
- `next-sanity: "^10.0.15"`
- `react: "19.1.0"`
- `react-big-calendar: "^1.19.4"`
- `eslint: "^9"`
- `tailwindcss: "^4.1.12"`
- `typescript: "^5"`
- `turbo: "2.5.7"`
## Build 
### Dev scripts
- pnpm copy-envs":  "cp .env apps/web/.env && cp .env apps/studio/.env",
- pnpm dev:web": "pnpm copy-envs && turbo run dev --filter=web",
- pnpm dev:studio": "pnpm copy-envs && turbo run dev --filter=studio",
- pnpm dev": "pnpm copy-envs && turbo run dev"