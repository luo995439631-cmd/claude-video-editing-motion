import React from 'react';
import {C, COMIC, HAND, Z} from '../theme';
import {rnd} from '../timing';

export type PhoneScene = 'black' | 'night' | 'ramen' | 'cat' | 'disco' | 'white';

const W = 184;
const H = 344;

const Stars: React.FC<{t: number; n?: number}> = ({t, n = 26}) => (
  <>
    {Array.from({length: n}).map((_, i) => {
      const x = 8 + rnd(i, 3) * 168;
      const y = 8 + rnd(i, 7) * 150;
      const r = i % 7 === 0 ? 1.8 : 1.1;
      const o = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(t * 2.2 + i));
      return <circle key={i} cx={x} cy={y} r={r} fill={C.white} opacity={o} />;
    })}
  </>
);

export const NightCity: React.FC<{t: number; social?: boolean; caption?: boolean}> = ({t, social, caption}) => {
  const buildings = [
    {x: 2, w: 26, h: 80}, {x: 26, w: 22, h: 112}, {x: 48, w: 30, h: 70},
    {x: 74, w: 24, h: 128}, {x: 96, w: 26, h: 96}, {x: 120, w: 22, h: 140},
    {x: 140, w: 30, h: 86}, {x: 166, w: 18, h: 110},
  ];
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b2056" />
          <stop offset="0.55" stopColor="#39306e" />
          <stop offset="1" stopColor="#171a45" />
        </linearGradient>
        <mask id="moonMask">
          <rect width={W} height={H} fill="white" />
          <circle cx="143" cy="73" r="23" fill="black" />
        </mask>
      </defs>
      <rect width={W} height={H} fill="url(#nightSky)" />
      <Stars t={t} />
      <circle cx="132" cy="78" r="26" fill="#f6d97d" mask="url(#moonMask)" />
      <path d="M22 52 L74 86" stroke={C.white} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M74 86 L64 82 M74 86 L70 77" stroke={C.white} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      {buildings.map((b, bi) => (
        <g key={bi}>
          <rect x={b.x} y={H - b.h} width={b.w} height={b.h} fill={bi % 2 ? '#24275e' : '#1c2050'} stroke="#111535" strokeWidth="0.8" />
          {Array.from({length: Math.floor((b.h - 8) / 15)}).map((_, row) =>
            Array.from({length: Math.floor((b.w - 5) / 9)}).map((_, col) => {
              const on = rnd(bi * 31 + row * 7 + col, 9) > 0.34;
              return on ? (
                <rect
                  key={`${row}-${col}`}
                  x={b.x + 4 + col * 9}
                  y={H - b.h + 7 + row * 15}
                  width="5"
                  height="7"
                  fill="#f4d35e"
                  opacity={0.55 + 0.35 * rnd(bi + row + col, 4)}
                />
              ) : null;
            })
          )}
        </g>
      ))}
      <rect y="300" width={W} height="44" fill="#101334" opacity="0.65" />
      {social ? <SocialOverlay variant="night" t={t} /> : null}
      {caption ? (
        <g fontFamily={Z} fill={C.white}>
          <text x="12" y="316" fontSize="8.5">@小克 · Opus 5.5</text>
          <text x="12" y="329" fontSize="7" opacity="0.85">#AI剪辑 #卡点 #code2video</text>
        </g>
      ) : null}
    </svg>
  );
};

