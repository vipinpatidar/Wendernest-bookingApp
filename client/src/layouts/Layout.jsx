import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function Layout({ logoutHandler }) {
  return (
    <div className="">
      <Navbar logoutHandler={logoutHandler} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
