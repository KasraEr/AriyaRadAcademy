// context
import { useArticles } from "../context/ArticleContext";
// r-r-d
import { useLocation } from "react-router-dom";
// امنیت
import DOMPurify from "dompurify";
// icons
import artAuthor from "../assets/icons/articleAuthor.svg";

export default function ArticleDetailsPage() {
  const location = useLocation();
  const id = location.state?.id;

  const articles = useArticles();
  const article = articles?.find((item) => item.id === id);

  const imageUrl =
    article?.image &&
    `https://ariyaradacademy.com/api/File/image/${article.image}`;

  if (!article) {
    return (
      <div className="w-full p-6 animate-pulse">
        <div className="h-6 w-1/3 bg-gray-300 rounded mx-auto mb-6"></div>
        <div className="w-full max-w-[650px] h-80 bg-gray-300 rounded-2xl mx-auto mb-6"></div>
        <div className="space-y-3 max-w-[650px] mx-auto">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 place-items-center gap-8 p-3">
        <h3 className="text-primary-900 text-center">{article?.name}</h3>

        <img
          src={imageUrl}
          alt={article?.name || "تصویر مقاله"}
          className="rounded-2xl w-full max-w-[650px]"
          loading="lazy"
        />

        <div
          className="w-full max-w-[650px] text-justify prose prose-lg font-[ariyarad-medium]"
          dir="rtl"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article?.body || ""),
          }}
        ></div>

        <div className="pt-3">
          <p className="flex items-center justify-center gap-2 b3 text-text-500">
            <span className="flex items-center justify-center gap-2 subtitle2 text-text-500">
              <img src={artAuthor} alt="" loading="lazy" />
              نویسنده :
            </span>
            {article?.author}
          </p>
        </div>
      </div>
    </div>
  );
}
