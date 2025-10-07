// import api from "./config";

// class PreloadManager {
//   constructor({ concurrency = 3, timeout = 15000, retries = 1 } = {}) {
//     this.queue = [];
//     this.activeCount = 0;
//     this.concurrency = concurrency;
//     this.timeout = timeout;
//     this.retries = retries;
//   }

//   preload(url) {
//     return new Promise((resolve, reject) => {
//       this.queue.push({ url, resolve, reject, attempt: 0 });
//       this.next();
//     });
//   }

//   async next() {
//     if (this.activeCount >= this.concurrency || this.queue.length === 0) return;

//     const { url, resolve, reject, attempt } = this.queue.shift();
//     this.activeCount++;

//     try {
//       // درخواست تصویر به صورت blob
//       const response = await api.get(url, {
//         timeout: this.timeout,
//         responseType: "blob",
//       });
//       const objectUrl = URL.createObjectURL(response.data);
//       resolve(objectUrl);
//     } catch (err) {
//       if (attempt < this.retries) {
//         this.queue.push({ url, resolve, reject, attempt: attempt + 1 });
//       } else {
//         reject(err);
//       }
//     } finally {
//       this.activeCount--;
//       this.next();
//     }
//   }
// }

// const preloadManager = new PreloadManager({
//   concurrency: 3,
//   timeout: 15000,
//   retries: 2,
// });

// export default preloadManager;

import { createContext, useEffect, useState, useCallback, useRef } from "react";
import api from "../utils/config";
import preloadManager from "../utils/imagePreloader";

export const ImageCasheContext = createContext(null);

export function ImageCacheProvider({ children }) {
  const [cache, setCache] = useState(new Map());
  const [ready, setReady] = useState(false);
  const cancelRef = useRef(false);

  const buildUrl = useCallback(
    (fileName) => `${api.defaults.baseURL}/api/File/image/${fileName}`,
    []
  );

  useEffect(() => {
    cancelRef.current = false;

    const fetchAndPreload = async () => {
      try {
        const { data } = await api.get("/api/File/all-images");
        if (!Array.isArray(data)) throw new Error("Invalid image list");

        const fileNames = data.map((path) => path.split("/").pop());

        const newCache = new Map();
        for (const name of fileNames) {
          const url = buildUrl(name);
          try {
            const objectUrl = await preloadManager.preload(url);
            if (!cancelRef.current) {
              newCache.set(name, objectUrl);
              // به‌روزرسانی تدریجی cache
              setCache(new Map(newCache));
            }
          } catch (err) {
            console.error("Failed to preload:", name, err.message);
          }
        }

        if (!cancelRef.current) {
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
  }, [buildUrl]);

  const getImageUrl = useCallback(
    (fileName) =>
      cache.get(fileName) || buildUrl(fileName) || "/fallback-placeholder.png",
    [cache, buildUrl]
  );

  return (
    <ImageCasheContext.Provider value={{ getImageUrl, ready }}>
      {children}
    </ImageCasheContext.Provider>
  );
}
