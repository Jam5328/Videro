const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;

export const WHATSAPP_ENABLED = !!WHATSAPP_NUMBER;

export function getWhatsAppUrl(message = "Hi, I'd like to enquire about VIDERO property documentation services."): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
