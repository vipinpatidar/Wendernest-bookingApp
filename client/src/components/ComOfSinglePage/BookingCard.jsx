import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

import { differenceInCalendarDays } from "date-fns";
import AdminSingleBookingPage from "../AdminBookingPage/AdminSingleBookingPage";

const BookingCard = ({ rating, place }) => {
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    maxGuests: "1",
    phoneNo: "",
    name: "",
    email: "",
  });

  const [isOwner, setIsOwner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      let doMatch = user._id === place?.owner?._id;
      setIsOwner(doMatch);
    }
  }, [place?.owner?._id]);

  let numberOfBookingsDays = 0;
  const isStartsBooking = bookingData.checkIn && bookingData.checkOut;

  if (isStartsBooking) {
    numberOfBookingsDays = differenceInCalendarDays(
      new Date(bookingData.checkOut),
      new Date(bookingData.checkIn)
    );
  }

  const onChangeInputs = (event) => {
    const { name, value } = event.target;
    setBookingData((pervState) => ({ ...pervState, [name]: value }));
  };

  const bookingSubmitHandler = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      return navigate("/login");
    }
    setIsOpen(true);
  };

  // console.log(isOwner);

  const openCloseModel = () => {
    setIsOpen((pervState) => !pervState);
  };

  const onConformation = async () => {
    try {
      const service = 5493.65;
      const token = localStorage.getItem("token");
      const expiryDate = localStorage.getItem("expiryDate");
      if (!token || !expiryDate) {
        return;
      }

      const bookerData = {
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        numberOfGuests: bookingData.maxGuests,
        name: bookingData.name,
        phoneNo: bookingData.phoneNo,
        email: bookingData.email,
        place: place._id,
        price: +place.price * +numberOfBookingsDays + service,
      };

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/booking`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookerData),
        }
      );

      const data = await response.json();

      // console.log(data);

      setIsOpen(false);
      navigate("/admin/bookings");

      setBookingData({
        checkIn: "",
        checkOut: "",
        maxGuests: "1",
        phoneNo: "",
        name: "",
        email: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isOpen) {
    return (
      <AdminSingleBookingPage
        bookingData={bookingData}
        place={place}
        openCloseModel={openCloseModel}
        rating={rating}
        numberOfBookingsDays={numberOfBookingsDays}
        isOpen={isOpen}
        onConformation={onConformation}
      />
    );
  }

  return (
    <div
      className={`border border-gray-200 rounded-xl mt-5 sticky top-24 right-2 self-start shadow-md w-full`}
    >
      <div className="md:p-5 p-3">
        <p className="text-black/90 font-semibold text-[1.45rem]">
          ₹{place.price}{" "}
          <span className="text-gray-600 font-normal text-[1.18rem]">
            night
          </span>
        </p>
        <div className="flex items-center gap-1">
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
          <span> {rating}</span>
          <span className="text-gray-400 ml-1">
            {Math.round(rating * 50)} reviews
          </span>
        </div>

        <div className="mt-4 w-full">
          <form onSubmit={bookingSubmitHandler}>
            <div className="border border-gray-800 rounded-xl mb-4 w-full">
              <div className="flex items-center ">
                <div className="md:p-3 p-2 border-r border-b border-gray-800 w-full flex flex-col ">
                  <label htmlFor="checkIn" className="text-[0.8rem]">
                    CHECK-IN
                  </label>
                  <input
                    className="text-base border-none outline-none md:w-[120px] lg:w-full"
                    type="date"
                    name="checkIn"
                    id="checkIn"
                    value={bookingData.checkIn}
                    onChange={onChangeInputs}
                    required
                  />
                </div>
                <div className="md:p-3 p-2 border-b border-gray-800  flex flex-col w-full">
                  <label htmlFor="checkOut" className="text-[0.8rem] ">
                    CHECK-OUT
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    id="checkOut"
                    className="text-base border-none outline-none md:w-[120px] lg:w-full"
                    value={bookingData.checkOut}
                    onChange={onChangeInputs}
                    required
                  />
                </div>
              </div>
              <div
                className={`p-3 flex w-full items-center justify-between  ${
                  isStartsBooking ? "border-b border-gray-800" : ""
                }`}
              >
                <label htmlFor="maxGuests" className="text-[0.8rem] ">
                  MAX GUESTS
                </label>
                <input
                  type="number"
                  name="maxGuests"
                  id="maxGuests"
                  className="text-base border-none outline-none w-[55%] md:w-[45%] px-1 py-1"
                  min={1}
                  max={place.maxGuests}
                  value={bookingData.maxGuests}
                  onChange={onChangeInputs}
                />
              </div>
              {isStartsBooking && (
                <>
                  <div className="p-3 flex w-full justify-between border-b border-gray-800 items-center md:justify-start md:gap-4">
                    <label
                      htmlFor="name"
                      className="text-[0.8rem] w-max uppercase"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name..."
                      className="text-base border-b outline-none w-[60%] md:w-full px-1 py-1 bg-white"
                      value={bookingData.name}
                      onChange={onChangeInputs}
                      required
                    />
                  </div>
                  <div className="p-3 flex items-center w-full justify-between border-b border-gray-800  md:justify-start md:gap-4 ">
                    <label
                      htmlFor="phoneNo"
                      className="text-[0.8rem] w-max uppercase"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phoneNo"
                      id="phoneNo"
                      placeholder="Your phone number..."
                      className="text-base md:w-full border-b outline-none w-[60%] px-1 py-1"
                      value={bookingData.phoneNo}
                      onChange={onChangeInputs}
                    />
                  </div>
                  <div className="p-3 flex items-center w-full justify-between md:justify-start md:gap-4 ">
                    <label
                      htmlFor="email"
                      className="text-[0.8rem] w-max uppercase"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email Address..."
                      className="text-base md:w-full border-b outline-none w-[60%] px-1 py-1"
                      value={bookingData.email}
                      onChange={onChangeInputs}
                    />
                  </div>
                </>
              )}
            </div>
            <button
              className="formBtn"
              disabled={numberOfBookingsDays < 0 || isOwner}
            >
              {isOwner
                ? "Place Is Added By You"
                : `Reserve
              ${
                numberOfBookingsDays > 0
                  ? ` for ${numberOfBookingsDays} days`
                  : ""
              }`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
