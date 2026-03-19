import React from 'react';
import Link from 'next/link';

interface HeadPos {
  x: number;
  y: number;
}

interface FlagProps {
  head: HeadPos | null;
  text?: string;
  link?: string;
}

// Ultra-minimalistic flag with hero section font styling
export default function Flag({ head, text = 'Tag', link }: Readonly<FlagProps>) {
  if (!head) return null;

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    left: Math.round(head.x) + 'px',
    top: Math.round(head.y) + 'px',
    pointerEvents: 'auto',
    transform: 'translate(-50%, -100%)',
    zIndex: 10001,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 100, // Thin weight like hero
    fontFamily: 'inherit', // Use system font like hero
    letterSpacing: '0.2em', // Wide tracking like hero
    userSelect: 'none',
    whiteSpace: 'nowrap',
    textShadow: '0 0 8px rgba(0,0,0,0.9)',
    textTransform: 'uppercase',
    padding: '4px 8px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(8px)',
  };

  return (
    <div style={containerStyle} aria-hidden>
      <svg width={60} height={30} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
        {/* Ultra-thin line from bottom center upward */}
        <line x1="30" y1="30" x2="30" y2="8" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
        {/* Minimal connection point */}
        <circle cx="30" cy="30" r="1.5" fill="rgba(255,255,255,0.8)" />
      </svg>
      {/* Label positioned above the line with hero styling */}
      {link ? (
        <Link 
          href={link}
          style={{ 
            position: 'absolute', 
            top: '-28px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            ...labelStyle,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
          }}
        >
          {text}
        </Link>
      ) : (
        <div style={{ 
          position: 'absolute', 
          top: '-28px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          ...labelStyle 
        }}>
          {text}
        </div>
      )}
    </div>
  );
}
