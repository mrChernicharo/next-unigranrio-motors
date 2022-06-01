import { Client, Motorcycle, Transaction } from '@prisma/client';

export interface CompleteTransaction {
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

export interface FormTransaction {
	id?: number;
	clientId: number;
	motorcycles: { id: number; quantity: number }[];
	total: number;
}

export type DBData = {
	clients: Client[];
	motorcycles: Motorcycle[];
	transactions: Transaction[];
	completeTransactions: CompleteTransaction[];
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

async function apiPost<T, K>(url: string, data: T): Promise<K> {
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: [['content-type', 'application/json']],
	});

	const result: K = await response.json();
	return result;
}

// *************//
//	  CLIENTS   //
// *************//

export async function postCreateClient(clientData: Partial<Client>) {
	const res: Client = await apiPost('api/client/create', { clientData });
	return res;
}

export async function postUpdateClient(clientData: Partial<Client>) {
	const res: Client = await apiPost('api/client/update', { clientData });
	return res;
}

export async function postDeleteClient(clientId: number) {
	const res = await apiPost('api/client/delete', { clientId });
	return res;
}

// **************//
//  MOTORCYCLES  //
// **************//

export async function postCreateMotorcycle(postData: Partial<Motorcycle>) {
	const { name, year, price, description, imgURL } = postData;
	const motorcycleData = {
		name,
		description,
		price: Number(price),
		year: Number(year),
		imgURL,
	};
	const res: Motorcycle = await apiPost('api/motorcycle/create', {
		motorcycleData,
	});
	return res;
}

export async function postUpdateMotorcycle(postData: Partial<Motorcycle>) {
	const { id, name, year, price, description, imgURL } = postData;
	const motorcycleData = {
		id,
		name,
		description,
		price: Number(price),
		year: Number(year),
		imgURL,
	};
	const res: Motorcycle = await apiPost('api/motorcycle/update', {
		motorcycleData,
	});
	return res;
}

export async function postDeleteMotorcycle(motorcycleId: number) {
	const res = await apiPost('api/motorcycle/delete', { motorcycleId });
	return res;
}

// *************//
// TRANSACTIONS //
// *************//

export async function postCreateTransaction(postData: FormTransaction) {
	console.log({ postData });
	const { clientId, motorcycles } = postData;

	const motosStr = motorcycles.map(m => `${m.id}:${m.quantity}`).join(',');

	const transactionData: Partial<Transaction> = {
		clientId: Number(clientId),
		createdAt: new Date().toISOString(),
		motorcycles: motosStr,
	};

	const res: Transaction = await apiPost('api/transaction/create', {
		transactionData,
	});

	return res;
}

export async function postUpdateTransaction(postData: FormTransaction) {
	console.log({ postData });
	const { id, clientId, motorcycles } = postData;

	const motosStr = motorcycles.map(m => `${m.id}:${m.quantity}`).join(',');

	const transactionData: Partial<Transaction> = {
		id,
		clientId: Number(clientId),
		createdAt: new Date().toISOString(),
		motorcycles: motosStr,
	};

	const res: Transaction = await apiPost('api/transaction/update', {
		transactionData,
	});

	return res;
}

export async function postDeleteTransaction(TransactionId: number) {
	const res = await apiPost('api/transaction/delete', { TransactionId });
	return res;
}

export const getCompleteTransactions = (
	clients: Client[],
	motorcycles: Motorcycle[],
	transactions: Transaction[]
) => {
	const completeTransactions: CompleteTransaction[] = decodeTransactions(
		clients,
		motorcycles,
		transactions
	);

	return completeTransactions;
};

export function decodeTransactions(
	clients: Client[],
	motorcycles: Motorcycle[],
	transactions: Transaction[]
) {
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

	return transactions.map(trans => {
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
	}) as CompleteTransaction[];
}
