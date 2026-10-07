import { useEffect, useRef, useState } from "react";
import "./index.css";

/* =========================================================
   PROJECTS
========================================================= */

const projects = [
  {
    title: "JobPortal — Freelance Marketplace",
    type: "Full Stack",
    tech: "React • Node • MongoDB • Tailwind",
    desc: "A powerful freelance marketplace platform to find expert freelancers, post jobs, manage dashboards, and handle applications seamlessly.",
    icon: "💼",
    image: "/images/img10.jpg",
    liveUrl: "https://freelancing-job-portal-9su1.vercel.app/",
  },
  {
    title: "StayEase — Hotel Booking App",
    type: "Full Stack",
    tech: "React • Node • MongoDB",
    desc: "A feature-rich hotel booking platform with destination search, luxury stay listings, and seamless reservation management.",
    icon: "🏨",
    image: "/images/img1.jpg",
    liveUrl: "https://hotel-booking-frontend-rcd3.vercel.app/",
  },
  {
    title: "E-Commerce Website",
    type: "E-Commerce",
    tech: "React • JavaScript • CSS",
    desc: "Responsive shopping experience with product discovery and modern UI.",
    icon: "♡",
    image: "/images/img4.jpg",
    liveUrl: "https://e-commerce-html-sable.vercel.app/",
  },
  {
    title: "AI SaaS Dashboard",
    type: "SaaS",
    tech: "React • APIs • CSS",
    desc: "Modern dashboard experience for an AI-powered SaaS product.",
    icon: "✺",
    image: "/images/img6.jpg",
    liveUrl: "https://saa-s-ui-snowy.vercel.app/",
  },
  {
    title: "Event Management System",
    type: "Management App",
    tech: "React • Node • MongoDB",
    desc: "Manage events, bookings and users from one organized application.",
    icon: "◈",
    image: "/images/img7.jpg",
    liveUrl: "https://events-management-nu.vercel.app/",
  },
  {
    title: "Real-Time Communication App",
    type: "Full Stack",
    tech: "React • WebSockets • Canvas • Vercel",
    desc: "Real-time collaborative whiteboard and video communication app built for CodeAlpha.",
    icon: "⚡",
    image: "/images/img8.jpg",
    liveUrl:
      "https://real-communication-codealpha-task.vercel.app/",
  },
  {
    title: "Social Sphere",
    type: "Full Stack",
    tech: "React • Node • MongoDB • CSS",
    desc: "A modern social media application with interactive feeds and a clean user experience.",
    icon: "🦋",
    image: "/images/img9.jpg",
    liveUrl:
      "https://social-sphere-codealpha-task.vercel.app/",
  },
];

/* =========================================================
   SKILLS
========================================================= */

const skills = [
  {
    category: "Frontend Development",
    number: "01",
    icon: "✦",
    description:
      "Building responsive, interactive and visually polished user interfaces.",
    items: [
      ["HTML5", "Semantic & accessible markup", "◇"],
      ["CSS3", "Responsive & modern UI", "◈"],
      ["JavaScript", "Interactive web applications", "JS"],
      ["React.js", "Component-based interfaces", "⚛"],
    ],
  },
  {
    category: "Backend & Database",
    number: "02",
    icon: "◇",
    description:
      "Creating server-side applications, APIs and database-driven experiences.",
    items: [
      ["Node.js", "Backend development", "N"],
      ["Express.js", "REST APIs & server logic", "E"],
      ["MongoDB", "Database & data modeling", "M"],
    ],
  },
  {
    category: "Real-Time & Tools",
    number: "03",
    icon: "⚡",
    description:
      "Tools and technologies I use for real-time features and development workflow.",
    items: [
      ["Socket.IO", "Real-time applications", "⚡"],
      ["Git & GitHub", "Version control & collaboration", "GH"],
    ],
  },
];

/* =========================================================
   MAGIC CURSOR
========================================================= */

function MagicCursor() {
  const cursor = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      if (ring.current) {
        ring.current.animate(
          {
            transform: `translate3d(${e.clientX - 18}px, ${
              e.clientY - 18
            }px, 0)`,
          },
          {
            duration: 450,
            fill: "forwards",
          }
        );
      }
    };

    window.addEventListener("pointermove", move);

    return () => {
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <>
      <div ref={cursor} className="magic-cursor">
        ✦
      </div>

      <div ref={ring} className="cursor-ring" />
    </>
  );
}

/* =========================================================
   FLOATING DECORATIONS
========================================================= */

