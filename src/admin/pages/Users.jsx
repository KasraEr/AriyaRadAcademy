import { useEffect, useState } from "react";
import api from "../../utils/config";
import { toPersianDigits } from "../../utils/toPersianDigits";
import { getPersianDate } from "../../utils/getPersianDate";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { ToastContainer, toast } from "react-toastify";

dayjs.extend(jalaliday);

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/api/User/GetPagedFilter")
      .then((res) => {
        setUsers(res.data.queryResult || []);
      })
      .catch((err) => {
        console.error("خطا در دریافت کاربران:", err);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete("/api/User/Delete", {
        data: { id },
      });
      toast.success("کاربر با موفقیت حذف شد", {
        className: "b1",
        bodyClassName: "b1",
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("خطا در حذف کاربر:", err);
      toast.error("حذف کاربر ناموفق بود", {
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
    }
  };

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <h3>مدیریت کاربران</h3>
        <span className="subtitle1">{toPersianDigits(getPersianDate())}</span>
      </div>

      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b">
              <th className="b2 py-2">نام کامل</th>
              <th className="b2 py-2">ایمیل</th>
              <th className="b2 py-2">شماره تماس</th>
              <th className="b2 py-2">نقش</th>
              <th className="b2 py-2">وضعیت</th>
              <th className="b2 py-2">آخرین ورود</th>
              <th className="b2 py-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-200">
                <td className="subtitle2 py-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="subtitle2 py-2">{user.emailAddress}</td>
                <td className="subtitle2 py-2">
                  {toPersianDigits(user.phoneNumber)}
                </td>
                <td className="subtitle2 py-2">{user.role}</td>
                <td className="subtitle2 py-2">
                  {user.isLockout ? (
                    <span className="text-red-500">غیرفعال</span>
                  ) : (
                    <span className="text-green-500">فعال</span>
                  )}
                </td>
                <td className="subtitle2 py-2">
                  {toPersianDigits(
                    dayjs(user.lastLogin)
                      .calendar("jalali")
                      .format("YYYY/MM/DD HH:mm")
                  )}
                </td>
                <td className="subtitle2 py-2 flex gap-2">
                  <button className="text-blue-500">ویرایش</button>
                  <button
                    className="text-red-500"
                    onClick={() => {
                      if (
                        window.confirm(
                          "آیا مطمئنی که می‌خوای این کاربر حذف بشه؟"
                        )
                      ) {
                        handleDelete(user.id);
                      }
                    }}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
};

export default Users;
