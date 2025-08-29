//react
import { useState, useEffect } from "react";
//modules
import Card from "/src/components/modules/Card";
//C-hooks
import useTitle from "../hooks/useTitle.js";
//r-r-d
import { useParams } from "react-router-dom";
//utils
import api from "../utils/config.js";

export default function SelectedCategoryPage() {
  const { slug } = useParams();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 650);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useTitle("دوره ها");

  const getFilteredCategory = async () => {
    try {
      setLoading(true);

      const { data: categories } = await api.get("/api/Category/GetSelectList");
      const category = categories.find(
        (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
      );

      if (!category) {
        setError("دسته‌بندی پیدا نشد");
        return;
      }

      const { data } = await api.get(
        `/api/Course/GetSelectList?CategoryId=${category.id}`
      );
      setFilteredCategory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 650px)");
    const handleChange = (e) => setIsSmallScreen(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    if (slug) getFilteredCategory();

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [slug]);

  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!filteredCategory.length)
    return <p className="b2 text-center mt-10">هیچ دوره‌ای یافت نشد</p>;

  return (
    <div
      className={
        isSmallScreen
          ? "flex flex-col items-center gap-4 my-5 ml:max-lg:max-w-[600px] mx-auto"
          : "ml:max-lg:max-w-[650px] mx-auto grid grid-cols-2 lg:max-xmd:grid-cols-3 xmd:grid-cols-4 gap-3"
      }
    >
      {filteredCategory.map((course) => (
        <Card key={course.id} courseData={course} />
      ))}
    </div>
  );
}
