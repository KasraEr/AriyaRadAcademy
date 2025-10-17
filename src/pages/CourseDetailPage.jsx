import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// r-r-d
import { Link } from "react-router-dom";
// C-hooks
import useTitle from "../hooks/useTitle.js";
// icons
import teacherIcon from "/src/assets/icons/teacher-icon.svg";
import durationIcon from "/src/assets/icons/duration-icon.svg";
import tosIcon from "/src/assets/icons/tos-icon.svg";
import signUpIcon from "/src/assets/icons/signUp-icon.svg";
import moneyIcon from "/src/assets/icons/money-icon.svg";
import play from "/images/play.svg";
// context
import { useImageCache } from "../hooks/useImageCache.js";
// utils
import { formatJalali } from "../utils/formatJalali.js";
import api from "../utils/config";
import { getToken } from "../utils/tokenService.js";

export default function CourseDetailPage() {
  const { categorySlug, courseSlug } = useParams();
  // const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = getToken();

  const [teacher, setTeacher] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { getImageUrl } = useImageCache();

  const slugify = (text) =>
    text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\u0600-\u06FF\w-]+/g, "")
      .replace(/--+/g, "-");

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const { data: categories } = await api.get(
          "/api/Category/GetSelectList"
        );
        const category = categories.find(
          (c) => slugify(c.name) === categorySlug
        );
        if (!category) {
          if (!active) return;
          setError("دسته‌بندی پیدا نشد");
          setLoading(false);
          return;
        }
        const { data: courses } = await api.get(
          `/api/Course/GetSelectList?CategoryId=${category.id}`
        );
        const course = courses.find((c) => slugify(c.title) === courseSlug);
        if (!course) {
          if (!active) return;
          setError("دوره پیدا نشد");
          setLoading(false);
          return;
        }

        if (!active) return;
        setCourseData(course);
        const { data: teacherData } = await api.get(
          `/api/Teacher/GetById?Id=${course.teacherId}`
        );
        if (!active) return;
        setTeacher(teacherData);
      } catch (err) {
        if (!active) return;
        setError("خطا در بارگذاری اطلاعات");
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, [categorySlug, courseSlug]);

  useTitle("مشخصات دوره");

  const {
    title,
    durationInHours,
    timeOfHolding,
    registrationDeadline,
    priceInTomans,
    description,
    coverImage,
    headings,
    prerequisite,
  } = courseData || {};

  const teacherFullName = teacher?.fullName || "";
  const teacherSkill = teacher?.skill || "";
  const teacherBio = teacher?.descirption || teacher?.description || "";
  const teacherCover = teacher?.coverImage;

  const courseImageUrl = useMemo(
    () => (coverImage ? getImageUrl(coverImage) : ""),
    [coverImage, getImageUrl]
  );
  const teacherImageUrl = useMemo(
    () => (teacherCover ? getImageUrl(teacherCover) : ""),
    [teacherCover, getImageUrl]
  );

  const syllabusItems = useMemo(
    () =>
      headings
        ? headings
            .split(".")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    [headings]
  );

  const clickHandler = () => {
    if (token) {
      console.log(token);
    } else {
      navigate("/auth");
    }
  };

  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!courseData)
    return <p className="text-center mt-10">داده‌ای برای نمایش وجود ندارد</p>;

  return (
    <div className="w-full">
      <div className="border border-text-500 rounded-4xl grid grid-cols-1 gap-6 p-4">
        <h2 className="text-primary-900 mx-auto">{title}</h2>

        <div className="w-full ml:grid ml:grid-cols-2 ml:gap-4">
          <img
            loading="lazy"
            src={courseImageUrl}
            className="w-full max-ml:mb-4 ml:order-last rounded-2xl"
            alt={title}
          />
          <div className="flex flex-col items-center justify-evenly gap-6 overflow-hidden border border-text-500 rounded-4xl p-4">
            <div className="flex items-center justify-between w-full">
              <p className="b3 text-primary-500 flex items-center gap-1 pt-4">
                <img loading="lazy" src={teacherIcon} alt="" /> هم‌یار
              </p>
              <p className="subtitle2 text-primary-900 flex items-center gap-1 pt-4">
                {teacherFullName}
              </p>
            </div>

            <div className="flex items-center justify-between w-full border-t border-text-500">
              <p className="b3 text-primary-500 flex items-center gap-1 pt-4">
                <img loading="lazy" src={durationIcon} alt="" /> مدت زمان
              </p>
              <p className="subtitle2 text-primary-900 flex items-center gap-1 pt-4">
                {durationInHours?.toLocaleString("fa-IR")} ساعت
              </p>
            </div>

            <div className="flex items-center justify-between w-full border-t border-text-500">
              <p className="b3 text-primary-500 flex items-center gap-1 pt-4">
                <img loading="lazy" src={tosIcon} alt="" /> زمان برگزاری
              </p>
              <p className="subtitle2 text-primary-900 flex items-center gap-1 pt-4">
                {formatJalali(timeOfHolding)}
              </p>
            </div>

            <div className="flex items-center justify-between w-full border-t border-text-500">
              <p className="b3 text-primary-500 flex items-center gap-1 pt-4">
                <img loading="lazy" src={signUpIcon} alt="" /> مهلت ثبت‌نام
              </p>
              <p className="subtitle2 text-primary-900 flex items-center gap-1 pt-4">
                {formatJalali(registrationDeadline)}
              </p>
            </div>

            <div className="flex items-center justify-between w-full border-t border-text-500">
              <p className="b3 text-primary-500 flex items_center gap-1 pt-4">
                <img loading="lazy" src={moneyIcon} alt="" /> مبلغ
              </p>
              <p className="subtitle2 text-primary-900 flex items-center gap-1 pt-4">
                {priceInTomans?.toLocaleString("fa-IR")} تومان
              </p>
            </div>

            <button
              onClick={clickHandler}
              className="w-full bg-primary-500 text-basic-100 hover:bg-primary-100 hover:text-primary-900 active:bg-primary-900 active:text-basic-100 transition outline-0 rounded-2xl p-3"
            >
              شرکت در دوره
            </button>
          </div>
        </div>

        <h3 className="text-primary-500 my-3">قراره چی یاد بگیری؟</h3>
        <div className="w-full ml:grid ml:grid-cols-2 gap-3 ml:gap-4 mb-4">
          <div className="w-full flex h-[400px] items-center justify-center rounded-4xl bg-contain p-3 bg-repeat-round ml:order-last bg-[url(/images/images.png)]">
            <img
              loading="lazy"
              src={play}
              className="cursor-pointer rounded-2xl"
              alt=""
            />
          </div>
          <p className="b3 ml:b2 text-justify leading-10 h-[400px] overflow-y-scroll">
            {description}
          </p>
        </div>

        <div className="flex flex-col items-start w-full gap-5 border-t border-text-500">
          <h3 className="text-primary-500 pt-5">سرفصل‌های دوره</h3>
          <ul className="list-disc leading-9">
            {syllabusItems.map((item, index) => (
              <li className="b3 xl:b2 mr-5.5" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start w-full gap-5 border-t border-text-500">
          <h3 className="text-primary-500 pt-5">پیش‌نیازهای دوره</h3>
          <ul className="list-disc leading-9">
            {prerequisite === "ندارد" ? (
              <p className="flex items-center justify-center gap-2 b1 text-primary-900 before:content-['✅']">
                این دوره پیش نیازی ندارد
              </p>
            ) : (
              prerequisite
                ?.split(".")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((item, index) => (
                  <li key={index} className="b3 xl:b2 mr-5.5">
                    <Link to={`/categories/${categorySlug}/${slugify(item)}`}>
                      دوره {item} ✨
                    </Link>
                  </li>
                ))
            )}
          </ul>
        </div>

        <div className="border-t border-text-500 flex flex-col items-start gap-4">
          <h3 className="text-primary-500 pt-5 mb-4">معرفی هم‌یار</h3>
          <div className="ml:grid ml:grid-cols-[1.3fr_1fr] place-items-center">
            <img
              src={teacherImageUrl}
              loading="lazy"
              className="aspect-square mx-auto my-4 rounded-full size-50 border-2 border-primary-500 ml:order-last"
              alt="عکس هم‌یار"
            />
            <div className="flex flex-col items-start justify-center gap-5">
              <h3 className="text-text-900">{teacherFullName}</h3>
              <p className="b3 xl:b2 text-primary-100">{teacherSkill}</p>
              <p className="b3 xl:b2 text-text-900 text-justify leading-9">
                {teacherBio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
