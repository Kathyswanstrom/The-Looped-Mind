"use client";

import { useEffect, useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Spectral:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap');

  .guest-page{
    --ink:#15243C; --deep:#0E1A2B; --navy2:#16263E;
    --gold:#BE9540; --golds:#E0C684;
    --cream:#F5EEDC; --cream2:#FBF7EE; --muted:#5A6373;
    --display:'Fraunces',Georgia,serif; --body:'Spectral',Georgia,serif; --util:'Inter',system-ui,sans-serif;
    background:var(--cream2); color:var(--ink); font-family:var(--body);
    line-height:1.65; -webkit-font-smoothing:antialiased; min-height:100vh;
  }
  .guest-page *{box-sizing:border-box;}
  .guest-page .wrap{max-width:760px; margin:0 auto; padding:0 24px;}
  .guest-page .eyebrow{font-family:var(--util); font-size:12px; font-weight:600; letter-spacing:.26em; text-transform:uppercase; color:var(--gold);}
  .guest-page h1,.guest-page h2{font-family:var(--display); font-weight:500; line-height:1.12; letter-spacing:-.01em;}

  /* header bar */
  .guest-nav{position:sticky; top:0; z-index:30; background:var(--deep); border-bottom:1px solid rgba(224,198,132,.2);}
  .guest-nav .inner{max-width:760px; margin:0 auto; padding:13px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px;}
  .guest-nav a.brand{font-family:var(--display); font-style:italic; color:var(--golds); font-size:18px; text-decoration:none; white-space:nowrap;}
  .guest-nav .links{display:flex; gap:20px; align-items:center;}
  .guest-nav .links a{font-family:var(--util); font-size:13px; font-weight:600; letter-spacing:.03em; color:rgba(245,238,220,.85); text-decoration:none;}
  .guest-nav .links a:hover{color:var(--golds);}
  @media (max-width:520px){ .guest-nav .links a.hide-sm{display:none;} .guest-nav a.brand{font-size:16px;} }

  /* hero */
  .guest-hero{background:radial-gradient(120% 120% at 50% 0%, var(--navy2), var(--ink) 55%, var(--deep)); color:var(--cream); text-align:center; padding:84px 0 70px;}
  .guest-hero .eyebrow{color:var(--golds);}
  .guest-hero .salutation{font-family:var(--display); font-style:italic; font-size:clamp(26px,5vw,40px); color:var(--cream); margin:18px 0 22px;}
  .guest-hero p{font-size:18px; color:rgba(245,238,220,.82); max-width:560px; margin:0 auto 16px;}
  .guest-hero .sign{font-family:var(--display); font-style:italic; color:var(--golds); font-size:20px; margin-top:18px;}

  /* loop ring mark (no arrowheads) */
  .ring-mark{margin:30px auto 6px; width:150px; height:150px; display:block;}
  .loop-words{font-family:var(--util); font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:var(--golds); margin-top:6px;}
  .loop-words span{color:rgba(245,238,220,.4); margin:0 7px;}

  .btn{display:inline-block; font-family:var(--util); font-size:14px; font-weight:600; letter-spacing:.04em;
    padding:15px 30px; border-radius:6px; cursor:pointer; border:1px solid transparent; transition:all .2s ease; text-decoration:none;}
  .btn-gold{background:var(--gold); color:var(--deep);}
  .btn-gold:hover{background:var(--golds); transform:translateY(-1px);}
  .btn-ghost{border-color:rgba(245,238,220,.4); color:var(--cream);}
  .guest-hero .btn{margin-top:34px;}

  /* sections */
  .sec{padding:72px 0;}
  .sec h2{font-size:clamp(26px,4vw,36px); margin-bottom:18px;}
  .sec p{font-size:17px; margin-bottom:16px; color:#33405a;}
  .lead{font-size:19px;}

  .sec-navy{background:var(--ink); color:var(--cream);}
  .sec-navy h2{color:var(--cream);}
  .sec-navy p{color:rgba(245,238,220,.8);}
  .sec-navy .eyebrow{color:var(--golds);}

  /* recognition groups */
  .groups{display:grid; grid-template-columns:repeat(2,1fr); gap:26px; margin-top:30px;}
  .group h3{font-family:var(--util); font-size:12px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--golds); margin:0 0 12px;}
  .group ul{list-style:none; margin:0; padding:0;}
  .group li{font-family:var(--body); font-size:16px; color:rgba(245,238,220,.86); padding:7px 0; border-bottom:1px solid rgba(224,198,132,.14);}
  .bringloop{margin-top:34px; background:rgba(224,198,132,.1); border-left:3px solid var(--gold); border-radius:0 8px 8px 0; padding:22px 24px;}
  .bringloop strong{color:var(--golds);}

  /* be-a-guest facts */
  .facts{display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:24px;}
  .fact{background:var(--cream); border:1px solid #E6DCC4; border-radius:10px; padding:22px 20px;}
  .fact .n{font-family:var(--display); font-size:24px; color:var(--gold);}
  .fact .l{font-family:var(--util); font-size:13px; color:var(--muted); margin-top:6px; line-height:1.45;}

  /* form */
  .formsec{background:var(--cream); border-top:1px solid #E6DCC4;}
  .field{margin-bottom:18px;}
  .field label{display:block; font-family:var(--util); font-weight:600; font-size:14px; color:var(--ink); margin-bottom:6px;}
  .field .hint{font-weight:400; color:var(--muted); font-style:italic;}
  .field input, .field select, .field textarea{width:100%; font-family:var(--body); font-size:16px; color:var(--ink);
    padding:12px 14px; border:1px solid #CFC6B0; border-radius:7px; background:var(--cream2);}
  .field textarea{min-height:140px; resize:vertical;}
  .field input:focus,.field select:focus,.field textarea:focus{outline:none; border-color:var(--gold); box-shadow:0 0 0 3px rgba(190,149,64,.2);}
  .row{display:grid; grid-template-columns:1fr 1fr; gap:16px;}
  .consent{display:flex; gap:11px; align-items:flex-start; background:#EFE7D2; border-left:4px solid var(--gold); border-radius:0 7px 7px 0; padding:15px 16px; margin:6px 0 22px;}
  .consent input{width:18px; height:18px; margin-top:3px; flex:0 0 auto; accent-color:var(--ink);}
  .consent label{font-family:var(--body); font-size:15px; color:var(--ink);}
  .hp{position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden;}
  .msg{font-family:var(--util); font-size:14px; margin-top:14px;}
  .msg.err{color:#9c3a3a;}
  .note{font-family:var(--util); font-size:13px; color:var(--muted); margin-top:12px; font-style:italic;}

  .success{background:var(--ink); color:var(--cream); border-radius:12px; padding:40px 32px; text-align:center;}
  .success h2{color:var(--cream); margin-bottom:12px;}
  .success p{color:rgba(245,238,220,.82); font-size:17px; max-width:460px; margin:0 auto 10px;}

  .guest-foot{background:var(--deep); color:rgba(245,238,220,.7); text-align:center; padding:40px 0;}
  .guest-foot .tag{font-family:var(--display); font-style:italic; color:var(--golds); font-size:18px;}
  .guest-foot a{color:var(--cream); text-decoration:none; border-bottom:1px solid var(--gold);}

  @media (max-width:620px){
    .groups{grid-template-columns:1fr;} .facts{grid-template-columns:1fr;} .row{grid-template-columns:1fr;}
  }
`;

const RING_NODES = [
  { x: 75, y: 12 },   // top
  { x: 135, y: 53 },  // right-upper
  { x: 112, y: 124 }, // right-lower
  { x: 38, y: 124 },  // left-lower
  { x: 15, y: 53 },   // left-upper
];

function RingMark() {
  return (
    <svg className="ring-mark" viewBox="0 0 150 150" aria-hidden="true">
      <circle cx="75" cy="75" r="63" fill="none" stroke="#E0C684" strokeWidth="1.5" opacity="0.55" />
      {RING_NODES.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="6" fill="#BE9540" />
      ))}
      <circle cx="75" cy="75" r="3" fill="#E0C684" opacity="0.7" />
    </svg>
  );
}

const EMPTY = {
  name: "", email: "", where_from: "", episode_type: "", letter: "",
  story: "", link: "", consent: false, company: "",
};

export default function BeAGuest() {
  const [data, setData] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    document.title = "Be a Guest — The Looped Mind";
  }, []);

  const up = (k) => (e) =>
    setData((d) => ({ ...d, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function submit() {
    setErr("");
    if (!data.name.trim() || !data.email.trim() || !data.story.trim()) {
      setErr("Your name, email, and a little of your story — then you're in.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad");
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErr("Something went sideways. Mind trying again in a moment?");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="guest-page">
      <style>{CSS}</style>

      <header className="guest-nav">
        <div className="inner">
          <a href="/" className="brand">The Looped Mind</a>
          <nav className="links">
            <a href="/">Home</a>
            <a href="/share-your-story" className="hide-sm">Your Story</a>
            <a href="https://www.amazon.com/dp/B0H6H2VDPS" target="_blank" rel="noopener noreferrer">The Book</a>
          </nav>
        </div>
      </header>

      <section className="guest-hero">
        <div className="wrap">
          <div className="eyebrow">The Looped Mind Podcast</div>
          <div className="salutation">Dear one who has lived a loop,</div>
          <p>
            I made this show for the people who can&rsquo;t sit in a meeting without clocking what&rsquo;s
            broken, who&rsquo;ve started things on kitchen tables and in spare bedrooms and never once
            been able to stop.
          </p>
          <p>
            It started with the letters — one for each turn of the loop. But the show grew past them.
            Now it&rsquo;s for any looped mind with a real story: the wins, the ones that didn&rsquo;t work,
            and the next idea that was already forming before the last one finished.
          </p>
          <p>If that&rsquo;s you, come sit at the table.</p>
          <div className="sign">— Kathy</div>

          <RingMark />
          <div className="loop-words">
            Imagine<span>·</span>Build<span>·</span>Launch<span>·</span>Learn<span>·</span>Repeat
          </div>

          <div>
            <a href="#guest-form" className="btn btn-gold">Tell me your loop</a>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="eyebrow">What the show is</div>
          <h2>A real conversation, not an expert panel.</h2>
          <p className="lead">
            You don&rsquo;t need a polished framework or a stage talk. You need a loop you&rsquo;ve actually
            lived. The best episodes are just two people being honest about how the work really went.
          </p>
          <p>
            No pitch. No &ldquo;and that&rsquo;s why you should buy my course.&rdquo; No pretending you had a plan
            the whole time. Just the true version — the one you&rsquo;d tell someone who just said
            &ldquo;me too.&rdquo;
          </p>
        </div>
      </section>

      <section className="sec sec-navy">
        <div className="wrap">
          <div className="eyebrow">Which of these is you?</div>
          <h2>You might already recognize your loop here.</h2>
          <div className="groups">
            <div className="group">
              <h3>Imagine</h3>
              <ul>
                <li>You see the better version of everything you walk into.</li>
                <li>The next idea arrives before you ask for it.</li>
                <li>You&rsquo;ve got a drawer full of domains you&rsquo;ll &ldquo;get to.&rdquo;</li>
              </ul>
            </div>
            <div className="group">
              <h3>Build</h3>
              <ul>
                <li>You made the thing — slower and harder than the idea promised.</li>
                <li>You&rsquo;ve run more than one venture at the same time.</li>
                <li>There are wine bottles, or boxes, or a roster of it in your garage.</li>
              </ul>
            </div>
            <div className="group">
              <h3>Launch</h3>
              <ul>
                <li>You put it into the world before you felt ready.</li>
                <li>You&rsquo;ve known the lonely quiet right after going live.</li>
                <li>You sold the thing — or sold it off — and felt both at once.</li>
              </ul>
            </div>
            <div className="group">
              <h3>Learn</h3>
              <ul>
                <li>A business that didn&rsquo;t work taught you the next one that did.</li>
                <li>You&rsquo;ve had to let go of something you built.</li>
                <li>You can name exactly what each start handed forward.</li>
              </ul>
            </div>
          </div>

          <div className="bringloop">
            <strong>Or — just bring your loop.</strong> Your story doesn&rsquo;t have to match a letter or a
            stage. If something on this page felt like it was about you, that&rsquo;s the whole
            qualification. Tell me the shape of your loop and we&rsquo;ll find the episode together.
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="eyebrow">What it&rsquo;s like to be a guest</div>
          <h2>Easy, honest, about 45 minutes.</h2>
          <div className="facts">
            <div className="fact"><div className="n">~45 min</div><div className="l">One relaxed conversation. We can go shorter if that&rsquo;s your speed.</div></div>
            <div className="fact"><div className="n">Remote</div><div className="l">Recorded from wherever you are. No studio, no travel.</div></div>
            <div className="fact"><div className="n">No prep</div><div className="l">No expertise required and nothing to memorize. Just your story.</div></div>
          </div>
        </div>
      </section>

      <section className="sec formsec" id="guest-form">
        <div className="wrap">
          {!sent ? (
            <>
              <div className="eyebrow">Come on the show</div>
              <h2>Tell me your loop.</h2>
              <p style={{ color: "#33405a", marginBottom: 26 }}>
                A few lines is plenty to start. If it&rsquo;s a fit, I&rsquo;ll write back and we&rsquo;ll find a time.
              </p>

              <div className="row">
                <div className="field">
                  <label htmlFor="g-name">Your name</label>
                  <input id="g-name" type="text" value={data.name} onChange={up("name")} autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="g-email">Email</label>
                  <input id="g-email" type="email" value={data.email} onChange={up("email")} autoComplete="email" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="g-where">Where you&rsquo;re based <span className="hint">— city + time zone</span></label>
                <input id="g-where" type="text" value={data.where_from} onChange={up("where_from")} placeholder="Denver, CO · Mountain Time" />
              </div>

              <div className="row">
                <div className="field">
                  <label htmlFor="g-type">What kind of episode feels right?</label>
                  <select id="g-type" value={data.episode_type} onChange={up("episode_type")}>
                    <option value="">Pick one (or skip)</option>
                    <option value="letter">A letter I lived</option>
                    <option value="loop_story">My whole loop, start to now</option>
                    <option value="not_sure">Not sure yet — but something here is me</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="g-letter">Which stage fits best? <span className="hint">— optional</span></label>
                  <select id="g-letter" value={data.letter} onChange={up("letter")}>
                    <option value="">No need to choose</option>
                    <option value="Imagine">Imagine</option>
                    <option value="Build">Build</option>
                    <option value="Launch">Launch</option>
                    <option value="Learn">Learn</option>
                    <option value="Repeat">Repeat</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="g-story">Your loop, in a few sentences</label>
                <textarea id="g-story" value={data.story} onChange={up("story")} placeholder="Where it started, what you built, what it taught you…" />
              </div>

              <div className="field">
                <label htmlFor="g-link">A link <span className="hint">— site, LinkedIn, anything (optional)</span></label>
                <input id="g-link" type="text" value={data.link} onChange={up("link")} />
              </div>

              <div className="hp" aria-hidden="true">
                <label htmlFor="g-company">Company</label>
                <input id="g-company" type="text" tabIndex={-1} autoComplete="off" value={data.company} onChange={up("company")} />
              </div>

              <div className="consent">
                <input id="g-consent" type="checkbox" checked={data.consent} onChange={up("consent")} />
                <label htmlFor="g-consent">
                  I&rsquo;m okay with Kathy reaching out about being a guest, and with my story being used to shape an episode.
                </label>
              </div>

              <button type="button" className="btn btn-gold" onClick={submit} disabled={sending}>
                {sending ? "Sending…" : "Send my story"}
              </button>
              {err && <div className="msg err">{err}</div>}
              <p className="note">You were never the only one. That&rsquo;s the whole point of the show.</p>
            </>
          ) : (
            <div className="success">
              <h2>Your story&rsquo;s on its way.</h2>
              <p>Thank you for trusting me with it. I read every one. If it&rsquo;s a fit, I&rsquo;ll be in touch to find a time.</p>
              <p>Now go start the next thing.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="guest-foot">
        <div className="wrap">
          <div className="tag">Built to Imagine. Wired to Repeat.</div>
          <div style={{ marginTop: 10 }}>
            <a href="https://www.theloopedmind.com/">theloopedmind.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

