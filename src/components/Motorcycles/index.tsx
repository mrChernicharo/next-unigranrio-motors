import MotorcyclesList from './MotorcyclesList';
import CreateMotorcycle from './CreateMotorcycle';
import Global from '../../../hooks/Global';

const Motorcycles = () => {
	const { motorcycles } = Global;
	return (
		<div className="page-container">
			<h1>Motocicletas</h1>

			<MotorcyclesList motorcycles={motorcycles || []} />

			<CreateMotorcycle />
		</div>
	);
};

export default Motorcycles;
