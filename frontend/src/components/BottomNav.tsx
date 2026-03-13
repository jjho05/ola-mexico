'use strict';

import Link from 'next/link';
import { Home, Heart, ScanLine, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

const BottomNav = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[var(--glass)] backdrop-blur-xl border-t border-[var(--primary)]/10 z-50 flex items-center justify-around px-4 pb-4">
      <Link href="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-green-600' : 'text-gray-400'}`}>
        <Home size={24} />
        <span className="text-xs font-medium">Home</span>
      </Link>
      <Link href="/swipe" className={`flex flex-col items-center gap-1 ${isActive('/swipe') ? 'text-green-600' : 'text-gray-400'}`}>
        <Heart size={24} />
        <span className="text-xs font-medium">Swipe</span>
      </Link>
      <Link href="/scanner" className={`flex flex-col items-center gap-1 ${isActive('/scanner') ? 'text-green-600' : 'text-gray-400'}`}>
        <ScanLine size={24} />
        <span className="text-xs font-medium">Scanner</span>
      </Link>
      <Link href="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-green-600' : 'text-gray-400'}`}>
        <User size={24} />
        <span className="text-xs font-medium">Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
