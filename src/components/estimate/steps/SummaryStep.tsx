import {
  COUNTY_LABELS,
  FINISH_LABELS,
  PROJECT_TYPE_LABELS,
  SIZE_LABELS,
  UPGRADE_LABELS,
  type EstimateInput,
} from "@/lib/estimate";

export default function SummaryStep({
  input,
  timeline,
  onEdit,
  onSchedule,
}: {
  input: EstimateInput;
  timeline: string;
  onEdit: () => void;
  onSchedule: () => void;
}) {
  const rows: [string, string][] = [
    ["Bathroom size", SIZE_LABELS[input.size]],
    ["Project type", PROJECT_TYPE_LABELS[input.projectType]],
    ["Finish level", FINISH_LABELS[input.finish]],
    ["Location", COUNTY_LABELS[input.county]],
    [
      "Upgrades",
      input.upgrades.length
        ? input.upgrades.map((u) => UPGRADE_LABELS[u]).join(", ")
        : "None selected",
    ],
    ["Timeline", timeline || "Not specified"],
  ];
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[1.9rem] font-medium text-ink">Project summary</h2>
        <button
          type="button"
          onClick={onEdit}
          className="text-[12px] font-bold uppercase tracking-[0.12em] text-brand-dark underline underline-offset-4"
        >
          Edit answers
        </button>
      </div>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[140px_1fr] gap-4 py-4">
            <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-muted">{label}</dt>
            <dd className="text-[0.95rem] text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        onClick={onSchedule}
        className="mt-8 inline-flex min-h-[52px] items-center justify-center bg-brand-dark px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-ink"
      >
        Schedule free consultation
      </button>
    </div>
  );
}
