//temps
import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
//r-r-d
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="max-w-[1400px] mx-auto">
        <Header />
        <main className="w-full p-5 lg:p-6 min-h-svh mb-7">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
