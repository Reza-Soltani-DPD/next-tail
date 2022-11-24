import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/db';
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { query } = req;
	const { id } = query;
	const data =
		typeof id == 'string'
			? await prisma.products.findUnique({ where: { id } })
			: null;
	res.send(data)
}
