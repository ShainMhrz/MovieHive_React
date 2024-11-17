import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import PageInitiation from "./PageInitiation";

function Movies({
  handleAddToWatchList,
  handleRemoveFromWatchList,
  Watchlist,
}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo == 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&page=${pageNo}`
      )
      .then(function (res) {
        console.log(res.data.results);
        setMovies(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen ">
      <div className="px-4 md:px-6 bg-red-100 max-w-7xl w-full">
        <div className="trending text-3xl font-bold text-center m-[0.6em] ">
          Trending Movies
        </div>
        <div className="movie-cards flex flex-wrap justify-center xl:justify-start gap-4 ">
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                handleAddToWatchList={handleAddToWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                Watchlist={Watchlist}
              />
            );
          })}
        </div>
        <PageInitiation
          handlePrev={handlePrev}
          pageNo={pageNo}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
}

export default Movies;
