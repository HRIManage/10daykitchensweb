"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MaskLine } from "@/lib/motion";
import Reveal from "@/components/motion/Reveal";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hideCopy, setHideCopy] = useState(false);

  // Zoom-and-fade hero: the section is taller than the viewport and its inner
  // frame is pinned (sticky). The kitchen is a full-bleed background with the
  // copy on top. As the page scrolls, the copy fades away and the kitchen
  // smoothly zooms in — pushing past the room to feature the marble island and
  // cabinetry up close.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setHideCopy(latest > 0.26);
    });
  }, [scrollYProgress]);

  // Background zooms in AND slides up together across the pinned scroll —
  // pushing closer while lifting to reveal the whole kitchen.
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.56]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  // Copy fades and lifts away, fully gone by ~a third of the scroll.
  const copyY = useTransform(scrollYProgress, [0, 0.3], ["0vh", "-15vh"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  // Legibility wash fades as the copy leaves, letting the moving kitchen go
  // full-strength and vivid.
  const washOpacity = useTransform(scrollYProgress, [0, 0.26], [1, 0]);

  // Layered parallax clip: the foreground photo layer slides up to cover the text stack
  const clipPercent = useTransform(scrollYProgress, [0, 0.28], [100, 0]);
  const foregroundClip = useTransform(clipPercent, (v) => `inset(${v}% 0% 0% 0%)`);



  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-[260vh] bg-[#F7FAF5]"
        aria-label="10 Day Kitchens — kitchen and bath remodeling done in 10 business days"
      >
        {/* Pinned viewport — the hero holds while the kitchen zooms in */}
        <div className="sticky top-0 h-screen overflow-hidden bg-[#F7FAF5]">
          {/* Background kitchen photo — z-0, zooms in as the user scrolls */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-0 h-[150%]"
            style={{
              scale: imageScale,
              y: imageY,
              transformOrigin: "center 70%",
            }}
          >
            <Image
              src="/images/98debbd8-2e4d-44d5-a9c5-184e11eb8a5e.png"
              alt="Premium marble waterfall island kitchen with oak cabinetry, brass pendant lighting, and fresh greenery — custom remodel by 10 Day Kitchens in Lacey, WA"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 62%" }}
            />
          </motion.div>

          {/* Legibility wash — z-2, light where the copy sits */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-2"
            style={{
              opacity: washOpacity,
              background:
                "linear-gradient(to bottom, rgba(247,250,245,0.96) 0%, rgba(247,250,245,0.85) 26%, rgba(247,250,245,0.45) 50%, rgba(247,250,245,0.1) 72%, rgba(247,250,245,0) 100%)",
            }}
          />

          {/* Headline stack — z-5, sits above background photo and hides behind foreground photo */}
          <motion.div
            className="relative z-5 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center"
            style={{
              paddingTop: "clamp(175px, 21vh, 225px)",
              y: copyY,
              opacity: copyOpacity,
              display: hideCopy ? "none" : "flex",
            }}
          >
            <h1
              className="mb-6 text-[#111111]"
              style={{
                fontSize: "clamp(32px, 5vw, 66px)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              <MaskLine delay={0.1}>
                <span className="whitespace-nowrap">Your Dream Kitchen &amp; Bath</span>
              </MaskLine>
              <MaskLine delay={0.22}>
                <span className="text-[#5DBB46]">Done in 10 Days.</span>
              </MaskLine>
            </h1>

            <Reveal
              as="p"
              delay={180}
              className="mb-8 max-w-xl text-base leading-relaxed text-[#555555] sm:text-lg"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              We help homeowners create beautiful, functional kitchens and baths with high-quality
              craftsmanship — completed in just 10 business days.
            </Reveal>

            <Reveal delay={270} className="flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="btn btn-solid pulse-shimmer-btn">
                Schedule Free Consultation
              </a>
              <a href="#portfolio" className="btn btn-outline-dark">
                Explore Our Work
                <ArrowDown className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </a>
            </Reveal>
          </motion.div>

          {/* Foreground kitchen photo — z-10, slides up to cover the text stack */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[150%]"
            style={{
              scale: imageScale,
              y: imageY,
              transformOrigin: "center 70%",
              clipPath: foregroundClip,
            }}
          >
            <Image
              src="/images/98debbd8-2e4d-44d5-a9c5-184e11eb8a5e.png"
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 62%" }}
            />
          </motion.div>

        </div>
      </section>

    </>
  );
}
