// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Motorcycle } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '../../../lib/prismaClient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Motorcycle>
) {
	const { motorcycleId } = req.body;
	console.log(motorcycleId);

	const data = await prismaClient.motorcycle.delete({
		where: { id: motorcycleId },
	});

	res.status(200).json({ ...data });
}
