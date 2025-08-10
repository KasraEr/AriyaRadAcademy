import { useState } from "react";
// images
import sandwitch from "../../assets/icons/sandwitch.svg";
import exit from "../../assets/icons/exit.svg";
import logo from "../../assets/icons/sandwitch-logo.png";
import call from "../../assets/icons/call.svg";
//react-router-dom
import { NavLink, Link } from "react-router-dom";
//utils
import { getToken } from "../../utils/tokenService";

export default function Sandwitch() {
  const [isShown, setIsShown] = useState(false);

  const token = getToken();

  return (
    <div className="z-5000 justify-self-end sm:hidden">
      <button>
        <img
          src={sandwitch}
          alt=""
          className="cursor-pointer"
          onClick={() => setIsShown(true)}
        />
      </button>
      <div
        className={`${
          isShown ? "right-0" : "-right-full"
        } bg-basic-100 fixed top-0 w-full h-full grid grid-rows-[1fr_5fr_1fr] grid-cols-1 gap-15 transition-[right] ease-in-out duration-[0.4s] p-5`}
      >
        <div className="grid grid-rows-1 grid-cols-[1fr_1fr] place-items-center">
          <img src={logo} alt="" className="w-34 justify-self-start" />
          <button
            className="cursor-pointer justify-self-end"
            onClick={() => setIsShown(false)}
          >
            <img src={exit} alt="" />
          </button>
        </div>
        <ul className="list-none flex flex-col items-start justify-evenly h-70 mb-[330px]">
          <li onClick={() => setIsShown(false)} className="b2 text-primary-500">
            <NavLink to="/">صفحه اصلی</NavLink>
          </li>
          <li onClick={() => setIsShown(false)} className="b2 text-primary-500">
            <NavLink to="/categories">دسته بندی دوره ها</NavLink>
          </li>
          <li onClick={() => setIsShown(false)} className="b2 text-primary-500">
            <NavLink to="/articles">مقالات</NavLink>
          </li>
          <li onClick={() => setIsShown(false)} className="b2 text-primary-500">
            <NavLink to="/about-us">درباره آریاراد</NavLink>
          </li>
          <li onClick={() => setIsShown(false)} className="b2 text-primary-500">
            <NavLink to="/contact-us">تماس با آریاراد</NavLink>
          </li>
          <li onClick={() => setIsShown(false)} className="b2 text-primary-500">
            <NavLink to={token ? "/dashboard" : "/auth"}>
              {token ? "داشبورد" : "ورود / عضویت"}
            </NavLink>
          </li>
        </ul>
        <button className="flex w-full h-10 px-3 py-1 justify-center items-center gap-2 shrink-0 rounded-[50px] bg-primary-500 text-basic-100 m-auto">
          <a target="_blank" href="tel:02634014819">
            ۴۸۱۹ ۴۰۱ ۰۲۶۳
          </a>
          <img src={call} alt="" />
        </button>
      </div>
    </div>
  );
}
