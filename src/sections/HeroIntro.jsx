import { motion } from "framer-motion";
import { heroOrbits } from "../content/home.js";
import { socialLinks } from "../content/socials.js";
import { useTheme } from "../context/ThemeContext.jsx";

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroIntro() {
  const { theme } = useTheme();
  const orbitConfigs = [
    { top: "-16%", left: "65%", delay: 0 },
    { top: "38%", left: "-10%", delay: 0.2 },
    { top: "115%", left: "52%", delay: 0.4 },
  ];
  const resumeHref = "/media/Bharadwaj-Karthikeya-Resume.pdf";

  return (
    <section id="hero" className="section-shell border-none overflow-hidden">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
        <motion.div
          className="flex-1 space-y-6"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.p
            variants={heroVariants}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-accent"
          >
            Portfolio · Home
          </motion.p>
          <motion.h1
            variants={heroVariants}
            className="text-3xl font-semibold text-text md:text-4xl"
          >
            Reimagining user experiences and building intuitive interfaces with
            technology.
          </motion.h1>
          <motion.div variants={heroVariants} className="space-y-1 text-text">
            <p className="text-lg font-semibold">
              Hello, I&apos;m Bharadwaj Karthikeya
            </p>
            <p className="text-base text-muted">
              UX/UI Designer ·{" "}
              <span className="rounded-pill bg-accent-soft px-3 py-1 text-sm font-semibold text-text">
                Open to internships and work
              </span>
            </p>
          </motion.div>
          <motion.p
            variants={heroVariants}
            className="max-w-xl text-base text-muted"
          >
            I sketch flows, test quick prototypes with peers for projects, and
            then build the solutions with clean HTML/CSS/JS so feedback turns
            into a tangible experience fast.
          </motion.p>
          <motion.div variants={heroVariants} className="flex flex-wrap gap-4">
            <a
              href={resumeHref}
              download
              className={`rounded-pill bg-accent px-5 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5`}
            >
              Download Resume
            </a>
            <a
              href="#connect"
              className="rounded-pill border border-accent px-5 py-3 text-base font-semibold text-accent transition hover:-translate-y-0.5"
              onClick={(event) => {
                event.preventDefault();
                const target = document.getElementById("connect");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              Contact Me
            </a>
          </motion.div>
          <motion.div
            variants={heroVariants}
            className="flex flex-wrap gap-3 text-sm font-semibold text-text"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border px-2 py-2 text-xs uppercase tracking-[0.3em] text-text  hover:bg-accent-soft "
                style={{
                  borderColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.25)"
                      : "rgba(31, 26, 50, 0.25)",
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(20, 15, 50, 0.45)"
                      : "rgba(255, 255, 255, 0.6)",
                }}
              >
                {social.icon && (
                  <img
                    src={social.icon}
                    alt={`${social.label} icon`}
                    className={`h-8 w-8  ${theme === "dark" && social.label !== "Email" && social.label !== "LinkedIn" ? "invert" : ""} `}
                    loading="lazy"
                  />
                )}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex flex-1 justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {heroOrbits.map((label, index) => {
            const config = orbitConfigs[index] ?? {
              top: "0%",
              left: "0%",
              delay: 0,
            };
            return (
              <motion.span
                key={label}
                className="absolute inline-flex items-center justify-center rounded-pill border border-white/30 px-4 py-1 text-xs font-semibold text-text shadow-glass"
                style={{
                  top: config.top,
                  left: config.left,
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(20, 15, 50, 0.9)"
                      : "rgba(255, 255, 255, 0.9)",
                }}
                initial={{ opacity: 1, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.05, 1],
                  y: [0, -6, 0],
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 6 + index,
                  delay: config.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {label}
              </motion.span>
            );
          })}
          <div className="relative h-80 w-72 max-w-full rounded-[2.5rem] border border-white/10 bg-[rgba(255,255,255,0.12)] p-4 shadow-glass">
            <div className="absolute inset-4 rounded-[2rem] bg-card-soft p-4 backdrop-blur">
              <img
                src="/media/selfimage.jpg"
                alt="Bharadwaj portrait"
                className="h-full w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
