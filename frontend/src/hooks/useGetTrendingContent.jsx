import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState([]);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const res = await axios.get(`/api/v1/media/${contentType}/trending`);
        setTrendingContent(res.data.content);
        console.log("Fetched trending content:", res.data.content);
      } catch (error) {
        console.error("Error fetching trending content:", error);
      }
    };

    getTrendingContent();
  }, [contentType]);
  console.log("Trending content----", trendingContent);
  return { trendingContent };
};

export default useGetTrendingContent;
