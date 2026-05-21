"use client";

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Check,
  Image as ImageIcon,
  Loader2,
  Mic,
  Square,
  X,
} from "lucide-react";
import { upload } from "@vercel/blob/client";
import clsx from "clsx";
import {
  BehaviorMedia,
  mediaKindFromContentType,
} from "@/lib/behaviorLogs";
import { api, ApiError, loadHouseholdSecret } from "@/lib/apiClient";
import { useBehaviorLogs } from "@/components/BehaviorLogsProvider";
import { useCaretakers } from "@/components/CaretakersProvider";

type RecordingState = "idle" | "recording" | "transcribing";

export function BehaviorSheet({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const { activeCaretaker } = useCaretakers();
  const { logBehavior } = useBehaviorLogs();
  const [text, setText] = useState("");
  const [media, setMedia] = useState<BehaviorMedia[]>([]);
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  async function startRecording() {
    setRecordingError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "";
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined,
      );
      recordedChunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) recordedChunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(recordedChunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        setRecordingState("transcribing");
        try {
          const { text: transcribed } = await api.transcribeAudio(blob);
          if (transcribed) {
            setText((prev) =>
              prev ? `${prev}\n${transcribed}`.trim() : transcribed,
            );
          }
        } catch (e) {
          setRecordingError(
            e instanceof ApiError
              ? e.message
              : "Couldn't transcribe — try typing it instead.",
          );
        } finally {
          setRecordingState("idle");
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecordingState("recording");
    } catch {
      setRecordingError(
        "Couldn't access the microphone. Check your browser's permissions.",
      );
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploadError(null);
    setUploadingCount(files.length);
    const newMedia: BehaviorMedia[] = [];
    try {
      const secret = loadHouseholdSecret() ?? "";
      for (const file of Array.from(files)) {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
          clientPayload: JSON.stringify({ secret }),
        });
        newMedia.push({
          url: blob.url,
          type: mediaKindFromContentType(file.type),
          contentType: file.type,
          filename: file.name,
        });
      }
      setMedia((prev) => [...prev, ...newMedia]);
    } catch (e) {
      setUploadError(
        e instanceof Error ? e.message : "Upload failed. Try a smaller file.",
      );
    } finally {
      setUploadingCount(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeMedia(idx: number) {
    setMedia(media.filter((_, i) => i !== idx));
  }

  function save() {
    if (!activeCaretaker || !text.trim()) return;
    logBehavior({
      caretakerId: activeCaretaker.id,
      text,
      media,
    });
    onSaved();
  }

  const canSave = activeCaretaker && text.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 w-full h-full cursor-default"
      />
      <div className="relative w-full max-w-2xl bg-background rounded-t-3xl shadow-2xl px-5 pt-6 pb-8 space-y-4 safe-bottom max-h-[92dvh] overflow-y-auto">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-foreground/15" />

        <header className="text-center pt-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Saw something new
          </h2>
          <p className="text-xs text-muted mt-1">
            Type, talk, or attach a photo/video.
          </p>
        </header>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What did Levi do? Even a few words is great."
          rows={5}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-base focus:outline-none focus:border-primary"
          autoFocus
        />

        {recordingError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
            {recordingError}
          </p>
        )}

        <div className="flex gap-2">
          {recordingState === "idle" && (
            <button
              type="button"
              onClick={startRecording}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-sm font-medium active:scale-[0.98] transition"
            >
              <Mic size={16} />
              Record voice
            </button>
          )}
          {recordingState === "recording" && (
            <button
              type="button"
              onClick={stopRecording}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-500 text-white py-3 text-sm font-semibold animate-pulse"
            >
              <Square size={14} fill="white" />
              Stop recording
            </button>
          )}
          {recordingState === "transcribing" && (
            <button
              type="button"
              disabled
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-sm font-medium"
            >
              <Loader2 size={16} className="animate-spin" />
              Transcribing…
            </button>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingCount > 0}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-sm font-medium active:scale-[0.98] transition disabled:opacity-60"
          >
            {uploadingCount > 0 ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <Camera size={16} />
                Photo / video
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {uploadError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
            {uploadError}
          </p>
        )}

        {media.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {media.map((m, idx) => (
              <div
                key={`${m.url}-${idx}`}
                className="relative aspect-square rounded-xl overflow-hidden bg-foreground/5"
              >
                {m.type === "photo" ? (
                  <img
                    src={m.url}
                    alt={m.filename ?? "photo"}
                    className="w-full h-full object-cover"
                  />
                ) : m.type === "video" ? (
                  <video
                    src={m.url}
                    className="w-full h-full object-cover"
                    muted
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    <ImageIcon size={28} className="text-muted" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeMedia(idx)}
                  aria-label="Remove"
                  className="absolute top-1 right-1 w-7 h-7 rounded-full bg-black/65 text-white flex items-center justify-center"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={save}
            disabled={!canSave}
            className={clsx(
              "w-full flex items-center justify-center gap-2 rounded-2xl font-semibold py-4 transition shadow-lg active:scale-[0.98]",
              canSave
                ? "bg-primary text-white"
                : "bg-primary/40 text-white cursor-not-allowed",
            )}
          >
            <Check size={18} />
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full text-sm text-muted py-2"
          >
            Not yet
          </button>
        </div>
      </div>
    </div>
  );
}
