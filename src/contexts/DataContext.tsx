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
	FormTransaction,
	postCreateClient,
	postDeleteClient,
	postUpdateClient,
} from '../lib/helpers';

export interface IDataContext {
	isLoading: boolean;

	clients: Client[];
	motorcycles: Motorcycle[];
	transactions: CompleteTransaction[];

	setClients: Dispatch<SetStateAction<Client[]>>;
	createClient: (clientData: Partial<Client>) => void;
	updateClient: (clientData: Partial<Client>) => void;
	deleteClient: (id: number) => void;

	setMotorcycles: Dispatch<SetStateAction<Motorcycle[]>>;
	createMotorcycle: (motorcycleData: Partial<Motorcycle>) => void;
	updateMotorcycle: (motorcycleData: Partial<Motorcycle>) => void;
	deleteMotorcycle: (id: number) => void;

	setTransactions: Dispatch<SetStateAction<CompleteTransaction[]>>;
	createTransaction: (TransactionData: FormTransaction) => void;
	updateTransaction: (TransactionData: FormTransaction) => void;
	deleteTransaction: (id: number) => void;
}

export interface IDataContextProviderProps {
	children: ReactNode;
}

export const DataContext = createContext<IDataContext>({
	isLoading: true,
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
	const [isLoading, setIsLoading] = useState(true);

	const withLoader = async cb => {
		console.log('withLoader');
		setIsLoading(true);
		cb().then(() => setIsLoading(false));
	};

	const createClient = async (clientData: Partial<Client>) => {
		withLoader(async () => {
			const res = await postCreateClient(clientData);
			setClients([...clients, res]);
		});
	};

	const updateClient = async (clientData: Partial<Client>) => {
		withLoader(async () => {
			const res = await postUpdateClient(clientData);
			setClients(clients.map(c => (c.id === clientData.id ? res : c)));
		});
	};

	const deleteClient = async (clientId: number) => {
		withLoader(async () => {
			const res = await postDeleteClient(clientId);
			setClients(clients.filter(c => c.id !== clientId));
		});
	};
	const createMotorcycle = async () => {
		withLoader(async () => {});
	};
	const updateMotorcycle = async () => {
		withLoader(async () => {});
	};
	const deleteMotorcycle = async () => {
		withLoader(async () => {});
	};
	const createTransaction = async (transactionData: FormTransaction) => {
		withLoader(async () => {
			console.log({ transactionData });
		});
	};
	const updateTransaction = async (transactionData: FormTransaction) => {
		withLoader(async () => {
			console.log({ transactionData });
		});
	};
	const deleteTransaction = async () => {
		withLoader(async () => {});
	};

	const context: IDataContext = {
		isLoading,

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
				console.log('andale!');
				setIsLoading(false);
			});
	}, []);

	return (
		<DataContext.Provider value={context}>{children}</DataContext.Provider>
	);
};

export const useDataContext = () => {
	return useContext(DataContext);
};
