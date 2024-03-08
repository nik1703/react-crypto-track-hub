import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { CurrencyContext } from "./CurrencyContext";
import { useContext } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
	const [cData, setCData] = useState([]);
	const { currency } = useContext(CurrencyContext);

	async function fetchData() {
		const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d&locale=en&precision=full&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`
		try {
			const response = await axios.get(url);
			setCData(response.data);
		}
		catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if (currency) {
			fetchData();
		}
	} , [currency]);
	

	return (
		<CryptoContext.Provider value={{cData}}>
			{children}
		</CryptoContext.Provider>
		);
};