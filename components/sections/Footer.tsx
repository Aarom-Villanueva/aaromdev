import { Mail } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '@/components/social/SocialLinks';

const email = 'aaromvillanueva18@gmail.com';
const whatsappUrl =
  'https://wa.me/51987164141?text=Hola%20Aarom,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar';
const instagramUrl = 'https://www.instagram.com/aaromcim_/';

export default function Footer() {
  return (
    <footer className="relative bg-[#030303] border-t border-white/[0.05] py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[10px] font-bold tracking-wider text-white/80">
              AV
            </span>
            <div>
              <p className="text-sm font-medium text-white/70">Aarom Villanueva</p>
              <p className="text-xs text-white/35 mt-0.5">Software Developer · Lima, Perú</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/45 transition-colors hover:border-white/25 hover:text-white"
              >
                <WhatsAppIcon />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/45 transition-colors hover:border-white/25 hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="text-center sm:text-right">
              <a
                href={`mailto:${email}`}
                className="block text-xs text-white/45 transition-colors hover:text-white"
              >
                {email}
              </a>
              <p className="mt-1 text-xs tracking-wider text-white/30">© 2026 Aarom Villanueva</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}