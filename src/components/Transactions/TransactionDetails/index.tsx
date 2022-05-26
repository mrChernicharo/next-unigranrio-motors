import { nanoid } from 'nanoid';
import { useState } from 'react';
import { FiEdit, FiTrash, FiX } from 'react-icons/fi';
import { toCurrency } from '../../../../utils/functions';
import { ITransaction } from '../../../../utils/interfaces';
import DetailsModal from '../../../shared/DetailsModal';
import TransactionForm from '../TransactionForm';
import './transaction-details.module.css';

interface IProps {
	transaction: ITransaction;
	onClose: (e: any) => void;
	onDelete: (id: string) => void;
}

export default function TransactionDetails({
	transaction,
	onClose,
	onDelete,
}: IProps) {
	const { client, motorcycles, id, createdAt, total } = transaction;

	const [editingMode, setEditingMode] = useState(false);

	return (
		<DetailsModal onClose={onClose}>
			<>
				<button onClick={() => onDelete(id)} title="deletar venda">
					<FiTrash />
				</button>

				{editingMode ? (
					<>
						<button onClick={() => setEditingMode(false)}>
							<FiX />
						</button>
						<TransactionForm
							transaction={transaction}
							onSubmitted={onClose}
						/>
					</>
				) : (
					<>
						<button onClick={() => setEditingMode(true)}>
							<FiEdit />
						</button>

						<h5>
							{client.firstName} {client.lastName}
							<p>{id}</p>
						</h5>

						{Object.entries(client).map(([k, v]) => (
							<p key={nanoid()}>
								<span className="key">{k}</span>:{v}
							</p>
						))}

						<hr />
						{motorcycles.map(moto => {
							const {
								motorcycle: { name, price, year, imgURL },
								quantity,
							} = moto;

							return (
								<ul key={nanoid()}>
									<li className="transaction-li">
										<p>Mototocicleta: {name}</p>

										<div className="moto-details">
											<img
												className="transaction-img"
												src={imgURL}
												alt="moto"
											/>
											<div>
												<p>
													valor: {toCurrency(price)}
												</p>
												<p>ano: {year}</p>
												<p>qtd. {quantity}x</p>
											</div>
										</div>
									</li>
								</ul>
							);
						})}

						<p>TOTAL: {toCurrency(total)}</p>
						<br />
					</>
				)}
			</>
		</DetailsModal>
	);
}
