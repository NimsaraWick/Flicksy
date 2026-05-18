import { useState } from "react";
import { useContentStore } from "../store/content";
import NavBar from "../components/NavBar";
import { Search, Moon, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "movie" || tab === "tv") {
      setContentType(tab);
    }
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching under the right category"
        );
      } else {
        toast.error("An error occurred, please try again later");
      }
    }
  };

  return (
    <div className="min-h-screen bg-mirage-obsidian text-white font-sans selection:bg-mirage-gold selection:text-black">
      <div className="fixed inset-0 mirage-gradient opacity-40 pointer-events-none" />
      <NavBar />
      
      <div className="container mx-auto px-6 py-32 relative z-10">
        {/* Tabs: The Selection */}
        <div className="flex justify-center gap-8 mb-16">
          {["movie", "tv", "person"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 text-[10px] tracking-[0.4em] uppercase transition-all duration-500 border-b ${
                activeTab === tab 
                ? "text-mirage-gold border-mirage-gold" 
                : "text-white/20 border-transparent hover:text-white/60"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab === "movie" ? "Cinema" : tab === "tv" ? "Series" : "Visionaries"}
            </button>
          ))}
        </div>

        {/* Search Bar: The Oracle */}
        <form
          className="flex gap-4 items-center mb-24 max-w-3xl mx-auto"
          onSubmit={handleSearch}
        >
          <div className="relative flex-1 group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={"REVEAL_" + activeTab.toUpperCase() + "..."}
              className="w-full py-5 px-8 bg-white/5 border border-white/5 rounded-full text-mirage-gold focus:border-mirage-gold/40 focus:outline-none transition-all duration-500 placeholder:text-white/10 tracking-[0.2em]"
            />
            <Sparkles className="absolute right-6 top-1/2 -translate-y-1/2 text-white/5 group-focus-within:text-mirage-gold/20 transition-colors" size={18} />
          </div>
          <button
            type="submit"
            className="bg-mirage-gold hover:bg-white text-black p-5 rounded-full transition-all duration-500 gold-glow"
          >
            <Search className="w-6 h-6" />
          </button>
        </form>

        {/* Results: The Manifestation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div key={result.id} className="group/item">
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <div className="relative rounded-2xl overflow-hidden border border-white/5 grayscale group-hover/item:grayscale-0 transition-all duration-1000">
                      <img
                        src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                        alt={result.name}
                        className="max-h-96 w-full object-cover"
                      />
                    </div>
                    <h2 className="mt-6 text-mirage-gold/60 text-[10px] tracking-[0.3em] uppercase font-light group-hover/item:text-mirage-gold transition-colors">{result.name}</h2>
                  </div>
                ) : (
                  <Link
                    to={"/watch/" + result.id}
                    onClick={() => {
                      if (activeTab === "movie" || activeTab === "tv") {
                        setContentType(activeTab);
                      }
                    }}
                    className="block"
                  >
                    <div className="mirage-card rounded-2xl overflow-hidden relative">
                      <img
                        src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                        alt={result.title || result.name}
                        className="w-full h-auto object-cover grayscale brightness-75 group-hover/item:grayscale-0 group-hover/item:brightness-100 transition-all duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-mirage-obsidian via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-1000 flex items-end p-6">
                        <h2 className="text-white font-serif italic text-xl">
                          {result.title || result.name}
                        </h2>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
