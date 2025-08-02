import { useRef, useEffect, useState } from "react";
//C-hooks
import useTitle from "../hooks/useTitle.js";
//temps
import SignInPage from "./SignInPage.jsx";

export default function AuthPage() {
  useTitle("ورود یا عضویت");

  const [shown, setShown] = useState(false);
  const [login, setLogin] = useState(null);
  const input = useRef(null);
  const btn = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();
    setShown(true);
    btn.current.innerText = "لطفا منتظر بمانید";
    setLogin(true);
  };

  return (
    <div className="mt-8 w-full max-w-[725px] mx-auto shadow-[0_3px_8px_rgba(0,0,0,0.24)] rounded-4xl p-4 flex flex-col items-center justify-center gap-10">
      <h2 className="text-primary-500">ورود | عضویت</h2>
      <p className="b3 text-text-900/70 text-justify">
        لطفا شماره تماس خود را وارد فرماید
      </p>
      <input
        type="number"
        ref={input}
        placeholder="09000000000"
        className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-2xs text-left appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <div className="bg-primary-500 text-basic-100 hover:bg-primary-100 hover:text-primary-900 active:bg-primary-900 active:text-basic-100 transition outline-0 overflow-hidden rounded-[6px] p-1 w-2xs flex items-center justify-center">
        <button
          type="button"
          onClick={clickHandler}
          ref={btn}
          disabled={shown ? true : false}
        >
          بررسی و ادامه
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
      <p className="subtitle3 text-text-900/70 font-semibold text-justify w-2xs leading-7 before:content-['*']">
        اگر قبلا ثبت نام نکرده باشید، برای ادامه فرایند به صفحه ثبت نام منتقل
        خواهید شد.
      </p>
      {!!login && <SignInPage setLogin={setLogin} setShown={setShown} />}
    </div>
  );
}
