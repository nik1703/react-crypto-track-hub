import { NavLink } from 'react-router-dom';

const MenuLink = ({ children, path, id }) => {
	return (
		<>
			<NavLink
				to={path}
				className={({ isActive }) =>
					isActive
						? 'text-[#5EBC67] border-[#5EBC67] border-b-4 rounded-2xl'
						: 'text-gray-300'
				}
			>
				<li className={id === "03" ? "bg-[#0F111A] p-2 sm:p-4 px-2 sm:px-4 lg:px-6 xl:px-10 rounded-lg text-base" : "bg-[#0F111A] p-2 sm:p-4 px-6 sm:px-8 lg:px-10 xl:px-14 rounded-lg text-base"} >
					{children}
				</li>
			</NavLink>
		</>
	);
};

export default MenuLink;