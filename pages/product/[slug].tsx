import { GetServerSideProps } from 'next';
import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { product } from '../../utils/data';
import { Store } from '../../utils/Store';
import prisma from '../../utils/db';
import axios from 'axios';

export default function ProductScreen({ product }: { product: product }) {
	const { state, dispatch } = useContext(Store);
	const addtocarthandler = async () => {
		const existItem = state.cart.cartItems.find(
			(x: product) => x.slug === product?.slug
		);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const {data} = await axios.get(`/api/products/${product.id}`)
		console.log(data);
		
		if(data?.countInStock<quantity){
			alert("Sorry. Product is out of stock")
		}
		dispatch({ type: 'CartAddItem', payload: { ...product, quantity } });
	};
	if (!product?.slug) {
		return (
			<Layout title="Product Not Found">
				<div className="flex items-center py-10 ">
					<h1 className="text-2xl w-auto m-auto">
						Product Not Found
					</h1>
				</div>
			</Layout>
		);
	}
	return (
		<>
			<Layout title={product.name}>
				<div className="py-2">
					<Link href="/">{'<'}Back to products</Link>
					<div className="grid md:grid-cols-4 md:gap-3 p-5">
						<div className="md:col-span-2  rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-150 ease-out-in">
							<Image
								src={product.image}
								alt={product.name}
								width={640}
								height={640}
								layout="responsive"
							></Image>
						</div>
						<div className="px-5">
							<ul>
								<li>
									<h1 className="text-lg">{product.name}</h1>
								</li>
								<li> Category : {product.category}</li>
								<li> Brand : {product.brand}</li>
								<li>
									{' '}
									{product.rating} of {product.numReviews}{' '}
									Reviews
								</li>
								<li> Description : {product.description}</li>
							</ul>
						</div>
						<div>
							<div className="card p-5 ">
								<div className="mb-2 flex justify-between">
									<div>Price</div>
									<div>${product.price}</div>
								</div>
								<div className="mb-2 flex justify-between">
									<div>Status</div>
									<div>
										{product.countInStock > 0
											? 'In stock'
											: 'Unavailable'}
									</div>
								</div>
								<button
									className="primary-button w-full"
									onClick={() => addtocarthandler()}
								>
									Add to cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { slug } = context.query;
	const data = typeof slug=='string'?await prisma.products.findUnique({ where: { slug } }):null

	console.log(data);
	
	return { props: { product: data } };
};
