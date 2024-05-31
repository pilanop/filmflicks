import { useContext } from 'react';
import { FavoriteContext } from './FavoriteContext';
import {Link} from "react-router-dom";

function FavouritePage() {
  const { favorites } = useContext(FavoriteContext);

  console.log(favorites);

  return (
    <div>
      <h1 className='text-white font-serif font-bold text-4xl text-center mt-11'>Favorite Movies</h1>
      <div className="grid grid-cols-4 gap-4 p-4 m-4">
        {favorites.map((movie) => (
          <div className="p-4 m-4 bg-white rounded-lg shadow-lg" key={movie.id}>
            <Link to={`/Movies/${movie.id}`}>
              <img
                className="h-[20rem] rounded-lg object-cover transition-transform duration-300 transform hover:scale-105 m-2"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
              <div className="p-2 m-2">
                <h3 className="font-serif font-bold text-2xl text-black">{movie.title}</h3>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 m-2">
                See Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavouritePage
