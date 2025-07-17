import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationError from "../../assets/Animations/Animation - Error.json";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#D0E7F9] dark:bg-[#0F172A] text-[#0F172A] dark:text-[#D0E7F9]  px-4 text-center">
      <div className="max-w-md w-full">
        <Lottie
          animationData={animationError}
          loop={true}
          className="w-full h-80 mx-auto"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-[#223A5E] dark:text-[#D0E7F9] mt-4">
          Oops! Page Not Found
        </h1>
        <p className=" mt-2 mb-6 text-base md:text-lg">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/">
          {/* <button className="bg-[#0F172A] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-101 hover:bg-gradient-to-b hover:from-[#223A5E] hover:to-[#38BDF8] hover:shadow-lg transition-all duration-300">
            Back to Home
          </button> */}
          <button
            className="bg-[#0F172A] text-center w-48 rounded-2xl h-11 relative text-[#D0E7F9] text-xl font-semibold group"
            type="button"
          >
            <div className="bg-[#38BDF8] rounded-xl h-9 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                height="25px"
                width="25px"
              >
                <path
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                  fill="#000000"
                />
                <path
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                  fill="#000000"
                />
              </svg>
            </div>
            <p className="translate-x-5 text-base">Back to Home</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
