import { motion } from "framer-motion";

const clientCategories = [
  {
    title: "High-Street Lettings Agencies",
    body: "We deliver the exact legal standard of evidence your compliance teams require, fully aligned with the standards of the Deposit Protection Service (DPS), Tenancy Deposit Scheme (TDS), mydeposits, The Property Redress Scheme (PRS), and The Property Ombudsman (TPO).",
  },
  {
    title: "Independent Landlords",
    body: "We safeguard your high-value investments in Bristol and the South West with unemotional, legally robust documentation that stands up to scrutiny during tenant transitions and deposit disputes.",
  },
  {
    title: "Short-Let & Airbnb Hosts",
    body: "We provide rapid, detailed condition tracking tailored to high-turnover serviced accommodation (SA), ensuring guest damage is captured instantly before your next check-in.",
  },
];

export default function About() {
  return (
    <div className="w-full">

      {/* Hero */}
      <section className="border-b border-white/10 py-24 md:py-32" style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-5 max-w-3xl"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text">About Us</p>
            <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              Built on operational experience. Not assumptions.
            </h1>
            <p className="text-lg text-white/55 font-light leading-relaxed">
              Videro was founded on years of direct, hands-on operational experience within the UK property sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro narrative */}
      <section className="py-20 md:py-24 border-b border-white/10" style={{ backgroundColor: "#16163F" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8">
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xs font-medium uppercase tracking-widest gradient-text pt-1">The Story</h2>
            </motion.div>
            <motion.div
              className="md:col-span-9 space-y-5 text-sm text-white/60 font-light leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p>
                After managing thousands of tenancies, handling maintenance, and resolving complex landlord-tenant disputes, I recognised a critical market flaw. Too many operators, landlords, and agents were losing costly disputes simply due to poor, vague, or absent property documentation.
              </p>
              <p>
                Videro was built to bridge this gap — replacing creative flair with absolute operational rigour right across the documentation process. Every report, every image, every record is produced with one goal in mind: to protect your asset and your position when it matters most.
              </p>
              <p>
                We provide a systems-driven methodology that prioritises bulletproof processes over personality. Our reporting is entirely factual, risk-aware, and built defensively to protect both your asset and your operation. Whether you need meticulous check-in reports or forensic mid-term inspections, we deliver an autonomous, highly professional service that requires zero oversight from you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 md:py-24 border-b border-white/10" style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8">
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xs font-medium uppercase tracking-widest gradient-text pt-1">Methodology</h2>
            </motion.div>
            <div className="md:col-span-9 grid sm:grid-cols-2 gap-8 md:gap-10">
              {[
                { label: "Systems-Driven", desc: "Every report follows a structured, repeatable process — not improvised at the point of visit. Consistency is non-negotiable." },
                { label: "Factual Reporting", desc: "No subjective language, no ambiguity. Conditions are documented as observed — clearly, precisely, and defensibly." },
                { label: "Risk-Aware", desc: "Every record is built with downstream use in mind. Dispute resolution, adjudication, and compliance are baked into the process." },
                { label: "Autonomous Delivery", desc: "A fully independent service that requires no hand-holding. Minimal coordination needed — we handle the rest." },
              ].map(({ label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="space-y-3"
                >
                  <div className="h-px w-8 gradient-bg" />
                  <h3 className="text-sm font-medium text-white tracking-wide">{label}</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client categories */}
      <section className="py-20 md:py-24 border-b border-white/10" style={{ backgroundColor: "#16163F" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text mb-4">Who We Protect</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Our deep expertise across the UK housing, compliance, and short-let markets.</h2>
          </motion.div>

          <div className="space-y-0">
            {clientCategories.map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="grid md:grid-cols-12 gap-8 py-12 border-b border-white/10 last:border-0"
              >
                <div className="md:col-span-4">
                  <h3 className="text-base font-serif text-white leading-snug">{title}</h3>
                </div>
                <div className="md:col-span-8">
                  <p className="text-sm text-white/55 font-light leading-relaxed">{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-6"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text">Get Started</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white leading-snug">
              Ready to Protect Your Property Asset?
            </h2>
            <p className="text-sm text-white/55 font-light leading-relaxed max-w-xl">
              Do not leave your compliance and asset protection to chance. Get in touch today to secure flawless, legally robust property documentation for your portfolio in Bristol and the surrounding areas.
            </p>
            <div className="pt-2">
              <a
                href="/#contact"
                className="inline-flex h-11 items-center justify-center gradient-bg text-white px-8 text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
