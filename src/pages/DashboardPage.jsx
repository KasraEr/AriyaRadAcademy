import { useEffect, useMemo } from "react";
// r-r-d
import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
// jwt-decode
import { jwtDecode } from "jwt-decode";
// auth
import { useAuth } from "../context/AuthContext.jsx";
//r-h-a
import { Helmet } from "react-helmet-async";

export default function DashboardPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  const name = useMemo(() => {
    if (!token) return "";
    try {
      const { name } = jwtDecode(token);
      return name || "";
    } catch {
      return "";
    }
  }, [token]);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/profile", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Helmet>
        <title>آکادمی آریاراد | {isDashboardRoute ? "داشبورد" : ""}</title>
        <meta
          name="description"
          content="پنل کاربر که حاوی اطلاعات شخصی و دوره هایی که شرکت کرده است، می باشد"
        />
      </Helmet>

      <div className="w-full ml:max-lg:max-w-[600px] mx-auto border border-text-500 rounded-4xl p-4 flex flex-col items-center justify-center gap-8">
        <h3 className="text-primary-500 text-center my-6">
          <strong>{name} </strong>جان به پنل کاربری خوش آمدید
        </h3>

        <div className="w-full grid grid-cols-1 grid-rows-[auto] gap-8 ml:grid-cols-[1.5fr_5fr] ml:grid-rows-1">
          <div className="w-full ml:place-items-center ml:border-l ml:border-l-basic-900 box-border ml:pt-2">
            <ul className="flex ml:flex-col items-center justify-between gap-3 ml:gap-12">
              <li className="w-full text-right b3">
                <NavLink className="w-full" to="/dashboard/profile">
                  مشخصات
                </NavLink>
              </li>
              <li className="w-full text-center b3">
                <NavLink className="w-full" to="/dashboard/cart">
                  سبد خرید
                </NavLink>
              </li>
              <li className="w-full text-center b3">
                <NavLink className="w-full" to="/dashboard/courses">
                  دوره ها
                </NavLink>
              </li>
              <li className="w-full text-center b3">
                <NavLink className="w-full" to="/dashboard/exit">
                  خروج
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="w-full grid grid-cols-1 grid-rows-1 ml:self-stretch">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
