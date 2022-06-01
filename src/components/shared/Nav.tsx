import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../contexts/DataContext';

const pages = [
	{ path: '/', name: 'Home' },
	{ path: '/Clients', name: 'Clientes' },
	{ path: '/Motorcycles', name: 'Motos' },
	{ path: '/Transactions', name: 'Vendas' },
];

const Nav = () => {
	const { currentPage, setCurrentPage } = useContext(DataContext);

	// const handleNavClick = e => {
	// 	const activePage = pages.find(
	// 		page => page.name === e.target.textContent
	// 	)?.name;
	// 	setCurrentPage(activePage || 'Home');
	// };

	useEffect(() => {
		console.log({ currentPage, pages });
	}, [currentPage]);

	return (
		<div className="nav-container">
			<span>Unigranrio Motors</span>

			<span>
				{pages.map((page, i) => {
					return (
						<Link key={nanoid()} href={page.path}>
							<span
								key={nanoid()}
								onClick={() => setCurrentPage(page.name)}
								className={`nav-link ${
									currentPage === page.name ? 'active' : ''
								}`}
							>
								{page.name}
							</span>
						</Link>
					);
				})}
			</span>
		</div>
	);
};

export default Nav;
