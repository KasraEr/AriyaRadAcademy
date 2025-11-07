import { useQuery, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import api from "../../utils/config";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Cart() {
  const { token } = useAuth();
  const userId = token ? jwtDecode(token)?.sub : null;
  const queryClient = useQueryClient();

  const {
    data: cart,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const { data } = await api.get(
        `/api/Cart/GetByCartUser?UserId=${userId}`,
        {
          headers: { "Cache-Control": "no-cache" },
        }
      );
      return data;
    },
    enabled: !!userId,
    staleTime: 30_000,
  });

  const handleDelete = async (cartId, itemId) => {
    const prevCart = queryClient.getQueryData(["cart", userId]);

    queryClient.setQueryData(["cart", userId], (current) =>
      current
        ? { ...current, items: current.items.filter((i) => i.id !== itemId) }
        : current
    );

    try {
      await api.delete("/api/Cart/DeleteCartItem", {
        data: { cartId, itemId },
      });
    } catch (err) {
      queryClient.setQueryData(["cart", userId], prevCart);
      console.error("❌ خطا در حذف آیتم:", err.response?.data || err.message);
      alert("خطا در حذف آیتم");
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["cart", userId] });
  };

  const handlePayment = async () => {
    try {
      // ارسال body خالی برای جلوگیری از خطای 415
      const res = await api.post("/api/Cart/CreatePaymentGateway", {});
      const paymentUrl = res.data;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert("لینک پرداخت دریافت نشد");
      }
    } catch (err) {
      console.error(
        "❌ خطا در ایجاد پرداخت:",
        err.response?.data || err.message
      );
      alert("خطا در ایجاد پرداخت");
    }
  };

  if (!userId) {
    return (
      <p className="text-center mt-10 b2 text-text-500">
        برای مشاهده سبد خرید ابتدا وارد شوید.
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="text-center mt-10 b2 text-text-500">در حال بارگذاری...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error?.message || "خطا در بارگذاری سبد خرید"}
      </p>
    );
  }

  if (!cart || !cart.items?.length) {
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
        {cart.items.map((item) => {
          const course = item.course;
          const localDate = new Date(course.timeOfHolding).toLocaleDateString(
            "fa-IR",
            { timeZone: "Asia/Tehran" }
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
                onClick={() => handleDelete(cart.id, item.id)}
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
