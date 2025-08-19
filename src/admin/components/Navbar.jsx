//utils
import { toPersianDigits } from "../../utils/toPersianDigits.js";
import { getPersianDate } from "../../utils/getPersianDate";
//r-r-d
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow px-4 py-2 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-primary-900">پنل ادمین</h1>
      <span className="subtitle1 text-primary-900">
        {toPersianDigits(getPersianDate())}
      </span>
      <div className="flex items-center justify-center gap-4">
        <button
          className="text-success-500 border border-success-500 p-2 rounded-2xl hover:bg-success-500 hover:text-basic-100 transition"
          onClick={() => navigate("/")}
        >
          صفحه اصلی
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/auth";
          }}
          className="text-error-500 border border-error-500 p-2 rounded-2xl hover:bg-error-500 hover:text-basic-100 transition"
        >
          خروج
        </button>
      </div>
    </header>
  );
}
