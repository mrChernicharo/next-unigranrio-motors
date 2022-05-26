import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../lib/DataContext';
import { CompleteTransaction } from '../../lib/helpers';
import CreateTransaction from './CreateTransaction';
import './transaction-page.module.css';
import TransactionList from './TransactionsList';
import TransactionsSearch from './TransactionsSearch';

const TransactionsPage = () => {
	const { transactions } = useContext(DataContext);

	// prettier-ignore
	const [shownTransactions, setShownTransactions] = useState<CompleteTransaction[]>([...transactions]);
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearchChange = (searchStr: string) => {
		setSearchTerm(searchStr.toLowerCase());
	};

	useEffect(() => {
		if (searchTerm === '') {
			setShownTransactions([...transactions]);
		} else {
			setShownTransactions(
				transactions.filter(transaction => {
					const clientName = `${transaction.client.firstName.toLowerCase()} ${transaction.client.lastName.toLowerCase()}`;
					const motoNames = transaction.motorcycles
						.map(moto => moto.name.toLowerCase())
						.join(' ');

					console.log({ clientName, motoNames, searchTerm });

					return (
						clientName.includes(searchTerm) ||
						motoNames.includes(searchTerm) ||
						transaction.total.toString().includes(searchTerm)
					);
				})
			);
		}
	}, [searchTerm, transactions]);

	return (
		<div className="page-container">
			<h1>Vendas</h1>
			<div className="search-input-container">
				<TransactionsSearch onChange={handleSearchChange} />
			</div>

			<TransactionList transactions={shownTransactions} />

			<CreateTransaction />
		</div>
	);
};

export default TransactionsPage;
