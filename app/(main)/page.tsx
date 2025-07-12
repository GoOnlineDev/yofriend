"use client";

import { useEffect, useRef } from "react";
import HandshakeAnimation from "../../components/animation";
import SoundWord from "../../components/SoundWord";

export default function Home() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundsRef = useRef<{ [key: string]: AudioBuffer | null }>({
    scroll: null
  });

  // Initialize audio system
  useEffect(() => {
    const initAudio = async () => {
      try {
        // Create audio context
        const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass();
        }

        // Create paper rustling sound for scroll
        const createRustleSound = () => {
          const sampleRate = audioContextRef.current!.sampleRate;
          // Paper rustling sound - white noise with filtering
          const length = sampleRate * 0.12; // 120ms
          const buffer = audioContextRef.current!.createBuffer(1, length, sampleRate);
          const data = buffer.getChannelData(0);

          for (let i = 0; i < length; i++) {
            const t = i / sampleRate;
            // Generate filtered white noise
            let noise = (Math.random() * 2 - 1);
            
            // Apply multiple filters to simulate paper texture
            const highPass = Math.sin(t * 1000) * 0.3;
            const crackle = Math.random() > 0.7 ? Math.random() * 0.4 : 0;
            
            noise = noise * 0.6 + highPass + crackle;
            
            // Envelope - quick attack, gentle decay
            let envelope;
            if (t < 0.01) {
              envelope = t / 0.01; // Quick attack
            } else {
              envelope = Math.exp(-(t - 0.01) * 15); // Gentle decay
            }
            
            data[i] = noise * envelope * 0.08; // Very subtle volume
          }
          
          return buffer;
        };

        // Create scroll sound only
        soundsRef.current.scroll = createRustleSound();
        
      } catch {
        console.log('Audio not supported or blocked');
      }
    };

    initAudio();
  }, []);

  // Play scroll sound function
  const playScrollSound = () => {
    if (!audioContextRef.current || !soundsRef.current.scroll) return;
    
    try {
      const source = audioContextRef.current.createBufferSource();
      const gainNode = audioContextRef.current.createGain();
      
      source.buffer = soundsRef.current.scroll;
      source.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      // Set volume for scroll sound
      gainNode.gain.value = 0.3;
      
      source.start();
    } catch {
      console.log('Error playing sound');
    }
  };

  // Scroll sound effect
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        playScrollSound();
      }, 150); // Debounce paper rustling sounds
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <main className="relative z-10 flex-1" style={{backgroundColor: '#F8F8FF'}}>
        {/* Hero Section */}
        <section className="px-6 sm:px-10 lg:px-20 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6 text-center" style={{fontFamily: 'var(--font-blackmud)'}}>
                <span className="inline-flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-3">
                  {'Your Digital Marketing Partner'.split(' ').map((word, index) => (
                    <SoundWord key={index} word={word} />
                  ))}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-black leading-relaxed mb-8 max-w-2xl mx-auto">
                We help businesses grow their online presence through innovative strategies and data-driven results.
              </p>
              
              {/* Handshake Animation - Symbolizing Partnership */}
              <div className="mb-8 flex justify-center">
                <HandshakeAnimation width={300} height={200} duration={3000} />
              </div>
              
              <button 
                className="bg-black hover:bg-white text-white hover:text-black active:bg-white active:text-black px-8 py-4 rounded-full text-base font-bold transition-colors border border-black inline-flex items-center gap-2"
              >
                Get a Free Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="px-6 sm:px-10 lg:px-20 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-4 text-center" style={{fontFamily: 'var(--font-blackmud)'}}>
                <span className="inline-flex flex-wrap justify-center gap-x-3 gap-y-2">
                  {'Our Services'.split(' ').map((word, index) => (
                    <SoundWord key={index} word={word} />
                  ))}
                </span>
              </h2>
              <p className="text-lg text-black max-w-2xl mx-auto">
                We offer a comprehensive suite of digital marketing services tailored to your business needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-black rounded-xl p-6 hover:opacity-90 transition-opacity">
                <div className="w-12 h-12 border border-black rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">SEO Optimization</h3>
                <p className="text-black text-sm leading-relaxed">
                  Improve your website&apos;s visibility and organic search rankings.
                </p>
              </div>

              <div className="bg-white border border-black rounded-xl p-6 hover:opacity-90 transition-opacity">
                <div className="w-12 h-12 border border-black rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Social Media Management</h3>
                <p className="text-black text-sm leading-relaxed">
                  Engage your audience and build a strong social media presence.
                </p>
              </div>

              <div className="bg-white border border-black rounded-xl p-6 hover:opacity-90 transition-opacity">
                <div className="w-12 h-12 border border-black rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Content Marketing</h3>
                <p className="text-black text-sm leading-relaxed">
                  Create valuable content that attracts and converts customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="px-6 sm:px-10 lg:px-20 py-16" style={{backgroundColor: '#F8F8FF'}}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-4 text-center" style={{fontFamily: 'var(--font-blackmud)'}}>
                <span className="inline-flex flex-wrap justify-center gap-x-3 gap-y-2">
                  {'Why Choose Us?'.split(' ').map((word, index) => (
                    <SoundWord key={index} word={word} />
                  ))}
                </span>
              </h2>
              <p className="text-lg text-black max-w-2xl mx-auto">
                We are committed to delivering exceptional results and building long-term partnerships with our clients.
              </p>
              
              {/* Partnership Animation */}
              <div className="mb-12 flex justify-center">
                <HandshakeAnimation width={400} height={250} duration={4000} autoPlay={false} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-black rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Experienced Team</h3>
                <p className="text-black text-sm leading-relaxed">
                  Our team of experts has a proven track record of success in the digital marketing industry.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-black rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Data-Driven Approach</h3>
                <p className="text-black text-sm leading-relaxed">
                  We use data and analytics to optimize our strategies and ensure maximum ROI.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-black rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">Client-Focused</h3>
                <p className="text-black text-sm leading-relaxed">
                  We prioritize our clients&apos; goals and work closely with them to achieve their objectives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="px-6 sm:px-10 lg:px-20 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-6 text-center" style={{fontFamily: 'var(--font-blackmud)'}}>
              <span className="inline-flex flex-wrap justify-center gap-x-2 gap-y-2 sm:gap-x-3 sm:gap-y-3 max-w-4xl mx-auto">
                {'Ready to Take Your Business to the Next Level?'.split(' ').map((word, index) => (
                  <SoundWord key={index} word={word} />
                ))}
              </span>
            </h2>
            <p className="text-lg text-black leading-relaxed mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and let&apos;s discuss how we can help you achieve your digital marketing goals.
            </p>
            <button 
              className="bg-black hover:bg-white text-white hover:text-black active:bg-white active:text-black px-10 py-4 rounded-full text-lg font-bold transition-colors border border-black inline-flex items-center gap-2"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </section>
      </main>
  );
}
