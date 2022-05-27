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
	createTransaction: (TransactionData: Partial<CompleteTransaction>) => void;
	updateTransaction: (TransactionData: Partial<CompleteTransaction>) => void;
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

	const createClient = async (clientData: Partial<Client>) => {
		setIsLoading(true);
		const res = await postCreateClient(clientData);
		setIsLoading(false);
		setClients([...clients, res]);
	};
	const updateClient = async (clientData: Partial<Client>) => {
		setIsLoading(true);
		const res = await postUpdateClient(clientData);
		setIsLoading(false);

		setClients(clients.map(c => (c.id === clientData.id ? res : c)));
	};
	const deleteClient = async (clientId: number) => {
		setIsLoading(true);
		const res = await postDeleteClient(clientId);
		setIsLoading(false);

		setClients(clients.filter(c => c.id !== clientId));
	};
	const createMotorcycle = () => {};
	const updateMotorcycle = () => {};
	const deleteMotorcycle = () => {};
	const createTransaction = () => {};
	const updateTransaction = () => {};
	const deleteTransaction = () => {};

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
