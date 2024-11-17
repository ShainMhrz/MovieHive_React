import React, { useState } from "react";

export default function GenreSelector({
  genreList,
  currentGenre,
  handleFilter,
}) {
  const [showMore, setShowMore] = useState(false);

  // Split genres into visible and hidden
  const visibleGenres = genreList.slice(0, 7);
  const hiddenGenres = genreList.slice(7);

  return (
    <div className="genre_Selector flex flex-col items-center gap-2 m-4">
      {/* First row of genres */}
      <div className="flex flex-wrap justify-center gap-2">
        {visibleGenres.map((genre) => (
          <div
            key={genre}
            onClick={() => handleFilter(genre)}
            className={
              currentGenre === genre
                ? "flex justify-center h-[2.1em] w-[5.5em] scale-105 bg-blue-400 p-1 rounded-2xl font-semibold text-white hover:cursor-pointer"
                : "flex justify-center h-[2.1em] w-[5.5em] bg-gray-300/50 p-1 rounded-2xl font-semibold text-gray-600 hover:cursor-pointer"
            }
          >
            {genre}
          </div>
        ))}

        {/* "More" Button */}
        {hiddenGenres.length > 0 && !showMore && (
          <div
            onClick={() => setShowMore(true)}
            className="flex justify-center h-[2.1em] w-[5.5em] bg-gray-300/50 p-1 rounded-2xl font-semibold text-gray-800 hover:cursor-pointer"
          >
            More <i class="fa-solid fa-sort-down text-xl mx-2"></i>
          </div>
        )}
      </div>

      {/* Additional genres in a new row when "More" is clicked */}
      {showMore && (
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {hiddenGenres.map((genre) => (
            <div
              key={genre}
              onClick={() => handleFilter(genre)}
              className={
                currentGenre === genre
                  ? "flex justify-center h-[2.1em] w-[5.5em] scale-105 bg-blue-400 p-1 rounded-2xl font-semibold text-white hover:cursor-pointer"
                  : "flex justify-center h-[2.1em] w-[5.5em] bg-gray-300/50 p-1 rounded-2xl font-semibold text-gray-600 hover:cursor-pointer"
              }
            >
              {genre}
            </div>
          ))}

          {/* "Less" Button to hide the extra genres */}
          <div
            onClick={() => setShowMore(false)}
            className="flex justify-center h-[2.1em] w-[5.5em] bg-gray-300/50 p-1 rounded-2xl font-semibold text-gray-600 hover:cursor-pointer"
          >
            Less <i class="fa-solid fa-sort-up text-xl m-2"></i>
          </div>
        </div>
      )}
    </div>
  );
}
