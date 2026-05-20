"use client";

import { useState } from "react";
import { Plus, UserPlus } from "lucide-react";
import {
  CARETAKER_ROLES,
  Caretaker,
  CaretakerRole,
} from "@/lib/caretakers";
import { useCaretakers } from "@/components/CaretakersProvider";

type Mode = "list" | "add";

export function CaretakerPicker({
  title = "Who's with Levi?",
  subtitle = "Tap your name so we know who's logging.",
  onPicked,
  showAddFirst = false,
}: {
  title?: string;
  subtitle?: string;
  onPicked?: (caretaker: Caretaker) => void;
  showAddFirst?: boolean;
}) {
  const { caretakers, addCaretaker, setActiveCaretaker } = useCaretakers();
  const [mode, setMode] = useState<Mode>(
    showAddFirst || caretakers.length === 0 ? "add" : "list",
  );

  function handlePick(c: Caretaker) {
    setActiveCaretaker(c.id);
    onPicked?.(c);
  }

  return (
    <div className="w-full max-w-md mx-auto px-6">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">👋</div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted mt-2 text-sm">{subtitle}</p>
      </div>

      {mode === "list" ? (
        <div className="space-y-3">
          {caretakers.map((c) => (
            <button
              key={c.id}
              onClick={() => handlePick(c)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-surface border border-border hover:border-primary hover:bg-primary-soft transition active:scale-[0.98] shadow-sm text-left"
            >
              <span className="text-3xl leading-none">{c.emoji}</span>
              <span className="flex-1">
                <span className="block font-semibold">{c.name}</span>
                <span className="block text-xs text-muted">{c.role}</span>
              </span>
            </button>
          ))}

          <button
            onClick={() => setMode("add")}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-border hover:border-primary hover:text-primary text-muted transition"
          >
            <UserPlus size={18} />
            <span className="text-sm font-medium">Add a caretaker</span>
          </button>
        </div>
      ) : (
        <AddCaretakerForm
          onCancel={() => setMode("list")}
          onCreated={(c) => {
            handlePick(c);
          }}
          allowCancel={caretakers.length > 0}
          addCaretaker={addCaretaker}
        />
      )}
    </div>
  );
}

function AddCaretakerForm({
  onCreated,
  onCancel,
  allowCancel,
  addCaretaker,
}: {
  onCreated: (c: Caretaker) => void;
  onCancel: () => void;
  allowCancel: boolean;
  addCaretaker: (input: { name: string; role: CaretakerRole }) => Caretaker;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<CaretakerRole>("Parent");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const created = addCaretaker({ name, role });
    onCreated(created);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label
          htmlFor="caretaker-name"
          className="block text-sm font-medium mb-1.5"
        >
          Your name
        </label>
        <input
          id="caretaker-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Sarah"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-base focus:outline-none focus:border-primary"
          autoFocus
        />
      </div>

      <div>
        <label
          htmlFor="caretaker-role"
          className="block text-sm font-medium mb-1.5"
        >
          Role
        </label>
        <select
          id="caretaker-role"
          value={role}
          onChange={(e) => setRole(e.target.value as CaretakerRole)}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-base focus:outline-none focus:border-primary appearance-none"
        >
          {CARETAKER_ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={!name.trim()}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-3.5 active:scale-[0.98] transition disabled:bg-primary/40 disabled:cursor-not-allowed"
      >
        <Plus size={18} />
        Add &amp; continue
      </button>

      {allowCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="w-full text-sm text-muted py-2"
        >
          Cancel
        </button>
      )}
    </form>
  );
}
