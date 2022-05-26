import type { GetStaticProps, NextPage } from 'next';
import Router from '../components/Router';
import Nav from '../components/shared/Nav';
import { getTransactionMotos } from '../lib/helpers';
import { prismaClient } from '../lib/prismaClient';

const Index: NextPage = props => {
	console.log(props);
	return (
		<div>
			<Nav />
			<Router />
			{/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
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