export const Ramen: React.FC<{t: number}> = ({t}) => {
  const steam = 0.45 + 0.2 * Math.sin(t * 2.2);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <rect width={W} height={H} fill="#f6e3c1" />
      <rect width={W} height="42" fill="#3e5187" />
      <text x="58" y="31" fontFamily={Z} fontSize="27" fill={C.white} letterSpacing="10">拉 面</text>
      <circle cx="158" cy="16" r="7" fill={C.white} opacity="0.9" />
      <circle cx="158" cy="16" r="2.5" fill="#3e5187" />
      <circle cx="30" cy="16" r="5" fill="none" stroke={C.white} strokeWidth="1.4" opacity="0.7" />
      <rect y="300" width={W} height="44" fill="#d6a46e" />
      <line x1="0" y1="300" x2={W} y2="300" stroke="#a97848" strokeWidth="2" />
      <path d="M28 252 Q92 226 156 252 L146 292 Q92 314 38 292 Z" fill="#f8f3e8" stroke={C.ink} strokeWidth="2" />
      <ellipse cx="92" cy="254" rx="51" ry="27" fill="#d89654" stroke="#a76132" strokeWidth="1.5" />
      <path d="M44 254 Q92 236 140 254" fill="none" stroke="#f2c98c" strokeWidth="3" opacity="0.8" />
      {Array.from({length: 7}).map((_, i) => (
        <path key={i} d={`M${56 + i * 12} 268 Q${70 + i * 10} 240 ${92 + i * 6} 262`} fill="none" stroke="#f4d88d" strokeWidth="2.2" opacity="0.9" />
      ))}
      <ellipse cx="70" cy="250" rx="13" ry="10" fill="#f3ead6" stroke="#c7a46a" strokeWidth="1" />
      <circle cx="70" cy="250" r="5" fill="#e8a23d" />
      <circle cx="112" cy="248" r="10" fill="#f5eee0" stroke="#d9c4a0" strokeWidth="1" />
      <path d="M112 248 m-4 -1 a4 4 0 1 1 4 5" fill="none" stroke="#d56f80" strokeWidth="1.5" />
      <path d="M94 262 q7 -10 14 0 q-7 9 -14 0" fill="#4e8b5c" />
      <path d="M56 246 q-8 -6 -12 2" fill="none" stroke="#3f7b51" strokeWidth="3" />
      <path d="M126 66 L86 232 M136 68 L96 234" stroke="#8b5a33" strokeWidth="4" strokeLinecap="round" />
      <path d="M72 218 C60 198 82 190 70 172 C62 158 78 150 74 136" fill="none" stroke={C.white} strokeWidth="4" strokeLinecap="round" opacity={steam} />
      <path d="M98 220 C88 202 108 194 96 176" fill="none" stroke={C.white} strokeWidth="3" strokeLinecap="round" opacity={steam * 0.8} />
      <g fill="#f3d269">
        {Array.from({length: 6}).map((_, i) => <path key={i} d={`M${20 + rnd(i, 2) * 140} ${70 + rnd(i, 5) * 120} l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z`} opacity={0.55 + rnd(i, 8) * 0.4} />)}
      </g>
    </svg>
  );
};

