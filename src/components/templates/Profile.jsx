import { useEffect, useState } from "react";
//utils
import api from "../../utils/config";
import { showToast } from "../../utils/toast";
//icons
// import edit from "../../assets/icons/Edit.svg";
// import tick from "../../assets/icons/Tick.svg";

export default function Profile() {
  const [oldData, setOldData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [form, setForm] = useState({
    phoneNumber: "",
    emailAddress: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/User/GetCurrentUser");
        const { id, firstName, lastName, emailAddress, phoneNumber } =
          response.data;

        setOldData({ id, firstName, lastName, emailAddress, phoneNumber });
        setForm({
          emailAddress: emailAddress || "",
          phoneNumber: phoneNumber || "",
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();
    setIsEditable(true);
  };

  const changeHandler = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{8,15}$/;
    if (!emailRegex.test(form.emailAddress)) {
      showToast("ایمیل معتبر نیست", "error");
      return false;
    }
    if (!phoneRegex.test(form.phoneNumber)) {
      showToast("شماره تماس معتبر نیست", "error");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.put("/api/User/Update", form);
      if (response?.status === 200) {
        setIsEditable(false);
        setOldData((prev) => ({ ...prev, ...form }));
        showToast("اطلاعات شما به روزرسانی شد");
      }
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

  // فقط بخش return تغییر کرده
  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-4 border border-text-500 rounded-4xl bg-bgc-paper">
      <h2 className="text-primary-900 text-center mb-6">مشخصات کاربری</h2>
      <form
        className="flex flex-col items-center justify-center gap-4"
        onSubmit={submitHandler}
      >
        {/* نام */}
        <label className="b1 text-primary-900/80" htmlFor="firstName">
          نام
        </label>
        <input
          className="b2 border border-text-500 bg-basic-100 rounded-[10px] p-2 w-[305px] text-right"
          disabled
          type="text"
          id="firstName"
          value={oldData.firstName || ""}
          readOnly
        />

        {/* نام خانوادگی */}
        <label className="b1 text-primary-900/80" htmlFor="lastName">
          نام خانوادگی
        </label>
        <input
          className="b2 border border-text-500 bg-basic-100 rounded-[10px] p-2 w-[305px] text-right"
          disabled
          type="text"
          id="lastName"
          value={oldData.lastName || ""}
          readOnly
        />

        {/* ایمیل */}
        <label className="b1 text-primary-900/80" htmlFor="emailAddress">
          ایمیل
        </label>
        <input
          dir="ltr"
          className="b2 border border-text-500 bg-basic-100 rounded-[10px] p-2 w-[305px]"
          disabled={!isEditable}
          type="text"
          name="emailAddress"
          id="emailAddress"
          value={form.emailAddress}
          onChange={changeHandler}
        />

        {/* شماره تماس */}
        <label className="b1 text-primary-900/80" htmlFor="phoneNumber">
          شماره تماس
        </label>
        <input
          dir="ltr"
          className="b2 border border-text-500 bg-basic-100 rounded-[10px] p-2 w-[305px]"
          disabled={!isEditable}
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          value={form.phoneNumber}
          onChange={changeHandler}
        />

        {/* دکمه‌ها */}
        <div className="flex flex-col items-center justify-center gap-3 ml:flex-row ml:gap-2 ml:mt-6">
          <button
            className="flex items-center justify-center gap-1 rounded-[6px] p-2 bg-warning-500 text-basic-100"
            type="button"
            onClick={clickHandler}
          >
            ویرایش اطلاعات
          </button>
          <button
            className={`flex items-center justify-center gap-1 rounded-[6px] p-2 ${
              isEditable ? "bg-success-500" : "bg-gray-400 cursor-not-allowed"
            } text-basic-100`}
            type="submit"
            disabled={!isEditable}
          >
            ثبت تغییرات
          </button>
        </div>
      </form>
    </div>
  );
}
