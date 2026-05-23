import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import bristolAerial from "@/assets/images/bristol-aerial.jpg";
import vantageIcon from "@/assets/images/vantage-icon.png";
import LeadForm from "@/components/forms/LeadForm";

const platformLogos = [
  { name: "airbnb", style: "font-sans font-semibold tracking-tight text-lg" },
  { name: "Rightmove", style: "font-sans font-bold tracking-tight text-lg" },
  { name: "zoopla", style: "font-sans font-bold tracking-tight text-lg" },
  { name: "Booking.com", style: "font-sans font-bold tracking-tight text-base" },
  { name: "OpenRent", style: "font-sans font-semibold tracking-wide text-base" },
  { name: "VRBO", style: "font-sans font-black tracking-widest text-base" },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroH = heroRef.current.offsetHeight;
      const progress = Math.min(window.scrollY / (heroH * 0.65), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">

      {/* Hero */}
      <section ref={heroRef} className="relative h-dvh flex items-start justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={bristolAerial}
            alt="Bristol residential properties"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D2A]/70 via-[#16163F]/30 to-transparent" />
          <div
            className="absolute inset-0 bg-[#0D0D2A] pointer-events-none transition-none"
            style={{ opacity: scrollProgress * 0.65 }}
          />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-20 sm:pt-24 md:pt-28 text-center space-y-5 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center gap-3 sm:gap-5"
          >
            <img
              src={vantageIcon}
              alt="Videro"
              className="w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 object-contain"
            />
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif text-white tracking-[0.12em] uppercase leading-none">
              VIDERO
            </h1>
            <p className="text-xs sm:text-base md:text-lg text-white/60 font-light tracking-[0.2em] uppercase">
              Every detail, professionally captured
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4"
          >
            <a
              href="#contact"
              className="inline-flex h-11 sm:h-12 items-center justify-center gradient-bg text-white px-8 sm:px-10 text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
              data-testid="link-book-call"
            >
              Enquire
            </a>
            <Link
              href="/services"
              className="inline-flex h-11 sm:h-12 items-center justify-center border border-white/40 text-white px-8 sm:px-10 text-sm font-medium tracking-wide transition-colors hover:border-white/70 hover:bg-white/5"
              data-testid="link-services"
            >
              View Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/10" style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x divide-white/10">
            {[
              {
                stat: "6+",
                unit: "Years",
                label: "Experience in property management, including lettings agency workflows, tenancy lifecycle oversight, and landlord reporting.",
              },
              {
                stat: "100%",
                unit: "Audit-ready",
                label: "Structured inventory and inspection reporting designed to support dispute resolution processes and align with DPS and Property Redress Scheme standards.",
              },
              {
                stat: "48h",
                unit: "Turnaround",
                label: "Reliable delivery of structured inventories, inspections and 360 documentation within 48 hours, depending on property size and scope.",
              },
            ].map(({ stat, unit, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="md:px-12 first:pl-0 last:pr-0 space-y-3"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-serif gradient-text">{stat}</span>
                  <span className="text-xs font-medium uppercase tracking-widest text-white/40">{unit}</span>
                </div>
                <p className="text-sm text-white/50 font-light leading-relaxed">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms — scrolling marquee */}
      <section className="py-10 border-b border-white/10 overflow-hidden" style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6 mb-6">
          <p className="text-xs font-light uppercase tracking-[0.3em] text-white/30 text-center">
            Used by clients operating across
          </p>
        </div>
        <div className="marquee-track group">
          <div className="marquee-content group-hover:[animation-play-state:paused]">
            {[...platformLogos, ...platformLogos].map(({ name, style }, i) => (
              <span
                key={i}
                className={`${style} text-white/22 select-none shrink-0 px-10`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-24" style={{ backgroundColor: "#16163F" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text mb-4">Why Videro</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Problems We Solve</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {[
              {
                heading: "For Letting Agencies",
                items: [
                  "Inconsistent inventory standards across properties, branches, and contractors, leading to unreliable reporting quality.",
                  "Weak or incomplete documentation that fails to hold up during deposit disputes or claim processes.",
                  "Time-heavy check-in and check-out workflows that are inconsistent across staff and locations.",
                  "Lack of a unified reporting structure across externally produced inventories and inspections.",
                  "Variation in report quality between contractors, creating compliance and liability risk.",
                ],
              },
              {
                heading: "For Landlords & Serviced Accommodation Operators",
                items: [
                  "Disputes arising from missing or incomplete baseline condition records at the start of tenancies.",
                  "Limited visibility of property condition between inspections, leading to reactive rather than preventative maintenance.",
                  "Underperforming listing visuals that fail to accurately represent property condition or appeal.",
                  "Fragmented or inconsistent reporting across multiple properties or platforms.",
                  "Delayed issue identification due to lack of structured, repeatable inspection data.",
                ],
              },
            ].map(({ heading, items }, col) => (
              <motion.div
                key={col}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: col * 0.1 }}
                className="space-y-8"
              >
                <h3 className="text-xs font-medium uppercase tracking-widest gradient-text border-b border-white/10 pb-4">
                  {heading}
                </h3>
                <ul className="space-y-5">
                  {items.map((item, i) => (
                    <li key={i} className="flex gap-4 text-sm text-white/65 font-light leading-relaxed">
                      <span className="gradient-text mt-0.5 shrink-0 font-medium">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-24" style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text mb-4">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Core Services</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
            {[
              {
                title: "Residential Inventories",
                desc: "Comprehensive, legally robust condition reporting establishing the baseline state of a property. DPS-compliant format, high-resolution evidence, meter reading verification.",
              },
              {
                title: "360° Property Tours",
                desc: "Immersive spatial documentation capturing every angle simultaneously. Undeniable spatial context, reduced physical viewing requirements, and a premium marketing asset.",
              },
              {
                title: "Check-In / Check-Out Reports",
                desc: "Detailed comparative analysis against baseline inventories. Clear delineation of fair wear and tear with rapid turnaround for tenancy transitions.",
              },
              {
                title: "Mid-Term Inspections",
                desc: "Periodic operational checks to monitor compliance, condition, and maintenance requirements. Early issue detection and asset preservation.",
              },
            ].map(({ title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                className="p-10 space-y-4"
                style={{ backgroundColor: "#16163F" }}
              >
                <span className="text-xs text-white/20 font-light">0{i + 1}</span>
                <h3 className="text-xl font-serif text-white">{title}</h3>
                <p className="text-sm text-white/55 font-light leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-y border-white/10" style={{ backgroundColor: "#16163F" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text mb-4">Process</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">How It Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {[
              {
                step: "Booking",
                desc: "Property details, access arrangements and service requirements are confirmed upfront for inventories, 360 tours, inspections or check-in/check-out visits.",
              },
              {
                step: "On-Site Documentation",
                desc: "The property is documented room-by-room using structured inventories, detailed imagery and immersive 360 walkthrough capture.",
              },
              {
                step: "Report Preparation",
                desc: "Images, condition notes and observations are compiled into a clear, professional digital report format.",
              },
              {
                step: "Digital Delivery",
                desc: "Completed reports, photo sets and 360 walkthrough links are delivered with fast turnaround, ready for immediate landlord, agent or tenant use.",
              },
            ].map(({ step, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="space-y-4"
              >
                <span className="text-6xl font-serif text-white/10 block">0{i + 1}</span>
                <div className="h-px w-10 gradient-bg" />
                <h4 className="text-xs font-medium uppercase tracking-widest text-white">{step}</h4>
                <p className="text-sm text-white/50 font-light leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="py-24" style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-8"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text">Credibility</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Built on operational experience</h2>
            <div className="space-y-5">
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Videro is not a creative media agency repackaged for property. It is a structured documentation service built by someone with real property management experience and an understanding of how important clear evidence, accurate reporting and reliable records are throughout a tenancy lifecycle.
              </p>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                The focus is simple: produce organised, professional property documentation that landlords, agents and operators can rely on.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 border-t border-white/10" style={{ backgroundColor: "#16163F" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">Get in Touch</p>
              <h2 className="text-3xl md:text-4xl font-serif text-white">Make an Enquiry</h2>
              <p className="text-sm text-white/55 font-light leading-relaxed max-w-sm">
                Provide details of your portfolio, property type, or requirements. We respond with a structured proposal aligned to your operational and documentation needs.
              </p>
              <div className="pt-4 space-y-3 text-sm text-white/45 font-light">
                <p>Serving: Bristol & surrounding areas</p>
                <p>Turnaround: 48 hours</p>
                <p>Agency & portfolio packages available</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <LeadForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