function FloatingDecor() {
  const petals = Array.from({ length: 24 });
  const butterflies = Array.from({ length: 7 });

  return (
    <div className="decor" aria-hidden="true">
      {petals.map((_, i) => (
        <span
          className="petal"
          key={`p-${i}`}
          style={{ "--i": i }}
        >
          ✿
        </span>
      ))}

      {butterflies.map((_, i) => (
        <span
          className="butterfly"
          key={`b-${i}`}
          style={{ "--i": i }}
        >
          🦋
        </span>
      ))}

      <span className="sparkle s1">✦</span>
      <span className="sparkle s2">✧</span>
      <span className="sparkle s3">⋆</span>
    </div>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title reveal">
      <span className="eyebrow">{eyebrow}</span>

      <h2>{title}</h2>

      {text && <p>{text}</p>}
    </div>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeCert, setActiveCert] = useState(null);

  /* -------------------------------------------------------
     LOADER
  ------------------------------------------------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  /* -------------------------------------------------------
     SCROLL REVEAL
  ------------------------------------------------------- */

  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (
          el.getBoundingClientRect().top <
          window.innerHeight - 80
        ) {
          el.classList.add("show");
        }
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* -------------------------------------------------------
     CONTACT FORM
  ------------------------------------------------------- */

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setFormStatus("");

    const formData = new FormData(e.target);

    formData.append(
      "access_key",
      "fc486903-a5e5-4dc9-a5df-0fb80f2e5976"
    );

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setFormStatus(
          "Message successfully sent! ✿"
        );

        e.target.reset();
      } else {
        setFormStatus(
          "Something went wrong. Please try again!"
        );
      }
    } catch (error) {
      setFormStatus(
        "Network error. Please check your connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* -------------------------------------------------------
     NAVIGATION
  ------------------------------------------------------- */

  const nav = [
    "home",
    "about",
    "skills",
    "projects",
    "certificates",
    "education",
    "resume",
    "contact",
  ];

  /* -------------------------------------------------------
     PROJECT FILTER
  ------------------------------------------------------- */

  const filters = [
    "All",
    ...new Set(projects.map((p) => p.type)),
  ];

  const visibleProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.type === filter);

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <>
      {/* ===================================================
          LOADER
      =================================================== */}

      {loading && (
        <div className="loader">
          <div className="loader-flower">✿</div>

          <div className="loader-name">
            Tehreem Khan
          </div>

          <div className="loader-line">
            <span />
          </div>

          <small>
            Entering my little digital garden...
          </small>
        </div>
      )}

      <MagicCursor />

      <div className={dark ? "app dark" : "app light"}>
        <FloatingDecor />

        {/* =================================================
            NAVBAR
        ================================================= */}

        <header className="navbar">
          <a className="brand" href="#home">
            Tehreem <span>Khan</span>
            <i>🦋</i>
          </a>

          <button
            className="menu-btn"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          <nav className={menu ? "nav open" : "nav"}>
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenu(false)}
              >
                {item === "resume"
                  ? "Resume"
                  : item[0].toUpperCase() +
                    item.slice(1)}
              </a>
            ))}
          </nav>

          <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
          >
            <span>{dark ? "☾" : "☀"}</span>
          </button>
        </header>

        <main>
          {/* =================================================
              HERO
          ================================================= */}

          <section
            id="home"
            className="hero hero-with-bg"
          >
            <div className="hero-overlay" />

            <div className="hero-glow glow-one" />
            <div className="hero-glow glow-two" />

            <div className="mouse-hint">
              Move your mouse ✦
            </div>

            <div className="hero-content">
              <div className="hero-copy reveal">
                <div className="hello">
                  ✿ Hello, I'm
                </div>

                <h1 className="hero-main-title">
                  Tehreem Khan
                </h1>

                <h2>
                  Full-Stack MERN Developer
                </h2>

                <p>
                  I build modern, responsive and
                  user-friendly web applications
                  using React, Node.js, Express
                  and MongoDB — turning ideas into
                  functional digital experiences.
                </p>

                <div
                  className="availability-badge"
                >
                  <span className="status-dot" />
                  Available for freelance projects
                </div>

                <div className="hero-buttons">
                  <a
                    className="btn primary"
                    href="#projects"
                  >
                    View My Projects
                    <span>↗</span>
                  </a>

                  <a
                    className="btn ghost"
                    href="#contact"
                  >
                    Let's Work Together
                    <span>→</span>
                  </a>
                </div>

                <div className="hero-tech-stack">
                  {[
                    "React",
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "Real-Time Apps",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hero-quote-box reveal">
                <h2>
                  Code with purpose.
                  <br />
                  <em>Design with soul.</em>
                </h2>

                <p>
                  Every line of code is a tiny
                  step toward a bigger dream.
                </p>

                <div className="quote-sign">
                  — Tehreem Khan ✿
                </div>
              </div>
            </div>

            <img
              src="/images/bg-img.jpg"
              alt="Tehreem Khan"
              className="hero-girl"
            />

            <div className="scroll-cue">
              <span>⌄</span>
              Scroll Down
            </div>
          </section>

          {/* =================================================
              ABOUT
          ================================================= */}

          <section
            id="about"
            className="section about"
          >
            <SectionTitle
              eyebrow="A little about me"
              title="Dream. Code. Build. Grow."
              text="A developer focused on turning ideas into polished digital experiences."
            />

            <div className="about-grid">
              <div className="glass-card about-card reveal">
                <div className="mini-flower">
                  ✿
                </div>

                <h3>
                  I turn ideas into digital
                  experiences.
                </h3>

                <p>
                  I'm a passionate Full-Stack
                  MERN Developer who enjoys
                  building modern interfaces,
                  solving real-world problems
                  and learning technologies that
                  make the web better.
                </p>

                <p>
                  I care about clean code,
                  responsive design,
                  performance and the small
                  details that make a project feel
                  professional.
                </p>

                <div className="signature">
                  Build • Learn • Improve • Repeat
                </div>
              </div>

              <div className="code-card reveal">
                <div className="code-top">
                  <span>●</span>
                  <span>●</span>
                  <span>●</span>
                  <b>developer.js</b>
                </div>

                <pre>
{`const developer = {
  name: "Tehreem Khan",
  role: "Full-Stack MERN Developer",
  frontend: "React.js",
  backend: "Node.js + Express",
  database: "MongoDB",
  focus: "Real-world applications"
};

while (learning) {
  build();
  improve();
  grow();
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* =================================================
              SKILLS
          ================================================= */}

          <section
            id="skills"
            className="section skills-section"
          >
            <SectionTitle
              eyebrow="My toolbox"
              title="Skills & Technologies"
              text="A focused toolkit for building modern, responsive and full-stack web applications."
            />

            <div className="skill-categories">
              {skills.map((group) => (
                <div
                  className="skill-category reveal"
                  key={group.category}
                >
                  <div className="skill-category-header">
                    <div className="skill-category-icon">
                      {group.icon}
                    </div>

                    <div className="skill-category-heading">
                      <span className="skill-number">
                        {group.number}
                      </span>

                      <h3>{group.category}</h3>

                      <p>{group.description}</p>
                    </div>
                  </div>

                  <div className="skills-grid">
                    {group.items.map(
                      ([name, desc, icon]) => (
                        <div
                          className="skill-card glass-card"
                          key={name}
                        >
                          <div className="skill-icon">
                            {icon}
                          </div>

                          <div>
                            <h3>{name}</h3>
                            <p>{desc}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              PROJECTS
          ================================================= */}

          <section
            id="projects"
            className="section projects-section"
          >
            <SectionTitle
              eyebrow="Things I've built"
              title="Selected Projects"
              text="A collection of web applications and full-stack projects I've built using modern technologies."
            />

            <div className="filter-row">
              {filters.map((f) => (
                <button
                  key={f}
                  className={
                    filter === f
                      ? "filter active"
                      : "filter"
                  }
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="project-grid">
              {visibleProjects.map((p, i) => (
                <article
                  className="project-card glass-card reveal"
                  key={p.title}
                  style={{
                    "--delay": `${i * 45}ms`,
                  }}
                >
                  <div className="project-visual">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    ) : (
                      <span>{p.icon}</span>
                    )}

                    <b>
                      {String(i + 1).padStart(2, "0")}
                    </b>
                  </div>

                  <div className="project-body">
                    <span className="tag">
                      {p.type}
                    </span>

                    <h3>{p.title}</h3>

                    <p>{p.desc}</p>

                    <small>{p.tech}</small>

                    <div className="project-links">
                      <a
                        href={
                          p.liveUrl &&
                          p.liveUrl !== "#"
                            ? p.liveUrl
                            : "#"
                        }
                        target={
                          p.liveUrl &&
                          p.liveUrl !== "#"
                            ? "_blank"
                            : "_self"
                        }
                        rel="noreferrer"
                        onClick={(e) => {
                          if (
                            !p.liveUrl ||
                            p.liveUrl === "#"
                          ) {
                            e.preventDefault();

                            alert(
                              "Live demo link coming soon!"
                            );
                          }
                        }}
                      >
                        View Live Project ↗
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* =================================================
              CERTIFICATES
          ================================================= */}

          <section
            id="certificates"
            className="section"
          >
            <SectionTitle
              eyebrow="Verified credentials"
              title="Certificates"
              text="Professional certifications and achievements."
            />

            <div className="experience-grid">
              <div className="experience-card glass-card reveal">
                <div className="paper-icon">
                  📜
                </div>

                <div>
                  <span className="tag">
                    Language Proficiency
                  </span>

                  <h3>
                    German Language B1
                  </h3>

                  <p>
                    Language Certificate •
                    Verified
                  </p>

                  <button
                    className="text-link certificate-button"
                    onClick={() =>
                      setActiveCert({
                        title:
                          "German Language B1 Certificate",
                        img: "/images/german-cert.jpg",
                      })
                    }
                  >
                    View Certificate ↗
                  </button>
                </div>
              </div>

              <div className="experience-card glass-card reveal">
                <div className="paper-icon">
                  📜
                </div>

                <div>
                  <span className="tag">
                    Web Development
                  </span>

                  <h3>
                    Full Stack Development
                  </h3>

                  <p>
                    Full Stack Certification •
                    Verified
                  </p>

                  <button
                    className="text-link certificate-button"
                    onClick={() =>
                      setActiveCert({
                        title:
                          "Full Stack Development Certificate",
                        img: "/images/fullstack-cert.jpg",
                      })
                    }
                  >
                    View Certificate ↗
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              CERTIFICATE MODAL
          ================================================= */}

          {activeCert && (
            <div
              className="certificate-modal"
              onClick={() =>
                setActiveCert(null)
              }
            >
              <div
                className="certificate-modal-card"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                <div className="certificate-modal-header">
                  <h3>
                    {activeCert.title}
                  </h3>

                  <button
                    onClick={() =>
                      setActiveCert(null)
                    }
                    className="certificate-close"
                  >
                    ✕
                  </button>
                </div>

                <div className="certificate-image-wrap">
                  <img
                    src={activeCert.img}
                    alt={activeCert.title}
                  />
                </div>
              </div>
            </div>
          )}

          {/* =================================================
              EDUCATION
          ================================================= */}

          <section
            id="education"
            className="section education"
          >
            <SectionTitle
              eyebrow="My journey"
              title="Education"
              text="My academic foundation in computer science."
            />

            <div className="timeline glass-card reveal">
              <div className="timeline-dot">
                ✿
              </div>

              <div>
                <span className="tag">
                  Education
                </span>

                <h3>
                  ICS — Intermediate in Computer
                  Science
                </h3>

                <p>
                  Computer Science • Pakistan
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              RESUME
          ================================================= */}

          <section
            id="resume"
            className="section resume-section"
          >
            <div className="resume-box reveal">
              <div>
                <span className="eyebrow">
                  Want to know more?
                </span>

                <h2>
                  Let's build something
                  beautiful.
                </h2>

                <p>
                  Download my resume to explore
                  my skills, projects and
                  experience.
                </p>
              </div>

              <a
                className="btn primary"
                href="/resume.pdf"
                download="Tehreem_Khan_Resume.pdf"
              >
                Download My CV ↓
              </a>
            </div>
          </section>

         {/* =================================================
    CONTACT
================================================= */}

<section
  id="contact"
  className="section contact"
>
  <SectionTitle
    eyebrow="Let's connect"
    title="Have a project in mind?"
    text="Tell me what you're building. I'd love to help turn your idea into a real digital experience."
  />

  <div className="contact-grid">
    <div className="contact-card glass-card reveal">

      <a href="mailto:tahreemansarkhan@gmail.com">
        <span>✉</span>
        tahreemansarkhan@gmail.com
      </a>

      <a href="tel:03195021128">
        <span>☎</span>
        03195021128
      </a>

      <a
        href="https://www.linkedin.com/in/tehreem-khan-21b749405"
        target="_blank"
        rel="noreferrer"
      >
        <span>in</span>
        LinkedIn
      </a>

      <div className="contact-availability">
        <strong>
          Let's build together ✦
        </strong>

        <span>
          Available for freelance
          websites, web applications
          and full-stack projects.
        </span>
      </div>
    </div>

    <form
      className="glass-card contact-form reveal"
      onSubmit={handleFormSubmit}
    >
      {formStatus && (
        <div className="form-status">
          {formStatus}
        </div>
      )}

      <input
        type="text"
        name="name"
        placeholder="Your name"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
      />

      <textarea
        name="message"
        rows="5"
        placeholder="Tell me about your project..."
        required
      />

      <button
        className="btn primary"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Sending..."
          : "Send Message ✦"}
      </button>
    </form>
  </div>
</section>
</main>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer>
          <div className="footer-brand">
            Tehreem <span>Khan</span> 🦋
          </div>

          <p>
            Full-Stack MERN Developer •
            Turning ideas into digital experiences.
          </p>

          <small>
            © {new Date().getFullYear()} Tehreem
            Khan. All rights reserved.
          </small>
        </footer>
      </div>
    </>
  );
}

export default App;