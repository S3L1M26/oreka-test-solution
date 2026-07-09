import type { PageServerLoad } from './$types';
import { ensureMenuSeeded, getMenu } from '$lib/server/db/menu';

export const load: PageServerLoad = async () => {
	await ensureMenuSeeded();
	const categories = await getMenu();

	return { menu: { categories } };
};
