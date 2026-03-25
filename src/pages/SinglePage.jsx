import { useMemo, useState, useCallback, useRef } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import HeroIntro from "../sections/HeroIntro.jsx";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};
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
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    summary: "Node-powered services that pair with frontend experiments.",
    skillset: ["REST API design", "Auth/session flows", "Database modeling"],
    tools: ["Node.js", "Express", "MongoDB", "Postman"],
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
    tools: ["C++", "C#", "Python", "JavaScript", "SQL", "Bash"],
  },
  {
    id: "ux",
    title: "UX & Product",
    summary: "Research-led product thinking that threads through to delivery.",
    skillset: [
      "UX Research & Writing",
      "Journey / service mapping",
      "Case Study Writing & Design",
      "Design Thinking",

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
      "Color Theory",
      "Typography",
      "UI Designing and Prototyping",
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
    skillset: ["Unity 2D / 3D flows", "C# scripting", "Gameplay tuning"],
    tools: ["Unity", "Blender", "C#"],
  },
  {
    id: "ops",
    title: "Tools & Ops",
    summary: "Workflow glue that keeps builds ship-ready.",
    skillset: ["Git / GitHub", "Shell scripting"],
    tools: ["GitHub", "Bash", "Postman", "Vercel", "Render"],
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
    timeframe: "Oct 2023 – Jan 2023",
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

const trainingPrograms = [
  {
    title: "Game Development using Unity & C#",
    org: "CipherSchools",
    timeframe: "Jun 2025 – Aug 2025",
    summary:
      "2-month intensive covering 2D/3D flows, UI integration, modular scripts, shipped Emoji Match.",
  },
];

const certificationsList = [
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
    if (!formRef.current) return;

    // Explicit manual validation check
    const formData = new FormData(formRef.current);
    const name = formData.get("user_name");
    const email = formData.get("user_email");
    const message = formData.get("message");

    if (!name?.trim() || !email?.trim() || !message?.trim() || !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    try {
      setStatus("sending");
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey:
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
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
    <div className="flex flex-col gap-20 sm:gap-32 md:gap-40 mx-auto md:mt-[-60px] " data-page="single">
      <HeroIntro />

      {/* ABOUT SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-200px" }}
        variants={sectionVariants}
        id="about" className="section-shell relative"
      >
        <div className="flex flex-col items-center text-center space-y-12">
          <div className="space-y-4 max-w-4xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">About Me</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-text leading-tight tracking-tight">
              Bridging the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-strong italic pr-2">UX craft</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-strong to-text italic pr-2">front-end builds</span>.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 w-full mt-10">
            {aboutHighlights.map((card) => (
              <motion.article variants={itemVariants} key={card.title} className="text-left p-10 rounded-[3rem] bg-gradient-to-br from-surface-soft to-transparent border border-text/5 hover-lift shadow-xl backdrop-blur-sm">
                 <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">{card.title}</p>
                 <p className="text-xl text-text font-bold leading-relaxed">{card.copy}</p>
              </motion.article>
            ))}
          </div>

          {/* Status Metrics Ribbon */}
          <div className="w-full flex flex-wrap justify-center gap-4 mt-8">
             {statusMetrics.map((metric) => (
               <div key={metric.label} className="flex flex-col items-center py-5 px-8 rounded-full bg-card-soft backdrop-blur-md shadow-lg border border-text/5 hover:-translate-y-1 transition-transform">
                 <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted">{metric.label}</p>
                 <p className="mt-1 text-sm md:text-base font-bold text-text">{metric.value}</p>
               </div>
             ))}
          </div>
        </div>
      </motion.section>

      {/* SKILLS SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-200px" }}
        variants={sectionVariants}
        id="skills" className="section-shell relative"
      >
        <div className="space-y-6 text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Capabilities</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-text tracking-tight">Skill domains I rotate through daily.</h2>
        </div>
        
        <div className="flex flex-col gap-16 md:gap-24">
          {skillDomainCards.map((domain, index) => {
            const resolvedTools = domain.tools.map(t => toolDictionary[t.toLowerCase()]).filter(Boolean);
            return (
              <motion.div variants={itemVariants} key={domain.id} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16 group`}>
                 <div className="flex-1 space-y-5">
                    <p className="text-sm font-black text-accent/50 text-6xl opacity-30 -mb-6 tracking-tighter">0{index + 1}</p>
                    <h3 className="text-4xl font-black text-text tracking-tight">{domain.title}</h3>
                    <p className="text-xl text-muted font-medium pb-4 max-w-md">{domain.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {domain.skillset.map(item => (
                        <span key={item} className="px-4 py-2 rounded-full bg-surface-soft border border-text/5 text-xs font-bold text-text uppercase tracking-wider">{item}</span>
                      ))}
                    </div>
                 </div>
                 <div className="flex-1 flex flex-wrap gap-6 justify-center md:justify-start lg:px-10">
                    {resolvedTools.map(tool => (
                      <div key={tool.id} className="group relative flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-[1.5rem] rotate-3 bg-accent-soft shadow-2xl border border-text/5 hover:border-accent hover:rotate-0 hover:-translate-y-3 transition-all duration-300">
                         <img src={tool.icon} alt={tool.label} className={`w-8 h-8 object-contain ${tool.invertOnDark ? "auto-dark-invert" : ""}`} />
                         <span className="absolute -bottom-8 md:-bottom-12 opacity-0  group-hover:opacity-100 transition-opacity duration-300 bg-text text-canvas text-[0.65rem] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl flex z-20 pointer-events-none">{tool.label}</span>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* EXPERIENCE & EDUCATION UNIFIED */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-200px" }}
        variants={sectionVariants}
        id="experience" className="section-shell relative"
      >
        <div className="text-center space-y-6 mb-20 max-w-3xl mx-auto">
           <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Journey</p>
           <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-text tracking-tight">Experience & Education.</h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-32 relative before:absolute before:inset-y-0 before:left-1/2 before:-translate-x-1/2 before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-text/10 before:to-transparent before:hidden lg:before:block">
           {/* Left Column: Training & Academics */}
           <div className="space-y-12 lg:space-y-24">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-accent text-center lg:text-right mb-8 lg:mb-12">Training</h3>
                <div className="space-y-12 lg:space-y-16">
                  {trainingPrograms.map(training => (
                    <motion.div variants={itemVariants} key={training.title} className="relative group pl-8 lg:pl-0 lg:pr-16 lg:text-right ">
                       {/* Marker */}
                       <div className="absolute left-0 lg:left-auto lg:-right-[0.4rem] top-3 w-4 h-4 rounded-full bg-surface-soft ring-4 ring-text shadow-sm hidden lg:block z-10"></div>
                       <p className="text-sm font-bold text-muted mb-2 uppercase tracking-widest">{training.timeframe}</p>
                       <h4 className="text-3xl font-bold text-text mb-2 tracking-tight">{training.title}</h4>
                       <p className="text-[0.65rem] font-bold text-accent mb-4 uppercase tracking-[0.25em]">{training.org}</p>
                       <p className="text-lg text-muted font-medium bg-card-soft p-6 rounded-[2rem] border border-text/5 shadow-lg inline-block text-left lg:text-right">{training.summary}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-accent text-center lg:text-right mb-8 lg:mb-12">Academics</h3>
                <div className="space-y-12 lg:space-y-16">
                  {educationHistory.map((entry) => (
                    <motion.div variants={itemVariants} key={entry.school} className="relative group pl-8 lg:pl-0 lg:pr-16 lg:text-right ">
                       <div className="absolute left-0 lg:left-auto lg:-right-[0.4rem] top-3 w-4 h-4 rounded-full bg-surface-soft ring-4 ring-text shadow-sm hidden lg:block z-10"></div>
                       <p className="text-xs font-bold text-muted mb-2 uppercase tracking-widest">{entry.timeframe}</p>
                       <h4 className="text-3xl font-bold text-text mb-2 tracking-tight">{entry.school}</h4>
                       <p className="text-[0.65rem] font-bold text-accent mb-4 uppercase tracking-[0.25em]">{entry.location}</p>
                       <div className="bg-card-soft p-6 rounded-[2rem] border border-text/5 shadow-lg inline-block text-left lg:text-right w-full">
                          <p className="text-xl font-bold text-text mb-2">{entry.credential}</p>
                          <p className="text-sm text-muted font-medium">{entry.detail}</p>
                       </div>
                    </motion.div>
                  ))}
                </div>
              </div>
           </div>

           {/* Right Column: Leadership & Certifications */}
           <div className="space-y-12 lg:space-y-24 mt-0 lg:mt-32">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-accent text-center lg:text-left mb-8 lg:mb-12">Leadership & Roles</h3>
                <div className="space-y-12 lg:space-y-16">
                  {experienceItems.map((item) => (
                    <motion.div variants={itemVariants} key={item.title} className="relative group pl-8 lg:pl-16 lg:text-left ">
                       {/* Marker */}
                       <div className="absolute left-0 lg:-left-[0.4rem] top-3 w-4 h-4 rounded-full bg-surface-soft ring-4 ring-text shadow-sm hidden lg:block z-10"></div>
                       <p className="text-sm font-bold text-muted mb-2 uppercase tracking-widest">{item.timeframe}</p>
                       <h4 className="text-3xl font-bold text-text mb-2 tracking-tight">{item.title}</h4>
                       <p className="text-[0.65rem] font-bold text-accent mb-4 uppercase tracking-[0.25em]">{item.location}</p>
                       <p className="text-lg text-muted font-medium bg-card-soft p-6 rounded-[2rem] border border-text/5 shadow-lg inline-block text-left">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-accent text-center lg:text-left mb-8 lg:mb-12">Certifications</h3>
                <div className="space-y-12 lg:space-y-16">
                  {certificationsList.map(cert => (
                    <motion.div variants={itemVariants} key={cert.title} className="relative group pl-8 lg:pl-16 lg:text-left ">
                       {/* Marker */}
                       <div className="absolute left-0 lg:-left-[0.4rem] top-3 w-4 h-4 rounded-full bg-surface-soft ring-4 ring-text shadow-sm hidden lg:block z-10"></div>
                       <p className="text-sm font-bold text-muted mb-2 uppercase tracking-widest">{cert.timeframe}</p>
                       <h4 className="text-3xl font-bold text-text mb-2 tracking-tight">{cert.title}</h4>
                       <p className="text-[0.65rem] font-bold text-accent mb-4 uppercase tracking-[0.25em]">{cert.org}</p>
                       <p className="text-lg text-muted font-medium bg-card-soft p-6 rounded-[2rem] border border-text/5 shadow-lg inline-block text-left">{cert.summary}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
           </div>
        </div>
      </motion.section>

      {/* PROJECTS SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-200px" }}
        variants={sectionVariants}
        id="projects" className="section-shell relative"
      >
        <div className="text-center space-y-6 mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Selected Work</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-text tracking-tight">Projects by domain.</h2>
          <p className="text-lg text-muted font-medium">Click on a category to dive into the cases and builds.</p>
        </div>

        <div className="flex justify-center flex-wrap gap-4 md:gap-6 mb-16 relative z-20">
           {projectDomains.map(domain => (
             <button
                key={domain.id}
                onClick={() => setActiveDomain(activeDomain === domain.id ? null : domain.id)}
                className={`px-8 py-5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-400 border border-transparent ${activeDomain === domain.id ? 'bg-text text-canvas shadow-2xl scale-105' : 'bg-accent shadow-lg hover:shadow-xl text-canvas hover:border-text/10 hover:-translate-y-1'}`}
             >
               {domain.title}
             </button>
           ))}
        </div>

        <AnimatePresence mode="wait">
          {activeDomainData && (
             <motion.div
                key={activeDomainData.id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, staggerChildren: 0.15 } }
                }}
                className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12"
             >
                {activeDomainData.projects.map(project => (
                   <motion.article variants={itemVariants} key={project.title} className="group relative rounded-[2.5rem] overflow-hidden bg-card border border-text/5 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                      <div className="relative h-72 md:h-80 w-full overflow-hidden">
                         <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                         {project.context && (
                           <span className="absolute top-6 left-6 px-4 py-2 rounded-full bg-accent backdrop-blur-md border border-white/10 text-white text-[0.65rem] font-bold uppercase tracking-widest">{project.context}</span>
                         )}
                         <div className="absolute bottom-8 left-8 right-8">
                            <h4 className="text-3xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">{project.title}</h4>
                            <div className="flex flex-wrap gap-2">
                               {project.skills.map(skill => (
                                 <span key={skill} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-sm text-[0.6rem] font-bold uppercase tracking-widest">{skill}</span>
                               ))}
                            </div>
                         </div>
                      </div>
                      <div className="p-8 pb-10">
                         <p className="text-lg text-text font-medium leading-relaxed">{project.description}</p>
                      </div>
                   </motion.article>
                ))}
             </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* CONNECT SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-200px" }}
        variants={sectionVariants}
        id="connect" className="section-shell relative flex flex-col items-center justify-center text-center mt-12"
      >
         <div className="max-w-4xl mx-auto space-y-10 w-full">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Let&apos;s Connect</p>
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-text leading-[1.05] tracking-tight">Let&apos;s build, review, or <br/><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-strong pr-2">jam on ideas.</span></h2>
            
            <div className="flex flex-wrap justify-center gap-6 pt-10">
               {contactCards.filter(c => c.href).map(method => (
                  <a key={method.label} href={method.href} className="group relative flex items-center gap-4 px-8 py-5 rounded-full bg-card shadow-lg border border-text/5 hover:border-accent hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                     <img src={method.icon} alt={method.label} className={`w-7 h-7 object-contain ${method.invertOnDark ? "auto-dark-invert" : ""}`} />
                     <span className="text-base font-bold text-text group-hover:text-accent transition-colors">{method.value}</span>
                  </a>
               ))}
            </div>

            <div className="bg-gradient-to-br from-card-soft to-surface-soft rounded-[3.5rem] p-10 md:p-16 rounded-tr-[8rem] shadow-2xl border border-text/5 mt-20 max-w-3xl mx-auto backdrop-blur-xl text-left text-text w-full relative overflow-hidden">
               <h3 className="text-4xl font-black mb-10 tracking-tight">Send a quick note</h3>
               <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative z-10">
                 <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <label htmlFor="user_name" className="text-[0.65rem] font-bold uppercase tracking-widest text-muted ml-4">Your Name</label>
                     <input type="text" name="user_name" id="user_name" required className="input-shell !py-5 !rounded-full !bg-white/50 dark:!bg-black/30 backdrop-blur border-transparent" placeholder="John Doe" />
                   </div>
                   <div className="space-y-3">
                     <label htmlFor="user_email" className="text-[0.65rem] font-bold uppercase tracking-widest text-muted ml-4">Your Email</label>
                     <input type="email" name="user_email" id="user_email" required className="input-shell !py-5 !rounded-full !bg-white/50 dark:!bg-black/30 backdrop-blur border-transparent" placeholder="john@example.com" />
                   </div>
                 </div>
                 <div className="space-y-3">
                   <label htmlFor="message" className="text-[0.65rem] font-bold uppercase tracking-widest text-muted ml-4">Message</label>
                   <textarea name="message" id="message" rows="5" required className="input-shell !py-5 !rounded-[2rem] !bg-white/50 dark:!bg-black/30 backdrop-blur border-transparent resize-none" placeholder="What's on your mind?"></textarea>
                 </div>
                 <button type="submit" disabled={status === "sending"} className="w-full py-5 rounded-full bg-text text-canvas font-black text-xl hover:scale-[1.02] shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 mt-4">
                    {status === "sending" ? "Sending..." : "Send Message"}
                 </button>
                 {status !== "idle" && status !== "sending" && (
                   <p className={`text-center font-bold text-base mt-6 ${status === "sent" ? "text-green-500" : "text-red-500"}`}>
                     {status === "sent" ? "Got it! I'll reply shortly." : "Oops! Something went wrong."}
                   </p>
                 )}
               </form>
            </div>
         </div>
      </motion.section>
    </div>
  );
}
