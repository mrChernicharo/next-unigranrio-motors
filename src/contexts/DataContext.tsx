import { Client, Motorcycle, Transaction } from '@prisma/client';
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
	getCompleteTransactions,
	postCreateClient,
	postCreateMotorcycle,
	postCreateTransaction,
	postDeleteClient,
	postDeleteMotorcycle,
	postDeleteTransaction,
	postUpdateClient,
	postUpdateMotorcycle,
	postUpdateTransaction,
} from '../lib/helpers';

export interface IDataContext {
	isLoading: boolean;
	currentPage: string;
	setCurrentPage: Dispatch<SetStateAction<string>>;

	clients: Client[];
	motorcycles: Motorcycle[];
	transactions: CompleteTransaction[];

	setClients: Dispatch<SetStateAction<Client[]>>;
	createClient: (clientData: Partial<Client>) => Promise<void>;
	updateClient: (clientData: Partial<Client>) => Promise<void>;
	deleteClient: (id: number) => Promise<void>;

	setMotorcycles: Dispatch<SetStateAction<Motorcycle[]>>;
	createMotorcycle: (motorcycleData: Partial<Motorcycle>) => Promise<void>;
	updateMotorcycle: (motorcycleData: Partial<Motorcycle>) => Promise<void>;
	deleteMotorcycle: (id: number) => Promise<void>;

	setTransactions: Dispatch<SetStateAction<CompleteTransaction[]>>;
	createTransaction: (TransactionData: FormTransaction) => Promise<void>;
	updateTransaction: (TransactionData: FormTransaction) => Promise<void>;
	deleteTransaction: (id: number) => Promise<void>;
}

export interface IDataContextProviderProps {
	children: ReactNode;
}

export const DataContext = createContext<IDataContext>({
	isLoading: true,
	currentPage: 'Home',
	setCurrentPage: () => {},
	clients: [],
	motorcycles: [],
	transactions: [],
	setClients: () => {},
	createClient: async () => {},
	updateClient: async () => {},
	deleteClient: async () => {},
	setMotorcycles: () => {},
	createMotorcycle: async () => {},
	updateMotorcycle: async () => {},
	setTransactions: async () => {},
	deleteMotorcycle: async () => {},
	createTransaction: async () => {},
	updateTransaction: async () => {},
	deleteTransaction: async () => {},
});

export const DataContextProvider = ({
	children,
}: IDataContextProviderProps) => {
	const [clients, setClients] = useState<Client[]>([]);
	const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
	const [transactions, setTransactions] = useState<CompleteTransaction[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState('Home');

	const withLoader = async cb => {
		setIsLoading(true);
		cb().then(() => setIsLoading(false));
	};

	// ******** clients ********** //

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

	// ******** motorcycles ********** //

	const createMotorcycle = async (postData: Partial<Motorcycle>) => {
		withLoader(async () => {
			const res = await postCreateMotorcycle(postData);
			setMotorcycles([...motorcycles, res]);
		});
	};
	const updateMotorcycle = async (postData: Partial<Motorcycle>) => {
		withLoader(async () => {
			const res = await postUpdateMotorcycle(postData);
			setMotorcycles(motorcycles.map(m => (m.id === res.id ? res : m)));
		});
	};
	const deleteMotorcycle = async (motoId: number) => {
		withLoader(async () => {
			const res = await postDeleteMotorcycle(motoId);
			setMotorcycles(motorcycles.filter(moto => moto.id !== motoId));
		});
	};

	// ******** transactions ********** //

	const createTransaction = async (postData: FormTransaction) => {
		withLoader(async () => {
			const res: Transaction = await postCreateTransaction(postData);
			const completeTransactions = getCompleteTransactions(
				clients,
				motorcycles,
				[res]
			);

			setTransactions([...transactions, ...completeTransactions]);
		});
	};
	const updateTransaction = async (postData: FormTransaction) => {
		withLoader(async () => {
			const res = await postUpdateTransaction(postData);
			const completeTransactions = getCompleteTransactions(
				clients,
				motorcycles,
				[res]
			);
			setTransactions(
				transactions.map(t =>
					t.id === postData.id ? completeTransactions[0] : t
				)
			);
		});
	};
	const deleteTransaction = async (transactionId: number) => {
		withLoader(async () => {
			const res = await postDeleteTransaction(transactionId);
			setTransactions(transactions.filter(t => t.id !== transactionId));
		});
	};

	const context: IDataContext = {
		isLoading,
		currentPage,
		setCurrentPage,

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
		fetch('/api/fetchData')
			.then(res => res.json())
			.then((data: DBData) => {
				const { clients, motorcycles, completeTransactions } = data;
				setClients(clients);
				setMotorcycles(motorcycles);
				setTransactions(completeTransactions);
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
