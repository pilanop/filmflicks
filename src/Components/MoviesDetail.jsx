import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FavoriteContext } from "./FavoriteContext.jsx";

function MoviesDetail() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [logo, setLogo] = useState("");
  const [poster, setPoster] = useState("");
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [credits, setCredits] = useState([]);
  const { favorites, setFavorites } = useContext(FavoriteContext);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=999ef0ff18ab540432f4c3d06965d561`
    )
      .then((res) => res.json())
      .then((json) => setMovie(json))
      .catch((error) => console.error("Error fetching movie:", error));

    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/images?include_image_language=en&language=en&api_key=999ef0ff18ab540432f4c3d06965d561`
    )
      .then((res) => res.json())
      .then((json) => {
        setLogo(`https://image.tmdb.org/t/p/w500${json.logos[2].file_path}`);
        setPoster(
          `https://image.tmdb.org/t/p/w500${json.posters[0].file_path}`
        );
      })
      .catch((error) => console.error("Error fetching movie images:", error));

    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/images?include_image_language=null&language=null&api_key=999ef0ff18ab540432f4c3d06965d561`
    )
      .then((res) => res.json())
      .then((json) => {
        setBackgroundImage(
          `https://image.tmdb.org/t/p/w500${json.backdrops[0].file_path}`
        );
      })
      .catch((error) => console.error("Error fetching movie images:", error));

    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=999ef0ff18ab540432f4c3d06965d561`
    )
      .then((res) => res.json())
      .then((json) => setRecommendedMovies(json.results))
      .catch((error) =>
        console.error("Error fetching recommended movies:", error)
      );

    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=999ef0ff18ab540432f4c3d06965d561`
    )
      .then((res) => res.json())
      .then((json) => {
        setMovie(json);
        // Check if the movie is in the favorites list when the movie data changes
        const isFavorite = favorites.some(
          (favoriteMovie) => favoriteMovie.id === json.id
        );
        setIsClicked(isFavorite);
      })
      .catch((error) => console.error("Error fetching movie:", error));

    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=999ef0ff18ab540432f4c3d06965d561`
    )
      .then((res) => res.json())
      .then((json) => setCredits(json.cast))
      .catch((error) => console.error("Error fetching movie credits:", error));
  }, [params.id, favorites]);

  const addToFavorites = () => {
    const alreadyExists = favorites.some(
      (favoriteMovie) => favoriteMovie.id === movie.id
    );

    if (alreadyExists) {
      // If the movie is already in the favorites list, remove it
      const updatedFavorites = favorites.filter(
        (favoriteMovie) => favoriteMovie.id !== movie.id
      );
      setFavorites(updatedFavorites);
      setIsClicked(false);
    } else {
      // If the movie is not in the favorites list, add it
      setFavorites([...favorites, movie]);
      setIsClicked(true);
    }
  };

  return (
    <div>
      <div
        className="p-4 m-4 rounded-2xl"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {movie ? (
          <div className="p-4 m-4  bg-black rounded-lg shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50 flex">
            {!isImageLoaded && (
              <div className="animate-pulse h-[25rem] w-[20rem] bg-gray-300 rounded-lg m-2"></div>
            )}
            <img
              className={`rounded-lg h-[25rem] w-[20rem] object-cover transition-transform duration-300 transform hover:scale-105 m-2 ${
                isImageLoaded ? "" : "hidden"
              }`}
              src={poster}
              alt={movie.title}
              onLoad={() => setIsImageLoaded(true)}
              style={{ backdropFilter: "blur(10px)" }}
            />
            <div className="m-4 p-4">
              <div className="flex items-center" style={{ maxWidth: "200px" }}>
                <img
                  className="m-2"
                  src={logo}
                  alt={movie.title}
                  // style={{transform: 'scale(0.5)'}}
                />
              </div>
              <h2 className="font-mono font-thin text-sm text-white m-2">
                {movie.release_date}
              </h2>
              <h2 className="font-serif text-xl text-white m-2">
                {movie.overview}
              </h2>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={addToFavorites}
                  className=" font-serif font-bold h-[2.5rem] p-2 rounded-lg bg-gray-400 hover:bg-gray-500 active:bg-red-400 m-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill={isClicked ? "pink" : "none"}
                    stroke={isClicked ? "red" : "currentColor"}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-heart"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                  </svg>
                </button>
                <div
                  className="bg-gray-400 hover:bg-gray-500 active:bg-gray-500 m-2 h-[2.5rem] p-1 rounded-lg"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="gold"
                    className="icon icon-tabler icons-tabler-filled icon-tabler-star "
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
                  </svg>
                  <h2 className="font-serif text-xl text-black m-2">
                    {parseFloat(movie.vote_average).toFixed(1)}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h2 className="text-white m-2">Loading ... </h2>
        )}

        <div className="overflow-x-scroll whitespace-nowrap py-4 px-2">
          {credits.map((person) => (
            <div
              className="inline-block mx-2 bg-black bg-opacity-50 p-2 rounded-md shadow-lg backdrop-blur-sm"
              style={{ maxWidth: "110px" }}
              key={person.id}
            >
              <img
                className="h-24 w-24 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
              />
              <h3 className="text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
                {person.name}
              </h3>
              <p className="text-gray-400 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {person.character}
              </p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="font-serif font-bold text-2xl text-white m-4 p-4">
        Recommended Movies
      </h2>
      <div className="grid grid-cols-5 gap-6 p-4 m-4">
  {recommendedMovies.map((recommendedMovie) => {
    return (
      <div
        className="rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 relative flex flex-col bg-slate-800 p-4 border border-white"
        key={recommendedMovie.id}
      >
        <Link
          to={`/Movies/${recommendedMovie.id}`}
          className="flex flex-col h-full"
        >
          <img
            className="h-[15rem] w-full rounded-lg object-cover transition-transform duration-300 transform hover:scale-105"
            src={`https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}`}
            alt={recommendedMovie.title}
          />
          <div className="flex flex-col justify-between flex-grow mt-4">
            <h2 className="text-white text-lg font-semibold">
              {recommendedMovie.title}
            </h2>
            <div className="mt-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
                See Details
              </button>
              <span className="bg-yellow-500 bg-opacity-75 rounded px-2 py-1 text-sm ml-2">
                {recommendedMovie.vote_average}
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
  })}
</div>
    </div>
  );
}

export default MoviesDetail;
