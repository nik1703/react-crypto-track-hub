import { createContext, useState, useEffect } from "react";

export const CurrencyContext = createContext({});

export const CurrencyProvider = ({ children }) => {
	const [currency, setCurrency] = useState("");

	const changeCurrency = (e) => {
		setCurrency(e.target.value);
	}

	useEffect(() => {
		const currency = localStorage.getItem('currency');
		if (currency) {
			setCurrency(currency);
		} else {
			setCurrency('usd');
		}
	} , []);

	useEffect(() => {
		localStorage.setItem('currency', currency);
	}
	, [currency]);	

	return (
		<CurrencyContext.Provider value={{currency, setCurrency}}>
			{children}
		</CurrencyContext.Provider>
		);
};