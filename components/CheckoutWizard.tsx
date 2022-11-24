import React from 'react'


export default function  CheckoutWizard({activeStep=1}:{activeStep?:number}) {
	return(
		<div className='mb-5 flex flex-wrap'>
			{
				['User Login','ShippingAddress','Payment Method','Place Order'].map((step,index)=>(
					<div
					key={step}
					className={`flex-1 border-b-2 text-center transition-colors duration-500 ease-in-out ${index<=activeStep?'border-orange-500 text-orange-500':'border-zinc-200 text-zinc-400'} pb-4 `}>{step}</div>
				))
			}
		</div>
	)
}
