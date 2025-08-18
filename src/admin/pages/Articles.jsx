import { useEffect, useState, useMemo } from "react";
import Modal from "../components/Modal";
import Table from "../components/Table";
import api from "../../utils/config";
import { showToast } from "../../utils/toast";
import "prosemirror-view/style/prosemirror.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaCode,
  FaEraser,
  FaLink,
  FaUnlink,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";

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

const isCodeLine = (line) => {
  const l = line.trim();
  if (!l) return false;
  if (/^[\u2022\u00B7\-\*]\s+/u.test(l)) return false;
  const hasPersian = /[\u0600-\u06FF]/.test(l);
  const codeHints =
    /(import|export|from|const|let|var|function|class|return|if|else|for|while|switch|case|try|catch|=>|<\/?[a-z][^>]*>|^[\s]*[{}`();]|=\s*[{[(]|^\s*<\/?)/i;
  if (hasPersian && !codeHints.test(l)) return false;
  return codeHints.test(l) || /[;{}()=<>]/.test(l);
};

const splitLeadingProseFromCode = (text) => {
  const norm = text.replace(/\r/g, "");
  const lines = norm.split("\n").map((ln) => ln.replace(/&nbsp;/g, " "));
  let i = 0;
  while (i < lines.length && !isCodeLine(lines[i])) i++;
  const prose = lines
    .slice(0, i)
    .map((ln) => ln.replace(/^[\u2022\u00B7\-\*]\s+/u, "").trim())
    .filter(Boolean)
    .join(" ");
  const code = lines.slice(i).join("\n").trim();
  return { prose, code };
};

const normalizeHtml = (html) => {
  if (!html) return "<p></p>";
  let cleaned = String(html).replaceAll("&nbsp;", " ");

  const boundary = /<\/code>\s*<\/pre>\s*<pre[^>]*>\s*<code[^>]*>/gi;
  while (boundary.test(cleaned)) {
    cleaned = cleaned.replace(boundary, "\n");
  }

  if (typeof window !== "undefined") {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(cleaned, "text/html");

      const blocks = Array.from(doc.querySelectorAll("pre > code")).map(
        (c) => c.parentElement
      );
      for (const pre of blocks) {
        const codeEl = pre.querySelector("code");
        const tmp = document.createElement("div");
        tmp.innerHTML = (codeEl.innerHTML || "")
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/&nbsp;/g, " ");
        const plain = tmp.textContent || "";

        const { prose, code } = splitLeadingProseFromCode(plain);

        if (prose) {
          const p = doc.createElement("p");
          p.textContent = prose;
          pre.parentElement.insertBefore(p, pre);
        }

        if (code) codeEl.textContent = code;
        else pre.remove();
      }

      doc.querySelectorAll("p").forEach((p) => {
        if (!p.textContent || !p.textContent.trim()) p.remove();
      });
      doc.querySelectorAll("pre").forEach((el) => {
        if (!el.textContent || !el.textContent.trim()) el.remove();
      });

      cleaned = (doc.body.innerHTML || "").trim();
    } catch {}
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
    try {
      if (typeof window !== "undefined" && typeof DOMParser !== "undefined") {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
      }
    } catch {}
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
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    []
  );

  const editor = useEditor({
    extensions,
    content: normalizeHtml(value),
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "ProseMirror focus:outline-none rounded-lg border p-3 min-h-[200px]",
        style: "direction: rtl; text-align: right; white-space: pre-wrap;",
      },
      transformPastedHTML(html) {
        // ۱) حذف nbsp و ادغام preهای متوالی
        let h = String(html).replaceAll("&nbsp;", " ");
        const boundary = /<\/code>\s*<\/pre>\s*<pre[^>]*>\s*<code[^>]*>/gi;
        while (boundary.test(h)) {
          h = h.replace(boundary, "\n");
        }
        // ۲) اگر داخل pre، خط‌های غیرکدی ابتدای بلاک وجود دارد، جدا و به p تبدیل کن
        if (typeof window !== "undefined") {
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(h, "text/html");
            const blocks = Array.from(doc.querySelectorAll("pre > code")).map(
              (c) => c.parentElement
            );
            for (const pre of blocks) {
              const codeEl = pre.querySelector("code");
              const tmp = document.createElement("div");
              tmp.innerHTML = (codeEl.innerHTML || "")
                .replace(/<br\s*\/?>/gi, "\n")
                .replace(/&nbsp;/g, " ");
              const plain = tmp.textContent || "";
              const { prose, code } = splitLeadingProseFromCode(plain);

              if (prose) {
                const p = doc.createElement("p");
                p.textContent = prose;
                pre.parentElement.insertBefore(p, pre);
              }
              if (code) codeEl.textContent = code;
              else pre.remove();
            }
            h = (doc.body.innerHTML || "").trim();
          } catch {}
        }
        // ۳) حذف p خالی
        h = h.replace(/<p>\s*<\/p>/gi, "");
        return h.trim();
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const next = normalizeHtml(value);
    const current = normalizeHtml(editor.getHTML());
    if (next !== current) {
      editor.commands.setContent(next, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const Btn = ({ children, active, onClick, title }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-2 py-1 border rounded flex items-center justify-center ${
        active ? "bg-gray-100 font-bold" : ""
      }`}
    >
      {children}
    </button>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        <Btn
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FaBold />
        </Btn>
        <Btn
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FaItalic />
        </Btn>
        <Btn
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <FaUnderline />
        </Btn>
        <Btn
          title="Heading 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <FaHeading /> 1
        </Btn>
        <Btn
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <FaHeading /> 2
        </Btn>
        <Btn
          title="Bullet List"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FaListUl />
        </Btn>
        <Btn
          title="Ordered List"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl />
        </Btn>
        <Btn
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <FaQuoteRight />
        </Btn>
        <Btn
          title="Code Block"
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <FaCode />
        </Btn>
        <Btn
          title="Clear"
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
        >
          <FaEraser />
        </Btn>
        <Btn
          title="Set Link"
          active={editor.isActive("link")}
          onClick={() => {
            const prev = editor.getAttributes("link")?.href || "";
            const url = window.prompt("آدرس لینک؟", prev);
            if (url === null) return;
            if (url === "") return editor.chain().focus().unsetLink().run();
            editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <FaLink />
        </Btn>
        <Btn
          title="Unset Link"
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          <FaUnlink />
        </Btn>
        <Btn
          title="Align Left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <FaAlignLeft />
        </Btn>
        <Btn
          title="Align Center"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <FaAlignCenter />
        </Btn>
        <Btn
          title="Align Right"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <FaAlignRight />
        </Btn>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
