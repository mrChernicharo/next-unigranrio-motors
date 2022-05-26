import { CompleteTransaction } from '../../lib/helpers';
import Transaction from './TransactionItem';

interface IProps {
	transactions: CompleteTransaction[];
}

export default function TransactionList({ transactions }: IProps) {
	// const { deleteTransaction } = Global;

	const handleDeleteTransaction = (id: number) => {
		//  deleteTransaction(id)
		console.log(`delete id ${id}`);
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
