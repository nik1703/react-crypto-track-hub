import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import logo from '/images/logo.png';
import { CryptoContext } from '../context/CryptoContext';
import Navbar from './Navbar/Navbar';

const Header = () => {
	const { currency, setCurrency } = useContext(CryptoContext);

	const currencyChange = () => e => {
		setCurrency(e.target.value);
	};

	const currenciesList = [
		{ id: '01', name: 'USD', value: 'usd' },
		{ id: '02', name: 'EUR', value: 'eur' },
		{ id: '03', name: 'JPY', value: 'jpy' },
		{ id: '04', name: 'GBP', value: 'gbp' },
		{ id: '05', name: 'AUD', value: 'aud' },
		{ id: '06', name: 'CAD', value: 'cad' },
		{ id: '07', name: 'CHF', value: 'chf' },
		{ id: '08', name: 'CNY', value: 'cny' },
		{ id: '09', name: 'SEK', value: 'sek' },
		{ id: '10', name: 'NZD', value: 'nzd' },
	];

	const cryptoCurrenciesList = [
		{ id: '01', name: 'BTC', value: 'btc' },
		{ id: '02', name: 'ETH', value: 'eth' },
		{ id: '03', name: 'BNB', value: 'bnb' },
		{ id: '04', name: 'LTC', value: 'ltc' },
	];

	return (
		<>
			<header className="m-4 sm:m-10 text-2xl">
				<nav className="flex flex-col lg:flex-row justify-between items-center gap-4">
					<div className="flex justify-center sm:justify-start mb-4 sm:mb-0 lg:order-1">
						<NavLink to="/">
							<img src={logo} alt="logo" className="h-20" />
						</NavLink>
					</div>
					<div className="flex justify-center sm:justify-end mb-4 sm:mb-0 lg:order-3">
						<select
							name="currency"
							id="currency"
							className="bg-[#0F111A] py-2 sm:py-4 px-2 sm:px-4 rounded-lg focus:outline-[#5EBC67] outline-none text-gray-300 text-sm sm:text-base w-24 sm:w-32 text-center cursor-pointer"
							value={currency}
							onChange={currencyChange()}
						>
							<option value="" disabled>
								- Fiat -
							</option>
							<option value="" disabled></option>
							{currenciesList.map(currency => {
								return (
									<option key={currency.id} value={currency.value}>
										{currency.name}
									</option>
								);
							})}
							<option value="" disabled></option>
							<option value="" disabled>
								- Crypto -
							</option>
							<option value="" disabled></option>
							{cryptoCurrenciesList.map(currency => {
								return (
									<option key={currency.id} value={currency.value}>
										{currency.name}
									</option>
								);
							})}
						</select>
					</div>
					<div className="flex justify-center lg:order-2">
						<Navbar />
					</div>
				</nav>
			</header>
		</>
	);
};

export default Header;
