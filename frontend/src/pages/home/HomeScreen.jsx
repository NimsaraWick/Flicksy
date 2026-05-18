import { Link } from "react-router-dom";
import React from "react";
import { Info, Play, Moon, Sparkles, ShieldCheck } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";
import NavBar from "../../components/NavBar";
import { useContentStore } from "../../store/content";
import ContentSlider from "../../components/ContentSlider";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";

function HomeScreen() {
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();

  if (!trendingContent)
    return (
      <div className="h-screen bg-mirage-obsidian relative flex items-center justify-center overflow-hidden font-sans mirage-grain">
        <div className="absolute inset-0 mirage-gradient" />
        <NavBar />
        <div className="flex flex-col items-center gap-12">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 border border-mirage-gold/20 rounded-full flex items-center justify-center"
          >
            <Moon className="text-mirage-gold/40" size={32} />
          </motion.div>
          <p className="text-mirage-gold/40 tracking-[0.5em] font-light uppercase text-xs">
            MIRAGE_REFINING...
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-mirage-obsidian min-h-screen font-sans selection:bg-mirage-gold selection:text-black mirage-grain">
      <NavBar />

      {/* Hero: The Cinematic Gallery */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Slow Zoom & Noise */}
        <motion.div
          animate={{ scale: 1.15 }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "alternate", ease: "linear" }}
          className="absolute inset-0 z-0 grayscale contrast-125 brightness-[0.4]"
          style={{
            backgroundImage: `url(${ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-mirage-obsidian via-transparent to-mirage-obsidian/60 z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 mirage-gradient opacity-40 z-10" />

        {/* Letterbox Effect (Professional Touch) */}
        <div className="absolute top-0 left-0 w-full h-24 bg-black/40 backdrop-blur-md z-20 border-b border-white/5" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-20" />

        <div className="relative z-30 h-full flex flex-col justify-center px-10 md:px-20 lg:px-40 max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-6 mb-10">
              <Sparkles className="text-mirage-gold size-4" />
              <div className="h-[1px] w-12 bg-mirage-gold/30" />
              <p className="text-[10px] tracking-[0.6em] uppercase text-mirage-gold font-light">
                {contentType === "movie" ? "Featured_Cinema" : "Master_Series"}
              </p>
            </div>

            <h1 
              className="text-7xl md:text-9xl font-serif mb-12 text-white italic tracking-tighter leading-[0.9] drop-shadow-2xl"
            >
              {trendingContent?.title || trendingContent?.name}
            </h1>

            <div className="flex flex-wrap items-center gap-12 mb-16 text-mirage-gold/40 text-[10px] tracking-[0.4em] uppercase font-light">
              <div className="flex items-center gap-4">
                <ShieldCheck size={14} className="text-mirage-gold" />
                <span>RATING_{trendingContent?.adult ? "RESTRICTED" : "GENERAL"}</span>
              </div>
              <span>YEAR_{trendingContent?.release_date?.split("-")[0] || trendingContent?.first_air_date?.split("-")[0]}</span>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-mirage-gold animate-pulse" />
                <span>{Math.round(trendingContent?.vote_average * 10)}%_REFINED</span>
              </div>
            </div>

            <p className="text-xl text-mirage-silver/30 font-light max-w-2xl leading-relaxed mb-20 border-l border-mirage-gold/10 pl-10 italic">
              {trendingContent?.overview}
            </p>

            <div className="flex flex-wrap gap-10">
              <Link
                to={`/watch/${trendingContent?.id}`}
                className="bg-mirage-gold text-black font-bold px-16 py-6 rounded-full flex items-center hover:bg-white transition-all duration-700 gold-glow group uppercase tracking-[0.2em] text-xs"
              >
                <Play className="w-4 h-4 mr-4 fill-current" /> Begin_Screening
              </Link>

              <Link
                to={`/watch/${trendingContent?.id}`}
                className="mirage-glass text-mirage-gold font-light px-16 py-6 rounded-full border border-mirage-gold/10 flex items-center hover:bg-mirage-gold/10 transition-all duration-700 tracking-[0.3em] uppercase text-[10px]"
              >
                <Info className="w-4 h-4 mr-4" /> View_Archive
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative HUD Elements */}
        <div className="absolute bottom-10 right-10 z-30 opacity-20 hidden lg:block">
          <p className="text-[8px] tracking-[0.5em] text-mirage-gold text-right uppercase font-light">
            FRAME_SYNC: 24FPS <br />
            COLOR_PROFILE: NOIR_MIRAGE
          </p>
        </div>
      </div>

      {/* Transition Depth */}
      <div className="h-64 bg-gradient-to-b from-mirage-obsidian via-mirage-obsidian to-transparent -mt-32 relative z-40" />

      {/* Sliders Container: Professional Spacing */}
      <div className="relative z-40 px-6 md:px-12 pb-64 space-y-48 lg:space-y-72">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <ContentSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <ContentSlider key={category} category={category} />
            ))}
      </div>

      <Footer />
    </div>
  );
}

export default HomeScreen;

