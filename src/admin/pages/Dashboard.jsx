import { useEffect, useState } from "react";
import api from "../../utils/config";
import { toPersianDigits } from "../../utils/toPersianDigits";
import { showToast } from "../../utils/toast";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRegisterToday: 0,
    totalCoursesSold: 0,
    totalCoursesSoldToday: 0,
    totalCourses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [prevRegisterCount, setPrevRegisterCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/User/GetDashboardData");
        const data = res.data;

        // اگر تعداد ثبت‌نام امروز بیشتر شد → نوتیفیکیشن + بج
        if (data.totalRegisterToday > prevRegisterCount) {
          showToast("✅ کاربر جدید ثبت‌نام کرد!", "success");
        }

        setPrevRegisterCount(data.totalRegisterToday);
        setStats(data);
      } catch (err) {
        console.error("خطا در گرفتن داده داشبورد:", err);
        setError("دریافت اطلاعات با مشکل مواجه شد");
        showToast("❌ دریافت اطلاعات با مشکل مواجه شد", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // هر ۳۰ ثانیه یکبار دوباره چک کن
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [prevRegisterCount]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">📊 داشبورد مدیریت</h2>

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : error ? (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* کل دانشجوها */}
          <div className="bg-blue-100 p-4 rounded-lg shadow text-center relative">
            <h3 className="text-lg font-semibold">👨‍🎓 کل دانشجوها</h3>
            <p className="text-2xl font-bold text-blue-700">
              {toPersianDigits(stats.totalUsers)}
            </p>
          </div>

          {/* ثبت‌نام امروز + بج */}
          <div className="bg-green-100 p-4 rounded-lg shadow text-center relative">
            <h3 className="text-lg font-semibold flex justify-center items-center gap-2">
              📅 ثبت‌نام امروز
              {stats.totalRegisterToday > prevRegisterCount && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                  جدید
                </span>
              )}
            </h3>
            <p className="text-2xl font-bold text-green-700">
              {toPersianDigits(stats.totalRegisterToday)}
            </p>
          </div>

          {/* کل دوره‌ها */}
          <div className="bg-purple-100 p-4 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold">📚 کل دوره‌ها</h3>
            <p className="text-2xl font-bold text-purple-700">
              {toPersianDigits(stats.totalCourses)}
            </p>
          </div>

          {/* فروش امروز */}
          <div className="bg-orange-100 p-4 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold">🔥 فروش امروز</h3>
            <p className="text-2xl font-bold text-orange-700">
              {toPersianDigits(stats.totalCoursesSoldToday)}
            </p>
          </div>

          {/* کل فروش دوره‌ها */}
          <div className="bg-pink-100 p-4 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold">💰 کل فروش دوره‌ها</h3>
            <p className="text-2xl font-bold text-pink-700">
              {toPersianDigits(stats.totalCoursesSold)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
