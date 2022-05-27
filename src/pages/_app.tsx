import type { AppProps } from 'next/app';
import Nav from '../components/shared/Nav';
import { DataContextProvider } from '../lib/DataContext';
import '../styles/animations.css';
import '../styles/clients.css';
import '../styles/globals.css';
import '../styles/motos.css';
import '../styles/shared.css';
import '../styles/transactions.css';

function MyApp({ Component, pageProps }: AppProps) {
	console.log(pageProps);
	return (
		<DataContextProvider>
			<Nav />

			<Component {...pageProps} />
		</DataContextProvider>
	);
}

export default MyApp;
