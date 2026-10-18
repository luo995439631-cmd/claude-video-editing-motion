import React from 'react';
import {C} from '../theme';

export const Crab: React.FC<{
  x: number;
  y: number;
  scale?: number;
  arms?: 'down' | 'up';
  sunglasses?: boolean;
  blush?: boolean;
  rotate?: number;
  style?: React.CSSProperties;
}> = ({x, y, scale = 1, arms = 'down', sunglasses, blush, rotate = 0, style}) => {
  return (
    <svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 120,
        height: 100,
        overflow: 'visible',
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        transformOrigin: '50% 80%',
        ...style,
      }}
    >
      {/* legs */}
      <path d="M38 76 L28 94 M50 80 L44 98 M70 80 L76 98 M82 76 L92 94" stroke={C.crabDark} strokeWidth="7" strokeLinecap="round" />
      {/* arms */}
      {arms === 'up' ? (
        <>
          <path d="M26 46 Q8 30 16 14" fill="none" stroke={C.crabDark} strokeWidth="8" strokeLinecap="round" />
          <path d="M94 46 Q112 30 104 14" fill="none" stroke={C.crabDark} strokeWidth="8" strokeLinecap="round" />
          <circle cx="16" cy="12" r="8" fill={C.white} stroke={C.ink} strokeWidth="2" />
          <circle cx="104" cy="12" r="8" fill={C.white} stroke={C.ink} strokeWidth="2" />
        </>
      ) : (
        <>
          <path d="M26 54 Q8 62 10 80" fill="none" stroke={C.crabDark} strokeWidth="8" strokeLinecap="round" />
          <path d="M94 54 Q112 62 110 80" fill="none" stroke={C.crabDark} strokeWidth="8" strokeLinecap="round" />
          <circle cx="10" cy="82" r="8" fill={C.white} stroke={C.ink} strokeWidth="2" />
          <circle cx="110" cy="82" r="8" fill={C.white} stroke={C.ink} strokeWidth="2" />
        </>
      )}
      {/* body */}
      <rect x="24" y="28" width="72" height="54" rx="14" fill={C.crab} stroke={C.ink} strokeWidth="3" />
      <rect x="30" y="34" width="60" height="14" rx="7" fill="#d06c5c" opacity="0.65" />
      {/* face */}
      {sunglasses ? (
        <g>
          <rect x="34" y="47" width="24" height="13" rx="4" fill={C.ink} />
          <rect x="62" y="47" width="24" height="13" rx="4" fill={C.ink} />
          <line x1="58" y1="51" x2="62" y2="51" stroke={C.ink} strokeWidth="3" />
        </g>
      ) : (
        <>
          <circle cx="45" cy="54" r="3.7" fill={C.ink} />
          <circle cx="75" cy="54" r="3.7" fill={C.ink} />
        </>
      )}
      <path d="M52 66 Q60 73 68 66" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" />
      {blush && (
        <>
          <ellipse cx="34" cy="64" rx="6" ry="4" fill="#e88b82" opacity="0.7" />
          <ellipse cx="86" cy="64" rx="6" ry="4" fill="#e88b82" opacity="0.7" />
        </>
      )}
    </svg>
  );
};

export const CrabArm: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity?: number;
}> = ({x1, y1, x2, y2, opacity = 1}) => {
  const mx = x1 + (x2 - x1) * 0.55;
  const my = y1 + (y2 - y1) * 0.35 - 18;
  return (
    <svg width="1280" height="720" style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity}}>
      <path d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} fill="none" stroke={C.ink} strokeWidth="13" strokeLinecap="round" />
      <path d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} fill="none" stroke={C.crab} strokeWidth="9" strokeLinecap="round" />
      <circle cx={x2} cy={y2} r="11" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
    </svg>
  );
};
