import { useRef, useEffect } from "react";
//C-hooks
import useTitle from "../hooks/useTitle.js";
//r-r-d
import { useLocation } from "react-router-dom";
//utils
import api from "../utils/config.js";
//toastify
import { ToastContainer, toast } from "react-toastify";

export default function SignInPage() {
  useTitle("ورود");

  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber;

  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/Auth/Login", {
        phoneNumber,
        otpCode: input.current.value,
        rememberMe: true,
      });
      if (response?.status === 201) {
        // navigate("/auth/sign-in");
        console.log("first");
        toast.success("ورود قهرمانانه شمارو تبریک میگیم", {
          className: "b1",
          bodyClassName: "b1",
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 400) {
        // navigate("/auth/sign-up");
        console.log(error.message);
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
            لطفا کد ارسال شده به شماره {phoneNumber} را وارد فرمایید.
          </label>
          <input
            className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-2xs text-left"
            type="text"
            id="firstName"
            ref={input}
            placeholder="******"
          />
          <button
            className="bg-primary-500 text-basic-100 hover:bg-primary-100 hover:text-primary-900 active:bg-primary-900 active:text-basic-100 transition outline-0 overflow-hidden rounded-[6px] p-2 w-2xs"
            type="submit"
          >
            ورود
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
