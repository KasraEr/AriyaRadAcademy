import { useEffect, useState } from "react";
//compinents
import Modal from "../components/Modal";
import Table from "../components/Table";
//utils
import api from "../../utils/config";
import { showToast } from "../../utils/toast";
import { lazy, Suspense } from "react";
// lazy import
const RichTextEditor = lazy(() => import("../components/RichTextEditor"));

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
  } catch {
    /* empty */
  }
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

const normalizeHtml = (html) => {
  if (!html) return "<p></p>";
  let cleaned = String(html).replaceAll("&nbsp;", " ");

  const boundary = /<\/code>\s*<\/pre>\s*<pre[^>]*>\s*<code[^>]*>/gi;
  while (boundary.test(cleaned)) {
    cleaned = cleaned.replace(boundary, "\n");
  }

  cleaned = cleaned
    .replace(/<pre>\s*<\/pre>/gi, "")
    .replace(/<p>\s*<\/p>/gi, "")
    .trim();

  return cleaned || "<p></p>";
};

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [form, setForm] = useState({
    author: "",
    name: "",
    body: "",
    image: "",
  });

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/Article/GetSelectList");

      const cleaned = (res.data || []).map((a) => ({
        ...a,
        body: normalizeHtml(a.body),
      }));
      setArticles(cleaned);
    } catch (err) {
      showToast(err, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleOpenModal = (article = null) => {
    setEditingArticle(article);
    setForm(
      article
        ? {
            ...article,
            image: normalizeFileName(article.image),
            body: normalizeHtml(article.body),
          }
        : { author: "", name: "", body: "", image: "" }
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingArticle(null);
    setForm({ author: "", name: "", body: "", image: "" });
  };

  const handleSave = async () => {
    try {
      console.log("[RTE raw before normalize]", form.body);

      const payload = {
        ...form,
        image: normalizeFileName(form.image),
        body: normalizeHtml(form.body),
      };

      console.log("[RTE after normalizeHtml]", payload.body);

      let res;
      if (editingArticle) {
        res = await api.put("/api/Article/Update", {
          id: editingArticle.id,
          ...payload,
        });
        showToast("مقاله با موفقیت ویرایش شد");
      } else {
        res = await api.post("/api/Article/Create", payload);
        showToast("مقاله با موفقیت ایجاد شد");
      }

      if (res?.data) console.log("[Server response on save]", res.data);

      handleCloseModal();
      await fetchArticles();
    } catch (err) {
      showToast(err, "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این مقاله مطمئن هستید؟")) return;
    try {
      await api.delete("/api/Article/Delete", { data: { id } });
      showToast("مقاله با موفقیت حذف شد");
      fetchArticles();
    } catch (err) {
      showToast(err, "error");
    }
  };

  const stripHtml = (html) => {
    if (!html) return "";
    try {
      if (typeof window !== "undefined" && typeof DOMParser !== "undefined") {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
      }
    } catch {
      /* empty */
    }
    return String(html)
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const columns = [
    { header: "نویسنده", accessor: "author", cell: (row) => row.author },
    { header: "عنوان", accessor: "name", cell: (row) => row.name },
    {
      header: "توضیحات",
      accessor: "body",
      cell: (row) => {
        const text = stripHtml(row.body);
        return text.length > 50 ? text.slice(0, 50) + "..." : text;
      },
    },
    {
      header: "تصویر",
      accessor: "image",
      cell: (row) =>
        row.image ? (
          <img
            src={buildImageUrl(row.image)}
            alt="article"
            className="w-16 h-16 object-cover"
          />
        ) : (
          "-"
        ),
    },
    {
      header: "عملیات",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600"
            onClick={() => handleOpenModal(row)}
          >
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
        <h1 className="h6">مدیریت مقالات</h1>
        <button onClick={() => handleOpenModal()} className="active">
          افزودن مقاله
        </button>
      </div>

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <Table data={articles} columns={columns} />
      )}

      {modalOpen && (
        <Modal onClose={handleCloseModal} size="lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
            dir="rtl"
          >
            <h3 className="subtitle2">
              {editingArticle ? "ویرایش مقاله" : "افزودن مقاله جدید"}
            </h3>

            <div>
              <label className="block mb-1 b2">نویسنده</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="b2 w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 b2">عنوان</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="b2 w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 b2">متن مقاله</label>
              <Suspense fallback={<p>در حال بارگذاری ادیتور...</p>}>
                <RichTextEditor
                  value={form.body}
                  onChange={(html) => setForm({ ...form, body: html })}
                />
              </Suspense>
            </div>

            <div>
              <label className="block mb-1 b2">لینک تصویر</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="مثال: 7b42c37c-....png"
                className="b2 w-full p-2 border rounded-lg"
              />
              {form.image && (
                <div className="mt-2">
                  <img
                    src={buildImageUrl(form.image)}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
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
