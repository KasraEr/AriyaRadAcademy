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
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  // const [registeryCount, setRegisteryCount] = useState(0);
  // const [payment, setPayment] = useState(0);

  const chartRef = useRef(null);

  useEffect(() => {
    //1- api.get("/api/Course/GetSelectList").then((res) => { //   setStudentCount(res.data.length); // });
    //2- api.get("/api/Course/GetSelectList").then((res) => { //   setCourseCount(res.data.length); // });
    //3- api.get("/api/Course/GetSelectList").then((res) => { //   setCourseCount(res.data.length); // });
    //4- api.get("/api/Course/GetSelectList").then((res) => { //   setCourseCount(res.data.length); // }); }
    setStudentCount(30);
    setCourseCount(7);
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
      "تعداد کل دانشجوهای سایت",
      "تعداد کل دوره‌ها",
      "تعداد ثبت نام های امروز",
      "تعداد دوره های خریداری شده",
      "تعداد دوره های خریداری شده",
    ],
    datasets: [
      {
        label: "آمار کلی",
        data: [studentCount, courseCount, 12, 5, 6],
        backgroundColor: (ctx) => {
          const colors = [
            ["#0166ff", "#4da3ff"],
            ["#f49c3e", "#ffc47a"],
            ["#3bb273", "#78d79a"],
            ["#fc3d36", "#ff7a73"],
            ["#0166ff", "#4da3ff"],
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
    layout: { padding: 0 },
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: "end",
        align: "start",
        formatter: (value) => toPersianDigits(value),
        font: { size: 14, weight: "bold", family: "ariyarad-medium" },
        color: "#444",
      },
      // tooltip: {
      //   callbacks: {
      //     label: (context) => `${toPersianDigits(context.parsed.y)} مورد`,
      //   },
      // },
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
      <div className="bg-white p-4 rounded shadow h-[870px] w-full">
        <Bar ref={chartRef} data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default Dashboard;
