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
import { CompleteTransaction, DBData } from './helpers';

export interface IDataContext {
	clients: Client[];
	setClients: Dispatch<SetStateAction<Client[]>>;
	motorcycles: Motorcycle[];
	setMotorcycles: Dispatch<SetStateAction<Motorcycle[]>>;
	transactions: CompleteTransaction[];
	setTransactions: Dispatch<SetStateAction<CompleteTransaction[]>>;
}

export interface IDataContextProviderProps {
	children: ReactNode;
}

export const DataContext = createContext<IDataContext>({
	clients: [],
	setClients: async client => {},
	motorcycles: [],
	setMotorcycles: async motorcycle => {},
	transactions: [],
	setTransactions: async transaction => {},
});

export const DataContextProvider = ({
	children,
}: IDataContextProviderProps) => {
	const [clients, setClients] = useState<Client[]>([]);
	const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
	const [transactions, setTransactions] = useState<CompleteTransaction[]>([]);

	const context: IDataContext = {
		clients,
		setClients,
		motorcycles,
		setMotorcycles,
		transactions,
		setTransactions,
	};

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
