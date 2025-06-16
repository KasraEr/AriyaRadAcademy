//react-router-dom
import { Link } from "react-router-dom";
//images
import notFound from "/src/assets/images/404.png";
//C-hooks
import useTitle from "../hooks/useTitle.js";

export default function NotFoundPage() {
  useTitle("صفحه مورد نظر یافت نشد");
  return (
    <div className="flex ml:max-lg:max-w-[600px] mx-auto flex-col items-center justify-center gap-10 w-full">
      <img src={notFound} className="rounded-2xl xl:w-4xl" alt="" />
      <h2 className="text-secondary-900 ">متاسفیم! گشتیم نبود، نگرد نیست.</h2>
      <Link
        to="/"
        className="b2 cursor-pointer rounded-full text-basic-100 bg-secondary-500 w-full max-w-3xl p-3 text-center hover:bg-secondary-100 hover:text-secondary-900 active:bg-secondary-900 active:text-basic-100"
      >
        صفحه اصلی
      </Link>
    </div>
  );
}
