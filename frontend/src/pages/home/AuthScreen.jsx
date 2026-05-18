import { ChevronRight, Moon, Sparkles, ShieldCheck, Play, ArrowDown } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };

  return (
    <div className="relative min-h-screen bg-mirage-obsidian overflow-hidden font-sans selection:bg-mirage-gold selection:text-black mirage-grain">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale brightness-[0.3] contrast-125 scale-105"
          style={{ backgroundImage: "url('/images/hero_3.webp')" }}
        />
        <div className="absolute inset-0 mirage-gradient opacity-80" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 p-8">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Moon className="text-mirage-gold" size={24} />
            <span className="text-2xl font-serif italic text-white tracking-[0.2em]">Flicksy</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to={"/login"}
              className="text-mirage-silver/60 text-[10px] tracking-[0.4em] uppercase hover:text-mirage-gold transition-colors duration-500 flex items-center gap-4"
            >
              Member_Login <ChevronRight size={14} className="text-mirage-gold" />
            </Link>
          </motion.div>
        </nav>
      </header>

      {/* Hero: The Statement */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <div className="flex items-center justify-center gap-4 mb-10 opacity-40">
            <div className="h-[1px] w-12 bg-mirage-gold" />
            <span className="text-[10px] tracking-[0.6em] uppercase text-mirage-gold font-light">The_Noir_Archive</span>
            <div className="h-[1px] w-12 bg-mirage-gold" />
          </div>

          <h1 className="text-7xl md:text-9xl font-serif mb-12 text-white italic tracking-tighter leading-none">
            Cinema_In_Its <br />
            <span className="text-mirage-gold not-italic">Purest_Form</span>
          </h1>

          <p className="text-xl md:text-2xl text-mirage-silver/40 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
            A curated sanctuary for the distinguished viewer. Transcend the noise and enter the mirage of infinite storytelling.
          </p>

          <form
            className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-2xl mx-auto"
            onSubmit={handleFormSubmit}
          >
            <div className="relative flex-1 w-full">
              <input
                type="email"
                required
                placeholder="YOUR_ACCESS_KEY (EMAIL)"
                className="w-full px-8 py-6 bg-white/5 border border-white/10 text-mirage-gold focus:border-mirage-gold/40 focus:outline-none transition-all duration-500 placeholder:text-white/10 rounded-full tracking-widest text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto bg-mirage-gold text-black font-bold px-12 py-6 hover:bg-white transition-all duration-500 flex items-center justify-center group rounded-full gold-glow uppercase tracking-[0.2em] text-xs"
            >
              Get_Started <Play className="ml-4 w-4 h-4 fill-current" />
            </button>
          </form>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center gap-4 opacity-20"
        >
          <span className="text-[8px] tracking-[0.5em] uppercase text-mirage-gold font-light">Explore_Void</span>
          <ArrowDown size={14} className="text-mirage-gold" />
        </motion.div>
      </main>

      {/* Feature Sections: Elegant & Unique */}
      <section className="relative z-10 bg-mirage-obsidian py-64">
        {/* Large Image Showcase */}
        <div className="max-w-7xl mx-auto px-10 mb-64">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-8">
                <Sparkles className="text-mirage-gold size-4" />
                <span className="text-mirage-gold/60 font-light tracking-[0.4em] text-[10px] uppercase">Curated_Selection</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-serif text-white italic mb-10 leading-tight">
                Beyond <br /> The_Standard
              </h2>
              <p className="text-xl text-mirage-silver/40 font-light leading-relaxed mb-12">
                We don't just host content; we refine it. Every title in the Mirage is hand-selected for the visionary spirit.
              </p>
              <div className="flex gap-12">
                <div>
                  <p className="text-3xl text-white font-serif italic mb-2">10K+</p>
                  <p className="text-[10px] tracking-widest uppercase text-mirage-gold/40">Masterpieces</p>
                </div>
                <div>
                  <p className="text-3xl text-white font-serif italic mb-2">4K</p>
                  <p className="text-[10px] tracking-widest uppercase text-mirage-gold/40">Native_Resolution</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden gold-border-gradient border">
                <img src="/images/hero_2.jpg" alt="Atmospheric" className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
                <div className="absolute inset-0 bg-gradient-to-r from-mirage-obsidian via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Offline Experience: Professional & Clean */}
        <div className="bg-white/5 py-48">
          <div className="max-w-5xl mx-auto px-10 text-center">
            <ShieldCheck className="text-mirage-gold mx-auto mb-10 opacity-40" size={48} />
            <h2 className="text-5xl md:text-6xl font-serif text-white italic mb-10">Total_Seclusion</h2>
            <p className="text-xl text-mirage-silver/40 font-light max-w-3xl mx-auto mb-20 leading-relaxed">
              Our encrypted offline protocol allows you to carry the essence of the mirage anywhere. No connections, no tracking, just pure cinema.
            </p>
            <div className="relative max-w-4xl mx-auto rounded-[3rem] overflow-hidden mirage-glass p-4 border border-white/5">
              <img src="/assets/extraction.jpg" alt="Premium" className="w-full grayscale brightness-[0.4] rounded-[2.5rem]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-mirage-obsidian/90 border border-mirage-gold/30 px-10 py-6 rounded-full backdrop-blur-xl">
                  <p className="text-mirage-gold text-xs tracking-[0.5em] font-light uppercase">OFFLINE_MODE_ACTIVE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Curator Call */}
      <section className="relative z-10 py-64 text-center border-t border-white/5">
        <div className="max-w-4xl mx-auto px-10">
          <Moon className="text-mirage-gold mx-auto mb-10 opacity-20" size={32} />
          <h2 className="text-6xl md:text-8xl font-serif text-white italic mb-16 tracking-tighter">Your_Seat_Is_Reserved</h2>
          <Link
            to="/signup"
            className="inline-block px-20 py-8 bg-mirage-gold text-black font-bold text-sm tracking-[0.4em] hover:bg-white transition-all duration-1000 rounded-full gold-glow"
          >
            JOIN_THE_ESTATE
          </Link>
          <p className="mt-12 text-[10px] text-mirage-silver/20 tracking-[0.4em] uppercase font-light">LIMITED_MEMBERSHIPS_AVAILABLE</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuthScreen;
