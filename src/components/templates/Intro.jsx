//r-r-d
import { Link } from "react-router-dom";

export default function Intro() {
  return (
    <div className="gap-8 grid grid-cols-1 grid-rows-[auto] items-center justify-center ml:max-lg:max-w-[600px] sm:mx-auto lg:order-first">
      <h1 className="text-text-900 text-center lg:text-right ml:text-3xl ml:leading-13 xl:text-5xl xl:leading-20">
        از رویا تا واقعیت
        <br />
        یک دوره فاصله‌ست!
      </h1>
      <p className="b4 ml:b3 ml:leading-8 xl:b2 xl:leading-10 text-text-500 text-justify">
        اینجا یاد می‌گیریم، ولی نه فقط تئوری!
        <br />
        آموزش‌های ما کاملاً پروژه‌محور هستن و روی چالش‌های واقعی دنیای کار تمرکز
        دارن. به‌جای فقط حفظ کردن مفاهیم، همراه با هم‌یارهایی که خودشون در
        شرکت‌های معتبر مشغول به کار هستن، مهارت‌هایی رو تمرین می‌کنی که توی
        بازار کار امروز کاربردی و به‌دردبخورن. دوره‌های ما همیشه به‌روز و منطبق
        بر جدیدترین ترندهای صنعت هستن، چون می‌خوایم وقتی یادگیریت تموم شد،
        آماده‌ی ورود به دنیای حرفه‌ای باشی. وقتشه که به جای فقط یاد گرفتن،
        واقعاً تجربه کنی و مهارت‌هاتو بسازی!
      </p>
      <Link to="/categories" className="self-stretch">
        <button className="text-text-900 border-2 w-full rounded-full hover:bg-text-900 hover:text-text-100 hover:border-0 transition hover:py-1.5 active:bg-text-500 active:text-text-100">
          مشاهده دوره‌ها
        </button>
      </Link>
    </div>
  );
}
