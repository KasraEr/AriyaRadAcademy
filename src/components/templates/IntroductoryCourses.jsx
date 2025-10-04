// import { useEffect, useMemo, useState } from "react";
// import { useCourses } from "../../hooks/useCourses";
// import Card from "../modules/Card";
// import CourseSlider from "../modules/CourseSlider";

// export default function IntroductoryCourses({
//   breakpoint = 650,
//   minCoursesForSlider = 5,
// }) {
//   const [isSmallScreen, setIsSmallScreen] = useState(
//     window.matchMedia(`(max-width: ${breakpoint}px)`).matches
//   );

//   const courses = useCourses();

//   const filteredCourses = useMemo(() => {
//     return (
//       courses?.filter((course) => course.difficulty === "introductory") || []
//     );
//   }, [courses]);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
//     const handleResize = (e) => setIsSmallScreen(e.matches);

//     mediaQuery.addEventListener("change", handleResize);
//     return () => mediaQuery.removeEventListener("change", handleResize);
//   }, [breakpoint]);

//   if (!filteredCourses.length) return null;

//   const shouldShowCards =
//     isSmallScreen || filteredCourses.length < minCoursesForSlider;

//   return (
//     <div className="flex flex-col items-center gap-4 my-15 ml:max-lg:max-w-[600px] mx-auto">
//       <div className="border-b border-text-500 flex items-center justify-between w-full pb-3">
//         <h3 className="text-primary-500">دوره‌های مقدماتی</h3>
//       </div>

//       <div className="lg:flex items-start gap-3">
//         {shouldShowCards ? (
//           filteredCourses.map((course) => (
//             <Card key={course.id} courseData={course} />
//           ))
//         ) : (
//           <CourseSlider courseData={filteredCourses} />
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { useCourses } from "../../hooks/useCourses";
import Card from "../modules/Card";
import CourseSlider from "../modules/CourseSlider";

export default function IntroductoryCourses({
  breakpoint = 650,
  minCoursesForSlider = 5,
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );

  const courses = useCourses();

  const filteredCourses = useMemo(() => {
    return (
      courses?.filter((course) => course.difficulty === "introductory") || []
    );
  }, [courses]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handleResize = (e) => setIsSmallScreen(e.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [breakpoint]);

  if (!filteredCourses.length) return null;

  const shouldShowCards =
    isSmallScreen || filteredCourses.length < minCoursesForSlider;

  return (
    <div className="flex flex-col items-center gap-4 my-15 ml:max-lg:max-w-[600px] mx-auto">
      <div className="border-b border-text-500 flex items-center justify-between w-full pb-3">
        <h3 className="text-primary-500">دوره‌های مقدماتی</h3>
      </div>

      <div className="lg:flex items-start gap-3 w-full">
        {shouldShowCards ? (
          <div
            className="
              grid grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xmd:grid-cols-4
              gap-3 justify-items-center w-full
            "
          >
            {filteredCourses.map((course) => (
              <div key={course.id} className="w-full max-w-[300px]">
                <Card courseData={course} />
              </div>
            ))}
          </div>
        ) : (
          <CourseSlider courseData={filteredCourses} />
        )}
      </div>
    </div>
  );
}
