import React, { useContext } from 'react';
import ClientsList from '../../components/Clients/ClientsList';
import CreateClient from '../../components/Clients/CreateClient';
import { DataContext } from '../../contexts/DataContext';

const Clients = () => {
	const { clients } = useContext(DataContext);
	console.log({ clients });

	return (
		<div className="page-container">
			<h1>Clientes</h1>

			<ClientsList clients={clients} />

			<CreateClient />
		</div>
	);
};

export default Clients;
