import { useState } from "react";
//c-hooks
import useTitle from "../hooks/useTitle";

export default function SignUpPage() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
  });

  useTitle("عضویت");

  const changeHandler = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="mt-5 w-full max-w-[725px] mx-auto shadow-[0_3px_8px_rgba(0,0,0,0.24)] rounded-4xl p-4">
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center justify-center gap-10"
      >
        <label
          className="text-primary-900/80 b1 leading-11 text-center"
          htmlFor="firstname"
        >
          نام
        </label>
        <input
          className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-2xs text-right"
          type="text"
          id="firstname"
          name="firstname"
          placeholder="نام خود را به فارسی وارد کنید"
          value={form.firstname}
          onChange={changeHandler}
        />
        <label
          className="text-primary-900/80 b1 leading-11 text-center"
          htmlFor="lastname"
        >
          نام خانوادگی
        </label>
        <input
          className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-2xs text-right"
          type="text"
          id="lastname"
          name="lastname"
          placeholder="نام خانوادگی خود را به فارسی وارد کنید"
          value={form.lastname}
          onChange={changeHandler}
        />
        <label
          className="text-primary-900/80 b1 leading-11 text-center"
          htmlFor="email"
        >
          ایمیل
        </label>
        <input
          className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-2xs text-left"
          type="email"
          id="email"
          name="email"
          placeholder="example@example.com"
          value={form.email}
          onChange={changeHandler}
        />
        <label
          className="text-primary-900/80 b1 leading-11 text-center"
          htmlFor="phonenumber"
        >
          شماره تماس
        </label>
        <input
          className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-2xs text-right"
          type="text"
          id="phonenumber"
          name="phonenumber"
          placeholder="شماره موبایل خود را وارد کنید"
          value={form.phonenumber}
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
  );
}
