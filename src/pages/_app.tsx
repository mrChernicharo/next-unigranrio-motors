import type { AppProps } from 'next/app';
import Nav from '../components/shared/Nav';
import { DataContextProvider } from '../lib/DataContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<DataContextProvider>
			<Nav />

			<Component {...pageProps} />
		</DataContextProvider>
	);
}

export default MyApp;
