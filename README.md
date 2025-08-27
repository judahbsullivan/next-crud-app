# next-crud-app

Say hello to your cheerful Next.js playground! This app comes packed with delightful little features—Todos, Weather, and Notes—plus some smooth animations to keep things snappy. Buckle up; ship happens fast around here.

## Quickstart (a.k.a. the fun button)

Pick your favorite package manager and launch the dev server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then visit `http://localhost:3000` and bask in the glow of a freshly running app.

Want everything at once? You can run the web and API together:

```bash
npm run dev:both
```

Notes:
- This uses `concurrently` under the hood.
- The combined script internally calls `bun run dev:web`. If you don't have Bun, you can run the two parts separately:
  - Web: `npm run dev:web`
  - API: `bash backend/run.sh`

## Features (with sprinkles)

- Todos: wrangle your tasks, strike them out, feel powerful.
- Weather: check conditions so you know if your hoodie is overkill.
- Notes: jot thoughts before they vanish into the void.

## Project scripts

```bash
npm run dev        # Start the Next.js dev server
npm run build      # Build the app
npm run start      # Start the production server
npm run lint       # Lint the codebase
npm run dev:web    # Web-only dev server
npm run dev:api    # Start the backend API (bash backend/run.sh)
npm run dev:both   # Web + API together (requires Bun)
```

## Peek inside

- `src/app/page.tsx`: the friendly home base (with animated bits)
- `backend/`: API runner script lives here (`run.sh`)
- `public/`: static assets

## Requirements (keep it simple)

- Node.js (LTS recommended)
- One of: npm, yarn, pnpm, or Bun

## Deploy

Deploy wherever you like—Vercel makes Next.js deployments wonderfully chill. Once you `npm run build`, you're good to go.

## Contributing

Found a typo? Have a brilliant idea? PRs welcome. Bonus points for playful commit messages.

---

Made with Next.js and good vibes. ✨
