import Global from '../../../../hooks/Global';
import { ITransaction } from '../../../../utils/interfaces';
import './transaction-list.module.css';
import Transaction from './TransactionItem';

interface IProps {
	transactions: ITransaction[];
}

export default function TransactionList({ transactions }: IProps) {
	const { deleteTransaction } = Global;

	const handleDeleteTransaction = (id: string) => deleteTransaction(id);

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
