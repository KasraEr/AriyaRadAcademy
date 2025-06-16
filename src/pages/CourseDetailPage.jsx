//react-router-dom
import { useParams } from "react-router-dom";
//data
import courses from "/src/utils/courses.js";
//icons
import teacherIcon from "/src/assets/icons/teacher-icon.svg";
import durationIcon from "/src/assets/icons/duration-icon.svg";
import tosIcon from "/src/assets/icons/tos-icon.svg";
import signUpIcon from "/src/assets/icons/signUp-icon.svg";
import moneyIcon from "/src/assets/icons/money-icon.svg";
import play from "/src/assets/images/play.svg";

export default function CourseDetailPage() {
  const { category, _title } = useParams();
  const courseDetail = courses?.filter(
    (course) => course.category === category && course.title === _title
  );

  const [data] = courseDetail;

  const {
    image,
    teacherImage,
    teacherCurrentJob,
    teacherDesc,
    title,
    teacher,
    duration,
    tos: { month, year },
    signUp: { d, m, y },
    price,
    headline,
  } = data;

  const text = headline.split(".");

  return (
    <div className="w-full">
      <div className="border border-text-500 rounded-4xl grid grid-cols-1 place-items-start gap-3 p-4">
        <h2 className="text-primary-900 mx-auto">{title}</h2>
        <div className="w-full ml:grid ml:grid-cols-2 ml:gap-4">
          <img
            src={image}
            className="w-full max-ml:mb-4 ml:order-last"
            alt=""
          />
          <div className="flex flex-col items-center justify-evenly gap-6 overflow-hidden border border-text-500 rounded-4xl p-4">
            <div className="flex items-center justify-between w-full">
              <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
                <img src={teacherIcon} alt="" />
                هم‌یار
              </p>
              <p className="subtitle2 text-primary-900 flex items-center justify-center gap-1 pt-4">
                {teacher}
              </p>
            </div>
            <div className="flex items-center justify-between w-full border-t border-text-500">
              <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
                <img src={durationIcon} alt="" />
                مدت زمان
              </p>
              <p className="subtitle2 text-primary-900 flex items-center justify-center gap-1 pt-4">
                {duration} ماه
              </p>
            </div>
            <div className="flex items-center justify-between w-full border-t border-text-500">
              <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
                <img src={tosIcon} alt="" />
                زمان برگزاری
              </p>
              <p className="subtitle2 text-primary-900 flex items-center justify-center gap-1 pt-4">
                {month} {year}
              </p>
            </div>
            <div className="flex items-center justify-between w-full border-t border-text-500">
              <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
                <img src={signUpIcon} alt="" />
                مهلت ثبت‌نام
              </p>
              <p className="subtitle2 text-primary-900 flex items-center justify-center gap-1 pt-4">
                {d} {m} {y}
              </p>
            </div>
            <div className="flex items-center justify-between w-full border-t border-text-500">
              <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
                <img src={moneyIcon} alt="" />
                مبلغ
              </p>
              <p className="subtitle2 text-primary-900 flex items-center justify-center gap-1 pt-4">
                {price.toLocaleString()} تومان
              </p>
            </div>
          </div>
        </div>
        <div className="bg-primary-500 flex flex-col items-center gap-6 w-full p-4 rounded-4xl">
          <p className="subtitle1 text-text-100 text-center leading-13">
            جهت دریافت اطلاعات کامل و ثبت نام در دوره با شماره‌ زیر تماس بگیرید.
          </p>
          <h3 className="text-text-100">۴۸۱۹ ۴۰۱ ۰۲۶۳</h3>
        </div>
        <h3 className="text-primary-500 my-3">قراره چی یاد بگیری؟</h3>
        <div className="w-full ml:grid ml:grid-cols-[1.2fr_1fr] ml:gap-4 mb-4">
          <div className="w-full max-ml:mb-4 flex items-center justify-center rounded-4xl bg-contain p-3 bg-repeat-round ml:order-last bg-[url(/src/assets/images/images.png)]">
            <img
              src={play}
              className="cursor-pointer"
              alt=""
            />
          </div>
          <p className="b4 ml:b3 text-justify leading-9">
            تجربه کاربری (Ux)، یعنی طراحی یه مسیر درست برای کاربر، جوری که
            استفاده از یه محصول دیجیتال (مثل سایت یا اپلیکیشن) برامون راحت،
            لذت‌بخش و بدون سردرگمی باشه. تو UX قراره بفهمیم کاربر چی می‌خواد،
            چطور فکر می‌کنه و چطور می‌تونیم تجربه‌ای براش بسازیم که هم ساده
            باشه، هم مفید. رابط کاربری (Ui) هم اون چیزیه که کاربر مستقیماً
            می‌بینه و باهاش تعامل می‌کنه — مثل دکمه‌ها، رنگ‌ها، فونت‌ها،
            فاصله‌ها، عکس‌ها، آیکون‌ها و طراحی ظاهری صفحات. به زبون ساده: UX
            بیشتر با تحقیق، تحلیل، رفتار کاربر، مسیر استفاده، ساختار صفحات و
            کاربردپذیری سروکار داره. UI با ظاهر و حس کلی کار درگیره؛ اینکه
            همه‌چی چشم‌نواز، مرتب و قابل فهم باشه. تو یه طراحی خوب، UI و UX مثل
            دو بال پروازن؛ اگه یکی‌شون درست کار نکنه، محصول نمی‌تونه بلند شه!
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
        <div className="border-t border-text-500 flex flex-col items-start justify-center gap-4">
          <h3 className="text-primary-500 pt-5 mb-4">معرفی هم‌یار</h3>
          <div className="ml:grid ml:grid-cols-[1.3fr_1fr] place-items-center">
            <img
              src={teacherImage}
              className="mx-auto rounded-full size-50 border-2 border-primary-500 ml:order-last"
              alt=""
            />
            <div className="flex flex-col items-start justify-center gap-5">
              <h3 className="text-text-900">{teacher}</h3>
              <p className="b3 xl:b2 text-primary-100">{teacherCurrentJob}</p>
              <p className="b3 xl:b2 text-text-900 text-justify leading-9">
                {teacherDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
