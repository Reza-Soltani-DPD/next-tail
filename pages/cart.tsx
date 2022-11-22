import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { product } from '../utils/data';
import { Store } from '../utils/Store';
export default function Cart() {
	const router = useRouter()
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;
	const removeItemHandler = (item: product) => {
		dispatch({ type: 'CartRemoveItem', payload: item });
	};
	const updateCartHandler= (item:product,value:HTMLSelectElement["value"])=>{
		const quantity = Number(value)
		dispatch({type:"CartAddItem",payload:{...item,quantity}})
	}
	return (
		<Layout title="shopping Cart">
			<h1 className="mb-4 text-xl">Shopping Cart</h1>
			{cartItems?.length === 0 ? (
				<div>
					Cart is Empty.<Link href="/">Go shopping</Link>
				</div>
			) : (
				<div className="grid md:drid-colls-4 md:gap-5">
					<div className="overflow-x-auto md:col-span-3">
						<table className="min-w-full">
							<thead className="border-b">
								<tr>
									<td className="px-5 text-left">Item</td>
									<td className="p-5 text-right">Quantity</td>
									<td className="p-5 text-right">Price</td>
									<td className="p-5 text-right">Action</td>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((item: product) => (
									<tr key={item.slug} className="border-b">
										<td>
											<Link
												href={`/product/${item.slug}`}
											>
												<a className="flex items-center">
													<Image
														src={item.image}
														alt={item.name}
														width={50}
														height={50}
													></Image>
												</a>{' '}
												{item.name}
											</Link>
										</td>
										<td className="p-5 text-right">
											<select value={item.quantity} onChange={(e)=> updateCartHandler(item,e.target.value)}>
																							  {/* TODO solve this error */}

											  {/* @ts-ignore */}
											{[...Array(item.countInStock).keys()].map((x=>(
												<option key={x+1} value={x+1}>{x+1}</option>
												)))}
												</select>
										</td>
										<td className="p-5 text-right">
											${item.price}
										</td>
										<td className="p-5 text-center">
											<button
												onClick={() =>
													removeItemHandler(item)
												}
											>
												X
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="card p-5">
						<ul>
							<li>
											  {/* TODO solve this error */}
																			  {/* @ts-ignore */}
								<div className='pb-3'>Subtotal ({cartItems.reduce((a:number,c:product)=>a+c.quantity,0)}){' '}: {cartItems.reduce((a:number,c:product) => a+c.quantity * c.price,0)}</div>
							</li>
							<li>
								<button className='primary-button w-full' onClick={()=>router.push('login?redirect=/shipping')}>Checkout</button>
							</li>
						</ul>
					</div>
				</div>
			)}
		</Layout>
	);
}
