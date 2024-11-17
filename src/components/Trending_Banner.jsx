import React from "react";

export default function Trending_Banner() {
  return (
    <div
      className="h-[30vh] md:h-[95vh]  bg-cover bg-center relative "
      style={{
        backgroundImage:
          "url(https://theartsshelf.com/wp-content/uploads/2024/06/Venom-The-Last-Dance.png)",
      }}
    >
      <div className="text-white text-3xl justify-center flex items-center py-0 absolute bottom-0 left-0 w-full bg-black bg-opacity-50 px-4">
        Venom The Last Dance
      </div>
    </div>
  );
}
