import React from "react";
import { useState } from "react";
import WatchList from "./Watch_List";

export default function MovieCard({
  movie,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  Watchlist,
}) {
  const [isHovered, setIsHovered] = useState(false);
  function doesContain(movie) {
    for (let i = 0; i < Watchlist.length; i++) {
      if (Watchlist[i].id == movie.id) {
        return true;
      }
    }
    return false;
  }
  return (
    <div
      className="h-[23em] w-[15.3em] bg-cover rounded-xl relative hover:scale-110 transition-transform duration-300 cursor-pointer md:h-[18em] md:w-[12em]"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay that appears on hover */}
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white p-4 rounded-xl">
          <h2 className="text-xl font-bold py-4 text-center">
            {movie.original_title}
          </h2>
          <p className="text-sm mb-4 text-center line-clamp-6">
            {movie.overview}
          </p>
          {doesContain(movie) ? (
            <button
              className="px-4 py-2 bg-gray-500/50 text-white rounded-lg mt-4 hover:bg-gray-700/50 transition-colors"
              onClick={() => handleRemoveFromWatchList(movie)}
            >
              Remove From Watchlist
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg mt-4 hover:bg-indigo-700 transition-colors"
              onClick={() => handleAddToWatchList(movie)}
            >
              Add to Watchlist
            </button>
          )}
        </div>
      )}
    </div>
  );
}
