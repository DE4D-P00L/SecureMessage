import React from "react";
import image from "../assets/404.png";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[calc(100vh-70px)] grid place-content-center">
      <div className="max-w-[600px] flex flex-col justify-center items-center text-white p-4">
        <div className="relative">
          <img src={image} alt="" className="object-cover drop-shadow-2xl" />
        </div>
        <h1 className="text-3xl font-bold md:text-5xl my-5">
          Hey there, space cadet!
        </h1>
        <p className="text-center text-sm md:text-xl">
          Looks like you've gotten a little lost. Let's help you find your way
          back on track.
        </p>
        <Link
          to="/"
          className="flex items-end gap-1  underline underline-offset-4 text-xl my-3">
          Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
