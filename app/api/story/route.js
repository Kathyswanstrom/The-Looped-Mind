import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const row = {
    name: (body?.name || "").toString().slice(0, 200).trim(),
    email: (body?.email || "").toString().slice(0, 200).trim().toLowerCase(),
    loop_start: (body?.start || "").toString().slice(0, 5000).trim(),
    building_now: (body?.building || "").toString().slice(0, 5000).trim(),
    next_idea: (body?.nextidea || "").toString().slice(0, 2000).trim(),
    story: (body?.story || "").toString().slice(0, 10000).trim(),
    consent: !!body?.consent,
  };

  if (!row.story && !row.loop_start) {
    return NextResponse.json({ error: "Please share at least a sentence." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server is not configured yet." }, { status: 500 });
  }

  const { error } = await supabase.from("stories").insert(row);
  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
