import { useContext } from "react";
import { ImageCasheContext } from "../context/ImageCasheContext";

export const useImageCache = () => {
  const ctx = useContext(ImageCasheContext);
  if (!ctx) {
    throw new Error("useImageCache must be used within ImageCacheProvider");
  }
  return ctx;
};
