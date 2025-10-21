import { useState, useEffect, useMemo } from "react";
//icons
import teacherIcon from "/src/assets/icons/teacher-icon.svg";
import durationIcon from "/src/assets/icons/duration-icon.svg";
import tosIcon from "/src/assets/icons/tos-icon.svg";
import signUpIcon from "/src/assets/icons/signUp-icon.svg";
import moneyIcon from "/src/assets/icons/money-icon.svg";
//react-router-dom
import { useNavigate } from "react-router-dom";
//utils
import { formatJalali } from "../../utils/formatJalali";
import api from "../../utils/config";
//hooks
import { useImageCache } from "../../hooks/useImageCache";

export default function Card({ courseData }) {
  const [teacher, setTeacher] = useState({});
  const [getCat, setGetCat] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { getImageUrl, ready } = useImageCache();

  const slugify = (text) =>
    text
      ?.toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\u0600-\u06FF\w-]+/g, "")
      .replace(/--+/g, "-");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teacherRes, catRes] = await Promise.all([
          api.get(`/api/Teacher/GetById?Id=${courseData.teacherId}`),
          api.get(`/api/Category/GetById?Id=${courseData.categoryId}`),
        ]);
        setTeacher(teacherRes.data);
        setGetCat(catRes.data);
      } catch (err) {
        console.error("خطا در دریافت اطلاعات کارت:", err.message);
        setError("خطا در بارگذاری اطلاعات کارت");
      }
    };
    fetchData();
  }, [courseData.teacherId, courseData.categoryId]);

  const imageUrl = useMemo(
    () =>
      courseData?.coverImage
        ? getImageUrl(courseData.coverImage) || "/fallback-placeholder.png"
        : "/fallback-placeholder.png",
    [courseData?.coverImage, getImageUrl]
  );

  if (!ready) {
    return (
      <div className="w-full h-[400px] bg-basic-200 animate-pulse rounded-2xl" />
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 border border-red-500 rounded-2xl text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center gap-6 overflow-hidden border border-text-500 rounded-4xl w-full p-5 ml:my-5 ml:min-h-[calc(600px+8%)]">
      <img
        src={imageUrl}
        alt={courseData.title}
        className="w-full rounded-[8px]"
        loading="lazy"
      />
      {courseData?.type === "online" && (
        <span className="b4 bg-error-500 text-basic-100 rounded-[8px] absolute top-2 right-2 flex items-center justify-center p-1">
          آنلاین
        </span>
      )}
      <h3 className="text-[21px]">{courseData.title}</h3>

      <div className="flex items-center justify-between w-full border-t border-text-500">
        <p className="b3 text-primary-500 flex items-center gap-1 pt-4">
          <img src={teacherIcon} loading="lazy" alt="" /> هم‌یار
        </p>
        <p className="subtitle2 text-primary-900 flex items-center gap-1 pt-4">
          {teacher.fullName || "نامشخص"}
        </p>
      </div>

      <div className="flex items-center justify-between w-full border-t border-text-500">
        <p className="b3 text-primary-500 flex items-center gap-1 pt-4">
          <img src={durationIcon} loading="lazy" alt="" /> مدت زمان
        </p>
        <p className="subtitle2 text-primary-900 flex items-center gap-1 pt-4">
          {courseData.durationInHours?.toLocaleString("fa-IR") || 0} ساعت
        </p>
      </div>

      <div className="flex items-center justify-between w-full border-t border-text-500">
        <p className="b3 text-primary-500 flex items-center gap-1 pt-4">
          <img src={tosIcon} loading="lazy" alt="" /> زمان برگزاری
        </p>
        <p className="subtitle2 text-primary-900 flex items-center gap-1 pt-4">
          {formatJalali(courseData.timeOfHolding)}
        </p>
      </div>

      <div className="flex items-center justify-between w-full border-t border-text-500">
        <p className="b3 text-primary-500 flex items-center gap-1 pt-4">
          <img src={signUpIcon} loading="lazy" alt="" /> مهلت ثبت‌نام
        </p>
        <p className="subtitle2 text-primary-900 flex items-center gap-1 pt-4">
          {formatJalali(courseData.registrationDeadline)}
        </p>
      </div>

      <div className="flex items-center justify-between w-full border-t border-text-500">
        <p className="b3 text-primary-500 flex items-center gap-1 pt-4">
          <img src={moneyIcon} loading="lazy" alt="" /> مبلغ
        </p>
        <p className="subtitle2 text-primary-900 flex items-center gap-1 pt-4">
          {courseData.priceInTomans?.toLocaleString("fa-IR") || 0} تومان
        </p>
      </div>

      <button
        onClick={() => {
          navigate(`/categories/${getCat?.name}/${slugify(courseData.title)}`, {
            state: { teacher, courseData },
          });
        }}
        className="bg-primary-500 text-basic-100 w-full rounded-full hover:bg-primary-100 hover:text-primary-500 active:bg-primary-900 active:text-text-100 transition"
      >
        مشاهده اطلاعات
      </button>
    </div>
  );
}
