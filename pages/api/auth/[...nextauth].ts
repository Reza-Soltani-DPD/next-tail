import NextAuth,{NextAuthOptions, User} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from "@next-auth/prisma-adapter/dist/index"
import prisma from "../../../utils/db"
export const authOptions:NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session:{
		strategy:'jwt',
		maxAge:30*24*60*60,
		updateAge:60*60

	},
	providers:[
		CredentialsProvider({
			name:"Credentials",
			credentials:{
				email:{label:"Email",type:"email",placeholder:"email"},
				password:{label:"Password",type:"password",placeholder:"password"},
			},
			async authorize(credentials,req){
				console.log(credentials)
				const user = await prisma.user.findUnique({
					where:{
						email:credentials?.email,
					}
				})
				console.log(credentials)
				if (user?.password==credentials?.password) {
				  // Any object returned will be saved in `user` property of the JWT
				  return user
				} else {
				  // If you return null then an error will be displayed advising the user to check their details.
				  return null
		  
				  // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}			},
		})
	],
	
	callbacks:{

		async jwt({token,user}){
			if(user?.id) token.id=user.id
			return token
		},
		async session({session,user,token}){
			if(token?.isAdmin) session.user.isAdmin=token.isAdmin
			return session		
		}
	},
	
}
export default NextAuth(authOptions)