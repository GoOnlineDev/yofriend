"use client";

import React from 'react';

const SoundWord = ({ word }: { word: string }) => (
  <span 
    className="text-black hover:text-white hover:bg-black transition-all duration-300 cursor-default px-2 py-1 hover:rotate-1 hover:scale-105 inline-block"
    style={{
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
    }}
  >
    {word}
  </span>
);

export default SoundWord; 