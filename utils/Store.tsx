import { createContext, ReactElement, useReducer } from 'react';
import type { product } from './data';
import React from 'react';

type statetype ={
	cart:{
		cartItems:product[]
	}
}
const initialState: statetype = {
	cart: {
		cartItems: [],
	},
};
i actionType={
	type:string;
	payload?:product;

}
export const Store = createContext<statetype>(initialState);
function reducer<statetype, actionType>(state:statetype,action:actionType) {
	switch (action.type) {
		case "CartAddItem": {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(
				(item:product) => item.slug === newItem.slug
			);
			const cartItems = existItem
				? state.cart.cartItems.map((item:product) =>
						item.slug == existItem.slug ? newItem : item
				  )
				: [...state.cart.cartItems, newItem];
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		default:
			return state;
	}
}

export default function StoreProvider({
	children,
}: {
	children: ReactElement;
}) {
	
	const [state, dispatch] = useReducer(reducer, initialState);
	return <Store.Provider value={{state,dispatch}} > {children} </Store.Provider>;
}
