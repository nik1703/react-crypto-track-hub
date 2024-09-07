import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
	const [currency, setCurrency] = useState('');
	const [cData, setCData] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [dFavorites, setDFavorites] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const changeCurrency = e => {
		setCurrency(e.target.value);
	};

	useEffect(() => {
		const favoriteCoins = JSON.parse(
			localStorage.getItem('favorite-coins') || '[]'
		);
		if (favoriteCoins) {
			setFavorites(favoriteCoins);
		}

		const currency = localStorage.getItem('currency');
		if (currency) {
			setCurrency(currency);
		} else {
			setCurrency('usd');
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('currency', currency);
	}, [currency]);

	useEffect(() => {
		const favoriteCoins = JSON.parse(
			localStorage.getItem('favorite-coins') || '[]'
		);
		if (favoriteCoins) {
			setFavorites(favoriteCoins);
		}
	}, []);

	const saveToLocalStorage = items => {
		localStorage.setItem('favorite-coins', JSON.stringify(items));
	};

	const removeFavorite = coin => {
		const newFavoriteList = favorites.filter(favourite => favourite !== coin);
		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
	};

	const addToFavorites = coin => {
		const foundCoin = favorites.find(c => c === coin);
		if (!foundCoin) {
			const newFavorites = [...favorites, coin];
			setFavorites(newFavorites);
			saveToLocalStorage(newFavorites);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			if (isFetching || !currency) return; // If we're already fetching, don't start a new fetch

			setIsFetching(true);
			const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d&locale=en&precision=full&x_cg_demo_api_key=${
				import.meta.env.VITE_API_KEY
			}`;
			const maxRetries = 3;
			let retries = 0;

			while (retries < maxRetries) {
				try {
					const response = await axios.get(url);
					setCData(response.data);
					break; // If the fetch is successful, break the loop
				} catch (error) {
					console.error(`Error on attempt ${retries + 1}:`, error);
					retries++;
					if (retries === maxRetries) {
						console.error(
							'Max retries reached. Please check your network connection.'
						);
					} else {
						await new Promise(resolve =>
							setTimeout(resolve, Math.pow(2, retries) * 1000)
						);
					}
				}
			}
			setIsFetching(false);
		};

		fetchData(); // Call it immediately

		const intervalId = setInterval(fetchData, 60000); // Then every 60 seconds

		return () => clearInterval(intervalId); // Cleanup on unmount
	}, [currency, isFetching]);

	useEffect(() => {
		const filteredFavorites = cData.filter(coin => {
			return favorites.includes(coin['id']);
		});
		setDFavorites(filteredFavorites);
	}, [cData, favorites]);

	return (
		<CryptoContext.Provider
			value={{
				cData,
				addToFavorites,
				removeFavorite,
				favorites,
				dFavorites,
				currency,
				setCurrency,
				changeCurrency,
			}}
		>
			{children}
		</CryptoContext.Provider>
	);
};
