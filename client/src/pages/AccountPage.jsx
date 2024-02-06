import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate, useParams } from "react-router-dom";
import Profile from "../components/AccountComp/Profile";
import AdminPlaces from "../components/AccountComp/AdminPlaces";
import AccountHeader from "../components/AccountComp/AccountHeader";
import AdminBooking from "../components/AdminBookingPage/AdminBooking";
import OpenOnTop from "../components/OpenOnTop/OpenOnTop";

const AccountPage = ({ logoutHandler }) => {
  const { user, isAuth } = useContext(UserContext);
  let { subPage } = useParams();

  if (subPage === undefined) {
    subPage = "profile";
  }

  if (isAuth && !user) {
    return <Navigate to={"/login"} />;
  }

  if (!user) {
    return <h1 className="text-center text-[1.6rem] mt-20">Loading...</h1>;
  }

  return (
    <div className="mt-32 mb-28">
      <OpenOnTop />
      <AccountHeader />
      <div>
        {subPage === "profile" && (
          <Profile user={user} logoutHandler={logoutHandler} />
        )}

        {subPage === "bookings" && <AdminBooking />}

        {subPage === "places" && <AdminPlaces />}
      </div>
    </div>
  );
};

export default AccountPage;
