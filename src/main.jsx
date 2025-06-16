import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import Layout from "./layout/Layout.jsx";
import ScrollToTop from "./utils/ScrollToTop.js";
import PersianWrapper from "./components/templates/PersianWrapper.jsx";
import "keen-slider/keen-slider.min.css";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <Layout>
      <ScrollToTop />
      <PersianWrapper>
        <App />
      </PersianWrapper>
    </Layout>
  </Router>
);
