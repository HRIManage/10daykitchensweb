import { Check } from "lucide-react";

export default function OptionCard({
  label,
  hint,
  selected,
  multi = false,
  onSelect,
}: {
  label: string;
  hint?: string;
  selected: boolean;
  multi?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onSelect}
      className={`relative flex w-full flex-col items-start gap-1 border p-4 text-left transition ${
        selected ? "border-brand-dark bg-brand-dark/5" : "border-line bg-white hover:border-ink-muted"
      }`}
    >
      <span
        className={`absolute right-3 top-3 flex size-5 items-center justify-center rounded-full border ${
          selected ? "border-brand-dark bg-brand-dark text-white" : "border-line text-transparent"
        }`}
      >
        <Check className="size-3" aria-hidden />
      </span>
      <span className="pr-7 text-[0.95rem] font-semibold text-ink">{label}</span>
      {hint ? <span className="text-[0.8rem] leading-snug text-ink-soft">{hint}</span> : null}
    </button>
  );
}
