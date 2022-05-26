import * as React from 'react';
import Global from '../../../../hooks/Global';
import { Motorcycle } from '../../../../utils/interfaces';
import MotorcycleItem from './MotorcycleItem';
import './motorcycles-list.module.css';

interface MotorcyclesListProps {
	motorcycles: Motorcycle[];
}

const MotorcyclesList = ({ motorcycles }: MotorcyclesListProps) => {
	const { deleteMotorcycle } = Global;

	const handleDeletedMotorcycle = (id: string) => deleteMotorcycle(id);
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
