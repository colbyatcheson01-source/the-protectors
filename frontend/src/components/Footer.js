import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-biker-black border-t-2 border-biker-steel/50" role="contentinfo">
      <div className="divider-biker">
        <svg className="w-5 h-5 text-biker-flame" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
        </svg>
      </div>

      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-biker-dark rounded-sm flex items-center justify-center border-2 border-biker-chrome/40">
                <svg viewBox="0 0 100 100" className="w-7 h-7" fill="none">
                  <ellipse cx="50" cy="48" rx="18" ry="20" stroke="#e0e0e0" strokeWidth="3"/>
                  <ellipse cx="43" cy="42" rx="4" ry="5" fill="#ff6f00"/>
                  <ellipse cx="57" cy="42" rx="4" ry="5" fill="#ff6f00"/>
                  <line x1="30" y1="25" x2="70" y2="75" stroke="#808080" strokeWidth="2.5"/>
                  <line x1="70" y1="25" x2="30" y2="75" stroke="#808080" strokeWidth="2.5"/>
                </svg>
              </div>
              <div>
                <span className="font-bold text-lg text-white font-display tracking-widest uppercase">The <span className="text-biker-flame">Enforcers</span></span>
                <span className="block text-[10px] text-neutral-600 tracking-[0.3em] uppercase -mt-0.5">MC</span>
              </div>
            </div>
            <p className="text-neutral-500 max-w-md mb-2 text-sm leading-relaxed font-mono">
              Riding for justice. Standing for what&rsquo;s right. A Canadian motorcycle club dedicated to community safety, victim support, and violence prevention.
            </p>
            <p className="text-biker-flame/60 text-xs font-display italic mt-3 tracking-wider">&ldquo;Stand for what&rsquo;s right&rdquo;</p>
            <p className="text-neutral-700 text-xs mt-4 font-mono">
              Registered Canadian Nonprofit
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white text-xs tracking-widest uppercase">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-neutral-500 hover:text-biker-flame transition-colors text-sm font-mono">About</Link></li>
              <li><Link href="/resources" className="text-neutral-500 hover:text-biker-flame transition-colors text-sm font-mono">Resources</Link></li>
              <li><Link href="/volunteer" className="text-neutral-500 hover:text-biker-flame transition-colors text-sm font-mono">Join</Link></li>
              <li><Link href="/contact" className="text-neutral-500 hover:text-biker-flame transition-colors text-sm font-mono">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white text-xs tracking-widest uppercase">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-neutral-500 hover:text-biker-flame transition-colors text-sm font-mono">Privacy</Link></li>
              <li><Link href="/terms" className="text-neutral-500 hover:text-biker-flame transition-colors text-sm font-mono">Terms</Link></li>
            </ul>
            <div className="mt-6 pt-4 border-t-2 border-biker-steel/50">
              <h3 className="font-bold mb-2 text-white text-xs tracking-widest uppercase">Emergency</h3>
              <p className="text-sm text-neutral-500 font-mono">
                Call <a href="tel:911" className="text-biker-flame font-bold hover:underline">911</a> immediately
              </p>
              <p className="text-sm text-neutral-600 mt-1 font-mono">
                Crisis: <a href="tel:988" className="text-biker-flame hover:underline">988</a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-biker-steel/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-700 text-xs font-mono">
            &copy; {currentYear} The Enforcers MC. All rights reserved.
          </p>
          <p className="text-neutral-700 text-xs font-mono">
            &ldquo;Stand for what&rsquo;s right&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
