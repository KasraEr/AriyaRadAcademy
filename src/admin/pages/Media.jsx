import { useState } from "react";
import api from "../../utils/config";
import { showToast } from "../../utils/toast";
import Table from "../components/Table";

// تبدیل filePath به { fileName, mediaType }
const parseFilePath = (filePath) => {
  if (!filePath) return { fileName: "", mediaType: "" };
  const parts = filePath.split(/[/\\]+/);
  const fileName = parts.pop();
  const folder = parts[parts.length - 1]?.toLowerCase();
  const mediaType =
    folder === "images" ? "image" : folder === "videos" ? "video" : "";
  return { fileName, mediaType };
};

// ساخت URL مشاهده
const buildViewUrl = (mediaType, fileName) =>
  `/api/File/${encodeURIComponent(mediaType)}/${encodeURIComponent(fileName)}`;

const Media = () => {
  const [data, setData] = useState([]);
  const [uploading, setUploading] = useState(false);

  // آپلود فایل
  const handleUpload = (type) => {
    if (uploading) return;

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = type === "image" ? "image/*" : "video/*";

    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file); // طبق مستندات

      try {
        setUploading(true);
        const url =
          type === "image"
            ? "/api/File/upload-image"
            : "/api/File/upload-video";

        const res = await api.post(url, formData, {
          headers: { "Content-Type": undefined }, // اجازه بده مرورگر boundary ست کنه
        });

        const filePath = res?.data?.filePath;
        if (!filePath) {
          showToast("آپلود انجام شد ولی مسیر فایل برنگشت", "error");
          return;
        }

        const { fileName, mediaType } = parseFilePath(filePath);
        if (fileName && mediaType) {
          setData((prev) => [{ fileName, mediaType }, ...prev]);
          showToast(
            mediaType === "image"
              ? "عکس با موفقیت آپلود شد"
              : "ویدیو با موفقیت آپلود شد"
          );
        } else {
          showToast(
            "آپلود موفق بود اما نوع یا نام فایل شناسایی نشد",
            "warning"
          );
        }
      } catch (err) {
        console.error("خطا در آپلود:", err);
        showToast("آپلود فایل ناموفق بود", "error");
      } finally {
        setUploading(false);
        // پاکسازی ورودی داینامیک
        fileInput.value = "";
        fileInput.onchange = null;
        fileInput.remove();
      }
    };

    fileInput.click();
  };

  // حذف (کامنت چون API نداری)
  /*
  const handleDelete = async (row) => {
    try {
      await api.delete("/api/File/Delete", {
        data: { fileName: row.fileName, mediaType: row.mediaType },
      });
      showToast("فایل با موفقیت حذف شد");
      setData((prev) =>
        prev.filter(
          (item) =>
            !(item.fileName === row.fileName && item.mediaType === row.mediaType)
        )
      );
    } catch (err) {
      console.error("خطا در حذف فایل:", err);
      showToast("حذف فایل ناموفق بود", "error");
    }
  };
  */

  const columns = [
    { header: "نام فایل", accessor: "fileName" },
    { header: "نوع فایل", accessor: "mediaType" },
    {
      header: "آدرس فایل",
      accessor: "url",
      cell: (row) => (
        <a
          href={buildViewUrl(row.mediaType, row.fileName)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          مشاهده
        </a>
      ),
    },
    {
      header: "عملیات",
      accessor: "actions",
      cell: (row) => (
        <div className="flex gap-2">
          {/* <button
            className="text-red-500"
            onClick={() => {
              if (window.confirm("آیا از حذف فایل اطمینان دارید؟")) {
                handleDelete(row);
              }
            }}
          >
            حذف
          </button> */}
          <span className="text-gray-400 italic">حذف غیرفعال</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="subtitle1">مدیریت فایل‌ها</h2>
        <div className="flex gap-2">
          <button
            className={`active ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleUpload("image")}
            disabled={uploading}
          >
            {uploading ? "در حال آپلود..." : "افزودن عکس"}
          </button>
          <button
            className={`active ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleUpload("video")}
            disabled={uploading}
          >
            {uploading ? "در حال آپلود..." : "افزودن ویدیو"}
          </button>
        </div>
      </div>

      <Table data={data} columns={columns} />
    </>
  );
};

export default Media;
