//temps
import Slider from "/src/components/modules/Slider";

export default function AboutUsPage() {
  return (
    <div className="grid grid-cols-1 place-items-start gap-8 xl:gap-10 mt-3 ml:max-lg:max-w-[600px] mx-auto">
      <h3 className="text-primary-500">معرفی آکادمی آریاراد</h3>
      <p className="ml:text-pretty b2 xl:b1 text-text-900 text-justify leading-6">
        آریاراد یه آکادمی ساده و صمیمیه، با یه هدف جدی: یادگیری واقعی، به دور
        از شعار و شلوغی.
      </p>
      <p className="ml:text-pretty b2 xl:b1 text-text-900 text-justify leading-6">
        ما از دل تجربه‌های خودمون اومدیم. اعضای تیم آریاراد سال‌ها خودشون سر
        کلاس‌های مختلف نشستن، آموزش دیدن و آموزش دادن تا بالاخره رسیدن به این
        نقطه که فهمیدن کمبودهای فضاهای آموزشی چی بوده.
      </p>
      <p className="ml:text-pretty b2 xl:b1 text-text-900 text-justify leading-6">
        همه‌چی تو آریاراد کوچیک‌تر، ولی عمیق‌تره. سه کلاس خصوصی ۵ نفره داریم که
        توش آموزش به‌ شکل واقعی اتفاق می‌افته. اینجا قراره باهم تمرین کنیم،
        پروژه‌های واقعی بسازیم و در مسیر رشد کنیم.
      </p>
      <p className="ml:text-pretty b2 xl:b1 text-text-900 text-justify leading-6">
        ما آریاراد رو ساختیم تا یه فضای امن برای تجربه، اشتباه کردن، سوال پرسیدن
        و ساختن باشه. اینجا، کسی تنها نمی‌مونه. چون باور داریم یادگیری وقتی
        معناداره که باهم، اتفاق بیفته.
      </p>
      <h3 className="text-primary-500">محیط آموزشگاه</h3>
      <Slider />
    </div>
  );
}
