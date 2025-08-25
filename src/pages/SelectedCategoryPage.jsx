//react
import { useState, useEffect } from "react";
//modules
import Card from "/src/components/modules/Card";
//C-hooks
import useTitle from "../hooks/useTitle.js";
//r-r-d
import { useLocation } from "react-router-dom";
//utils
import api from "../utils/config.js";

export default function SelectedCategoryPage() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 650);

  const [filteredCategory, setFilteredCategory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const location = useLocation();

  const id = location.state?.id;

  useTitle("دوره ها");

  const getFilteredCategory = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/api/Course/GetSelectList?CategoryId=${id}`
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

    if (id) getFilteredCategory();

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [id]);

  if (!id) return <p className="text-center mt-10">دسته‌بندی پیدا نشد</p>;
  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">خطا: {error}</p>;

  return (
    <div
      className={
        isSmallScreen
          ? "flex flex-col items-center gap-4 my-5 ml:max-lg:max-w-[600px] mx-auto"
          : "ml:max-lg:max-w-[650px] mx-auto grid grid-cols-2 lg:max-xmd:grid-cols-3 xmd:grid-cols-4 gap-3"
      }
    >
      {filteredCategory?.map((course) => (
        <Card key={course.id} data={course} />
      ))}
    </div>
  );
}
