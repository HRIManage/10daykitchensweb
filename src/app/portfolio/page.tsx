import type { Metadata } from "next";
import Image from "next/image";
import InteriorHero from "@/components/InteriorHero";
import PageCta from "@/components/PageCta";
import { CONTAINER, SECTION } from "@/components/layout";
import { FadeIn, SectionHeader } from "@/components/shared";
import ImageReveal from "@/components/ImageReveal";

export const metadata: Metadata = {
  title: "Our Projects | Kitchen & Bath Remodels",
  description:
    "Real kitchen and bathroom transformations across Pierce, Thurston, and Lewis Counties — most completed in 10 business days. Browse the portfolio.",
};

const projects = [
  {
    title: "Coastal Calm Kitchen",
    location: "Steilacoom, WA",
    type: "Kitchen Remodel",
    img: "/images/project-coastal-calm.jpg",
    alt: "Light blue coastal kitchen remodel in Steilacoom",
    desc: "Soft coastal blues and crisp whites transform a dated kitchen into a serene, light-filled space.",
    featured: true,
  },
  {
    title: "Modern Forest Kitchen",
    location: "Olympia, WA",
    type: "Kitchen Remodel",
    img: "/images/project-forest-kitchen.jpg",
    alt: "Forest-inspired kitchen remodel in Olympia",
    desc: "Deep, nature-inspired tones with custom cabinetry bring drama and warmth to this Olympia home.",
    featured: false,
  },
  {
    title: "Midnight Blue Kitchen",
    location: "South Sound, WA",
    type: "Custom Kitchen",
    img: "/images/project-midnight-blue.jpg",
    alt: "Midnight blue kitchen with gold hardware",
    desc: "Bold midnight blue cabinetry with gold hardware creates a striking, high-end aesthetic.",
    featured: false,
  },
  {
    title: "University Place Kitchen & Baths",
    location: "University Place, WA",
    type: "Kitchen & Bath",
    img: "/images/project-university-place.png",
    alt: "White shaker kitchen in University Place",
    desc: "A full home transformation — bright white shaker cabinets and quartz countertops throughout.",
    featured: false,
  },
  {
    title: "Heritage Woods Kitchen",
    location: "DuPont, WA",
    type: "Kitchen Remodel",
    img: "/images/project-heritage-woods.png",
    alt: "Warm wood tone kitchen remodel in DuPont",
    desc: "Warm wood tones and natural finishes celebrate the heritage of this DuPont family home.",
    featured: false,
  },
  {
    title: "Black & White Kitchen",
    location: "Chehalis, WA",
    type: "Kitchen Remodel",
    img: "/images/ba-after-chehalis.jpg",
    alt: "Black and white kitchen transformation in Chehalis",
    desc: "A dramatic before-and-after: from dated to stunning in exactly 10 business days.",
    featured: false,
  },
  {
    title: "Classic Modern Bath",
    location: "University Place, WA",
    type: "Bath Remodel",
    img: "/images/ba-after-bath.jpg",
    alt: "Modern bathroom remodel with frameless shower",
    desc: "Clean lines, bright tile work, and a frameless shower create a spa-worthy retreat.",
    featured: false,
  },
];

export default function PortfolioPage() {
  const [featured, ...rest] = projects;

  return (
    <main>
      <InteriorHero
        image="/images/Completed Modern Kitchen.png"
        imageAlt="Midnight blue custom kitchen"
        eyebrow="Our Work · Pierce, Thurston & Lewis Counties"
        title={
          <>
            Real kitchens.
            <br />
            <em>Real results, in 10 days.</em>
          </>
        }
        body="Browse recent kitchen and bath transformations from homes across the South Sound."
        cta={{ label: "Schedule Free Consultation", href: "/contact" }}
      />

      {/* Featured project — full-width editorial plate */}
      <section className={`${SECTION} bg-cream`}>
        <div className={CONTAINER}>
          <ImageReveal className="group relative overflow-hidden">
            <div className="relative aspect-[16/9] lg:aspect-[21/9]">
              <Image
                src={featured.img}
                alt={featured.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1220px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-7 sm:p-10">
                <span className="bg-paper px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                  {featured.type} · {featured.location}
                </span>
                <h2 className="font-display text-[2rem] font-semibold leading-[1.05] text-white sm:text-[2.6rem]">
                  {featured.title}
                </h2>
                <p className="max-w-xl text-[14.5px] leading-relaxed text-white/80">{featured.desc}</p>
              </div>
            </div>
          </ImageReveal>
        </div>
      </section>

      {/* Project grid */}
      <section className="bg-cream pb-14 sm:pb-16 lg:pb-20">
        <div className={CONTAINER}>
          <div className="mb-10">
            <SectionHeader label="Browse All Projects" title="The portfolio." />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <FadeIn key={p.title} delay={(i % 3) * 0.07} className="group card-hover overflow-hidden border border-line bg-paper">
                <ImageReveal delay={0.05} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-4 top-4 bg-paper/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                    {p.type}
                  </span>
                </ImageReveal>
                <div className="p-6">
                  <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-brand-dark">
                    {p.location} · 10 business days
                  </p>
                  <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft/80">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Ready to Start?"
        title="Your transformation awaits."
        body="Join hundreds of South Sound homeowners who have trusted us with their most important space."
        watermark="Projects"
      />
    </main>
  );
}
