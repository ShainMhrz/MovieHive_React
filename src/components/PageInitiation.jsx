import React from "react";

export default function PageInitiation({ handlePrev, handleNext, pageNo }) {
  return (
    <div className="bg-white p-2 mt-6 flex justify-center">
      <div onClick={handlePrev} className="px-4 hover:cursor-pointer ">
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div className="font-bold">{pageNo}</div>
      <div onClick={handleNext} className="px-4 hover:cursor-pointer ">
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}
