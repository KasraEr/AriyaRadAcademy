import { useState, useEffect } from "react";
//utils
import api from "../utils/config.js";
//react-router-dom
import { useNavigate } from "react-router-dom";
//C-hooks
import useTitle from "../hooks/useTitle.js";
//context
import { useImageCache } from "../hooks/useImageCache.js";
//icons
import category from "../assets/icons/category.png";

let cachedCategories = null;

export default function CategoriesPage() {
  const [categories, setCategories] = useState(cachedCategories || []);
  const [loading, setLoading] = useState(!cachedCategories);

  const { getImageUrl, ready } = useImageCache();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cachedCategories) {
      const getCategories = async () => {
        try {
          const { data } = await api.get("/api/Category/GetSelectList");
          cachedCategories = data;
          setCategories(data);
        } catch (error) {
          console.error("خطا در دریافت لیست دوره‌ها", error.message);
        } finally {
          setLoading(false);
        }
      };
      getCategories();
    }
  }, []);

  useTitle("دسته بندی دوره ها");

  if (!ready || loading) {
    return <div className="b1">در حال بارگذاری...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-primary-500 flex items-center gap-2">
        <img src={category} alt="" />
        دسته بندی دوره ها
      </h2>
      <div className="w-full grid grid-cols-1 place-items-center gap-6 ml:max-lg:grid-cols-2 lg:max-xl:mt-9 lg:max-xl:grid-cols-3 xl:grid-cols-4">
        {categories?.length > 0 ? (
          categories
            ?.filter((item) => item.inActive === false)
            .slice()
            .reverse()
            .map((category) => (
              <img
                className="cursor-pointer rounded shadow-md hover:scale-105 transition-transform"
                src={getImageUrl(category.coverImage)}
                alt={category.name}
                key={category.id}
                loading="lazy"
                onClick={() =>
                  navigate(
                    `/categories/${category.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`
                  )
                }
              />
            ))
        ) : (
          <p className="b1">هیچ دسته‌بندی‌ای یافت نشد</p>
        )}
      </div>
    </div>
  );
}
