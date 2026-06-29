"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  { n: "01", t: "Imagine", d: "It starts as a question you can't put down. You see the thing before it exists." },
  { n: "02", t: "Build", d: "You make it. It's slower and harder than the idea promised. You make it anyway." },
  { n: "03", t: "Launch", d: "You put it into the world before you feel ready. Ready never quite arrives." },
  { n: "04", t: "Learn", d: "The market tells you what's true. You carry the lesson into the next one." },
];

const TRAITS = [
  { vol: "Volume 01", t: "Vision", d: "Seeing the thing before anyone else does. The picture that pulls a venture into being.", live: false },
  { vol: "Volume 02", t: "Curiosity", d: "The engine of the loop. Why you can't leave a good question alone.", live: false },
  { vol: "Volume 03", t: "Resilience", d: "What gets you through the gap between the idea and the thing.", live: false },
];

function LoopMark() {
  return (
    <img
      src="/logo-symbol-gold.png"
      alt=""
      aria-hidden="true"
      style={{ width: 26, height: "auto", display: "block" }}
    />
  );
}

function Hero() {
  const ringWords =
    "IMAGINE\u00A0\u00A0\u25C6\u00A0\u00A0BUILD\u00A0\u00A0\u25C6\u00A0\u00A0LAUNCH\u00A0\u00A0\u25C6\u00A0\u00A0LEARN\u00A0\u00A0\u25C6\u00A0\u00A0REPEAT\u00A0\u00A0\u25C6\u00A0\u00A0";
  return (
    <section className="hero" id="top">
      <style>{`
        @keyframes lmspin { to { transform: rotate(360deg); } }
        .lm-loop { transform-origin: 200px 200px; animation: lmspin 34s linear infinite; }
        @media (prefers-reduced-motion: reduce){ .lm-loop { animation: none; } }
      `}</style>
      <div
        className="wrap"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 30 }}
      >
        <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}>
          The Looped Mind — Built to Imagine. Wired to Repeat.
        </h1>

        <div style={{ position: "relative", width: "100%", maxWidth: 440 }}>
          <img
            src="/logo-head-white.png"
            alt="The Looped Mind"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <div style={{ position: "absolute", left: "54%", top: "47%", width: "78%", transform: "translate(-50%,-50%)" }}>
            <svg viewBox="0 0 400 400" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="lmring" d="M200,60 a140,140 0 1,1 -0.01,0" fill="none" />
              </defs>
              <g className="lm-loop">
                <circle cx="200" cy="200" r="166" fill="none" stroke="#c5a352" strokeWidth="1.4" opacity="0.4" />
                <g fill="#d8b865">
                  <circle cx="200" cy="34" r="6" />
                  <circle cx="358" cy="149" r="6" />
                  <circle cx="298" cy="336" r="6" />
                  <circle cx="102" cy="336" r="6" />
                  <circle cx="42" cy="149" r="6" />
                </g>
                <text fontFamily="Inter, sans-serif" fontSize="21" letterSpacing="5" fontWeight="600" fill="#d8b865">
                  <textPath href="#lmring" startOffset="0">{ringWords}</textPath>
                </text>
              </g>
              <text x="200" y="182" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="20" letterSpacing="5" fill="#c5a352">THE</text>
              <text x="200" y="216" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="36" fontWeight="600" fill="#f4efe2">LOOPED</text>
              <text x="200" y="250" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="36" fontWeight="600" fill="#d8b865">MIND</text>
            </svg>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "Inter, sans-serif", color: "#d8b865", letterSpacing: ".22em", textTransform: "uppercase", fontSize: 13, fontWeight: 600 }}>
            Built to Imagine. Wired to Repeat.
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", color: "rgba(244,239,226,0.6)", letterSpacing: ".18em", textTransform: "uppercase", fontSize: 11, marginTop: 8 }}>
            The home of the serial entrepreneurs
          </div>
        </div>

        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <a
            href="https://www.amazon.com/dp/B0H6H2VDPS"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            Get the book on Amazon
          </a>
          <a href="#loop" className="btn btn-ghost">See the loop</a>
        </div>
      </div>
    </section>
  );
}

