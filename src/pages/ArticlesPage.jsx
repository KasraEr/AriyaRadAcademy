// hooks
import { useArticles } from "../hooks/useArticles.js";
// r-r-d
import { Link } from "react-router-dom";
// temps
import ArticleCard from "../components/templates/ArticleCard.jsx";
// icons
import articleIcon from "../assets/icons/article.png";
//r-h-a
import { Helmet } from "react-helmet-async";

export default function ArticlesPage() {
  const { data: articles = [], isLoading, isError, error } = useArticles();

  if (isLoading) {
    return <p className="text-center mt-10">در حال بارگذاری...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        خطا در دریافت مقالات: {error.message}
      </p>
    );
  }

  return (
    <>
      <Helmet>
        <title>آکادمی آریاراد | مقالات </title>
        <meta name="description" content="صفحه مربوط به تمامی مقالات موجود" />
      </Helmet>

      <div className="flex flex-col gap-4">
        <h2 className="text-primary-500 flex items-center gap-2">
          <img src={articleIcon} loading="lazy" alt="" />
          مقالات
        </h2>

        <div>
          {articles?.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-8 ml:max-lg:max-w-[600px] mx-auto">
              <h2 className="text-center">
                در حال حاضر هیچ مقاله‌ای وجود ندارد
              </h2>
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
                <ArticleCard data={article} key={article.id} id={article.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
