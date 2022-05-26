import { nanoid } from 'nanoid';
import { useState } from 'react';
import './nav.module.css';

const pages = [
	{ path: '/', name: 'Home' },
	{ path: '/clients', name: 'Clientes' },
	{ path: '/motorcycles', name: 'Motos' },
	{ path: '/transactions', name: 'Vendas' },
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
					<div key={nanoid()}>
						<span>{page.name}</span>
					</div>
					// <Link
					// 	key={nanoid()}
					// 	to={page.path}
					// 	className={active === i ? 'active' : ''}
					// >
					// 	<span>{page.name}</span>
					// </Link>
				))}
			</span>
		</div>
	);
};

export default Nav;
