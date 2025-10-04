//images
import hamyar from "/images/teacher.png";

export default function Teacher() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-5 ml:max-lg:max-w-[600px] ml:mx-auto lg:grid lg:grid-flow-col lg:grid-rows-1 lg:grid-cols-[1fr] lg:gap-8 xl:grid-cols-[1.2fr]">
      <img
        src={hamyar}
        alt=""
        loading="lazy"
        className="size-[280px] xl:size-[310px] 2xl:size-[340px] border-2 border-primary-500 rounded-full lg:row-span-2 lg:order-last"
      />
      <h2 className="text-text-900 text-start xl:text-[28px] lg:order-first">
        واژه استاد برای ما غریبه است!
      </h2>
      <p className="lg:order-2 b4 ml:b3 2xl:leading-11 ml:leading-8 xl:leading-9 xl:b2 text-text-900 xl:pl-7 2xl:pl-19 text-justify">
        ما تو آریاراد یه تصمیم مهم گرفتیم.
        <br />
        به جای واژه‌ی خشک و رسمی “استاد” از کلمه‌ی{" "}
        <span className="b2 text-primary-500">هم‌یار</span> استفاده می‌کنیم.
        <br />
        چرا؟ چون باور داریم مسیر یادگیری یه جاده‌ی دوطرفه‌ست؛ نه سخنرانی
        یک‌طرفه!
        <br /> <span className="b2 text-primary-500">هم‌یار</span>های ما نه بالا
        سر، بلکه در کنار تو هستن. نه فقط برای آموزش دادن، بلکه برای همراهی،
        انگیزه دادن و ساختن تجربه‌ای واقعی از یاد گرفتن.
        <span className="b2 text-primary-500">هم‌یار</span> یعنی کسی که خودش راه
        رفته، زمین خورده، دوباره بلند شده و حالا دستتو می‌گیره تا تو مسیرت
        راحت‌تر و با اعتماد به نفس جلو بری. ما به جای جایگاه بالا، به رفاقت تو
        مسیر یادگیری باور داریم. و این دقیقاً همون چیزیه که{" "}
        <span className="b2 text-primary-500">هم‌یار</span>های آریاراد رو متفاوت
        می‌کنه...
      </p>
    </div>
  );
}
