import { createContext, ReactElement, useReducer } from 'react';
import type { product } from './data';
import React from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export type statetype ={
	cart:{
		cartItems:product[]
	}
}
const initialState: statetype = {
	cart: parseCookies().cart?JSON.parse(parseCookies().cart):{cartItems:[]},
};
export type ActionType={
	type:string,
	payload:any

}



function reducer(state:statetype,action:ActionType) {
	console.log(parseCookies())
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
				setCookie(null,"cart",JSON.stringify({...state.cart,cartItems}),{maxAge:30*24*60*60})
				return { ...state, cart: { ...state.cart, cartItems } };
			}
			case"CartRemoveItem":{
				const cartItems = state.cart.cartItems.filter((item:product)=>item.slug!== action.payload.slug)
				setCookie(null,"cart",JSON.stringify({...state.cart,cartItems}),{maxAge:30*24*60*60})
				return {...state,cart:{...state.cart,cartItems}}
			}
			default:
				return state;
			}
		}
export const Store = createContext<any>(initialState);
export default function StoreProvider({
	children
}: {
	children: ReactElement;
}) {
	
	const [state, dispatch] = useReducer(reducer, initialState);
	const red={state,dispatch}
	return (
		<Store.Provider value={red} > {children} </Store.Provider> 
	)
}
