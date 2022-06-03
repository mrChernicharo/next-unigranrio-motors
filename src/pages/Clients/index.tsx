import React, { useContext } from 'react';
import ClientsList from '../../components/Clients/ClientsList';
import CreateClient from '../../components/Clients/CreateClient';
import { DataContext } from '../../contexts/DataContext';

const Clients = () => {
	const { isLoading, clients } = useContext(DataContext);

	return (
		<>
			<div className="page-container">
				<h1>Clientes</h1>

				<ClientsList clients={clients} />

				<CreateClient />

				{isLoading && <div>Loading...</div>}
			</div>
		</>
	);
};

export default Clients;
