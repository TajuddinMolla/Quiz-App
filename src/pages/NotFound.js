import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Oops! You seem to be lost.</h1>
        <Link to={"/"} className="block mt-8 text-xl underline">
          Back To Home Page
        </Link>
      </div>
    </div>
  );
}
