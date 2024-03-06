import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
	return (
		<>
			<Header />
			<main className="bg-[#0F111A]">
				<Outlet />
			</main>
		</>
	);
};

export default App;
