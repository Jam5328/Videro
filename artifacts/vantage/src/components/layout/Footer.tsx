import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="space-y-3 md:space-y-5">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/vantage-icon.png"
              alt="VIDERO icon"
              className="w-6 h-6 object-contain"
            />
            <h2 className="font-serif text-base tracking-[0.2em] uppercase text-foreground">VIDERO</h2>
          </div>
          <p className="text-sm text-foreground/50 font-light leading-relaxed max-w-xs">
            Property documentation and visual systems for letting agencies and property managers.
          </p>
          <p className="text-xs text-foreground/30 font-light tracking-wide">Bristol, United Kingdom</p>
        </div>

        <div className="space-y-3 md:space-y-4">
          <h3 className="text-xs font-medium uppercase tracking-widest text-foreground/30">Services</h3>
          <ul className="space-y-2 md:space-y-3 text-sm text-foreground/50 font-light">
            <li>
              <a href="/services#service-01" className="hover:text-foreground transition-colors">Residential Inventories</a>
            </li>
            <li>
              <a href="/services#service-02" className="hover:text-foreground transition-colors">360° Tours</a>
            </li>
            <li>
              <a href="/services#service-03" className="hover:text-foreground transition-colors">Inspections & Reports</a>
            </li>
          </ul>
        </div>

        <div className="space-y-3 md:space-y-4">
          <h3 className="text-xs font-medium uppercase tracking-widest text-foreground/30">Company</h3>
          <ul className="space-y-2 md:space-y-3 text-sm text-foreground/50 font-light">
            <li>
              <a href="/about" className="hover:text-foreground transition-colors">About</a>
            </li>
            <li>
              <a href="/pricing" className="hover:text-foreground transition-colors">Pricing</a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-foreground transition-colors">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center">
        <p className="text-xs text-foreground/25 font-light tracking-wide">
          &copy; {new Date().getFullYear()} VIDERO Property Systems. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
