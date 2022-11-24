import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import React, { useContext, useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function Payment() {
	const router = useRouter();

	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { shippingAddress, paymentMethod } = cart;

	useEffect(() => {
		if (!shippingAddress) {
			router.push('/shipping').finally();
			return 
		}
		setSelectedPaymentMethod(paymentMethod || '');
	}, [paymentMethod, router, shippingAddress]);

	const submitHandler = (e: any) => {
		e.preventDefault();
		if (!selectedPaymentMethod) {
			return toast.error('Pament method is required');
		}
		dispatch({type:'SavePaymentMethod',payload:selectedPaymentMethod})
		setCookie(null,'cart',JSON.stringify({...cart,paymentMethod}))
		router.push('/placeorder')
	};
	return (
		<Layout title="Payment Method">
			<CheckoutWizard activeStep={2} />
			<form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
				{['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
					<div key={payment} className="mb-4">
						<input
							name="paymentMethod"
							className="p-2 outline-none focus:ring-0"
							id={payment}
							type="radio"
							checked={selectedPaymentMethod===payment}
							onChange={()=>setSelectedPaymentMethod(payment)}
						/>
						<label className="p-2" htmlFor={payment}>
							{payment}
						</label>
					</div>
				))}
				<div className="mb-4 flex justify-between">
					<button
						onClick={() => router.push('/shipping')}
						className="default-button"
						type="button"
					>
						Back
					</button>
					<button className="primary-button">Next</button>
				</div>
			</form>
		</Layout>
	);
}
