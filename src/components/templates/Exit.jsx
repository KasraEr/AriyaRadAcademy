//utils
import { removeToken } from "../../utils/tokenService";
//r-r-d
import { useNavigate } from "react-router-dom";

export default function Exit() {
  const navigate = useNavigate();

  const exitHandler = () => {
    removeToken();
    window.dispatchEvent(new Event("tokenChanged"));
    navigate("/", { replace: true });
  };
  return (
    <>
      <div className="flex ml:max-lg:max-w-[600px] mx-auto flex-col items-center justify-center gap-10 w-full">
        <button
          onClick={exitHandler}
          className="b2 cursor-pointer rounded-full text-basic-100 bg-secondary-500 w-full max-w-3xl p-3 text-center hover:bg-secondary-100 hover:text-secondary-900 active:bg-secondary-900 active:text-basic-100"
        >
          خروج از حساب کاربری
        </button>
      </div>
    </>
  );
}
