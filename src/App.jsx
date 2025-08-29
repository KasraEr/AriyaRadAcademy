import { useState, useEffect } from "react";
//layout
import Layout from "./layout/Layout.jsx";
//r-r-d
import { Routes, Route, Navigate } from "react-router-dom";
//utils
import { getToken } from "./utils/tokenService";
//admin
import AdminRoutes from "./admin/AdminRoutes";
//pages
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import CategoriesPage from "./pages/CategoriesPage";
import ArticlesPage from "./pages/ArticlesPage";
import NotFoundPage from "./pages/NotFoundPage";
import SelectedDifficultyPage from "./pages/SelectedDifficultyPage";
import SelectedCategoryPage from "./pages/SelectedCategoryPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AuthPage from "./pages/AuthPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage.jsx";
//temps
import BackToTop from "./components/templates/BackToTop";
import Profile from "./components/templates/Profile";
import Cart from "./components/templates/Cart";
import UserCourses from "./components/templates/UserCourses";
import Exit from "./components/templates/Exit";
//toastify
import "react-toastify/dist/ReactToastify.css";
import GlobalToast from "./components/modules/GlobalToast";

export default function App() {
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(getToken());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/courses"
            element={<Navigate to="/categories" replace />}
          />
          <Route
            path="/categories/courses"
            element={<Navigate to="/categories" replace />}
          />
          <Route
            path="/categories/courses/:difficulty"
            element={<SelectedDifficultyPage />}
          />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route
            path="/categories/:slug"
            element={<SelectedCategoryPage />}
          />
          <Route
            path="/categories/:category/:_title"
            element={<CourseDetailPage />}
          />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:name" element={<ArticleDetailsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route
            path="/dashboard"
            element={
              token ? <DashboardPage /> : <Navigate to="/auth" replace />
            }
          >
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/cart" element={<Cart />} />
            <Route path="/dashboard/courses" element={<UserCourses />} />
            <Route path="/dashboard/exit" element={<Exit />} />
            <Route path="/dashboard/*" element={<Navigate to="/dashboard" />} />
          </Route>
        </Route>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      <BackToTop />
      <GlobalToast />
    </>
  );
}
