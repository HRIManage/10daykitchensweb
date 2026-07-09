"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global scroll motion for every page — no per-page wiring required.
 *
 * Two effects, both driven off one IntersectionObserver pass that re-runs on
 * each route change (keyed by pathname, since this provider is mounted once in
 * the root layout and would otherwise never re-scan after a client navigation):
 *
 *  1. Section reveal — every `main > section` fades + rises + unblurs as it
 *     enters view. The first section is shown immediately (it's above the
 *     fold; animating it would flash and hurt LCP).
 *  2. Image wipe — content photography (next/image `fill`) clip-path wipes up
 *     into view, the signature reveal from /collections. Decorative
 *     backgrounds (empty alt) and above-the-fold hero imagery are skipped so
 *     nothing flashes on load.
 *
 * Everything is disabled under prefers-reduced-motion.
 */
export default function ScrollRevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver | undefined;
    let onScroll: (() => void) | undefined;

    // Wait a frame so the freshly-navigated DOM is in place before scanning.
    const raf = requestAnimationFrame(() => {
      const main = document.querySelector("main");
      if (!main) return;

      // 1. Section reveals — sections aren't clipped, so IntersectionObserver
      //    is the right tool here.
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
      );

      const sections = Array.from(main.querySelectorAll<HTMLElement>(":scope > section"));
      const firstSection = sections[0];
      sections.forEach((section, index) => {
        section.classList.add("scroll-reveal");
        if (index === 0) {
          section.classList.add("is-visible");
        } else {
          observer?.observe(section);
        }
      });

      // 2. Image wipes — target the framed container of each content image.
      //    These carry clip-path: inset(100%), which zeroes an element's
      //    IntersectionObserver ratio, so we reveal them with a rAF-throttled
      //    getBoundingClientRect check instead (clip-path doesn't affect the
      //    layout box getBoundingClientRect reports).
      const wipes: HTMLElement[] = [];
      main.querySelectorAll<HTMLImageElement>('img[data-nimg="fill"]').forEach((img) => {
        if (img.getAttribute("alt") === "") return; // decorative bg / scrim
        const frame = (img.closest(".overflow-hidden") as HTMLElement | null) ?? img.parentElement;
        if (!frame || frame.classList.contains("img-wipe")) return;
        if (firstSection && firstSection.contains(frame)) return; // above the fold
        frame.classList.add("img-wipe");
        wipes.push(frame);
      });

      if (wipes.length === 0) return;

      let ticking = false;
      const reveal = () => {
        ticking = false;
        const trigger = window.innerHeight * 0.88;
        for (let i = wipes.length - 1; i >= 0; i--) {
          // Reveal once the frame's top crosses the trigger line. No lower
          // bound, so frames scrolled past quickly (fast scroll, mid-page
          // anchor landings) still resolve to visible instead of sticking.
          if (wipes[i].getBoundingClientRect().top < trigger) {
            wipes[i].classList.add("is-revealed");
            wipes.splice(i, 1);
          }
        }
        if (wipes.length === 0 && onScroll) {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      };
      onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(reveal);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      reveal(); // reveal whatever is already in view
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      if (onScroll) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
  }, [pathname]);

  return null;
}
