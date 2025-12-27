import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../utils/config";
import { Helmet } from "react-helmet-async";

export default function VerifyPage() {
  const [message, setMessage] = useState("در حال بررسی نتیجه پرداخت ...");
  const [paymentId, setPaymentId] = useState(null);
  const [searchParams] = useSearchParams();
  const authority = searchParams.get("Authority");
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await api.post("/api/Cart/VerifyPayment", { authority });

        if (res.status === 200) {
          const refId = res.data;
          const payId = refId?.toString().slice(0, -2);
          setPaymentId(payId);
          setMessage("✅ پرداخت شما با موفقیت تایید شد");
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setMessage("❌ پرداخت ناموفق بود");
        } else {
          setMessage("⚠️ خطا در بررسی پرداخت");
        }
        console.error(error);
      }
    };

    if (authority) {
      verifyPayment();
    } else {
      setMessage("پارامتر Authority یافت نشد");
    }
  }, [authority]);

  if (!open) return null;

  const clickHandler = () => {
    setOpen(false);
    navigate("/dashboard/courses");
  };

  return (
    <>
      <Helmet>
        <title>آکادمی آریاراد | وضعیت پرداخت </title>
        <meta
          name="description"
          content="صفحه مربوط به وضعیت پرداخت کاربر مربوط به خرید دوره"
        />
      </Helmet>

      <div className="fixed inset-0 backdrop-blur-xs grid place-items-center z-50 p-5 w-full mx-auto">
        <div className="border border-text-500 rounded-2xl bg-text-500/20 flex flex-col items-center w-full max-w-[700px] h-[200px] justify-evenly">
          <h2 className="text-lg font-bold mb-4">{message}</h2>
          {paymentId && (
            <p className="b1 text-green-700 font-bold">
              شناسه پرداخت : {paymentId}
            </p>
          )}
          <button
            onClick={clickHandler}
            className="px-4 py-2 bg-primary-500 text-basic-100 rounded-lg hover:bg-primary-900 transition"
          >
            بستن
          </button>
        </div>
      </div>
    </>
  );
}
