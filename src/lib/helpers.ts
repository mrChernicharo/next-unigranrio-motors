import { Client, Motorcycle, Transaction } from '@prisma/client';

interface CompleteTransaction {
	id: number;
	client: Client;
	motorcycles: {
		id: number;
		name: string;
		description: string;
		year: number;
		price: number;
		imgURL: string;
		quantity: number;
	}[];
	total: number;
	createdAt: string;
}

export const getTransactionMotos = (
	clients: Client[],
	motorcycles: Motorcycle[],
	transactions: Transaction[]
) => {
	// organize clients and motorcycles in objects
	let clientsObj: { [x: number]: Client } = {};
	clients.forEach(client => {
		if (!clientsObj[client.id]) {
			clientsObj[client.id] = client;
		}
	});

	let motorcyclesObj: { [x: number]: Motorcycle } = {};
	motorcycles.forEach(moto => {
		if (!(moto.id in motorcyclesObj)) {
			motorcyclesObj[moto.id] = moto;
		}
	});

	const completeTransactions: CompleteTransaction[] = transactions.map(
		trans => {
			const { id, clientId, createdAt } = trans;

			const client = clientsObj[clientId];

			const decodedMotos = trans.motorcycles.split(',').map(moto => {
				const [id, quantity] = moto.split(':').map(Number);
				return { id, quantity };
			});

			const motorcycles = decodedMotos.map(m => {
				const motorcycle = motorcyclesObj[m.id];

				return { ...motorcycle, quantity: m.quantity };
			});

			const total = motorcycles.reduce(
				(acc, moto) => acc + moto.price * moto.quantity,
				0
			);

			const result = {
				id,
				client,
				motorcycles,
				total,
				createdAt,
				// createdAt: new Date(Date.parse(trans.createdAt)),
			};

			return result;
		}
	);

	return completeTransactions;
};

export const capitalize = (str: string) =>
	`${str[0].toUpperCase()}${str.substring(1)}`;

export const toCurrency = (num: number) =>
	'R$' + num.toLocaleString('pt-BR') + ',00';

// prettier-ignore
export const toDate = (str: string | Date) =>
	`${new Date(str).toLocaleDateString('pt-BR')} às ${new Date(str).toLocaleTimeString('pt-BR')}`;

export const getClientById = (clients: Client[], id: number) => {
	return clients.find(client => client.id === id);
};

export const getMotoById = (motorcycles: Motorcycle[], id: number) => {
	return motorcycles.find(moto => moto.id === id);
};
