import { Client } from '@prisma/client';
import { useContext, useState } from 'react';
import { FiEdit, FiTrash, FiX } from 'react-icons/fi';
import { capitalize, toCurrency, toDate } from '../../lib/helpers';
import { DataContext } from '../DataContext';
import DetailsModal from '../shared/DetailsModal';
import ClientForm from './ClientForm';

interface IProps {
	client: Client;
	onClose: (e: any) => void;
	onDelete: (id: number) => void;
}
export default function ClientDetails({ client, onClose, onDelete }: IProps) {
	const { id, email, firstName, lastName } = client;
	const { transactions } = useContext(DataContext);

	const [editingMode, setEditingMode] = useState(false);

	const clientTransactions = transactions.filter(
		transaction => transaction.client.id === id
	);
	const totalSpent = clientTransactions.reduce(
		(acc, item) => (acc += item.total),
		0
	);

	return (
		<DetailsModal onClose={onClose}>
			<button onClick={() => onDelete(id)} title="deletar usuário">
				<FiTrash />
			</button>

			{editingMode ? (
				<>
					<button onClick={() => setEditingMode(false)}>
						<FiX />
					</button>

					<ClientForm
						mode="edit"
						client={client}
						onSubmitted={() => setEditingMode(false)}
					/>
				</>
			) : (
				<>
					<button
						onClick={() => setEditingMode(true)}
						title="editar usuário"
					>
						<FiEdit />
					</button>

					<h5>
						{capitalize(firstName)} {capitalize(lastName)}
					</h5>

					<p>id: {id}</p>

					<p>Email: {email}</p>

					<br />

					{clientTransactions.length > 0 && (
						<>
							<p>Compras de {firstName}</p>
							<table>
								<thead>
									<th></th>
									<th>Valor Compra</th>
									<th>Data e hora</th>
								</thead>
								<tbody>
									{clientTransactions.map(
										(transaction, i) => {
											const { total, createdAt } =
												transaction;

											return (
												<tr key={transaction.id}>
													<td>{i + 1}</td>
													<td>{toCurrency(total)}</td>
													<td>{toDate(createdAt)}</td>
												</tr>
											);
										}
									)}
								</tbody>
							</table>
							<h4>Total gasto: {toCurrency(totalSpent)}</h4>
						</>
					)}
				</>
			)}
		</DetailsModal>
	);
}
