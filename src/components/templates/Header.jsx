// import { useState, useEffect } from "react";
// //modules
// import Sandwitch from "../modules/Sandwitch";
// //images
// import logo from "/images/nav-logo.png";
// import logo2 from "/images/bigNav-logo.png";
// //r-r-d
// import { Link, NavLink } from "react-router-dom";
// //utils
// import { getToken } from "../../utils/tokenService";
// import { isAdmin } from "../../utils/authGuard";

// export default function Header() {
//   const [token, setToken] = useState(getToken());
//   const [admin, setAdmin] = useState(isAdmin());

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setToken(getToken());
//       setAdmin(isAdmin());
//     };

//     window.addEventListener("tokenChanged", handleStorageChange);
//     return () =>
//       window.removeEventListener("tokenChanged", handleStorageChange);
//   }, []);

//   return (
//     <>
//       <header className="w-full">
//         <nav className="grid grid-rows-1 grid-cols-[1fr_1fr] place-items-center p-5 bg-linear-to-r from-[#6A11CB] to-primary-500 sm:bg-none sm:grid-cols-[0.83fr_2.1fr_0.8fr] sm:gap-5 ml:grid-cols-[1fr_3fr_1fr] lg:grid-cols-[1fr_4fr_1fr] xl:grid-cols-[2fr_5fr_1fr]">
//           <Link to="/" className="justify-self-start">
//             <img src={logo} className="w-34 sm:hidden" alt="" loading="lazy" />
//             <img
//               src={logo2}
//               loading="lazy"
//               className="hidden sm:inline w-34 ml:w-37 lg:w-42 xl:w-50"
//               alt=""
//             />
//           </Link>
//           <Sandwitch />
//           <ul className="hidden sm:flex items-center justify-center gap-4 md:gap-[calc(16px+3vw)] lg:gap-[calc(20px+4vw)] list-none">
//             <li className="b3 ml:b2 lg:b1 text-primary-900">
//               <NavLink
//                 className="transition hover:text-secondary-900"
//                 to="/categories"
//               >
//                 <span className="hidden ml:inline">دسته بندی</span> دوره ها
//               </NavLink>
//             </li>
//             <li className="b3 ml:b2 lg:b1 text-primary-900">
//               <NavLink
//                 className="transition hover:text-secondary-900"
//                 to="/articles"
//               >
//                 مقالات
//               </NavLink>
//             </li>
//             <li className="b3 ml:b2 lg:b1 text-primary-900">
//               <NavLink
//                 className="transition hover:text-secondary-900"
//                 to="/about-us"
//               >
//                 درباره ما
//               </NavLink>
//             </li>
//             <li className="b3 ml:b2 lg:b1 text-primary-900">
//               <NavLink
//                 className="transition hover:text-secondary-900"
//                 to="/contact-us"
//               >
//                 تماس با ما
//               </NavLink>
//             </li>
//           </ul>

//           <Link
//             className={`${
//               token
//                 ? "bg-primary-500 text-basic-100 hover:bg-primary-100 hover:text-primary-900"
//                 : "bg-secondary-500 text-basic-100 hover:bg-secondary-100 hover:text-secondary-900"
//             } hidden sm:inline b4 ml:b2 lg:b1 p-1 rounded-2xl transition xmd:justify-self-end xmd:p-2`}
//             to={token ? (admin ? "/admin" : "/dashboard") : "/auth"}
//             aria-current="page"
//           >
//             {token ? (admin ? "ادمین پنل" : "داشبورد") : "ورود/عضویت"}
//           </Link>
//         </nav>
//       </header>
//     </>
//   );
// }

//modules
import Sandwitch from "../modules/Sandwitch";
//images
import logo from "/images/nav-logo.png";
import logo2 from "/images/bigNav-logo.png";
//r-r-d
import { Link, NavLink } from "react-router-dom";
//auth
import { useAuth } from "../../context/AuthContext.jsx";
import { useIsAdmin } from "../../utils/authGuard.js";

export default function Header() {
  const { token } = useAuth();
  const admin = useIsAdmin();

  return (
    <header className="w-full">
      <nav className="grid grid-rows-1 grid-cols-[1fr_1fr] place-items-center p-5 bg-linear-to-r from-[#6A11CB] to-primary-500 sm:bg-none sm:grid-cols-[0.83fr_2.1fr_0.8fr] sm:gap-5 ml:grid-cols-[1fr_3fr_1fr] lg:grid-cols-[1fr_4fr_1fr] xl:grid-cols-[2fr_5fr_1fr]">
        <Link to="/" className="justify-self-start">
          <img src={logo} className="w-34 sm:hidden" alt="" loading="lazy" />
          <img
            src={logo2}
            loading="lazy"
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
          className={`${
            token
              ? "bg-primary-500 text-basic-100 hover:bg-primary-100 hover:text-primary-900"
              : "bg-secondary-500 text-basic-100 hover:bg-secondary-100 hover:text-secondary-900"
          } hidden sm:inline b4 ml:b2 lg:b1 p-1 rounded-2xl transition xmd:justify-self-end xmd:p-2`}
          to={token ? (admin ? "/admin" : "/dashboard") : "/auth"}
          aria-current="page"
        >
          {token ? (admin ? "ادمین پنل" : "داشبورد") : "ورود/عضویت"}
        </Link>
      </nav>
    </header>
  );
}
