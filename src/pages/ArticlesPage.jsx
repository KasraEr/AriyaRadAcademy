import { useState, useEffect } from "react";
//C-hooks
import useTitle from "../hooks/useTitle.js";
//r-r-d
import { Link } from "react-router-dom";
//utils
import api from "../utils/config.js";
//temps
import ArticleCard from "../components/templates/ArticleCard.jsx";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await api.get("/api/Article/GetSelectList");
        setArticles(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchArticles();
  }, []);

  useTitle("مقالات");

  return (
    <>
      {articles?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-8 ml:max-lg:max-w-[600px] mx-auto">
          <h2 className="text-center">در حال حاضر هیچ مقاله‌ای وجود ندارد</h2>
          <Link
            to="/"
            className="b2 cursor-pointer rounded-full text-basic-100 bg-secondary-500 w-full max-w-3xl p-3 text-center hover:bg-secondary-100 hover:text-secondary-900 active:bg-secondary-900 active:text-basic-100"
          >
            صفحه اصلی
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 place-items-center gap-6 ml:max-lg:grid-cols-2 lg:max-xl:mt-9 lg:max-xl:grid-cols-3 xl:grid-cols-4">
          {articles?.map((article) => (
            <ArticleCard key={article.id} data={article} />
          ))}
        </div>
      )}
    </>
  );
}
