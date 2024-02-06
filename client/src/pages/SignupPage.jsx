import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  const inputsChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignupData((prevState) => ({ ...prevState, [name]: value }));
  };

  const signupSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setError(false);
        console.log("not err");
        navigate("/login");
      }

      setSignupData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="my-36 w-full ">
      <h1 className="text-4xl text-center mb-8">Create An Account</h1>
      {error && (
        <p className="px-3 py-1 text-center mx-auto mb-2 w-max rounded-sm bg-red-500 text-white">
          {error.message}
        </p>
      )}
      <form onSubmit={signupSubmitHandler} className="max-w-md mx-auto ">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="John Doe"
          className="formInput"
          value={signupData.name}
          onChange={inputsChangeHandler}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="your@email.com"
          className="formInput"
          value={signupData.email}
          onChange={inputsChangeHandler}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Your password"
          className="formInput"
          value={signupData.password}
          onChange={inputsChangeHandler}
        />
        <button className="formBtn" type="submit">
          Register
        </button>
        <div className="flex item-center justify-center gap-3 px-4 mt-2">
          <span className="text-gray-600">Already have an account?</span>
          <Link className="text-blue-600 font-[600] " to={"/login"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
