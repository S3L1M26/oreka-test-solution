import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { ensureMenuSeeded, getMenu } from '$lib/server/db/menu';
import { toggleProductAvailability } from '$lib/server/db/menu';

export const load: PageServerLoad = async () => {
	await ensureMenuSeeded();
	const categories = await getMenu();

	return { menu: { categories } };
};

export const actions: Actions = {
	toggleAvailability: async ({ request }) => {
		const formData = await request.formData();
		const productId = Number(formData.get('productId'));

		if (!Number.isInteger(productId) || productId <= 0) {
			return fail(400, { message: 'Invalid product id' });
		}

		await toggleProductAvailability(productId);
		return { success: true };
	}
};
