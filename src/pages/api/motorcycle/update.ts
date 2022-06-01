// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Motorcycle } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '../../../lib/prismaClient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Motorcycle>
) {
	const { motorcycleData } = req.body;

	const data = await prismaClient.motorcycle.update({
		data: {
			...motorcycleData,
		},
		where: { id: motorcycleData.id },
	});

	res.status(200).json({ ...data });
}
