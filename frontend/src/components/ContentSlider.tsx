import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContentStore } from "../store/content";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

    const itemWidth = item.offsetWidth + 16;
    const itemsPerView = Math.floor(container.offsetWidth / itemWidth);
    const scrollAmount = itemWidth * itemsPerView;

    container.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(checkScrollPosition, 400);
  };

  return (
    <div
      className="text-white relative px-2 md:px-20 mt-0 py-5"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
      }}
    >
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          {formattedCategoryName}{" "}
          {contentType === "movie" ? "Movies" : "TV Shows"}
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-blue-900 text-white p-4 rounded-md">
          <p>Error loading content: {error}</p>
        </div>
      ) : content.length === 0 ? (
        <p className="text-gray-400">No content available</p>
      ) : (
        <div className="relative">
          {/* Left arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-2 rounded-full z-10"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4"
            onScroll={checkScrollPosition}
          >
            {content.map((item) => (
              <Link
                to={`/watch/${item.id}`}
                key={item.id}
                className="flex-shrink-0 w-[250px] relative group"
              >
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={
                      item.backdrop_path
                        ? SMALL_IMG_BASE_URL + item.backdrop_path
                        : PLACEHOLDER_IMG
                    }
                    alt={item.title || item.name || "Content"}
                    className="transition-transform duration-300 ease-in-out group-hover:scale-110 w-full h-36 object-cover"
                    onError={(e) => {
                      e.target.src = PLACEHOLDER_IMG;
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h3 className="font-semibold truncate">
                    {item.title || item.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span>
                      {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      {item.vote_count ? item.vote_count.toLocaleString() : "0"}{" "}
                      votes
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-2 rounded-full z-10"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentSlider;
