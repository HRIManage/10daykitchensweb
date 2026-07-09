"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCHEDULE_URL = "https://10daykitchens.hbportal.co/public/69f4fca66910ddf27daf62b7";

const categories = [
  {
    id: "cabinetry",
    eyebrow: "01 — Cabinetry",
    title: "Built to Last",
    titleItalic: "a Lifetime.",
    intro: "The cabinet is the backbone of any kitchen or bath design. We carry four trusted cabinet lines, each at a different price point and lead time, so every project has an option that fits without compromise.",
    body: "All of our cabinet lines ship with plywood box construction, soft-close hinges and slides, and dovetail drawer boxes as standard. Door styles range from classic five-piece shaker to flat-panel slab to raised panel traditional, in hundreds of painted and stained finishes.",
    image: "https://showplacecabinetry.com/wp-content/uploads/2025/12/New-England-Transitional-with-Beachy-Island-20.jpg",
    imageAlt: "Showplace transitional cabinetry",
    brands: [
      { label: "KCD Cabinetry", href: "https://www.kcdus.com/", note: "Stock to semi-custom" },
      { label: "Lectus Cabinetry", href: "https://www.lectuscabinets.com/", note: "Semi-custom, fast lead times" },
      { label: "Merit Cabinetry", href: "https://www.merit-kitchens.com/custom-kitchen-cabinetry/", note: "Custom & fully custom" },
      { label: "Showplace Cabinetry", href: "https://showplacecabinetry.com/", note: "Premium custom" },
    ],
    pills: ["Shaker", "Slab", "Raised Panel", "Inset", "Full Overlay", "Painted", "Stained", "Thermofoil"],
    specs: [
      { label: "Box Construction", val: "3/4″ plywood or MDF" },
      { label: "Hardware", val: "Soft-close standard on all lines" },
      { label: "Door Styles", val: "200+ across all four lines" },
      { label: "Finishes", val: "40+ painted & stained" },
      { label: "Lead Time", val: "3–6 weeks depending on line" },
      { label: "Modifications", val: "Custom sizing available" },
    ],
  },
  {
    id: "countertops",
    eyebrow: "02 — Countertops",
    title: "Surfaces You Live On,",
    titleItalic: "Built for Every Day.",
    intro: "The countertop is the surface you touch every day. We carry the full range, from engineered quartz that performs without maintenance to natural stone with a character that only improves with time.",
    body: "We stock samples from five countertop brands in the showroom including quartz, marble, quartzite, granite, and butcher block. Every sample is available in person so you can see how the material looks in real light before committing. We also offer a measure-and-quote service for all slab materials.",
    image: "https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/b662f8dd-f7f8-490d-8cce-bbb2eefbc8b8/whitendale.webp",
    imageAlt: "Quartz slab countertop",
    brands: [
      { label: "MSI Surfaces", href: "https://www.msisurfaces.com/", note: "Quartz, marble, quartzite, granite" },
      { label: "Cambria", href: "https://www.cambriausa.com/", note: "American-made quartz, lifetime warranty" },
      { label: "Caesarstone", href: "https://www.caesarstoneus.com", note: "Premium quartz, 40+ colors" },
      { label: "Vicostone", href: "https://us.vicostone.com/", note: "Engineered quartz, natural aesthetics" },
      { label: "Jaaron Wood Countertops", href: "https://www.jaaronwoodcountertops.com/", note: "Custom butcher block & hardwood" },
    ],
    pills: ["Quartz", "Marble", "Quartzite", "Granite", "Butcher Block", "Waterfall Edge", "Mitered Edge"],
    specs: [
      { label: "Materials", val: "Quartz, marble, quartzite, granite, butcher block" },
      { label: "Edges", val: "Eased, beveled, mitered, waterfall, ogee" },
      { label: "Samples", val: "In-showroom. View in real light." },
      { label: "Quartz Lead Time", val: "1–2 weeks in-stock slabs" },
      { label: "Natural Stone", val: "2–3 weeks, subject to slab availability" },
      { label: "Butcher Block", val: "Custom-cut, typically 1–3 weeks" },
    ],
  },
  {
    id: "tile",
    eyebrow: "03 — Tile & Stone",
    title: "Texture, Pattern,",
    titleItalic: "Character.",
    intro: "Tile is the layer of your design that adds the most visual texture and personality. From handmade Zellige to large-format stone slab, our tile library covers every application: backsplash, floor, shower, and feature wall.",
    body: "We partner with MSI Surfaces, one of the most comprehensive tile and stone distributors in North America. Their catalog covers glazed ceramic, porcelain, natural stone, mosaic, and specialty formats. Samples of our most-specified collections are available to view in the showroom.",
    image: "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/0c09e194-781a-4b95-8986-697488e320d0/ChatGPT+Image+Apr+3%2C+2026%2C+12_06_18+PM.png?content-type=image%2Fpng",
    imageAlt: "Tile and stone selection",
    brands: [
      { label: "MSI Surfaces", href: "https://www.msisurfaces.com/", note: "Ceramic, porcelain, natural stone, mosaic" },
    ],
    pills: ["Zellige", "Subway", "Large Format", "Mosaic", "Geometric", "Natural Stone", "Porcelain Slab", "Handmade"],
    specs: [
      { label: "Categories", val: "Backsplash, floor, wall, shower surround, mosaic" },
      { label: "Formats", val: "2×2\" up to 24×48\" and large slab" },
      { label: "Materials", val: "Ceramic, porcelain, natural stone, glass" },
      { label: "In-Showroom Samples", val: "Key collections on display" },
      { label: "In-Stock Lead Time", val: "Typically 1–2 weeks" },
      { label: "Special Order", val: "2–4 weeks; minimums may apply" },
    ],
  },
  {
    id: "hardware",
    eyebrow: "04 — Fixtures & Hardware",
    title: "The Details That",
    titleItalic: "Define a Space.",
    intro: "Hardware is what the hand touches every time someone uses the space, and the easiest way to shift a design from good to exceptional. We carry the full Top Knobs catalog and Jeffrey Alexander's decorative hardware collection, giving you thousands of options across every finish and style.",
    body: "Our showroom has a dedicated hardware display wall showing pulls, knobs, and faucets across every available finish, side by side, so you can see exactly how each reads against your chosen cabinetry and stone. We do not upsell. We help you find the right piece for the right project.",
    image: "https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/74c2935e-ca5e-46b2-af5f-408e8b5c2837/43.png?content-type=image%2Fpng",
    imageAlt: "Cabinet hardware and fixtures",
    brands: [
      { label: "Top Knobs", href: "https://www.topknobs.com/", note: "3,000+ SKUs, 15+ finishes" },
      { label: "Jeffrey Alexander", href: "https://jeffrey-alexander-hardware.com/", note: "Decorative hardware & bath accessories" },
    ],
    pills: ["Brushed Gold", "Matte Black", "Polished Chrome", "Satin Nickel", "Unlacquered Brass", "Oil-Rubbed Bronze", "Pewter"],
    specs: [
      { label: "Brands", val: "Top Knobs & Jeffrey Alexander" },
      { label: "SKUs Available", val: "3,000+" },
      { label: "Finishes", val: "15+ including specialty metals" },
      { label: "Categories", val: "Pulls, knobs, bar pulls, cup pulls, faucets" },
      { label: "Showroom Display", val: "Full finish wall, compare side by side" },
      { label: "Lead Time", val: "In-stock to 1–2 weeks" },
    ],
  },
  {
    id: "bath",
    eyebrow: "05 — Shower & Bath",
    title: "Your Personal Retreat,",
    titleItalic: "Designed Right.",
    intro: "A well-designed bathroom functions as both a practical space and a private retreat. We design bath spaces from the ground up: shower layout, tile selection, vanity, plumbing fixtures, and every finish in between.",
    body: "Our bath design process follows the same four-step model as kitchens. We create the layout, specify every material, and supply the full package. Shower systems, soaking tubs, vanities, tile surrounds. All of it coordinated by our team so your contractor receives one complete, ready-to-install spec.",
    image: "https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/9e6294ff-bc6d-4a8e-a04d-11ac6bd6aa6c/Dark+Marble+Opulence.png?format=500w",
    imageAlt: "Dark marble bath design",
    brands: [],
    pills: ["Shower Systems", "Freestanding Tubs", "Vanities", "Surround Tile", "Heated Floors", "Frameless Glass"],
    specs: [
      { label: "Design Included", val: "Layout, elevations, full spec" },
      { label: "Products", val: "Shower systems, tubs, vanities, fixtures" },
      { label: "Tile Surrounds", val: "Full MSI tile selection available" },
      { label: "Heated Floors", val: "Electric in-floor heating available" },
      { label: "Lead Time", val: "Varies by product; typically 2–6 weeks" },
      { label: "Coordination", val: "Delivery scheduled with your contractor" },
    ],
  },
];

