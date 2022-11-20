import type { AppProps } from 'next/app'
import StoreProvider from '../utils/Store';
import '../styles/globals.css'

export default function App(AppProps: AppProps) {
	const{Component,pageProps} = AppProps;
	console.log(AppProps)
	return (
		<StoreProvider >
			<Component {...pageProps} />
		</StoreProvider>
  );
}
