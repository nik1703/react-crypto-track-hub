import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<>
			<div className="flex flex-col gap-8 justify-center items-center h-screen text-5xl">
				<h2>404 Not Found</h2>
				<Link to="/">Go to Home</Link>
			</div>
		</>
	);
};

export default NotFoundPage;
