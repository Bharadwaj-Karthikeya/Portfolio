import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import SinglePage from "./pages/SinglePage.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen bg-canvas text-text">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-[-220px] h-[420px] w-[420px] rounded-full bg-accent-soft blur-[140px]"></div>
        <div className="absolute right-[-120px] top-1/3 h-[360px] w-[360px] rounded-full bg-accent-soft blur-[160px]"></div>
      </div>

      <Navbar />
      <main className="flex w-full flex-col gap-0 pb-24">
        <SinglePage />
      </main>
      <Footer />
    </div>
  );
}
