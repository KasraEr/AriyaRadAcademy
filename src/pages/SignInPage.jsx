import { useRef, useEffect, useState } from "react";
//C-hooks
import useTitle from "../hooks/useTitle.js";
//r-r-d
import { useLocation } from "react-router-dom";
//utils
import api from "../utils/config.js";
import { setToken } from "../utils/tokenService.js";
//toastify
import { ToastContainer, toast } from "react-toastify";

export default function SignInPage() {
  useTitle("ورود");

  const [shown, setShown] = useState(false);

  const btn = useRef(null);

  const location = useLocation();

  const phoneNumber = location.state?.phoneNumber;

  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (shown) return;
    setShown(true);
    btn.current.innerText = "لطفا منتظر بمانید";
    try {
      const response = await api.post("/api/Auth/Login", {
        phoneNumber,
        otpCode: input.current.value,
        rememberMe: false,
      });
      if (response?.status === 201) {
        setToken(response.data.token);
        toast.success("ورود قهرمانانه شمارو تبریک میگیم", {
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
          window.location.href = "/dashboard";
        }, 1600);
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 400) {
        toast.error("کد صحیح نیست. دوباره تلاش کنید.", {
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
        console.log(error.message);
        setShown(false);
        btn.current.innerText = "ورود";
        toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید", {
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

  const maskedPhone = phoneNumber?.replace(
    /^(\d{2})\d{5}(\d{4})$/,
    "$1*****$2"
  );

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
            لطفا کد ارسال شده به شماره <span dir="ltr">{maskedPhone}</span> را
            وارد فرمایید.
          </label>
          <input
            className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-2xs text-left"
            type="text"
            id="firstName"
            ref={input}
            placeholder="******"
          />

          <div className="bg-primary-500 text-basic-100 hover:bg-primary-100 hover:text-primary-900 active:bg-primary-900 active:text-basic-100 transition outline-0 overflow-hidden rounded-[6px] p-1 w-2xs flex items-center justify-center">
            <button type="submit" ref={btn} disabled={shown ? true : false}>
              ورود
            </button>
            <svg
              className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white ${
                shown ? "block" : "hidden"
              }`}
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
