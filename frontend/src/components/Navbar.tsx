'use client';

import Link from 'next/link';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--primary)]/10 z-50 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-lg sm:text-xl font-black italic tracking-tighter hover:opacity-80 transition-opacity">
          VIVE <span className="text-[var(--primary)]">MÉXICO</span>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSelector />
        <Link href="/auth?role=merchant" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] border-2 border-[var(--primary)] px-2 sm:px-3 py-1.5 rounded-full hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm">
          {t('portal_partner')}
        </Link>
        {/* Search removed until functional */}
      </div>
    </nav>
  );
};

export default Navbar;
