import prisma from '../../utils/db';
import datas from '../../utils/data';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function Seed(req: NextApiRequest, res: NextApiResponse) {
	//@ts-ignore
	const data= await prisma.products.createMany({ data: datas.products ,skipDuplicates:true});
		//@ts-ignore
	const users= await prisma.user.createMany({data:datas.users,skipDuplicates:true})
	res.status(200).json({data,users})
}
