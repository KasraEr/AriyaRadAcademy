import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../utils/config";
import { getToken } from "../../utils/tokenService";
import { jwtDecode } from "jwt-decode";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchCart = async () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    const userId = jwtDecode(token)?.sub;
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`/api/Cart/GetByCartUser?UserId=${userId}`, {
        headers: { "Cache-Control": "no-cache" },
      });
      setCartItems(res.data?.items || []);
    } catch {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();

    // گوش دادن به تغییرات سبد
    const onCartChanged = () => fetchCart();
    window.addEventListener("cartChanged", onCartChanged);

    return () => window.removeEventListener("cartChanged", onCartChanged);
  }, []);

  // هر بار مسیر تغییر کرد و روی cart بودیم، دوباره fetch کن
  useEffect(() => {
    if (location.pathname === "/dashboard/cart") {
      fetchCart();
    }
  }, [location.pathname]);

  const handleDelete = async (id) => {
    try {
      await api.delete("/api/Cart/DeleteCartItem", { data: { id } });

      // Optimistic update
      setCartItems((prev) => prev.filter((item) => item.id !== id));

      // اطلاع به بقیه بخش‌ها
      window.dispatchEvent(new Event("cartChanged"));
    } catch (err) {
      console.error("❌ خطا در حذف آیتم:", err.response?.data || err.message);
      alert("خطا در حذف آیتم");
    }
  };

  const handlePayment = async () => {
    try {
      const res = await api.post("/api/Cart/CreatePaymentGateway");
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        alert("لینک پرداخت دریافت نشد");
      }
    } catch {
      alert("خطا در ایجاد پرداخت");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 b2 text-text-500">در حال بارگذاری...</p>
    );
  }

  if (!cartItems.length) {
    return (
      <h2 className="text-center mt-10 text-primary-500">
        سبد خرید شما خالی است!!
      </h2>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-4 border border-text-500 rounded-4xl bg-bgc-paper">
      <h2 className="text-primary-900 text-center mb-6">سبد خرید شما</h2>
      <ul className="flex flex-col gap-4">
        {cartItems.map((item) => {
          const course = item.course;
          const localDate = new Date(course.timeOfHolding).toLocaleDateString(
            "fa-IR",
            {
              timeZone: "Asia/Tehran",
            }
          );
          return (
            <li
              key={item.id}
              className="flex items-center justify-between border-b border-text-100 pb-3"
            >
              <div>
                <h3 className="b1 text-primary-700">{course.title}</h3>
                <p className="b3 text-text-500">زمان برگزاری: {localDate}</p>
                <p className="b1 text-primary-900 font-bold">
                  {course.priceInTomans?.toLocaleString("fa-IR")} تومان
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="b2 bg-error-500 text-basic-100 rounded-lg px-3 py-1 hover:bg-error-900"
              >
                حذف
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-center mt-6">
        <button
          onClick={handlePayment}
          className="b1 bg-success-500 text-basic-100 rounded-full px-6 py-2 hover:bg-success-900"
        >
          پرداخت آنلاین
        </button>
      </div>
    </div>
  );
}
