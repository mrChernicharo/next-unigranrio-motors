import type { GetStaticProps, NextPage } from 'next';
import { getTransactionMotos } from '../lib/helpers';
import { prismaClient } from '../lib/prismaClient';

const Home: NextPage = props => {
	console.log(props);
	return (
		<div>
			Home
			<pre>{JSON.stringify(props, null, 2)}</pre>
		</div>
	);
};

// export const getServerSideProps: GetServerSideProps = async ctx => {
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

export default Home;
