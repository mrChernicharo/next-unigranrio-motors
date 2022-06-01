// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { DBData, getCompleteTransactions } from '../../lib/helpers';
import { prismaClient } from '../../lib/prismaClient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<DBData>
) {
	const clients = await prismaClient.client.findMany();
	const motorcycles = await prismaClient.motorcycle.findMany();
	const transactions = await prismaClient.transaction.findMany();

	const completeTransactions = getCompleteTransactions(
		clients,
		motorcycles,
		transactions
	);

	res.status(200).json({
		clients,
		motorcycles,
		transactions,
		completeTransactions,
	});
}
