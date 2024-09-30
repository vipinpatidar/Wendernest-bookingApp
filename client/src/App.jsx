import React, { useContext, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Layout from "./layouts/Layout";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";
import AuthSinglePage from "./components/SinglePageRequest/AuthSinglePage";
import UnAuthSinglePage from "./components/SinglePageRequest/UnAuthSinglePage";
import { UserContext } from "./context/userContext";

function App() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    setUser(null);
    navigate("/");
  };

  const setAutoLogout = (milliseconds) => {
    // console.log(milliseconds);
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setAutoLogout(remainingMilliseconds);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout logoutHandler={logoutHandler} />}>
        <Route path="/" index element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage setAutoLogout={setAutoLogout} />}
        />
        <Route path="/register" element={<SignupPage />} />
        <Route
          path="/admin/:subPage?"
          element={<AccountPage logoutHandler={logoutHandler} />}
        />
        <Route path="/admin/places/:placeId" element={<AuthSinglePage />} />
        <Route path="/home/places/:placeId" element={<UnAuthSinglePage />} />
      </Route>
    </Routes>
  );
}

export default App;

{
  /* <Route path="/admin/bookings/:bookedId" element={<AdminSingleBookingPage />} />; */
}
