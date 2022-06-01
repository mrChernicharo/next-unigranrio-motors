// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Transaction } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '../../../lib/prismaClient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Transaction>
) {
	const { transactionId } = req.body;
	console.log({ transactionId });

	const data = await prismaClient.transaction.delete({
		where: { id: transactionId },
	});

	res.status(200).json({ ...data });
}
