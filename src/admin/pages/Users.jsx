import { useEffect, useState } from "react";
// utils
import api from "../../utils/config";
import { showToast } from "../../utils/toast";
import { toPersianDigits } from "../../utils/toPersianDigits";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
// components
import Table from "../components/Table";

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
        showToast("دریافت کاربران ناموفق بود", "error");
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete("/api/User/Delete", {
        data: { id },
      });
      showToast("کاربر با موفقیت حذف شد");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("خطا در حذف کاربر:", err);
      showToast("حذف کاربر ناموفق بود", "error");
    }
  };

  const columns = [
    {
      header: "نام کامل",
      accessor: "fullName",
      cell: (row) => `${row.firstName} ${row.lastName}`,
    },
    { header: "ایمیل", accessor: "emailAddress" },
    {
      header: "شماره تماس",
      accessor: "phoneNumber",
      cell: (row) => toPersianDigits(row.phoneNumber),
    },
    { header: "نقش", accessor: "role" },
    {
      header: "وضعیت",
      accessor: "isLockout",
      cell: (row) =>
        row.isLockout ? (
          <span className="text-red-500">غیرفعال</span>
        ) : (
          <span className="text-green-500">فعال</span>
        ),
    },
    {
      header: "آخرین ورود",
      accessor: "lastLogin",
      cell: (row) =>
        toPersianDigits(
          dayjs(row.lastLogin).calendar("jalali").format("YYYY/MM/DD HH:mm")
        ),
    },
    {
      header: "عملیات",
      accessor: "actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button className="text-blue-500">ویرایش</button>
          <button
            className="text-red-500"
            onClick={() => {
              if (window.confirm("آیا مطمئنی که می‌خوای این کاربر حذف بشه؟")) {
                handleDelete(row.id);
              }
            }}
          >
            حذف
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <h3>مدیریت کاربران</h3>
      </div>
      <Table data={users} columns={columns} />
    </>
  );
};

export default Users;
