import { useEffect } from "react";
//utils
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/tokenService";
//jwt-decode
import { jwtDecode } from "jwt-decode";

export default function DashboardPage() {
  const token = getToken();
  const { name } = jwtDecode(token);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard/profile", { replace: true });
  }, []);

  return (
    <>
      <div className="w-full ml:max-lg:max-w-[600px] mx-auto border border-text-500 rounded-4xl p-4 flex flex-col items-center justify-center gap-8">
        <p className="text-primary-500 b4 md:b2 xl:b1 text-center ml:text-right">
          <strong>{name} </strong>جان به پنل کاربری خوش آمدید
        </p>
        <div className="w-full grid grid-cols-1 grid-rows-2 gap-8">
          <div className="w-full">
            <ul className="flex items-center justify-between gap-3">
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
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
