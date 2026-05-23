import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

const STORAGE_KEY = "vantage_promo_dismissed_v1";

interface BannerContextValue {
  visible: boolean;
  bannerHeight: number;
  setBannerHeight: (h: number) => void;
  dismiss: () => void;
}

const BannerContext = createContext<BannerContextValue>({
  visible: false,
  bannerHeight: 0,
  setBannerHeight: () => {},
  dismiss: () => {},
});

export function BannerProvider({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  const [dismissed, setDismissed] = useState(() => {
    if (!enabled) return true;
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  const [bannerHeight, setBannerHeight] = useState(0);

  const dismiss = useCallback(() => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }, []);

  const visible = enabled && !dismissed;

  return (
    <BannerContext.Provider
      value={{ visible, bannerHeight: visible ? bannerHeight : 0, setBannerHeight, dismiss }}
    >
      {children}
    </BannerContext.Provider>
  );
}

export const useBanner = () => useContext(BannerContext);
