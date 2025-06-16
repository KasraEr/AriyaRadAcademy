//react
import { useEffect, useState } from "react";
//react-router-dom
import { Link } from "react-router-dom";
//modules
import Card from "../modules/Card";
import CourseSlider from "../modules/CourseSlider";
//data
import persianBootcamps from "/src/utils/bootcamps.js";

export default function Bootcamps() {
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
          <h3 className="text-primary-500">بوتکمپ ها</h3>
          <p className="hidden b4 text-primary-500">
            <Link to="/">مشاهده همه</Link>
          </p>
        </div>
        {isSmallScreen ? (
          persianBootcamps?.map((course) => (
            <Card key={course.id} data={course} />
          ))
        ) : (
          <CourseSlider data={persianBootcamps} />
        )}
      </div>
    </>
  );
}
