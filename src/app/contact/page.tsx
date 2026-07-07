import HoneyBookWidget from "@/components/HoneyBookWidget";

const contactDetails = [
  { label: "Visit Our Showroom", value: "8695 Martin Way E STE 101\nLacey, WA 98516" },
  { label: "Call or Text", value: "(360) 557-3444" },
  { label: "Email", value: "office@10daykitchens.com" },
  { label: "Hours", value: "Monday – Friday: 8am – 5pm\nSaturday: By Appointment" },
  { label: "Licensed & Insured", value: "LIC #10DAYDK757O5 · Family Owned · 5-Year Warranty" },
];

export default function ContactPage() {
  return (
    <main>
      <section className="bg-[#1C1C1C] pt-[90px] py-20 px-16">
        <span className="eyebrow text-[#5DBB46]/70 mb-4 block">Let&rsquo;s Get Started</span>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "72px",
            color: "white",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Contact Us
        </h1>
        <p className="text-white/60 max-w-lg mt-6">
          Ready to transform your kitchen or bathroom? Reach out and we&rsquo;ll get back to you within 48 hours.
        </p>
      </section>

      <section className="bg-[#F7FAF5] py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] max-w-screen-xl mx-auto">
          <div className="pl-16 pr-10 flex flex-col justify-start py-8">
            <span className="eyebrow">Get In Touch</span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "42px",
                color: "#111111",
                fontWeight: 500,
                marginTop: "0.5rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
              }}
            >
              Let&rsquo;s Talk About<br />Your Project.
            </h2>
            <p
              className="text-[#777777] mt-6 max-w-sm leading-relaxed"
              style={{ fontSize: "17px" }}
            >
              Whether you have a quick question or you&rsquo;re ready to schedule, we&rsquo;re here to help every step of the way.
            </p>
            <div className="mt-10 flex flex-col gap-6">
              {contactDetails.map((item) => (
                <div key={item.label}>
                  <p className="eyebrow text-[#5DBB46]/70 mb-1">{item.label}</p>
                  <p
                    className="text-[#111111] text-base font-medium"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-5 bg-white rounded-xl border border-[rgba(17,17,17,0.08)]">
              <p className="text-xs text-[#777777] italic">
                Serving Lacey, Olympia, Tacoma, Chehalis and communities throughout Pierce, Thurston &amp; Lewis Counties.
              </p>
            </div>
          </div>

          <div className="pr-16 pl-4 py-8">
            <div className="bg-white rounded-3xl shadow-[0_2px_40px_rgba(0,0,0,0.06)] p-12">
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "28px",
                  color: "#111111",
                  fontWeight: 500,
                }}
              >
                Start Your Project
              </h3>
              <p className="text-sm text-[#777777] mt-1">
                We&rsquo;ll be in touch within 48 hours.
              </p>
              <HoneyBookWidget className="mt-8" />
              <p className="text-center text-xs text-[#aaa] mt-3">
                Free Consultation &middot; No Obligation &middot; Response within 48hrs
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EEF4EB] py-16 px-16 text-center">
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "32px",
            color: "#111111",
            fontWeight: 500,
          }}
        >
          Find Our Showroom
        </h2>
        <p className="text-[#777777] text-sm mt-2">
          8695 Martin Way E STE 101, Lacey, WA 98516
        </p>
        <div className="mt-8 rounded-2xl overflow-hidden bg-[#ddd] h-64 max-w-4xl mx-auto flex items-center justify-center">
          <p className="text-[#777777] text-sm">Map &middot; 8695 Martin Way E STE 101, Lacey, WA 98516</p>
        </div>
      </section>
    </main>
  );
}
