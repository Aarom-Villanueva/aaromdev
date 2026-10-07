export const CONTACT_EMAIL = 'aaromvillanueva18@gmail.com';
export const WHATSAPP_NUMBER = '51987164141';
export const INSTAGRAM_URL = 'https://www.instagram.com/aaromcim_/';
export const WHATSAPP_DISPLAY = '+51 987 164 141';
export const INSTAGRAM_HANDLE = '@aaromcim_';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = buildWhatsAppUrl('Hola Aarom, vi tu portafolio y me gustaría conversar');
