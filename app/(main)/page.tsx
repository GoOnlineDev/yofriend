"use client";

import { useEffect, useRef } from "react";

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

  // Enhanced word component without sound
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

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden" style={{backgroundColor: '#F8F8FF'}}>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-4 border-b border-black">
        <div className="flex items-center gap-4 text-black">
          <div className="w-8 h-8">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-center" style={{fontFamily: 'var(--font-blackmud)'}}>
            <span className="inline-flex flex-wrap justify-center gap-x-2 gap-y-1">
              {'Yo Friend'.split(' ').map((word, index) => (
                <SoundWord key={index} word={word} />
              ))}
            </span>
          </h2>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <a href="#" className="text-black text-sm font-medium hover:opacity-70 transition-opacity">Services</a>
            <a href="#" className="text-black text-sm font-medium hover:opacity-70 transition-opacity">Case Studies</a>
            <a href="#" className="text-black text-sm font-medium hover:opacity-70 transition-opacity">About Us</a>
            <a href="#" className="text-black text-sm font-medium hover:opacity-70 transition-opacity">Contact</a>
          </nav>
                      <button className="bg-black hover:bg-white text-white hover:text-black active:bg-white active:text-black px-6 py-2 rounded-full text-sm font-bold transition-colors border border-black">
            Get Started
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-black"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1">
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

      {/* Footer */}
      <footer className="relative z-10 border-t border-black">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <a href="#" className="text-black hover:opacity-70 text-base font-medium transition-opacity">Services</a>
            <a href="#" className="text-black hover:opacity-70 text-base font-medium transition-opacity">Case Studies</a>
            <a href="#" className="text-black hover:opacity-70 text-base font-medium transition-opacity">About Us</a>
            <a href="#" className="text-black hover:opacity-70 text-base font-medium transition-opacity">Contact</a>
          </div>
          
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-black hover:opacity-70 transition-opacity">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-black hover:opacity-70 transition-opacity">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" className="text-black hover:opacity-70 transition-opacity">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.742.097.118.11.221.081.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-black text-base">© 2023 Yo Friend. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
