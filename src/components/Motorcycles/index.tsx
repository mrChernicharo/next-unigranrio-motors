import { useContext } from 'react';
import { DataContext } from '../../lib/DataContext';
import CreateMotorcycle from './CreateMotorcycle';
import MotorcyclesList from './MotorcyclesList';
// import Global from '../../../hooks/Global';

const Motorcycles = () => {
	const { motorcycles } = useContext(DataContext);
	return (
		<div className="page-container">
			<h1>Motocicletas</h1>

			<MotorcyclesList motorcycles={motorcycles || []} />

			<CreateMotorcycle />
		</div>
	);
};

export default Motorcycles;
