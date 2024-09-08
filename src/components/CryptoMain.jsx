import { useContext, useState, useMemo } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Chart from './Chart';
import { Pagination } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const CryptoMain = () => {
	const { favorites, addToFavorites, removeFavorite, cData, currency } =
		useContext(CryptoContext);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [loadedImages, setLoadedImages] = useState({});
	const navigate = useNavigate();
	const handleAddToFavorites = id => event => {
		event.stopPropagation();
		addToFavorites(id);
	};

	const handleRemoveFavorite = id => event => {
		event.stopPropagation();
		removeFavorite(id);
	};

	const handleSearch = event => {
		setSearchTerm(event.target.value);
	};

	const filteredData = useMemo(
		() =>
			cData.filter(
				coin =>
					coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
			),
		[cData, searchTerm]
	);

	return (
		<>
			<section className="mx-20">
				<input
					type="text"
					placeholder="Search"
					value={searchTerm}
					onChange={handleSearch}
					className="w-1/4 block mx-auto my-5 p-2 rounded-lg bg-gray-800 text-gray-100"
				/>
				{cData.length ? (
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
							{filteredData
								.slice(
									(currentPage - 1) * 25,
									(currentPage - 1) * 25 + 25
								)
								.map(coin => {
									const isFavorite = favorites.some(
										favorite => favorite == coin.id
									);
									return (
										<tr
											className="border-b border-gray-700 rounded-3xl hover:cursor-pointer hover:scale-105"
											key={coin.id}
											onClick={() => navigate(`/coin/${coin.id}`)}
										>
											<td className="py-6 flex justify-center items-center">
												{isFavorite ? (
													<FaStar
														className="size-6 hover:text-[#5EBC67] cursor-pointer text-[#5EBC67]"
														onClick={event =>
															handleRemoveFavorite(coin.id)(
																event
															)
														}
													/>
												) : (
													<FaRegStar
														onClick={event =>
															handleAddToFavorites(coin.id)(
																event
															)
														}
														className="size-6 hover:text-[#5EBC67] cursor-pointer"
													/>
												)}
											</td>
											<td className="py-6">
												{coin.market_cap_rank}
											</td>
											<td className="py-6 text-left pl-12 flex">
												<LazyLoadImage
													src={coin.image}
													alt={coin.id}
													effect="blur"
													className="h-6 w-6"
													onLoad={() =>
														setLoadedImages(prevState => ({
															...prevState,
															[coin.id]: true,
														}))
													}
												/>
												{!loadedImages[coin.id] && (
													<CircularProgress
														disableShrink
														size={20}
														sx={{
															color: '#5EBC67',
														}}
													/>
												)}{' '}
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
														? coin.price_change_percentage_1h_in_currency
																.toFixed(2)
																.startsWith('-')
															? 'text-red-600 py-6'
															: 'text-[#61e72c] py-6'
														: ''
												}
											>
												{coin.price_change_percentage_1h_in_currency
													? coin.price_change_percentage_1h_in_currency.toFixed(
															2
													  )
													: 'N/A'}
												%
											</td>
											<td
												className={
													coin.price_change_percentage_24h_in_currency
														? coin.price_change_percentage_24h_in_currency
																.toFixed(2)
																.startsWith('-')
															? 'text-red-600 py-6'
															: 'text-[#61e72c] py-6'
														: ''
												}
											>
												{coin.price_change_percentage_24h_in_currency
													? coin.price_change_percentage_24h_in_currency.toFixed(
															2
													  )
													: 'N/A'}
												%
											</td>
											<td
												className={
													coin.price_change_percentage_7d_in_currency
														? coin.price_change_percentage_7d_in_currency
																.toFixed(2)
																.startsWith('-')
															? 'text-red-600 py-6'
															: 'text-[#61e72c] py-6'
														: ''
												}
											>
												{coin.price_change_percentage_7d_in_currency
													? coin.price_change_percentage_7d_in_currency.toFixed(
															2
													  )
													: 'N/A'}
												%
											</td>
											<td
												className={
													coin.price_change_percentage_30d_in_currency
														? coin.price_change_percentage_30d_in_currency
																.toFixed(2)
																.startsWith('-')
															? 'text-red-600 py-6'
															: 'text-[#61e72c] py-6'
														: ''
												}
											>
												{coin.price_change_percentage_30d_in_currency
													? coin.price_change_percentage_30d_in_currency.toFixed(
															2
													  )
													: 'N/A'}
												%
											</td>
											<td className="py-3 pl-4">
												<Chart
													sparkline={coin.sparkline_in_7d}
													priceChange={
														coin.price_change_percentage_7d_in_currency
													}
												/>
											</td>
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
				) : (
					<div className="h-screen text-center text-3xl">Loading...</div>
				)}
				<div>
					<Pagination
						count={Math.ceil(filteredData.length / 25)}
						shape="rounded"
						sx={{
							'& .MuiPaginationItem-root': {
								color: '#fff',
							},
						}}
						className="flex justify-center my-5"
						onChange={(event, value) => {
							setCurrentPage(value);
							window.scrollTo(0, 0);
						}}
					/>
				</div>
			</section>
		</>
	);
};

export default CryptoMain;
