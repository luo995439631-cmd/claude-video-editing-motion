import React from 'react';
import {C, Z} from '../theme';
import {Cat, Disco, NightCity, Ramen} from './Phone';

const panel: React.CSSProperties = {
  position: 'absolute',
  left: 24,
  top: 62,
  width: 288,
  height: 316,
  border: `2px solid ${C.ink}`,
  borderRadius: 14,
  background: 'rgba(255,251,245,0.55)',
  overflow: 'hidden',
};

const Thumb: React.FC<{kind: 'night' | 'ramen' | 'cat' | 'disco'; w?: number; h?: number}> = ({kind, w = 122, h = 68}) => {
  const sc = w / 184;
  const focus = kind === 'night' ? 150 : kind === 'ramen' ? 180 : kind === 'cat' ? 90 : 150;
  return (
    <div style={{width: w, height: h, overflow: 'hidden', borderRadius: 5, border: `1.5px solid ${C.ink}`, position: 'relative', background: '#e6ded2'}}>
      <div style={{position: 'absolute', left: 0, top: -focus * sc, width: 184, height: 344, transform: `scale(${sc})`, transformOrigin: 'top left'}}>
        {kind === 'night' && <NightCity t={0} />}
        {kind === 'ramen' && <Ramen t={0} />}
        {kind === 'cat' && <Cat t={0} />}
        {kind === 'disco' && <Disco t={0} />}
      </div>
    </div>
  );
};

const Tab: React.FC<{active: boolean; children: React.ReactNode}> = ({active, children}) => (
  <div style={{width: 74, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${C.ink}`, borderRadius: 7, background: active ? C.yellow : 'transparent', fontFamily: Z, fontSize: 15, color: C.ink, opacity: active ? 1 : 0.65}}>
    {children}
  </div>
);

const Card: React.FC<{label: string; dur?: string; selected?: boolean; children: React.ReactNode}> = ({label, dur, selected, children}) => (
  <div style={{position: 'relative', width: 126}}>
    <div style={{border: `${selected ? 3 : 1.5}px solid ${selected ? C.yellow : C.ink}`, borderRadius: 7, padding: 2, background: C.white}}>{children}</div>
    {dur ? <div style={{position: 'absolute', right: 4, bottom: 22, background: 'rgba(20,18,15,0.7)', color: C.white, fontFamily: Z, fontSize: 8, borderRadius: 3, padding: '0 4px'}}>{dur}</div> : null}
    <div style={{fontFamily: Z, fontSize: 9.5, color: C.muted, textAlign: 'center', marginTop: 3}}>{label}</div>
  </div>
);

export const AssetPanel: React.FC<{t: number; tab: 'assets' | 'transition' | 'text'; selected: string; opacity?: number}> = ({t, tab, selected, opacity = 1}) => {
  return (
    <div style={{...panel, opacity}}>
      <div style={{display: 'flex', gap: 7, padding: '10px 10px 6px'}}>
        <Tab active={tab === 'assets'}>素材</Tab>
        <Tab active={tab === 'transition'}>转场</Tab>
        <Tab active={tab === 'text'}>文字</Tab>
      </div>

      {tab === 'assets' ? (
        <div style={{padding: '3px 10px', display: 'flex', flexWrap: 'wrap', gap: 8}}>
          <Card label="夜景.mp4" dur="2.4s" selected={selected === 'night'}><Thumb kind="night" /></Card>
          <Card label="拉面.mp4" dur="4.6s" selected={selected === 'ramen'}><Thumb kind="ramen" /></Card>
          <Card label="柴犬.mov" dur="2.4s" selected={selected === 'cat'}><Thumb kind="cat" /></Card>
          <Card label="小克蹦迪.mp4" dur="2.8s" selected={selected === 'disco'}><Thumb kind="disco" /></Card>
          {['导入素材', '导入素材'].map((s, i) => (
            <div key={i} style={{width: 126, height: 84, border: `1.5px dashed #b5aea3`, borderRadius: 7, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#afa89c', fontFamily: Z, fontSize: 10}}>
              <div style={{fontSize: 26, lineHeight: 1}}>＋</div><div>{s}</div>
            </div>
          ))}
        </div>
      ) : null}

      {tab === 'transition' ? (
        <div style={{padding: '3px 10px', display: 'flex', flexWrap: 'wrap', gap: 8}}>
          {[
            ['旋转', '◎', '#d9cff7'],
            ['翻页', '▤', '#ccefe8'],
            ['故障', '▧', '#f4ccd9'],
            ['缩放', '⤢', '#cfe4f7'],
            ['滑动', '▶', '#fff0b8'],
            ['溶解', '✶', '#e5d9f7'],
          ].map(([name, icon, bg], i) => (
            <div key={name as string} style={{width: 126, height: 66, border: `2px solid ${selected === 'transition' && i === 2 ? C.yellow : C.ink}`, background: bg as string, borderRadius: 7, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: Z, color: C.ink, fontSize: 12}}>
              <div style={{fontSize: 25}}>{icon}</div><div>{name}</div>
            </div>
          ))}
        </div>
      ) : null}

      {tab === 'text' ? (
        <div style={{padding: '3px 10px', display: 'flex', flexDirection: 'column', gap: 8}}>
          {[
            ['前方高能', '#ffe7a3', C.ink],
            ['好耶~', '#f8c8d8', '#b94f72'],
            ['霓虹 NEON', '#302b53', '#f3d268'],
          ].map(([name, bg, col], i) => (
            <div key={name as string} style={{width: 262, height: 62, border: `${selected === 'text' && i === 0 ? 3 : 2}px solid ${selected === 'text' && i === 0 ? C.yellow : C.ink}`, background: bg as string, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: Z, fontSize: 23, color: col as string}}>
              {name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
