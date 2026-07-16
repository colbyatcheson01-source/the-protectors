'use client';

import { useState } from 'react';

const basePath = process.env.NODE_ENV === 'production' ? '/the-protectors' : '';

export default function GuardianKnight() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative max-w-sm w-full">
      <div className="absolute inset-0 bg-guardian-gold/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 rounded-2xl overflow-hidden border border-guardian-gold/20 shadow-gold-lg bg-guardian-midnight">
        {!imgError ? (
          <img
            src={`${basePath}/images/guardian-of-justice.png`}
            alt="The Guardian of Justice - A hooded medieval knight grasping a sword pointed downward with wings of arrows"
            className="w-full h-auto"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="p-4">
            <img
              src={`${basePath}/images/guardian-of-justice.svg`}
              alt="The Guardian of Justice - A hooded medieval knight grasping a sword pointed downward with wings of arrows"
              className="w-full h-auto"
            />
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <div className="font-display text-2xl font-bold text-white tracking-wide">
          The <span className="text-guardian-gold">Guardian</span> of Justice
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="block w-8 h-px bg-guardian-gold/50"></span>
          <span className="font-display text-lg font-bold text-guardian-gold tracking-widest uppercase">
            Stand for what&rsquo;s right
          </span>
          <span className="block w-8 h-px bg-guardian-gold/50"></span>
        </div>
        <p className="text-neutral-400 text-xs mt-3 max-w-xs mx-auto leading-relaxed">
          A symbol of justice, courage and unwavering faith. It represents the strength to protect others, face darkness without fear, and to never stray from the path of honor.
        </p>
      </div>
    </div>
  );
}
