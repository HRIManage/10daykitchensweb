import HoneyBookWidget from "@/components/HoneyBookWidget";
import Reveal from "@/components/motion/Reveal";

const contactDetails = [
  { label: "Visit Our Showroom", value: "8695 Martin Way E STE 101\nLacey, WA 98516" },
  { label: "Call or Text", value: "360-557-3444" },
  { label: "Email", value: "office@10daykitchens.com" },
  { label: "Licensed & Insured", value: "LIC #10DAYDK757O5 · Family Owned · 5-Year Warranty" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#F7FAF5] py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] container">
        <Reveal
          className="flex flex-col justify-center"
          style={{ paddingLeft: "var(--pad)", paddingRight: "2.5rem" }}
        >
          <span className="eyebrow">Contact</span>
          <h2
            style={{
              fontSize: "clamp(32px,3vw,52px)",
              color: "#111111",
              marginTop: "1rem",
              lineHeight: 1.1,
            }}
          >
            Let&rsquo;s Talk About
            <br />
            Your Project.
          </h2>
          <p className="mt-6 max-w-sm" style={{ fontSize: "17px", color: "#777777" }}>
            Ready to update your space? Reach out to schedule your free consultation.
          </p>
          <div className="mt-10 flex flex-col gap-6">
            {contactDetails.map((item) => (
              <div key={item.label}>
                <p className="eyebrow text-[#777777] mb-1">{item.label}</p>
                <p
                  className="text-[#111111] text-base font-medium"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} style={{ paddingRight: "var(--pad)", paddingLeft: "1.5rem", paddingTop: "2rem", paddingBottom: "2rem" }}>
          <div className="bg-white rounded-3xl shadow-[0_2px_40px_rgba(0,0,0,0.06)] p-12">
            <h3
              style={{
                fontSize: "1.75rem",
                color: "#111111",
                marginBottom: "0.5rem",
              }}
            >
              Start Your Project
            </h3>
            <p style={{ fontSize: "14px", color: "#777777" }}>We&rsquo;ll be in touch within 48 hours.</p>

            <HoneyBookWidget className="mt-8" />
            <p className="text-center text-xs text-[#aaa] mt-3">
              Free Consultation · No Obligation · Response within 48hrs
            </p>

            <p className="text-xs text-[#aaa] italic text-center mt-6">
              Serving Lacey, Olympia, Tacoma, Chehalis and communities throughout Pierce &amp; Thurston Counties.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
