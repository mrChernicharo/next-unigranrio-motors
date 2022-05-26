import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useState } from 'react';

const pages = [
	{ path: '/', name: 'Home' },
	{ path: '/Clients', name: 'Clientes' },
	{ path: '/Motorcycles', name: 'Motos' },
	{ path: '/Transactions', name: 'Vendas' },
];

const Nav = () => {
	const [active, setActive] = useState(0);

	// const { pathname } = useLocation();

	// useEffect(
	// 	() => setActive(pages.findIndex(page => page.path === pathname)),
	// 	[pathname]
	// );

	return (
		<div className="nav-container">
			<span>Unigranrio Motors</span>

			<span>
				{pages.map((page, i) => (
					<Link
						key={nanoid()}
						href={page.path}
						className={active === i ? 'active' : ''}
					>
						<span className="nav-link" key={nanoid()}>
							{page.name}
						</span>
					</Link>
				))}
			</span>
		</div>
	);
};

export default Nav;
