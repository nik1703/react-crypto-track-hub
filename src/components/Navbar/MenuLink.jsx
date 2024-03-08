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
				{/* <li className="bg-[#0F111A] p-4 px-14 rounded-lg">{children}</li> */}
				<li className={id === "03" ? "bg-[#0F111A] p-4 px-10 rounded-lg" : "bg-[#0F111A] p-4 px-14 rounded-lg"} >{children}</li>
			</NavLink>
		</>
	);
};

export default MenuLink;
