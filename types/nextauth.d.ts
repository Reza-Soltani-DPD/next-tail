import { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			id: string;
			email: string;
			password: string;
			isAdmin: boolean;
		} & DefaultSession['user'];
	}
	// interface User {
	// 	id?: string;
	// 	isAdmin?: boolean;
  //   email:string
  //   password:string
	// }
}

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		id?: string;
		isAdmin: boolean;
	}
}
