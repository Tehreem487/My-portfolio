import { useEffect, useRef, useState } from "react";
import "./index.css";

const projects = [
 { 
    title: "StayEase — Hotel Booking App", 
    type: "Full Stack", 
    tech: "React • Node • MongoDB", 
    desc: "A feature-rich hotel booking platform with destination search, luxury stay listings, and seamless reservation management.", 
    icon: "🏨", 
    image: "/images/img1.jpg", 
    liveUrl: "https://hotel-booking-frontend-rcd3.vercel.app/" 
  },

  { 
    title: "E-Commerce Website", 
    type: "E-Commerce", 
    tech: "React • JavaScript • CSS", 
    desc: "Responsive shopping experience with product discovery and modern UI.", 
    icon: "♡", 
    image: "/images/img4.jpg",
    liveUrl: "https://e-commerce-codealpha-task.vercel.app/" 
  },
  { 
    title: "AI SaaS Dashboard", 
    type: "SaaS", 
    tech: "React • APIs • CSS", 
    desc: "Modern dashboard experience for an AI-powered SaaS product.", 
    icon: "✺", 
    image: "/images/img6.jpg",
    liveUrl: "https://saa-s-ui-snowy.vercel.app/" 
  },
  { 
    title: "Event Management System", 
    type: "Management App", 
    tech: "React • Node • MongoDB", 
    desc: "Manage events, bookings and users from one organized application.", 
    icon: "◈", 
    image: "/images/img7.jpg",
    liveUrl: "https://events-management-nu.vercel.app/" 
  },
  { 
    title: "Real-Time Communication App", 
    type: "Full Stack", 
    tech: "React • WebSockets • Canvas • Vercel", 
    desc: "Real-time collaborative whiteboard and video communication app built for CodeAlpha.", 
    icon: "⚡", 
    image: "/images/img8.jpg",
    liveUrl: "https://real-communication-codealpha-task.vercel.app/"
  },
  { 
    title: "Social Sphere", 
    type: "Full Stack", 
    tech: "React • Node • MongoDB • CSS", 
    desc: "A light-themed modern mini social media application with interactive feeds.", 
    icon: "🦋", 
    image: "/images/img9.jpg",
    liveUrl: "https://social-sphere-codealpha-task.vercel.app/" 
  },
];

const skills = [
  ["HTML5", "Markup & Semantics"], ["CSS3", "Responsive UI"], ["JavaScript", "Interactive Web"],
  ["React.js", "Component UI"], ["Node.js", "Backend"], ["Express.js", "REST APIs"],
];

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
          { transform: `translate3d(${e.clientX - 18}px, ${e.clientY - 18}px, 0)` },
          { duration: 450, fill: "forwards" }
        );
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (<><div ref={cursor} className="magic-cursor">✦</div><div ref={ring} className="cursor-ring" /></>);
}

