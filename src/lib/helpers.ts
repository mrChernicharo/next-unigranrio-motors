import { Client, Motorcycle, Transaction } from '@prisma/client';

export const getTransactionMotos = (
	clients: Client[],
	motorcycles: Motorcycle[],
	transactions: Transaction[]
) => {
	let clientsObj: { [x: number]: Client } = {};
	clients.forEach(client => {
		if (!clientsObj[client.id]) {
			clientsObj[client.id] = client;
		}
	});

	let motosObj: { [x: number]: Motorcycle } = {};
	motorcycles.forEach(moto => {
		if (!(moto.id in motosObj)) {
			motosObj[moto.id] = moto;
		}
	});

	return transactions.map(trans => {
		const { clientId } = trans;

		const client = clientsObj[clientId];

		const parsedMotos = trans.motorcycles.split(',').map(moto => {
			const [id, qtd] = moto.split(':').map(Number);
			return { id, qtd };
		});

		const motorcycles = parsedMotos.map(m => {
			const motorcycle = motosObj[m.id];
			return { ...motorcycle, quantity: m.qtd };
		});

		const total = motorcycles.reduce((acc, moto) => acc + moto.price, 0);
		return {
			id: trans.id,
			createdAt: trans.createdAt,
			client,
			motorcycles,
			total,
		};
	});
};
