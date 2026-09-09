import OptionCard from "@/components/estimate/OptionCard";
import {
  COUNTY_OPTIONS,
  FINISH_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  SIZE_OPTIONS,
  UPGRADE_OPTIONS,
  type BathroomSize,
  type County,
  type EstimateInput,
  type FinishLevel,
  type ProjectType,
  type Upgrade,
} from "@/lib/estimate";

const DETAIL_TOGGLES: { key: keyof EstimateInput; label: string }[] = [
  { key: "secondFloor", label: "Is the bathroom on the second floor?" },
  { key: "waterDamage", label: "Is there existing water damage?" },
  { key: "builtBefore1980", label: "Was your home built before 1980?" },
  { key: "ceilingToo", label: "Do you want to redo the ceiling?" },
  { key: "movingPlumbing", label: "Are you moving plumbing?" },
  { key: "movingWalls", label: "Are you moving walls?" },
  { key: "permitsNeeded", label: "Will you need permits?" },
];

function GroupHeading({ n, title, subtitle }: { n: number; title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-dark">Step {n}</p>
      <h2 className="mt-1 font-display text-[1.6rem] font-medium leading-tight text-ink">{title}</h2>
      {subtitle ? <p className="mt-1 text-[0.9rem] text-ink-soft">{subtitle}</p> : null}
    </div>
  );
}

export default function ProjectStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: EstimateInput;
  onChange: (patch: Partial<EstimateInput>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canContinue = Boolean(value.size) && Boolean(value.projectType);

  const toggleUpgrade = (u: Upgrade) => {
    const has = value.upgrades.includes(u);
    onChange({ upgrades: has ? value.upgrades.filter((x) => x !== u) : [...value.upgrades, u] });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-12">
        <section>
          <GroupHeading n={1} title="What's the size of your bathroom?" />
          <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Bathroom size">
            {SIZE_OPTIONS.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                hint={o.hint}
                selected={value.size === o.value}
                onSelect={() => onChange({ size: o.value as BathroomSize })}
              />
            ))}
          </div>
        </section>

        <section>
          <GroupHeading n={2} title="What type of project are you planning?" />
          <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Project type">
            {PROJECT_TYPE_OPTIONS.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                hint={o.hint}
                selected={value.projectType === o.value}
                onSelect={() => onChange({ projectType: o.value as ProjectType })}
              />
            ))}
          </div>
        </section>

        <section>
          <GroupHeading
            n={3}
            title="What would you like to include?"
            subtitle="Select all that apply."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {UPGRADE_OPTIONS.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                selected={value.upgrades.includes(o.value)}
                multi
                onSelect={() => toggleUpgrade(o.value as Upgrade)}
              />
            ))}
          </div>
        </section>

        <section>
          <GroupHeading
            n={4}
            title="A few more details"
            subtitle="This helps fine-tune your estimate."
          />
          <div className="space-y-3">
            {DETAIL_TOGGLES.map(({ key, label }) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4 border border-line bg-white px-4 py-3"
              >
                <span className="text-[0.92rem] text-ink">{label}</span>
                <div className="flex shrink-0 gap-2">
                  {[true, false].map((v) => (
                    <button
                      key={String(v)}
                      type="button"
                      aria-pressed={value[key] === v}
                      onClick={() => onChange({ [key]: v } as Partial<EstimateInput>)}
                      className={`min-w-[52px] border px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] ${
                        value[key] === v
                          ? "border-brand-dark bg-brand-dark text-white"
                          : "border-line bg-white text-ink-soft"
                      }`}
                    >
                      {v ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                className="block text-[12px] font-bold uppercase tracking-[0.1em] text-ink"
                htmlFor="finish"
              >
                Finish level
              </label>
              <div className="mt-1.5 flex gap-2" id="finish">
                {FINISH_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={value.finish === o.value}
                    onClick={() => onChange({ finish: o.value as FinishLevel })}
                    className={`flex-1 border px-3 py-2 text-[12px] font-bold uppercase tracking-[0.08em] ${
                      value.finish === o.value
                        ? "border-brand-dark bg-brand-dark text-white"
                        : "border-line bg-white text-ink-soft"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label
                className="block text-[12px] font-bold uppercase tracking-[0.1em] text-ink"
                htmlFor="county"
              >
                Where is your project?
              </label>
              <select
                id="county"
                value={value.county}
                onChange={(e) => onChange({ county: e.target.value as County })}
                className="mt-1.5 w-full border border-line bg-white px-3 py-2.5 text-[0.95rem] text-ink"
              >
                {COUNTY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink-soft"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="inline-flex min-h-[52px] items-center bg-brand-dark px-7 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-ink disabled:opacity-50"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
