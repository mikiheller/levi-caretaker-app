import { NextResponse } from "next/server";
import { checkHouseholdSecret } from "@/lib/api-auth";

export const runtime = "edge";
export const maxDuration = 60;

export async function POST(request: Request) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error:
          "OPENAI_API_KEY is not set. Add it in the Vercel project's Environment Variables to enable voice transcription.",
      },
      { status: 500 },
    );
  }

  const incoming = await request.formData();
  const file = incoming.get("file");
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json(
      { error: "Missing 'file' (audio Blob)." },
      { status: 400 },
    );
  }

  const forward = new FormData();
  const name =
    incoming.get("filename")?.toString() ||
    (file instanceof File ? file.name : "audio.webm");
  forward.append("file", file, name);
  forward.append("model", "whisper-1");
  forward.append("language", "en");
  forward.append("response_format", "json");

  try {
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: forward,
    });
    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `Whisper API error (${res.status}): ${errText.slice(0, 300)}` },
        { status: 502 },
      );
    }
    const data = (await res.json()) as { text?: string };
    return NextResponse.json({ text: data.text ?? "" });
  } catch (e) {
    return NextResponse.json(
      {
        error:
          e instanceof Error ? e.message : "Unknown transcription error",
      },
      { status: 502 },
    );
  }
}
