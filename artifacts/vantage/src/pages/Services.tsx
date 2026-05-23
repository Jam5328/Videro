import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import bristolBw from "@/assets/images/bristol-bw.jpg";

const services = [
  {
    id: "service-01",
    title: "Residential Inventories",
    desc: "Comprehensive, legally robust condition reporting establishing the baseline state of a property at the commencement of a tenancy. Each report is structured to serve as admissible evidence in dispute resolution proceedings.",
    useCases: ["New tenancy commencements", "Portfolio acquisition handovers", "HMO and multi-unit properties"],
    benefits: ["DPS-compliant format and structure", "High-resolution photographic evidence", "Meter reading verification", "Room-by-room item logging"],
    pricingFrom: "From £55",
  },
  {
    id: "service-02",
    title: "360° Property Tours",
    desc: "Immersive spatial documentation capturing every angle of an environment simultaneously. Used for remote marketing, high-value condition evidence, and permanent spatial records of a property's condition.",
    useCases: ["Remote letting and marketing", "High-value condition evidence", "Pre-refurbishment baseline capture"],
    benefits: ["Undeniable spatial context", "Reduced physical viewing requirements", "Premium marketing asset", "Permanent spatial record"],
    pricingFrom: "From £95",
  },
  {
    id: "service-03",
    title: "Check-In / Check-Out Reports",
    desc: "Detailed comparative analysis against baseline inventories to definitively establish liability at the point of tenancy transition. Designed to withstand adjudicator scrutiny.",
    useCases: ["Tenancy transitions", "Dispute resolution proceedings", "Deposit deduction justification"],
    benefits: ["Clear delineation of fair wear and tear", "Immediate liability highlighting", "Rapid turnaround on request", "Structured for adjudication use"],
    pricingFrom: "From £35",
  },
  {
    id: "service-04",
    title: "Mid-Term Inspections",
    desc: "Periodic operational checks conducted during active tenancies to monitor condition, compliance, and maintenance requirements. Proactive rather than reactive.",
    useCases: ["Ongoing tenancy management", "Preventative maintenance planning", "Compliance verification"],
    benefits: ["Early issue detection before escalation", "Tenant compliance verification", "Asset condition preservation", "Structured maintenance reporting"],
    pricingFrom: "From £45",
  },
];

export default function Services() {
  // Scroll to hash section on mount (e.g. /services#service-01)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  return (
    <div className="w-full">

      {/* Header */}
      <section className="border-b border-white/10 py-24 md:py-32" style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text">Our Capabilities</p>
            <h1 className="text-4xl md:text-6xl font-serif text-white">Services</h1>
            <p className="text-lg text-white/55 font-light max-w-2xl leading-relaxed">
              Structured property documentation services designed to support landlords, letting agents and accommodation operators throughout the full tenancy lifecycle.
            </p>
            <p className="text-base text-white/45 font-light max-w-2xl leading-relaxed">
              From inventories and 360 walkthroughs to inspections, check-ins and check-outs, each service is built around clear reporting, reliable visual evidence and organised digital delivery.
            </p>
            <div className="pt-2">
              <a
                href="/pricing"
                className="inline-flex h-10 items-center justify-center gradient-bg text-white px-7 text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
              >
                View Pricing
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service list */}
      <section className="py-16" style={{ backgroundColor: "#16163F" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-0">
            {services.map((srv, i) => (
              <motion.div
                id={srv.id}
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-12 gap-8 py-16 border-b border-white/10 last:border-0 items-start"
                style={{ scrollMarginTop: "64px" }}
              >
                <div className="md:col-span-1">
                  <span className="text-2xl font-serif text-white/15">0{i + 1}</span>
                </div>
                <div className="md:col-span-4 space-y-4">
                  <h2 className="text-2xl font-serif text-white leading-snug">{srv.title}</h2>
                  <p className="text-sm text-white/55 font-light leading-relaxed">{srv.desc}</p>
                  <div className="flex items-center gap-4 pt-1">
                    <span className="text-xs text-white/35 font-light">{srv.pricingFrom}</span>
                    <a
                      href="/pricing"
                      className="text-xs gradient-text font-medium hover:opacity-80 transition-opacity underline underline-offset-2"
                    >
                      See full pricing →
                    </a>
                  </div>
                </div>
                <div className="md:col-span-7 grid sm:grid-cols-2 gap-8 md:pl-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-medium uppercase tracking-widest text-white/35 border-b border-white/10 pb-3">
                      Use Cases
                    </h4>
                    <ul className="space-y-3">
                      {srv.useCases.map((uc, j) => (
                        <li key={j} className="flex gap-3 text-sm text-white/55 font-light">
                          <span className="gradient-text shrink-0 font-medium">—</span>
                          <span>{uc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-medium uppercase tracking-widest text-white/35 border-b border-white/10 pb-3">
                      Benefits
                    </h4>
                    <ul className="space-y-3">
                      {srv.benefits.map((b, j) => (
                        <li key={j} className="flex gap-3 text-sm text-white/55 font-light">
                          <span className="gradient-text shrink-0 font-medium">—</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA band */}
      <section className="py-14 border-y border-white/10" style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text">Pricing</p>
            <p className="text-white/70 text-sm font-light">Fixed rates by property size. Agency & portfolio packages available.</p>
          </div>
          <a
            href="/pricing"
            className="shrink-0 inline-flex h-11 items-center justify-center gradient-bg text-white px-8 text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
          >
            Explore Pricing
          </a>
        </div>
      </section>

      {/* CTA — Dispute prevention */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <img
          src={bristolBw}
          alt="Bristol property"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,42,0.96), rgba(22,22,63,0.75), rgba(13,13,42,0.3))" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text">Why it matters</p>
          <h2 className="text-3xl md:text-4xl font-serif text-white leading-snug">
            Most deposit disputes are lost before they begin
          </h2>
          <p className="max-w-xl mx-auto text-base text-white/60 font-light leading-relaxed">
            Without a detailed, timestamped inventory and photographic baseline, landlords and agents have almost no recourse at adjudication. Videro documentation is built specifically to hold up under scrutiny — so when a dispute arises, the evidence is already there.
          </p>
          <div className="flex justify-center">
            <a
              href="/#contact"
              className="inline-flex h-11 items-center justify-center gradient-bg text-white px-8 text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
