"use client";

import { useEffect, useState } from 'react';

interface HandshakeAnimationProps {
  width?: number;
  height?: number;
  duration?: number;
  autoPlay?: boolean;
}

export default function HandshakeAnimation({ 
  width = 400, 
  height = 300, 
  duration = 4000,
  autoPlay = true 
}: HandshakeAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (autoPlay) {
      setIsAnimating(true);
    }
  }, [autoPlay]);

  const startAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, duration);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Animation Container */}
      <div 
        className="relative overflow-hidden bg-transparent"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0"
        >
          {/* White Person (Left) */}
          <g className={`person-white ${isAnimating ? 'animate' : ''}`}>
            {/* Body */}
            <path
              d="M80 120 L80 200 L70 200 L70 240 L90 240 L90 200 L80 200"
              fill="white"
              stroke="black"
              strokeWidth="2"
              className="person-body"
            />
            <path
              d="M100 120 L100 200 L110 200 L110 240 L90 240 L90 200 L100 200"
              fill="white"
              stroke="black"
              strokeWidth="2"
              className="person-body"
            />
            
            {/* Head */}
            <circle
              cx="90"
              cy="100"
              r="20"
              fill="white"
              stroke="black"
              strokeWidth="2"
              className="person-head"
            />
            
            {/* Extending Arm */}
            <path
              d="M110 130 Q140 125 170 130"
              stroke="black"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="person-arm"
            />
            
            {/* Hand */}
            <circle
              cx="170"
              cy="130"
              r="8"
              fill="white"
              stroke="black"
              strokeWidth="2"
              className="person-hand"
            />
          </g>

          {/* Black Person (Right) */}
          <g className={`person-black ${isAnimating ? 'animate' : ''}`}>
            {/* Body */}
            <path
              d="M320 120 L320 200 L310 200 L310 240 L330 240 L330 200 L320 200"
              fill="black"
              stroke="black"
              strokeWidth="2"
              className="person-body"
            />
            <path
              d="M300 120 L300 200 L290 200 L290 240 L310 240 L310 200 L300 200"
              fill="black"
              stroke="black"
              strokeWidth="2"
              className="person-body"
            />
            
            {/* Head */}
            <circle
              cx="310"
              cy="100"
              r="20"
              fill="black"
              stroke="black"
              strokeWidth="2"
              className="person-head"
            />
            
            {/* Extending Arm */}
            <path
              d="M290 130 Q260 125 230 130"
              stroke="black"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="person-arm"
            />
            
            {/* Hand */}
            <circle
              cx="230"
              cy="130"
              r="8"
              fill="black"
              stroke="black"
              strokeWidth="2"
              className="person-hand"
            />
          </g>

          {/* Handshake Effect */}
          <g className={`handshake-effect ${isAnimating ? 'animate' : ''}`}>
            {/* Connection Lines */}
            <path
              d="M170 130 L230 130"
              stroke="url(#handshakeGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="connection-line opacity-0"
            />
            
            {/* Sparkle Effects */}
            <g className="sparkles opacity-0">
              <circle cx="200" cy="120" r="2" fill="black" className="sparkle" />
              <circle cx="180" cy="140" r="1.5" fill="white" stroke="black" strokeWidth="1" className="sparkle" />
              <circle cx="220" cy="140" r="1.5" fill="black" className="sparkle" />
              <circle cx="200" cy="145" r="1" fill="black" className="sparkle" />
            </g>
          </g>

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="handshakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" />
              <stop offset="50%" stopColor="#888" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Floating Particles */}
        <div className={`particles ${isAnimating ? 'animate' : ''}`}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${45 + i * 8}%`,
                top: `${30 + (i % 3) * 15}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Control Button */}
      {!autoPlay && (
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="mt-6 px-6 py-2 bg-black text-white hover:bg-white hover:text-black border border-black rounded-full transition-colors duration-300 disabled:opacity-50"
        >
          {isAnimating ? 'Connecting...' : 'Shake Hands'}
        </button>
      )}

      <style jsx>{`
        .person-white, .person-black {
          transform-origin: center;
          transition: all 0.3s ease;
        }

        .person-white.animate {
          animation: personWhiteMove ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .person-black.animate {
          animation: personBlackMove ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .handshake-effect.animate .connection-line {
          animation: connectionAppear ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: ${duration * 0.6}ms;
        }

        .handshake-effect.animate .sparkles {
          animation: sparklesAppear ${duration}ms ease-in-out forwards;
          animation-delay: ${duration * 0.7}ms;
        }

        .handshake-effect.animate .sparkle {
          animation: sparkleFloat ${duration * 0.5}ms ease-in-out infinite;
        }

        .particles.animate .particle {
          animation: particleFloat ${duration}ms ease-in-out forwards;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, #333 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
        }

        @keyframes personWhiteMove {
          0% {
            transform: translateX(-50px) scale(0.8);
            opacity: 0.7;
          }
          30% {
            transform: translateX(-20px) scale(0.9);
            opacity: 1;
          }
          60% {
            transform: translateX(-10px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(0px) scale(1);
            opacity: 1;
          }
        }

        @keyframes personBlackMove {
          0% {
            transform: translateX(50px) scale(0.8);
            opacity: 0.7;
          }
          30% {
            transform: translateX(20px) scale(0.9);
            opacity: 1;
          }
          60% {
            transform: translateX(10px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(0px) scale(1);
            opacity: 1;
          }
        }

        @keyframes connectionAppear {
          0% {
            opacity: 0;
            stroke-dasharray: 0 60;
          }
          100% {
            opacity: 1;
            stroke-dasharray: 60 0;
          }
        }

        @keyframes sparklesAppear {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
        }

        @keyframes sparkleFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-5px) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes particleFloat {
          0% {
            opacity: 0;
            transform: translateY(0px) scale(0);
          }
          30% {
            opacity: 0.6;
            transform: translateY(-10px) scale(1);
          }
          60% {
            opacity: 0.8;
            transform: translateY(-15px) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translateY(-25px) scale(0.3);
          }
        }

        /* Hover effects */
        .person-white:hover, .person-black:hover {
          filter: drop-shadow(0 0 8px rgba(0,0,0,0.3));
        }

        .person-white:hover .person-head,
        .person-black:hover .person-head {
          filter: url(#glow);
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .person-white, .person-black {
            transform: scale(0.8);
          }
        }
      `}</style>
    </div>
  );
}

