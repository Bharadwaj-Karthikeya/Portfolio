import { AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { csSkills, designSkills, overlayStacks } from "../content/skills.js";

const fallVariants = {
  hidden: { y: -120, opacity: 0, scale: 0.9 },
  visible: (index) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.12,
      type: "spring",
      stiffness: 260,
      damping: 18,
    },
  }),
};

// Pre-set orbit coordinates so floating cards never overlap on different screens.
const designOrbitPositions = [
  { top: "18%", left: "28%" },
  { top: "34%", left: "68%" },
  { top: "58%", left: "18%" },
  { top: "78%", left: "60%" },
  { top: "46%", left: "82%" },
  { top: "22%", left: "82%" },
];

export default function SkillsShowcase() {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <section className="section-shell overflow-hidden">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Engineering Stack
          </p>
          <h2 className="text-3xl font-semibold text-text">
            Grounded CS skillset ready to drop into any box.
          </h2>
          <p className="text-base text-muted">
            Every icon below represents a craft thread—front-end systems,
            databases, automation—that I can stack quickly for hackathons or
            production prototypes.
          </p>
          <div className="relative mt-6 flex min-h-[260px] items-end justify-center rounded-[2rem] border border-white/5 bg-white/5 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <div className="relative z-10 flex w-full max-w-md flex-wrap justify-center gap-4">
              {csSkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  custom={index}
                  variants={fallVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex min-w-[140px] flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-glass backdrop-blur"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/80 shadow-glass">
                    <img
                      src={skill.icon}
                      alt={`${skill.label} icon`}
                      className="h-6 w-6 object-contain"
                      loading="lazy"
                    />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text">
                      {skill.label}
                    </p>
                    <p className="text-xs text-muted">Stack ready</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Design · Game Lab
          </p>
          <h2 className="text-3xl font-semibold text-text">
            Floating interfaces, game feel, and playful systems.
          </h2>
          <p className="text-base text-muted">
            These icons orbit an imaginary screen, symbolizing the experiments I
            run in Figma, Unity, and Blender.
          </p>
          <div className="relative rounded-[2.25rem] border border-white/5 bg-white/5 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/5 bg-white/5 p-6">
              <div className="relative h-64 overflow-hidden rounded-[1.25rem] border border-white/5 bg-white/5">
                {designSkills.map((skill, index) => {
                  const coords =
                    designOrbitPositions[index % designOrbitPositions.length];
                  return (
                    <motion.div
                      key={skill.id}
                      className="absolute flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-center shadow-lg backdrop-blur"
                      style={{
                        top: coords.top,
                        left: coords.left,
                        transform: "translate(-50%, -50%)",
                      }}
                      initial={{ x: 0, y: 0 }}
                      animate={{ x: [0, 10, -6, 0], y: [0, -8, 6, 0] }}
                      transition={{
                        duration: 8 + index,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/80 shadow-glass">
                        <img
                          src={skill.icon}
                          alt={`${skill.label} icon`}
                          className="h-7 w-7 object-contain"
                          loading="lazy"
                        />
                      </span>
                      <span className="text-xs font-semibold text-text">
                        {skill.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-text">
                <span>Design + Game skillboard</span>
                <button
                  type="button"
                  onClick={() => setOverlayOpen(true)}
                  className="inline-flex items-center gap-2 rounded-pill border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-text transition hover:bg-white/10"
                >
                  More skills <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {overlayOpen && (
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  Skill overlay
                </p>
                <h3 className="text-2xl font-semibold text-text">
                  Expanded toolkit
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOverlayOpen(false)}
                className="rounded-pill border border-white/20 p-2 text-text"
                aria-label="Close skill overlay"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-6 space-y-6 pr-2">
              {overlayStacks.map((stack, index) => (
                <motion.div
                  key={stack.title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur"
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1 * index,
                    type: "tween",
                    duration: 0.45,
                  }}
                >
                  <h4 className="text-lg font-semibold text-text">
                    {stack.title}
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    {stack.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}
