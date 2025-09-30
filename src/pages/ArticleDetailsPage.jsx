// react
import { useEffect, useRef } from "react";
// context
import { useArticles } from "../hooks/useArticles.js";
import { useImageCache } from "../hooks/useImageCache.js";
// r-r-d
import { useLocation, useParams } from "react-router-dom";
// امنیت
import DOMPurify from "dompurify";
// icons
import artAuthor from "../assets/icons/articleAuthor.svg";
// C-hooks
import useTitle from "../hooks/useTitle.js";

export default function ArticleDetailsPage() {
  const location = useLocation();
  const { name } = useParams();
  const id = location.state?.id;

  const articles = useArticles();

  const slugify = (text) =>
    text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\u0600-\u06FF\w-]+/g, "")
      .replace(/--+/g, "-");

  const article =
    articles?.find((item) => item.id === id) ??
    articles?.find((item) => slugify(item.name) === name);

  const { getImageUrl } = useImageCache();
  const imageUrl = article?.image && getImageUrl(article.image);

  const contentRef = useRef(null);

  useEffect(() => {
    const root = contentRef.current;
    if (!root || !article?.body) return;

    const bindCopyButtons = () => {
      const blocks = Array.from(root.querySelectorAll("pre"));
      blocks.forEach((pre) => {
        if (pre.dataset.copyBound === "1") return;
        pre.dataset.copyBound = "1";

        pre.classList.add("relative", "overflow-x-auto");

        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "کپی";
        btn.setAttribute("data-copy-btn", "1");
        btn.className = [
          "absolute",
          "top-2",
          "right-2",
          "z-10",
          "px-2",
          "py-1",
          "rounded-md",
          "bg-gray-800/80",
          "text-white",
          "text-xs",
          "hover:bg-gray-700",
          "transition",
        ].join(" ");

        pre.appendChild(btn);
        pre.setAttribute("dir", "ltr");
        pre.style.textAlign = "left";
      });
    };

    const onClick = async (e) => {
      const btn = e.target.closest('button[data-copy-btn="1"]');
      if (!btn || !root.contains(btn)) return;

      const pre = btn.closest("pre");
      if (!pre) return;

      const codeEl = pre.querySelector("code");
      const raw = (codeEl ? codeEl.innerText : pre.innerText) || "";
      const text = raw.replace(/\u00A0/g, " ");

      const flash = (label, cls) => {
        const prev = btn.textContent;
        btn.textContent = label;
        if (cls) btn.classList.add(cls);
        setTimeout(() => {
          btn.textContent = prev;
          if (cls) btn.classList.remove(cls);
        }, 1200);
      };

      try {
        await navigator.clipboard.writeText(text);
        flash("کپی شد", "bg-green-600");
      } catch {
        flash("ناموفق", "bg-red-600");
      }
    };

    let scheduled = false;
    const scheduleBind = () => {
      if (scheduled) return;
      scheduled = true;
      setTimeout(() => {
        scheduled = false;
        bindCopyButtons();
      }, 0);
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (
          m.type === "childList" &&
          (m.addedNodes.length || m.removedNodes.length)
        ) {
          scheduleBind();
          break;
        }
      }
    });

    bindCopyButtons();
    root.addEventListener("click", onClick);
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      root.removeEventListener("click", onClick);
    };
  }, [article?.body]);

  useTitle(article?.name);

  if (!article) {
    return (
      <div className="w-full p-6 animate-pulse">
        <div className="h-6 w-1/3 bg-gray-300 rounded mx-auto mb-6"></div>
        <div className="w-full max-w-[700px] h-80 bg-gray-300 rounded-2xl mx-auto mb-6"></div>
        <div className="space-y-3 max-w-[700px] mx-auto">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mx-auto grid grid-cols-1 place-items-center gap-8 p-3 border border-text-500 rounded-3xl max-w-[800px]">
        <h3 className="text-primary-900 text-center">{article?.name}</h3>
        <img
          src={imageUrl}
          alt={article?.name || "تصویر مقاله"}
          className="rounded-2xl w-full max-w-[650px]"
          loading="lazy"
        />
        <div
          key={article?.id || id}
          ref={contentRef}
          className="w-full max-w-[650px] text-justify prose prose-lg font-[ariyarad-medium]"
          dir="rtl"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article?.body || ""),
          }}
        />
        <div className="pt-3">
          <p className="flex items-center justify-center gap-2 b3 text-text-500">
            <span className="flex items-center justify-center gap-2 subtitle2 text-text-500">
              <img src={artAuthor} alt="" loading="lazy" />
              نویسنده :
            </span>
            {article?.author}
          </p>
        </div>
      </div>
    </div>
  );
}
