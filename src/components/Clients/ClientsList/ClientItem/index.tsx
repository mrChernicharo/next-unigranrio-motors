import { useState } from 'react';
import { IClient } from '../../../../../utils/interfaces';
import ClientDetails from '../../ClientDetails';

interface IClientItemProps {
	client: IClient;
	onDelete: (id: string) => void;
}

export default function ClientItem({ client, onDelete }: IClientItemProps) {
	const { firstName, lastName, email } = client;

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
				className="client-container app-card"
				onClick={handleDetailsModalOpen}
			>
				<h5>
					{firstName} {lastName}
				</h5>
				<p>{email}</p>
			</div>
			{isModalOpen && (
				<ClientDetails
					client={client}
					onClose={handleDetailsModalClose}
					onDelete={onDelete}
				/>
			)}
		</>
	);
}
