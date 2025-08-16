import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Table from "../components/Table";
import api from "../../utils/config";
import { showToast } from "../../utils/toast";

export default function Media() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const [file, setFile] = useState(null);

  // گرفتن لیست
  const fetchMedia = async () => {
    setLoading(true);
    try {
      const endpoint =
        mediaType === "image" ? "/api/File/all-images" : "/api/File/all-videos";
      const res = await api.get(endpoint);
      setMediaList(res.data || []);
    } catch {
      showToast("خطا در دریافت لیست مدیا", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [mediaType]);

  // آپلود فایل
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return showToast("فایلی انتخاب نشده", "error");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const endpoint =
        mediaType === "image"
          ? "/api/File/upload-image"
          : "/api/File/upload-video";
      await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("فایل با موفقیت آپلود شد");
      setModalOpen(false);
      setFile(null);
      fetchMedia();
    } catch {
      showToast("خطا در آپلود فایل", "error");
    }
  };

  // حذف فایل
  const handleDelete = async (fileName) => {
    if (!window.confirm("آیا از حذف این فایل مطمئن هستید؟")) return;
    try {
      await api.delete("/api/File/delete", {
        params: { fileName, mediaType },
      });
      showToast("فایل حذف شد");
      fetchMedia();
    } catch {
      showToast("خطا در حذف فایل", "error");
    }
  };

  const columns = [
    {
      header: "پیش‌نمایش",
      cell: (row) =>
        mediaType === "image" ? (
          <img
            src={`/api/File/${mediaType}/${row}`}
            alt="media"
            className="w-20 h-20 object-cover"
          />
        ) : (
          <video
            src={`/api/File/${mediaType}/${row}`}
            controls
            className="w-32 h-20"
          />
        ),
    },
    { header: "نام فایل", cell: (row) => row },
    {
      header: "عملیات",
      cell: (row) => (
        <button className="text-red-600" onClick={() => handleDelete(row)}>
          حذف
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="h6">مدیریت مدیا</h1>
        <div className="flex gap-3">
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            className="b2 border rounded-lg p-2"
          >
            <option value="image">تصاویر</option>
            <option value="video">ویدئوها</option>
          </select>
          <button
            onClick={() => setModalOpen(true)}
            className="active"
          >
            آپلود فایل
          </button>
        </div>
      </div>

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <Table data={mediaList} columns={columns} />
      )}

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)} size="lg">
          <form onSubmit={handleUpload} className="space-y-4" dir="rtl">
            <h3 className="subtitle2">
              آپلود {mediaType === "image" ? "تصویر" : "ویدئو"}
            </h3>

            <div>
              <label className="block mb-1 b2">انتخاب فایل</label>
              <input
                type="file"
                accept={mediaType === "image" ? "image/*" : "video/*"}
                onChange={(e) => setFile(e.target.files[0])}
                className="b2 w-full p-2 border rounded-lg"
                required
              />
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
                آپلود
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
