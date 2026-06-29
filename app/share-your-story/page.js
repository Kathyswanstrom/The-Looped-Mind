"use client";

import { useEffect, useState } from "react";

const CSS = `
  .story-page{
    --navy:#0E2A47; --gold:#A8842C; --ink:#1A1A1A;
    --cream:#FBF8F1; --navybox:#EAF0F7; --goldbox:#F5EEDC;
    --rule:#E2D9C4; --muted:#7A7A7A;
    --serif:Georgia,'Times New Roman',serif;
    background:var(--cream); color:var(--ink); font-family:var(--serif);
    line-height:1.6; min-height:100vh; -webkit-font-smoothing:antialiased;
  }
  .story-page .wrap{max-width:680px; margin:0 auto; padding:40px 22px 64px;}
  .story-page header{text-align:center; margin-bottom:14px;}
  .story-page .eyebrow{color:var(--gold); font-weight:bold; letter-spacing:.28em; font-size:13px; text-transform:uppercase;}
  .story-page .loop{margin:16px 0 8px; color:var(--navy); font-weight:bold; letter-spacing:.18em; font-size:13px; text-transform:uppercase;}
  .story-page .loop span{color:var(--gold); margin:0 7px;}
  .story-page .tagline{color:var(--navy); font-style:italic; font-size:14px; letter-spacing:.04em;}
  .story-page .rule{height:2px; background:var(--gold); border:0; margin:22px auto; max-width:120px;}

  .story-nav{position:sticky; top:0; z-index:30; background:var(--navy); border-bottom:1px solid rgba(168,132,44,.4);}
  .story-nav .inner{max-width:680px; margin:0 auto; padding:13px 22px; display:flex; align-items:center; justify-content:space-between; gap:16px;}
  .story-nav a.brand{font-family:var(--serif); font-style:italic; color:#E0C684; font-size:18px; text-decoration:none; white-space:nowrap;}
  .story-nav .links{display:flex; gap:20px; align-items:center;}
  .story-nav .links a{font-family:var(--serif); font-size:14px; color:#fff; text-decoration:none;}
  .story-nav .links a:hover{color:#E0C684;}
  @media (max-width:520px){ .story-nav .links a.hide-sm{display:none;} }
  .story-page h1{font-size:40px; line-height:1.1; color:var(--navy); margin:6px 0 4px; text-align:center;}
  .story-page .sub{text-align:center; font-style:italic; color:var(--navy); font-size:19px; margin:0 0 26px;}
  .story-page p.intro{font-size:17px; margin:0 0 14px;}
  .story-page .field{margin-bottom:18px;}
  .story-page label{display:block; font-weight:bold; color:var(--navy); font-size:16px; margin-bottom:6px;}
  .story-page label .hint{font-weight:normal; color:var(--muted); font-style:italic; font-size:14px;}
  .story-page input[type=text], .story-page input[type=email], .story-page textarea{
    width:100%; font-family:var(--serif); font-size:16px; color:var(--ink);
    padding:11px 13px; border:1px solid #CFC8B6; border-radius:6px; background:#fff;}
  .story-page textarea{resize:vertical; min-height:64px;}
  .story-page textarea.story{min-height:130px;}
  .story-page input:focus, .story-page textarea:focus{outline:none; border-color:var(--navy); box-shadow:0 0 0 3px rgba(168,132,44,.25);}
  .story-page .consent{display:flex; align-items:flex-start; gap:10px; background:var(--navybox);
    border-left:4px solid var(--gold); padding:14px 16px; border-radius:0 6px 6px 0; margin:6px 0 24px;}
  .story-page .consent input{margin-top:4px; width:18px; height:18px; flex:0 0 auto; accent-color:var(--navy);}
  .story-page .consent label{font-weight:normal; color:var(--ink); font-size:15px; margin:0;}
  .story-page button{display:inline-block; background:var(--navy); color:#fff; font-family:var(--serif);
    font-size:18px; font-weight:bold; letter-spacing:.02em; border:0; border-radius:7px;
    padding:14px 30px; cursor:pointer; transition:background .15s ease;}
  .story-page button:hover{background:#163a5f;}
  .story-page button:disabled{opacity:.6; cursor:default;}
  .story-page .note{font-size:13px; color:var(--muted); margin-top:14px; font-style:italic;}
  .story-page .thanks{background:var(--goldbox); border-left:5px solid var(--gold);
    padding:26px; border-radius:0 8px 8px 0; text-align:left;}
  .story-page .thanks h2{color:var(--navy); margin:0 0 10px; font-size:26px;}
  .story-page .thanks p{margin:0 0 8px; font-size:17px;}
  .story-page footer{margin-top:46px; text-align:center; color:var(--muted); font-size:13px;}
  .story-page footer .brand{color:var(--gold); font-weight:bold; letter-spacing:.16em; text-transform:uppercase; font-size:12px; margin-bottom:6px;}
  .story-page footer a{color:var(--navy); text-decoration:none; border-bottom:1px solid var(--gold);}
  @media (max-width:480px){
    .story-page h1{font-size:30px;} .story-page .sub{font-size:17px;}
    .story-page .loop{font-size:11px; letter-spacing:.12em;} .story-page .wrap{padding:28px 16px 48px;}
  }
`;

