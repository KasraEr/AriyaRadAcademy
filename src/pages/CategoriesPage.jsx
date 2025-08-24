import { useState, useEffect } from "react";
//utils
import api from "../utils/config.js";
//react-router-dom
import { Link } from "react-router-dom";
//C-hooks
import useTitle from "../hooks/useTitle.js";
//context
import { useImageCache } from "../context/ImageCasheContext.jsx";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  const { getImageUrl, ready } = useImageCache();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await api.get("/api/Category/GetSelectList");
        setCategories(data);
      } catch (error) {
        console.error("خطا در دریافت لیست دوره‌ها", error.message);
      }
    };
    getCategories();
  }, []);

  useTitle("دسته بندی دوره ها");

  if (!ready) {
    return <div>در حال بارگذاری تصاویر...</div>;
  }

  return (
    <div className="grid grid-cols-1 place-items-center gap-6 ml:max-lg:grid-cols-2 lg:max-xl:mt-9 lg:max-xl:grid-cols-3 xl:grid-cols-4">
      {categories.length > 0 ? (
        categories.map((category) => (
          <Link to={category.name} key={category.id}>
            <img src={getImageUrl(category.coverImage)} alt={category.name} />
          </Link>
        ))
      ) : (
        <p>هیچ دسته‌بندی‌ای یافت نشد</p>
      )}
    </div>
  );
}
