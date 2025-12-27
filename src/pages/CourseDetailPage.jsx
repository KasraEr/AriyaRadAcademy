import { useMemo } from "react";
//r-r-d
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
// hooks
import useTitle from "../hooks/useTitle.js";
// c-hooks
import { useImageCache } from "../hooks/useImageCache.js";
// utils
import { formatJalali } from "../utils/formatJalali.js";
import api from "../utils/config";
// react-query
import { useQuery, useQueryClient } from "@tanstack/react-query";
// icons
import teacherIcon from "/src/assets/icons/teacher-icon.svg";
import durationIcon from "/src/assets/icons/duration-icon.svg";
import tosIcon from "/src/assets/icons/tos-icon.svg";
import signUpIcon from "/src/assets/icons/signUp-icon.svg";
import moneyIcon from "/src/assets/icons/money-icon.svg";
import play from "/images/play.svg";
//context
import { useAuth } from "../context/AuthContext.jsx";
//jwt
import { jwtDecode } from "jwt-decode";
//r-h-a
import { Helmet } from "react-helmet-async";

export default function CourseDetailPage() {
  const { categorySlug, courseSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const queryClient = useQueryClient();

  useTitle("مشخصات دوره");

  const courseIdFromState = location.state?.courseId;

  const { data: fallbackCourseIdData } = useQuery({
    queryKey: ["courseIdBySlug", categorySlug, courseSlug],
    queryFn: async () => {
      const { data: categories } = await api.get("/api/Category/GetSelectList");
      const category = categories.find(
        (c) => c.name.toLowerCase().replace(/\s+/g, "-") === categorySlug
      );
      if (!category) throw new Error("دسته‌بندی پیدا نشد");

      const { data: courses } = await api.get(
        `/api/Course/GetSelectList?CategoryId=${category.id}`
      );
      const course = courses.find(
        (c) =>
          c.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\u0600-\u06FF\w-]+/g, "") === courseSlug
      );
      if (!course) throw new Error("دوره پیدا نشد");

      return course.id;
    },
    enabled: !courseIdFromState,
  });

  const courseId = courseIdFromState || fallbackCourseIdData;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courseDetail", courseId],
    queryFn: async () => {
      const { data } = await api.get(`/api/Course/GetById?Id=${courseId}`);
      return data;
    },
    enabled: !!courseId,
  });

  const courseData = data;
  const teacher = data?.teacher;

  const {
    id,
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

  const { data: courseImageUrl } = useImageCache(coverImage);
  const { data: teacherImageUrl } = useImageCache(teacherCover);

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

  const slugify = (text) =>
    text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\u0600-\u06FF\w-]+/g, "")
      .replace(/--+/g, "-");

  const clickHandler = async () => {
    if (token) {
      try {
        const payload = { courseId: Number(id) };
        await api.post("/api/Cart/CreateCartItem", payload);

        const userId = jwtDecode(token)?.sub;
        if (userId) {
          queryClient.invalidateQueries({ queryKey: ["cart", userId] });
        }

        navigate("/dashboard/cart");
      } catch (err) {
        console.error(
          "خطا در افزودن به سبد:",
          err.response?.data || err.message
        );
        alert("خطا در افزودن به سبد خرید");
      }
    } else {
      navigate("/auth", {
        state: { redirectTo: "/dashboard/cart", courseId: id },
      });
    }
  };

  if (isLoading) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        {error?.message || "خطا در بارگذاری اطلاعات"}
      </p>
    );
  if (!courseData)
    return <p className="text-center mt-10">داده‌ای برای نمایش وجود ندارد</p>;

  return (
    <>
      <Helmet>
        <title>{title} | آکادمی آریا راد</title>
        <meta
          name="description"
          content={description.substring(0, 150) + "..."}
        />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={description.substring(0, 100)}
        />
        <meta property="og:image" content={courseImageUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="w-full">
        <div className="border border-text-500 rounded-(--card-radius) grid grid-cols-1 gap-6 p-(--card-padding) [--card-radius:var(--radius-4xl)] [--card-padding:--spacing(4)]">
          <h2 className="text-primary-900 mx-auto">{title}</h2>

          <div className="w-full ml:grid ml:grid-cols-2 ml:gap-4">
            <img
              loading="lazy"
              src={courseImageUrl || "/fallback-placeholder.png"}
              className="w-full max-ml:mb-4 ml:order-last rounded-[calc(var(--card-radius)-var(--card-padding))]"
              alt={title}
            />
            <div className="flex flex-col items-center justify-evenly gap-6 overflow-hidden border border-text-500 rounded-[calc(var(--card-radius)-var(--card-padding))] p-4">
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
                <p className="b3 text-primary-500 flex items-center gap-1 pt-4">
                  <img loading="lazy" src={moneyIcon} alt="" /> مبلغ
                </p>
                <p className="subtitle2 text-primary-900 flex items-center gap-1 pt-4">
                  {priceInTomans?.toLocaleString("fa-IR")} تومان
                </p>
              </div>

              <button
                onClick={clickHandler}
                className="w-full bg-primary-500 text-basic-100 hover:bg-primary-100 hover:text-primary-900 active:bg-primary-900 active:text-basic-100 transition outline-0 rounded-[calc(var(--card-radius)-var(--card-padding))] p-3"
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
                alt="play"
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
                className="object-cover aspect-square mx-auto my-4 rounded-full size-52 border-2 border-primary-500 ml:order-last"
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
    </>
  );
}
