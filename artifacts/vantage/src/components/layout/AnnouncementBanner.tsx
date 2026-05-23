import vantageIcon from "@/assets/images/vantage-icon.png";

const MESSAGE = "Launch Offer — Complimentary Inventory & 360° Tour Services for Selected Airbnb Hosts & Landlords";
const REPEAT = 6;

export default function AnnouncementBanner() {
  const items = Array.from({ length: REPEAT }, (_, i) => (
    <span key={i} className="shrink-0 flex items-center gap-5 px-5">
      <img src={vantageIcon} alt="" className="w-3.5 h-3.5 object-contain opacity-70" />
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
