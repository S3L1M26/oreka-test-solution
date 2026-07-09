import { asc, eq } from 'drizzle-orm';
import { db } from './index';
import { categories, products } from './schema';
import { menuSeed } from './menu-data.js';

export type MenuProduct = {
	id: number;
	categoryId: number;
	name: string;
	description: string;
	price: number;
	isAvailable: boolean;
};

export type MenuCategory = {
	id: number;
	name: string;
	displayOrder: number;
	products: MenuProduct[];
};

let seedPromise: Promise<void> | null = null;

export async function ensureMenuSeeded() {
	seedPromise ??= (async () => {
		const existingCategories = await db.select({ id: categories.id }).from(categories).limit(1);

		if (existingCategories.length > 0) return;

		await db.insert(categories).values(menuSeed.categories);
		await db.insert(products).values(menuSeed.products);
	})();

	await seedPromise;
}

export async function getMenu(): Promise<MenuCategory[]> {
	const categoryRows = await db
		.select()
		.from(categories)
		.orderBy(asc(categories.displayOrder));

	const productRows = await db.select().from(products).orderBy(asc(products.id));

	return categoryRows.map((category) => ({
		id: category.id,
		name: category.name,
		displayOrder: category.displayOrder,
		products: productRows
			.filter((product) => product.categoryId === category.id)
			.map((product) => ({
				id: product.id,
				categoryId: product.categoryId,
				name: product.name,
				description: product.description,
				price: product.price,
				isAvailable: product.isAvailable
			}))
	}));
}

export async function toggleProductAvailability(productId: number) {
	const [product] = await db
		.select({ isAvailable: products.isAvailable })
		.from(products)
		.where(eq(products.id, productId))
		.limit(1);

	if (!product) {
		throw new Error(`Product not found: ${productId}`);
	}

	await db
		.update(products)
		.set({ isAvailable: !product.isAvailable })
		.where(eq(products.id, productId));
}