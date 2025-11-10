// AdminRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import AdminLayout from "./AdminLayout";
import Users from "./pages/Users";
import Courses from "./pages/Courses";
import Media from "./pages/Media";
import Categoires from "./pages/Categoires";
import Teachers from "./pages/Teachers";
import Email from "./pages/Email";
import { useIsAdmin } from "../utils/authGuard";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Articles = lazy(() => import("./pages/Articles"));

export default function AdminRoutes() {
  const admin = useIsAdmin();
  if (!admin) return <Navigate to="/auth" replace />;

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<p>در حال بارگذاری داشبورد...</p>}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route path="users" element={<Users />} />
        <Route path="courses" element={<Courses />} />
        <Route
          path="articles"
          element={
            <Suspense fallback={<p>در حال بارگذاری مقالات...</p>}>
              <Articles />
            </Suspense>
          }
        />
        <Route path="media" element={<Media />} />
        <Route path="categories" element={<Categoires />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="emails" element={<Email />} />
      </Route>
    </Routes>
  );
}
