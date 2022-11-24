import Link from 'next/link';
import React,{useContext} from 'react';
import type { product } from '../utils/data';
import Image from 'next/image'
import { Store } from '../utils/Store';
export default function ProductItem({
	product,
	
}: {
	product: product;
}) {
	const {state,dispatch} = useContext(Store)
	const additemclickhandler=()=>{
		const existItem = state.cart.cartItems.find((x:product)=>x.slug===product?.slug);
		const quantity  =existItem ? existItem.quantity + 1:1
		dispatch({type:'CartAddItem',payload:{...product,quantity}})
	}
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

				<button className=" primary-button" onClick={additemclickhandler} type="button">
					Add to Cart
				</button>
			</div>
		</div>
	);
}
