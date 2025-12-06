import { Link } from "react-router-dom";
// images
import logo from "/images/footer-logo.svg";
import kharazmi from "/images/footer-kharazmi.svg";
import fanni from "/images/footer-fanni.svg";
import zarin from "/images/1.svg";

export default function Footer() {
  return (
    <footer className="w-full p-5 bg-linear-to-r from-[#6A11CB] to-primary-500">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 grid-rows-[50px_1fr_1fr_1fr_1fr_64px] gap-4 2md:gap-5 2xl:grid-cols-5 2xl:grid-rows-[auto]">
        <ul className="flex 2xl:flex-col items-center justify-between ml:justify-evenly list-none">
          <li className="b2 lg:b1 text-basic-100">
            <Link to="/categories">دسته بندی دوره ها</Link>
          </li>
          <li className="b2 lg:b1 text-basic-100 2xl:order-first">
            <Link to="/articles">مقالات</Link>
          </li>
          <li className="b2 lg:b1 text-basic-100">
            <Link to="/about-us">درباره آریاراد</Link>
          </li>
          <li className="b2 lg:b1 text-basic-100">
            <Link to="/contact-us">تماس با آریاراد</Link>
          </li>
        </ul>

        <div className="w-full flex flex-col items-center justify-evenly gap-4">
          <p className="b4 ml:b3 2md:b2 lg:b1 text-basic-100 text-center 2xl:leading-10">
            کرج، خیابان درختی (ایثار)، جنب مارال چرم، برج یاز، طبقه ۷، واحد ۱۱
          </p>
          <h3 className="text-basic-100">۴۸۱۹ ۴۰۱ ۰۲۶۳</h3>
        </div>

        <div className="w-full flex 2xl:flex-col items-center justify-around ml:justify-evenly">
          <a href="#" target="_blank" rel="noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
              ></path>
            </svg>
          </a>

          <a
            href="https://linkedin.com/company/ariyarad-academy"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="55px"
              height="55px"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
              ></path>
            </svg>
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/ariyarad_academy/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
              ></path>
            </svg>
          </a>
        </div>

        <div className="w-full flex 2xl:flex-col items-center justify-evenly 2xl:gap-2">
          <img
            loading="lazy"
            src={kharazmi}
            className="xl:w-25"
            alt="لوگوی دانشگاه خوارزمی"
          />
          <img
            loading="lazy"
            src={logo}
            className="xl:w-25"
            alt="لوگوی آریاراد"
          />
          <img
            loading="lazy"
            src={fanni}
            className="xl:w-25"
            alt="لوگوی فنی حرفه‌ای"
          />
        </div>

        <div className="w-full flex 2xl:flex-col items-center justify-evenly 2xl:gap-2">
          <div className="trust-logo flex items-center justify-center">
            <a
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=645205&Code=d43UVOtzYNEEvKWmhNTXBVJwKQFnm6ZM"
            >
              <img
                referrerPolicy="origin"
                src="https://trustseal.enamad.ir/logo.aspx?id=645205&Code=d43UVOtzYNEEvKWmhNTXBVJwKQFnm6ZM"
                alt=""
                className="cursor-pointer w-20"
                code="d43UVOtzYNEEvKWmhNTXBVJwKQFnm6ZM"
              />
            </a>
          </div>

          <div className="zarinpal-container flex items-center justify-center min-h-[40px]">
            <a
              href="https://www.zarinpal.com/trustPage/ariyaradacademy.com"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={zarin}
                alt="پرداخت امن زرین پال"
                className="cursor-pointer w-20"
                loading="lazy"
              />
            </a>
          </div>
        </div>

        <div className="w-full text-center border-t border-basic-100 pt-3 2xl:col-span-5">
          <p className="b3 lg:b1 text-basic-100 leading-8">
            ساخته شده با ❤️ | کلیه حقوق این سایت برای{" "}
            <br className="2xl:hidden" /> شرکت مسیر توسعه فناوران جوان محفوظ
            می‌باشد
          </p>
        </div>
      </div>
    </footer>
  );
}
