import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

type LegacyProduct = {
	id: number;
	categoryId: number;
	name: string;
	description: string;
	price: number;
	isAvailable: boolean;
};

type LegacyCategory = {
	id: number;
	name: string;
	displayOrder: number;
	products: LegacyProduct[];
};

type LegacyMenuResponse = {
	categories: LegacyCategory[];
};

export const load: PageServerLoad = async ({ fetch }) => {
	const legacyApiUrl = env.LEGACY_API_URL ?? 'http://localhost:8787';
	const response = await fetch(`${legacyApiUrl}/api/menu`);

	if (!response.ok) {
		throw new Error(`Could not load menu from legacy-api: ${response.status}`);
	}

	const menu = (await response.json()) as LegacyMenuResponse;

	return { menu };
};
