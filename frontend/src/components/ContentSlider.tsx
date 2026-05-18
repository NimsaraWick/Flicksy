import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContentStore } from "../store/content";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight, Star, Moon } from "lucide-react";
import { motion } from "framer-motion";

const ContentSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollRef = useRef(null);
  const PLACEHOLDER_IMG = "/images/hero_3.png";

  const formattedCategoryName =
    category.replaceAll("_", " ").charAt(0).toUpperCase() +
    category.replaceAll("_", " ").slice(1);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `/api/v1/media/${contentType}/${category}?page=1`
      );

      if (res.data?.success && res.data?.details?.results) {
        setContent(res.data.details.results);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      console.error("Error fetching content:", err);
      setError(err.message);
      setContent([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, [contentType, category]);

  useEffect(() => {
    if (content.length > 0) {
      setTimeout(checkScrollPosition, 100);
    }
  }, [content]);

  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft + container.offsetWidth < container.scrollWidth - 5
    );
  };

  const scroll = (dir) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const item = container.querySelector("a");
    if (!item) return;

    const itemWidth = item.offsetWidth + 40;
    const itemsPerView = Math.floor(container.offsetWidth / itemWidth);
    const scrollAmount = itemWidth * itemsPerView;

    container.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(checkScrollPosition, 400);
  };

  return (
    <div className="relative px-6 md:px-20 py-16 group/slider">
      {/* Title: The Curated Collection */}
      <div className="mb-20 flex items-end justify-between border-b border-white/5 pb-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-6 opacity-40">
            <Moon className="text-mirage-gold size-3" />
            <div className="h-[1px] w-8 bg-mirage-gold" />
            <p className="text-[10px] tracking-[0.6em] uppercase text-mirage-gold font-light">
              COLLECTION_VOLUME
            </p>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter">
            {formattedCategoryName}
          </h2>
        </div>
        
        <div className="hidden md:flex flex-col items-end gap-3">
          <p className="text-[10px] text-mirage-gold/30 font-light tracking-[0.4em] uppercase">Archive_Refinement</p>
          <div className="w-64 bg-white/5 h-[1px] relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-mirage-gold h-full"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ width: "30%" }}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex space-x-12 overflow-hidden">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex-shrink-0 w-[400px] aspect-video bg-white/5 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-32 text-mirage-gold/20 font-serif italic text-2xl">
          <p>The archives of {formattedCategoryName} are currently restricted.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Professional Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-16 -right-16 z-20 flex justify-between pointer-events-none">
            <button
              onClick={() => scroll("left")}
              disabled={!showLeftArrow}
              className={`w-16 h-16 mirage-glass rounded-full pointer-events-auto flex items-center justify-center transition-all duration-700 border border-white/5 ${!showLeftArrow ? "opacity-0 scale-90" : "opacity-0 group-hover/slider:opacity-100 hover:border-mirage-gold hover:text-mirage-gold"}`}
            >
              <ChevronLeft size={24} strokeWidth={1} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!showRightArrow}
              className={`w-16 h-16 mirage-glass rounded-full pointer-events-auto flex items-center justify-center transition-all duration-700 border border-white/5 ${!showRightArrow ? "opacity-0 scale-90" : "opacity-0 group-hover/slider:opacity-100 hover:border-mirage-gold hover:text-mirage-gold"}`}
            >
              <ChevronRight size={24} strokeWidth={1} />
            </button>
          </div>

          {/* Slider: The Infinite Gallery */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide space-x-12 scroll-smooth pb-20 pt-4"
            onScroll={checkScrollPosition}
          >
            {content.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-shrink-0 w-[320px] md:w-[450px]"
              >
                <Link to={`/watch/${item.id}`} className="block relative group/card">
                  <div className="relative aspect-video rounded-3xl overflow-hidden gold-border-gradient border-[0.5px]">
                    <img
                      src={
                        item.backdrop_path
                          ? SMALL_IMG_BASE_URL + item.backdrop_path
                          : PLACEHOLDER_IMG
                      }
                      alt={item.title || item.name}
                      className="w-full h-full object-cover brightness-[0.4] grayscale contrast-125 transition-all duration-1000 group-hover/card:grayscale-0 group-hover/card:brightness-[0.8] group-hover/card:scale-110"
                      onError={(e) => {
                        e.target.src = PLACEHOLDER_IMG;
                      }}
                    />
                    
                    {/* Unique Card Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-mirage-obsidian via-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 flex flex-col justify-end p-10">
                      <div className="flex items-center gap-4 mb-4 opacity-60">
                        <div className="h-[1px] w-6 bg-mirage-gold" />
                        <span className="text-[8px] tracking-[0.5em] text-mirage-gold uppercase font-light">Archive_Select</span>
                      </div>
                      <h3 className="font-serif italic text-3xl text-white mb-6 leading-tight">
                        {item.title || item.name}
                      </h3>
                      <div className="flex items-center gap-8 text-[9px] tracking-[0.3em] uppercase text-mirage-gold/60 font-light">
                        <span className="flex items-center gap-2">
                          <Star size={10} className="fill-mirage-gold text-mirage-gold" />
                          {item.vote_average?.toFixed(1)}_REFINED
                        </span>
                        <span>{item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0]}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Outer Typography: The Professional Look */}
                  <div className="mt-10 px-4 flex justify-between items-center transition-all duration-700 group-hover/card:opacity-0 group-hover/card:-translate-y-6">
                    <h3 className="font-serif italic text-xl text-white/20 tracking-wide uppercase truncate max-w-[70%]">
                      {item.title || item.name}
                    </h3>
                    <div className="h-[1px] flex-1 mx-6 bg-white/5" />
                    <span className="text-[10px] text-white/10 tracking-widest uppercase">
                      {(item.release_date || item.first_air_date)?.split("-")[0]}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentSlider;
