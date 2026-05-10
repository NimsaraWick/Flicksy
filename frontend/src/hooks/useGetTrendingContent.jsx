import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  // set initial state to null so HomeScreen shows the loading UI while fetching
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();
  const lastFetchedRef = useRef(null);

  useEffect(() => {
    // if we've already fetched for this contentType, skip
    if (lastFetchedRef.current === contentType) return;
    lastFetchedRef.current = contentType;

    // show loading UI while fetching a new type
    setTrendingContent(null);

    (async () => {
      try {
        const res = await axios.get(`/api/v1/media/${contentType}/trending`);
        setTrendingContent(res.data.content);
        console.log(
          "Fetched trending content for",
          contentType,
          res.data.content
        );
      } catch (error) {
        console.error("Error fetching trending content:", error);
      }
    })();
  }, [contentType]);

  console.log("Trending content----", trendingContent);
  return { trendingContent };
};

export default useGetTrendingContent;
