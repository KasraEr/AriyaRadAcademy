import { useContext } from "react";
import { ImageCacheContext } from "../context/ImageCasheContext";

export const useImageCache = () => {
  const context = useContext(ImageCacheContext);

  if (!context) {
    throw new Error("useImageCache must be used within ImageCacheProvider");
  }

  const { getImageUrl, ready } = context;
  return { getImageUrl, ready };
};
