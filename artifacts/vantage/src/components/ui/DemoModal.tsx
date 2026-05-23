import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Camera, Video, Layers } from "lucide-react";

export type DemoItemType = "pdf" | "image-gallery" | "360" | "video";

export interface DemoItem {
  id: string;
  title: string;
  description: string;
  type: DemoItemType;
  url?: string;
  thumbnail?: string;
}

const TYPE_ICONS: Record<DemoItemType, React.ElementType> = {
  pdf: FileText,
  "image-gallery": Camera,
  "360": Layers,
  video: Video,
};

const TYPE_LABELS: Record<DemoItemType, string> = {
  pdf: "PDF Report",
  "image-gallery": "Photo Gallery",
  "360": "360° Tour",
  video: "Video Walkthrough",
};

// ─── Future demo items go here ────────────────────────────────────────────────
// Add items to this array when assets are ready. Each item needs:
//   id, title, description, type, and optionally url + thumbnail.
const DEMO_ITEMS: DemoItem[] = [];
// ─────────────────────────────────────────────────────────────────────────────

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

export function DemoModal({ open, onClose }: DemoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(13,13,42,0.85)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Demo Examples"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-none border border-white/10"
            style={{ backgroundColor: "#16163F" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
              <div className="space-y-0.5">
                <p className="text-xs font-medium uppercase tracking-[0.25em] gradient-text">Portfolio</p>
                <h2 className="text-xl font-serif text-white">Example Documentation</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white/30 hover:text-white/70 transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              {DEMO_ITEMS.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-5 text-center">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-white/20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white/50">Demo examples coming soon</p>
                    <p className="text-xs text-white/25 font-light max-w-xs leading-relaxed">
                      Sample inventory reports, 360° tours, and inspection documentation will be available here.
                    </p>
                  </div>
                  <a
                    href="/#contact"
                    onClick={onClose}
                    className="inline-flex h-9 items-center justify-center gradient-bg text-white px-6 text-xs font-medium tracking-wide transition-opacity hover:opacity-90 mt-2"
                  >
                    Request a Sample Report
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DEMO_ITEMS.map((item) => {
                    const Icon = TYPE_ICONS[item.type];
                    return (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="group border border-white/10 p-6 space-y-3 cursor-pointer hover:border-white/25 transition-colors"
                        style={{ backgroundColor: "#0D0D2A" }}
                        onClick={() => item.url && window.open(item.url, "_blank")}
                      >
                        <div className="flex items-start justify-between">
                          <Icon className="w-5 h-5 gradient-text" />
                          <span className="text-xs text-white/25 font-light">{TYPE_LABELS[item.type]}</span>
                        </div>
                        {item.thumbnail && (
                          <img src={item.thumbnail} alt={item.title} className="w-full h-24 object-cover opacity-60" />
                        )}
                        <div>
                          <h3 className="text-sm font-medium text-white">{item.title}</h3>
                          <p className="text-xs text-white/40 font-light mt-1 leading-relaxed">{item.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
