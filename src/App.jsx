import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import AdminRoutes from "./admin/AdminRoutes";
import BackToTop from "./components/templates/BackToTop";
import GlobalToast from "./components/modules/GlobalToast";
import { useAuth } from "./context/AuthContext.jsx";

// Lazy imports
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const ArticlesPage = lazy(() => import("./pages/ArticlesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const SelectedCategoryPage = lazy(() => import("./pages/SelectedCategoryPage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ArticleDetailsPage = lazy(() => import("./pages/ArticleDetailsPage.jsx"));
const Profile = lazy(() => import("./components/templates/Profile"));
const Cart = lazy(() => import("./components/templates/Cart"));
const UserCourses = lazy(() => import("./components/templates/UserCourses"));
const Exit = lazy(() => import("./components/templates/Exit"));

export default function App() {
  const { token } = useAuth();

  return (
    <>
      <Suspense
        fallback={
          <div className="p-6 text-center b1 text-primary-500">
            در حال بارگذاری...
          </div>
        }
      >
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
            <Route path="/categories" element={<CategoriesPage />} />
            <Route
              path="/categories/:slug"
              element={<SelectedCategoryPage />}
            />
            <Route
              path="/categories/:categorySlug/:courseSlug"
              element={<CourseDetailPage />}
            />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:name" element={<ArticleDetailsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/sign-up" element={<SignUpPage />} />
            <Route path="/auth/sign-in" element={<SignInPage />} />
            <Route
              path="/dashboard"
              element={
                token ? <DashboardPage /> : <Navigate to="/auth" replace />
              }
            >
              <Route path="profile" element={<Profile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="courses" element={<UserCourses />} />
              <Route path="exit" element={<Exit />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Suspense>
      <BackToTop />
      <GlobalToast />
    </>
  );
}
