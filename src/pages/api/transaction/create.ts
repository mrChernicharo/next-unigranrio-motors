// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Transaction } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '../../../lib/prismaClient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Transaction>
) {
	const { transactionData } = req.body;

	const data = await prismaClient.transaction.create({
		data: {
			...transactionData,
		},
	});

	res.status(200).json({ ...data });
}
