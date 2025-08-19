import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import ScrollToTop from "./utils/ScrollToTop.js";
import PersianWrapper from "./components/templates/PersianWrapper.jsx";
import { CourseProvider } from "./context/CourseContext.jsx";
import { ArticleProvider } from "./context/ArticleContext.jsx";
import "keen-slider/keen-slider.min.css";
import "leaflet/dist/leaflet.css";
import "prosemirror-view/style/prosemirror.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <ScrollToTop />
    <PersianWrapper>
      <CourseProvider>
        <ArticleProvider>
          <App />
        </ArticleProvider>
      </CourseProvider>
    </PersianWrapper>
  </Router>
);
