// router
import { useNavigate } from "react-router-dom";
// icons
import artAuthor from "../../assets/icons/articleAuthor.svg";
// hooks
import { useImageCache } from "../../hooks/useImageCache";

export default function ArticleCard({ data, id }) {
  const navigate = useNavigate();

  // 🚀 گرفتن تصویر با React Query
  const { data: imageUrl, isLoading } = useImageCache(data?.image);

  const slugify = (text) =>
    text
      ?.toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\u0600-\u06FF\w-]+/g, "")
      .replace(/--+/g, "-");

  return (
    <div
      key={id}
      className="flex flex-col items-center gap-6 overflow-hidden border border-text-500 rounded-4xl w-full p-3 ml:my-5 ml:min-h-[calc(470px+8%)]"
    >
      {isLoading ? (
        <div className="w-full h-[200px] bg-basic-200 rounded-3xl animate-pulse" />
      ) : (
        <img
          src={imageUrl || "/fallback-placeholder.png"}
          alt={data.name || ""}
          className="w-full rounded-3xl"
          loading="lazy"
        />
      )}

      <p className="b1 text-start leading-7 h-[50px]">{data.name}</p>

      <div className="flex items-center justify-between w-full border-t border-text-500">
        <p className="flex items-center justify-center gap-2 b3 text-text-500 pt-3">
          <span className="flex items-center justify-center gap-2 subtitle2 text-text-500">
            <img src={artAuthor} alt="" loading="lazy" />
            نویسنده :
          </span>
          {data.author}
        </p>
      </div>

      <button
        onClick={() =>
          navigate(`/articles/${slugify(data.name)}`, { state: { id } })
        }
        className="bg-primary-500 text-basic-100 w-full rounded-full hover:bg-primary-100 hover:text-primary-500 active:bg-primary-900 active:text-text-100 transition"
      >
        خواندن مقاله
      </button>
    </div>
  );
}
