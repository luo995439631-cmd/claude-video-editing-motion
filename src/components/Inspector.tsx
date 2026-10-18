import React from 'react';
import {C, Z} from '../theme';
import {ramp} from '../timing';

export const getInspector = (t: number) => {
  const flash = t < 15.9 ? 0 : t < 16.5 ? ramp(t, 15.9, 16.5, 0, 70) : 70;
  const saturation =
    t < 16.5 ? 100 : t < 17.2 ? ramp(t, 16.5, 17.2, 100, 225) : t < 18.05 ? 225 : t < 18.5 ? ramp(t, 18.05, 18.5, 225, 110) : 110;
  const zoom = t < 18.9 ? 0 : t < 19.6 ? ramp(t, 18.9, 19.6, 0, 60) : 60;
  return {flash, saturation, zoom, speed: 1};
};

const Slider: React.FC<{
  label: string;
  value: number;
  suffix?: string;
  color?: string;
  warn?: boolean;
}> = ({label, value, suffix = '%', color = C.teal, warn}) => {
  const p = Math.max(0, Math.min(1, value / (suffix === 'x' ? 2 : suffix === '%' && label === '饱和度' ? 250 : 100)));
  return (
    <div style={{marginTop: 13}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: Z, fontSize: 15, color: C.inkSoft}}>
        <span>{label}</span>
        <span style={{color: warn ? C.red : C.ink, fontSize: 14}}>{suffix === 'x' ? value.toFixed(1) : Math.round(value)}{suffix}</span>
      </div>
      <div style={{position: 'relative', height: 7, marginTop: 7, borderRadius: 8, background: '#e5ddd1', border: `1px solid ${C.ink}`}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: `${p * 100}%`, height: 5, borderRadius: 8, background: color}} />
        <div style={{position: 'absolute', left: `calc(${p * 100}% - 7px)`, top: -4, width: 14, height: 14, borderRadius: 14, background: C.paper, border: `2px solid ${warn ? C.red : C.ink}`}} />
        {warn ? <div style={{position: 'absolute', left: '76%', top: -26, fontFamily: Z, color: C.red, fontSize: 15, whiteSpace: 'nowrap'}}>爆表!!</div> : null}
      </div>
    </div>
  );
};

export const Inspector: React.FC<{t: number; opacity?: number}> = ({t, opacity = 1}) => {
  const v = getInspector(t);
  return (
    <div style={{position: 'absolute', left: 1004, top: 62, width: 248, height: 300, border: `2px solid ${C.ink}`, borderRadius: 14, background: 'rgba(255,251,245,0.55)', padding: '11px 14px', opacity}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 7, borderBottom: `1px solid ${C.ink}`, fontFamily: Z, fontSize: 21, color: C.ink}}>
        调整 <span style={{color: C.yellow, fontSize: 23, WebkitTextStroke: `1px ${C.ink}`, fontFamily: 'serif'}}>✦</span>
      </div>
      <Slider label="闪光" value={v.flash} />
      <Slider label="饱和度" value={v.saturation} warn={t > 16.5 && t < 18.5} />
      <Slider label="缩放冲击" value={v.zoom} />
      <Slider label="速度" value={v.speed} suffix="x" />
    </div>
  );
};
