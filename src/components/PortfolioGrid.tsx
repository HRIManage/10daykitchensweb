"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { ease } from "@/lib/motion";

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
}: {
  p: (typeof projects)[number];
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      <Link
        href="/portfolio"
        className="group relative block h-full w-full overflow-hidden rounded-2xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.img}
          alt={p.alt}
          className="w-full h-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

        {/* Caption — always legible, lifts and sharpens on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-1.5 transition-colors duration-300 group-hover:text-white/85">
            {p.location}
          </p>
          <h3 style={{ color: 'white', fontSize: '1.2rem' }}>{p.title}</h3>
        </div>

        {/* Expand affordance — reveals on hover */}
        <span className="absolute right-4 top-4 flex h-10 w-10 -translate-y-1 items-center justify-center rounded-full bg-[#5DBB46] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
      </Link>
    </motion.div>
  );
}

export default function PortfolioGrid() {
  const [wide, ...rest] = projects;

  return (
    <section id="portfolio" className="bg-[#EEF4EB] py-24 section-pad">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="text-center mb-16 mx-auto"
      >
        <p className="eyebrow">Our Work</p>
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
        <p style={{ fontSize: '17px', color: '#777777', marginTop: '1rem', textAlign: 'center' }}>
          Every project is a collaboration — your vision, our expertise.
        </p>
      </motion.div>

      <div className="container flex flex-col gap-4">
        <ProjectTile p={wide} className="aspect-[16/9] w-full" delay={0} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((p, i) => (
            <ProjectTile key={p.title} p={p} className="aspect-square" delay={(i + 1) * 0.1} />
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <a href="/portfolio" className="link-arrow">
          View Full Portfolio <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
