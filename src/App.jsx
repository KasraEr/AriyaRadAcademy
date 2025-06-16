//r-r-d
import { Routes, Route, Navigate } from "react-router-dom";
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

export default function App() {
  return (
    <>
      <Routes>
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
          path="/categories/:category"
          element={<SelectedCategoryPage />}
        />
        <Route
          path="/categories/:category/:_title"
          element={<CourseDetailPage />}
        />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
