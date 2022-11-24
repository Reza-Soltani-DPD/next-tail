import Layout from '../components/Layout';
import type { product } from '../utils/data';
import ProductItem  from '../components/ProductItem';
import prisma from '../utils/db';

export default function Home({ products }: { products: product[] }) {
		
	return (
		<div>
			<Layout title="HomePage">
				<div className="grid gap-4 sm:grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{products.map((product: product) => {
						const pr = {
							name: product.name,
							image: product.image,
							slug: product.slug,
							brand: product.brand,
							price: product.price,
							countInStock: product.countInStock,
						};
						return <ProductItem product={pr} key={product.slug} />;
					})}
				</div>
			</Layout>
		</div>
	);
}
export async function getServerSideProps() {
	const products = await prisma.products.findMany({});
	return { props: { products } };
}
