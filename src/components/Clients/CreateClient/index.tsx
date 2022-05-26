import { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import CreateClientForm from '../ClientForm';

export default function CreateClient() {
	const [isFormShown, setIsFormShown] = useState(false);

	const handleCreateClientClick = (isFormShown: boolean) => (e: any) => {
		setIsFormShown(!isFormShown);
	};

	return (
		<div className={`new-form-container ${isFormShown ? 'open' : 'close'}`}>
			<button
				className={`new-form-button ${isFormShown ? 'close' : 'open'}`}
				onClick={handleCreateClientClick(isFormShown)}
				title="cadastrar novo cliente"
			>
				{isFormShown ? <FiX /> : <FiPlus />}
			</button>

			{isFormShown && (
				<CreateClientForm
					mode="create"
					onSubmitted={() => setIsFormShown(false)}
				/>
			)}
		</div>
	);
}
