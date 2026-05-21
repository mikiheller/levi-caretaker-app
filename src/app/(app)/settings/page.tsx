"use client";

import { useState } from "react";
import { Trash2, UserPlus, RefreshCw, Check, LogOut } from "lucide-react";
import { useCaretakers } from "@/components/CaretakersProvider";
import { useHousehold } from "@/components/HouseholdProvider";
import { SectionHero } from "@/components/SectionHero";
import { CARETAKER_ROLES, CaretakerRole } from "@/lib/caretakers";

export default function SettingsPage() {
  const {
    caretakers,
    activeCaretaker,
    addCaretaker,
    removeCaretaker,
    setActiveCaretaker,
  } = useCaretakers();
  const { disconnect: disconnectHousehold } = useHousehold();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<CaretakerRole>("Nanny");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    addCaretaker({ name, role });
    setName("");
    setRole("Nanny");
    setShowForm(false);
  }

  return (
    <div className="space-y-5 pb-4">
      <SectionHero
        emoji="⚙️"
        title="Settings"
        subtitle="Manage who can log time with Levi and switch users on this device."
        accentVar="--accent-settings"
      />

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Caretakers
          </h2>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            <UserPlus size={16} />
            Add
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={submit}
            className="rounded-2xl border border-border bg-surface p-4 mb-3 space-y-3"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-base focus:outline-none focus:border-primary"
              autoFocus
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as CaretakerRole)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-base focus:outline-none focus:border-primary appearance-none"
            >
              {CARETAKER_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setName("");
                }}
                className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim()}
                className="flex-1 rounded-xl bg-primary text-white py-2.5 text-sm font-semibold disabled:bg-primary/40"
              >
                Save
              </button>
            </div>
          </form>
        )}

        <ul className="space-y-2">
          {caretakers.length === 0 && (
            <li className="text-sm text-muted text-center py-6">
              No caretakers yet. Tap “Add” to create one.
            </li>
          )}
          {caretakers.map((c) => {
            const isActive = c.id === activeCaretaker?.id;
            return (
              <li
                key={c.id}
                className="flex items-center gap-3 rounded-2xl bg-surface border border-border p-3"
              >
                <span className="text-3xl leading-none">{c.emoji}</span>
                <div className="flex-1">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted">{c.role}</div>
                </div>
                {isActive ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-primary px-2.5 py-1.5 rounded-full bg-primary-soft">
                    <Check size={14} /> You
                  </span>
                ) : (
                  <button
                    onClick={() => setActiveCaretaker(c.id)}
                    className="text-xs font-medium px-2.5 py-1.5 rounded-full bg-background border border-border"
                  >
                    Switch
                  </button>
                )}
                <button
                  onClick={() => {
                    if (
                      window.confirm(`Remove ${c.name} from this device?`)
                    ) {
                      removeCaretaker(c.id);
                    }
                  }}
                  className="text-muted p-1.5 rounded-full hover:bg-background"
                  aria-label={`Remove ${c.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="space-y-2">
        <button
          onClick={() => setActiveCaretaker(null)}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface py-3 text-sm font-medium text-muted active:scale-[0.98] transition"
        >
          <RefreshCw size={15} />
          Sign out of this device
        </button>
        <button
          onClick={() => {
            if (
              window.confirm(
                "Disconnect this device from the household? You'll need the passphrase to reconnect.",
              )
            ) {
              disconnectHousehold();
            }
          }}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface py-3 text-sm font-medium text-muted active:scale-[0.98] transition"
        >
          <LogOut size={15} />
          Disconnect this device
        </button>
      </section>
    </div>
  );
}