function Loop() {
  return (
    <section className="section loop-section" id="loop">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">The framework</span>
          <h2>Every venture runs the same circuit.</h2>
          <p>
            Different products. Same four turns. Once you can name where you are
            in the loop, the work stops feeling random.
          </p>
        </div>
        <div className="stages reveal">
          {STAGES.map((s, i) => (
            <div className="stage" key={s.t}>
              <span className="stage-arrow">{i === STAGES.length - 1 ? "↻" : "→"}</span>
              <span className="stage-num">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Memoir() {
  const AMAZON = "https://www.amazon.com/dp/B0H6H2VDPS";
  return (
    <section className="section memoir" id="memoir">
      <div className="wrap memoir-grid">
        <div className="reveal">
          <a
            href={AMAZON}
            target="_blank"
            rel="noopener noreferrer"
            style={{ position: "relative", display: "block", maxWidth: 330, margin: "0 auto" }}
          >
            <div
              style={{
                position: "absolute",
                top: 14,
                right: -10,
                zIndex: 2,
                background: "#c5a352",
                color: "#101a30",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "7px 13px",
                borderRadius: 2,
                boxShadow: "0 10px 22px rgba(0,0,0,0.4)",
              }}
            >
              Now on Amazon
            </div>
            <img
              src="/book-cover.jpg"
              alt="Every Business Teaches You the Next One — a Looped Mind memoir by Kathy Swanstrom"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: 4,
                boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
              }}
            />
          </a>
        </div>
        <div className="reveal">
          <span className="eyebrow on-dark">The memoir · Now on Amazon</span>
          <h2>Ten letters from inside the loop.</h2>
          <p>
            Not a how-to. A field account from someone who kept going around —
            written as ten letters to the serial entrepreneur at each stage of
            the work.
          </p>
          <p>
            Every business taught her the next one. The failures as much as the
            wins. This is the record of what carried over.
          </p>
          <p style={{ color: "var(--gold-bright)", fontWeight: 500 }}>
            It&rsquo;s live on Amazon. Go grab a copy.
          </p>
          <div className="letters">
            <span className="letter-chip">Imagine</span>
            <span className="letter-chip">Build</span>
            <span className="letter-chip">Launch</span>
            <span className="letter-chip">Learn</span>
          </div>
          <div className="hero-actions">
            <a href={AMAZON} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              Get it on Amazon
            </a>
            <a href="#signup" className="btn btn-ghost">Join the list</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Traits() {
  return (
    <section className="section traits" id="traits">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">The trait packs</span>
          <h2>The loop runs on traits, not tactics.</h2>
          <p>
            A series of digital field guides — one per trait that keeps a looped
            mind moving. Each pack ships as a print PDF, a fillable PDF, and an
            iPad edition.
          </p>
        </div>
        <div className="trait-grid">
          {TRAITS.map((tr) => (
            <div className="trait-card reveal" key={tr.t}>
              <span className="trait-vol">{tr.vol}</span>
              <h3>{tr.t}</h3>
              <p>{tr.d}</p>
              <span className={`trait-status ${tr.live ? "status-live" : "status-soon"}`}>
                {tr.live ? "Available now" : "Coming soon"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap about-grid">
        <div className="reveal">
          <div className="about-name">Kathy Swanstrom</div>
          <div className="about-role">Founder · Serial Entrepreneur</div>
        </div>
        <div className="reveal">
          <p>
            I've started more things than most people will say out loud. Food
            ventures, care businesses, books, software. Some worked. Some
            taught me what the next one needed.
          </p>
          <p>
            <strong>The Looped Mind is the pattern underneath all of it.</strong>{" "}
            I didn't design the loop. I noticed I'd been running it for years.
          </p>
          <p>
            This brand is for the people who recognize themselves in that —
            who imagine, build, launch, learn, and then quietly start again.
          </p>
        </div>
      </div>
    </section>
  );
}

function Community() {
  const card = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(197,163,82,0.3)",
    borderRadius: 12,
    padding: "22px",
  };
  const cardTitle = { fontFamily: "Fraunces, Georgia, serif", fontSize: 20, color: "#d8b865", marginBottom: 6 };
  const cardText = { margin: 0, fontSize: 15, color: "rgba(244,239,226,0.8)" };

  return (
    <section className="section" id="community" style={{ background: "#11203c", color: "#f4efe2" }}>
      <div className="wrap">
        <span className="eyebrow on-dark">The community</span>
        <h2 style={{ color: "#f4efe2" }}>The home of the serial entrepreneurs has a home.</h2>
        <p style={{ color: "rgba(244,239,226,0.82)", maxWidth: 620 }}>
          The Community Wall is a place to post your wins, the loop you&rsquo;re in, and the lessons each
          venture handed forward — and to read other looped minds who think of the next thing before the
          last one&rsquo;s finished.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 18,
            margin: "28px 0 30px",
          }}
        >
          <div style={card}>
            <div style={cardTitle}>Share your loop</div>
            <p style={cardText}>Post a win, a struggle, or a lesson — first name is fine.</p>
          </div>
          <div style={card}>
            <div style={cardTitle}>Read the room</div>
            <p style={cardText}>A curated wall of real stories from people who get it.</p>
          </div>
        </div>

        <a href="/community" className="btn btn-gold">Visit the community</a>
      </div>
    </section>
  );
}

function Signup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ status: "idle", msg: "" });

  async function submit() {
    if (state.status === "loading") return;
    setState({ status: "loading", msg: "" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({ status: "error", msg: data.error || "Something went wrong." });
        return;
      }
      setEmail("");
      setState({
        status: "ok",
        msg: data.alreadyOnList
          ? "You're already on the list. Good."
          : "You're in. You'll hear from me when it's ready.",
      });
    } catch {
      setState({ status: "error", msg: "Network error. Try again." });
    }
  }

  return (
    <section className="section signup" id="signup">
      <div className="wrap">
        <span className="eyebrow on-dark">Stay in the loop</span>
        <h2>Be first when the memoir and the trait packs drop.</h2>
        <p>No noise. A short note when there's something real to share.</p>

        <div className="signup-form">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            aria-label="Email address"
          />
          <button
            className="btn btn-gold"
            onClick={submit}
            disabled={state.status === "loading"}
          >
            {state.status === "loading" ? "Joining…" : "Join the list"}
          </button>
        </div>

        <div className={`signup-msg ${state.status === "ok" ? "ok" : ""} ${state.status === "error" ? "err" : ""}`}>
          {state.msg}
        </div>
        <p className="signup-note">theloopedmind.com · one list, no spam</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span className="footer-brand">The Looped Mind</span>
        <span>Built to Imagine. Wired to Repeat.</span>
        <span>© {new Date().getFullYear()} Kathy Swanstrom</span>
      </div>
    </footer>
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#top" className="nav-brand">
          <LoopMark />
          The Looped Mind
        </a>
        <div className="nav-links">
          <a href="#loop">The Loop</a>
          <a href="#memoir">Memoir</a>
          <a href="#traits">Trait Packs</a>
          <a href="/community">Community</a>
          <a href="/be-a-guest">Be a Guest</a>
          <a href="/share-your-story">Your Story</a>
          <a href="#signup" className="nav-cta">Join the list</a>
        </div>
      </nav>

      <Hero />
      <Loop />
      <Memoir />
      <Traits />
      <About />
      <Community />
      <Signup />
      <Footer />
    </>
  );
}

