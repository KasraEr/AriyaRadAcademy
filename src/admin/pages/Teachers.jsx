import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Table from "../components/Table";
import api from "../../utils/config";
import { showToast } from "../../utils/toast";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    fullName: "",
    skill: "",
    description: "",
    coverImage: "",
  });

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/Teacher/GetSelectList");
      setTeachers(res.data || []);
    } catch {
      showToast("خطا در دریافت لیست مدرس‌ها", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put("/api/Teacher/Update", {
          id: formData.id,
          fullName: formData.fullName,
          skill: formData.skill,
          descirption: formData.description, // نکته مهم
          coverImage: formData.coverImage,
        });
        showToast("مدرس ویرایش شد");
      } else {
        await api.post("/api/Teacher/Create", {
          fullName: formData.fullName,
          skill: formData.skill,
          descirption: formData.description,
          coverImage: formData.coverImage,
        });
        showToast("مدرس جدید اضافه شد");
      }
      setModalOpen(false);
      setFormData({
        id: null,
        fullName: "",
        skill: "",
        description: "",
        coverImage: "",
      });
      fetchTeachers();
    } catch {
      showToast("خطا در ذخیره اطلاعات", "error");
    }
  };

  const handleEdit = (teacher) => {
    setFormData({
      id: teacher.id,
      fullName: teacher.fullName,
      skill: teacher.skill,
      description: teacher.descirption,
      coverImage: teacher.coverImage,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این مدرس مطمئن هستید؟")) return;
    try {
      await api.delete("/api/Teacher/Delete", {
        data: { id }, // طبق مستندات باید در body بیاد
      });
      showToast("مدرس حذف شد");
      fetchTeachers();
    } catch {
      showToast("خطا در حذف مدرس", "error");
    }
  };

  const columns = [
    {
      header: "تصویر",
      accessor: "image",
      cell: (row) =>
        row.coverImage ? (
          <img
            src={buildImageUrl(row.coverImage)}
            alt={row.fullName}
            className="w-16 h-16 object-cover"
          />
        ) : (
          "-"
        ),
    },
    { header: "نام", cell: (row) => row.fullName },
    { header: "آیدی", cell: (row) => row.id },
    { header: "مهارت", cell: (row) => row.skill },
    { header: "توضیحات", cell: (row) => row.descirption },
    {
      header: "عملیات",
      cell: (row) => (
        <div className="flex gap-3">
          <button className="text-blue-600" onClick={() => handleEdit(row)}>
            ویرایش
          </button>
          <button className="text-red-600" onClick={() => handleDelete(row.id)}>
            حذف
          </button>
        </div>
      ),
    },
  ];

  const normalizeFileName = (input) => {
    if (!input) return "";
    let s = String(input).trim();
    try {
      const u = new URL(
        s,
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost"
      );
      s = u.pathname || s;
    } catch {}
    s = s.replace(/^\/+/, "");
    s = s
      .replace(/^api\/File\/(image|video)\//, "")
      .replace(/^uploads\/(images|videos)\//, "");
    const last = s.split("/").pop() || "";
    return last.split("?")[0].split("#")[0];
  };

  const buildImageUrl = (input) => {
    const fileName = normalizeFileName(input);
    if (!fileName) return "";
    try {
      return new URL(
        `/api/File/image/${fileName}`,
        api?.defaults?.baseURL ||
          (typeof window !== "undefined"
            ? window.location.origin
            : "http://localhost")
      ).toString();
    } catch {
      return `/api/File/image/${fileName}`;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="h6">مدیریت مدرس‌ها</h1>
        <button onClick={() => setModalOpen(true)} className="active">
          افزودن مدرس
        </button>
      </div>

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <Table data={teachers} columns={columns} />
      )}

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)} size="lg">
          <form onSubmit={handleSave} className="space-y-4" dir="rtl">
            <h3 className="subtitle2">
              {formData.id ? "ویرایش مدرس" : "افزودن مدرس"}
            </h3>

            <div>
              <label className="block mb-1 b2">نام مدرس</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 b2">مهارت</label>
              <input
                type="text"
                value={formData.skill}
                onChange={(e) =>
                  setFormData({ ...formData, skill: e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 b2">توضیحات</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 b2">لینک تصویر</label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                placeholder="مثال: 7b42c37c-....png"
                className="b2 w-full p-2 border rounded-lg"
                required
              />
              {formData.coverImage && (
                <div className="mt-2">
                  <img
                    src={buildImageUrl(formData.coverImage)}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
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
    </div>
  );
}
