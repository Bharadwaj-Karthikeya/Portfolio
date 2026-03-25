import { motion } from "framer-motion";
import { heroOrbits } from "../content/home.js";
import { socialLinks } from "../content/socials.js";
import { useTheme } from "../context/ThemeContext.jsx";

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroIntro() {
  const { theme } = useTheme();
  const orbitConfigs = [
    { top: "-5%", left: "75%", delay: 0 },
    { top: "25%", left: "-5%", delay: 0.2 },
    { top: "100%", left: "45%", delay: 0.4 },
  ];
  const resumeHref = "/media/BharadwajCV_2026.pdf";

  return (
    <section id="hero" className="section-shell border-none overflow-hidden flex min-h-[90vh] items-center">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-center w-full mx-auto ">
        
        {/* Left Side: Text and CTA */}
        <motion.div
          className="flex-1 space-y-8 z-10"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
        >
          {/* Status Indicator */}
          <motion.div variants={heroVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface border border-text/5 shadow-sm">
             <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
             </span>
             <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-text">
               Open to internships & freelance & full time  
             </p>
          </motion.div>

          <motion.h1
            variants={heroVariants}
            className="text-3xl font-black tracking-tight text-text md:text-5xl lg:text-[3rem] leading-[1.05]"
          >
            Reimagining <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-strong animate-pulse pr-2">user experiences</span> and building <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-accent-strong to-accent animate-pulse pr-2">intuitive interfaces</span> with technology.
          </motion.h1>

          <motion.div variants={heroVariants} className="space-y-3">
            <p className="text-2xl font-bold text-text">
              Hello, I&apos;m Bharadwaj Karthikeya
            </p>
            <div className="inline-flex flex-wrap items-center gap-2 text-xs md:text-base font-semibold text-muted bg-card-soft px-5 py-2.5 rounded-full shadow-sm border border-text/5">
              <span>UX/UI Designer</span>
              <span className="text-accent">•</span>  
              <span>Full Stack Web Developer</span>
              <span className="text-accent">•</span>
              <span>Game Developer</span>
            </div>
          </motion.div>

          <motion.p
            variants={heroVariants}
            className="max-w-xl text-lg text-muted font-medium leading-relaxed"
          >
            I sketch flows, make quick prototypes with peers for projects, and then build the solutions with clean HTML/CSS/JS so feedback turns into a tangible experience fast.
          </motion.p>

          <motion.div variants={heroVariants} className="flex flex-wrap items-center gap-5 pt-4">
            <a
              href={resumeHref}
              download
              className="px-8 py-4 bg-text text-canvas rounded-full font-bold text-base transition-transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Download Resume
            </a>
            <a
              href="#connect"
              className="group flex items-center gap-3 px-8 py-4 bg-surface text-text rounded-full font-bold text-base transition-all hover:bg-card hover:-translate-y-1 shadow-sm border border-text/5"
              onClick={(event) => {
                event.preventDefault();
                const target = document.getElementById("connect");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              Let&apos;s Talk <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          <motion.div
            variants={heroVariants}
            className="flex flex-wrap gap-4 pt-4"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center justify-center h-12 w-12 rounded-full bg-card shadow-sm border border-text/5 hover:border-accent hover:-translate-y-1 transition-all"
              >
                <img
                  src={social.icon}
                  alt={social.label}
                  className={`h-8 w-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity ${theme === "dark" && social.label !== "Email" && social.label !== "LinkedIn" ? "invert" : ""}`}
                />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: Image and Orbits */}
        <motion.div
          className="relative flex flex-1 justify-center items-center py-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
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
                className="absolute inline-flex items-center justify-center rounded-full border border-text/10 backdrop-blur-md px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-text shadow-xl z-20 pointer-events-none"
                style={{
                  top: config.top,
                  left: config.left,
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(20, 15, 50, 0.4)"
                      : "rgba(255, 255, 255, 0.4)",
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
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
          
          <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[400px] lg:h-[400px] p-2 group z-10 flex items-center justify-center">
            {/* Glow effect behind */}
             <div className="absolute inset-0  bg-gradient-to-tr from-accent to-accent-strong opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
             
             {/* Image container */}
             <div className="relative w-full h-full rounded-[4rem] overflow-hidden border-8 border-surface shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                <img
                  src="/media/portfolioSelfImage.png"
                  alt="Bharadwaj portrait"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable="false"
                />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
