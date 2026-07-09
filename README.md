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

## Final Notes

### How to run the solution

From the repository root:

```sh
pnpm install
pnpm --filter web db:push
pnpm --filter web db:seed
pnpm dev:legacy
pnpm dev:web
```

The web app runs at `http://localhost:5173` and reads the menu from the local SQLite database managed by Drizzle.

### Current flow

The current flow is:

1. The Drizzle schema defines `categories` and `products` in `packages/web/src/lib/server/db/schema.ts`.
2. The local SQLite connection is created in `packages/web/src/lib/server/db/index.ts` using `DATABASE_URL`.
3. The first request to the app calls `ensureMenuSeeded()` so the database is populated if it is empty.
4. The page server load reads the menu from Drizzle and returns the nested shape used by the Svelte UI.
5. The page renders the categories and products.
6. The availability button sends a POST action to the server, which flips `isAvailable` in the database.

That means the legacy backend is still available in the repo, but the web app no longer depends on it to render the menu.

### Code examples

Schema and relations:

```ts
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  displayOrder: integer('display_order').notNull()
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id').notNull().references(() => categories.id),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  isAvailable: integer('is_available', { mode: 'boolean' }).notNull().default(true)
});
```

Seed and initial load:

```ts
export async function ensureMenuSeeded() {
  const existingCategories = await db.select({ id: categories.id }).from(categories).limit(1);

  if (existingCategories.length > 0) return;

  await db.insert(categories).values(menuSeed.categories);
  await db.insert(products).values(menuSeed.products);
}
```

Page server load:

```ts
export const load: PageServerLoad = async () => {
  await ensureMenuSeeded();
  const categories = await getMenu();

  return { menu: { categories } };
};
```

Toggle action:

```ts
export const actions: Actions = {
  toggleAvailability: async ({ request }) => {
    const formData = await request.formData();
    const productId = Number(formData.get('productId'));
    await toggleProductAvailability(productId);
    return { success: true };
  }
};
```

UI button:

```svelte
<form method="POST" action="?/toggleAvailability" class="availability-form">
  <input type="hidden" name="productId" value={product.id} />
  <button type="submit">
    {product.isAvailable ? 'Mark unavailable' : 'Mark available'}
  </button>
</form>
```

### What changed

- Added a Drizzle schema for `categories` and `products` in `packages/web`.
- Connected SvelteKit to a local SQLite database.
- Seeded the local database with the initial menu data.
- Migrated the main page to read from Drizzle instead of the legacy backend.
- Added a server action and UI control to toggle product availability.

### AI used

- I used Copilot to inspect the repo, identify the data flow, and draft the schema, seed flow, and action wiring.
- I used the terminal and SvelteKit/Drizzle checks to validate the implementation.

### Architecture notes

- The legacy backend still exists as a reference source and can be started with `pnpm dev:legacy`.
- The SvelteKit app uses its own local SQLite database through Drizzle, so the menu can be rendered even if the legacy process is not used at runtime.
- The menu data keeps the original relationship between categories and products, and the availability flag is persisted in the same database row.

### Hardest part

- Making the seed and database setup work reliably in a local-only SQLite flow without depending on the legacy backend at runtime.

### What I would improve with more time

- Replace the duplicated seed data with a proper one-time migration/import flow.
- Improve the UI feedback after toggling availability.
- Add a small test around the menu action and the loaded data shape.

