import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import prisma from "../../../utils/db"
export const authOptions = {
  // Configure one or more authentication providers
	providers:[
		CredentialsProvider({
			//TODO solve this issue
			/* @ts-ignore */
			adapter: PrismaAdapter(prisma),
			name:"Credentials",
			credentials:{
				email:{label:"Email",type:"email",placeholder:"email"},
				password:{label:"Password",type:"password",placeholder:"password"},
			},
			async authorize(credentials,req){
				const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
				console.log(credentials)
				if (user) {
				  // Any object returned will be saved in `user` property of the JWT
				  return user
				} else {
				  // If you return null then an error will be displayed advising the user to check their details.
				  return null
		  
				  // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}			},
		})
	],
	pages:{
		signIn:'/login'
	}
}
export default NextAuth(authOptions)