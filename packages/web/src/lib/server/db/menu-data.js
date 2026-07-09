export const menuSeed = {
	categories: [
		{ id: 1, name: 'Starters', displayOrder: 1 },
		{ id: 2, name: 'Main Courses', displayOrder: 2 },
		{ id: 3, name: 'Desserts', displayOrder: 3 }
	],
	products: [
		{
			id: 1,
			categoryId: 1,
			name: 'Ham croquettes',
			description: 'Creamy croquettes with house aioli.',
			price: 6900,
			isAvailable: true
		},
		{
			id: 2,
			categoryId: 1,
			name: 'Tomato toast',
			description: 'Sourdough bread, grated tomato, and olive oil.',
			price: 5900,
			isAvailable: true
		},
		{
			id: 3,
			categoryId: 2,
			name: 'Ricotta ravioli',
			description: 'Ravioli with butter and sage sauce.',
			price: 12900,
			isAvailable: true
		},
		{
			id: 4,
			categoryId: 2,
			name: 'Grilled chicken',
			description: 'Free-range chicken with golden potatoes.',
			price: 13900,
			isAvailable: false
		},
		{
			id: 5,
			categoryId: 3,
			name: 'Lemon tart',
			description: 'Chilled lemon tart with meringue.',
			price: 5900,
			isAvailable: true
		}
	]
};