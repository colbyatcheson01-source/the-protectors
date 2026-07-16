'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
  { href: '/volunteer', label: 'Join' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-biker-black border-b-2 border-biker-steel/50 sticky top-0 z-50 flame-bar">
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 group" aria-label="The Enforcers MC - Home">
            <div className="w-10 h-10 bg-biker-dark rounded-sm flex items-center justify-center border-2 border-biker-chrome/40 group-hover:border-biker-flame transition-all">
              <svg viewBox="0 0 100 100" className="w-7 h-7" fill="none">
                <ellipse cx="50" cy="48" rx="18" ry="20" stroke="#e0e0e0" strokeWidth="3"/>
                <ellipse cx="43" cy="42" rx="4" ry="5" fill="#ff6f00"/>
                <ellipse cx="57" cy="42" rx="4" ry="5" fill="#ff6f00"/>
                <line x1="30" y1="25" x2="70" y2="75" stroke="#808080" strokeWidth="2.5"/>
                <line x1="70" y1="25" x2="30" y2="75" stroke="#808080" strokeWidth="2.5"/>
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg text-white font-display tracking-widest uppercase">
                The <span className="text-biker-flame">Enforcers</span>
              </span>
              <span className="block text-[10px] text-neutral-500 tracking-[0.3em] uppercase -mt-0.5">MC</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-400 hover:text-biker-flame font-bold transition-colors text-xs tracking-widest uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/volunteer" className="btn-primary text-xs px-5 py-2">
              Enlist Now
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-sm hover:bg-biker-dark text-neutral-400 border border-biker-steel/50"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t-2 border-biker-steel/50 mt-2 pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-neutral-400 hover:text-biker-flame font-bold px-2 py-1 text-xs tracking-widest uppercase"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/volunteer" className="btn-primary text-center text-sm" onClick={() => setIsOpen(false)}>
                Enlist Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
