import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export const runtime = "edge";

function getExpectedSecret(): string | null {
  const v = process.env.HOUSEHOLD_SECRET;
  return v && v.length > 0 ? v : null;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function POST(request: Request): Promise<NextResponse> {
  const expectedSecret = getExpectedSecret();
  if (!expectedSecret) {
    return NextResponse.json(
      { error: "HOUSEHOLD_SECRET is not set on the server." },
      { status: 500 },
    );
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN is not set. Add Vercel Blob storage in the Vercel dashboard (Storage → Create → Blob).",
      },
      { status: 500 },
    );
  }

  const body = (await request.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let providedSecret: string | null = null;
        try {
          const parsed = clientPayload
            ? (JSON.parse(clientPayload) as { secret?: string })
            : {};
          providedSecret = parsed.secret ?? null;
        } catch {
          providedSecret = null;
        }
        if (
          !providedSecret ||
          !timingSafeEqual(providedSecret, expectedSecret)
        ) {
          throw new Error("Unauthorized: invalid or missing household secret.");
        }
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/heic",
            "image/heif",
            "image/gif",
            "video/mp4",
            "video/quicktime",
            "video/webm",
            "audio/webm",
            "audio/mp4",
            "audio/mpeg",
            "audio/wav",
            "audio/ogg",
          ],
          maximumSizeInBytes: 100 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async () => {
        // no-op
      },
    });
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload failed" },
      { status: 400 },
    );
  }
}
