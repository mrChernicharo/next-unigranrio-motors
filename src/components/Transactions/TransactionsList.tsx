import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { CompleteTransaction } from '../../lib/helpers';
import Transaction from './TransactionItem';

interface IProps {
	transactions: CompleteTransaction[];
}

export default function TransactionList({ transactions }: IProps) {
	const { deleteTransaction } = useContext(DataContext);

	const handleDeleteTransaction = (id: number) => {
		deleteTransaction(id);
	};

	return (
		<ul className="list-container">
			{transactions.map(transaction => (
				<Transaction
					key={transaction.id}
					transaction={transaction}
					onDelete={handleDeleteTransaction}
				/>
			))}
		</ul>
	);
}
