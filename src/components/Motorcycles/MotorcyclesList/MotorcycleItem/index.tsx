import { Motorcycle } from '@prisma/client';
import { useState } from 'react';
import { toCurrency } from '../../../../lib/helpers';
import MotorcycleDetails from '../../MotorcycleDetails';
import './motorcycle.module.css';

interface MotorcycleProps {
	motorcycle: Motorcycle;
	onDelete: (id: number) => void;
}
export default function MotorcycleItem({
	motorcycle,
	onDelete,
}: MotorcycleProps) {
	const { name, description, year, price, imgURL } = motorcycle;
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleDetailsModalOpen = (e: any) => {
		setIsModalOpen(true);
	};
	const handleDetailsModalClose = (e: any) => {
		e.stopPropagation();
		setIsModalOpen(false);
	};

	// useEffect(() => console.log(isModalOpen), [isModalOpen]);

	return (
		<>
			<div
				className="motorcycle-container app-card"
				onClick={handleDetailsModalOpen}
			>
				<h5>
					{name}
					<p>{year}</p>
				</h5>
				<p>{description}</p>

				<img src={imgURL} />
				<p>{toCurrency(price)}</p>
			</div>
			{isModalOpen && (
				<MotorcycleDetails
					motorcycle={motorcycle}
					onClose={handleDetailsModalClose}
					onDelete={onDelete}
				/>
			)}
		</>
	);
}
