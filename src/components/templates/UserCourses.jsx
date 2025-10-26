import { useEffect, useState } from "react";
import api from "../../utils/config";
import { getToken } from "../../utils/tokenService";
import { jwtDecode } from "jwt-decode";

export default function UserCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    const user = jwtDecode(token);
    const userId = user?.sub; // sub همان UserId است

    if (!userId) {
      setLoading(false);
      return;
    }

    api
      .get(`/api/Course/GetUserCourses?UserId=${userId}`)
      .then((res) => {
        setCourses(res.data?.items || res.data || []);
      })
      .catch(() => {
        setCourses([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 b2 text-text-500">در حال بارگذاری...</p>
    );
  }

  if (!courses.length) {
    return (
      <h2 className="text-center mt-10 text-primary-500">
        شما در دوره‌ای شرکت نکرده‌اید!!
      </h2>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-4 border border-text-500 rounded-4xl bg-bgc-paper">
      <h2 className="text-primary-900 text-center mb-6">دوره‌های من</h2>
      <ul className="flex flex-col gap-4">
        {courses.map((course) => (
          <li
            key={course.id}
            className="flex items-center justify-between border-b border-text-100 pb-3"
          >
            <div>
              <h3 className="b1 text-primary-700">{course.title}</h3>
              <p className="b3 text-text-500">
                تاریخ برگزاری:{" "}
                {new Date(course.timeOfHolding).toLocaleDateString("fa-IR", {
                  timeZone: "Asia/Tehran",
                })}
              </p>
            </div>
            <div className="b1 text-primary-900 font-bold">
              {course.priceInTomans?.toLocaleString("fa-IR")} تومان
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
