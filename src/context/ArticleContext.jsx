import { createContext, useEffect, useState } from "react";
import api from "../utils/config";

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const cached = localStorage.getItem("articles");
        if (cached) {
          setArticles(JSON.parse(cached));
          return;
        }
        const { data } = await api.get("/api/Article/GetSelectList");
        setArticles(data);
        localStorage.setItem("articles", JSON.stringify(data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchArticles();
  }, []);

  return (
    <ArticleContext.Provider value={articles}>
      {children}
    </ArticleContext.Provider>
  );
};
