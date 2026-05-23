const MESSAGE = "Launch Offer — Complimentary Inventory & 360° Tour Services for Selected Airbnb Hosts & Landlords";
const SEPARATOR = "✦";
const REPEAT = 6;

export default function AnnouncementBanner() {
  const items = Array.from({ length: REPEAT }, (_, i) => (
    <span key={i} className="shrink-0 flex items-center gap-6 px-6">
      <span className="text-white/40 text-[10px]">{SEPARATOR}</span>
      <span>{MESSAGE}</span>
    </span>
  ));

  return (
    <div className="fixed top-14 left-0 right-0 z-40 h-8 gradient-bg overflow-hidden flex items-center">
      <div className="banner-track">
        <div className="banner-content">
          {items}
          {items}
        </div>
      </div>
    </div>
  );
}
