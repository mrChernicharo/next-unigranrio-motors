/* eslint-disable @next/next/no-img-element */
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { FiEdit, FiTrash, FiX } from 'react-icons/fi';
import { CompleteTransaction, toCurrency } from '../../lib/helpers';
import DetailsModal from '../shared/DetailsModal';
import TransactionForm from './TransactionForm';

interface IProps {
	transaction: CompleteTransaction;
	onClose: (e: any) => void;
	onDelete: (id: number) => void;
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

						<h6>ID Pedido: {id}</h6>

						<h5>
							{client.firstName} {client.lastName}
						</h5>

						{Object.entries(client)
							.filter(([k, v]) => k !== 'id')
							.map(([k, v]) => (
								<p key={nanoid()}>
									<span className="key">{k}</span>:{v}
								</p>
							))}

						<hr />
						{motorcycles.map(moto => {
							const { name, price, year, imgURL, quantity } =
								moto;

							return (
								<ul key={nanoid()}>
									<li className="transaction-li">
										<h5
											style={{
												padding: 2,
												marginBottom: 4,
												// background: 'var(--dark-bg)',
												// borderRadius: 6,
											}}
										>
											{name}
										</h5>

										<div className="moto-details">
											<img
												className="transaction-img"
												src={imgURL}
												alt="moto"
											/>
											<div>
												{/* prettier-ignore */}
												<p>
													valor:
													<span style={{ color: 'var(--accent)' }}>
														{toCurrency(price)}
													</span>
												</p>
												<p>ano: {year}</p>
												<p>qtd. {quantity}x</p>
											</div>
										</div>
									</li>
								</ul>
							);
						})}

						<h5>
							Total:
							<span style={{ color: 'var(--accent)' }}>
								{toCurrency(total)}
							</span>
						</h5>
						<br />
					</>
				)}
			</>
		</DetailsModal>
	);
}