export const Cat: React.FC<{t: number; social?: boolean; caption?: boolean; stamp?: string}> = ({t, social, caption, stamp}) => {
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <rect width={W} height={H} fill="#bfe7d7" />
      {Array.from({length: 22}).map((_, i) => (
        <circle key={i} cx={8 + rnd(i, 12) * 168} cy={8 + rnd(i, 18) * 330} r={1.3} fill="#ffffff" opacity="0.55" />
      ))}
      <ellipse cx="92" cy="270" rx="60" ry="70" fill="#d58a48" stroke="#6f4a2f" strokeWidth="2" />
      <ellipse cx="92" cy="278" rx="34" ry="52" fill="#f7e7cc" />
      <path d="M50 158 L38 106 L78 132 Z" fill="#d58a48" stroke="#6f4a2f" strokeWidth="2" />
      <path d="M134 158 L146 106 L106 132 Z" fill="#d58a48" stroke="#6f4a2f" strokeWidth="2" />
      <path d="M48 142 L44 116 L66 132 Z" fill="#f3b7b0" />
      <path d="M136 142 L140 116 L118 132 Z" fill="#f3b7b0" />
      <circle cx="92" cy="170" r="58" fill="#d58a48" stroke="#6f4a2f" strokeWidth="2" />
      <ellipse cx="92" cy="188" rx="32" ry="24" fill="#f8ead2" />
      <ellipse cx="72" cy="164" rx="5" ry="6" fill="#3b2a20" />
      <ellipse cx="112" cy="164" rx="5" ry="6" fill="#3b2a20" />
      <circle cx="73" cy="162" r="1.6" fill="white" />
      <circle cx="113" cy="162" r="1.6" fill="white" />
      <path d="M88 182 L92 186 L96 182" fill="none" stroke="#3b2a20" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M92 186 Q86 194 80 188 M92 186 Q98 194 104 188" fill="none" stroke="#3b2a20" strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="63" cy="181" rx="8" ry="4" fill="#ef9b9b" opacity="0.7" />
      <ellipse cx="121" cy="181" rx="8" ry="4" fill="#ef9b9b" opacity="0.7" />
      <path d="M140 210 q22 2 20 30" fill="none" stroke="#d58a48" strokeWidth="12" strokeLinecap="round" />
      <path d="M140 210 q22 2 20 30" fill="none" stroke="#6f4a2f" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <ellipse cx="62" cy="303" rx="18" ry="12" fill="#f8ead2" stroke="#6f4a2f" strokeWidth="1.5" />
      <ellipse cx="122" cy="303" rx="18" ry="12" fill="#f8ead2" stroke="#6f4a2f" strokeWidth="1.5" />
      <path d="M139 112 q-6 -11 3 -18 q9 8 3 18 q-4 6 -6 0z" fill="#e97891" />
      <path d="M47 132 q-6 -11 3 -18 q9 8 3 18 q-4 6 -6 0z" fill="#e97891" opacity="0.8" />
      <g transform="translate(0 282)">
        <rect x="24" y="0" width="136" height="28" rx="8" fill="#f4d268" stroke={C.ink} strokeWidth="3" />
        <text x="92" y="20" textAnchor="middle" fontFamily={Z} fontSize="17" fill={C.ink} letterSpacing="1">前方高能预警</text>
      </g>
      {social ? <SocialOverlay variant="cat" t={t} /> : null}
      {caption ? (
        <g fontFamily={Z} fill={C.ink}>
          <text x="12" y="316" fontSize="8.5">@小克 · Opus 5.5</text>
          <text x="12" y="329" fontSize="7" opacity="0.7">#AI剪辑 #卡点 #code2video</text>
        </g>
      ) : null}
      {stamp ? (
        <g transform="translate(118 96) rotate(-13)">
          <rect x="-52" y="-20" width="104" height="40" rx="5" fill="none" stroke="#71b584" strokeWidth="4" />
          <text x="0" y="8" textAnchor="middle" fontFamily={Z} fontSize="20" fill="#71b584" letterSpacing="2">{stamp}</text>
        </g>
      ) : null}
    </svg>
  );
};

