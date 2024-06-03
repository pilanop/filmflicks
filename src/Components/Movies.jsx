import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movies({ searchTerm }) {
  const [Movies, setMovies] = useState([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const url = searchTerm
      ? `https://api.themoviedb.org/3/search/movie?api_key=999ef0ff18ab540432f4c3d06965d561&query=${searchTerm}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=999ef0ff18ab540432f4c3d06965d561`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => setMovies(json.results));
  }, [searchTerm]);

  return (
    <div className="grid grid-cols-4 gap-6 p-4 m-4">
      {Movies.map((movies, index) => (
        <div
          className="rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 relative flex flex-col bg-slate-700 p-4 border border-white"
          key={movies.id}
        >
          <Link to={`/Movies/${movies.id}`} className="flex flex-col h-full">
            <img
              className={`h-[20rem] w-full rounded-lg object-cover transition-transform duration-300 transform hover:scale-105 ${
                isImageLoaded ? "" : "border-2 border-gray-300"
              }`}
              key={index}
              src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
              onLoad={() => setIsImageLoaded(true)}
            />
            <div className="flex flex-col justify-between flex-grow mt-4">
              <h3 className="text-white text-lg font-semibold">
                {movies.title}
              </h3>
              <div className="mt-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
                  See Details
                </button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

Movies.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default Movies;
