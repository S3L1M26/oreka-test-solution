import { createClient } from '@libsql/client';

const dbUrl = process.env.LEGACY_DATABASE_URL ?? 'file:legacy.db';

export const db = createClient({ url: dbUrl });

export async function ensureLegacyData() {
	await db.execute(`
		CREATE TABLE IF NOT EXISTS categories (
			id INTEGER PRIMARY KEY,
			name TEXT NOT NULL,
			display_order INTEGER NOT NULL
		)
	`);

	await db.execute(`
		CREATE TABLE IF NOT EXISTS products (
			id INTEGER PRIMARY KEY,
			category_id INTEGER NOT NULL,
			name TEXT NOT NULL,
			description TEXT NOT NULL,
			price INTEGER NOT NULL,
			is_available INTEGER NOT NULL DEFAULT 1,
			FOREIGN KEY (category_id) REFERENCES categories(id)
		)
	`);

	const count = await db.execute('SELECT COUNT(*) AS total FROM categories');
	const total = Number(count.rows[0]?.total ?? 0);

	if (total > 0) return;

	await db.batch([
		{
			sql: 'INSERT INTO categories (id, name, display_order) VALUES (?, ?, ?)',
			args: [1, 'Entradas', 1]
		},
		{
			sql: 'INSERT INTO categories (id, name, display_order) VALUES (?, ?, ?)',
			args: [2, 'Fondos', 2]
		},
		{
			sql: 'INSERT INTO categories (id, name, display_order) VALUES (?, ?, ?)',
			args: [3, 'Postres', 3]
		},
		{
			sql: 'INSERT INTO products (id, category_id, name, description, price, is_available) VALUES (?, ?, ?, ?, ?, ?)',
			args: [1, 1, 'Croquetas de jamon', 'Croquetas cremosas con alioli de la casa.', 6900, 1]
		},
		{
			sql: 'INSERT INTO products (id, category_id, name, description, price, is_available) VALUES (?, ?, ?, ?, ?, ?)',
			args: [2, 1, 'Tostada de tomate', 'Pan de masa madre, tomate rallado y aceite de oliva.', 5900, 1]
		},
		{
			sql: 'INSERT INTO products (id, category_id, name, description, price, is_available) VALUES (?, ?, ?, ?, ?, ?)',
			args: [3, 2, 'Ravioles de ricotta', 'Ravioles con salsa de mantequilla y salvia.', 12900, 1]
		},
		{
			sql: 'INSERT INTO products (id, category_id, name, description, price, is_available) VALUES (?, ?, ?, ?, ?, ?)',
			args: [4, 2, 'Pollo grillado', 'Pollo de campo con papas doradas.', 13900, 0]
		},
		{
			sql: 'INSERT INTO products (id, category_id, name, description, price, is_available) VALUES (?, ?, ?, ?, ?, ?)',
			args: [5, 3, 'Tarta de limon', 'Tarta fria de limon con merengue.', 5900, 1]
		}
	]);
}

export async function getMenu() {
	const categoriesResult = await db.execute(`
		SELECT id, name, display_order AS displayOrder
		FROM categories
		ORDER BY display_order ASC
	`);

	const productsResult = await db.execute(`
		SELECT
			id,
			category_id AS categoryId,
			name,
			description,
			price,
			is_available AS isAvailable
		FROM products
		ORDER BY id ASC
	`);

	const products = productsResult.rows.map((product) => ({
		id: Number(product.id),
		categoryId: Number(product.categoryId),
		name: String(product.name),
		description: String(product.description),
		price: Number(product.price),
		isAvailable: Boolean(product.isAvailable)
	}));

	return categoriesResult.rows.map((category) => ({
		id: Number(category.id),
		name: String(category.name),
		displayOrder: Number(category.displayOrder),
		products: products.filter((product) => product.categoryId === Number(category.id))
	}));
}

