import { fetchfromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMedia(req, res) {
  const { type } = req.params; // 'movie' or 'tv'
  try {
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`
    );
    const randomMedia =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomMedia });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMediaTrailers(req, res) {
  const { type, id } = req.params;
  try {
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimilarMedia(req, res) {
  const { type, id } = req.params;
  try {
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`
    );
    res.json({ success: true, details: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMediaDetails(req, res) {
  const { type, id } = req.params;
  try {
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US`
    );
    res.json({ success: true, details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMediaCategory(req, res) {
  const { type, category } = req.params;
  try {
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`
    );
    res.json({ success: true, details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
