import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { CurrencyContext } from "./CurrencyContext";

export const FavoritesContext = createContext({});

export const FavoritesProvider = ({ children }) => {
	const [cData, setCData] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [dFavorites, setDFavorites] = useState([]);
	const { currency } = useContext(CurrencyContext);


	useEffect(() => {
		const favoriteCoins = JSON.parse(
			localStorage.getItem('favorite-coins') || '[]'
		);
		if (favoriteCoins) {
			setFavorites(favoriteCoins);
		}
	}, []);


	const saveToLocalStorage = (items) => {
		localStorage.setItem('favorite-coins', JSON.stringify(items));
	};

	const removeFavorite = (coin) => {
		const newFavoriteList = favorites.filter(
			favourite => favourite !== coin
		);
		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
	};

	const addToFavorites = (coin) => {
		const foundCoin = favorites.find(c => c === coin);
		if (!foundCoin) {
			const newFavorites = [...favorites, coin];
			setFavorites(newFavorites);
			saveToLocalStorage(newFavorites);
		// console.log(newFavorites);
		}
	};

	async function fetchData() {
		const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d&locale=en&precision=full&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`;
		try {
			const response = await axios.get(url);
			setCData(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if (currency) {
			fetchData();
		}
	} , [currency]);

	useEffect(() => {
		const filteredFavorites = cData.filter((coin) => {
			return favorites.includes(coin["id"]);
		}
		);
		setDFavorites(filteredFavorites);
		// console.log("dFavorites", dFavorites);
	} , [cData, favorites]);


	return (
		<FavoritesContext.Provider value={{cData, addToFavorites, removeFavorite, favorites, dFavorites}}>
			{children}
		</FavoritesContext.Provider>
		);
};