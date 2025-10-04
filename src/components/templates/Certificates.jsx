//images
import fr88 from "/images/frame-88.svg";
import fr89 from "/images/frame-89.svg";
import fr90 from "/images/frame-90.svg";

export default function Certificates() {
  return (
    <div className="w-full ml:max-lg:max-w-[600px] ml:mx-auto grid grid-rows-1 grid-cols-1 lg:grid-flow-col lg:grid-cols-[1fr] xl:grid-cols-[1.2fr] items-center justify-center gap-8 lg:gap-16 xl:gap-24">
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="text-text-900 text-center lg:text-right leading-12">
          مدرکی که فقط کاغذ نیست؛ <br className="lg:hidden" />
          <span className="text-primary-500">اعتبار</span> پشتشه{" "}
        </h2>
        <p className="b4 lg:b3 2xl:b2 lg:leading-10 text-text-900 text-justify">
          مدرک‌هایی که تو آریاراد دریافت می‌کنی، صرفاً یه برگه نیستن که بذاری
          توی پوشه! این مدرک‌ها با نظارت مستقیم{" "}
          <span className="text-primary-500 b2">دانشگاه خوارزمی</span> و{" "}
          <span className="text-primary-500 b2">سازمان فنی و حرفه‌ای</span> کشور
          صادر می‌شن؛ یعنی کاملاً معتبر، قابل استناد و قابل ارائه برای مسیرهای
          شغلی، مهاجرتی و تحصیلی هستن. چه بخوای وارد بازار کار بشی، چه بخوای
          رزومه‌تو قوی‌تر کنی، یا حتی بخوای برای ادامه مسیرت برنامه‌های
          بین‌المللی داشته باشی، این مدرک یه همراه قابل اعتماده. تو آریاراد، ما
          به کیفیت آموزش و ارزش واقعی پشت هر مدرک باور داریم.{" "}
        </p>
      </div>
      <div className="flex items-center justify-between lg:justify-center lg:grid lg:grid-cols-1 lg:grid-rows-1 lg:place-items-center lg:mx-auto">
        <img
          src={fr88}
          loading="lazy"
          className="size-30 xl:size-32 2xl:size-39"
          alt=""
        />
        <img
          src={fr90}
          className="size-30 xl:size-32 2xl:size-39 lg:order-first lg:col-span-2"
          alt=""
          loading="lazy"
        />
        <img
          src={fr89}
          loading="lazy"
          className="size-30 xl:size-32 2xl:size-39"
          alt=""
        />
      </div>
    </div>
  );
}
