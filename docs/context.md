# Exercise Context

This repository is intended as a technical test for hiring a junior developer at Oreka.

The idea is not to evaluate advanced framework knowledge, but a way of working:

- Clone and understand an unfamiliar repository.
- Run two separate processes in the terminal.
- Understand how a web app consumes data from a legacy backend.
- Use AI actively to program, research, and debug.
- Design a simple data migration.
- Use Drizzle inside SvelteKit.
- Communicate technical decisions clearly.

## Starter Decisions

The legacy backend uses Hono instead of Strapi. The reason is pragmatic: Strapi is closer to the real case, but it adds too much noise for a short technical test. Hono lets us simulate the same architectural problem without making the candidate lose time fighting heavy configuration.

The exercise must keep two pieces:

- `legacy-api`: the current data source, separated from the main app.
- `web`: the new SvelteKit app, with Drizzle installed, which must absorb that data.

Everything must stay local with SQLite. We do not want the candidate to use Postgres, Supabase, Turso Cloud, or external services, because that adds friction we are not trying to evaluate. The point is to see whether they understand the migration and the full stack flow, not whether they can configure infrastructure.

The important test is not whether the candidate knows Hono or SvelteKit by heart. The important test is whether they can read, run, connect, migrate, and explain.

## What We Want to Observe

Good signals:

- Runs both servers without getting blocked.
- Uses AI, but understands the code they submit.
- Creates a reasonable Drizzle schema.
- Migrates data without losing relationships between categories and products.
- Can explain the before and after of the architecture.
- Adds the availability feature without overengineering.
- Presents by sharing their screen and demonstrates real understanding of what they submitted.

Bad signals:

- Cannot run the project and cannot diagnose why.
- Copies AI-generated code without understanding it.
- Solves only the interface and avoids the database.
- Deletes the legacy backend without migrating the data.
- Cannot explain where products are stored.
- Does not leave instructions for running their solution.
- Cannot answer basic questions about the code structure or AI usage.

