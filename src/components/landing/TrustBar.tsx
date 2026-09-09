import type { LucideIcon } from "lucide-react";
import { CalendarCheck, Gem, Hammer, ShieldCheck } from "lucide-react";
import { CONTAINER } from "@/components/layout";

export type TrustItem = { icon: LucideIcon; label: string };

const DEFAULT_ITEMS: TrustItem[] = [
  { icon: CalendarCheck, label: "Free in-home design consultation" },
  { icon: Gem, label: "Premium materials" },
  { icon: Hammer, label: "Professional installation" },
  { icon: ShieldCheck, label: "5-year workmanship warranty" },
];

export default function TrustBar({ items = DEFAULT_ITEMS }: { items?: TrustItem[] }) {
  return (
    <section className="border-y border-line bg-white">
      <div className={`${CONTAINER} grid grid-cols-2 gap-x-6 gap-y-5 py-7 md:grid-cols-4`}>
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="size-5 shrink-0 text-brand-dark" aria-hidden />
            <span className="text-[13px] font-semibold leading-snug text-ink">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
