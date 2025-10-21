import { createContext, useEffect, useState, useCallback, useRef } from "react";
import api from "../utils/config";

export const ImageCacheContext = createContext(null);

export function ImageCacheProvider({ children }) {
  const [cache, setCache] = useState(new Map());
  const [ready, setReady] = useState(false);
  const cancelRef = useRef(false);

  const buildUrl = useCallback(
    (fileName) => `${api.defaults.baseURL}/api/File/image/${fileName}`,
    []
  );

  const preloadImage = useCallback((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }, []);

  useEffect(() => {
    cancelRef.current = false;

    const fetchCritical = async () => {
      try {
        const { data } = await api.get("/api/File/all-images");
        if (!Array.isArray(data)) throw new Error("Invalid image list");

        const fileNames = data.map((path) => path.split("/").pop());
        const critical = fileNames.slice(0, 10);
        const urls = critical.map(buildUrl);

        const results = await Promise.all(urls.map(preloadImage));

        if (!cancelRef.current) {
          const newCache = new Map();
          critical.forEach((name, i) => {
            if (results[i]) {
              newCache.set(name, buildUrl(name));
            }
          });

          localStorage.setItem("imageCache", JSON.stringify([...newCache]));

          setCache(newCache);
          setReady(true);
        }
      } catch (err) {
        console.error("Error preloading images:", err);
        setReady(true);
      }
    };

    const saved = localStorage.getItem("imageCache");
    if (saved) {
      setCache(new Map(JSON.parse(saved)));
      setReady(true);
    } else {
      fetchCritical();
    }

    return () => {
      cancelRef.current = true;
    };
  }, [buildUrl, preloadImage]);

  const getImageUrl = useCallback(
    (fileName) => {
      if (cache.has(fileName)) return cache.get(fileName);

      const url = buildUrl(fileName);
      preloadImage(url).then((loaded) => {
        if (loaded) {
          setCache((prev) => {
            const updated = new Map(prev).set(fileName, url);
            localStorage.setItem("imageCache", JSON.stringify([...updated]));
            return updated;
          });
        }
      });

      return url;
    },
    [cache, buildUrl, preloadImage]
  );

  return (
    <ImageCacheContext.Provider value={{ getImageUrl, ready }}>
      {children}
    </ImageCacheContext.Provider>
  );
}
