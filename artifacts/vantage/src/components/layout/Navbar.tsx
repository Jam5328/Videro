import { useState, useEffect } from "react";
import { Link } from "wouter";
import vantageIconImg from "@/assets/images/vantage-icon.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-400 ${
        atTop
          ? "bg-transparent border-b border-transparent"
          : "bg-white border-b border-border shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-end gap-3">
          <img
            src={vantageIconImg}
            alt="Videro icon"
            className="w-7 h-7 object-contain object-bottom"
          />
          <Link
            href="/"
            className={`font-serif text-lg tracking-[0.2em] uppercase transition-colors duration-300 leading-none pb-px ${
              atTop ? "text-white" : "text-foreground"
            }`}
          >
            VIDERO
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          <Link
            href="/services"
            className={`transition-colors duration-200 hover:opacity-100 ${
              atTop
                ? "text-white font-normal"
                : "text-foreground/50 font-light hover:text-foreground"
            }`}
            style={atTop ? { textShadow: "0 1px 4px rgba(0,0,0,0.5)" } : undefined}
          >
            Services
          </Link>
          <Link
            href="/about"
            className={`transition-colors duration-200 hover:opacity-100 ${
              atTop
                ? "text-white font-normal"
                : "text-foreground/50 font-light hover:text-foreground"
            }`}
            style={atTop ? { textShadow: "0 1px 4px rgba(0,0,0,0.5)" } : undefined}
          >
            About
          </Link>
          <Link
            href="/pricing"
            className={`transition-colors duration-200 hover:opacity-100 ${
              atTop
                ? "text-white font-normal"
                : "text-foreground/50 font-light hover:text-foreground"
            }`}
            style={atTop ? { textShadow: "0 1px 4px rgba(0,0,0,0.5)" } : undefined}
          >
            Pricing
          </Link>
        </nav>

        {/* Enquire CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="/#contact"
            className="text-sm font-medium tracking-wide px-5 py-2 gradient-bg text-white transition-opacity hover:opacity-90"
            data-testid="link-enquire"
          >
            Enquire
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden transition-colors duration-300 ${
            atTop ? "text-white hover:text-white/80" : "text-foreground/60 hover:text-foreground"
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-testid="button-mobile-menu"
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="0" y1="1" x2="22" y2="1" />
            <line x1="0" y1="8" x2="22" y2="8" />
            <line x1="0" y1="15" x2="22" y2="15" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border px-6 py-5 space-y-4 bg-white">
          <Link href="/services" className="block text-sm text-foreground/60 hover:text-foreground" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/about" className="block text-sm text-foreground/60 hover:text-foreground" onClick={() => setOpen(false)}>About</Link>
          <Link href="/pricing" className="block text-sm text-foreground/60 hover:text-foreground" onClick={() => setOpen(false)}>Pricing</Link>
          <a href="/#contact" className="block text-sm text-foreground/60 hover:text-foreground" onClick={() => setOpen(false)}>Enquire</a>
        </div>
      )}
    </header>
  );
}
