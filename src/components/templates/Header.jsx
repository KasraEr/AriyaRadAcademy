//modules
import Sandwitch from "../modules/Sandwitch";
//images
import logo from "/src/assets/images/nav-logo.png";
import logo2 from "/src/assets/images/bigNav-logo.png";
//icons
import login from "/src/assets/icons/login.svg";
//r-r-d
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="w-full">
        <nav className="grid grid-rows-1 grid-cols-[1fr_1fr] place-items-center p-5 bg-linear-to-r from-[#6A11CB] to-primary-500 sm:bg-none sm:grid-cols-[0.85fr_2.1fr_60px] sm:gap-5 ml:grid-cols-[1fr_3fr_70px] lg:grid-cols-[1fr_4fr_70px] xl:grid-cols-[2fr_5fr_1fr]">
          <Link to="/" className="justify-self-start">
            <img src={logo} className="w-34 sm:hidden" alt="" />
            <img
              src={logo2}
              className="hidden sm:inline w-34 ml:w-37 lg:w-42 xl:w-50"
              alt=""
            />
          </Link>
          <Sandwitch />
          <ul className="hidden sm:flex items-center justify-center gap-4 md:gap-[calc(16px+3vw)] lg:gap-[calc(20px+4vw)] list-none">
            <li className="b3 ml:b2 lg:b1 text-primary-900">
              <NavLink
                className="transition hover:text-secondary-900"
                to="/categories"
              >
                <span className="hidden ml:inline">دسته بندی</span> دوره ها
              </NavLink>
            </li>
            <li className="b3 ml:b2 lg:b1 text-primary-900">
              <NavLink
                className="transition hover:text-secondary-900"
                to="/articles"
              >
                مقالات
              </NavLink>
            </li>
            <li className="b3 ml:b2 lg:b1 text-primary-900">
              <NavLink
                className="transition hover:text-secondary-900"
                to="/about-us"
              >
                درباره ما
              </NavLink>
            </li>
            <li className="b3 ml:b2 lg:b1 text-primary-900">
              <NavLink
                className="transition hover:text-secondary-900"
                to="/contact-us"
              >
                تماس با ما
              </NavLink>
            </li>
          </ul>
          <Link
            className="hidden sm:flex w-full sm:max-ml:justify-end lg:justify-end"
            to="/"
          >
            <img
              src={login}
              className="ml:w-7 lg:w-8"
              alt="ورود | عضویت"
              title="ورود | عضویت"
            />
          </Link>
        </nav>
      </header>
    </>
  );
}
