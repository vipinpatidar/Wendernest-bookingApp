import React from "react";

const AdminSingleBookingPage = ({
  bookingData,
  place,
  openCloseModel,
  rating,
  numberOfBookingsDays,
  isOpen,
  onConformation,
}) => {
  return (
    <div
      className={`fixed overflow-y-scroll pt-6 min-w-full overflow-hidden h-full inset-0 bg-white z-[60] mb-5 ${
        isOpen ? "block" : "hidden"
      } md:px-12 px-4`}
    >
      <div className="px-6 py-5 flex items-center fixed z-30 bg-white top-0 left-0 right-0 border-b border-gray-200 shadow-sm">
        <div className="lg:ml-20">
          <button
            onClick={openCloseModel}
            className="px-2 py-2 bg-gray-300 shadow-xl text-gray-900 rounded-full flex items-center gap-0 text-xs font-bold"
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
          Confirm and pay
        </h1>
      </div>
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1.4fr] max-w-[1200px] mx-auto mt-24 gap-8">
        <div className="p-4 md:p-6 border-b border-gray-200 md:self-center">
          <h1 className="text-2xl text-gray-950 font-semibold mb-3">
            Your trip
          </h1>
          <div className="mb-4">
            <p className="text-[1.2rem] text-gray-900 font-semibold mb-2">
              Dates
            </p>
            <p className="flex items-center gap-2 text-gray-500 font-semibold">
              <span>{bookingData.checkIn}</span>
              To <span>{bookingData.checkOut}</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[1.2rem] text-gray-900 font-semibold ">Guests</p>
            <p className="flex items-center gap-2 text-gray-500 font-semibold">
              {bookingData.maxGuests} Guests
            </p>
          </div>
        </div>
        {/*  */}
        <div className="p-3 md:p-4 border border-gray-200 rounded-xl">
          <div className="flex gap-3 relative pb-4 border-b border-gray-200">
            <div className="shrink-0">
              <img
                className="w-[150px] h-[120px] rounded-xl block"
                src={`${import.meta.env.VITE_SERVER_URL}${place.photos[0]}`}
                alt="place image"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Entire home</p>
              <h2 className="text-base text-gray-900 tracking-tight leading-5">
                {place.title}
              </h2>
              <div className="flex items-center gap-1 text-sm absolute bottom-4 left-[160px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#444"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="block"> {rating}</span>
                <span className="text-gray-400  ml-1">
                  ({Math.round(rating * 50)} reviews)
                </span>
              </div>
            </div>
          </div>
          {/* ======== */}
          <div className="py-4">
            <h1 className="text-2xl text-gray-950 font-semibold mb-3">
              Price details
            </h1>
            <p className="flex items-center justify-between text-[1.1rem] mb-3">
              <span className="text-gray-600 underline font-[400]">
                &#8377;{place.price} x {numberOfBookingsDays} nights
              </span>
              <span>&#8377;{+place.price * +numberOfBookingsDays}</span>
            </p>
            <p className="flex items-center justify-between text-[1.1rem] mb-3">
              <span className="text-gray-600 underline font-[400]">
                Our service fee
              </span>
              <span>&#8377;5,493.65</span>
            </p>
          </div>
        </div>
      </div>
      {/* === */}

      <div className="flex flex-col gap-4 md:flex-row items-center justify-between lg:w-2/3 mx-auto p-5 px-6 rounded-xl bg-gray-200 my-10">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl text-gray-950 font-semibold">Total Price:</h2>
          <h2 className="text-xl text-gray-700 font-semibold">
            &#8377;{+place.price * +numberOfBookingsDays + 5493.65}
          </h2>
        </div>
        <div className="">
          <button type="button" onClick={onConformation} className="confirmBtn">
            Confirm And Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleBookingPage;
