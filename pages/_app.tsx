import type { AppProps } from 'next/app'
import StoreProvider from '../utils/Store';
import '../styles/globals.css'
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
type prop=AppProps&{Component:{Auth:React.ReactNode}}
export default function App({
	Component,
	pageProps: { session, ...pageProps }
}: prop) {
	return (
		<SessionProvider session={session}>
			<StoreProvider>
				{Component.Auth ?(

					//TODO fix auth type
					//@ts-ignore
					<Auth>
						<Component {...pageProps} />
					</Auth>
				) : (
					<Component {...pageProps} />
				)}
			</StoreProvider>
		</SessionProvider>
	);
}
function Auth({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { status, data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/unauthorized?message=login required');
		},
	});
	if (status === 'loading') {
		return <div>Loading...</div>;
	}
	return children;
}
