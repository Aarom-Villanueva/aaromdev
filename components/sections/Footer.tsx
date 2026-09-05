export default function Footer() {
  return (
    <footer className="relative bg-[#030303] border-t border-white/[0.05] py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[10px] font-bold tracking-wider text-white/80">
              AV
            </span>
            <div>
              <p className="text-sm font-medium text-white/70">Aarom Villanueva</p>
              <p className="text-xs text-white/35 mt-0.5">Software Developer · Lima, Perú</p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <a href="mailto:aaromvillanueva18@gmail.com" className="block text-xs text-white/45 transition-colors hover:text-white">aaromvillanueva18@gmail.com</a>
            <p className="mt-1 text-xs tracking-wider text-white/30">© 2026 Aarom Villanueva</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
