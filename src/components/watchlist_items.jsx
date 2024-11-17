import React from "react";

export default function watchListItems(
  WatchListItemData,
  handleRemoveFromWatchList
) {
  return (
    <>
      <tr className="border-b-2 rounded-lg ">
        <td className="flex items-center px-4 py-2 ">
          <img
            className="h-[10rem]"
            src={`https://image.tmdb.org/t/p/w1280/6ykqYgWhRCrUXViq6jYS0HFtISU.jpg`}
            alt="movie-img"
          />
          <div className="flex flex-wrap items-start flex-col px-5">
            <div className="text-xl font-bold py-4">Venom The Last Dance</div>
            <p className="text-gray-500 text-left line-clamp-4">
              Eddie and Venom are on the run. Hunted by both of their worlds and
              with the net closing in, the duo are forced into a devastating
              decision that will bring the curtains down on Venom and Eddie's
              last dance.
            </p>
          </div>
        </td>
        <td>6.5</td>
        <td>7523.862</td>
        <td>Action</td>
        <td className="text-red-400 ">Delete</td>
      </tr>
    </>
  );
}
