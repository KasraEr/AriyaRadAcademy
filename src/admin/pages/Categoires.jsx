import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Table from "../components/Table";
import api from "../../utils/config";
import { showToast } from "../../utils/toast";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    inActive: false,
    coverImage: "",
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/Category/GetSelectList");
      setCategories(res.data || []);
    } catch {
      showToast("خطا در دریافت لیست دسته‌بندی‌ها", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put("/api/Category/Update", {
          id: formData.id,
          name: formData.name,
          inActive: formData.inActive,
          coverImage: formData.coverImage,
        });
        showToast("دسته‌بندی ویرایش شد");
      } else {
        await api.post("/api/Category/Create", {
          name: formData.name,
          inActive: formData.inActive,
          coverImage: formData.coverImage,
        });
        showToast("دسته‌بندی جدید اضافه شد");
      }
      setModalOpen(false);
      setFormData({
        id: null,
        name: "",
        inActive: false,
        coverImage: "",
      });
      fetchCategories();
    } catch {
      showToast("خطا در ذخیره اطلاعات", "error");
    }
  };

  const handleEdit = (category) => {
    setFormData({
      id: category.id,
      name: category.name,
      inActive: category.inActive,
      coverImage: category.coverImage,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این دسته‌بندی مطمئن هستید؟")) return;
    try {
      await api.delete("/api/Category/Delete", {
        data: { id },
      });
      showToast("دسته‌بندی حذف شد");
      fetchCategories();
    } catch {
      showToast("خطا در حذف دسته‌بندی", "error");
    }
  };

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

  const columns = [
    { header: "نام دسته‌بندی", cell: (row) => row.name },
    { header: "آیدی", cell: (row) => row.id },
    { header: "غیرفعال", cell: (row) => (row.inActive ? "بله" : "خیر") },
    {
      header: "تصویر",
      cell: (row) =>
        row.coverImage ? (
          <img
            src={buildImageUrl(row.coverImage)}
            alt={row.name}
            className="w-16 h-16 object-cover"
          />
        ) : (
          "-"
        ),
    },
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="h6">مدیریت دسته‌بندی‌ها</h1>
        <button onClick={() => setModalOpen(true)} className="active">
          افزودن دسته‌بندی
        </button>
      </div>

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <Table data={categories} columns={columns} />
      )}

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)} size="lg">
          <form onSubmit={handleSave} className="space-y-4" dir="rtl">
            <h3 className="subtitle2">
              {formData.id ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
            </h3>

            <div>
              <label className="block mb-1 b2">نام دسته‌بندی</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.inActive}
                onChange={(e) =>
                  setFormData({ ...formData, inActive: e.target.checked })
                }
              />
              <label className="b2">غیرفعال</label>
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
