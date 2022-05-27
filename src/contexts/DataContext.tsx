import { Client, Motorcycle } from '@prisma/client';
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	CompleteTransaction,
	DBData,
	postCreateClient,
	postDeleteClient,
	postUpdateClient,
} from '../lib/helpers';

export interface IDataContext {
	clients: Client[];
	motorcycles: Motorcycle[];
	transactions: CompleteTransaction[];

	setClients: Dispatch<SetStateAction<Client[]>>;
	createClient: (clientData: Client) => void;
	updateClient: (clientData: Client) => void;
	deleteClient: (id: number) => void;

	setMotorcycles: Dispatch<SetStateAction<Motorcycle[]>>;
	createMotorcycle: (motorcycleData: Motorcycle) => void;
	updateMotorcycle: (motorcycleData: Motorcycle) => void;
	deleteMotorcycle: (id: number) => void;

	setTransactions: Dispatch<SetStateAction<CompleteTransaction[]>>;
	createTransaction: (TransactionData: CompleteTransaction) => void;
	updateTransaction: (TransactionData: CompleteTransaction) => void;
	deleteTransaction: (id: number) => void;
}

export interface IDataContextProviderProps {
	children: ReactNode;
}

export const DataContext = createContext<IDataContext>({
	clients: [],
	motorcycles: [],
	transactions: [],
	setClients: () => {},
	createClient: () => {},
	updateClient: () => {},
	deleteClient: () => {},
	setMotorcycles: () => {},
	createMotorcycle: () => {},
	updateMotorcycle: () => {},
	setTransactions: () => {},
	deleteMotorcycle: () => {},
	createTransaction: () => {},
	updateTransaction: () => {},
	deleteTransaction: () => {},
});

export const DataContextProvider = ({
	children,
}: IDataContextProviderProps) => {
	const [clients, setClients] = useState<Client[]>([]);
	const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
	const [transactions, setTransactions] = useState<CompleteTransaction[]>([]);

	const createClient = async (clientData: Client) => {
		console.log(clientData);
		const res = await postCreateClient(clientData);
		setClients([...clients, res]);
	};
	const updateClient = async (clientData: Client) => {
		console.log(clientData);
		const res = await postUpdateClient(clientData);
		setClients(clients.map(c => (c.id === clientData.id ? res : c)));
	};
	const deleteClient = async (clientId: number) => {
		console.log(clientId);
		const res = await postDeleteClient(clientId);
		setClients(clients.filter(c => c.id !== clientId));
	};
	const createMotorcycle = () => {};
	const updateMotorcycle = () => {};
	const deleteMotorcycle = () => {};
	const createTransaction = () => {};
	const updateTransaction = () => {};
	const deleteTransaction = () => {};

	const context: IDataContext = {
		clients,
		motorcycles,
		transactions,

		setClients,
		createClient,
		updateClient,
		deleteClient,

		setMotorcycles,
		createMotorcycle,
		updateMotorcycle,
		deleteMotorcycle,

		setTransactions,
		createTransaction,
		updateTransaction,
		deleteTransaction,
	};

	//fetch initial data
	useEffect(() => {
		fetch('/api/data')
			.then(res => res.json())
			.then((data: DBData) => {
				const { clients, motorcycles, completeTransactions } = data;
				setClients(clients);
				setMotorcycles(motorcycles);
				setTransactions(completeTransactions);
			});
	}, []);

	return (
		<DataContext.Provider value={context}>{children}</DataContext.Provider>
	);
};

export const useDataContext = () => {
	return useContext(DataContext);
};
