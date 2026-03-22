import { useMemo, useState, useCallback, useRef } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence } from "framer-motion";
import HeroIntro from "../sections/HeroIntro.jsx";
import { bioCards } from "../content/about.js";
import { csSkills, designSkills} from "../content/skills.js";
import {
  devProjects,
  gameProjects,
  uxCaseStudies,
} from "../content/projects.js";
import { contactMethods } from "../content/contact.js";

const aboutHighlights = [
  bioCards.find((card) => card.title === "Who I am currently"),
  bioCards.find((card) => card.title === "What I'm doing now"),
].filter(Boolean);

const statusMetrics = [
  {
    label: "Course",
    value: "B.Tech · Computer Science & Engineering",
    meta: "Lovely Professional University, Aug 2023 – Present",
  },
  {
    label: "Current base",
    value: "Phagwara, Punjab · Based in Hyderabad, Telangana",
    meta: "Open to internships & relocations",
  },
  { label: "CGPA", value: "8.56 / 10", meta: "Updated Mar 2026" },
  {
    label: "Project count",
    value:
      "10+ multi-domain builds (scaling from small curiosities to major projects)",
    meta: "UX/UI · Full Stack Dev · Game Dev",
  },
];

const manualInvertIconIds = new Set(["github", "express", "bash"]);

const iconNeedsDarkInvert = (icon = "", iconId = "") => {
  if (!icon && !iconId) {
    return false;
  }

  const normalizedIcon = icon.toLowerCase();
  const normalizedId = iconId.toLowerCase();
  const hasPureBlackFill =
    normalizedIcon.includes("/000000") ||
    normalizedIcon.includes("=000000") ||
    normalizedIcon.includes("%23000000");

  return manualInvertIconIds.has(normalizedId) || hasPureBlackFill;
};

const toolDictionary = [...csSkills, ...designSkills].reduce((acc, item) => {
  acc[item.label.toLowerCase()] = {
    ...item,
    invertOnDark: iconNeedsDarkInvert(item.icon, item.id),
  };
  return acc;
}, {});

