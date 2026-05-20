type Props = {
  emoji: string;
  title: string;
  subtitle: string;
  accentVar: string;
};

export function SectionHero({ emoji, title, subtitle, accentVar }: Props) {
  return (
    <div
      className="rounded-3xl p-6 mb-5"
      style={{
        background: `color-mix(in srgb, var(${accentVar}) 14%, white)`,
      }}
    >
      <div className="text-4xl mb-2">{emoji}</div>
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted mt-1.5 leading-relaxed">{subtitle}</p>
    </div>
  );
}

export function ComingSoon({
  bullets,
}: {
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
        Coming soon in this tab
      </p>
      <ul className="space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm">
            <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
