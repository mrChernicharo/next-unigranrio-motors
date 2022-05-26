import { Client } from '@prisma/client';
import * as React from 'react';
import ClientItem from './ClientItem';

interface ClientsListProps {
	clients: Client[];
}

export default function ClientsList({ clients }: ClientsListProps) {
	// const { deleteClient } = Global;

	const handleDeleteClient = (id: number) => {
		// deleteClient(id);
		console.log(`delete id ${id}`);
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
