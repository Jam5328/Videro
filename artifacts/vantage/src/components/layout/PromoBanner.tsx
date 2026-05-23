import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBanner } from "@/context/BannerContext";

export default function PromoBanner() {
  const { visible, dismiss, setBannerHeight } = useBanner();
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setBannerHeight(entry.contentRect.height);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [setBannerHeight]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed top-0 left-0 right-0 z-[60]"
        >
          <div
            ref={innerRef}
            className="relative flex items-center justify-center gap-3 px-10 py-2.5 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,8,30,0.92) 0%, rgba(20,14,45,0.95) 50%, rgba(10,8,30,0.92) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.045) 50%, transparent 100%)",
              }}
              animate={{ x: ["-110%", "110%"] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut",
              }}
            />

            {/* Subtle left accent line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px]"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(124,58,237,0.6), transparent)",
              }}
            />

            {/* Content */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center text-center leading-snug">
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] tracking-widest uppercase font-medium rounded-sm"
                style={{
                  background: "rgba(124,58,237,0.18)",
                  border: "1px solid rgba(124,58,237,0.35)",
                  color: "rgba(196,168,255,0.95)",
                  letterSpacing: "0.14em",
                }}
              >
                Launch Offer
              </motion.span>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-[11.5px] sm:text-xs font-light tracking-wide"
                style={{ color: "rgba(230,225,255,0.88)" }}
              >
                <span
                  className="font-medium sm:hidden"
                  style={{ color: "rgba(210,190,255,0.95)" }}
                >
                  Launch Offer —{" "}
                </span>
                <span style={{ color: "rgba(200,185,255,0.9)" }} className="font-medium">
                  Complimentary
                </span>{" "}
                Property Management Support for{" "}
                <span
                  className="font-medium"
                  style={{ color: "rgba(200,185,255,0.9)" }}
                >
                  Selected Airbnb Hosts &amp; Landlords
                </span>
              </motion.p>

              {/* CTA */}
              <motion.a
                href="/#contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={dismiss}
                className="hidden sm:inline-flex items-center gap-1.5 text-[10.5px] tracking-wider uppercase font-medium px-3 py-1 transition-all duration-200"
                style={{
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.4)",
                  color: "rgba(210,190,255,0.95)",
                  letterSpacing: "0.1em",
                }}
              >
                Apply Now
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M1 5h8M6 2l3 3-3 3" />
                </svg>
              </motion.a>
            </div>

            {/* Dismiss button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ opacity: 1 }}
              onClick={dismiss}
              aria-label="Dismiss banner"
              className="absolute right-3 sm:right-4 p-1 transition-opacity duration-200"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
