import Link from 'next/link';
import React from 'react';
import type { product } from '../utils/data';
import Image from 'next/image'
export default function ProductItem({
	product,
	
}: {
	product: product;
}) {
	return (
		<div className="card" >
			<Link href={`/product/${product.slug}`} passHref>
				<div
				className="rounded shadow overflow-hidden"
				>
					<Image
						src={product.image}
						alt={product.name}
						width={915}
						height={915}
						/>
				</div>
			</Link>
			<div className="flex flex-col items-center justify-center p-5">
				<Link href={`/product/${product.slug}`} passHref>
					<div>
						<h2 className="text-lg">{product.name} </h2>
					</div>
				</Link>
				<p className="mb-2">{product.brand}</p>
				<p className="">${product.price}</p>

				<button className=" primary-button" type="button">
					Add to Cart
				</button>
			</div>
		</div>
	);
}