const skillDomainCards = [
  {
    id: "frontend",
    title: "Frontend & Web",
    summary:
      "Responsive, accessible interfaces with motion systems and rapid shipping loops.",
    skillset: [
      "Responsive layout systems",
      "Accessibility-first semantics",
      "Component-driven animation",
    ],
    tools: [
      "React",
      "Vite",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Vercel",
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    summary: "Node-powered services that pair with frontend experiments.",
    skillset: ["REST API design", "Auth/session flows", "Database modeling"],
    tools: ["Node.js", "Express", "MongoDB", "Postman", "Vercel"],
  },
  {
    id: "programming",
    title: "Programming & CS",
    summary: "Core languages and CS depth that anchor every project.",
    skillset: [
      "C / C++ foundations",
      "Python + scripting",
      "DSA & system design (learning)",
    ],
    tools: ["C++", "C#", "Python", "SQL", "Bash"],
  },
  {
    id: "ux",
    title: "UX & Product",
    summary: "Research-led product thinking that threads through to delivery.",
    skillset: [
      "UX research methods",
      "Journey / service mapping",
      "Usability testing & storytelling",
    ],
    tools: ["Figma", "Miro", "Balsamiq", "Material UI", "Notion"],
  },
  {
    id: "design",
    title: "Design & Visual",
    summary: "Visual craft for decks, systems, and playful stories.",
    skillset: [
      "Figma component libraries",
      "Illustration & photo editing",
      "Narrative prototyping",
    ],
    tools: [
      "Figma",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Blender",
      "Canva",
    ],
  },
  {
    id: "game",
    title: "Game & Interactive",
    summary: "Unity experimentation to sharpen motion and feedback.",
    skillset: ["Unity 2D / 3D flows", "C# scripting", "Gameplay feel tuning"],
    tools: ["Unity", "Blender", "C#"],
  },
  {
    id: "ops",
    title: "Tools & Ops",
    summary: "Workflow glue that keeps builds ship-ready.",
    skillset: ["Git / GitHub", "Shell scripting", "Automation notes"],
    tools: ["GitHub", "Bash", "Postman", "Vercel"],
  },
];

const projectSkillMap = {
  "NutriFit – Smart Nutrition and Fitness Tracking App Design": [
    "UX research",
    "Service blueprints",
    "Figma UI",
    "Infomation Architecture",
  ],
  "ReminDose – Smart Medication Reminder System": [
    "Journey mapping",
    "UI systems",
    "Figma prototyping",
    "Component Design",
  ],
  "UniQServe – Smart Cafeteria Management Solution": [
    "Operations mapping",
    "Design systems",
    "User Interviews",
    "User flows",
  ],
  "Liberams – Library Management System": [
    "React + Redux frontend",
    "Node + Express API",
    "MongoDB data modeling",
  ],
  "BuckAI – Budget Planning Chatbot": [
    "Gemini API",
    "Prompt design",
    "Responsive UI",
  ],
  "Populus – Population insights microsite": [
    "HTML",
    "CSS",
    "Storytelling",
    "Blogging",
  ],
  "Emoji Match Card Game": [
    "Unity",
    "C#",
    "Game feel",
    "Animation",
    "Game design",
  ],
};

const projectDomainsRaw = [
  {
    id: "ux",
    number: "01",
    title: "UX/UI Case Studies",
    summary:
      "Research-led case studies with IA, usability passes, and high-fidelity storytelling.",
    highlights: [
      "Discovery sprints",
      "Information architecture",
      "Figma libraries",
    ],
    data: uxCaseStudies,
    fallbackSkills: ["Research", "Figma", "IA"],
  },
  {
    id: "dev",
    number: "02",
    title: "Development Projects",
    summary:
      "Frontend and API experiments that ship validated flows into working code.",
    highlights: ["React / Vite", "API orchestration", "Semantic HTML"],
    data: devProjects,
    fallbackSkills: ["React", "Node", "CSS"],
  },
  {
    id: "games",
    number: "03",
    title: "Game & Experiential",
    summary:
      "Unity builds and playful systems to sharpen animation, motion, and feedback loops.",
    highlights: ["Unity", "C#", "Motion studies"],
    data: gameProjects,
    fallbackSkills: ["Unity", "C#", "UX"],
  },
];

const experienceItems = [
  {
    title: "President · Club Deloitte LPU",
    timeframe: "Oct 2023 – Jan 2025",
    location: "Phagwara, Punjab",
    description:
      "Lead critique circles, design jams, and mentorship sessions that sharpen peer UX, storytelling, and tech skills.",
  },
  {
    title: "Graphic Designer · E-Cell LPU",
    timeframe: "Sep 2024 – Nov 2024",
    location: "Phagwara, Punjab",
    description:
      "Translate founder stories into decks, event graphics, and landing screens under tight timelines.",
  },
];

const trainingItems = [
  {
    title: "Game Development using Unity & C#",
    org: "CipherSchools",
    timeframe: "Jun – Aug 2025",
    summary:
      "2-month intensive covering 2D/3D flows, UI integration, modular scripts, shipped Emoji Match.",
  },
  {
    title: "Object Oriented Programming with C++",
    org: "iamneo",
    timeframe: "Aug – Dec 2024",
    summary:
      "Applied OOP design patterns and efficiency drills for coursework and side projects.",
  },
  {
    title: "Essential Technologies for Business",
    org: "edX · IBM",
    timeframe: "Jan – Jun 2024",
    summary:
      "Explored cloud, AI, and analytics fundamentals to inform product strategy decisions.",
  },
  {
    title: "Responsive Web Design",
    org: "freeCodeCamp",
    timeframe: "Aug – Oct 2023",
    summary:
      "600+ hours of semantic HTML, accessibility, and CSS system practice.",
  },
];

const educationHistory = [
  {
    school: "Lovely Professional University",
    credential: "B.Tech · Computer Science & Engineering",
    timeframe: "Aug 2023 – Present",
    location: "Phagwara, Punjab",
    detail: "CGPA 8.51 / 10",
  },
  {
    school: "Page Junior College",
    credential: "Intermediate (MPC / PCM)",
    timeframe: "May 2021 – Apr 2023",
    location: "Hyderabad, Telangana",
    detail: "Percentage 90.9%",
  },
  {
    school: "Narayana E-Techno School",
    credential: "Matriculation",
    timeframe: "May 2020 – Apr 2021",
    location: "Hyderabad, Telangana",
    detail: "CGPA 10.0",
  },
];

export default function SinglePage() {
  const [activeDomain, setActiveDomain] = useState(null);
  const [status, setStatus] = useState("idle");
  const formRef = useRef(null);

  const projectDomains = useMemo(
    () =>
      projectDomainsRaw.map((domain) => ({
        ...domain,
        projects: domain.data.map((project) => ({
          ...project,
          skills: projectSkillMap[project.title] ?? domain.fallbackSkills,
        })),
      })),
    [],
  );

  const activeDomainData =
    projectDomains.find((domain) => domain.id === activeDomain) ?? null;

  const contactCards = useMemo(
    () =>
      contactMethods.map((method) => ({
        ...method,
        invertOnDark: iconNeedsDarkInvert(
          method.icon,
          method.id ?? method.label,
        ),
      })),
    [],
  );

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    if (!formRef.current) {
      return;
    }

    try {
      setStatus("sending");
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_hi1b5ze",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_default",
        formRef.current,
        {
          publicKey:
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "zQRRu5e09yRjqSyqR",
        },
      );
      formRef.current.reset();
      setStatus("sent");
    } catch (error) {
      console.error("Failed to send message", error);
      setStatus("error");
    } finally {
      window.setTimeout(() => setStatus("idle"), 4000);
    }
  }, []);

  return (
    <div className="space-y-0 w-[90%] mx-auto py-8" data-page="single">
      <HeroIntro />

      <section id="about" className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_0.45fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              About
            </p>
            <h2 className="text-3xl font-semibold text-text">
              Blending UX craft with front-end builds so research quickly
              becomes a prototype.
            </h2>
            <div className="space-4 flex flex-wrap gap-6">
              {aboutHighlights.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10 backdrop-blur hover-lift"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                    {card.title}
                  </p>
                  <p className="mt-3 text-m text-muted">{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-[2.25rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur hover-lift">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              My status
            </p>
            <ul className="mt-4 space-y-4">
              {statusMetrics.map((metric) => (
                <li
                  key={metric.label}
                  className="border-b border-white/10 pb-4 last:border-none last:pb-0"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-base font-semibold text-text">
                    {metric.value}
                  </p>
                  {metric.meta && (
                    <p className="text-sm text-muted">{metric.meta}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="skills" className="section-shell">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Skills
          </p>
          <h2 className="text-3xl font-semibold text-text">
            Skill domains I rotate through daily.
          </h2>
          <p className="text-base text-muted">
            Engineering, design, and leadership stacks each have their own
            playbooks—but they stay tightly linked so discoveries can become
            working demos within the same sprint.
          </p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {skillDomainCards.map((domain) => {
            const resolvedTools = domain.tools
              .map((toolLabel) => toolDictionary[toolLabel.toLowerCase()])
              .filter(Boolean);

            return (
              <article
                key={domain.id}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/15 backdrop-blur hover-lift"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  Skill domain
                </p>
                <div className="mt-1 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-text">
                      {domain.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{domain.summary}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                    Skillset
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    {domain.skillset.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                    Tools
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {resolvedTools.map((tool) => (
                      <span
                        key={tool.id}
                        className="tool-chip border border-${theme} bg-white/5 px-3 py-1 text-sm font-medium text-text backdrop-blur relative inline-flex items-center gap-2"
                      >
                        <img
                          src={tool.icon}
                          alt={tool.label}
                          className={`h-6 w-6 object-contain  ${
                            tool.invertOnDark ? "auto-dark-invert" : ""
                          }`}
                          loading="lazy"
                        />
                        <span className="tool-chip-label" aria-hidden="true">
                          {tool.label}
                        </span>
                        <span className="sr-only">{tool.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="experience" className="section-shell">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Experience & trainings
          </p>
          <h2 className="text-3xl font-semibold text-text">
            Leading clubs, building branding, and stacking certifications.
          </h2>
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.55fr_0.45fr]">
          <div className="space-y-4">
            {experienceItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10 backdrop-blur hover-lift"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  {item.timeframe}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-text">
                  {item.title}
                </h3>
                <p className="text-sm text-muted">{item.location}</p>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/15 backdrop-blur hover-lift">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Trainings & certificates
            </p>
            <ul className="mt-4 space-y-4">
              {trainingItems.map((training) => (
                <li
                  key={training.title}
                  className="border-b border-white/10 pb-4 last:border-none last:pb-0 "
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-base font-semibold text-text">
                      {training.title}
                    </p>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                      {training.timeframe}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{training.org}</p>
                  <p className="mt-2 text-sm text-muted">{training.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="projects" className="section-shell">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Projects by domain
          </p>
          <h2 className="text-3xl font-semibold text-text">
            Each domain gets its own backlog and featured work.
          </h2>
          <p className="text-base text-muted">
            Tap a domain below to bring its featured builds into focus. Each
            expands with quick links out to Behance case studies and GitHub
            repos when you want more detail.
          </p>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {projectDomains.map((domain) => (
            <article
              key={domain.id}
              className="flex flex-col rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-left shadow-xl shadow-black/15 backdrop-blur "
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">
                  {domain.number}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                  {domain.projects.length.toString().padStart(2, "0")} projects
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-text">
                {domain.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{domain.summary}</p>
              <ul className="mt-4 space-y-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                {domain.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setActiveDomain(domain.id)}
                className="mt-5 inline-flex items-center gap-2 rounded-pill border border-white/20 px-4 py-2 text-sm font-semibold text-accent hover-ring"
              >
                View projects →
              </button>
            </article>
          ))}
        </div>

        <AnimatePresence>
          {activeDomainData && (
            <motion.div
              key={activeDomainData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/25 backdrop-blur "
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                    {activeDomainData.title}
                  </p>
                  <p className="mt-1 text-base text-muted">
                    {activeDomainData.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveDomain(null)}
                    className="rounded-pill border border-white/20 px-4 py-2 text-sm font-semibold text-text hover-ring"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activeDomainData.projects.map((project) => (
                  <article
                    key={project.title}
                    className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur hover-lift"
                  >
                    <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-40 w-full object-cover"
                      />
                      {project.context && (
                        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white">
                          {project.context}
                        </span>
                      )}
                    </div>
                    <h4 className="mt-4 text-lg font-semibold text-text">
                      {project.title}
                    </h4>
                    <p className="mt-2 flex-1 text-sm text-muted">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span key={skill} className="project-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section id="education" className="section-shell">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Education
          </p>
          <h2 className="text-3xl font-semibold text-text">
            Academic trail that keeps the fundamentals sharp.
          </h2>
        </div>
        <div className="mt-6 grid gap-4">
          {educationHistory.map((entry) => (
            <article
              key={entry.school}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10 backdrop-blur hover-lift"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-text">
                  {entry.school}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                  {entry.timeframe}
                </span>
              </div>
              <p className="text-sm text-muted">{entry.location}</p>
              <p className="mt-2 text-base text-text">{entry.credential}</p>
              <p className="text-sm text-muted">{entry.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="connect" className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Connect
            </p>
            <h2 className="text-3xl font-semibold text-text">
              Let’s build, review, or jam on ideas.
            </h2>
            <p className="text-base text-muted">
              Email works fastest, but I check LinkedIn, GitHub, and Behance for
              collaboration notes and feedback swaps.
            </p>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur ">
              <ul className="space-y-4">
                {contactCards.map((method) => (
                  <li
                    key={method.label}
                    className="border-b border-white/10 pb-4 last:border-none last:pb-0 flex flex-row items-center justify-between gap-2 "
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={method.icon}
                        alt={`${method.label} icon`}
                        className={`h-5 w-5 object-contain ${
                          method.invertOnDark ? "auto-dark-invert" : ""
                        }`}
                        loading="lazy"
                      />
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                        {method.label}
                      </span>
                    </div>
                    {method.href && method.value && (
                      <>
                        <span className="mt-2 text-base font-semibold text-text">
                          <a
                            href={method.href}
                            className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-text link-wisp"
                          >
                            {method.value} →
                          </a>
                        </span>
                      </>
                    )}
                    {method.value && !method.href && (
                      <span className="mt-2 text-base font-semibold text-text">
                        {method.value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-accent-soft/50 via-white/10 to-transparent p-8 shadow-2xl shadow-black/25 ">
            <h3 className="text-2xl font-semibold text-text">
              Send a quick note
            </h3>
            <p className="mt-2 text-base text-muted">
              Share what you’re building, what role you’re hiring for, or the
              feedback you’d like. I reply within a day whenever possible.
            </p>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
              noValidate
            >
              <label className="block text-sm font-semibold text-text">
                Name
                <input
                  type="text"
                  name="name"
                  required
                  minLength={2}
                  className="input-shell mt-2"
                  placeholder="Your name"
                />
              </label>
              <label className="block text-sm font-semibold text-text">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="input-shell mt-2"
                  placeholder="name@email.com"
                />
              </label>
              <label className="block text-sm font-semibold text-text">
                Message
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="input-shell mt-2 resize-none"
                  placeholder="Tell me about the project, role, or idea"
                ></textarea>
              </label>
              <button
                type="submit"
                className="w-full rounded-pill bg-accent px-5 py-3 text-base font-semibold text-black hover-ring disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
              <p
                role="status"
                aria-live="polite"
                className={`text-sm font-semibold ${
                  status === "sent"
                    ? "text-green-500"
                    : status === "error"
                      ? "text-red-500"
                      : "text-accent"
                } ${status === "idle" ? "opacity-0" : "opacity-100"}`}
              >
                {status === "sent"
                  ? "Thanks for reaching out! I’ll reply shortly."
                  : status === "error"
                    ? "Something went wrong. Please try again."
                    : status === "sending"
                      ? "Sending your message..."
                      : ""}
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
