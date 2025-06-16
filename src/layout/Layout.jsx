//temps
import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";

export default function Layout({ children }) {
  return (
    <>
      <div className="max-w-[1400px] mx-auto">
        <Header />
        <main className="w-full p-5 lg:p-6 min-h-screen">{children}</main>
      </div>
      <Footer />
    </>
  );
}