export const Disco: React.FC<{t: number; social?: boolean; caption?: boolean; posed?: boolean}> = ({t, social, caption, posed}) => {
  const beat = Math.sin(t * Math.PI * 2 * 1.53);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="discoBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#563b80" />
          <stop offset="0.55" stopColor="#b86d9a" />
          <stop offset="1" stopColor="#3b326f" />
        </linearGradient>
        <pattern id="checker" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#c5b0ea" />
          <rect x="12" y="12" width="12" height="12" fill="#c5b0ea" />
          <rect x="12" width="12" height="12" fill="#4f4b84" />
          <rect y="12" width="12" height="12" fill="#4f4b84" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#discoBg)" />
      <g opacity="0.35">
        <polygon points="92,62 10,250 50,250" fill="#ffe4a8" />
        <polygon points="92,62 130,250 174,250" fill="#ffe4a8" />
        <polygon points="92,62 70,250 108,250" fill="#ffd3e7" />
      </g>
      <path d="M0 264 L184 264 L184 344 L0 344 Z" fill="url(#checker)" opacity="0.8" />
      <path d="M0 264 L184 264 L160 344 L24 344 Z" fill="none" stroke="#d9c8ff" strokeWidth="1" opacity="0.45" />
      {Array.from({length: 8}).map((_, i) => (
        <line key={i} x1={92 + (i - 3.5) * 12} y1="264" x2={92 + (i - 3.5) * 26} y2="344" stroke="#f0e2ff" strokeWidth="0.8" opacity="0.25" />
      ))}
      <line x1="92" y1="0" x2="92" y2="26" stroke="#f2e6ff" strokeWidth="2" />
      <circle cx="92" cy="54" r="27" fill="#cfc3f5" stroke="#5b4a8a" strokeWidth="2" />
      {[-18, -9, 0, 9, 18].map((dx) => <path key={dx} d={`M${92 + dx} 29 Q${92 + dx + 10} 54 ${92 + dx} 79`} fill="none" stroke="#8f7cc4" strokeWidth="1" opacity="0.7" />)}
      {[-18, -9, 0, 9, 18].map((dy) => <path key={dy} d={`M65 ${54 + dy} Q92 ${54 + dy - 10} 119 ${54 + dy}`} fill="none" stroke="#8f7cc4" strokeWidth="1" opacity="0.7" />)}
      <circle cx="83" cy="45" r="7" fill="#f6f0ff" opacity="0.8" />
      {/* crab */}
      <g transform={`translate(92 224) rotate(${posed ? -3 : 0})`}>
        <line x1="-28" y1="-20" x2="-46" y2="-43" stroke={C.crabDark} strokeWidth="9" strokeLinecap="round" />
        <line x1="28" y1="-20" x2="46" y2="-43" stroke={C.crabDark} strokeWidth="9" strokeLinecap="round" />
        <circle cx="-49" cy="-47" r="7" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
        <circle cx="49" cy="-47" r="7" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
        <rect x="-32" y="-24" width="64" height="48" rx="12" fill={C.crab} stroke={C.ink} strokeWidth="2.5" />
        <circle cx="-12" cy="-6" r="3.6" fill={C.ink} />
        <circle cx="12" cy="-6" r="3.6" fill={C.ink} />
        <path d="M-10 8 Q0 15 10 8" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
        <circle cx="-21" cy="5" r="5" fill="#e88d86" opacity="0.7" />
        <circle cx="21" cy="5" r="5" fill="#e88d86" opacity="0.7" />
        <line x1="-20" y1="24" x2="-23" y2="40" stroke={C.crabDark} strokeWidth="7" strokeLinecap="round" />
        <line x1="20" y1="24" x2="23" y2="40" stroke={C.crabDark} strokeWidth="7" strokeLinecap="round" />
      </g>
      {Array.from({length: 7}).map((_, i) => (
        <path key={i} d={`M${16 + rnd(i, 3) * 150} ${100 + rnd(i, 8) * 130} l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z`} fill="#f6e7a7" opacity={0.55 + 0.4 * Math.abs(Math.sin(t * 2 + i))} />
      ))}
      {social ? <SocialOverlay variant="disco" t={t} /> : null}
      {caption ? (
        <g fontFamily={Z} fill={C.white}>
          <text x="12" y="316" fontSize="8.5">@小克 · Opus 5.5</text>
          <text x="12" y="329" fontSize="7" opacity="0.85">#AI剪辑 #卡点 #code2video</text>
        </g>
      ) : null}
      {posed ? (
        <g transform="translate(92 300) rotate(-3)">
          <text textAnchor="middle" fontFamily={Z} fontSize="25" fill={C.yellow} stroke={C.ink} strokeWidth="5" paintOrder="stroke" letterSpacing="1">拿捏了!</text>
        </g>
      ) : null}
    </svg>
  );
};

