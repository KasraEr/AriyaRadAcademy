//r-r-d
import { useLocation } from "react-router-dom";
//C-hooks
import useTitle from "../hooks/useTitle.js";
//icons
import teacherIcon from "/src/assets/icons/teacher-icon.svg";
import durationIcon from "/src/assets/icons/duration-icon.svg";
import tosIcon from "/src/assets/icons/tos-icon.svg";
import signUpIcon from "/src/assets/icons/signUp-icon.svg";
import moneyIcon from "/src/assets/icons/money-icon.svg";
import play from "/src/assets/images/play.svg";
//context
import { useImageCache } from "../context/ImageCasheContext.jsx";
//utils
import { formatJalali } from "../utils/formatJalali.js";

export default function CourseDetailPage() {
  const location = useLocation();

  const teacher = location.state?.teacher;

  const courseData = location.state?.courseData;

  const {
    title,
    durationInHours,
    timeOfHolding,
    registrationDeadline,
    priceInTomans,
    description,
    coverImage,
    coverVideo,
    headings,
    prerequisite,
  } = courseData;

  const { fullName, skill, descirption } = teacher;

  useTitle("مشخصات دوره");

  const { getImageUrl } = useImageCache();
  const courseImageUrl = coverImage && getImageUrl(coverImage);
  const teacherImageUrl =
    teacher?.coverImage && getImageUrl(teacher.coverImage);

  const text = headings.split(".");

  return (
    <div className="w-full">
      <div className="border border-text-500 rounded-4xl grid grid-cols-1 place-items-start gap-6 p-4">
        <h2 className="text-primary-900 mx-auto">{title}</h2>
        <div className="w-full ml:grid ml:grid-cols-2 ml:gap-4">
          <img
            src={courseImageUrl}
            className="w-full max-ml:mb-4 ml:order-last rounded-2xl"
            alt={title}
          />
          <div className="flex flex-col items-center justify-evenly gap-9 overflow-hidden border border-text-500 rounded-4xl p-4">
            <div className="flex items-center justify-between w-full">
              <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
                <img src={teacherIcon} alt="" />
                هم‌یار
              </p>
              <p className="subtitle2 text-primary-900 flex items-center justify-center gap-1 pt-4">
                {fullName}
              </p>
            </div>
            <div className="flex items-center justify-between w-full border-t border-text-500">
              <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
                <img src={durationIcon} alt="" />
                مدت زمان
              </p>
              <p className="subtitle2 text-primary-900 flex items-center justify-center gap-1 pt-4">
                {durationInHours.toLocaleString("fa-IR")} ساعت
              </p>
            </div>
            <div className="flex items-center justify-between w-full border-t border-text-500">
              <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
                <img src={tosIcon} alt="" />
                زمان برگزاری
              </p>
              <p className="subtitle2 text-primary-900 flex items-center justify-center gap-1 pt-4">
                {formatJalali(timeOfHolding)}
              </p>
            </div>
            <div className="flex items-center justify-between w-full border-t border-text-500">
              <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
                <img src={signUpIcon} alt="" />
                مهلت ثبت‌نام
              </p>
              <p className="subtitle2 text-primary-900 flex items-center justify-center gap-1 pt-4">
                {formatJalali(registrationDeadline)}
              </p>
            </div>
            <div className="flex items-center justify-between w-full border-t border-text-500">
              <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
                <img src={moneyIcon} alt="" />
                مبلغ
              </p>
              <p className="subtitle2 text-primary-900 flex items-center justify-center gap-1 pt-4">
                {priceInTomans.toLocaleString("fa-IR")} تومان
              </p>
            </div>
            <button className="w-full bg-primary-500 text-basic-100 hover:bg-primary-100 hover:text-primary-900 active:bg-primary-900 active:text-basic-100 transition outline-0 rounded-2xl p-3">
              شرکت در دوره
            </button>
          </div>
        </div>
        <h3 className="text-primary-500 my-3">قراره چی یاد بگیری؟</h3>
        <div className="w-full ml:grid ml:grid-cols-2 ml:gap-4 mb-4">
          <div className="w-full h-[400px] max-ml:mb-4 flex items-center justify-center rounded-4xl bg-contain p-3 bg-repeat-round ml:order-last bg-[url(/src/assets/images/images.png)]">
            <img src={play} className="cursor-pointer rounded-2xl" alt="" />
          </div>
          <p className="b4 ml:b3 text-justify leading-11 h-[400px]">
            {description}
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-5 border-t border-text-500">
          <h3 className="text-primary-500 pt-5">سرفصل‌های دوره</h3>
          <ul className="list-disc leading-9">
            {text.map((item, index) => (
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
              <p className="b1 text-primary-900">
                این دوره هیچ پیش‌نیازی ندارد
              </p>
            ) : (
              prerequisite.split(".").map((item, index) => (
                <li key={index} className="b3 xl:b2 mr-5.5">
                  {item}
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="border-t border-text-500 flex flex-col items-start justify-center gap-4 ml:gap-1">
          <h3 className="text-primary-500 pt-5 mb-4">معرفی هم‌یار</h3>
          <div className="ml:grid ml:grid-cols-[1.3fr_1fr] place-items-center">
            <img
              src={teacherImageUrl}
              className="mx-auto rounded-full size-50 border-2 border-primary-500 ml:order-last"
              alt="عکس هم‌یار"
            />
            <div className="flex flex-col items-start justify-center gap-5">
              <h3 className="text-text-900">{fullName}</h3>
              <p className="b3 xl:b2 text-primary-100">{skill}</p>
              <p className="b3 xl:b2 text-text-900 text-justify leading-9">
                {descirption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
