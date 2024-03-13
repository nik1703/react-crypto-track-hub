import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { CurrencyContext } from '../context/CurrencyContext';

const CryptoMain = () => {
	const { favorites, addToFavorites, removeFavorite, cData } =
		useContext(FavoritesContext);
	const { currency } = useContext(CurrencyContext);

	return (
		<>
			<section className="mx-20">
				{cData ? (
					<table className="w-full table-auto">
						<thead className="text-base text-gray-100 border-b border-gray-700">
							<tr>
								<th className="py-2"></th>
								<th className="py-2">Rank</th>
								<th className="py-2">Name</th>
								<th className="py-2">Price</th>
								<th className="py-2">1h</th>
								<th className="py-2">24h</th>
								<th className="py-2">7d</th>
								<th className="py-2">30d</th>
								<th className="py-2">7d Graph</th>
								<th className="py-2">Market Cap</th>
								<th className="py-2">24h Volume</th>
								<th className="py-2">Circulating Supply</th>
							</tr>
						</thead>
						<tbody className="text-center">
							{cData.map(coin => {
								return (
									<tr
										className="border-b border-gray-700 rounded-3xl"
										key={coin.id}
									>
										<td className="py-6 flex justify-center items-center">
											{favorites.some(
												favorite => favorite == coin.id
											) ? (
												<FaStar
													className="size-6 hover:text-[#5EBC67] cursor-pointer text-[#5EBC67]"
													onClick={() => removeFavorite(coin.id)}
												/>
											) : (
												<FaRegStar
													onClick={() => addToFavorites(coin.id)}
													className="size-6 hover:text-[#5EBC67] cursor-pointer"
												/>
											)}
										</td>
										<td className="py-6">{coin.market_cap_rank}</td>
										<td className="py-6 text-left pl-12 flex">
											<img
												src={coin.image}
												alt={coin.id}
												className="h-6 w-6"
											/>{' '}
											&nbsp;&nbsp;&nbsp;
											{coin.name} &nbsp;&nbsp;{' '}
											<span className="text-gray-500">
												{' '}
												{coin.symbol.toUpperCase()}{' '}
											</span>
										</td>
										<td className="py-6">
											{new Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: currency,
												minimumFractionDigits: 2,
												maximumFractionDigits:
													coin.current_price < 1 ? 7 : 2,
											}).format(coin.current_price)}
										</td>

										<td
											className={
												coin.price_change_percentage_1h_in_currency
													.toFixed(2)
													.startsWith('-')
													? 'text-red-600 py-6'
													: 'text-[#61e72c] py-6'
											}
										>
											{coin.price_change_percentage_1h_in_currency.toFixed(
												2
											)}
											%
										</td>
										<td
											className={
												coin.price_change_percentage_24h_in_currency
													.toFixed(2)
													.startsWith('-')
													? 'text-red-600 py-6'
													: 'text-[#61e72c] py-6'
											}
										>
											{coin.price_change_percentage_24h_in_currency.toFixed(
												2
											)}
											%
										</td>
										<td
											className={
												coin.price_change_percentage_7d_in_currency
													.toFixed(2)
													.startsWith('-')
													? 'text-red-600 py-6'
													: 'text-[#61e72c] py-6'
											}
										>
											{coin.price_change_percentage_7d_in_currency.toFixed(
												2
											)}
											%
										</td>
										<td
											className={
												coin.price_change_percentage_30d_in_currency
													.toFixed(2)
													.startsWith('-')
													? 'text-red-600 py-6'
													: 'text-[#61e72c] py-6'
											}
										>
											{coin.price_change_percentage_30d_in_currency.toFixed(
												2
											)}
											%
										</td>
										<td className="py-6">Graph</td>
										<td className="py-6">
											{new Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: currency,
												maximumFractionDigits: 0,
											}).format(coin.market_cap)}
										</td>
										<td className="py-6">
											{new Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: currency,
												maximumFractionDigits: 0,
											}).format(coin.total_volume)}
										</td>
										<td className="py-6">
											{new Intl.NumberFormat('en-US', {
												maximumFractionDigits: 0,
											}).format(coin.circulating_supply)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				) : undefined}
			</section>
		</>
	);
};

export default CryptoMain;
