import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      <div className="min-h-screen bg-black">
        <WatchPageSkeleton />
      </div>
    );
  if (!content)
    return (
      <div className="bg-black text-white h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-full text-center px-8">
          <h2 className="text-3xl sm:text-5xl font-bold">
            Content not found 😢
          </h2>
        </div>
      </div>
    );

  return (
    <div className=" min-h-screen bg-black text-white">
      <Navbar />

      {/* 🎥 Trailer Hero */}
      <div className="relative  flex mt-25 bg-gradient-to-b from-black to-blue-950 pb-10">
        {trailers.length > 0 ? (
          <ReactPlayer
            controls
            width="88%"
            height="75vh"
            className="mx-auto justify-center items-center"
            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
          />
        ) : (
          <div className="h-[60vh] mx-auto mt-25 flex items-center  justify-center bg-gray-800 w-[88%]">
            <p className="text-xl">
              No trailers available for{" "}
              <span className="text-blue-500 font-bold">
                {content?.title || content?.name}
              </span>
            </p>
          </div>
        )}

        {trailers.length > 1 && (
          <>
            <button
              onClick={() => setCurrentTrailerIdx((i) => Math.max(0, i - 1))}
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-3 rounded-full"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={() =>
                setCurrentTrailerIdx((i) =>
                  Math.min(trailers.length - 1, i + 1)
                )
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-3 rounded-full"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}
      </div>

      {/* 📖 Content Details */}
      <div className="h-1 w-full bg-sky-500 " aria-hidden="true" />
      <div className="bg-gradient-to-b from-black to-blue-950">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center md:items-start justify-center gap-12 text-center md:text-left bg-gradient-to-b from-black to-blue-950">
          {content?.poster_path && (
            <img
              src={ORIGINAL_IMG_BASE_URL + content.poster_path}
              alt={content.title || content.name}
              className="w-72 md:w-80 md:h-[28rem] h-96 rounded-lg shadow-lg object-cover"
            />
          )}

          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              {content.title || content.name}
            </h1>

            <p className="mt-3 text-lg text-gray-300">
              {formatReleaseDate(
                content.release_date || content.first_air_date
              )}{" "}
              |{" "}
              <span
                className={
                  content.adult
                    ? "text-blue-600 font-semibold"
                    : "text-green-400 font-semibold"
                }
              >
                {content.adult ? "18+" : "PG-13"}
              </span>
            </p>

            <p className="mt-6 text-gray-400 leading-relaxed">
              {content.overview || "No description available."}
            </p>

            {/* Extra Details */}
            <div className="flex gap-3 mt-6 flex-wrap justify-center md:justify-start">
              {content.vote_average && (
                <span className="bg-gray-800 px-4 py-1 rounded-full text-sm shadow-sm">
                  ⭐ {content.vote_average.toFixed(1)} ({content.vote_count}{" "}
                  votes)
                </span>
              )}
              {content.popularity && (
                <span className="bg-gray-800 px-4 py-1 rounded-full text-sm shadow-sm">
                  🔥 Popularity: {Math.round(content.popularity)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-sky-500" aria-hidden="true" />
      {/* 🎬 Similar Content */}
      {similarContent.length > 0 && (
        <div className="bg-gradient-to-b from-black to-blue-950">
          <div className="px-6 py-12 max-w-7xl mx-auto">
            {/* Section Heading */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold tracking-tight">
                Similar {contentType === "movie" ? "Movies" : "TV Shows"}
              </h2>
            </div>

            {/* Carousel */}
            <div className="relative group">
              {/* Cards */}
              <div
                ref={sliderRef}
                className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
              >
                {similarContent
                  .filter((item) => item.poster_path)
                  .map((item) => (
                    <Link
                      key={item.id}
                      to={`/watch/${item.id}`}
                      className="w-44 sm:w-48 md:w-52 flex-none relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                    >
                      {/* Poster */}
                      <div className="relative overflow-hidden">
                        <img
                          src={SMALL_IMG_BASE_URL + item.poster_path}
                          alt={item.title || item.name}
                          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                        />

                        {/* Overlay (only triggers on hover of THIS poster) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 opacity-0 hover:opacity-100 transition duration-500 flex items-end p-3">
                          <div>
                            <h4 className="text-white font-semibold text-sm truncate">
                              {item.title || item.name}
                            </h4>
                            <button className="mt-1 bg-blue-600 px-3 py-1 rounded text-xs hover:bg-blue-700 transition">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              {/* Scroll Buttons */}
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
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
