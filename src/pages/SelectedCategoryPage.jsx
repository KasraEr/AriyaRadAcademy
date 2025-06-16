//react
import { useState, useEffect } from "react";
//react-router-dom
import { useParams } from "react-router-dom";
//data
import courses from "/src/utils/courses.js";
//modules
import Card from "/src/components/modules/Card";
//C-hooks
import useTitle from "../hooks/useTitle.js";

export default function SelectedCategoryPage() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 650);
  const { category } = useParams();
  useTitle("دوره ها");

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 650);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCategory = courses?.filter(
    (course) => course.category === category
  );

  return (
    <>
      {isSmallScreen ? (
        <div className="flex flex-col items-center gap-4 my-5 ml:max-lg:max-w-[600px] mx-auto">
          {filteredCategory?.map((course) => (
            <Card key={course.id} data={course} />
          ))}
        </div>
      ) : (
        <div className="ml:max-lg:max-w-[650px] mx-auto grid grid-cols-2 lg:max-xmd:grid-cols-3 xmd:grid-cols-4 gap-3">
          {filteredCategory?.map((course) => (
            <Card key={course.id} data={course} />
          ))}
        </div>
      )}
    </>
  );
}
