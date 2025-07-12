"use client";

import { useState } from 'react';
import Link from 'next/link';
import SoundWord from './SoundWord';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-4 border-b border-black bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-4 text-black">
        <Link href="/" className="flex items-center gap-4">
            <div className="w-8 h-8">
              <img
                src="/logo.png"
                alt="Yo Friend Logo"
                className="w-8 h-8 object-contain"
                width={32}
                height={32}
                loading="eager"
                style={{ display: 'block' }}
              />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-center" style={{fontFamily: 'var(--font-blackmud)'}}>
              <span className="inline-flex flex-wrap justify-center gap-x-2 gap-y-1">
                {'Yo Friend'.split(' ').map((word, index) => (
                  <SoundWord key={index} word={word} />
                ))}
              </span>
            </h2>
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/services" className="text-black text-sm font-medium hover:opacity-70 transition-opacity">Services</Link>
        <Link href="/case-studies" className="text-black text-sm font-medium hover:opacity-70 transition-opacity">Case Studies</Link>
        <Link href="/about" className="text-black text-sm font-medium hover:opacity-70 transition-opacity">About Us</Link>
        <Link href="/contact" className="text-black text-sm font-medium hover:opacity-70 transition-opacity">Contact</Link>
        <button className="bg-black hover:bg-white text-white hover:text-black active:bg-white active:text-black px-6 py-2 rounded-full text-sm font-bold transition-colors border border-black">
          Get Started
        </button>
      </nav>

      <button 
        className="md:hidden p-2 text-black"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
          <nav className="flex flex-col items-center gap-4 p-4">
            <Link href="/services" className="text-black text-sm font-medium hover:opacity-70 transition-opacity" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link href="/case-studies" className="text-black text-sm font-medium hover:opacity-70 transition-opacity" onClick={() => setIsMenuOpen(false)}>Case Studies</Link>
            <Link href="/about" className="text-black text-sm font-medium hover:opacity-70 transition-opacity" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link href="/contact" className="text-black text-sm font-medium hover:opacity-70 transition-opacity" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <button className="bg-black hover:bg-white text-white hover:text-black active:bg-white active:text-black px-6 py-2 rounded-full text-sm font-bold transition-colors border border-black">
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 