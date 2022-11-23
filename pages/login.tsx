import Link from 'next/link';
import React,{useEffect} from 'react';
import Layout from '../components/Layout';
import {SubmitHandler, useForm} from 'react-hook-form'
import {getCsrfToken, signIn, useSession} from "next-auth/react"
import {getError} from '../utils/error'
import{toast} from "react-toastify"
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
type FormValues= {
	email:string,
	password:string
}
export default function Login({csrfToken}:{csrfToken:string}) {
	//TODO login form type issue
	// @ts-ignore
	const {handleSubmit,register,formState:{errors}}=useForm<FormValues>()
	const {data:session}= useSession() 
	const router = useRouter()
	const {redirect}=router.query
	useEffect(()=>{
	  if(session?.user){
		// @ts-ignore
		router.push(redirect||'/')
	  }
	}, [router,session,redirect])
	
	const submithandler:SubmitHandler<FormValues>= async ({email,password}:FormValues )=>{
		try{
			const result = await signIn('credentials',{redirect:false,email,password})
		}catch(err){
			toast.error(getError(err))
		}
	}
	return (
		<Layout title="Login">
			<form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submithandler)}>
				<input type="hidden" name='csrfToken' defaultValue={csrfToken}  />
				<h1 className="my-8 text-xl">Login</h1>
				<div className="mb-4">
					<label htmlFor='email'>Email:</label>

					<input type='email' {...register('email',{required:'please enter email',pattern:{value:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i ,message:'enter valid email'}})} className='w-full' id='email' autoFocus></input>
					{errors.email&&(<p className='text-red-600'><>{errors.email.message}</></p>)}
				</div>
				<div className="mb-4">
					<label htmlFor='password'>Password:</label>
					<input type='password'   {...register('password',{required:'please enter password',minLength:{value:6,message:'password most be more more than 5 chars'}})}  className='w-full' id='password' autoFocus></input>
					{errors.password&&(<p className='text-red-600'><>{errors.password.message}</></p>)}

				</div>
				<div className="mb-4">
					<button className='primary-button' >Login</button>
				</div>
				<div className='mb-4'>
		Don{"'"}t have an account?{" "}<Link href={'/register'}>Registerr</Link>
				</div>
			</form>
		</Layout>
	);
}

export const  getServerSideProps:GetServerSideProps = async (context)=>{
	const csrfToken= await getCsrfToken()
	return{
		props:{csrfToken}
	}
}
