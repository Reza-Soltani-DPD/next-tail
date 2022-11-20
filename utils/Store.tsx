import { createContext, ReactElement, useReducer } from 'react';
import type { product } from './data';
import React from 'react';
import { type } from 'os';


export type statetype ={
	cart:{
		cartItems:product[]
	}
}
const initialState: statetype = {
	cart: {
		cartItems: [],
	},
};
export type ActionType={
	type:string,
	payload:any

}


export const Store = createContext<any>(initialState);

function reducer(state:statetype,action:ActionType) {
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
	children
}: {
	children: ReactElement;
}) {
	useReducer
	const [state, dispatch] = useReducer(reducer, initialState);
	const red={state,dispatch}
	return (
		<Store.Provider value={red} > {children} </Store.Provider> 
	)
}
