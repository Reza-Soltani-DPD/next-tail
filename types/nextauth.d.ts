import { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	export interface Session {
		user: {
			id?: string;
			email: string;
			password?: string;
			name:string;
		} & DefaultSession['user'];
	}
	export interface User {
		id?: string;
			email: string;
			password?: string;
			name:string;
	}
}

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	export interface JWT {
		id?: string;
			email: string;
			password?: string;
			name:string;
	}
}
