import { useEffect, useState } from "react";
import api from "../../utils/config";
import { showToast } from "../../utils/toast";
import { toPersianDigits } from "../../utils/toPersianDigits";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
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

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    api
      .get("/api/User/GetPagedFilter", {
        params: {
          PageNumber: page,
          PageSize: pageSize,
          NeedTotalCount: true,
        },
      })
      .then((res) => {
        setUsers(res.data.queryResult || []);
      })
      .catch((err) => {
        console.error("خطا در دریافت کاربران:", err);
        showToast("دریافت کاربران ناموفق بود", "error");
      });
  }, [page]);

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

  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName}`.includes(searchTerm.trim())
  );

  const columns = [
    {
      header: "شناسه",
      accessor: "id",
      cell: (row) => toPersianDigits(row.id),
    },
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
        <button className="text-blue-500" onClick={() => handleEditClick(row)}>
          ویرایش
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center my-4" dir="rtl">
        <h3 className="subtitle2">مدیریت کاربران</h3>
      </div>

      <div className="flex gap-4 mb-4 items-end">
        <div className="flex flex-col max-w-xs w-full">
          <label className="subtitle2 mb-2 text-sm font-medium">
            جست‌وجو بر اساس نام
          </label>
          <input
            type="text"
            placeholder="مثلاً علی رضایی"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="b4 border rounded-lg p-2 text-sm w-full"
          />
        </div>
      </div>

      <Table data={filteredUsers} columns={columns} />

      <div className="flex flex-col items-center mt-4 gap-2">
        <div className="b1 text-sm text-gray-600">صفحه {page}</div>
        <div className="flex justify-center">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="subtitle1 px-3 py-1 border rounded mx-1 b4"
          >
            قبلی
          </button>
          <span className="b1 px-3 py-1 b4">{page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="subtitle1 px-3 py-1 border rounded mx-1 b4"
          >
            بعدی
          </button>
        </div>
      </div>

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
                className="b4 w-full p-2 border rounded-lg"
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
                className="b4 w-full p-2 border rounded-lg"
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
                className="b4 w-full p-2 border rounded-lg"
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
                className="b4 px-4 py-2 border rounded-lg"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="b4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
