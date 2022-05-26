import { Motorcycle } from '@prisma/client';
import { useState } from 'react';
import { FiEdit, FiTrash, FiX } from 'react-icons/fi';
import { toCurrency } from '../../lib/helpers';
import DetailsModal from '../shared/DetailsModal';
import MotorcycleForm from './MotorcycleForm';

interface IProps {
	motorcycle: Motorcycle;
	onClose: (e: any) => void;
	onDelete: (id: number) => void;
}
export default function MotorcycleDetails({
	motorcycle,
	onClose,
	onDelete,
}: IProps) {
	const { id, name, description, year, price, imgURL } = motorcycle;

	const [editingMode, setEditingMode] = useState(false);

	return (
		<DetailsModal onClose={onClose}>
			<button onClick={() => onDelete(id)} title="deletar motocicleta">
				<FiTrash />
			</button>

			{editingMode ? (
				<>
					<button onClick={() => setEditingMode(false)}>
						<FiX />
					</button>

					<MotorcycleForm motorcycle={motorcycle} />
				</>
			) : (
				<>
					<button onClick={() => setEditingMode(true)}>
						<FiEdit />
					</button>
					<h5>
						{name}
						<p>{year}</p>
					</h5>
					<p>{description}</p>

					<img src={imgURL} />
					<p>{toCurrency(price)}</p>
				</>
			)}
		</DetailsModal>
	);
}
