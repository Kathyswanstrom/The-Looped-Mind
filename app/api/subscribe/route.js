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

  const email = (body?.email || "").trim().toLowerCase();
  const source = (body?.source || "general").toString().slice(0, 60);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Server is not configured yet. Try again shortly." },
      { status: 500 }
    );
  }

  const { error } = await supabase
    .from("subscribers")
    .insert({ email, source });

  if (error) {
    // 23505 = unique violation: the email is already on the list.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, alreadyOnList: true });
    }
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try again in a moment." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
