import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-2 sm:right-6 z-50 flex items-center justify-center
      h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 
      text-basic-100 shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:scale-110 
      hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)] transition-all duration-300 
      ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      aria-label="Scroll to top"
    >
      <FaChevronUp className="text-lg" />
    </button>
  );
}
