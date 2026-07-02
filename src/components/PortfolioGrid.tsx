"use client";

import Link from "next/link";
import { Maximize2 } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const projects = [
  { title: 'The Modern Forest-Inspired Kitchen', location: 'Olympia, WA', img: '/images/project-forest-kitchen.jpg', alt: 'Forest kitchen dark cabinetry' },
  { title: 'University Place Kitchen & Baths', location: 'University Place, WA', img: '/images/project-university-place.png', alt: 'White shaker kitchen' },
  { title: 'Coastal Calm Kitchen', location: 'Steilacoom, WA', img: '/images/project-coastal-calm.jpg', alt: 'Light blue coastal kitchen' },
  { title: 'Heritage Woods Kitchen', location: 'DuPont, WA', img: '/images/project-heritage-woods.png', alt: 'Wood tone kitchen' },
  { title: 'Midnight Blue Kitchen', location: 'South Sound, WA', img: '/images/project-midnight-blue.jpg', alt: 'Navy blue kitchen' },
];

function ProjectTile({
  p,
  className,
  delay,
  isWide = false,
}: {
  p: (typeof projects)[number];
  className: string;
  delay: number;
  isWide?: boolean;
}) {
  return (
    <Reveal
      delay={delay}
      className={`${className} group flex flex-col`}
    >
      <div className={`relative overflow-hidden rounded-md bg-neutral-100 ${isWide ? 'aspect-[21/9]' : 'aspect-[4/3]'} w-full`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.img}
          alt={p.alt}
          className="w-full h-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
        
        {/* Expand affordance */}
        <span className="absolute right-4 bottom-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-[#5DBB46] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 shadow-md">
          <Maximize2 className="h-4 w-4" />
        </span>
      </div>

      {/* Caption/Details container */}
      <div className="flex-1 flex flex-col justify-between pt-5">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 bg-[#EEF4EB] text-[#5DBB46] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              {p.location}
            </span>
            <span className="inline-flex items-center gap-1 bg-neutral-200/50 text-neutral-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              10 Days
            </span>
          </div>
          <h3 className="font-semibold text-lg text-[#111111] mb-3 group-hover:text-[#5DBB46] transition-colors duration-300">
            {p.title}
          </h3>
        </div>

        <Link href="/portfolio" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5DBB46] hover:text-[#4aa836] transition-colors duration-200 mt-1">
          Explore Project <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
        </Link>
      </div>
    </Reveal>
  );
}

export default function PortfolioGrid() {
  const [wide, ...rest] = projects;

  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-16 mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]"></span>
              Our Work
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2
              style={{
                fontSize: 'clamp(34px,3.5vw,52px)',
                color: '#111111',
                marginTop: '1rem',
                textAlign: 'center',
              }}
            >
              Recent Projects
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ fontSize: '17px', color: '#777777', marginTop: '1rem', textAlign: 'center' }}>
              Every project is a collaboration — your vision, our expertise.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          <ProjectTile p={wide} className="w-full" isWide={true} delay={0} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rest.map((p, i) => (
              <ProjectTile key={p.title} p={p} className="w-full" delay={(i + 1) * 100} />
            ))}
          </div>
        </div>

        <Reveal delay={200} className="text-center mt-16">
          <a href="/portfolio" className="link-arrow">
            View Full Portfolio <span className="arrow">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
