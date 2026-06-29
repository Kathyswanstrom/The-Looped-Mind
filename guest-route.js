import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people leave this empty. If it's filled, silently accept and drop.
  if ((body?.company || "").toString().trim()) {
    return NextResponse.json({ ok: true });
  }

  const row = {
    name: (body?.name || "").toString().slice(0, 200).trim(),
    email: (body?.email || "").toString().slice(0, 200).trim().toLowerCase(),
    where_from: (body?.where_from || "").toString().slice(0, 200).trim(),
    episode_type: (body?.episode_type || "").toString().slice(0, 40).trim(),
    letter: (body?.letter || "").toString().slice(0, 40).trim(),
    story: (body?.story || "").toString().slice(0, 8000).trim(),
    link: (body?.link || "").toString().slice(0, 500).trim(),
    consent: !!body?.consent,
  };

  if (!row.name || !EMAIL_RE.test(row.email) || !row.story) {
    return NextResponse.json({ error: "Name, a valid email, and a story are required." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server is not configured yet." }, { status: 500 });
  }

  const { error } = await supabase.from("guest_submissions").insert(row);
  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