function FloatingDecor() {
  const petals = Array.from({ length: 24 });
  const butterflies = Array.from({ length: 7 });
  return (
    <div className="decor" aria-hidden="true">
      {petals.map((_, i) => <span className="petal" key={`p-${i}`} style={{ "--i": i }}>✿</span>)}
      {butterflies.map((_, i) => <span className="butterfly" key={`b-${i}`} style={{ "--i": i }}>🦋</span>)}
      <span className="sparkle s1">✦</span><span className="sparkle s2">✧</span><span className="sparkle s3">⋆</span>
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (<div className="section-title reveal"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>);
}

function App() {
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // Form States
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Certificate Modal State
  const [activeCert, setActiveCert] = useState(null);

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1300); return () => clearTimeout(timer); }, []);
  useEffect(() => {
    const onScroll = () => { document.querySelectorAll(".reveal").forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add("show"); }); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("");

    const formData = new FormData(e.target);
    formData.append("access_key", "fc486903-a5e5-4dc9-a5df-0fb80f2e5976");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setFormStatus("Message successfully sent! ✿");
        e.target.reset();
      } else {
        setFormStatus("Something went wrong. Please try again!");
      }
    } catch (error) {
      setFormStatus("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nav = ["home", "about", "skills", "projects", "certificates", "education", "resume", "contact"];
  const filters = ["All",...new Set(projects.map((p) => p.type))];
  const visibleProjects = filter === "All"? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      {loading && (<div className="loader"><div className="loader-flower">✿</div><div className="loader-name">Tehreem Khan</div><div className="loader-line"><span /></div><small>Entering my little digital garden...</small></div>)}
      <MagicCursor />
      <div className={dark? "app dark" : "app light"}>
        <FloatingDecor />
        <header className="navbar">
          <a className="brand" href="#home">Tehreem <span>Khan</span><i>🦋</i></a>
          <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Toggle menu">☰</button>
          <nav className={menu? "nav open" : "nav"}>
            {nav.map((item) => (<a key={item} href={`#${item}`} onClick={() => setMenu(false)}>{item === "resume"? "Resume" : item[0].toUpperCase() + item.slice(1)}</a>))}
          </nav>
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme"><span>{dark? "☾" : "☀"}</span></button>
        </header>

        <main>
          <section id="home" className="hero hero-with-bg">
            <div className="hero-overlay" />
            <div className="hero-glow glow-one" />
            <div className="hero-glow glow-two" />
            <div className="mouse-hint">Move your mouse ✦</div>
            <div className="hero-content">
              <div className="hero-copy reveal">
                <div className="hello">✿ Hello, I'm</div>
                <h1 className="hero-main-title">Tehreem Khan</h1>
                <h2>Full Stack Developer</h2>
                <p>I craft clean, responsive and user-friendly web experiences with a touch of creativity — turning ideas into beautiful, functional websites.</p>
                <div className="hero-buttons">
                  <a className="btn primary" href="#projects">View Projects <span>↗</span></a>
                  <a className="btn ghost" href="#resume">Download CV <span>↓</span></a>
                </div>
              </div>
              <div className="hero-quote reveal"><span>“</span>Better things<br />are coming.<small>♡</small></div>
            </div>
            <img src="/images/bg-img.jpg" alt="Tehreem Khan" className="hero-girl" />
            <div className="scroll-cue"><span>⌄</span>Scroll Down</div>
          </section>

          <section id="about" className="section about">
            <SectionTitle eyebrow="A little about me" title="Dream. Code. Build. Grow." />
            <div className="about-grid">
              <div className="glass-card about-card reveal">
                <div className="mini-flower">✿</div>
                <h3>I turn ideas into digital experiences.</h3>
                <p>I'm a passionate developer who enjoys building modern interfaces, solving problems and learning technologies that make the web better. I care about clean code, responsive design and the little details that make a project feel special.</p>
                <div className="signature">Keep learning • Keep building • Keep growing</div>
              </div>
              <div className="code-card reveal">
                <div className="code-top"><span>●</span><span>●</span><span>●</span><b>dream.js</b></div>
                <pre>{`const success = {\n dream: true,\n learn: true,\n build: true,\n grow: true\n};\n\nwhile (dream) {\n learn();\n build();\n grow();\n}`}</pre>
              </div>
            </div>
          </section>

          <section id="skills" className="section">
            <SectionTitle eyebrow="My toolbox" title="Skills & Technologies" text="Tools I use to bring ideas to life." />
            <div className="skills-grid">
              {skills.map(([name, desc], i) => (
                <div className="skill-card glass-card reveal" key={name} style={{ "--delay": `${i * 60}ms` }}>
                  <div className="skill-icon">{["◇","◈","JS","⚛","N","M"][i] || "✦"}</div>
                  <div><h3>{name}</h3><p>{desc}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="section projects-section">
            <SectionTitle eyebrow="Things I've built" title="Featured Projects" text="Explore my recent work and projects." />
            <div className="filter-row">
              {filters.map((f) => (
                <button key={f} className={filter === f? "filter active" : "filter"} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
            <div className="project-grid">
              {visibleProjects.map((p, i) => (
                <article className="project-card glass-card reveal" key={p.title} style={{ "--delay": `${i * 45}ms` }}>
                  <div className="project-visual">
                    {p.image ? (
                      <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }} />
                    ) : (
                      <span>{p.icon}</span>
                    )}
                    <b>0{i + 1}</b>
                  </div>
                  <div className="project-body">
                    <span className="tag">{p.type}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <small>{p.tech}</small>
                    <div className="project-links">
                      <a 
                        href={p.liveUrl && p.liveUrl !== "#" ? p.liveUrl : "#"} 
                        target={p.liveUrl && p.liveUrl !== "#" ? "_blank" : "_self"} 
                        rel="noreferrer"
                        onClick={(e) => {
                          if (!p.liveUrl || p.liveUrl === "#") {
                            e.preventDefault();
                            alert("Live demo link coming soon!");
                          }
                        }}
                      >
                        Live Demo ↗
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="certificates" className="section">
            <SectionTitle eyebrow="Verified credentials" title="Certificates" text="Professional certifications and achievements." />
            <div className="experience-grid">
              <div className="experience-card glass-card reveal">
                <div className="paper-icon">📜</div>
                <div>
                  <span className="tag">Language Proficiency</span>
                  <h3>German Language B1</h3>
                  <p>Language Certificate • Verified</p>
                  <button 
                    className="text-link" 
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer", font: "inherit", color: "inherit" }}
                    onClick={() => setActiveCert({ title: "German Language B1 Certificate", img: "/images/german-cert.jpg" })}
                  >
                    View Certificate ↗
                  </button>
                </div>
              </div>
              <div className="experience-card glass-card reveal">
                <div className="paper-icon">📜</div>
                <div>
                  <span className="tag">Web Development</span>
                  <h3>Full Stack Development</h3>
                  <p>Full Stack Certification • Verified</p>
                  <button 
                    className="text-link" 
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer", font: "inherit", color: "inherit" }}
                    onClick={() => setActiveCert({ title: "Full Stack Development Certificate", img: "/images/fullstack-cert.jpg" })}
                  >
                    View Certificate ↗
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Certificate Preview Modal */}
          {activeCert && (
            <div style={{
              position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)", display: "flex", justifyContent: "center",
              alignItems: "center", zIndex: 1000, padding: "20px"
            }} onClick={() => setActiveCert(null)}>
              <div style={{
                background: "var(--card-bg, #1e1e2f)", padding: "20px", borderRadius: "16px",
                maxWidth: "600px", width: "100%", position: "relative", border: "1px solid rgba(255,255,255,0.1)"
              }} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                  <h3 style={{ margin: 0, fontSize: "18px" }}>{activeCert.title}</h3>
                  <button onClick={() => setActiveCert(null)} style={{
                    background: "none", border: "none", color: "#fff", fontSize: "20px", cursor: "pointer"
                  }}>✕</button>
                </div>
                <div style={{ width: "100%", maxHeight: "70vh", overflow: "auto", borderRadius: "8px" }}>
                  <img src={activeCert.img} alt={activeCert.title} style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }} />
                </div>
              </div>
            </div>
          )}

          <section id="education" className="section education">
            <SectionTitle eyebrow="My journey" title="Education" />
            <div className="timeline glass-card reveal">
              <div className="timeline-dot">✿</div>
              <div>
                <span className="tag">Education</span>
                <h3>ICS — Intermediate in Computer Science</h3>
                <p>Computer Science • Pakistan</p>
              </div>
            </div>
          </section>

          <section id="resume" className="section resume-section">
            <div className="resume-box reveal">
              <div>
                <span className="eyebrow">Want to know more?</span>
                <h2>Let's build something beautiful.</h2>
              </div>
              <a className="btn primary" href="/resume.pdf" download="Tehreem_Khan_Resume.pdf">Download My CV ↓</a>
            </div>
          </section>

          <section className="magic-section">
            <div className="magic-orbit orbit-a">✦</div>
            <div className="magic-orbit orbit-b">✿</div>
            <div className="magic-orbit orbit-c">🦋</div>
            <div className="magic-quote reveal">
              <span>“</span>
              <h2>Code with purpose.<br /><em>Design with soul.</em></h2>
              <p>Every line of code is a tiny step toward a bigger dream.</p>
              <div className="quote-sign">— Tehreem Khan ✿</div>
            </div>
          </section>

          <section id="contact" className="section contact">
            <SectionTitle eyebrow="Let's connect" title="Have an idea?" text="I'd love to hear about it." />
            <div className="contact-grid">
              <div className="contact-card glass-card reveal">
                <a href="mailto:tahreemansarkhan@gmail.com"><span>✉</span> tahreemansarkhan@gmail.com</a>
                <a href="https://www.linkedin.com/in/tehreem-khan-21b749405" target="_blank" rel="noreferrer"><span>in</span> LinkedIn</a>
                <a href="https://wa.me/923195021128" target="_blank" rel="noreferrer"><span>💬</span> 0319 5021128</a>
              </div>
              <form className="glass-card contact-form reveal" onSubmit={handleFormSubmit}>
                {formStatus && (
                  <div style={{ padding: "10px 15px", marginBottom: "15px", borderRadius: "8px", background: "rgba(100, 255, 218, 0.1)", color: "#64ffda", border: "1px solid #64ffda", fontSize: "14px", textAlign: "center" }}>
                    {formStatus}
                  </div>
                )}
                <input type="text" name="name" placeholder="Your name" required />
                <input type="email" name="email" placeholder="Your email" required />
                <textarea name="message" rows="5" placeholder="Tell me about your idea..." required></textarea>
                <button className="btn primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message ✦"}
                </button>
              </form>
            </div>
          </section>
        </main>

        <footer>
          <div className="footer-brand">Tehreem <span>Khan</span> 🦋</div>
          <p>Made with curiosity, code & a little magic ✿</p>
          <small>© {new Date().getFullYear()} Tehreem Khan. All rights reserved.</small>
        </footer>
      </div>
    </>
  );
}

export default App;