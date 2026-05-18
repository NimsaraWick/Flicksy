import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search, X, Moon } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { setContentType, contentType } = useContentStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] p-6 md:p-10 font-sans">
      <nav className="max-w-7xl mx-auto mirage-glass px-12 py-5 flex items-center justify-between rounded-full border-t border-mirage-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-16">
          <Link to={"/"} className="flex items-center gap-3 group">
            <Moon className="text-mirage-gold group-hover:rotate-12 transition-transform duration-700" size={20} />
            <span className="text-2xl font-serif italic text-white tracking-[0.2em]">Flicksy</span>
          </Link>

          {/* Desktop Navbar Items: Curated Links */}
          <div className="hidden lg:flex gap-12 items-center text-[10px] font-light tracking-[0.5em] uppercase text-mirage-silver/40">
            <Link to={"/"} className="hover:text-mirage-gold transition-all duration-500">
              Overview
            </Link>
            <button
              onClick={() => setContentType("movie")}
              className={`${contentType === "movie" ? "text-mirage-gold" : "hover:text-mirage-gold"} transition-all duration-500 uppercase`}
            >
              Cinema
            </button>
            <button
              onClick={() => setContentType("tv")}
              className={`${contentType === "tv" ? "text-mirage-gold" : "hover:text-mirage-gold"} transition-all duration-500 uppercase`}
            >
              Series
            </button>
            <Link to={"/history"} className="hover:text-mirage-gold transition-all duration-500">
              The_Archive
            </Link>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex gap-8 md:gap-12 items-center">
          <Link to={"/search"} className="text-mirage-silver/40 hover:text-mirage-gold transition-colors duration-500">
            <Search size={18} strokeWidth={1.5} />
          </Link>
          
          {user ? (
            <div className="flex items-center gap-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-mirage-gold/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-1000" />
                <img
                  src={user?.image || "/images/profile.png"}
                  alt="avatar"
                  className="relative w-9 h-9 rounded-full border border-white/10 group-hover:border-mirage-gold transition-colors duration-700 object-cover"
                />
              </div>
              <button 
                onClick={logout}
                className="hidden md:flex text-mirage-silver/20 hover:text-mirage-gold transition-colors duration-500"
              >
                <LogOut size={16} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="px-8 py-2 border border-mirage-gold/20 text-mirage-gold text-[9px] font-light tracking-[0.4em] hover:bg-mirage-gold hover:text-black transition-all duration-700 uppercase rounded-full"
            >
              Access
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-mirage-gold" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu: Elegant Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="absolute top-32 right-10 left-10 mirage-glass border border-white/5 p-12 shadow-2xl z-[101] rounded-[2.5rem]"
          >
            <div className="flex flex-col gap-10 text-[10px] font-light tracking-[0.5em] uppercase text-center">
              <Link to={"/"} onClick={toggleMobileMenu} className="text-mirage-gold">Overview</Link>
              <button onClick={() => { setContentType("movie"); toggleMobileMenu(); }} className="text-mirage-silver/40 hover:text-mirage-gold uppercase">Cinema</button>
              <button onClick={() => { setContentType("tv"); toggleMobileMenu(); }} className="text-mirage-silver/40 hover:text-mirage-gold uppercase">Series</button>
              <Link to={"/history"} onClick={toggleMobileMenu} className="text-mirage-silver/40 hover:text-mirage-gold">The_Archive</Link>
              {user && (
                <button onClick={() => { logout(); toggleMobileMenu(); }} className="text-mirage-gold/20 border-t border-white/5 pt-10">
                  Exit_Session
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
