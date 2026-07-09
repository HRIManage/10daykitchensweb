import type { ReactNode } from "react";

/**
 * Thin framed-image wrapper. The scroll-triggered clip-path wipe is now
 * applied globally by ScrollRevealProvider (which targets every framed
 * `next/image` fill on the page), so this component only renders the frame —
 * it no longer owns any animation of its own. Kept as a named wrapper so the
 * intent stays readable at call sites; `delay` is accepted for backward
 * compatibility and ignored.
 */
export default function ImageReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}
