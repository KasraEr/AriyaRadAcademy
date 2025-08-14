export default function Modal({ children, onClose, size = "md" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div
        className={`bg-white rounded-xl shadow-2xl p-6 w-full max-w-${sizeMap[size]} mx-4 relative animate-fade-in`}
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
