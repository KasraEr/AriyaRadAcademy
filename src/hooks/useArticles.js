import { useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";

export const useArticles = () => {
  const ctx = useContext(ArticleContext);
  return ctx;
};
