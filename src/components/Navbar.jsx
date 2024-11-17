import React from "react";
import MainLogo from "../assets/video-camera_686458.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      className="flex space-x-14  items-center pl-4 py-1 fixed w-full bg-indigo-500 
    backdrop-filter backdrop-blur-xl bg-opacity-10 border border-black z-50"
    >
      <img className="w-[45px]" src={MainLogo} alt="main-logo" />
      <Link to="/" className="text-white text-xl font-bold">
        Home
      </Link>
      <Link to="/Watch_List" className="text-white text-xl  font-bold">
        Watch list
      </Link>
    </div>
  );
}

export default Navbar;
