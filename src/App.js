import { React, useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./Search.svg";
import MovieCart from "./MovieCart";

const API_URL = "http://www.omdbapi.com/?apikey=fd47f676";
const App = () => {
	const [movies, setMovies] = useState([]);

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();
		setMovies(data.Search);
	};

	const [searchTerm, SetSearchTerm] = useState("");

	useEffect(() => {
		searchMovies("batman");
	}, []);

	return (
		<div className="app">
			<h1>Movieland</h1>

			<div className="search">
				<input
					placeholder="Search for movies"
					value={searchTerm}
					onChange={(event) => SetSearchTerm(event.target.value)}
				/>
				<img
					src={SearchIcon}
					alt="search"
					onClick={() => searchMovies(searchTerm)}
				/>
			</div>

			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => (
						<MovieCart movie={movie} />
					))}
				</div>
			) : (
				<div className="empty">
					<h2>No Movies Found!</h2>
				</div>
			)}
		</div>
	);
};

export default App;
