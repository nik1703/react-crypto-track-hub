import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import logo from '/images/logo.png';
import { CurrencyContext } from '../context/CurrencyContext';
import Navbar from './Navbar/Navbar';

const Header = () => {
	const { currency, setCurrency } = useContext(CurrencyContext);

	const currencyChange = () => (e) => {
		setCurrency(e.target.value);
	}

	return (
		<>
			<header className="m-10 text-2xl">
				<nav className="grid grid-cols-3 grid-">
					<h1>
						<NavLink to="/">
							<img src={logo} alt="logo" className="h-20" />
						</NavLink>
					</h1>
					<ul className="flex items-center justify-center gap-10 px-4">
						<Navbar />
						{/* <NavLink to="/" className={({ isActive }) => isActive ? "text-[#5EBC67] border-[#5EBC67] border-b-4 rounded-2xl" : "text-gray-300"}>
					<li className='bg-[#0F111A] p-4 px-14 rounded-lg'>
						Home
					</li>
					</NavLink>
					<NavLink to="/news" className={({ isActive }) => isActive ? "text-[#5EBC67] border-[#5EBC67] border-b-4 rounded-2xl" : "text-gray-300"}>
					<li className='bg-[#0F111A] p-4 px-14 rounded-lg'>
						News
					</li>
					</NavLink>
					<NavLink to="/favorites" className={({ isActive }) => isActive ? "text-[#5EBC67] border-[#5EBC67] border-b-4 rounded-2xl" : "text-gray-300"}>
					<li className='bg-[#0F111A] p-4 px-10 rounded-lg'>
						Favorites
					</li>
					</NavLink> */}
					</ul>
					<ul className="flex items-center justify-end">
						<li>
							{/* evtl darkmode und change currency? */}
							<select
								name="currency"
								id="currency"
								className="bg-[#0F111A] py-4 px-2 rounded-lg focus:outline-[#5EBC67] outline-none text-gray-300 w-24 text-center cursor-pointer"
								value={currency}
								onChange={currencyChange()}
							>
								<option value="" disabled>
									- Fiat -
								</option>
								<option value="" disabled></option>
								<option value="usd">USD</option>
								<option value="eur">EUR</option>
								<option value="gbp">GBP</option>
								<option value="" disabled></option>
								<option value="" disabled>
									- Crypto -
								</option>
								<option value="" disabled></option>
								<option value="btc">BTC</option>
								<option value="eth">ETH</option>
							</select>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Header;
