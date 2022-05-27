import { Client, Motorcycle, Transaction } from '@prisma/client';
import type { GetStaticProps } from 'next';
import { useContext } from 'react';
import Home from '../components/Home';
import { DataContext } from '../contexts/DataContext';
import { CompleteTransaction, getTransactionMotos } from '../lib/helpers';
import { prismaClient } from '../lib/prismaClient';

export interface InitialProps {
	clients: Client[];
	motorcycles: Motorcycle[];
	transactions: Transaction[];
	completeTransactions: CompleteTransaction[];
}

const Index = ({
	clients,
	motorcycles,
	transactions,
	completeTransactions,
}: InitialProps) => {
	console.log({ clients, motorcycles, transactions, completeTransactions });

	const { setClients, setMotorcycles, setTransactions } =
		useContext(DataContext);

	return (
		<div className="main">
			<Home />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ctx => {
	// console.log(ctx);

	const clients = await prismaClient.client.findMany();
	const motorcycles = await prismaClient.motorcycle.findMany();
	const transactions = await prismaClient.transaction.findMany();

	const completeTransactions = getTransactionMotos(
		clients,
		motorcycles,
		transactions
	);

	return {
		props: {
			clients,
			motorcycles,
			transactions,
			completeTransactions,
		},
		revalidate: 60,
	};
};

export default Index;
