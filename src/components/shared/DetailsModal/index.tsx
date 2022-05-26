import { ReactNode } from 'react';
import { FiX } from 'react-icons/fi';

interface IProps {
	onClose: (e: any) => void;
	children: ReactNode;
}

const DetailsModal = ({ onClose, children }: IProps) => {
	return (
		<>
			<div className="app-modal">
				<header>
					<button onClick={onClose}>
						<FiX />
					</button>
				</header>

				<main>{children}</main>
			</div>

			<div className="app-modal-overlay" onClick={onClose}></div>
		</>
	);
};

export default DetailsModal;
