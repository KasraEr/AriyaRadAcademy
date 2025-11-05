import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Courses from "./pages/Courses";
import Articles from "./pages/Articles";
import Media from "./pages/Media";
import Categoires from "./pages/Categoires";
import Teachers from "./pages/Teachers";
import Email from "./pages/Email";
//utils
import { useIsAdmin } from "../utils/authGuard";

export default function AdminRoutes() {
  const admin = useIsAdmin();

  if (!admin) return <Navigate to="/auth" replace />;

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="courses" element={<Courses />} />
        <Route path="articles" element={<Articles />} />
        <Route path="media" element={<Media />} />
        <Route path="categories" element={<Categoires />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="emails" element={<Email />} />
      </Route>
    </Routes>
  );
}
