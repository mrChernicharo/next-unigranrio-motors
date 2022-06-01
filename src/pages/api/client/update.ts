// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '../../../lib/prismaClient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Client>
) {
	const { clientData } = req.body;

	const data = await prismaClient.client.update({
		data: {
			...clientData,
		},
		where: { id: clientData.id },
	});

	res.status(200).json({ ...data });
}
