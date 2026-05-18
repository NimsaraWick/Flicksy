import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authUser";
import { motion } from "framer-motion";
import { Moon } from "lucide-react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-mirage-obsidian overflow-hidden font-sans selection:bg-mirage-gold selection:text-black">
      <div className="absolute inset-0 mirage-gradient opacity-60" />
      
      <header className="relative z-10 max-w-7xl mx-auto p-12 flex justify-center md:justify-start">
        <Link to={"/"} className="flex items-center gap-3">
          <Moon className="text-mirage-gold" size={24} />
          <img src="/images/flicksy_logo.png" alt="logo" className="w-32 brightness-200 grayscale contrast-125" />
        </Link>
      </header>

      <main className="relative z-10 flex justify-center items-center px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-md mirage-glass p-12 rounded-3xl shadow-2xl border border-white/5"
        >
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-mirage-gold/40 font-light mb-4">
              Return to the Gallery
            </p>
            <h1 className="text-5xl md:text-6xl font-serif italic text-white tracking-tight">
              Welcome
            </h1>
          </div>

          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="relative">
              <label
                htmlFor="email"
                className="text-[9px] font-light tracking-[0.3em] uppercase text-mirage-gold block mb-3 px-2"
              >
                Identification
              </label>
              <input
                type="email"
                className="w-full px-6 py-4 rounded-xl bg-mirage-obsidian/50 border border-white/5 text-white focus:border-mirage-gold/40 focus:outline-none transition-all duration-500 placeholder:text-white/10"
                placeholder="MEMBERSHIP_EMAIL"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="text-[9px] font-light tracking-[0.3em] uppercase text-mirage-gold block mb-3 px-2"
              >
                Security Key
              </label>
              <input
                type="password"
                className="w-full px-6 py-4 rounded-xl bg-mirage-obsidian/50 border border-white/5 text-white focus:border-mirage-gold/40 focus:outline-none transition-all duration-500 placeholder:text-white/10"
                placeholder="********"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full py-5 bg-mirage-gold text-black font-bold rounded-xl hover:bg-white transition-all duration-500 gold-glow uppercase tracking-[0.3em] text-[10px]">
              Access
            </button>
          </form>

          <div className="text-center mt-12 text-white/20 text-[10px] tracking-widest uppercase font-light">
            New to the library?{" "}
            <Link to={"/signup"} className="text-mirage-gold hover:text-white transition-colors italic font-serif normal-case text-sm ml-2">
              Begin your refinement
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
