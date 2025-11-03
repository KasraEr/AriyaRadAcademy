import Leaflet from "/src/components/templates/Leaflet";
//images
import loc from "/src/assets/icons/location.svg";
import time from "/src/assets/icons/time.svg";
import call from "/src/assets/icons/calling.svg";
import attachment from "/src/assets/icons/attachment.svg";

//C-hooks
import useTitle from "../hooks/useTitle.js";

export default function ContactUsPage() {
  useTitle("تماس با ما");
  return (
    <div className="grid grid-cols-1 place-items-start gap-9 mt-3 ml:max-lg:max-w-[600px] ml:max-lg:mx-auto">
      <h2 className="text-primary-500">تماس با ما</h2>
      <Leaflet />
      <h3 className="text-primary-500 flex items-center justify-center gap-2">
        <img src={loc} loading="lazy" alt="" />
        آدرس
      </h3>
      <p className="md:b1 b2 text-text-900 leading-7 text-justify lg:mx-auto">
        کرج، گلشهر، خیابان درختی (ایثار)، جنب مارال چرم، یاز سنتر، طبقه ۷، واحد
        ۱۱
      </p>
      <h3 className="text-primary-500 flex items-center justify-center gap-2">
        <img loading="lazy" src={time} alt="" />
        ساعت کاری
      </h3>
      <p className="md:b1 b2 text-text-900 m-auto">
        شنبه تا پنج‌شنبه ۰۸:۰۰ الی ۲۰:۰۰
      </p>
      <h3 className="text-primary-500 flex items-center justify-center gap-2">
        <img loading="lazy" src={call} alt="" />
        شماره تماس
      </h3>
      <p className="md:b1 b2 text-text-900 m-auto">
        <a target="_blank" href="tel:02634014819">
          ۴۸۱۹ ۴۰۱ ۰۲۶۳
        </a>
      </p>
      <h3 className="text-primary-500 flex items-center justify-center gap-2">
        <img loading="lazy" src={attachment} alt="" />
        صفحات مجازی
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr] place-items-center gap-9 mx-auto">
        <a target="_blank" href="https://www.instagram.com/ariyarad_academy/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80px"
            height="80px"
            viewBox="0 0 24 24"
          >
            <path
              fill="#0166ff"
              d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
            ></path>
          </svg>
        </a>
        <a target="_blank" href="https://wa.me/#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80px"
            height="80px"
            viewBox="0 0 24 24"
          >
            <path
              fill="#0166ff"
              d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
            ></path>
          </svg>
        </a>
        <a target="_blank" href="https://t.me/#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80px"
            height="80px"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
              <path
                fill="#0166ff"
                d="M19.777 4.43a1.5 1.5 0 0 1 2.062 1.626l-2.268 13.757c-.22 1.327-1.676 2.088-2.893 1.427c-1.018-.553-2.53-1.405-3.89-2.294c-.68-.445-2.763-1.87-2.507-2.884c.22-.867 3.72-4.125 5.72-6.062c.785-.761.427-1.2-.5-.5c-2.302 1.738-5.998 4.381-7.22 5.125c-1.078.656-1.64.768-2.312.656c-1.226-.204-2.363-.52-3.291-.905c-1.254-.52-1.193-2.244-.001-2.746z"
              ></path>
            </g>
          </svg>
        </a>
        <a target="_blank" href="https://t.me/#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80px"
            height="80px"
            viewBox="0 0 24 24"
          >
            <path
              fill="#0166ff"
              d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
            ></path>
          </svg>
        </a>
        <a target="_blank" href="mailto:info@ariyaradacademy.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={70}
            height={70}
            viewBox="0 0 20 20"
          >
            <path
              fill="#0166ff"
              d="M14.608 12.172c0 .84.239 1.175.864 1.175c1.393 0 2.28-1.775 2.28-4.727c0-4.512-3.288-6.672-7.393-6.672c-4.223 0-8.064 2.832-8.064 8.184c0 5.112 3.36 7.896 8.52 7.896c1.752 0 2.928-.192 4.727-.792l.386 1.607c-1.776.577-3.674.744-5.137.744c-6.768 0-10.393-3.72-10.393-9.456c0-5.784 4.201-9.72 9.985-9.72c6.024 0 9.215 3.6 9.215 8.016c0 3.744-1.175 6.6-4.871 6.6c-1.681 0-2.784-.672-2.928-2.161c-.432 1.656-1.584 2.161-3.145 2.161c-2.088 0-3.84-1.609-3.84-4.848c0-3.264 1.537-5.28 4.297-5.28c1.464 0 2.376.576 2.782 1.488l.697-1.272h2.016v7.057zm-2.951-3.168c0-1.319-.985-1.872-1.801-1.872c-.888 0-1.871.719-1.871 2.832c0 1.68.744 2.616 1.871 2.616c.792 0 1.801-.504 1.801-1.896z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
