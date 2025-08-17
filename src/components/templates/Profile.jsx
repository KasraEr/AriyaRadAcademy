import { useEffect, useState } from "react";
//utils
import api from "../../utils/config";
import { getToken } from "../../utils/tokenService";
import { showToast } from "../../utils/toast";
//jwt
import { jwtDecode } from "jwt-decode";
//icons
import edit from "../../assets/icons/Edit.svg";
import tick from "../../assets/icons/Tick.svg";

export default function Profile() {
  const [oldData, setOldData] = useState({});

  const [isEditable, setIsEditable] = useState(false);

  const [form, setForm] = useState({
    phoneNumber: "",
    emailAddress: "",
  });

  const token = getToken();
  const { sub } = jwtDecode(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/User/GetById?Id=${sub}`);
        const { id, firstName, lastName, emailAddress, phoneNumber } =
          response.data;
        setOldData({ id, firstName, lastName, emailAddress, phoneNumber });
        setForm({ emailAddress, phoneNumber });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const clickhandler = (e) => {
    e.preventDefault();
    setIsEditable(true);
  };

  const changeHandler = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/api/User/Update", form);
      response?.status === 200 && setIsEditable(false);
      showToast("اطلاعات شما به روزرسانی شد");
    } catch (error) {
      const status = error?.response?.status;
      if (status === 400) {
        showToast("نشد که :( دوباره سعی کن", "error");
      } else {
        console.log(error.message);
        showToast("خطایی رخ داده است. لطفا دوباره تلاش کنید", "error");
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[auto] gap-3">
        <h2 className="text-primary-900 text-center">مشخصات کاربری</h2>
        <form
          className="flex flex-col items-center justify-center gap-4 my-5"
          onSubmit={submitHandler}
        >
          <label
            className="text-primary-900/80 b1 leading-11 text-center"
            htmlFor="firstName"
          >
            نام
          </label>
          <input
            className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-[305px] text-right"
            disabled
            type="text"
            id="firstName"
            placeholder={oldData.firstName}
          />
          <label
            className="text-primary-900/80 b1 leading-11 text-center"
            htmlFor="lastName"
          >
            نام خانوادگی
          </label>
          <input
            className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-[305px] text-right"
            disabled
            type="text"
            id="lastName"
            placeholder={oldData.lastName}
          />
          <label
            className="text-primary-900/80 b1 leading-11 text-center"
            htmlFor="emailAddress"
          >
            ایمیل
          </label>
          <input
            dir="ltr"
            className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-[305px]"
            disabled={isEditable ? false : true}
            type="text"
            name="emailAddress"
            id="emailAddress"
            placeholder={oldData.emailAddress}
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
            dir="ltr"
            className="b2 border border-text-500 bg-basic-100 outline-0 overflow-hidden rounded-[10px] p-2 w-[305px]"
            disabled={isEditable ? false : true}
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder={oldData.phoneNumber}
            value={form.phoneNumber}
            onChange={changeHandler}
          />
          <div className="flex flex-col items-center justify-center gap-3 ml:flex-row ml:gap-2 ml:mt-6">
            <button
              className="flex items-center justify-center gap-1 rounded-[6px] p-2 bg-warning-500 text-basic-100"
              type="button"
              onClick={clickhandler}
            >
              <img src={edit} alt="" />
              ویرایش اطلاعات
            </button>
            <button
              className="flex items-center justify-center gap-1 rounded-[6px] p-2 bg-success-500 text-basic-100"
              type="submit"
            >
              <img src={tick} alt="" />
              ثبت تغییرات
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
