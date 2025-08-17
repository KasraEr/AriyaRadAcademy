import { useEffect, useState } from "react";
// r-r-d
import { useLocation } from "react-router-dom";
// utils
import api from "../utils/config";
// امنیت
import DOMPurify from "dompurify";

export default function ArticleDetailsPage() {
  const [article, setArticle] = useState({});

  const location = useLocation();
  const id = location.state?.id;

  const imageUrl =
    article?.image &&
    `https://ariyaradacademy.com/api/File/image/${article.image}`;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await api.get(`/api/Article/GetById?Id=${id}`);
        setArticle(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchArticles();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="border border-text-500 rounded-4xl grid grid-cols-1 place-items-center gap-3 p-4">
          <h3 className="text-primary-900 text-center">{article.name}</h3>
          <img src={imageUrl} alt={article.name} className="rounded-[15px]" />
          <div
            className="w-full text-justify prose prose-lg font-[ariyarad-medium]"
            dir="rtl"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.body || ""),
            }}
          ></div>

          <p className="subtitle3">نویسنده : {article.author}</p>
        </div>
      </div>
    </>
  );
}
