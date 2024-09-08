import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, NewsPage, FavoritesPage, NotFoundPage } from './pages/';
import CryptoDetails from './components/CryptoDetails';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFoundPage />,
		children: [
			{
				path: '/',
				element: <HomePage />
			},
			{
				path: '/news',
				element: <NewsPage />
			},
			{
				path: '/favorites',
				element: <FavoritesPage />
			},
			{
				path: '/coin/:id',
				element: <CryptoDetails />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);
