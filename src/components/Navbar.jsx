import React from 'react';

const Navbar = () => {
  return (
    <header className="w-full py-6 bg-white/0">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        <a href="/" className="font-serif text-xl text-gallery-dark tracking-[0.08em]">
          Zigguratss
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a href="/artworks" className="font-sans text-sm text-gallery-muted hover:text-gallery-accent transition-colors">Artworks</a>
          <a href="/about" className="font-sans text-sm text-gallery-muted hover:text-gallery-accent transition-colors">About</a>
          <a href="/contact" className="font-sans text-sm text-gallery-muted hover:text-gallery-accent transition-colors">Contact</a>
          <a href="/signup" className="px-4 py-2 bg-gallery-accent text-gallery-dark text-sm font-semibold rounded-md">Join</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
