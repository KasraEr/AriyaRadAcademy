//components
import Slider from "../modules/Slider";

export default function Environment() {
  return (
    <div className="w-full ml:max-lg:max-w-[600px] mx-auto grid grid-cols-1 grid-rows-[auto_auto_auto] gap-3 xl:gap-6 my-15">
      <h3 className="text-primary-500 text-center lg:text-right">محیط آکادمی</h3>
      <p className="text-text-900 b4 ml:b3 ml:leading-8 xl:b2 xl:leading-10 text-justify">
        اینجا خبری از کلاس‌های شلوغ و پرجمعیت نیست! <br className="sm:hidden" />
        ما فقط ۳ کلاس کاملاً خصوصی، مجهز و آکوستیک داریم و کلاس‌ها فقط با ۵ نفر
        ظرفیت برگزار می‌شه.
      </p>
      <Slider />
    </div>
  );
}