const navLinks = [
  { href: "#cabinetry", label: "Cabinetry" },
  { href: "#countertops", label: "Countertops" },
  { href: "#tile", label: "Tile & Stone" },
  { href: "#hardware", label: "Hardware" },
  { href: "#bath", label: "Shower & Bath" },
];

export default function CollectionsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(".h-item, .coll-item, .coll-img", { opacity: 1, y: 0, clipPath: "none", scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".h-item"),
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.13, duration: 1, ease: "power3.out", delay: 0.3 }
        );
      }
      if (sectionsRef.current) {
        sectionsRef.current.querySelectorAll(".collection-block").forEach((block) => {
          const img = block.querySelector(".coll-img");
          const items = block.querySelectorAll(".coll-item");
          if (img) {
            gsap.fromTo(img,
              { clipPath: "inset(100% 0 0 0)", scale: 1.08 },
              {
                clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.3, ease: "power4.inOut",
                scrollTrigger: { trigger: block, start: "top 78%" },
              }
            );
          }
          if (items.length) {
            gsap.fromTo(items,
              { y: 28, opacity: 0 },
              {
                y: 0, opacity: 1, stagger: 0.09, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: block, start: "top 78%" }, delay: 0.2,
              }
            );
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-paper pt-[158px] sm:pt-[176px]">
        <div className="site-container grid min-h-[610px] gap-10 pb-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pb-18">
          <div className="max-w-2xl" ref={heroRef}>
            <span className="eyebrow h-item mb-4 block text-[0.82rem] font-bold" style={{ opacity: 0 }}>
              Materials &amp; Brands
            </span>
            <h1
              className="h-item max-w-3xl text-[clamp(2.55rem,4.7vw,4.75rem)] leading-[1.02] text-ink"
              style={{ opacity: 0 }}
            >
              Our
              <br />
              <em className="font-medium italic text-brand-dark">Collections</em>
            </h1>
            <p className="h-item mt-6 max-w-xl text-[1rem] leading-8 text-ink-soft" style={{ opacity: 0 }}>
              Five material categories. Brands we believe in. Every sample available before you decide. This is what we carry and why we carry it.
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-[1.18/1] overflow-hidden border border-line bg-white shadow-[0_26px_80px_rgba(43,39,35,0.12)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/b662f8dd-f7f8-490d-8cce-bbb2eefbc8b8/whitendale.webp"
                alt="Quartz countertop collection sample"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Category nav ── */}
      <nav className="coll-nav-bar" aria-label="Material categories">
        <div className="coll-nav-inner">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className="coll-nav-link">{label}</a>
          ))}
          <span className="coll-nav-count">5 categories</span>
        </div>
      </nav>

      {/* ── Category blocks ── */}
      <div ref={sectionsRef}>
        {categories.map(({ id, eyebrow, title, titleItalic, intro, body, image, imageAlt, brands, pills, specs }, index) => (
          <section
            key={id}
            id={id}
            style={{
              padding: "clamp(72px, 10vw, 120px) var(--pad)",
              background: "var(--bg)",
              borderBottom: "1px solid var(--gold-border)",
            }}
          >
            <div
              className={`collection-block${index % 2 !== 0 ? " reverse" : ""}`}
              style={{ maxWidth: "var(--max)", margin: "0 auto" }}
            >
              {/* Image */}
              <div className="coll-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={imageAlt} loading="lazy" />
              </div>

              {/* Content */}
              <div>
                <span className="eyebrow coll-item" style={{ display: "block", marginBottom: "16px", opacity: 0 }}>{eyebrow}</span>
                <h2 className="coll-item" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 500, marginBottom: "20px", lineHeight: 1.08, opacity: 0 }}>
                  {title}<br />
                  <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>{titleItalic}</em>
                </h2>

                <p className="coll-item" style={{ color: "var(--text)", fontSize: "18px", lineHeight: 1.75, fontWeight: 400, margin: "0 0 16px", opacity: 0 }}>
                  {intro}
                </p>
                <p className="coll-item" style={{ color: "var(--text-dim)", fontSize: "16px", lineHeight: 1.8, fontWeight: 300, margin: "0 0 24px", opacity: 0 }}>
                  {body}
                </p>

                {/* Material pills */}
                <div className="coll-item pill-row" style={{ marginBottom: "4px", opacity: 0 }}>
                  {pills.map((p) => <span key={p} className="pill">{p}</span>)}
                </div>

                {/* Spec table */}
                <div className="coll-item coll-spec-grid" style={{ opacity: 0 }}>
                  {specs.map(({ label, val }) => (
                    <div key={label} className="coll-spec-cell">
                      <span className="coll-spec-label">{label}</span>
                      <span className="coll-spec-val">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Brand links */}
                {brands.length > 0 && (
                  <div className="coll-item" style={{ opacity: 0, marginBottom: "28px" }}>
                    <p style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "12px", fontWeight: 500 }}>
                      Browse Their Websites
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {brands.map(({ label, href, note }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="coll-brand-link">
                          <span className="coll-brand-link-left">
                            <span className="coll-brand-link-name">{label}</span>
                          </span>
                          <span className="coll-brand-link-right">
                            <span className="coll-brand-link-note">{note}</span>
                            <span className="coll-brand-link-arrow">↗</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="coll-item" style={{ opacity: 0 }}>
                  <a className="link-arrow" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
                    Schedule Free Consultation <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── Why we carry what we carry ── */}
      <section style={{ background: "var(--bg)", padding: "clamp(80px, 10vw, 128px) var(--pad)", borderBottom: "1px solid var(--gold-border)" }}>
        <div
          className="coll-why-grid"
          style={{ maxWidth: "var(--max)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px, 8vw, 100px)", alignItems: "center" }}
        >
          <div>
            <div className="section-eyebrow-row">
              <div className="section-rule" />
              <span className="eyebrow">Our Standard</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 500, marginBottom: "24px" }}>
              We Carry What<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>We Believe In.</em>
            </h2>
            <p style={{ color: "var(--text-dim)", fontSize: "17px", lineHeight: 1.8, fontWeight: 300, margin: "0 0 20px" }}>
              We do not carry every brand available. We carry the ones we would specify for our own homes: brands with consistent quality, reliable lead times, and product that holds up over years of daily use.
            </p>
            <p style={{ color: "var(--text-dim)", fontSize: "17px", lineHeight: 1.8, fontWeight: 300, margin: "0 0 36px" }}>
              Every brand in our showroom has been vetted for quality, support, and value. When we recommend something, it is because we have seen it perform. Not because of the margin.
            </p>
            <a className="btn btn-solid" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              Schedule Free Consultation
            </a>
          </div>
          <div className="coll-lift-card" style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--gold-border)", border: "1px solid var(--gold-border)" }}>
            {[
              { title: "Quality verified", body: "Every product in our catalog has been tested or installed by our team before it earns a spot in the showroom." },
              { title: "Samples in person", body: "Nothing is sold sight-unseen. Every material category has physical samples available for you to see in real light." },
              { title: "Honest recommendations", body: "We match you to the right product for your project and budget. Not the highest-margin option." },
              { title: "Backed by lead-time data", body: "We track real delivery times so your project schedule is built on reliable information, not optimistic estimates." },
            ].map(({ title, body }) => (
              <div key={title} style={{ background: "var(--bg)", padding: "28px 32px" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 500, marginBottom: "8px" }}>{title}</h4>
                <p style={{ color: "var(--text-dim)", fontSize: "14px", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="page-cta-section">
        <div className="page-cta-watermark" aria-hidden="true">Materials</div>
        <div className="page-cta-content">
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: 20, color: "rgba(93,187,70,0.75)" }}>Come See It in Person</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", color: "var(--white)", margin: "0 0 28px" }}>
              Touch the Materials<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Before You Decide.</em>
            </h2>
            <p style={{ color: "var(--white-dim)", fontSize: 18, lineHeight: 1.75, fontWeight: 400, maxWidth: 460, margin: 0 }}>
              Nothing replaces seeing materials in real light. Schedule a free consultation and explore every collection with our team by your side.
            </p>
          </div>
          <div className="page-cta-btn-card">
            <a className="btn btn-solid pulse-shimmer-btn" href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer">
              Book a Free Consultation
            </a>
            <a className="btn btn-solid" href="/contact">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
