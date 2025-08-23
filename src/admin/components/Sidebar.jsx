import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">پنل مدیریت</h2>
        <nav>
          <ul className="flex flex-col items-start justify-center gap-4 list-none">
            <li className="b1 text-primary-900">
              <NavLink
                to="/admin/dashboard"
                className="transition hover:text-secondary-900"
              >
                داشبورد
              </NavLink>
            </li>
            <li className="b1 text-primary-900">
              <NavLink
                to="/admin/users"
                className="transition hover:text-secondary-900"
              >
                کاربران
              </NavLink>
            </li>
            <li className="b1 text-primary-900">
              <NavLink
                to="/admin/courses"
                className="transition hover:text-secondary-900"
              >
                دوره‌ها
              </NavLink>
            </li>
            <li className="b1 text-primary-900">
              <NavLink
                to="/admin/categories"
                className="transition hover:text-secondary-900"
              >
                دسته بندی دوره‌ها
              </NavLink>
            </li>
            <li className="b1 text-primary-900">
              <NavLink
                to="/admin/articles"
                className="transition hover:text-secondary-900"
              >
                مقالات
              </NavLink>
            </li>
            <li className="b1 text-primary-900">
              <NavLink
                to="/admin/media"
                className="transition hover:text-secondary-900"
              >
                مدیا
              </NavLink>
            </li>
            <li className="b1 text-primary-900">
              <NavLink
                to="/admin/teachers"
                className="transition hover:text-secondary-900"
              >
                هم‌یاران
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
