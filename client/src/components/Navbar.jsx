import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import logoName from "../assets/logo-name.png";

const Navbar = ({ logoutHandler }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(UserContext);

  // console.log(user);
  const name = user?.name?.split(" ")[0];

  const menuOpenClose = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const logoutClickHandler = () => {
    logoutHandler();
    menuOpenClose();
  };

  return (
    <header className="h-[80px] py-4 px-3 md:px-12 lg:px-24 flex justify-between fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <Link to="/" className="flex items-center gap-1">
        <div className="h-[42px] md:h-[52px]">
          <img className="w-full h-full" src={logoName} alt="logo" />
        </div>
        {/* <span className="font-semibold text-2xl mt-2">WanderNest</span> */}
      </Link>

      {/* User side */}
      <div className="flex items-center gap-5 border border-gray-300 rounded-full px-4 py-1 relative">
        <button className="" onClick={menuOpenClose}>
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        {isMenuOpen && (
          <ul className="absolute top-[105%] bg-white shadow-md border-2 border-gray-100 -left-16 w-full rounded-xl overflow-hidden flex flex-col z-40">
            <li onClick={menuOpenClose}>
              <Link
                to={"/"}
                className="h-12 hover:bg-gray-100 w-full flex justify-center items-center cursor-pointer uppercase border-b text-[1rem]"
              >
                Home
              </Link>
            </li>
            {name && (
              <li onClick={menuOpenClose}>
                <Link
                  to={"/admin"}
                  className="h-12 hover:bg-gray-100 w-full flex justify-center items-center cursor-pointer uppercase border-b"
                >
                  Profile
                </Link>
              </li>
            )}
            {name && (
              <li onClick={logoutClickHandler}>
                <Link className="h-12 hover:bg-gray-100 w-full flex justify-center items-center cursor-pointer uppercase">
                  Log Out
                </Link>
              </li>
            )}
            {!name && (
              <li onClick={menuOpenClose}>
                <Link
                  to={"/register"}
                  className="h-12 hover:bg-gray-100 w-full flex justify-center items-center cursor-pointer uppercase"
                >
                  Register
                </Link>
                <Link
                  to={"/login"}
                  className="h-12 hover:bg-gray-100 w-full flex justify-center items-center cursor-pointer uppercase"
                >
                  Log In
                </Link>
              </li>
            )}
          </ul>
        )}
        <Link
          to={`${user ? "/admin" : "/login"}`}
          className="flex items-center gap-2"
        >
          {user && <h2>{name}</h2>}
          <div className="bg-gray-500 text-white rounded-full p-[0.20rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
