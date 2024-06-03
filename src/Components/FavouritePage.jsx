import { useContext } from "react";
import { FavoriteContext } from "./FavoriteContext";
import { Link } from "react-router-dom";

function FavouritePage() {
  const { favorites } = useContext(FavoriteContext);

  console.log(favorites);

  return (
    <div>
      <h1 className="text-white font-serif font-bold text-4xl text-center mt-11">
        Favorite Movies
      </h1>
      <div className="grid grid-cols-4 gap-6 p-4 m-4">
        {favorites.map((movie) => (
          <div
            className="rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 relative flex flex-col bg-slate-700 p-4 border border-white"
            key={movie.id}
          >
            <Link to={`/Movies/${movie.id}`} className="flex flex-col h-full">
              <img
                className="h-[20rem] w-full rounded-lg object-cover transition-transform duration-300 transform hover:scale-105"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
              <div className="flex flex-col justify-between flex-grow mt-4">
                <h3 className="text-white text-lg font-semibold">
                  {movie.title}
                </h3>
                <div className="mt-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
                    See Details
                  </button>
                </div>
              </div>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill={"pink"}
              stroke={"red"}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-heart absolute top-4 right-4"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavouritePage;
