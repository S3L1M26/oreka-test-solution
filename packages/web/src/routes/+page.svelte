<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const formatPrice = (price: number) =>
		new Intl.NumberFormat('es-CL', {
			style: 'currency',
			currency: 'CLP',
			maximumFractionDigits: 0
		}).format(price);
</script>

<svelte:head>
	<title>Oreka Menu</title>
</svelte:head>

<main class="menu-page">
	<header>
		<p class="eyebrow">Oreka Legacy Migration Test</p>
		<h1>Carta del restaurante</h1>
		<p>
			Esta pagina todavia lee datos desde <code>legacy-api</code>. La mision es migrar la carta a
			Drizzle dentro de SvelteKit.
		</p>
	</header>

	<section class="menu-list" aria-label="Carta">
		{#each data.menu.categories as category}
			<article class="category">
				<h2>{category.name}</h2>

				<div class="products">
					{#each category.products as product}
						<div class:unavailable={!product.isAvailable} class="product">
							<div>
								<h3>{product.name}</h3>
								<p>{product.description}</p>
							</div>
							<div class="product-meta">
								<strong>{formatPrice(product.price)}</strong>
								<span>{product.isAvailable ? 'Disponible' : 'No disponible'}</span>
							</div>
						</div>
					{/each}
				</div>
			</article>
		{/each}
	</section>
</main>

<style>
	.menu-page {
		max-width: 880px;
		margin: 0 auto;
		padding: 48px 20px;
	}

	header {
		margin-bottom: 32px;
	}

	.eyebrow {
		margin: 0 0 8px;
		color: #6b7280;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0;
		text-transform: uppercase;
	}

	h1 {
		margin: 0 0 12px;
		font-size: 2.5rem;
		line-height: 1.05;
	}

	header p {
		max-width: 680px;
		color: #4b5563;
	}

	code {
		border-radius: 4px;
		background: #f3f4f6;
		padding: 2px 5px;
	}

	.menu-list {
		display: grid;
		gap: 24px;
	}

	.category {
		border-top: 1px solid #d1d5db;
		padding-top: 20px;
	}

	.category h2 {
		margin: 0 0 14px;
		font-size: 1.35rem;
	}

	.products {
		display: grid;
		gap: 12px;
	}

	.product {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		padding: 16px;
	}

	.product h3,
	.product p {
		margin: 0;
	}

	.product h3 {
		font-size: 1rem;
	}

	.product p {
		margin-top: 6px;
		color: #6b7280;
	}

	.product-meta {
		display: grid;
		align-content: start;
		justify-items: end;
		min-width: 128px;
		gap: 6px;
	}

	.product-meta span {
		color: #047857;
		font-size: 0.85rem;
	}

	.product.unavailable {
		background: #f9fafb;
		color: #6b7280;
	}

	.product.unavailable .product-meta span {
		color: #b91c1c;
	}

	@media (max-width: 640px) {
		.product {
			display: grid;
		}

		.product-meta {
			justify-items: start;
		}
	}
</style>
