import React, { useState, useEffect } from "react";
import genres from "../Utility/genre.js";
import GenreSelector from "./GenreSelector.jsx";

export default function WatchList({ handleRemoveFromWatchList, Watchlist }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("All");
  const [filteredWatchlist, setFilteredWatchlist] = useState(Watchlist);
  const [sortMenuOpen, setSortMenuOpen] = useState(false); // Track the visibility of the sorting menu
  const [sortOrder, setSortOrder] = useState(null); // Track the sorting order: null, ascending or descending

  let handleFilter = (genre) => {
    setCurrentGenre(genre);
  };

  // Update the search query based on user input
  function handleSearchQuery(e) {
    setSearchQuery(e.target.value); // Update state without triggering search
  }
  useEffect(() => {
    let temp = new Set();
    Watchlist.map((WatchListItems) => {
      WatchListItems.genre_ids.forEach((id) => {
        if (genres[id]) {
          temp.add(genres[id]);
        }
      });
    });
    setGenreList(["All", ...temp]);
    console.log(temp);
  }, [Watchlist]);

  // Filter movies based on the selected genre
  useEffect(() => {
    if (currentGenre === "All") {
      setFilteredWatchlist(Watchlist);
    } else {
      setFilteredWatchlist(
        Watchlist.filter((movie) =>
          movie.genre_ids.some((id) => genres[id] === currentGenre)
        )
      );
    }
  }, [currentGenre, Watchlist]);

  // Sort Watchlist based on selected sort order
  useEffect(() => {
    if (sortOrder && filteredWatchlist.length > 0) {
      const sortedList = [...filteredWatchlist];
      const { type, order } = sortOrder;

      sortedList.sort((a, b) => {
        if (type === "rating") {
          return order === "asc"
            ? a.vote_average - b.vote_average
            : b.vote_average - a.vote_average;
        } else if (type === "title") {
          return order === "asc"
            ? a.original_title.localeCompare(b.original_title)
            : b.original_title.localeCompare(a.original_title);
        }
        return 0;
      });

      setFilteredWatchlist(sortedList);
    }
  }, [sortOrder]);
  return (
    <div className="h-[100vh]">
      <div className="font-bold bg-red-200 h-40 text-center flex justify-center pt-20 text-5xl">
        Watch List
      </div>

      <div className="border-2 flex justify-center p-4">
        <input
          onChange={handleSearchQuery} // Just updates the input value
          type="text"
          name="movieInput"
          placeholder="Search for Movies"
          value={searchQuery} // Bind the input to the searchQuery state
          className="border-2 border-gray-300 rounded-xl bg-gray-200 outline-none p-1 px-2"
        />
      </div>

      <GenreSelector
        currentGenre={currentGenre}
        genreList={genreList}
        handleFilter={handleFilter}
      ></GenreSelector>
      {/* Sorting Section */}
      <div className="flex right-0 justify-center m-4 flex-row">
        <div className=" absolute right-[5em] flex-row ">
          <div
            className="flex  flex-row items-center cursor-pointer"
            onClick={() => setSortMenuOpen(!sortMenuOpen)}
          >
            <i className="fa-solid fa-filter mr-2"></i> Sort Options
          </div>
          {sortMenuOpen && (
            <div className="absolute bg-white border border-gray-200 mt-2 p-2 rounded-lg shadow-lg ">
              {/* Sort by Rating Ascending */}
              <div
                className="cursor-pointer p-2 hover:bg-gray-200 flex items-center"
                onClick={() => setSortOrder({ type: "rating", order: "asc" })}
              >
                Rating Ascending
                <i className="fa-solid fa-arrow-up-9-1 ml-2"></i>
              </div>

              {/* Sort by Rating Descending */}
              <div
                className="cursor-pointer p-2 hover:bg-gray-200 flex items-center"
                onClick={() => setSortOrder({ type: "rating", order: "desc" })}
              >
                Rating Descending
                <i className="fa-solid fa-arrow-down-9-1 ml-2"></i>
              </div>

              {/* Sort by Title Ascending */}
              <div
                className="cursor-pointer p-2 hover:bg-gray-200 flex items-center"
                onClick={() => setSortOrder({ type: "title", order: "asc" })}
              >
                Title Ascending
                <i className="fa-solid fa-arrow-up-z-a ml-2"></i>
              </div>

              {/* Sort by Title Descending */}
              <div
                className="cursor-pointer p-2 hover:bg-gray-200 flex items-center"
                onClick={() => setSortOrder({ type: "title", order: "desc" })}
              >
                Title Descending
                <i className="fa-solid fa-arrow-down-z-a  ml-2"></i>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border-2 border-gray-200 m-8">
        <table className="w-full text-center">
          <thead className="border-b-2 border-gray-400">
            <tr>
              <th className="w-3/5">Movie</th>
              <th>
                Ratings{" "}
                <i className="fa-solid fa-arrow-down-long">
                  <i className="fa-solid fa-arrow-up-long"></i>
                </i>
              </th>
              <th>Popularity</th>
              <th className="w-1/6">Genre</th>
            </tr>
          </thead>
          <tbody>
            {filteredWatchlist
              .filter((WatchListItemData) => {
                return WatchListItemData.original_title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              })
              .map((WatchListItemData) => {
                return (
                  <tr
                    key={WatchListItemData.id}
                    className="border-b-2 rounded-lg"
                  >
                    <td className="flex items-center px-4 py-2">
                      <img
                        className="h-[10rem]"
                        src={`https://image.tmdb.org/t/p/w1280${WatchListItemData.poster_path}`}
                        alt="movie-img"
                      />
                      <div className="flex flex-wrap items-start flex-col px-5">
                        <div className="text-xl font-bold py-4">
                          {WatchListItemData.original_title}
                        </div>
                        <p className="text-gray-500 text-left line-clamp-4">
                          {WatchListItemData.overview}
                        </p>
                      </div>
                    </td>
                    <td>{WatchListItemData.vote_average.toFixed(1)}</td>
                    <td>{WatchListItemData.popularity}</td>
                    <td>
                      {WatchListItemData.genre_ids
                        .map((id) => genres[id]) // Map each ID to the genre name
                        .filter(Boolean) // Filter out any undefined genres
                        .join(", ")}
                    </td>
                    <td
                      className="text-red-400 cursor-pointer"
                      onClick={() =>
                        handleRemoveFromWatchList(WatchListItemData)
                      }
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
