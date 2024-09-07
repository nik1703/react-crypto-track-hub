import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { CryptoProvider } from './context/CryptoContext';

const App = () => {
	return (
		<>
			<CryptoProvider>
				<Header />
				<main className="bg-[#0F111A]">
					<Outlet />
				</main>
			</CryptoProvider>
		</>
	);
};

export default App;
