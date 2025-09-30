// React
import { useEffect, useMemo, useState } from "react";
// Context
import { useCourses } from "../../hooks/useCourses";
// Modules
import Card from "../modules/Card";
import CourseSlider from "../modules/CourseSlider";

export default function AdvancedCourses() {
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia("(max-width: 650px)").matches
  );

  const courses = useCourses();

  const filteredCourses = useMemo(() => {
    return courses?.filter((course) => course.difficulty === "advanced") || [];
  }, [courses]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 650px)");
    const handleResize = (e) => setIsSmallScreen(e.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  if (!filteredCourses.length) return null;

  return (
    <div className="flex flex-col items-center gap-4 my-15 ml:max-lg:max-w-[600px] mx-auto">
      <div className="border-b border-text-500 flex items-center justify-between w-full pb-3">
        <h3 className="text-primary-500">دوره‌های پیشرفته</h3>
      </div>

      {isSmallScreen ? (
        filteredCourses.map((course) => (
          <Card key={course.id} courseData={course} />
        ))
      ) : (
        <CourseSlider courseData={filteredCourses} />
      )}
    </div>
  );
}
