import { useEffect, useState } from "react";
import api from "../../utils/config";
import { Bar } from "react-chartjs-2";
import { toPersianDigits } from "../../utils/toPersianDigits";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  // const [registeryCount, setRegisteryCount] = useState(0);
  // const [payment, setPayment] = useState(0);

  useEffect(() => {
    //1- api.get("/api/Course/GetSelectList").then((res) => {
    //   setStudentCount(res.data.length);
    // });
    //2- api.get("/api/Course/GetSelectList").then((res) => {
    //   setCourseCount(res.data.length);
    // });
    //3- api.get("/api/Course/GetSelectList").then((res) => {
    //   setCourseCount(res.data.length);
    // });
    //4- api.get("/api/Course/GetSelectList").then((res) => {
    //   setCourseCount(res.data.length);
    // });
  }, []);

  const chartData = {
    labels: [
      "تعداد کل دانشجوهای سایت",
      "تعداد کل دوره‌ها",
      "تعداد ثبت نام های امروز",
      "تعداد دوره های خریداری شده",
    ],
    datasets: [
      {
        label: "آمار کلی",
        data: [30, 7, 12, 5], // ۱۲ و ۵ داده تستی هستن
        backgroundColor: ["#0166ff", "#f49c3e", "#3bb273", "#fc3d36"],
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "ariyarad-medium",
            size: 14,
          },
          color: "#272222",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return toPersianDigits(value);
          },
          font: {
            family: "ariyarad-light",
            size: 12,
          },
          color: "#a0a0a0",
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-between items-center my-2">
        <h3>داشبورد مدیریت</h3>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default Dashboard;
