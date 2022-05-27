import { useContext } from 'react';
import CreateMotorcycle from '../../components/Motorcycles/CreateMotorcycle';
import MotorcyclesList from '../../components/Motorcycles/MotorcyclesList';
import { DataContext } from '../../contexts/DataContext';
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
