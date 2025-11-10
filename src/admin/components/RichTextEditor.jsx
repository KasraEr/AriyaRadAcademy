import { useMemo, useEffect } from "react";
//tailwind-typo
import "prosemirror-view/style/prosemirror.css";
//tiptap
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
//react-icons
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

export default function RichTextEditor({ value, onChange }) {
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

  const isCodeLine = (line) => {
    const l = line.trim();
    if (!l) return false;
    if (/^[\u2022\u00B7\-\\*]\s+/u.test(l)) return false;
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
      .map((ln) => ln.replace(/^[\u2022\u00B7\-\\*]\s+/u, "").trim())
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
      } catch {
        /* empty */
      }
    }

    cleaned = cleaned
      .replace(/<pre>\s*<\/pre>/gi, "")
      .replace(/<p>\s*<\/p>/gi, "")
      .trim();

    return cleaned || "<p></p>";
  };

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
        let h = String(html).replaceAll("&nbsp;", " ");
        const boundary = /<\/code>\s*<\/pre>\s*<pre[^>]*>\s*<code[^>]*>/gi;
        while (boundary.test(h)) {
          h = h.replace(boundary, "\n");
        }
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
          } catch {
            /* empty */
          }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
