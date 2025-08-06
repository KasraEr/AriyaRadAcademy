import { useEffect, useState } from "react";
//utils
import api from "../../utils/config";
import { getToken } from "../../utils/tokenService";
//jwt
import { jwtDecode } from "jwt-decode";

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
      } catch (error) {
        toast.error("لطفا مجددا امتحان فرمایید", {
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
      const response = await api.put("/api/User/Update", {
        id: oldData.id,
        firstName: oldData.firstName,
        lastName: oldData.lastName,
        phoneNumber: form.phoneNumber,
        emailAddress: form.emailAddress,
      });
      console.log("✅ Update successful:", response.data);
      // return response.data;
    } catch (error) {
      console.error("❌ Update failed:", error.response?.data || error.message);
      // throw error;
    }
  };

  // console.log(oldData.id)

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="firstName">نام</label>
        <input
          className="border"
          disabled
          type="text"
          id="firstName"
          placeholder={oldData.firstName}
        />
        <label htmlFor="lastName">نام خانوادگی</label>
        <input
          className="border"
          disabled
          type="text"
          id="lastName"
          placeholder={oldData.lastName}
        />
        <label htmlFor="emailAddress">ایمیل</label>
        <input
          className="border"
          disabled={isEditable ? false : true}
          type="text"
          name="emailAddress"
          id="emailAddress"
          placeholder={isEditable ? "" : oldData.emailAddress}
          value={form.emailAddress}
          onChange={changeHandler}
        />
        <label htmlFor="phoneNumber">شماره تماس</label>
        <input
          className="border"
          disabled={isEditable ? false : true}
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder={isEditable ? "" : oldData.phoneNumber}
          value={form.phoneNumber}
          onChange={changeHandler}
        />
        <button type="submit" onClick={clickhandler}>
          ویرایش اطلاعات
        </button>
        <button type="submit">ثبت تغییرات</button>
      </form>
    </div>
  );
}
