import NextAuth,{NextAuthOptions, User} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from "@next-auth/prisma-adapter/dist/index"
import prisma from "../../../utils/db"
export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'email' },
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'password',
				},
			},
			async authorize(credentials, req) {
				const user = await prisma.user.findFirst({
					where: {
						email: credentials?.email,
					},
					select:{
						email:true,
						password:true,
						name:true
					}
				});				
				if (user?.password == credentials?.password) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],

	callbacks: {
		jwt({ token, user }) {
			if (user?.name) token.name=user.name
			if (user?.email) token.email = user.email
			return token;
		},
		session({ session, user, token }) {
			if(token?.email) session.user.email=token.email
			if(token?.name) session.user.name=token.name
			return session;
		},
	},
};
export default NextAuth(authOptions)