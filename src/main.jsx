import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import ScrollToTop from "./utils/ScrollToTop.js";
import PersianWrapper from "./components/templates/PersianWrapper.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import "keen-slider/keen-slider.min.css";
import "leaflet/dist/leaflet.css";
import "prosemirror-view/style/prosemirror.css";
import "./styles/globals.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Router>
    <ScrollToTop />
    <PersianWrapper>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </AuthProvider>
      </QueryClientProvider>
    </PersianWrapper>
  </Router>
);
