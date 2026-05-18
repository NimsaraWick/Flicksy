import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import NavBar from "../components/NavBar";
import { ChevronLeft, ChevronRight, Star, Moon, Sparkles } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  const sliderRef = useRef(null);

  //  Trailers
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(
          `/api/v1/media/${contentType}/${id}/trailers`
        );
        setTrailers(res.data?.trailers || res.data?.results || []);
      } catch (error) {
        setTrailers([]);
      }
    };
    getTrailers();
  }, [contentType, id]);

  //  Similar content
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(
          `/api/v1/media/${contentType}/${id}/similar`
        );

        //  use details instead of similar or results
        setSimilarContent(res.data?.details || []);
      } catch (error) {
        console.error("Error fetching similar content:", error);
        setSimilarContent([]);
      }
    };

    getSimilarContent();
  }, [contentType, id]);

  // 📃 Content Details
  useEffect(() => {
    const getContentDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/v1/media/${contentType}/${id}/details`
        );
        setContent(res.data?.content || res.data?.details || {});
      } catch {
        setContent(null);
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  // slider arrows
  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-mirage-obsidian flex flex-col items-center justify-center font-sans mirage-grain">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex flex-col items-center gap-8"
        >
          <div className="w-16 h-16 border-t border-mirage-gold/30 rounded-full animate-spin" />
          <p className="text-[10px] tracking-[0.6em] uppercase text-mirage-gold/40 font-light">Refining_Vision</p>
        </motion.div>
      </div>
    );
  if (!content)
    return (
      <div className="bg-mirage-obsidian text-white h-screen selection:bg-mirage-gold selection:text-black">
        <NavBar />
        <div className="flex flex-col justify-center items-center h-full text-center px-8 gap-8">
          <Moon className="text-mirage-gold/20" size={64} />
          <h2 className="text-3xl sm:text-5xl font-serif italic text-white/40 tracking-widest uppercase">
            Void_Content_Not_Found
          </h2>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-mirage-obsidian text-white font-sans selection:bg-mirage-gold selection:text-black">
      <NavBar />

      {/* 🎥 Trailer Hero */}
      <div className="relative flex mt-28 bg-mirage-obsidian pb-20">
        <div className="absolute inset-0 mirage-gradient opacity-20" />
        {trailers.length > 0 ? (
          <div className="w-[92%] mx-auto relative z-10 rounded-3xl overflow-hidden border border-white/5 shadow-2xl gold-glow">
            <ReactPlayer
              controls
              width="100%"
              height="80vh"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          </div>
        ) : (
          <div className="h-[70vh] mx-auto flex flex-col items-center justify-center bg-white/5 w-[92%] rounded-3xl border border-white/5">
            <Sparkles className="text-mirage-gold/20 mb-6" size={48} />
            <p className="text-xl font-light tracking-widest text-mirage-gold/40 uppercase">
              NO_TRAILERS_AVAILABLE_FOR_
              <span className="text-mirage-gold font-bold">
                {content?.title || content?.name}
              </span>
            </p>
          </div>
        )}

        {trailers.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-10 pointer-events-none z-20">
            <button
              onClick={() => setCurrentTrailerIdx((i) => Math.max(0, i - 1))}
              className="w-12 h-12 bg-mirage-obsidian/80 border border-mirage-gold/20 text-mirage-gold rounded-full flex items-center justify-center hover:bg-mirage-gold hover:text-black transition-all duration-500 pointer-events-auto"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() =>
                setCurrentTrailerIdx((i) =>
                  Math.min(trailers.length - 1, i + 1)
                )
              }
              className="w-12 h-12 bg-mirage-obsidian/80 border border-mirage-gold/20 text-mirage-gold rounded-full flex items-center justify-center hover:bg-mirage-gold hover:text-black transition-all duration-500 pointer-events-auto"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {/* 📖 Content Details */}
      <div className="relative border-y border-white/5 py-24 overflow-hidden">
        <div className="absolute inset-0 mirage-gradient opacity-10" />
        <div className="max-w-7xl mx-auto px-10 flex flex-col lg:flex-row items-center lg:items-start gap-20 relative z-10">
          {content?.poster_path && (
            <div className="relative group">
              <div className="absolute inset-0 gold-glow opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
              <img
                src={ORIGINAL_IMG_BASE_URL + content.poster_path}
                alt={content.title || content.name}
                className="w-72 md:w-80 md:h-[28rem] h-96 rounded-2xl shadow-2xl object-cover grayscale brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100"
              />
            </div>
          )}

          <div className="flex-1 max-w-3xl text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tight mb-8">
              {content.title || content.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10 mb-10 text-mirage-gold/60 text-[10px] tracking-[0.4em] uppercase font-light">
              <p>
                {formatReleaseDate(content.release_date || content.first_air_date)}
              </p>
              <div className="flex items-center gap-2">
                <span className={content.adult ? "text-mirage-gold" : "text-white/40"}>
                  {content.adult ? "R_RESTRICTED" : "PG_GENERAL"}
                </span>
              </div>
            </div>

            <p className="text-xl text-mirage-silver/40 leading-relaxed font-light mb-12 border-l-0 lg:border-l border-mirage-gold/20 lg:pl-10">
              {content.overview || "The description for this archive remains veiled."}
            </p>

            {/* Extra Details */}
            <div className="flex gap-6 mt-12 flex-wrap justify-center lg:justify-start">
              {content.vote_average && (
                <div className="px-6 py-2 border border-mirage-gold/20 rounded-full text-[10px] tracking-widest uppercase text-mirage-gold/60">
                  <Star size={10} className="inline mr-2 fill-mirage-gold" /> {content.vote_average.toFixed(1)}_REFINEMENT
                </div>
              )}
              {content.popularity && (
                <div className="px-6 py-2 border border-white/10 rounded-full text-[10px] tracking-widest uppercase text-white/20">
                  POPULARITY_{Math.round(content.popularity)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🎬 Similar Content */}
      {similarContent.length > 0 && (
        <div className="py-24 bg-mirage-obsidian">
          <div className="px-10 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Sparkles className="text-mirage-gold size-4" />
              <h2 className="text-[10px] tracking-[0.5em] uppercase text-mirage-gold/60 font-light">
                SIMILAR_MIRAGES
              </h2>
            </div>

            {/* Carousel */}
            <div className="relative group/similar">
              <div
                ref={sliderRef}
                className="flex overflow-x-auto gap-10 pb-10 scrollbar-hide scroll-smooth"
              >
                {similarContent
                  .filter((item) => item.poster_path)
                  .map((item) => (
                    <Link
                      key={item.id}
                      to={`/watch/${item.id}`}
                      className="w-48 sm:w-56 md:w-64 flex-none relative group/item"
                    >
                      <div className="mirage-card rounded-2xl overflow-hidden relative">
                        <img
                          src={SMALL_IMG_BASE_URL + item.poster_path}
                          alt={item.title || item.name}
                          className="w-full h-80 object-cover grayscale brightness-50 transition-all duration-1000 group-hover/item:grayscale-0 group-hover/item:brightness-100 group-hover/item:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-mirage-obsidian via-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-1000 flex items-end p-6">
                           <h4 className="text-white font-serif italic text-lg truncate">
                              {item.title || item.name}
                            </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              {/* Scroll Buttons */}
              <button
                onClick={() => scroll("left")}
                className="absolute left-[-2rem] top-1/2 -translate-y-1/2 w-12 h-12 mirage-glass rounded-full flex items-center justify-center text-mirage-gold opacity-0 group-hover/similar:opacity-100 transition-all duration-700 hover:border-mirage-gold/40"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute right-[-2rem] top-1/2 -translate-y-1/2 w-12 h-12 mirage-glass rounded-full flex items-center justify-center text-mirage-gold opacity-0 group-hover/similar:opacity-100 transition-all duration-700 hover:border-mirage-gold/40"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchPage;
