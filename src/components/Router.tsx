import { Route, Routes } from 'react-router-dom';
import Clients from './Clients';
import './global.scss';
import Home from './Home';
import Motorcycles from './Motorcycles';
import TransactionsPage from './Transactions';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/clients" element={<Clients />} />
			<Route path="/motorcycles" element={<Motorcycles />} />
			<Route path="/transactions" element={<TransactionsPage />} />
		</Routes>
	);
}

export default Router;
