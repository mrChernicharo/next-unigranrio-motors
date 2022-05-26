import React, { useContext } from 'react';
import { DataContext } from '../../lib/DataContext';
import ClientsList from './ClientsList';
import CreateClient from './CreateClient';

const Clients = () => {
	const { clients } = useContext(DataContext);

	return (
		<div className="page-container">
			<h1>Clientes</h1>

			<ClientsList clients={clients} />

			<CreateClient />
		</div>
	);
};

export default Clients;
