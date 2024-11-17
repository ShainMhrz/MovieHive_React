import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import WatchList from "./components/Watch_List.jsx";
import Movies from "./components/Movies_main.jsx";
import Trending_Banner from "./components/Trending_Banner.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import watchListItems from "./components/watchlist_items.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [Watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    let storedItem = localStorage.getItem("WatchListDAT");
    if (!storedItem) {
      return;
    }
    setWatchlist(JSON.parse(storedItem));
  }, []);
  let handleAddToWatchList = (movie) => {
    setWatchlist((prevWatchlist) => {
      const newWatchList = [...prevWatchlist, movie];
      console.log(newWatchList);
      localStorage.setItem("WatchListDAT", JSON.stringify(newWatchList));
      return newWatchList;
    });
  };
  let handleRemoveFromWatchList = (movie) => {
    setWatchlist(() => {
      let filterWatchList = Watchlist.filter((movieObj) => {
        return movieObj.id != movie.id;
      });
      localStorage.setItem("WatchListDAT", JSON.stringify(filterWatchList));
      return filterWatchList;
    });
  };
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Trending_Banner />
                <Movies
                  handleAddToWatchList={handleAddToWatchList}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                  Watchlist={Watchlist}
                />
              </>
            }
          />
          <Route
            path="/Watch_List"
            element={
              <WatchList
                Watchlist={Watchlist}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
