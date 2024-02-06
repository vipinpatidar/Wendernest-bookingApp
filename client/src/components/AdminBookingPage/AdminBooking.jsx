import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllBookings() {
      try {
        const token = localStorage.getItem("token");
        const expiryDate = localStorage.getItem("expiryDate");

        if (!token || !expiryDate) {
          return navigate("/login");
        }

        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/bookings`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        setBookings(data?.bookings);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBookings();
  }, []);

  // console.log(bookings);

  if (isLoading) {
    return (
      <div className="mt-24 min-h-[380px] ">
        <h1 className="text-center text-2xl ">Loading...</h1>;
      </div>
    );
  }

  return (
    <div className="mt-12 pb-8 py-2 md:max-w-[750px] mx-auto">
      <h1 className="text-center text-2xl md:text-3xl mb-12 uppercase tracking-wide">
        List Of Your Bookings
      </h1>
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {bookings?.map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-50 max-w-[360px] md:max-w-full shadow-md rounded-xl text-white relative w-max mx-auto"
            >
              <div className="flex flex-row gap-2">
                <div className="w-[200px] md:w-[240px] hidden md:block order-1">
                  <img
                    className="w-full block h-full rounded-t-xl  rounded-tl-none rounded-r-xl "
                    src={`${import.meta.env.VITE_SERVER_URL}${
                      booking?.place.photos[0]
                    }`}
                    alt="place image"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-[1.20rem] leading-1 mb-2 text-black/80 font-semibold">
                    {booking?.place.title}
                  </h2>
                  <div className="flex items-center gap-6 md:gap-16">
                    <p className="mb-3 text-gray-600 text-base">
                      <span className="text-base text-black/70 font-semibold ">
                        CHECK IN:
                      </span>{" "}
                      {booking?.checkIn}
                    </p>
                    <p className="mb-3 text-gray-600 text-base">
                      <span className="text-base text-black/70 font-semibold ">
                        CHECK OUT:
                      </span>{" "}
                      {booking?.checkOut}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 md:gap-16">
                    <p className=" mb-3 text-gray-600 text-base">
                      <span className="text-base text-black/70 font-semibold uppercase">
                        Number of people:
                      </span>{" "}
                      {booking?.numberOfGuests}
                    </p>
                    <p className="mb-3 text-gray-600 text-base">
                      <span className="text-base text-black/70 font-semibold  uppercase">
                        Phone No. :
                      </span>{" "}
                      {booking?.phoneNo}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 md:gap-16 mb-3">
                    <p className=" text-base text-black/70 font-semibold uppercase">
                      Number of night:
                      <span className="text-[1.10rem] leading-5  text-gray-600 font-semibold">
                        {" "}
                        &nbsp;
                        {differenceInCalendarDays(
                          new Date(booking.checkOut),
                          new Date(booking.checkIn)
                        )}
                      </span>
                    </p>
                    <p className=" text-base text-black/70 font-semibold uppercase">
                      per night price:
                      <span className="text-[1.10rem] leading-5  text-gray-600 font-semibold">
                        {" "}
                        &nbsp;&#8377;{booking.place.price}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className=" text-[1rem] text-black/70 font-semibold uppercase">
                      Total Price :
                    </p>
                    <p className="text-[1.15rem] leading-5  text-gray-700 font-semibold">
                      &#8377;{+booking?.price}{" "}
                      <span className="text-sm text-gray-600">
                        (With &#8377;5,493.65 service charges)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl ">No Bookings Available yet !</div>
      )}
    </div>
  );
};

export default AdminBooking;
