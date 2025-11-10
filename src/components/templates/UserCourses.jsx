import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import api from "../../utils/config";
import { useQuery, useQueries } from "@tanstack/react-query";

export default function UserCourses() {
  const { token } = useAuth();
  const user = token ? jwtDecode(token) : null;
  const userId = user?.sub;

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await api.get(`/api/Order/SelectListByUserId`);
      return (res.data || []).filter((o) => o.items?.length > 0);
    },
    enabled: !!userId,
  });

  const courseIds =
    orders?.flatMap((o) => o.items.map((i) => i.courseId)) || [];

  const courseQueries = useQueries({
    queries: courseIds.map((id) => ({
      queryKey: ["course", id],
      queryFn: async () => {
        const res = await api.get(`/api/Course/GetById?Id=${id}`);
        return res.data;
      },
    })),
  });

  const coursesLoading = courseQueries.some((q) => q.isLoading);
  const courses = courseQueries.map((q) => q.data).filter(Boolean);

  if (ordersLoading || coursesLoading) {
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
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="font-bold text-primary-900 text-center mb-6">
        دوره‌های من
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-text-200 rounded-xl">
          <thead className="bg-primary-100">
            <tr>
              <th className="p-3 text-center text-primary-900 font-semibold border-b border-text-200 b2">
                عنوان دوره
              </th>
              <th className="p-3 text-center text-primary-900 font-semibold border-b border-text-200 b2">
                مدت زمان (ساعت)
              </th>
              <th className="p-3 text-center text-primary-900 font-semibold border-b border-text-200 b2">
                سطح دوره
              </th>
              <th className="p-3 text-center text-primary-900 font-semibold border-b border-text-200 b2">
                قیمت
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-primary-50 transition-colors"
              >
                <td className="text-center p-3 border-b border-text-100 text-text-900 b2">
                  {course.title}
                </td>
                <td className="text-center p-3 border-b border-text-100 text-text-900 b2">
                  {course.durationInHours}
                </td>
                <td className="text-center p-3 border-b border-text-100 text-text-900 b2">
                  {course.difficulty === "introductory"
                    ? "مقدماتی"
                    : course.difficulty === "advanced"
                    ? "پیشرفته"
                    : course.difficulty}
                </td>
                <td className="text-center p-3 border-b border-text-100 text-primary-900 font-bold b2">
                  {course.priceInTomans?.toLocaleString("fa-IR")} تومان
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
