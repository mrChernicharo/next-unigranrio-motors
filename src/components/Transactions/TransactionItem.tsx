import { nanoid } from 'nanoid';
import { useState } from 'react';
import { CompleteTransaction, toCurrency, toDate } from '../../lib/helpers';
import TransactionDetails from './TransactionDetails';

interface IProps {
	transaction: CompleteTransaction;
	onDelete: (id: number) => void;
}

export default function TransactionItem({ transaction, onDelete }: IProps) {
	const { id, client, createdAt, total, motorcycles } = transaction;
	const { firstName = '', lastName = '' } = client;

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleDetailsModalOpen = (e: any) => {
		setIsModalOpen(true);
	};
	const handleDetailsModalClose = (e: any) => {
		e.stopPropagation();
		setIsModalOpen(false);
	};

	return (
		<>
			<div
				className="transaction-container app-card"
				onClick={handleDetailsModalOpen}
			>
				<p>Cliente: {`${firstName} ${lastName}`}</p>

				<p>Itens:</p>
				<ul className="transaction-itens-ul">
					{motorcycles.length > 0 &&
						motorcycles.map(moto => {
							const {
								quantity,
								name = '',
								imgURL = '',
								price = 0,
							} = moto;

							return (
								<li key={nanoid()}>
									<p>
										{name} {toCurrency(price)}
										{quantity > 1 && (
											<span>
												{
													/* prettier-ignore */
													`( x${quantity} ${toCurrency(price * quantity)} )`
												}
											</span>
										)}
									</p>
								</li>
							);
						})}
				</ul>
				<p>Total: {toCurrency(total)}</p>

				<hr />
				<p>Data Pedido: {toDate(createdAt)}</p>

				<p>Id Pedido: {id}</p>
			</div>

			{isModalOpen && (
				<TransactionDetails
					transaction={transaction}
					onClose={handleDetailsModalClose}
					onDelete={onDelete}
				/>
			)}
		</>
	);
}
