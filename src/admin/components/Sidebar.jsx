import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">پنل مدیریت</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/admin" className="text-gray-700">
          داشبورد
        </NavLink>
        <NavLink to="/admin/users" className="text-gray-700">
          کاربران
        </NavLink>
        <NavLink to="/admin/courses" className="text-gray-700">
          دوره‌ها
        </NavLink>
        <NavLink to="/admin/articles" className="text-gray-700">
          مقالات
        </NavLink>
      </nav>
    </aside>
  );
}
