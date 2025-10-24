import { useQuery } from "@tanstack/react-query";
import api from "../utils/config";

const preloadImage = (url) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(null);
    img.src = url;
  });

export function useImageCache(fileName) {
  return useQuery({
    queryKey: ["image", fileName],
    queryFn: async () => {
      const url = `${api.defaults.baseURL}/api/File/image/${fileName}`;
      const loaded = await preloadImage(url);
      if (!loaded) throw new Error("Image failed to load");
      return url;
    },
    staleTime: 1000 * 60 * 120,
    cacheTime: 1000 * 60 * 120,
    enabled: !!fileName,
  });
}
