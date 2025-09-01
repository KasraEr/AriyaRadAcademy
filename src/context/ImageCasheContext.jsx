import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import api from "../utils/config";

const ImageCacheContext = createContext(null);

export function ImageCacheProvider({ children }) {
  const [cache, setCache] = useState(new Map());
  const [ready, setReady] = useState(false);
  const cancelRef = useRef(false);

  const buildUrl = useCallback((fileName) => {
    return `${api.defaults.baseURL}/api/File/image/${fileName}`;
  }, []);

  const preloadImage = useCallback((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(url);
      img.src = url;
    });
  }, []);

  useEffect(() => {
    cancelRef.current = false;

    const fetchAndPreload = async () => {
      try {
        const { data } = await api.get("/api/File/all-images");

        if (!Array.isArray(data)) throw new Error("Invalid image list");

        const fileNames = data.map((path) => path.split("/").pop());
        const urls = fileNames.map(buildUrl);

        await Promise.all(urls.map(preloadImage));

        if (!cancelRef.current) {
          const newCache = new Map();
          fileNames.forEach((name) => {
            newCache.set(name, buildUrl(name));
          });
          setCache(newCache);
          setReady(true);
        }
      } catch (err) {
        console.error("Error preloading images:", err);
        setReady(true);
      }
    };

    fetchAndPreload();

    return () => {
      cancelRef.current = true;
    };
  }, [buildUrl, preloadImage]);

  const getImageUrl = useCallback(
    (fileName) => cache.get(fileName) || buildUrl(fileName),
    [cache, buildUrl]
  );

  return (
    <ImageCacheContext.Provider value={{ getImageUrl, ready }}>
      {children}
    </ImageCacheContext.Provider>
  );
}

export const useImageCache = () => {
  const ctx = useContext(ImageCacheContext);
  if (!ctx) {
    throw new Error("useImageCache must be used within ImageCacheProvider");
  }
  return ctx;
};
