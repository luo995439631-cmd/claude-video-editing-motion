import React from 'react';
import {C, Z} from '../theme';
import {rnd} from '../timing';
import {Cat, Disco, NightCity, Ramen} from './Phone';

const X0 = 72;
const WIDTH = 1140;
const TOTAL = 16;

const sx = (sec: number) => X0 + (sec / TOTAL) * WIDTH;

const Mini: React.FC<{kind: 'night' | 'ramen' | 'cat' | 'disco'}> = ({kind}) => {
  const sc = 0.26;
  const focus = kind === 'night' ? 150 : kind === 'ramen' ? 170 : kind === 'cat' ? 110 : 130;
  return (
    <div style={{width: 48, height: 64, overflow: 'hidden', position: 'relative', flex: '0 0 auto'}}>
      <div style={{position: 'absolute', left: 0, top: -focus * sc, width: 184, height: 344, transform: `scale(${sc})`, transformOrigin: 'top left'}}>
        {kind === 'night' && <NightCity t={0} />}
        {kind === 'ramen' && <Ramen t={0} />}
        {kind === 'cat' && <Cat t={0} />}
        {kind === 'disco' && <Disco t={0} />}
      </div>
    </div>
  );
};

const Clip: React.FC<{
  start: number;
  end: number;
  kind: 'night' | 'ramen' | 'cat' | 'disco';
  label: string;
  color: string;
  y: number;
  h: number;
  app: number;
}> = ({start, end, kind, label, color, y, h, app}) => {
  const w = ((end - start) / TOTAL) * WIDTH;
  if (w * app < 12) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: sx(start),
        top: y,
        width: Math.max(0, w * app),
        height: h,
        background: color,
        border: `2px solid ${C.ink}`,
        borderRadius: 9,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'stretch',
        boxShadow: '0 2px 0 rgba(30,24,18,0.10)',
      }}
    >
      {[0, 1, 2, 3].map((i) => <Mini key={i} kind={kind} />)}
      <div
        style={{
          position: 'absolute',
          left: 5,
          top: 4,
          background: C.paper,
          border: `1px solid ${C.ink}`,
          borderRadius: 5,
          padding: '1px 7px',
          fontFamily: Z,
          fontSize: 10,
          color: C.ink,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Timeline: React.FC<{t: number; playTime: number; markers?: boolean; clips?: number; wave?: number; opacity?: number}> = ({t, playTime, markers, clips = 1, wave = 1, opacity = 1}) => {
  const px = sx(Math.max(0, Math.min(TOTAL, playTime)));
  return (
    <div style={{position: 'absolute', left: 24, top: 392, width: 1232, height: 296, border: `2px solid ${C.ink}`, borderRadius: 14, background: 'rgba(255,251,245,0.52)', overflow: 'hidden', opacity}}>
      {/* ruler */}
      <div style={{position: 'absolute', left: X0, right: 20, top: 38, height: 1, background: C.ink, opacity: 0.25}} />
      {Array.from({length: 33}).map((_, i) => {
        const sec = i * 0.5;
        const x = sx(sec);
        const major = i % 4 === 0;
        return (
          <div key={i} style={{position: 'absolute', left: x, top: major ? 27 : 32, width: 1, height: major ? 10 : 6, background: C.ink, opacity: major ? 0.55 : 0.28}}>
            {major ? <span style={{position: 'absolute', left: -3, top: -15, fontFamily: Z, fontSize: 10, color: C.muted, whiteSpace: 'nowrap'}}>0:{String(sec).padStart(2, '0')}</span> : null}
          </div>
        );
      })}

      {/* track labels */}
      {[
        {y: 66, label: 'T'},
        {y: 110, label: '▶'},
        {y: 210, label: '♪'},
      ].map((b) => (
        <div key={b.label} style={{position: 'absolute', left: 14, top: b.y, width: 34, height: 30, border: `1.5px solid ${C.ink}`, borderRadius: 6, background: b.label === 'T' ? '#ffe6a1' : b.label === '▶' ? '#c9f0e7' : '#ddd2f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: Z, fontSize: 14}}>
          {b.label}
        </div>
      ))}

      <Clip start={0} end={2.8} kind="night" label="夜景.mp4" color="#4d4780" y={62} h={68} app={clips} />
      <Clip start={2.8} end={8.3} kind="ramen" label="拉面.mp4" color="#f4d9a0" y={62} h={68} app={clips} />
      <Clip start={8.3} end={12} kind="cat" label="柴犬.mov" color="#bfe6d6" y={62} h={68} app={clips} />
      <Clip start={12} end={16} kind="disco" label="小克蹦迪.mp4" color="#bca9e9" y={62} h={68} app={clips} />
      {clips > 0.10 ? (
        <div
          style={{
            position: 'absolute',
            left: sx(5.45),
            top: 62,
            width: ((7.1 - 5.45) / TOTAL) * WIDTH * Math.min(1, clips),
            height: 68,
            border: `2px solid ${C.ink}`,
            borderRadius: 7,
            background: 'repeating-linear-gradient(135deg,#9d998f 0 8px,#c8c2b6 8px 16px)',
            opacity: 0.9,
          }}
        />
      ) : null}

      {/* text track */}
      {clips > 0.10 ? (
        <div style={{position: 'absolute', left: sx(6.55), top: 160, width: ((8.3 - 6.55) / TOTAL) * WIDTH * Math.min(1, clips), height: 24, background: '#f4d268', border: `2px solid ${C.ink}`, borderRadius: 6, fontFamily: Z, fontSize: 13, padding: '2px 8px', whiteSpace: 'nowrap', opacity: clips}}>
          <span style={{color: C.ink}}>T</span> 前方高能预警
        </div>
      ) : null}

      {/* music */}
      {wave > 0.08 ? (
        <div style={{position: 'absolute', left: sx(0), top: 202, width: WIDTH * Math.min(1, wave), height: 35, border: `2px solid ${C.ink}`, borderRadius: 8, background: '#efe9ff', overflow: 'hidden', opacity: wave}}>
          <div style={{position: 'absolute', left: 6, top: 3, fontFamily: Z, fontSize: 9, color: C.inkSoft, zIndex: 2}}>♪ bgm_小克.wav</div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 3, display: 'flex', alignItems: 'flex-end', gap: 2, height: 24}}>
            {Array.from({length: 112}).map((_, i) => (
              <div key={i} style={{width: 4, height: 3 + Math.abs(Math.sin(i * 0.71)) * 19 + rnd(i, 2) * 4, background: '#8d72d0', opacity: 0.7}} />
            ))}
          </div>
        </div>
      ) : null}

      {/* markers */}
      {markers ? (
        <div style={{position: 'absolute', left: X0, top: 248, width: WIDTH, height: 16, opacity: 0.9}}>
          {Array.from({length: 22}).map((_, i) => (
            <div key={i} style={{position: 'absolute', left: (i / 21) * WIDTH, top: 0, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `10px solid ${C.yellow}`, filter: 'drop-shadow(0 1px 0 #1b1a17)'}} />
          ))}
        </div>
      ) : null}

      {/* playhead */}
      <div style={{position: 'absolute', left: px, top: 36, width: 3, height: 224, background: C.red, zIndex: 10}}>
        <div style={{position: 'absolute', left: -7, top: -12, width: 17, height: 20, background: C.red, border: `2px solid ${C.ink}`, borderRadius: '8px 8px 4px 4px'}} />
      </div>

      <div style={{position: 'absolute', right: 16, bottom: 8, fontFamily: Z, fontSize: 10, color: C.muted, opacity: clips}}>
        片段 4 · 总时长 0:10.4
      </div>
      <div style={{position: 'absolute', left: 66, bottom: 9, display: 'flex', alignItems: 'center', gap: 8, fontFamily: Z, fontSize: 10, color: C.muted, opacity: clips}}>
        <span>−</span><div style={{width: 70, height: 2, background: C.ink, opacity: 0.5, position: 'relative'}}><div style={{position: 'absolute', left: 28, top: -4, width: 9, height: 9, borderRadius: 9, border: `1.5px solid ${C.ink}`, background: C.paper}} /></div><span>+</span>
      </div>
    </div>
  );
};


