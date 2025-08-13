import React from "react";
import { useState, useRef, useEffect } from "react";

const SignIn = ({ setIsLogged, setshowSignIn, showSignIn }) => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    credentials: "",
    password: "",
  });
  const [errorMessage, seterrorMessage] = useState("");
  const cardRef = useRef(null);

  function handleSignUpChange(event) {
    seterrorMessage("");
    const { name, value } = event.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleLogInChange(event) {
    seterrorMessage("");
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      if (!response.ok) {
        console.error("Failed to sign up");
        return;
      }
      const data = await response.json();
      if (data.token) {
        const token = data.token;
        localStorage.setItem("token", token);
        setIsLogged(true);
        setshowSignIn(false);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      return;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error(
          "Failed to log in. Response not OK. Response: " + response
        );
      }
      const data = await response.json();
      if (!data.token) {
        throw new Error(
          "No token received // Data received: " + JSON.stringify(data)
        );
      }
      const token = data.token;
      localStorage.setItem("token", token);
      setIsLogged(true);
      setshowSignIn(false);
      console.log("Login successful, token stored:", token);
    } catch (e) {
      console.error("Error during login:", e);
      seterrorMessage("Username or Password incorrect");
    }
  };

  useEffect(() => {
    let firstClick = true;

    function handleClickOutside(event) {
      if (firstClick) {
        firstClick = false;
        return; // Ignore the initial click
      }
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        console.log("here");
        setshowSignIn(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="signin-container">
      <div
        ref={cardRef}
        className="flex items-center justify-center h-1/2 border-2 border-black bg-gray-500/70 p-6 rounded-lg shadow-lg"
      >
        <section className="mr-12 h-full">
          <form
            onSubmit={handleSignUp}
            action=""
            className="flex flex-col justify-between h-full"
          >
            <h2>Sign Up</h2>
            <div className="flex items-center gap-2 justify-between">
              <label className="">Username:</label>
              <input
                type="text"
                name="username"
                value={signupData.username}
                onChange={handleSignUpChange}
                required
              />
            </div>
            <div className="flex items-center gap-2 justify-between">
              <label className="">Email:</label>
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleSignUpChange}
                required
              />
            </div>
            <div className="flex items-center gap-2 justify-between">
              <label className="">Password:</label>
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleSignUpChange}
                required
              />
            </div>
            <div>
              <button className="border-black border-2 py-2 rounded-md w-full cursor-pointer hover:bg-blue-500/50 transition-colors duration-300">
                Sign Up
              </button>
            </div>
          </form>
        </section>
        <section className="bg-black w-[1px] h-full"></section>
        <section className="ml-12 h-full">
          <form action="" className="flex flex-col justify-between h-full">
            <h2>Log In</h2>
            <div className="flex items-center gap-2 justify-between">
              <label className="">Username or Email:</label>
              <input
                type="text"
                name="credentials"
                value={loginData.credentials}
                onChange={handleLogInChange}
                required
              />
            </div>
            <div className="flex items-center gap-2 justify-between">
              <label className="">Password:</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLogInChange}
                required
              />
            </div>
            <div>
              {errorMessage != "" ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : (
                <button
                  onClick={handleLogin}
                  className="border-black border-2 py-2 rounded-md w-full cursor-pointer hover:bg-green-500/50 transition-colors duration-300"
                >
                  Log In
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignIn;
