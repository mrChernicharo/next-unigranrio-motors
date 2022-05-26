import * as React from 'react';
import Global from '../../../../hooks/Global';
import { IClient } from '../../../../utils/interfaces';
import ClientItem from './ClientItem';

interface IClientsListProps {
	clients: IClient[];
}

export default function ClientsList({ clients }: IClientsListProps) {
	const { deleteClient } = Global;

	const handleDeleteClient = (id: string) => deleteClient(id);

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
