import Leaflet from "/src/components/templates/Leaflet";
//images
import loc from "/src/assets/icons/location.svg";
import time from "/src/assets/icons/time.svg";
import call from "/src/assets/icons/calling.svg";
import attachment from "/src/assets/icons/attachment.svg";
import whatsappp from "/src/assets/images/whatsappp.svg";
import telegram from "/src/assets/images/telegram.svg";
import email from "/src/assets/images/email.svg";
import instagram from "/src/assets/images/instagram.svg";

export default function ContactUsPage() {
  return (
    <div className="grid grid-cols-1 place-items-start gap-9 mt-3 ml:max-lg:max-w-[600px] ml:max-lg:mx-auto">
      <h2 className="text-primary-500">تماس با ما</h2>
      <Leaflet />
      <h3 className="text-primary-500 flex items-center justify-center gap-2">
        <img src={loc} alt="" />
        آدرس
      </h3>
      <p className="md:b1 b2 text-text-900 leading-7 text-justify lg:mx-auto">
        کرج، گلشهر، خیابان درختی (ایثار)، جنب مارال چرم، یاز سنتر، طبقه ۷، واحد
        ۱۱
      </p>
      <h3 className="text-primary-500 flex items-center justify-center gap-2">
        <img src={time} alt="" />
        ساعت کاری
      </h3>
      <p className="md:b1 b2 text-text-900 m-auto">
        شنبه تا پنج‌شنبه ۰۸:۰۰ الی ۲۰:۰۰
      </p>
      <h3 className="text-primary-500 flex items-center justify-center gap-2">
        <img src={call} alt="" />
        شماره تماس
      </h3>
      <p className="md:b1 b2 text-text-900 m-auto">
        <a target="_blank" href="tel:02634014819">
          ۴۸۱۹ ۴۰۱ ۰۲۶۳
        </a>
      </p>
      <h3 className="text-primary-500 flex items-center justify-center gap-2">
        <img src={attachment} alt="" />
        صفحات مجازی
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr] place-items-center gap-9 mx-auto">
        <a target="_blank" href="https://www.instagram.com/ariyarad_academy/">
          <img src={instagram} alt="" />
        </a>
        <a target="_blank" href="https://wa.me/#">
          <img src={whatsappp} alt="" />
        </a>
        <a target="_blank" href="https://t.me/#">
          <img src={telegram} alt="" />
        </a>
        <a target="_blank" href="#">
          <img src={email} alt="" />
        </a>
      </div>
    </div>
  );
}
