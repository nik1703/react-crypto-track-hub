import MenuLink from './MenuLink';

const Navbar = () => {
	const links = [
		{ id: '01', path: '/', text: 'Home' },
		{ id: '02', path: '/news', text: 'News' },
		{ id: '03', path: '/favorites', text: 'Favorites' },
	];

	return (
		<>
			<ul className="flex flex-row items-center justify-center gap-4 sm:gap-10 px-4 sm:px-0">
				{links.map(link => {
					return (
						<MenuLink key={link.id} path={link.path} id={link.id} >
							{link.text}
						</MenuLink>
					);
				})}
			</ul>
		</>
	);
};

export default Navbar;