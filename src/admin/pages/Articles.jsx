import { useEffect, useState, useMemo } from "react";
import Modal from "../components/Modal";
import Table from "../components/Table";
import api from "../../utils/config";
import { showToast } from "../../utils/toast";
import { toPersianDigits } from "../../utils/toPersianDigits";

// TipTap imports
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import "prosemirror-view/style/prosemirror.css";

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
      setArticles(res.data || []);
    } catch (err) {
      showToast("خطا در دریافت لیست مقالات", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleOpenModal = (article = null) => {
    setEditingArticle(article);
    setForm(article || { author: "", name: "", body: "", image: "" });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingArticle(null);
    setForm({ author: "", name: "", body: "", image: "" });
  };

  const handleSave = async () => {
    try {
      if (editingArticle) {
        await api.put("/api/Article/Update", {
          id: editingArticle.id,
          ...form,
        });
        showToast("مقاله با موفقیت ویرایش شد");
      } else {
        await api.post("/api/Article/Create", form);
        showToast("مقاله با موفقیت ایجاد شد");
      }
      handleCloseModal();
      fetchArticles();
    } catch (err) {
      showToast("خطا در ذخیره مقاله", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این مقاله مطمئن هستید؟")) return;
    try {
      await api.delete("/api/Article/Delete", { data: { id } });
      showToast("مقاله با موفقیت حذف شد");
      fetchArticles();
    } catch (err) {
      showToast("خطا در حذف مقاله", "error");
    }
  };

  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
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
            src={row.image}
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
        <Table
          data={articles.map((a) => ({ ...a, id: toPersianDigits(a.id) }))}
          columns={columns}
        />
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
              <RichTextEditor
                value={form.body}
                onChange={(html) => setForm({ ...form, body: html })}
              />
            </div>

            <div>
              <label className="block mb-1 b2">لینک تصویر</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="b2 w-full p-2 border rounded-lg"
              />
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

function RichTextEditor({ value, onChange }) {
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        link: false,
        underline: false,
        bulletList: true,
        orderedList: true,
        blockquote: true,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
    ],
    []
  );

  const editor = useEditor({
    extensions,
    content: value || '<pre class="b1"></pre>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "ProseMirror focus:outline-none rounded-lg border p-3 min-h-[200px]",
        style: "direction: rtl; text-align: right; white-space: pre-wrap;",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const html = value || '<pre class="b1"></pre>';
    if (html !== editor.getHTML()) {
      editor.commands.setContent(html, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const Btn = ({ label, active, onClick, title }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-2 py-1 border rounded ${
        active ? "bg-gray-100 font-bold" : ""
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        <Btn
          label="B"
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <Btn
          label="I"
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <Btn
          label="U"
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <Btn
          label="H1"
          title="Heading 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        />
        <Btn
          label="H2"
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <Btn
          label="• لیست"
          title="Bullet List"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <Btn
          label="۱. لیست"
          title="Ordered List"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <Btn
          label="Quote"
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <Btn
          label="Code"
          title="Code Block"
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
        <Btn
          label="⎌ پاک‌کردن"
          title="Clear marks & nodes"
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
        />
        <Btn
          label="↶ Undo"
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        />
        <Btn
          label="↷ Redo"
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        />
        <Btn
          label="🔗 لینک"
          title="Set link"
          active={editor.isActive("link")}
          onClick={() => {
            const prev = editor.getAttributes("link")?.href || "";
            const url = window.prompt("آدرس لینک؟", prev);
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().unsetLink().run();
              return;
            }
            editor.chain().focus().setLink({ href: url }).run();
          }}
        />
        <Btn
          label="❌ لینک"
          title="Unset link"
          onClick={() => editor.chain().focus().unsetLink().run()}
        />
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
