import React from "react";

const ModelOfImages = ({ openCloseModel, title, photos }) => {
  return (
    <div className="absolute pt-6 min-w-full min-h-screen inset-0 bg-white z-[60] mb-5 ">
      <div className="px-5 py-5 flex items-center fixed z-30 bg-white top-0 left-0 right-0 border-b border-gray-200 shadow-sm">
        <div className="lg:ml-20">
          <button
            onClick={openCloseModel}
            className="px-2 py-2 bg-gray-200 shadow-xl text-gray-900 rounded-full flex items-center gap-0 text-xs font-bold"
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-center mx-auto text-gray-800 text-xl font-semibold md:text-2xl">
          {title}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center pt-20 pb-8 max-w-[1200px] mx-auto px-6 md:px-12 lg:px-8 relative">
        {photos.map((photo) => (
          <img
            key={photo}
            className="mx-auto w-full"
            src={`${import.meta.env.VITE_SERVER_URL}${photo}`}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default ModelOfImages;
