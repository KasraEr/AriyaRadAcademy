import { useEffect, useState } from "react";
// r-r-d
import { useLocation } from "react-router-dom";
// utils
import api from "../utils/config";
// امنیت
import DOMPurify from "dompurify";
//
import artAuthor from "../assets/icons/articleAuthor.svg";

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
        <div className="grid grid-cols-1 place-items-center gap-8 p-3">
          <h3 className="text-primary-900 text-center">{article.name}</h3>
          <img
            src={imageUrl}
            alt={article.name}
            className="rounded-[15px] w-full max-w-[650px]"
          />
          <div
            className="w-full max-w-[650px] text-justify prose prose-lg font-[ariyarad-medium]"
            dir="rtl"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.body || ""),
            }}
          ></div>
          <div className="pt-3">
            <p className="flex items-center justify-center gap-2 b3 text-text-500">
              <span className="flex items-center justify-center gap-2 subtitle2 text-text-500">
                <img src={artAuthor} alt="" />
                نویسنده :{" "}
              </span>
              {article.author}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
