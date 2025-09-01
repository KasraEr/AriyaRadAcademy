import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import api from "../utils/config";

const ImageCacheContext = createContext(null);

export function ImageCacheProvider({ children }) {
  const [cache, setCache] = useState(new Map());
  const [ready, setReady] = useState(false);

  const baseURL = "https://api.ariyaradacademy.com/";

  const buildUrl = (path) => {
    const fileName = path.split("/").pop();
    return `https://api.ariyaradacademy.com/api/File/image/${fileName}`;
  };

  const preloadImage = (url) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(url);
      img.src = url;
    });

  useEffect(() => {
    let cancelled = false;

    const fetchAndPreload = async () => {
      try {
        const { data } = await api.get("/api/File/all-images");

        const urls = data.map((path) => buildUrl(path));

        await Promise.all(urls.map((u) => preloadImage(u)));

        if (!cancelled) {
          const map = new Map();
          data.forEach((path) => {
            map.set(path.split("/").pop(), buildUrl(path));
          });
          setCache(map);
          setReady(true);
        }
      } catch (err) {
        console.error("Error preloading images:", err);
        setReady(true);
      }
    };

    fetchAndPreload();

    return () => {
      cancelled = true;
    };
  }, []);

  const getImageUrl = useCallback(
    (fileName) => {
      return cache.get(fileName) || `${baseURL}api/File/image/${fileName}`;
    },
    [cache]
  );

  return (
    <ImageCacheContext.Provider value={{ getImageUrl, ready }}>
      {children}
    </ImageCacheContext.Provider>
  );
}

export const useImageCache = () => {
  const ctx = useContext(ImageCacheContext);
  if (!ctx)
    throw new Error("useImageCache must be used within ImageCacheProvider");
  return ctx;
};
