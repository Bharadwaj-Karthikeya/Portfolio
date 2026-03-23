import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import SinglePage from "./pages/SinglePage.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen bg-canvas text-text isolate selection:bg-accent-strong selection:text-black dark:selection:text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[50vw] w-[50vw] rounded-full bg-accent blur-[140px] opacity-20 animate-drift"></div>
        <div className="absolute right-[-5%] top-[20%] h-[45vw] w-[45vw] rounded-full bg-accent-strong blur-[180px] opacity-[0.15] mix-blend-multiply dark:mix-blend-lighten animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[10%] left-[10%] h-[40vw] w-[40vw] rounded-full bg-accent-soft blur-[150px] opacity-40 animate-drift" style={{ animationDelay: '5s' }}></div>
      </div>

      <Navbar />
      <main className="flex w-full flex-col gap-0 pb-24 z-10 relative ">
        <SinglePage />
      </main>
      <Footer />
    </div>
  );
}
