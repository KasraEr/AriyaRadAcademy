export default function Modal({ children, onClose, size = "md" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-500/35 backdrop-blur-sm">
      <div
        className={`bg-white overflow-y-scroll rounded-xl shadow-2xl p-6 w-[750px] max-h-[900px] max-w-${sizeMap[size]} mx-4 relative animate-fade-in`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

const sizeMap = {
  sm: "sm",
  md: "2xl",
  lg: "4xl",
  xl: "6xl",
};
