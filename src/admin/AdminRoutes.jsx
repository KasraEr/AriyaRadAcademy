import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Courses from "./pages/Courses";
import Articles from "./pages/Articles";
//utils
import { isAdmin } from "../utils/authGuard";

export default function AdminRoutes() {
  if (!isAdmin()) return <Navigate to="/auth" replace />;

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="Dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="courses" element={<Courses />} />
        <Route path="articles" element={<Articles />} />
      </Route>
    </Routes>
  );
}
