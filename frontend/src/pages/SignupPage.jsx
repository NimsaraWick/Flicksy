import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authUser";
export const SignupPage = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");
  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(email, username, password);
    signup({ email, username, password });
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/images/flicksy_logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center -mt-5 mx-3">
        <div className="w-full  max-w-md p-8 space-y-6  bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-3xl font-bold mb-4">
            Sign Up
          </h1>
          <form className="spacey-y-4" onSubmit={handleSignUp}>
            <div>
              <label
                htmlFor="email"
                className="text-md font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt=1 border border-gray-700 rounded-md bg-transparent text-white
                            focus:outline-none  focus:ring"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="username"
                className="text-md font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="username"
                className="w-full px-3 py-2 mt=1 border border-gray-700 rounded-md bg-transparent text-white
                            focus:outline-none focus:ring"
                placeholder="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label
                htmlFor="email"
                className="text-md font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt=1 border border-gray-700 rounded-md bg-transparent text-white
                            focus:outline-none focus:ring"
                placeholder="*******"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className=" mt-5 w-full py-2 bg-blue-400 text-white font-semi-bold rounded-md hover:bg-blue-500"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a Member?{" "}
            <Link to={"/login"} className="text-blue-600 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
