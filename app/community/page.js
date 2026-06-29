"use client";

import { useEffect, useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Spline+Sans:wght@400;500;600&display=swap');

  .community-page{
    --navy:#16223d; --deep:#11203c; --gold:#c5a352; --goldb:#d8b865;
    --cream:#f4efe2; --cream2:#faf6ec; --muted:#5d6678;
    --display:'Fraunces',Georgia,serif; --body:'Spline Sans',system-ui,sans-serif;
    background:var(--cream2); color:#1d2738; font-family:var(--body);
    line-height:1.6; -webkit-font-smoothing:antialiased; min-height:100vh;
  }
  .community-page *{box-sizing:border-box;}
  .community-page .wrap{max-width:720px; margin:0 auto; padding:0 24px;}
  .community-page h1,.community-page h2{font-family:var(--display); font-weight:500; line-height:1.12;}
  .community-page .eyebrow{font-family:var(--body); font-size:12px; font-weight:600; letter-spacing:.22em; text-transform:uppercase; color:var(--gold);}

  .cm-nav{position:sticky; top:0; z-index:30; background:var(--deep); border-bottom:1px solid rgba(197,163,82,.3);}
  .cm-nav .inner{max-width:720px; margin:0 auto; padding:13px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px;}
  .cm-nav a.brand{font-family:var(--display); font-style:italic; color:var(--goldb); font-size:18px; text-decoration:none; white-space:nowrap;}
  .cm-nav .links{display:flex; gap:20px; align-items:center;}
  .cm-nav .links a{font-size:13px; font-weight:600; color:rgba(244,239,226,.85); text-decoration:none;}
  .cm-nav .links a:hover{color:var(--goldb);}
  @media (max-width:520px){ .cm-nav .links a.hide-sm{display:none;} }

  .cm-hero{background:radial-gradient(120% 120% at 50% 0%, #1d2c4d, var(--navy) 60%, var(--deep)); color:var(--cream); text-align:center; padding:64px 0 54px;}
  .cm-hero h1{font-size:clamp(30px,5vw,44px); color:var(--cream); margin:14px 0 14px;}
  .cm-hero p{font-size:18px; color:rgba(244,239,226,.82); max-width:540px; margin:0 auto;}

  .sec{padding:56px 0;}
  .card{background:#fff; border:1px solid #e7ddc6; border-radius:14px; padding:26px;}
  .field{margin-bottom:16px;}
  .field label{display:block; font-size:14px; font-weight:600; color:var(--navy); margin-bottom:6px;}
  .field .hint{font-weight:400; color:var(--muted); font-style:italic;}
  .field input,.field textarea{width:100%; font-family:var(--body); font-size:16px; color:#1d2738; padding:12px 14px; border:1px solid #cfc6b0; border-radius:8px; background:var(--cream2);}
  .field textarea{min-height:120px; resize:vertical;}
  .field input:focus,.field textarea:focus{outline:none; border-color:var(--gold); box-shadow:0 0 0 3px rgba(197,163,82,.2);}
  .row{display:grid; grid-template-columns:1fr 1fr; gap:14px;}
  .hp{position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden;}
  .btn{display:inline-block; font-family:var(--body); font-size:15px; font-weight:600; letter-spacing:.02em; padding:13px 28px; border-radius:8px; border:0; cursor:pointer; background:var(--gold); color:var(--deep); transition:all .2s ease;}
  .btn:hover{background:var(--goldb);}
  .btn:disabled{opacity:.6; cursor:default;}
  .msg{font-size:14px; margin-top:12px;}
  .msg.err{color:#9c3a3a;}
  .note{font-size:13px; color:var(--muted); font-style:italic; margin-top:12px;}

  .success{background:#0f1d36; color:var(--cream); border-radius:14px; padding:34px 28px; text-align:center;}
  .success h2{color:var(--cream); font-size:24px; margin-bottom:10px;}
  .success p{color:rgba(244,239,226,.82); margin:0 auto 8px; max-width:440px;}

  .feed-head{margin:8px 0 22px;}
  .feed-head h2{font-size:clamp(24px,4vw,32px); color:var(--navy);}
  .post{background:#fff; border:1px solid #e7ddc6; border-left:4px solid var(--gold); border-radius:0 12px 12px 0; padding:20px 22px; margin-bottom:16px;}
  .post .who{font-family:var(--display); font-size:18px; color:var(--navy);}
  .post .where{font-size:13px; color:var(--muted); margin-left:8px;}
  .post .body{margin:8px 0 0; font-size:16px; color:#2a3447; white-space:pre-wrap;}
  .empty{color:var(--muted); font-style:italic; padding:18px 0;}

  .cm-foot{background:var(--deep); color:rgba(244,239,226,.7); text-align:center; padding:36px 0;}
  .cm-foot .tag{font-family:var(--display); font-style:italic; color:var(--goldb); font-size:18px;}
  .cm-foot a{color:var(--cream); text-decoration:none; border-bottom:1px solid var(--gold);}

  @media (max-width:520px){ .row{grid-template-columns:1fr;} }
`;

const EMPTY = { name: "", city: "", post: "", consent: false, company: "" };

export default function Community() {
  const [data, setData] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const [posts, setPosts] = useState(null); // null = loading

  useEffect(() => {
    document.title = "Community — The Looped Mind";
    fetch("/api/community")
      .then((r) => r.json())
      .then((d) => setPosts(Array.isArray(d.posts) ? d.posts : []))
      .catch(() => setPosts([]));
  }, []);

  const up = (k) => (e) =>
    setData((d) => ({ ...d, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function submit() {
    setErr("");
    if (!data.name.trim() || !data.post.trim()) {
      setErr("A name and a few words — that's all it takes.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/community", {
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
    <div className="community-page">
      <style>{CSS}</style>

      <div className="cm-nav">
        <div className="inner">
          <a href="/" className="brand">The Looped Mind</a>
          <nav className="links">
            <a href="/">Home</a>
            <a href="/be-a-guest" className="hide-sm">Be a Guest</a>
            <a href="/#memoir">The Book</a>
          </nav>
        </div>
      </div>

      <section className="cm-hero">
        <div className="wrap">
          <div className="eyebrow" style={{ color: "var(--goldb)" }}>The home of the serial entrepreneurs</div>
          <h1>The Community Wall</h1>
          <p>Post a win, a loop you&rsquo;re in, or a lesson the last venture handed forward. Read the room and find your people.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          {!sent ? (
            <div className="card">
              <div className="eyebrow">Add your voice</div>
              <h2 style={{ fontSize: 26, color: "var(--navy)", margin: "6px 0 18px" }}>Share your loop.</h2>

              <div className="row">
                <div className="field">
                  <label htmlFor="cm-name">Your name <span className="hint">— first name is fine</span></label>
                  <input id="cm-name" type="text" value={data.name} onChange={up("name")} autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="cm-city">Where you&rsquo;re from <span className="hint">— optional</span></label>
                  <input id="cm-city" type="text" value={data.city} onChange={up("city")} placeholder="Florissant, CO" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="cm-post">Your post</label>
                <textarea id="cm-post" value={data.post} onChange={up("post")} placeholder="A win, a loop you're in, a lesson you'd tell someone who just said &ldquo;me too.&rdquo;" />
              </div>

              <div className="hp" aria-hidden="true">
                <label htmlFor="cm-company">Company</label>
                <input id="cm-company" type="text" tabIndex={-1} autoComplete="off" value={data.company} onChange={up("company")} />
              </div>

              <button type="button" className="btn" onClick={submit} disabled={sending}>
                {sending ? "Sending…" : "Post to the wall"}
              </button>
              {err && <div className="msg err">{err}</div>}
              <p className="note">Posts are read and approved by Kathy before they appear — so the wall stays warm and real.</p>
            </div>
          ) : (
            <div className="success">
              <h2>You&rsquo;re part of the loop now.</h2>
              <p>Thank you — your post is with me. I read every one, and the good ones go up on the wall soon.</p>
              <p>Now go start the next thing.</p>
            </div>
          )}
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="feed-head">
            <div className="eyebrow">From the loop</div>
            <h2>What the community is saying.</h2>
          </div>

          {posts === null ? (
            <div className="empty">Loading the wall…</div>
          ) : posts.length === 0 ? (
            <div className="empty">The wall&rsquo;s just getting started. Be the first to share your loop.</div>
          ) : (
            posts.map((p) => (
              <div className="post" key={p.id}>
                <span className="who">{p.name}</span>
                {p.city ? <span className="where">· {p.city}</span> : null}
                <p className="body">{p.post}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="cm-foot">
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
