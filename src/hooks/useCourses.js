import { useContext } from "react";
import { CourseContext } from "../context/CourseContext";

export const useCourses = () => {
  const ctx = useContext(CourseContext);
  return ctx;
};
