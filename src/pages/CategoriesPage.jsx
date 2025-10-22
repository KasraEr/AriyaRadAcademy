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
import categoryIcon from "../assets/icons/category.png";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getImageUrl, ready } = useImageCache();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("categoriesCache");
    if (saved) {
      setCategories(JSON.parse(saved));
      setLoading(false);
      return;
    }

    const getCategories = async () => {
      try {
        const { data } = await api.get("/api/Category/GetSelectList");
        setCategories(data);
        localStorage.setItem("categoriesCache", JSON.stringify(data));
      } catch (error) {
        console.error("خطا در دریافت لیست دسته‌بندی‌ها", error.message);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  useTitle("دسته بندی دوره ها");

  if (!ready || loading) {
    return <div className="b1">در حال بارگذاری...</div>;
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
            .map((cat) => (
              <img
                key={cat.id}
                className="cursor-pointer rounded shadow-md hover:scale-105 transition-transform"
                src={getImageUrl(cat.coverImage) || "/fallback-placeholder.png"}
                alt={cat.name}
                loading="lazy"
                onClick={() =>
                  navigate(
                    `/categories/${cat.name.toLowerCase().replace(/\s+/g, "-")}`
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
