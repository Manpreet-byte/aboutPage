import React from 'react';

/**
 * LuxuryHero
 * - High-contrast serif heading using Tailwind CSS
 * - Note: for exact Playfair Display rendering, add the Google Font to your HTML head:
 *   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
 */
const LuxuryHero = ({ className = '' }) => {
  return (
    <section className={`py-12 ${className}`} aria-label="hero">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1
            style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 6px 18px rgba(0,0,0,0.06)' }}
            className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl lg:text-6xl leading-snug tracking-tight uppercase"
          >
            <span className="block text-[#111827]">BRINGING <span className="italic text-[#D4AF37]">ARTISTS</span> &amp;</span>
            <span className="block italic text-[#D4AF37]">ART LOVERS</span>
            <span className="block text-[#111827]">AT ONE STAGE</span>
          </h1>

          <div className="mt-6 flex justify-center">
            <span className="inline-block w-24 h-0.5 bg-[#D4AF37] rounded-full opacity-95" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryHero;
