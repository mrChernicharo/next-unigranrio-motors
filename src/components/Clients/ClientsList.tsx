import { Client } from '@prisma/client';
import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import ClientItem from './ClientItem';

interface ClientsListProps {
	clients: Client[];
}

export default function ClientsList({ clients }: ClientsListProps) {
	const { deleteClient } = useContext(DataContext);

	const handleDeleteClient = (id: number) => {
		deleteClient(id);
	};

	return (
		<div className="clients-list list-container">
			{clients.map(client => (
				<ClientItem
					key={client.id}
					client={client}
					onDelete={handleDeleteClient}
				/>
			))}
		</div>
	);
}
