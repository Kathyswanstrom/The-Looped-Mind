import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  let supabase;
  try {
    supabase = getSupabase();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ posts: [] });
  }

  // RLS only exposes approved rows to the anon role.
  const { data, error } = await supabase
    .from("community_posts")
    .select("id, name, city, post, reply, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Community fetch error:", error);
    return NextResponse.json({ posts: [] });
  }
  return NextResponse.json({ posts: data || [] });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill this; real people don't. Silently accept and drop.
  if ((body?.company || "").toString().trim()) {
    return NextResponse.json({ ok: true });
  }

  const row = {
    name: (body?.name || "").toString().slice(0, 120).trim(),
    city: (body?.city || "").toString().slice(0, 120).trim(),
    post: (body?.post || "").toString().slice(0, 4000).trim(),
    status: "pending",
  };

  if (!row.name || !row.post) {
    return NextResponse.json({ error: "Name and a post are required." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server is not configured yet." }, { status: 500 });
  }

  const { error } = await supabase.from("community_posts").insert(row);
  if (error) {
    console.error("Community insert error:", error);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

