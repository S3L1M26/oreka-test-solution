# Oreka Developer Test

This repository is a technical exercise for the Junior Full Stack Developer role at Oreka.

The goal is to simulate a real situation: a new SvelteKit web app still depends on a separate legacy backend. Your task is to understand both parts, run both servers, and migrate the restaurant menu into SvelteKit using Drizzle.

You can and should use AI while working. Programming with AI is not optional for this role. Use the tools you would normally use: Cursor, Claude Code, Codex, ChatGPT, Copilot, official documentation, Google, etc. In the interview, we will ask you to explain what you did, what AI helped you with, and which decisions you made yourself.

The entire exercise must run locally with SQLite. Do not use Postgres, Supabase, Turso Cloud, or any external service. The legacy backend uses SQLite, and the SvelteKit app must also use SQLite with Drizzle.

## Structure

```txt
packages/
  legacy-api/   Legacy backend built with Hono. Exposes the current restaurant menu.
  web/          SvelteKit app. Drizzle is installed, but it still reads from legacy-api.
docs/
  context.md    Context for the exercise and what we are trying to evaluate.
```

## How to Run the Project

Install dependencies from the repository root:

```sh
pnpm install
```

Prepare local environment variables for the web app:

```sh
cp packages/web/.env.example packages/web/.env
```

Start the legacy backend in one terminal:

```sh
pnpm dev:legacy
```

Start the web app in another terminal:

```sh
pnpm dev:web
```

The web app usually runs at `http://localhost:5173`.
The legacy backend runs at `http://localhost:8787`.

To check that the legacy backend is alive:

```sh
curl http://localhost:8787/health
curl http://localhost:8787/api/menu
```

## Mission

Today `packages/web` displays the menu by querying `packages/legacy-api`.

We want the SvelteKit app to stop depending on the legacy backend to display the menu.

Your task:

1. Create a Drizzle schema in `packages/web` for categories and products.
2. Create or adjust the local SQLite database used by SvelteKit.
3. Migrate the current data from `legacy-api` into the `web` database.
4. Change the main page so it reads from Drizzle instead of `legacy-api`.
5. Add a small feature to mark a product as available/unavailable.

We are not looking for a perfect interface. We want to see that you understand the full flow: two servers, legacy data, migration, database, SvelteKit, and a small working feature.

## Submission and Video Call

Make your changes in Git with clear commits.

In your README, or in a section at the end of this file, briefly explain:

- How to run your solution.
- What you changed.
- Which AI tool you used and what you used it for.
- Which part was hardest.
- What you would improve if you had more time.

After you submit the exercise, we will schedule a video call. In that call, you will share your screen and show the project running.

We will ask you questions about:

- Which tools you used, including AI tools.
- How you started both servers.
- How the codebase is organized.
- How you migrated the data from `legacy-api` into Drizzle.
- Where the data is stored.
- Which parts you understood well and what you would solve differently with more time.

The most important thing in the video call is not that the project is perfect. The most important thing is that you can show understanding: that you can explain what you did, why you did it, and how your solution works.

