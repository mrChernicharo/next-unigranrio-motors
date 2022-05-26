// import Global from '../../../../hooks/Global';
import { Motorcycle } from '@prisma/client';
import * as React from 'react';
import MotorcycleItem from './MotorcyclesItem';

interface MotorcyclesListProps {
	motorcycles: Motorcycle[];
}

const MotorcyclesList = ({ motorcycles }: MotorcyclesListProps) => {
	// const { deleteMotorcycle } = useContext(DataContext);

	const handleDeletedMotorcycle = (id: number) => {
		// deleteMotorcycle(id);
		console.log(`delete ${id}`);
	};
	return (
		<div className="motorcycles-list-container list-container">
			{motorcycles.map(motorcycle => (
				<MotorcycleItem
					key={motorcycle.id}
					motorcycle={motorcycle}
					onDelete={handleDeletedMotorcycle}
				/>
			))}
		</div>
	);
};

export default MotorcyclesList;
