import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

const CryptoNews = () => {
	const [newsItems, setNewsItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const newsUrl = import.meta.env.VITE_NEWS_URL;
	const placeholderImage =
		'https://via.placeholder.com/600x400?text=Crypto+News';

	useEffect(() => {
		const fetchNews = async () => {
			const response = await fetch(newsUrl);
			const data = await response.json();
			setNewsItems(data.articles);
			setLoading(false);
		};
		fetchNews();
	}, []);

	if (loading) {
		return <div className="h-screen text-center text-3xl pt-10">Loading...</div>;
	}

	return (
		<div className="m-10">
			<h1 className="text-3xl font-bold mb-10 text-center">
				Latest Crypto News
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
				{newsItems
					.slice((currentPage - 1) * 24, (currentPage - 1) * 24 + 24)
					.map((newsItem, index) => (
						<div
							key={index}
							className="bg-transparent p-4 rounded-md shadow-md flex flex-col border border-neutral-100/5"
						>
							<img
								className="w-full h-40 object-cover rounded-md"
								src={
									newsItem.urlToImage
										? newsItem.urlToImage
										: placeholderImage
								}
								alt={newsItem.title}
							/>
							<h2 className="text-xl font-bold mt-4">
								{newsItem.title}
							</h2>
							<p className="text-gray-600 mt-2">
								{newsItem.description}
							</p>
							<a
								href={newsItem.url}
								target="_blank"
								rel="noreferrer"
								className="text-green-600 mt-2 block"
							>
								Read more
							</a>
							<p className="text-gray-600 mt-auto">
								{new Date(newsItem.publishedAt).toLocaleDateString()}
							</p>
						</div>
					))}
			</div>
			<div>
				<Pagination
					count={Math.ceil(newsItems.length / 24)}
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
		</div>
	);
};

export default CryptoNews;
