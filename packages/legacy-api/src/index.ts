import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { ensureLegacyData, getMenu } from './db.js';

const app = new Hono();

app.get('/health', (c) => c.json({ ok: true, service: 'legacy-api' }));

app.get('/api/menu', async (c) => {
	const menu = await getMenu();
	return c.json({ categories: menu });
});

await ensureLegacyData();

const port = Number(process.env.PORT ?? 8787);

serve({ fetch: app.fetch, port });

console.log(`legacy-api running on http://localhost:${port}`);

