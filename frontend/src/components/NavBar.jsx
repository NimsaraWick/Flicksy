import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { setContentType } = useContentStore();

  return (
    <header className="bg-transparent max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to={"/"}>
          <img
            src="/images/flicksy_logo.png"
            alt="Flicksy Logo"
            className="w-32 md:w-52"
          />
        </Link>

        {/* Desktop Navbar Items */}
        <div className="hidden sm:flex gap-10 items-center text-xl text-white">
          <Link to={"/"} className="hover:text-gray-300 hover:underline">
            Home
          </Link>
          <Link
            to={"/"}
            className="hover:text-gray-300 hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="hover:text-gray-300 hover:underline"
            onClick={() => setContentType("tv")}
          >
            TV Series
          </Link>
          <Link to={"/history"} className="hover:text-gray-300 hover:underline">
            Search History
          </Link>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex gap-5 items-center text-2xl z-50">
        <Link to={"/search"}>
          <Search className="size-7 cursor-pointer text-white hover:text-gray-300" />
        </Link>
        {user ? (
          <>
            <img
              src={user?.image || "/images/profile.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <LogOut
              className="size-7 cursor-pointer text-white hover:text-gray-300"
              onClick={logout}
            />
          </>
        ) : (
          <Link
            to={"/login"}
            className="text-white bg-sky-600 py-2 px-4 rounded"
          >
            Sign In
          </Link>
        )}

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <Menu
            className="size-6 cursor-pointer text-white hover:text-gray-300"
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black rounded border border-gray-800">
          <Link
            to={"/"}
            className="block px-4 py-2 text-white hover:bg-gray-700"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to={"/"}
            className="block px-4 py-2 text-white hover:bg-gray-700"
            onClick={() => {
              setContentType("movie");
              toggleMobileMenu();
            }}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block px-4 py-2 text-white hover:bg-gray-700"
            onClick={() => {
              setContentType("tv");
              toggleMobileMenu();
            }}
          >
            TV Series
          </Link>
          <Link
            to={"/history"}
            className="block px-4 py-2 text-white hover:bg-gray-700"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