const SocialOverlay: React.FC<{variant: 'night' | 'cat' | 'disco'; t: number}> = ({variant}) => {
  const counts = variant === 'night' ? ['1.5w', '279'] : variant === 'cat' ? ['9.4w', '2255'] : ['10.2w', '2333'];
  const dark = variant === 'cat';
  const col = dark ? C.ink : C.white;
  return (
    <g>
      <circle cx="158" cy="44" r="14" fill={C.crab} stroke={col} strokeWidth="1.5" />
      <circle cx="153" cy="42" r="2" fill={col} />
      <circle cx="163" cy="42" r="2" fill={col} />
      <path d="M150 49 Q158 56 166 49" fill="none" stroke={col} strokeWidth="1.2" strokeLinecap="round" />
      <g transform="translate(145 88)" fill={col}>
        <path d="M0 0 C-7 -8 3 -14 7 -6 C11 -14 21 -8 14 0 L7 7 Z" />
        <text x="0" y="24" fontFamily={Z} fontSize="8">{counts[0]}</text>
      </g>
      <g transform="translate(146 134)" fill={col}>
        <rect x="0" y="0" width="18" height="14" rx="5" fill="none" stroke={col} strokeWidth="1.5" />
        <circle cx="5" cy="7" r="1" />
        <circle cx="9" cy="7" r="1" />
        <circle cx="13" cy="7" r="1" />
        <text x="0" y="28" fontFamily={Z} fontSize="8">{counts[1]}</text>
      </g>
      <g transform="translate(145 186)" fill="none" stroke={col} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 16 L4 2 L18 8 L4 14" />
        <path d="M1 18 Q8 24 15 18" />
        <text x="0" y="36" fill={col} stroke="none" fontFamily={Z} fontSize="8">分享</text>
      </g>
    </g>
  );
};

export const Phone: React.FC<{
  scene: PhoneScene;
  t: number;
  social?: boolean;
  caption?: boolean;
  filter?: string;
  focus?: boolean;
  stamp?: string;
  posed?: boolean;
  style?: React.CSSProperties;
}> = ({scene, t, social, caption, filter = 'none', focus, stamp, posed, style}) => {
  return (
    <div style={{width: 200, height: 360, background: '#191817', borderRadius: 36, padding: 8, boxShadow: '0 10px 24px rgba(30,22,16,0.25)', position: 'relative', ...style}}>
      <div style={{width: 184, height: 344, borderRadius: 28, overflow: 'hidden', background: '#0b0b0b', position: 'relative', filter}}>
        {scene === 'black' && <div style={{width: '100%', height: '100%', background: '#0d0d0d'}} />}
        {scene === 'night' && <NightCity t={t} social={social} caption={caption} />}
        {scene === 'ramen' && <Ramen t={t} />}
        {scene === 'cat' && <Cat t={t} social={social} caption={caption} stamp={stamp} />}
        {scene === 'disco' && <Disco t={t} social={social} caption={caption} posed={posed} />}
        {focus && (
          <div style={{position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(2.5px)'}}>
            <svg width="184" height="344">
              {[[24, 108], [160, 108], [24, 236], [160, 236]].map(([x, y], i) => (
                <path key={i} d={i % 2 === 0 ? `M${x} ${y + 14} L${x} ${y} L${x + 14} ${y}` : `M${x - 14} ${y} L${x} ${y} L${x} ${y + 14}`} fill="none" stroke={C.white} strokeWidth="3" strokeLinecap="round" />
              ))}
              <circle cx="92" cy="172" r="22" fill="none" stroke={C.white} strokeWidth="3" strokeDasharray="7 6" opacity={0.7 + 0.3 * Math.sin(t * 8)} />
              <text x="92" y="230" textAnchor="middle" fontFamily={Z} fontSize="18" fill={C.white} stroke={C.ink} strokeWidth="4" paintOrder="stroke">对焦中..</text>
            </svg>
          </div>
        )}
        <div style={{position: 'absolute', top: 7, left: '50%', transform: 'translateX(-50%)', width: 62, height: 12, borderRadius: 10, background: '#111'}} />
        <div style={{position: 'absolute', top: 29, left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, borderRadius: 5, background: '#1e2b4f'}} />
        <div style={{position: 'absolute', top: 100, right: 5, width: 2, height: 50, borderRadius: 2, background: '#373431'}} />
        <div style={{position: 'absolute', top: 84, left: 5, width: 2, height: 26, borderRadius: 2, background: '#373431'}} />
        <div style={{position: 'absolute', top: 118, left: 5, width: 2, height: 42, borderRadius: 2, background: '#373431'}} />
      </div>
      <div style={{position: 'absolute', top: 0, left: 0, width: 200, height: 360, borderRadius: 36, boxShadow: 'inset 0 0 0 2px #333, inset 0 0 18px rgba(255,255,255,0.08)', pointerEvents: 'none'}} />
    </div>
  );
};
