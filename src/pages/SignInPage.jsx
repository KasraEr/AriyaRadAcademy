import { useRef, useEffect } from "react";
//C-hooks
import useTitle from "../hooks/useTitle.js";

export default function SignInPage({ setLogin }) {
  useTitle("ورود");

  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <>
      <div className="z-5001 w-full h-full fixed left-0 top-0 backdrop-blur-[4px]">
        <span
          onClick={() => setLogin(null)}
          className="inline-block size-8 text-center mr-4 mt-4 leading-8 text-xl font-bold cursor-pointer text-secondary-900 bg-secondary-100 border-text-500 rounded-xl"
        >
          X
        </span>
        <div className="m-auto flex flex-col items-center justify-center gap-5 bg-amber-100 w-fit p-5 rounded-2xl h-60 mt-40">
          <h3 className="text-primary-900/80 leading-11 text-center">
            کد تایید ارسال شده را وارد فرمایید
          </h3>
          <input
            type="text"
            ref={input}
            placeholder="*****"
            className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-2xs text-left"
          />
          <button
            onClick={() => {
              console.log(input.current.value);
            }}
            className="bg-primary-500 text-basic-100 hover:bg-primary-100 hover:text-primary-900 active:bg-primary-900 active:text-basic-100 transition outline-0 overflow-hidden rounded-[6px] p-2 w-2xs"
          >
            ورود
          </button>
        </div>
      </div>
    </>
  );
}
