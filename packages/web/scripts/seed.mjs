import { createClient } from '@libsql/client';
import { menuSeed } from '../src/lib/server/db/menu-data.js';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

const client = createClient({ url: process.env.DATABASE_URL });

const categoriesResult = await client.execute('SELECT COUNT(*) AS total FROM categories');
const totalCategories = Number(categoriesResult.rows[0]?.total ?? 0);

if (totalCategories > 0) {
	console.log('Database already contains menu data. Skipping seed.');
	process.exit(0);
}

await client.batch([
	...menuSeed.categories.map((category) => ({
		sql: 'INSERT INTO categories (id, name, display_order) VALUES (?, ?, ?)',
		args: [category.id, category.name, category.displayOrder]
	})),
	...menuSeed.products.map((product) => ({
		sql:
			'INSERT INTO products (id, category_id, name, description, price, is_available) VALUES (?, ?, ?, ?, ?, ?)',
		args: [
			product.id,
			product.categoryId,
			product.name,
			product.description,
			product.price,
			product.isAvailable ? 1 : 0
		]
	}))
]);

console.log('Seeded menu data into the local SQLite database.');