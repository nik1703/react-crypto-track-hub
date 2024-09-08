import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { CryptoContext } from '../context/CryptoContext';

const CryptoDetails = () => {
	const { id } = useParams();
	const [coin, setCoin] = useState(null);
	const [chartData, setChartData] = useState([]);
	const { currency } = useContext(CryptoContext);

	useEffect(() => {
		const fetchCoin = async () => {
			const response = await axios.get(
				`https://api.coingecko.com/api/v3/coins/${id}`
			);
			setCoin(response.data);

			const chartResponse = await axios.get(
				`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=7`
			);
			setChartData(
				chartResponse.data.prices.map(price => ({
					time: price[0],
					value: price[1],
				}))
			);
		};

		if (id && currency) {
			fetchCoin();
		}
	}, [id, currency]);
	console.log(coin);

	console.log('id', id);
	console.log('currency', currency);

	if (!coin) return 'Loading...';

	const options = {
		chart: {
			type: 'line',
		},
		xaxis: {
			type: 'datetime',
		},
		yaxis: {
			labels: {
				formatter: function (value) {
					return value.toFixed(2);
				},
			},
		},
		title: {
			text: 'Price Chart (Last 7 days)',
		},
		// colors: ['#ffffff'],
		stroke: {
			width: 2,
		},
	};

	const series = [
		{
			name: 'Price',
			data: chartData.map(d => ({ x: d.time, y: d.value })),
		},
	];

	function formatValue(value) {
		const formattedValue = value.toFixed(2);
		const className = formattedValue.startsWith('-')
			? 'text-red-600 py-2 text-center flex items-center justify-center'
			: 'text-[#61e72c] py-2 text-center flex items-center justify-center';
		return <td className={className}>{formattedValue}%</td>;
	}

	function formatCurrency(value) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: value < 1 ? 7 : 2,
		}).format(value);
	}

	function formatDigits(value) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency,
			maximumFractionDigits: 0,
		}).format(value);
	}

	function formatStats(value) {
		return new Intl.NumberFormat('en-US', {
			style: 'decimal',
			maximumFractionDigits: 0,
		}).format(value);
	}

	const descriptionWithoutATags = coin.description.en.replace(
		/<a[^>]*>|<\/a>/g,
		''
	);

	return (
		<div className="flex flex-row justify-center mt-10 mx-20">
			<div className="w-1/3 p-8 m-4">
				<div className="flex justify-center items-center mb-8">
					<img
						src={coin.image.large}
						alt={coin.name}
						className="w-10 h-10 mr-4"
					/>
					<div className="flex justify-center items-center gap-4">
						<h1 className="text-3xl">{coin.name}</h1>
						<h2 className="text-lg text-gray-500">
							{coin.symbol.toUpperCase()}
						</h2>
						<h3 className="text-lg text-gray-500">
							#{coin.market_cap_rank}
						</h3>
					</div>
				</div>
				<p className="text-center text-xl my-10">
					Current Price:{' '}
					{formatCurrency(coin.market_data.current_price[currency])}
				</p>
				<div className="flex justify-center items-center">
					<div className="flex justify-center flex-col items-start gap-2">
						<p className="">
							Market Cap:{' '}
							{formatDigits(coin.market_data.market_cap[currency])}
						</p>
						<p>
							24 Hour Trading Vol:{' '}
							{formatDigits(coin.market_data.market_cap[currency])}
						</p>
						<p>
							Circulating Supply:{' '}
							{formatStats(coin.market_data.circulating_supply)}
						</p>
						<p>
							Total Supply: {formatStats(coin.market_data.total_supply)}
						</p>
						<p>Max Supply: {formatStats(coin.market_data.max_supply)}</p>
						<p>
							All Time High:{' '}
							{formatCurrency(coin.market_data.ath[currency])}
						</p>
						<p>
							All Time Low:{' '}
							{formatCurrency(coin.market_data.atl[currency])}
						</p>
					</div>
				</div>
				<p className="text-left my-8">
					Description: {descriptionWithoutATags}
				</p>
			</div>
			<div className="w-1/2 p-8 m-4">
				<Chart options={options} series={series} type="line" />
				<table className="w-full text-center">
					<thead className="text-base text-gray-100 border border-gray-700">
						<tr>
							<th className="py-2 border border-gray-700">1h</th>
							<th className="py-2 border border-gray-700">24h</th>
							<th className="py-2 border border-gray-700">7d</th>
							<th className="py-2 border border-gray-700">14d</th>
							<th className="py-2 border border-gray-700">30d</th>
							<th className="py-2 border border-gray-700">1y</th>
						</tr>
					</thead>
					<tbody className="border border-gray-700">
						<tr>
							<td className="border border-gray-700">
								{formatValue(
									coin.market_data
										.price_change_percentage_1h_in_currency[currency]
								)}
							</td>
							<td className="border border-gray-700">
								{formatValue(
									coin.market_data
										.price_change_percentage_24h_in_currency[currency]
								)}
							</td>
							<td className="border border-gray-700">
								{formatValue(
									coin.market_data
										.price_change_percentage_7d_in_currency[currency]
								)}
							</td>
							<td className="border border-gray-700">
								{formatValue(
									coin.market_data
										.price_change_percentage_14d_in_currency[currency]
								)}
							</td>
							<td className="border border-gray-700">
								{formatValue(
									coin.market_data
										.price_change_percentage_30d_in_currency[currency]
								)}
							</td>
							<td className="border border-gray-700">
								{formatValue(
									coin.market_data
										.price_change_percentage_1y_in_currency[currency]
								)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CryptoDetails;
