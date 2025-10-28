// react-router-dom
import { useNavigate } from "react-router-dom";
// utils
import api from "../utils/config.js";
// hooks
import useTitle from "../hooks/useTitle.js";
import { useImageCache } from "../hooks/useImageCache.js";
// react-query
import { useQuery } from "@tanstack/react-query";
// icons
import categoryIcon from "../assets/icons/category.png";

function CategoryCard({ cat }) {
  const navigate = useNavigate();
  const { data: imageUrl, isLoading } = useImageCache(cat.coverImage);

  if (isLoading) {
    return (
      <div className="w-full h-[200px] bg-basic-200 rounded animate-pulse" />
    );
  }

  // تابع slugify برای ساخت URL تمیز
  const slugify = (text) =>
    text
      ? text.toString().trim().toLowerCase().replace(/\s+/g, "-")
      : "unknown";

  return (
    <img
      className="cursor-pointer rounded shadow-md hover:scale-105 transition-transform"
      src={imageUrl || "/fallback-placeholder.png"}
      alt={cat.name}
      loading="lazy"
      onClick={() =>
        navigate(`/categories/${slugify(cat.name)}`, {
          state: { categoryId: cat.id }, // 👈 پاس دادن id در state
        })
      }
    />
  );
}

export default function CategoriesPage() {
  useTitle("دسته بندی دوره ها");

  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get("/api/Category/GetSelectList");
      return data;
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30,
  });

  if (isLoading) {
    return <div className="b1">در حال بارگذاری...</div>;
  }

  if (isError) {
    return (
      <div className="b1 text-red-500">
        خطا در دریافت لیست دسته‌بندی‌ها: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-primary-500 flex items-center gap-2">
        <img src={categoryIcon} alt="" loading="lazy" />
        دسته بندی دوره ها
      </h2>

      <div className="w-full grid grid-cols-1 place-items-center gap-6 ml:max-lg:grid-cols-2 lg:max-xl:mt-9 lg:max-xl:grid-cols-3 xl:grid-cols-4">
        {categories?.length > 0 ? (
          categories
            .filter((item) => item.inActive === false)
            .map((cat) => <CategoryCard key={cat.id} cat={cat} />)
        ) : (
          <p className="b1">هیچ دسته‌بندی‌ای یافت نشد</p>
        )}
      </div>
    </div>
  );
}
