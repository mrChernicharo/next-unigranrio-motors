import type { GetStaticProps } from 'next';
import Home from '../components/Home';
import { getCompleteTransactions } from '../lib/helpers';
import { prismaClient } from '../lib/prismaClient';

const Index = () => {
	return <Home />;
};

export const getStaticProps: GetStaticProps = async ctx => {
	// console.log(ctx);

	const clients = await prismaClient.client.findMany();
	const motorcycles = await prismaClient.motorcycle.findMany();
	const transactions = await prismaClient.transaction.findMany();

	const completeTransactions = getCompleteTransactions(
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
