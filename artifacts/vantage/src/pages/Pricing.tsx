import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import bristolHouses from "@/assets/images/bristol-houses.jpg";

const inventoryPricing = [
  {
    title: "Standard Inventory",
    subtitle: "Professional photographic inventory reporting",
    popular: false,
    prices: [
      ["Studio / Room", "From £55"],
      ["1 Bed", "POR"],
      ["2 Bed", "POR"],
      ["3 Bed", "POR"],
      ["4+ Bed", "POR"],
    ],
    features: [
      "High-resolution photographic evidence",
      "Meter readings",
      "Digital PDF delivery",
      "Legally structured reporting",
      "Detailed condition logging",
    ],
  },
  {
    title: "Enhanced Inventory",
    subtitle: "Inventory reporting with immersive 360° room views",
    popular: true,
    prices: [
      ["Studio / Room", "From £75"],
      ["1 Bed", "POR"],
      ["2 Bed", "POR"],
      ["3 Bed", "POR"],
      ["4+ Bed", "POR"],
    ],
    features: [
      "Everything in Standard Inventory",
      "360° room documentation",
      "Enhanced evidence capture",
      "Improved dispute protection",
      "Interactive room visuals",
    ],
  },
  {
    title: "Full Virtual Property Tour",
    subtitle: "Premium immersive property walkthrough experience",
    popular: false,
    prices: [
      ["Studio / Room", "From £95"],
      ["1 Bed", "POR"],
      ["2 Bed", "POR"],
      ["3 Bed", "POR"],
      ["4+ Bed", "POR"],
    ],
    features: [
      "Interactive property walkthrough",
      "Shareable virtual tour",
      "Complete spatial documentation",
      "Premium visual presentation",
      "Ideal for agencies & remote landlords",
    ],
  },
];

const checkInOutPricing = [
  {
    title: "Check-In Reports",
    prices: [
      ["Studio / Room", "From £35"],
      ["1 Bed", "POR"],
      ["2 Bed", "POR"],
      ["3 Bed", "POR"],
      ["4+ Bed", "POR"],
    ],
    features: [
      "Key handover confirmation",
      "Tenant verification",
      "Meter readings",
      "Inventory confirmation",
      "Digital report delivery",
    ],
  },
  {
    title: "Check-Out Reports",
    prices: [
      ["Studio / Room", "From £50"],
      ["1 Bed", "POR"],
      ["2 Bed", "POR"],
      ["3 Bed", "POR"],
      ["4+ Bed", "POR"],
    ],
    features: [
      "Comparative condition reporting",
      "Damage identification",
      "Fair wear & tear assessment",
      "Deposit evidence support",
      "End-of-tenancy documentation",
    ],
  },
];

const inspectionPricing = [
  ["Standard Property Inspection", "POR"],
  ["HMO Inspection", "POR"],
  ["Portfolio / Multi-Unit Inspection", "POR"],
];

const addOns = [
  ["24-Hour Turnaround", "POR"],
  ["Weekend / Emergency Booking", "POR"],
  ["Additional 360° Coverage", "POR"],
  ["Maintenance Reporting Add-On", "POR"],
  ["Portfolio Reporting", "POR"],
];

