const STAGES = ["Size", "Project", "Upgrades", "Details", "Contact", "Result"];

export default function ProgressBar({ current }: { current: number }) {
  return (
    <ol
      className="flex items-center gap-2"
      aria-label={`Step ${Math.max(1, current)} of ${STAGES.length}`}
    >
      {STAGES.map((stage, i) => {
        const n = i + 1;
        const state = n < current ? "done" : n === current ? "active" : "todo";
        return (
          <li key={stage} className="flex flex-1 items-center gap-2">
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                state === "todo" ? "bg-sand text-ink-muted" : "bg-brand-dark text-white"
              }`}
            >
              {n}
            </span>
            <span
              className={`hidden text-[11px] font-bold uppercase tracking-[0.1em] sm:inline ${
                state === "todo" ? "text-ink-muted" : "text-ink"
              }`}
            >
              {stage}
            </span>
            {n < STAGES.length ? <span className="h-px flex-1 bg-line" /> : null}
          </li>
        );
      })}
    </ol>
  );
}
