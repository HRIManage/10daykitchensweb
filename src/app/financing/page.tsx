const options = [
  {
    title: "Home Equity Line of Credit (HELOC)",
    desc: "Borrow against the equity in your home with a flexible line of credit. Draw funds as needed during the draw period (typically 10 years), paying interest only on what you use. Popular for their flexibility and often lower interest rates.",
  },
  {
    title: "Cash-Out Refinance",
    desc: "Refinance your existing mortgage for more than you currently owe and take the difference in cash. Tap into your home's equity to fund your remodel — advantageous if you have significant equity and can secure a favorable rate.",
  },
  {
    title: "Renovation or Construction Loan",
    desc: "Designed specifically for home improvement. Funds are based on the future value of your home after renovation, so you don't need substantial existing equity. Terms may be stricter, so compare carefully.",
  },
  {
    title: "Alternative Options",
    desc: "Personal loans (unsecured, no home equity required), promotional 0% APR credit cards for smaller updates, retirement savings, or private money loans. We recommend consulting a financial advisor to find what's right for your situation.",
  },
];

export default function FinancingPage() {
  return (
    <main>
      <section className="bg-[#1C1C1C] pt-[90px] py-24 px-16">
        <span className="eyebrow text-[#5DBB46]/70 mb-4 block">Make It Happen</span>
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
          Financing<br />Your Remodel
        </h1>
        <p className="text-white/60 max-w-xl mt-6">
          The home remodel of your dreams is a significant investment. With the right financing options, it can be more affordable than you think.
        </p>
      </section>

      <section className="bg-[#5DBB46] py-12 px-16">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-white/80 text-sm uppercase tracking-widest">Preferred Lender</p>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "36px",
                color: "white",
                fontWeight: 500,
              }}
            >
              GreenSky
            </h2>
            <p className="text-white/70 text-sm mt-2">866-936-0602</p>
          </div>
          <a
            href="tel:8669360602"
            className="bg-white text-[#111111] rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#EEF4EB] transition-all"
          >
            Call GreenSky
          </a>
        </div>
      </section>

      <section className="bg-[#F7FAF5] py-24 px-16">
        <div className="text-center">
          <span className="eyebrow mb-4 block">Financing Options</span>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "48px",
              color: "#111111",
              fontWeight: 500,
            }}
          >
            Home Renovation<br />Financing
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
          {options.map((opt) => (
            <div
              key={opt.title}
              className="bg-white rounded-2xl p-8 border border-[rgba(17,17,17,0.08)]"
            >
              <div className="w-1 h-12 bg-[#5DBB46] rounded-full mb-6" />
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "22px",
                  color: "#111111",
                  fontWeight: 500,
                  marginBottom: "0.75rem",
                }}
              >
                {opt.title}
              </h3>
              <p className="text-[#777777] text-sm leading-relaxed">{opt.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 px-16 border-t border-[rgba(17,17,17,0.08)]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#aaa] italic leading-relaxed mb-12">
            Financial Disclaimer: The information on this page is for general informational purposes only and should not be considered financial advice. Please consult with a qualified financial advisor before making any financial decisions. 10 Day Kitchens does not endorse any specific financial product or lender other than our preferred partner.
          </p>
          <div className="text-center">
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "36px",
                color: "#111111",
                fontWeight: 500,
              }}
            >
              Ready to Begin?
            </h3>
            <p className="text-[#777777] mt-4 text-lg max-w-xl mx-auto">
              Schedule a free consultation and we&rsquo;ll walk you through your options and help you find the right path forward.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-block bg-[#5DBB46] text-white rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all"
            >
              Schedule Free Consultation
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
