import React from 'react';
import {C, COMIC, HAND, Z} from '../theme';

export const SpeechBubble: React.FC<{
  x: number;
  y: number;
  text: string;
  width?: number;
  tail?: 'left' | 'right' | 'down';
  scale?: number;
  rotate?: number;
  opacity?: number;
}> = ({x, y, text, width = 120, tail = 'down', scale = 1, rotate = 0, opacity = 1}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        padding: '8px 12px',
        background: C.white,
        border: `2px solid ${C.ink}`,
        borderRadius: 12,
        fontFamily: Z,
        fontSize: 16,
        lineHeight: 1.15,
        color: C.ink,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        transformOrigin: '50% 100%',
        opacity,
        boxShadow: '2px 3px 0 rgba(30,24,18,0.12)',
        zIndex: 30,
      }}
    >
      {text}
      <div
        style={{
          position: 'absolute',
          width: 12,
          height: 12,
          background: C.white,
          borderRight: `2px solid ${C.ink}`,
          borderBottom: `2px solid ${C.ink}`,
          transform: 'rotate(45deg)',
          left: tail === 'left' ? 20 : tail === 'right' ? width - 32 : width / 2 - 6,
          bottom: -8,
        }}
      />
    </div>
  );
};

export const Sticker: React.FC<{
  x: number;
  y: number;
  text: string;
  size?: number;
  color?: string;
  stroke?: string;
  rotate?: number;
  scale?: number;
  opacity?: number;
  font?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}> = ({x, y, text, size = 32, color = C.yellow, stroke = C.ink, rotate = -4, scale = 1, opacity = 1, font = Z, strokeWidth = 3, style}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontFamily: font,
        fontSize: size,
        lineHeight: 1,
        color,
        WebkitTextStroke: `${strokeWidth}px ${stroke}`,
        paintOrder: 'stroke fill',
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        transformOrigin: '50% 50%',
        opacity,
        whiteSpace: 'nowrap',
        textShadow: `0 ${Math.max(2, size * 0.06)}px 0 ${stroke}`,
        zIndex: 40,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

export const Stamp: React.FC<{
  x: number;
  y: number;
  text: string;
  scale?: number;
  opacity?: number;
  rotate?: number;
}> = ({x, y, text, scale = 1, opacity = 1, rotate = -12}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      padding: '7px 14px',
      border: `4px solid ${C.green}`,
      borderRadius: 5,
      color: C.green,
      fontFamily: Z,
      fontSize: 28,
      letterSpacing: 4,
      transform: `scale(${scale}) rotate(${rotate}deg)`,
      opacity,
      background: 'rgba(251,247,240,0.45)',
      boxShadow: `inset 0 0 0 2px ${C.paper}`,
      zIndex: 35,
    }}
  >
    {text}
  </div>
);

export const KeyCap: React.FC<{
  x: number;
  y: number;
  text: string;
  scale?: number;
  opacity?: number;
  rotate?: number;
}> = ({x, y, text, scale = 1, opacity = 1, rotate = -2}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 150,
      height: 104,
      background: '#f4efe5',
      border: `3px solid ${C.ink}`,
      borderRadius: 16,
      boxShadow: `0 8px 0 #d1c5b4, 0 10px 0 ${C.ink}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: Z,
      fontSize: 31,
      color: C.ink,
      transform: `scale(${scale}) rotate(${rotate}deg)`,
      opacity,
      zIndex: 32,
    }}
  >
    {text}
  </div>
);

export const TypingNote: React.FC<{
  x: number;
  y: number;
  line1: string;
  line2?: string;
  line3?: string;
  scale?: number;
  opacity?: number;
  rotate?: number;
}> = ({x, y, line1, line2, line3, scale = 1, opacity = 1, rotate = -2}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 360,
      height: 224,
      background: '#fffdf8',
      border: `2px solid ${C.ink}`,
      borderRadius: 8,
      boxShadow: '4px 7px 0 rgba(30,24,18,0.12)',
      transform: `scale(${scale}) rotate(${rotate}deg)`,
      opacity,
      padding: '26px 24px',
      zIndex: 50,
    }}
  >
    <div style={{position: 'absolute', top: -12, left: 88, width: 94, height: 26, background: '#f3d679', opacity: 0.85, transform: 'rotate(-2deg)'}} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <div key={i} style={{position: 'absolute', left: 12, right: 12, top: 58 + i * 30, height: 1, background: '#e8dfd1'}} />
    ))}
    <div style={{fontFamily: Z, fontSize: 27, color: C.ink, lineHeight: 1.5}}>{line1}</div>
    {line2 ? <div style={{fontFamily: HAND, fontSize: 54, color: C.ink, lineHeight: 1.2, marginTop: 8, textDecoration: 'underline', textDecorationColor: C.red, textDecorationThickness: 3, textUnderlineOffset: 6}}>{line2}</div> : null}
    {line3 ? <div style={{fontFamily: Z, fontSize: 19, color: C.inkSoft, marginTop: 12}}>{line3}</div> : null}
  </div>
);
