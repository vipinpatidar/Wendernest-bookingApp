import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const LoginPage = ({ setAutoLogout }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  const ctx = useContext(UserContext);

  const inputsChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const loginDataSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const resData = await response.json();
      // console.log(data);

      localStorage.setItem("token", resData.token);

      ctx.setUser(resData.user);

      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);

      if (resData.error) {
        setError(resData.error);
      } else {
        setError(false);
        navigate("/");
      }

      setLoginData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-32 w-full ">
      <h1 className="text-4xl text-center mb-8">Login</h1>
      {error && (
        <p className="px-3 py-1 text-center mx-auto mb-2 w-max rounded-sm bg-red-500 text-white">
          {error.message}
        </p>
      )}
      <form onSubmit={loginDataSubmitHandler} className="max-w-md mx-auto ">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="your@email.com"
          className="formInput"
          value={loginData.email}
          onChange={inputsChangeHandler}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Your password"
          className="formInput"
          value={loginData.password}
          onChange={inputsChangeHandler}
        />
        <button className="formBtn" type="submit">
          Login
        </button>
        <div
          className="my-6 text-center cursor-pointer"
          onClick={() => {
            setLoginData({
              email: "guestUser@gmail.com",
              password: "123456",
            });
          }}
        >
          <h2 className="text-blue-600 underline font-medium">
            Login As Guest User
          </h2>
        </div>
        <div className="flex item-center justify-center gap-3 px-4">
          <span className="text-gray-500 ">Don't have an account yet?</span>
          <Link className="text-purple-700 font-[600] " to={"/register"}>
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
