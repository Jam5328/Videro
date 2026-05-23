import vantageIcon from "@/assets/images/vantage-icon.png";

const MESSAGE = "Launch Offer — Complimentary Inventory & 360° Tour Services for Selected Airbnb Hosts & Landlords";
const REPEAT = 5;

export default function AnnouncementBanner() {
  const unit = (
    <>
      <span className="shrink-0 px-16 text-white/92 whitespace-nowrap">{MESSAGE}</span>
      <span className="shrink-0 px-16 flex items-center justify-center">
        <img src={vantageIcon} alt="" className="w-4 h-4 object-contain opacity-80" />
      </span>
    </>
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
