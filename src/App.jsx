import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { CurrencyProvider } from './context/CurrencyContext';
import { CryptoProvider } from './context/CryptoContext';
import { FavoritesProvider } from './context/FavoritesContext';

const App = () => {
	return (
		<>
			<CurrencyProvider>
				<CryptoProvider>
					<FavoritesProvider>
						<Header />
						<main className="bg-[#0F111A]">
							<Outlet />
						</main>
					</FavoritesProvider>
				</CryptoProvider>
			</CurrencyProvider>
		</>
	);
};

export default App;
