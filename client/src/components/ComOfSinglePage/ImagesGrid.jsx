import React from "react";

const ImagesGrid = ({ photos, openCloseModel }) => {
  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_1fr] grid-rows-[1fr_1fr] rounded-2xl overflow-hidden relative">
      <div className="row-span-full" onClick={openCloseModel}>
        {photos?.[0] && (
          <img
            className="h-full hover:opacity-[0.95] cursor-pointer"
            src={`${import.meta.env.VITE_SERVER_URL}${photos[0]}`}
            alt="place photo"
          />
        )}
      </div>
      <div className="row-span-1 hidden md:block" onClick={openCloseModel}>
        {photos?.[1] && (
          <img
            className="h-full hover:opacity-[0.95] cursor-pointer"
            src={`${import.meta.env.VITE_SERVER_URL}${photos[1]}`}
            alt="place photo"
          />
        )}
      </div>
      <div className="hidden md:block" onClick={openCloseModel}>
        {photos?.[2] && (
          <img
            className="h-full hover:opacity-[0.95] cursor-pointer"
            src={`${import.meta.env.VITE_SERVER_URL}${photos[2]}`}
            alt="place photo"
          />
        )}
      </div>
      <div className="hidden lg:block" onClick={openCloseModel}>
        {photos?.[3] && (
          <img
            className="h-full hover:opacity-[0.95] cursor-pointer"
            src={`${import.meta.env.VITE_SERVER_URL}${photos[3]}`}
            alt="place photo"
          />
        )}
      </div>
      <div className="hidden lg:block" onClick={openCloseModel}>
        {photos?.[4] && (
          <img
            className="h-full hover:opacity-[0.95] cursor-pointer"
            src={`${import.meta.env.VITE_SERVER_URL}${photos[4]}`}
            alt="place photo"
          />
        )}
      </div>
      <div className="absolute bottom-6 right-6">
        <button
          onClick={openCloseModel}
          className="bg-white px-3 py-1 rounded-2xl flex items-center gap-2 border border-black shadow-lg font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Show all photos
        </button>
      </div>
    </div>
  );
};

export default ImagesGrid;
