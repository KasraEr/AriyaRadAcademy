// r-r-d
import { useNavigate } from "react-router-dom";
// auth
import { useAuth } from "../../context/AuthContext.jsx";

export default function Exit() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const exitHandler = () => {
    setToken(null);

    navigate("/", { replace: true });
  };

  return (
    <div className="ml:max-lg:max-w-[600px] w-full grid grid-cols-1 grid-rows-1 place-items-center">
      <button
        onClick={exitHandler}
        className="b2 cursor-pointer rounded-full text-basic-100 bg-secondary-500 w-full max-w-3xl p-3 text-center hover:bg-secondary-100 hover:text-secondary-900 active:bg-secondary-900 active:text-basic-100"
      >
        خروج از حساب کاربری
      </button>
    </div>
  );
}
