"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  { n: "01", t: "Imagine", d: "It starts as a question you can't put down. You see the thing before it exists." },
  { n: "02", t: "Build", d: "You make it. It's slower and harder than the idea promised. You make it anyway." },
  { n: "03", t: "Launch", d: "You put it into the world before you feel ready. Ready never quite arrives." },
  { n: "04", t: "Learn", d: "The market tells you what's true. You carry the lesson into the next one." },
];

const TRAITS = [
  { vol: "Volume 02", t: "Curiosity", d: "The engine of the loop. Why you can't leave a good question alone.", live: true },
  { vol: "Volume 03", t: "Resilience", d: "What gets you through the gap between the idea and the thing.", live: false },
  { vol: "Volume 04", t: "Resourcefulness", d: "Building with what's in the room instead of what's on the wishlist.", live: false },
];

function LoopMark() {
  return (
    <svg className="nav-mark" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="15" fill="none" stroke="#c5a352" strokeWidth="2.4" />
      <path d="M20 5 a15 15 0 0 1 13 7.5" fill="none" stroke="#d8b865" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="33" cy="12.5" r="2.6" fill="#d8b865" />
    </svg>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow on-dark">For the serial entrepreneur</span>
          <h1>
            The <span className="loop-word">Looped</span> Mind
          </h1>
          <p className="hero-tag">Built to Imagine. Wired to Repeat.</p>
          <p className="hero-sub">
            For the one who finishes one venture and immediately starts the next.
            A memoir, a framework, and field guides for the way you already work.
          </p>
          <div className="hero-actions">
            <a href="#memoir" className="btn btn-gold">Read the memoir</a>
            <a href="#loop" className="btn btn-ghost">See the loop</a>
          </div>
        </div>

        <div className="loop-stage">
          <svg className="loop-svg" viewBox="0 0 500 500" aria-label="The loop: Imagine, Build, Launch, Learn">
            <g className="loop-ring-spin">
              <circle className="loop-dash" cx="250" cy="250" r="210" />
            </g>
            <circle className="loop-track" cx="250" cy="250" r="160" />
            {/* clockwise arc connecting the stages */}
            <path
              className="loop-arc"
              d="M250 90 A160 160 0 0 1 410 250 A160 160 0 0 1 250 410 A160 160 0 0 1 90 250 A160 160 0 0 1 250 90"
            />

            {/* nodes: top / right / bottom / left */}
            <g className="loop-node">
              <circle cx="250" cy="90" r="46" />
              <text x="250" y="90">Imagine</text>
            </g>
            <g className="loop-node">
              <circle cx="410" cy="250" r="46" />
              <text x="410" y="250">Build</text>
            </g>
            <g className="loop-node">
              <circle cx="250" cy="410" r="46" />
              <text x="250" y="410">Launch</text>
            </g>
            <g className="loop-node">
              <circle cx="90" cy="250" r="46" />
              <text x="90" y="250">Learn</text>
            </g>

            <g className="loop-center">
              <text x="250" y="244" fontSize="22" textAnchor="middle">again</text>
              <text x="250" y="270" fontSize="22" textAnchor="middle">&amp; again</text>
            </g>
          </svg>
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
  return (
    <section className="section memoir" id="memoir">
      <div className="wrap memoir-grid">
        <div className="reveal">
          <div className="book">
            <div className="book-top">A Looped Mind Memoir</div>
            <div className="book-title">Every Business Teaches You the Next One</div>
            <div className="book-author">Kathy Swanstrom</div>
          </div>
        </div>
        <div className="reveal">
          <span className="eyebrow on-dark">The memoir</span>
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
          <div className="letters">
            <span className="letter-chip">Imagine</span>
            <span className="letter-chip">Build</span>
            <span className="letter-chip">Launch</span>
            <span className="letter-chip">Learn</span>
          </div>
          <div className="hero-actions">
            <a href="#signup" className="btn btn-gold">Join the launch list</a>
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
          <a href="#about">About</a>
          <a href="#signup" className="nav-cta">Join the list</a>
        </div>
      </nav>

      <Hero />
      <Loop />
      <Memoir />
      <Traits />
      <About />
      <Signup />
      <Footer />
    </>
  );
}
