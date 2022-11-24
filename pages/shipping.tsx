import React, { useContext, useState ,useEffect} from 'react';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import { useForm } from 'react-hook-form';
import { Store } from '../utils/Store';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';
type formFields = {
	fullName: string;
	country: string;
	address: string;
	city: string;
	postalCode: string;
};
export default function Shipping() {
	
	const router = useRouter()
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<formFields>();
	const { state, dispatch } = useContext(Store);
	const {cart}=state
	const {shippingAddress}=cart
	const submitHandler = ({
		fullName,
		address,
		city,
		postalCode,
		country,
	}: formFields) => {
		dispatch({
			type: 'SaveShippingAddress',
			payload: { fullName, address, city, postalCode, country },
		});
		const cookie=JSON.stringify({...cart,shippingAddress:{fullName,address,city,postalCode,country}});		
		setCookie(null,"cart",cookie)
		router.push('/payment')
	};
	useEffect(() => {
	
	  return () => {
		setValue("fullName",shippingAddress.fullName)
		setValue("address",shippingAddress.address)
		setValue("city",shippingAddress.city)
		setValue("country",shippingAddress.country)
		setValue("postalCode",shippingAddress.postalCode)
	  }
	}, [setValue,shippingAddress])
	
	return (
		<Layout title="Shipping">
			<CheckoutWizard />
			<form
				onSubmit={handleSubmit(submitHandler)}
				className="mx-auto max-w-screen-md"
			>
				<h1 className="mb-4 text-xl">Shipping Address</h1>
				<div className="mb-4">
					<label htmlFor="fullName">Full Name :</label>
					<input
						className="w-full"
						id="fullName"
						autoFocus
						{...register('fullName', {
							required: 'Please enter full name',
						})}
					/>
					{errors.fullName && (
						<div className="text-red-500">
							{errors.fullName.message}
						</div>
					)}
				</div>
				<div className="mb-4">
					<label htmlFor="country">Country :</label>
					<input
						className="w-full"
						id="country"
						{...register('country', {
							required: 'Please enter Country',
							minLength: {
								value: 3,
								message: 'Country is more than 2 chars',
							},
						})}
					/>
					{errors.country && (
						<div className="text-red-500">
							{errors.country.message}
						</div>
					)}
				</div>
				<div className="mb-4">
					<label htmlFor="city">City :</label>
					<input
						className="w-full"
						id="city"
						{...register('city', {
							required: 'Please enter city',
							minLength: {
								value: 3,
								message: 'City is more than 2 chars',
							},
						})}
					/>
					{errors.city && (
						<div className="text-red-500">
							{errors.city.message}
						</div>
					)}
				</div>
				<div className="mb-4">
					<label htmlFor="">Address :</label>
					<input
						className="w-full"
						id="address"
						{...register('address', {
							required: 'Please enter full name',
							minLength: {
								value: 3,
								message: 'Address is more than 2 chars',
							},
						})}
					/>
					{errors.address && (
						<div className="text-red-500">
							{errors.address.message}
						</div>
					)}
				</div>
				<div className="mb-4">
					<label htmlFor="postalCode">Postal Code :</label>
					<input
						className="w-full"
						id="postalCode"
						{...register('postalCode', {
							required: 'Please enter Postal Code',
							minLength: {
								value: 3,
								message: 'Postal Code is more than 2 chars',
							},
						})}
					/>
					{errors.postalCode && (
						<div className="text-red-500">
							{errors.postalCode.message}
						</div>
					)}
				</div>
				<div className="mb-4 flex justify-between">
					<button className="primary-button">click</button>
				</div>
			</form>
		</Layout>
	);
}
Shipping.Auth=true
