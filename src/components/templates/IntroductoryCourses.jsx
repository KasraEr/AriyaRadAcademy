//react
import { useEffect, useState } from "react";
//modules
import Card from "../modules/Card";
//data
import persianCourses from "/src/utils/courses.js";
//react-router-dom
import { Link } from "react-router-dom";
//modules
import CourseSlider from "../modules/CourseSlider";

const filteredCourses = persianCourses?.filter(
  (course) => course.difficulty === "introductory"
);

export default function IntroductoryCourses() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 650);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 650);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-4 my-15 ml:max-lg:max-w-[600px] mx-auto">
        <div className="border-b border-text-500 flex items-center justify-between w-full pb-3">
          <h3 className="text-primary-500">دوره‌های مقدماتی</h3>
          <p className="b4 text-primary-500">
            <Link to="/categories/courses/introductory">مشاهده همه</Link>
          </p>
        </div>
        {isSmallScreen ? (
          filteredCourses?.map((course) => (
            <Card key={course.id} data={course} />
          ))
        ) : (
          <CourseSlider data={filteredCourses} />
        )}
      </div>
    </>
  );
}
