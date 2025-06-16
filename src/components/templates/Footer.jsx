//r-r-d
import { Link } from "react-router-dom";
//images
import linkedin from "/src/assets/images/footer-linkedin.svg";
import whatsapp from "/src/assets/images/footer-whatsapp.svg";
import logo from "/src/assets/images/footer-logo.svg";
import kharazmi from "/src/assets/images/footer-kharazmi.svg";
import instagram from "/src/assets/images/footer-instagram.svg";
import fanni from "/src/assets/images/footer-fanni.svg";

export default function Footer() {
  return (
    <footer className="w-full p-5 bg-linear-to-r from-[#6A11CB] to-primary-500">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 grid-rows-[50px_1fr_1fr_1fr_64px] gap-4 2md:gap-5 2xl:grid-cols-4 2xl:grid-rows-[auto]">
        <ul className="flex 2xl:flex-col items-center justify-between ml:justify-evenly list-none">
          <li className="b2 lg:b1 text-basic-100">
            <Link to="/categories">دسته بندی دوره ها</Link>
          </li>
          <li className="b2 lg:b1 text-basic-100 2xl:order-first">
            <Link to="/">مقالات</Link>
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
            کرج، گلشهر، خیابان درختی (ایثار)، جنب مارال چرم، یاز سنتر، طبقه ۷،
            واحد ۱۱
          </p>
          <h3 className="text-basic-100">۴۸۱۹ ۴۰۱ ۰۲۶۳</h3>
        </div>
        <div className="w-full flex 2xl:flex-col items-center justify-around ml:justify-evenly">
          <a href="#" target="_blank">
            <img src={whatsapp} className="xl:w-12" alt="" />
          </a>
          <a href="#" target="_blank">
            <img src={linkedin} className="xl:w-11" alt="" />
          </a>
          <a target="_blank" href="https://www.instagram.com/ariyarad_academy/">
            <img src={instagram} className="xl:w-14" alt="" />
          </a>
        </div>
        <div className="w-full flex 2xl:flex-col items-center justify-evenly 2xl:gap-2">
          <img src={kharazmi} className="xl:w-25" alt="" />
          <img src={logo} className="xl:w-25" alt="" />
          <img src={fanni} className="xl:w-25" alt="" />
        </div>

        <div className="w-full text-center border-t border-basic-100 pt-3 2xl:col-span-4">
          <p className="b3 lg:b1 text-basic-100 leading-8">
            ساخته شده با ❤️ | کلیه حقوق این سایت برای{" "}
            <br className="2xl:hidden" /> شرکت مسیر توسعه فناوران جوان محفوظ می
            باشد
          </p>
        </div>
      </div>
    </footer>
  );
}
