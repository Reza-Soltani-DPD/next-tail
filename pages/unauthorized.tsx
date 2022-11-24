import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Unauthorized(){
	const {message} = useRouter().query
return(
	<Layout title="Unauthorized Page">
		<h1 className='text-xl'>Access Denied</h1>
		{message && <div className='mb-4'>{message}</div>}
	</Layout>
)	
}