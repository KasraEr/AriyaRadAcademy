import { useEffect, useState } from "react";
// utils
import api from "../../utils/config";
import { showToast } from "../../utils/toast";
import { toPersianDigits } from "../../utils/toPersianDigits";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
// components
import Table from "../components/Table";
import Modal from "../components/Modal";

dayjs.extend(jalaliday);

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    emailAddress: "",
    role: 0,
  });

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
      await api.delete("/api/User/Delete", { data: { id } });
      showToast("کاربر با موفقیت حذف شد");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("خطا در حذف کاربر:", err);
      showToast("حذف کاربر ناموفق بود", "error");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      phoneNumber: user.phoneNumber || "",
      emailAddress: user.emailAddress || "",
      role: user.role ?? 1,
    });
  };

  const handleUpdate = async () => {
    try {
      await api.put("/api/User/UpdateByAdmin", {
        userId: editingUser.id,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.emailAddress,
        role: Number(formData.role),
      });
      showToast("اطلاعات کاربر با موفقیت ویرایش شد");

      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...u, ...formData, role: Number(formData.role) }
            : u
        )
      );
      setEditingUser(null);
    } catch (err) {
      console.error("خطا در ویرایش کاربر:", err);
      showToast("ویرایش کاربر ناموفق بود", "error");
    }
  };

  const roleLabel = (role) => {
    if (role === 1) return "کاربر عادی";
    if (role === 300) return "مدیر سیستم";
    return role;
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
    {
      header: "نقش",
      accessor: "role",
      cell: (row) => roleLabel(row.role),
    },
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
          <button
            className="text-blue-500"
            onClick={() => handleEditClick(row)}
          >
            ویرایش
          </button>
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
      <div className="flex justify-between items-center my-4" dir="rtl">
        <h3>مدیریت کاربران</h3>
      </div>

      <Table data={users} columns={columns} />

      {editingUser && (
        <Modal onClose={() => setEditingUser(null)} size="lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="space-y-4"
            dir="rtl"
          >
            <h3 className="subtitle2">ویرایش کاربر</h3>

            <div>
              <label className="block mb-1 b2">شماره تماس</label>
              <input
                className="b2 w-full p-2 border rounded-lg"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="شماره تماس"
              />
            </div>

            <div>
              <label className="block mb-1 b2">ایمیل</label>
              <input
                className="b2 w-full p-2 border rounded-lg"
                value={formData.emailAddress}
                onChange={(e) =>
                  setFormData({ ...formData, emailAddress: e.target.value })
                }
                placeholder="ایمیل"
                type="email"
              />
            </div>

            <div>
              <label className="block mb-1 b2">نقش</label>
              <select
                className="b2 w-full p-2 border rounded-lg"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value={0}>لطفا انتخاب کنید</option>
                <option value={1}>کاربر عادی</option>
                <option value={300}>مدیر سیستم</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 border rounded-lg"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                ذخیره
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Users;
