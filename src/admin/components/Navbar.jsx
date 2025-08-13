export default function Navbar() {
  return (
    <header className="bg-white shadow px-4 py-2 flex justify-between items-center">
      <h1 className="text-lg font-semibold">پنل ادمین</h1>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/auth";
        }}
        className="text-red-500"
      >
        خروج
      </button>
    </header>
  );
}
