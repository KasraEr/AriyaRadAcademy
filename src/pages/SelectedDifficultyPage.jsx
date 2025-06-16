//react
import { useState, useEffect } from "react";
//react-router-dom
import { useParams } from "react-router-dom";
//data
import courses from "/src/utils/courses.js";
import Card from "/src/components/modules/Card";
//icons
import ic from "/src/assets/icons/ci.svg";
//C-hooks
import useTitle from "../hooks/useTitle.js";

export default function SelectedDifficultyPage() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 650);
  const { difficulty } = useParams();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 650);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const introductoryCourses = courses?.filter(
    (course) => course.difficulty === "introductory"
  );

  const advancedCourses = courses?.filter(
    (course) => course.difficulty === "advanced"
  );

  if (difficulty === "introductory") {
    useTitle("دوره های مقدماتی");
    return (
      <>
        <div className="pt-5 ml:max-lg:max-w-[650px] mx-auto">
          <h2 className="text-primary-500 flex items-center gap-2">
            <img src={ic} alt="" />
            دوره های مقدماتی
          </h2>
        </div>
        {isSmallScreen ? (
          <div className="flex flex-col items-center gap-4 my-5 ml:max-lg:max-w-[600px] mx-auto">
            {introductoryCourses?.map((course) => (
              <Card key={course.id} data={course} />
            ))}
          </div>
        ) : (
          <div className="ml:max-lg:max-w-[650px] mx-auto grid grid-cols-2 lg:max-xmd:grid-cols-3 xmd:grid-cols-4 gap-3">
            {introductoryCourses?.map((course) => (
              <Card key={course.id} data={course} />
            ))}
          </div>
        )}
      </>
    );
  } else {
    useTitle("دوره های پیشرفته");
    return (
      <>
        <div className="pt-5 ml:max-lg:max-w-[650px] mx-auto">
          <h2 className="text-primary-500 flex items-center gap-2">
            <img src={ic} alt="" />
            دوره های پیشرفته
          </h2>
        </div>
        {isSmallScreen ? (
          <div className="flex flex-col items-center gap-4 my-5 ml:max-lg:max-w-[600px] mx-auto">
            {advancedCourses?.map((course) => (
              <Card key={course.id} data={course} />
            ))}
          </div>
        ) : (
          <div className="ml:max-lg:max-w-[650px] mx-auto grid grid-cols-2 lg:max-xmd:grid-cols-3 xmd:grid-cols-4 gap-3">
            {advancedCourses?.map((course) => (
              <Card key={course.id} data={course} />
            ))}
          </div>
        )}
      </>
    );
  }
}
