import { Link } from "react-router-dom";
import React from "react";
import { Play } from "lucide-react";
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

function HomeScreen() {
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();

  if (!trendingContent)
    return (
      <>
        <div className="h-screen relative">
          <NavBar />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center shimmer bg-gradient-to-b from-black to-blue-950">
            <p className="text-blue-300 text-xl">Loading trending content...</p>
          </div>
        </div>
        <div className="h-1 w-full bg-sky-500 mt-0" aria-hidden="true" />
        <Footer />
      </>
    );

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-screen text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${
            ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <NavBar />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-black/30 to-black/80 -z-50" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold">
              {trendingContent?.title ||
                trendingContent?.name ||
                "Title Loading ...."}
            </h1>
            <p className="mt-2 text-lg text-gray-300">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0] ||
                "Unknown Year"}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-lg text-gray-300">
              {trendingContent?.overview?.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview || "Description Loading ...."}
            </p>
          </div>
          <div className="mt-8 flex">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md mr-4 flex items-center"
            >
              <Play className="w-6 h-6 inline-block mr-2 fill-black" /> Play
            </Link>

            <Link
              to={`/watch/${trendingContent?.id}`}
              className="hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-md flex items-center"
            >
              <Play className="w-6 h-6 inline-block mr-2 fill-black" /> More Info
            </Link>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-sky-500 mt-0" aria-hidden="true" />
      {/* Sliders */}
      <div className="flex flex-col gap-10 bg-black mt-0">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <ContentSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <ContentSlider key={category} category={category} />
            ))}
      </div>
      <div className="h-1 w-full bg-sky-500 mt-0" aria-hidden="true" />
      <Footer />
    </>
  );
}

export default HomeScreen;