export default function Pricing() {
  const ctaRef = useRef<HTMLElement>(null);
  const [imgY, setImgY] = useState(0);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    function update() {
      const rect = el!.getBoundingClientRect();
      const vh = window.innerHeight;
      const prog = (vh - rect.top) / (vh + rect.height);
      setImgY((prog * 100) - 50);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="w-full overflow-hidden">

      {/* Hero */}
      <section className="border-b border-white/10 py-24 md:py-32" style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-5 max-w-3xl"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text">Transparent Pricing</p>
            <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              Clear, fixed pricing. No surprises.
            </h1>
            <p className="text-lg text-white/55 font-light leading-relaxed max-w-2xl">
              All services are priced by property size and scope. Portfolio and agency packages are available — enquire for a tailored proposal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Key */}
      <section style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6 pb-6">
          <div className="inline-flex items-center gap-3 border border-white/10 px-4 py-2.5">
            <span className="text-xs font-medium text-white/40 uppercase tracking-[0.2em]">Key</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="text-xs font-medium text-white tracking-wide">POR</span>
            <span className="text-xs text-white/40 font-light">—</span>
            <span className="text-xs text-white/50 font-light">Price on Request. Contact us for a tailored quote based on your property and requirements.</span>
          </div>
        </div>
      </section>

      {/* Inventory Services */}
      <section className="py-20 md:py-24 border-b border-white/10" style={{ backgroundColor: "#16163F" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text mb-4">Inventory Services</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Property Inventories</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
            {inventoryPricing.map(({ title, subtitle, popular, prices, features }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex flex-col p-8 md:p-10"
                style={{ backgroundColor: popular ? "#1a1a4e" : "#16163F" }}
              >
                {popular && (
                  <div className="absolute top-0 inset-x-0 h-0.5 gradient-bg" />
                )}
                {popular && (
                  <span className="inline-block mb-4 text-xs font-medium uppercase tracking-widest gradient-text">
                    Most Popular
                  </span>
                )}
                <div className="space-y-1 mb-8">
                  <h3 className="text-xl font-serif text-white">{title}</h3>
                  <p className="text-xs text-white/40 font-light">{subtitle}</p>
                </div>

                <div className="mb-8 space-y-2 border-b border-white/10 pb-8">
                  {prices.map(([size, price]) => (
                    <div key={size} className="flex items-baseline justify-between gap-4">
                      <span className="text-sm text-white/50 font-light">{size}</span>
                      <span className="text-sm font-medium text-white tabular-nums">{price}</span>
                    </div>
                  ))}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/55 font-light">
                      <Check className="w-4 h-4 gradient-text shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/#contact"
                  className={`inline-flex h-10 items-center justify-center text-sm font-medium tracking-wide transition-opacity px-6 ${
                    popular
                      ? "gradient-bg text-white hover:opacity-90"
                      : "border border-white/20 text-white/70 hover:border-white/50 hover:text-white"
                  }`}
                >
                  Enquire
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Check-In / Check-Out */}
      <section className="py-20 md:py-24 border-b border-white/10" style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text mb-4">Tenancy Transitions</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Check-In & Check-Out</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
            {checkInOutPricing.map(({ title, prices, features }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col p-8 md:p-10"
                style={{ backgroundColor: "#16163F" }}
              >
                <h3 className="text-xl font-serif text-white mb-8">{title}</h3>

                <div className="mb-8 space-y-2 border-b border-white/10 pb-8">
                  {prices.map(([size, price]) => (
                    <div key={size} className="flex items-baseline justify-between gap-4">
                      <span className="text-sm text-white/50 font-light">{size}</span>
                      <span className="text-sm font-medium text-white tabular-nums">{price}</span>
                    </div>
                  ))}
                </div>

                <ul className="space-y-3 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/55 font-light">
                      <Check className="w-4 h-4 gradient-text shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Tenancy Inspections */}
      <section className="py-20 md:py-24 border-b border-white/10" style={{ backgroundColor: "#16163F" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text mb-4">Ongoing Management</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Mid-Tenancy Inspections</h2>
          </motion.div>

          <div className="border border-white/10">
            {inspectionPricing.map(([name, price], i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center justify-between px-8 py-5 border-b border-white/10 last:border-0"
                style={{ backgroundColor: "#0D0D2A" }}
              >
                <span className="text-sm text-white/70 font-light">{name}</span>
                <span className="text-sm font-medium text-white tabular-nums">{price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-20 md:py-24 border-b border-white/10" style={{ backgroundColor: "#0D0D2A" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text mb-4">Optional Extras</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Add-Ons</h2>
          </motion.div>

          <div className="border border-white/10">
            {addOns.map(([name, price], i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center justify-between px-8 py-5 border-b border-white/10 last:border-0"
                style={{ backgroundColor: "#16163F" }}
              >
                <span className="text-sm text-white/70 font-light">{name}</span>
                <span className="text-sm font-medium text-white tabular-nums">{price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Agency & Portfolio Packages with parallax image */}
      <section ref={ctaRef} className="relative overflow-hidden pt-20 pb-[50px] md:pt-24 md:pb-[68px]" style={{ backgroundColor: "#0D0D2A" }}>
        {/* Parallax image — 600px tall, ~300px visible at any time */}
        <img
          src={bristolHouses}
          alt="Bristol"
          className="absolute left-0 w-full object-cover object-center pointer-events-none select-none"
          style={{
            height: "600px",
            top: `calc(-150px + ${imgY}px)`,
          }}
        />
        {/* Translucent overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(13,13,42,0.97), rgba(22,22,63,0.82), rgba(13,13,42,0.55))" }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text">Agency & Portfolio Packages</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white leading-snug">
              Managing multiple properties?
            </h2>
            <p className="text-sm text-white/55 font-light leading-relaxed max-w-xl mx-auto">
              Volume discounts and bespoke packages are available for letting agencies, portfolio landlords and serviced accommodation operators. Enquire to receive a tailored proposal.
            </p>
            <div className="pt-2 flex justify-center">
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
