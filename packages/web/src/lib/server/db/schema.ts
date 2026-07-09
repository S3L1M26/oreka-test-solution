import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	displayOrder: integer('display_order').notNull()
});

export const products = sqliteTable('products', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	categoryId: integer('category_id')
		.notNull()
		.references(() => categories.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description').notNull(),
	price: integer('price').notNull(),
	isAvailable: integer('is_available', { mode: 'boolean' }).notNull().default(true)
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products)
}));

export const productsRelations = relations(products, ({ one }) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	})
}));
