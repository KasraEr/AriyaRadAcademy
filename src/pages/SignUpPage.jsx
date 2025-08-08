import { useState } from "react";
//c-hooks
import useTitle from "../hooks/useTitle";
import api from "../utils/config";
//taostify
import { ToastContainer, toast } from "react-toastify";

export default function SignUpPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
  });

  useTitle("عضویت");

  const changeHandler = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/Auth/Register", form);
      if (response.status === 201) {
        toast.success("به جمع ما خوش آمدی حالا وارد شو 😍", {
          className: "b1",
          bodyClassName: "b1",
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.href = "/auth";
        }, 1600);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        console.warn("⚠️ ثبت‌نام ناموفق: دسترسی غیرمجاز");
        toast.error("اطلاعات وارد شده معتبر نیست", {
          className: "b1",
          bodyClassName: "b1",
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        console.error("❌ خطای ناشناخته:", error.message);
        toast.error("خطایی رخ داده است", {
          className: "b1",
          bodyClassName: "b1",
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <>
      <div className="mt-5 w-full max-w-[725px] mx-auto shadow-[0_3px_8px_rgba(0,0,0,0.24)] rounded-4xl p-4">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center gap-10"
        >
          <label
            className="text-primary-900/80 b1 leading-11 text-center"
            htmlFor="firstName"
          >
            نام
          </label>
          <input
            className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-2xs text-right"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="نام خود را به فارسی وارد کنید"
            value={form.firstName}
            onChange={changeHandler}
          />
          <label
            className="text-primary-900/80 b1 leading-11 text-center"
            htmlFor="lastName"
          >
            نام خانوادگی
          </label>
          <input
            className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-2xs text-right"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="نام خانوادگی خود را به فارسی وارد کنید"
            value={form.lastName}
            onChange={changeHandler}
          />
          <label
            className="text-primary-900/80 b1 leading-11 text-center"
            htmlFor="emailAddress"
          >
            ایمیل
          </label>
          <input
            className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-2xs text-left"
            type="emailAddress"
            id="emailAddress"
            name="emailAddress"
            placeholder="example@example.com"
            value={form.emailAddress}
            onChange={changeHandler}
          />
          <label
            className="text-primary-900/80 b1 leading-11 text-center"
            htmlFor="phoneNumber"
          >
            شماره تماس
          </label>
          <input
            className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-2xs text-left"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="شماره موبایل خود را وارد کنید"
            value={form.phoneNumber}
            onChange={changeHandler}
          />
          <button
            className="bg-primary-500 text-basic-100 hover:bg-primary-100 hover:text-primary-900 active:bg-primary-900 active:text-basic-100 transition outline-0 overflow-hidden rounded-[6px] p-2 w-2xs"
            type="submit"
          >
            ثبت نام
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
