// import { useEffect, useState, useRef } from "react";
// import api from "../../utils/config";
// import { Bar } from "react-chartjs-2";
// import { toPersianDigits } from "../../utils/toPersianDigits";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Legend,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Legend,
//   ChartDataLabels
// );

// const Dashboard = () => {

//   const chartRef = useRef(null);

//   useEffect(() => {

//   }, []);

//   const getGradient = (ctx, color1, color2) => {
//     const chart = ctx.chart;
//     const { ctx: canvasCtx, chartArea } = chart;
//     if (!chartArea) return;
//     const gradient = canvasCtx.createLinearGradient(
//       0,
//       chartArea.bottom,
//       0,
//       chartArea.top
//     );
//     gradient.addColorStop(0, color1);
//     gradient.addColorStop(1, color2);
//     return gradient;
//   };

//   const chartData = {
//     labels: [
//       "تعداد کل دانشجوها",
//       "تعداد دانشجوهایی که امروز ثبت نام کردند",
//       "تعداد دوره های فروخته شده تا امروز",
//       "تعداد دوره های فروخته شده روز جاری",
//       "تعداد کل دوره ها",
//     ],
//     datasets: [
//       {
//         label: "آمار کلی",
//         data: [studentCount, courseCount, 12, 5, 6],
//         backgroundColor: (ctx) => {
//           const colors = [
//             ["#0166ff", "#4da3ff"],
//             ["#f49c3e", "#ffc47a"],
//             ["#3bb273", "#78d79a"],
//             ["#fc3d36", "#ff7a73"],
//             ["#0166ff", "#4da3ff"],
//           ];
//           const { dataIndex } = ctx;
//           return getGradient(ctx, colors[dataIndex][0], colors[dataIndex][1]);
//         },
//         borderRadius: 8,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     layout: { padding: 0 },
//     plugins: {
//       legend: { display: false },
//       datalabels: {
//         anchor: "end",
//         align: "start",
//         formatter: (value) => toPersianDigits(value),
//         font: { size: 14, weight: "bold", family: "ariyarad-medium" },
//         color: "#444",
//       },
//       // tooltip: {
//       //   callbacks: {
//       //     label: (context) => `${toPersianDigits(context.parsed.y)} مورد`,
//       //   },
//       // },
//     },
//     scales: {
//       x: {
//         ticks: {
//           font: { family: "ariyarad-medium", size: 15 },
//           color: "#272222",
//         },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: (value) => toPersianDigits(value),
//           font: { family: "ariyarad-light", size: 13, weight: "bold" },
//           color: "#a0a0a0",
//         },
//       },
//     },
//     animation: {
//       duration: 1200,
//       easing: "easeOutBounce",
//     },
//   };

//   return (
//     <>
//       <div className="my-2">
//         <h3>داشبورد مدیریت</h3>
//       </div>
//       <div className="bg-white p-4 rounded shadow h-[870px] w-full">
//         <Bar ref={chartRef} data={chartData} options={chartOptions} />
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import { useEffect, useState, useRef } from "react";
import api from "../../utils/config";
import { Bar } from "react-chartjs-2";
import { toPersianDigits } from "../../utils/toPersianDigits";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  ChartDataLabels
);

const Dashboard = () => {
  const chartRef = useRef(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRegisterToday: 0,
    totalCoursesSold: 0,
    totalCoursesSoldToday: 0,
    totalCourses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/api/User/GetDashboardData");
        if (res?.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("خطا در گرفتن داده داشبورد:", err);
        setError("دریافت اطلاعات با مشکل مواجه شد");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getGradient = (ctx, color1, color2) => {
    const chart = ctx.chart;
    const { ctx: canvasCtx, chartArea } = chart;
    if (!chartArea) return;
    const gradient = canvasCtx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  const chartData = {
    labels: [
      "تعداد کل دانشجوها",
      "ثبت‌نام‌های امروز",
      "کل دوره‌های فروخته شده",
      "دوره‌های فروخته شده امروز",
      "تعداد کل دوره‌ها",
    ],
    datasets: [
      {
        label: "آمار کلی",
        data: [
          stats.totalUsers ?? 0,
          stats.totalRegisterToday ?? 0,
          stats.totalCoursesSold ?? 0,
          stats.totalCoursesSoldToday ?? 0,
          stats.totalCourses ?? 0,
        ],
        backgroundColor: (ctx) => {
          const colors = [
            ["#1e3c72", "#2a5298"], // آبی تیره به آبی روشن
            ["#ff7e5f", "#feb47b"], // نارنجی گرم
            ["#43cea2", "#185a9d"], // سبز فیروزه‌ای به آبی
            ["#ff512f", "#dd2476"], // قرمز به صورتی
            ["#4568dc", "#b06ab3"], // آبی بنفش
          ];
          const { dataIndex } = ctx;
          return getGradient(ctx, colors[dataIndex][0], colors[dataIndex][1]);
        },
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: "end",
        align: "start",
        formatter: (value) => toPersianDigits(value),
        font: { size: 14, weight: "bold", family: "ariyarad-medium" },
        color: "#444",
      },
    },
    scales: {
      x: {
        ticks: {
          font: { family: "ariyarad-medium", size: 15 },
          color: "#272222",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => toPersianDigits(value),
          font: { family: "ariyarad-light", size: 13, weight: "bold" },
          color: "#a0a0a0",
        },
      },
    },
    animation: {
      duration: 1200,
      easing: "easeOutBounce",
    },
  };

  return (
    <>
      <div className="my-2">
        <h3>داشبورد مدیریت</h3>
      </div>
      <div className="bg-white p-4 rounded shadow h-[870px] w-full flex items-center justify-center">
        {loading ? (
          <p>در حال بارگذاری...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Bar ref={chartRef} data={chartData} options={chartOptions} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
