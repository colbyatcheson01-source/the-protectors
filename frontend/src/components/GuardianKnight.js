'use client';

import { useState } from 'react';

const basePath = process.env.NODE_ENV === 'production' ? '/the-enforcers' : '';

export default function GuardianKnight() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative max-w-sm w-full">
      <div className="absolute inset-0 bg-biker-flame/5 blur-3xl rounded-full"></div>

      <div className="relative z-10 rounded-sm overflow-hidden border-2 border-biker-steel/50 bg-biker-black">
        {!imgError ? (
          <img
            src={`${basePath}/images/guardian-of-justice.png`}
            alt="The Enforcers SC - Club logo"
            className="w-full h-auto"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="p-6">
            <img
              src={`${basePath}/images/enforcers-logo.svg`}
              alt="The Enforcers SC"
              className="w-full h-auto"
            />
          </div>
        )}
      </div>

      <div className="mt-4 text-center stitch-border border-biker-flame/30">
        <div className="font-display text-2xl font-bold text-white tracking-widest uppercase">
          The <span className="text-biker-flame">Enforcers</span>
        </div>
        <div className="font-mono text-xs text-neutral-500 tracking-[0.3em] uppercase">SC</div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="block w-8 border-t-2 border-dotted border-biker-steel"></span>
          <span className="font-display text-sm font-bold text-biker-flame tracking-widest uppercase">
            Stand for what&rsquo;s right
          </span>
          <span className="block w-8 border-t-2 border-dotted border-biker-steel"></span>
        </div>
        <p className="text-neutral-500 text-xs mt-3 max-w-xs mx-auto leading-relaxed font-mono">
          Standing for what&rsquo;s right.
        </p>
      </div>
    </div>
  );
}