const EMPTY = { name: "", email: "", start: "", building: "", nextidea: "", story: "", consent: false };

export default function ShareYourStory() {
  const [data, setData] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.title = "Tell Me Your Story — The Looped Mind";
  }, []);

  const update = (k) => (e) =>
    setData((d) => ({ ...d, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function submit() {
    if (!data.story.trim() && !data.start.trim()) {
      alert("Tell me a little something first — even one sentence is plenty.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad response");
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      alert("Something went sideways sending that. Mind trying again in a moment?");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="story-page">
      <style>{CSS}</style>
      <div className="story-nav">
        <div className="inner">
          <a href="/" className="brand">The Looped Mind</a>
          <nav className="links">
            <a href="/">Home</a>
            <a href="/be-a-guest" className="hide-sm">Be a Guest</a>
            <a href="/#memoir">The Book</a>
          </nav>
        </div>
      </div>
      <div className="wrap">
        <header>
          <div className="eyebrow">— The Looped Mind —</div>
          <div className="loop">
            Imagine<span>&#9670;</span>Build<span>&#9670;</span>Launch<span>&#9670;</span>Learn<span>&#9670;</span>Repeat
          </div>
          <div className="tagline">Built to Imagine. Wired to Repeat.</div>
        </header>

        <hr className="rule" />

        {!sent ? (
          <>
            <h1>Tell Me Your Story</h1>
            <p className="sub">The Looped Mind grows one story at a time. Add yours.</p>

            <p className="intro">
              This whole thing started because I said one true sentence out loud and someone exhaled
              &ldquo;me&nbsp;too.&rdquo; That&rsquo;s the engine — your story, added to mine, added to the next
              person&rsquo;s. If something in the book or the workbook named a thing you&rsquo;d never quite had
              words for, I want to hear it.
            </p>
            <p className="intro">
              Bring your roster, your garage full of bottles, your domain drawer, and the one&#8209;more&#8209;idea
              that&rsquo;s already forming. Tell me where your loop took you.
            </p>

            <div className="field">
              <label htmlFor="name">Your name <span className="hint">— first name is fine</span></label>
              <input type="text" id="name" value={data.name} onChange={update("name")} autoComplete="name" />
            </div>

            <div className="field">
              <label htmlFor="email">Email <span className="hint">— so I can write back</span></label>
              <input type="email" id="email" value={data.email} onChange={update("email")} autoComplete="email" />
            </div>

            <div className="field">
              <label htmlFor="start">Where your loop started — your very first start</label>
              <textarea id="start" value={data.start} onChange={update("start")} />
            </div>

            <div className="field">
              <label htmlFor="building">What you&rsquo;re building right now</label>
              <textarea id="building" value={data.building} onChange={update("building")} />
            </div>

            <div className="field">
              <label htmlFor="nextidea">The one&#8209;more&#8209;idea already forming</label>
              <input type="text" id="nextidea" value={data.nextidea} onChange={update("nextidea")} />
            </div>

            <div className="field">
              <label htmlFor="story">
                Your story, in a few sentences{" "}
                <span className="hint">— the version you&rsquo;d tell someone who just said &ldquo;me too&rdquo;</span>
              </label>
              <textarea id="story" className="story" value={data.story} onChange={update("story")} />
            </div>

            <div className="consent">
              <input type="checkbox" id="consent" checked={data.consent} onChange={update("consent")} />
              <label htmlFor="consent">
                I&rsquo;m okay with Kathy sharing this (with my first name) in <em>Letters from the Loop</em>, on the
                site, or with the next person who&rsquo;s sure they&rsquo;re the only one.
              </label>
            </div>

            <button type="button" onClick={submit} disabled={sending}>
              {sending ? "Sending…" : "Send my story"}
            </button>
            <p className="note">You were never the only one. That&rsquo;s the whole point.</p>
          </>
        ) : (
          <div className="thanks">
            <h2>You&rsquo;re part of the loop now.</h2>
            <p>Thank you — your story is on its way to me. Pull up a chair. You&rsquo;re among your people.</p>
            <p>Now go start the next thing.</p>
          </div>
        )}

        <footer>
          <div className="brand">The Looped Mind</div>
          © Kathy Swanstrom · <a href="https://www.theloopedmind.com/">theloopedmind.com</a>
          <br />
          The home of the serial entrepreneurs.
        </footer>
      </div>
    </div>
  );
}
