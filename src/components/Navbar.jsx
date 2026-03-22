import { useEffect, useState } from "react";
import { navLinks } from "../content/navigation.js";
import { useTheme } from "../context/ThemeContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(
    navLinks[0]?.sectionId ?? "hero",
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    const sections = navLinks
      .map((link) => document.getElementById(link.sectionId))
      .filter(Boolean);
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleNavClick = (event, link) => {
    event.preventDefault();
    setOpen(false);
    const section = document.getElementById(link.sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const containerStyles =
    theme === "dark"
      ? "bg-[rgba(9,6,24,0.8)] text-white shadow-neon-dark"
      : "bg-[rgba(255,255,255,0.9)] text-text shadow-xl";

  const linkClasses = (sectionId) =>
    `text-sm font-semibold transition ${
      activeSection === sectionId
        ? "text-accent"
        : "text-text hover:text-accent"
    }`;

  return (
    <header className="sticky top-4 z-50 w-full px-4 ">
      <div
        className={`mx-auto flex w-[min(1120px,100%)] h-16 items-center justify-between rounded-pill border border-white/10 px-6 py-3 backdrop-blur-xl ${containerStyles}`}
      >
        <a
          href="#hero"
          className="flex items-center gap-3"
          onClick={(event) => handleNavClick(event, { sectionId: "hero" })}
        >
          <span className="flex  items-center justify-center rounded-full   bg-card-soft/60 ">
            <img
              src="/media/Bharadwaj-logo.png"
              alt="Bharadwaj logo"
              className={`h-8 w-fit  ${theme === "light" ? "invert" : ""}`}
            />
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-6">
            {navLinks.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={item.href}
                  className={linkClasses(item.sectionId)}
                  onClick={(event) => handleNavClick(event, item)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-pill border border-white/20 text-current lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="space-y-1">
            <span
              className={`block h-0.5 w-6 bg-current transition ${open ? "translate-y-1.5 rotate-45" : ""}`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-current transition ${open ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-current transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            ></span>
          </div>
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 w-[min(1120px,100%)] rounded-2xl border border-white/10 bg-card-soft p-4 shadow-glass lg:hidden">
          <ul className="flex flex-col gap-3 text-text">
            {navLinks.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={item.href}
                  className={linkClasses(item.sectionId)}
                  onClick={(event) => handleNavClick(event, item)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle className="mt-4 w-full justify-center" />
        </div>
      )}
    </header>
  );
}
