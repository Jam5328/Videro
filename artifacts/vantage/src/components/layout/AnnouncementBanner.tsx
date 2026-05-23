import vantageIcon from "@/assets/images/vantage-icon.png";

const MESSAGE_BOLD = "Launch Offer";
const MESSAGE_REST = " — Complimentary Inventory & 360° Tour Services for Selected Airbnb Hosts & Landlords";
const REPEAT = 5;

export default function AnnouncementBanner() {
  const unit = (
    <span className="shrink-0 flex items-center whitespace-nowrap">
      <img src={vantageIcon} alt="" className="w-4 h-4 object-contain mr-3" style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }} />
      <span className="text-white/92 pr-20">
        <span className="font-semibold">{MESSAGE_BOLD}</span>{MESSAGE_REST}
      </span>
    </span>
  );

  return (
    <div className="fixed top-14 left-0 right-0 z-40 h-8 gradient-bg overflow-hidden flex items-center">
      <div className="banner-track">
        <div className="banner-content">
          {Array.from({ length: REPEAT }, (_, i) => (
            <span key={i} className="shrink-0 flex items-center">
              {unit}
            </span>
          ))}
          {Array.from({ length: REPEAT }, (_, i) => (
            <span key={`b${i}`} className="shrink-0 flex items-center">
              {unit}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
