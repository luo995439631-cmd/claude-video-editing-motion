import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {C, COMIC, MONO, Z} from '../theme';
import {T, at, ease, pop, ramp, rnd} from '../timing';
import {AssetPanel} from './AssetPanel';
import {Crab, CrabArm} from './Crab';
import {getInspector, Inspector} from './Inspector';
import {Phone, PhoneScene} from './Phone';
import {KeyCap, SpeechBubble, Sticker, TypingNote} from './Stickers';
import {Timeline} from './Timeline';

const phoneX = 548;
const phoneY = 62;

const Toolbar: React.FC<{t: number; chrome: number}> = ({t, chrome}) => {
  const seconds = Math.min(29, Math.floor(t));
  const ff = Math.min(29, Math.floor((t - seconds) * 30));
  const code = `00:00:${String(seconds).padStart(2, '0')}:${String(ff).padStart(2, '0')}`;
  const rendering = t >= T.exportClick && t < T.bonk;
  const done = t >= T.bonk;
  return (
    <div style={{position: 'absolute', left: 12, top: 10, width: 1256, height: 44, borderBottom: `2px solid ${C.ink}`, opacity: chrome}}>
      <div style={{position: 'absolute', left: 18, top: 14, display: 'flex', gap: 6}}>
        {['#ec7c6e', '#f2cb63', '#82c897'].map((col) => <span key={col} style={{width: 11, height: 11, borderRadius: 10, background: col, border: `1px solid ${C.ink}`}} />)}
      </div>
      <div style={{position: 'absolute', left: 58, top: 11, width: 24, height: 22}}>
        <div style={{position: 'absolute', left: 2, top: 5, width: 18, height: 14, border: `2px solid ${C.ink}`, borderRadius: 3, background: C.red, transform: 'rotate(-8deg)'}} />
        <div style={{position: 'absolute', left: 6, top: 1, width: 5, height: 9, background: C.ink, transform: 'rotate(27deg)'}} />
      </div>
      <div style={{position: 'absolute', left: 90, top: 14, fontFamily: Z, fontSize: 12.5, color: C.ink}}>小克剪辑_最终版_打死不改(3).mp4</div>
      <div style={{position: 'absolute', left: 536, top: 8, width: 152, height: 28, borderRadius: 15, background: C.ink, color: C.white, fontFamily: Z, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: 1}}>{code}</div>
      <div style={{position: 'absolute', left: 705, top: 15, fontFamily: Z, fontSize: 10.5, color: C.muted}}>· 已自动保存</div>
      <div style={{position: 'absolute', left: 1068, top: 8, width: 62, height: 25, border: `1.5px solid ${C.ink}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: Z, fontSize: 11, color: C.inkSoft}}>1080p</div>
      <div
        style={{
          position: 'absolute',
          left: 1140,
          top: 6,
          width: 104,
          height: 30,
          borderRadius: 9,
          border: `1.8px solid ${C.ink}`,
          background: done ? '#d8edd4' : rendering ? C.yellow : C.teal,
          color: C.ink,
          fontFamily: Z,
          fontSize: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.10)',
          gap: 5,
        }}
      >
        {done ? '完成 ✓' : rendering ? '渲染中 99%' : '⇧ 导出'}
      </div>
      {rendering ? (
        <div style={{position: 'absolute', left: 1140, top: 36, width: 104, height: 4, background: '#e2d6c3', borderRadius: 4}}>
          <div style={{width: `${ramp(t, T.exportClick, T.bonk, 8, 100)}%`, height: 4, background: C.red, borderRadius: 4}} />
        </div>
      ) : null}
    </div>
  );
};

export const EditorUI: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const insp = getInspector(t);
  const build = ramp(t, T.buildIn, T.buildIn + 0.42);
  const chrome = t < 25.55 ? 1 : ramp(t, 25.55, 26.05, 1, 0.10);
  const end = t >= T.endcard;
  const zoom = 1 + 0.20 * ease(t, 15.9, 17.35) * (1 - ease(t, 18.4, 18.95));
  const shake = t > 17.95 && t < 18.55 ? Math.sin(t * 70) * 3 : 0;

  const tab: 'assets' | 'transition' | 'text' = t < T.transitionTab ? 'assets' : t < 12.35 ? 'transition' : 'text';
  const selected = t > 13.0 ? 'text' : t > 9.9 ? 'transition' : t > 2.9 ? 'cat' : 'night';
  const clips = ease(t, 2.55, 4.1);
  const wave = ease(t, 4.0, 5.5);
  const playTime = Math.min(10.4, Math.max(0, (t - 1.6) * 0.42));

  let scene: PhoneScene = 'black';
  if (t >= 2.2) scene = 'night';
  if (t >= 6.05) scene = 'ramen';
  if (t >= 10.05) scene = 'cat';
  if (t >= 15.42) scene = 'disco';
  if (t >= 26.25) scene = 'night';
  if (t >= 27.35) scene = 'cat';
  if (t >= 28.35) scene = 'disco';

  const stamp = t > 11.85 && t < 13.45 ? '已提交' : t > 13.55 && t < 15.3 ? '已修正' : undefined;
  const social = t > 26.45;
  const focus = t > 6.0 && t < 6.75;

  const crabX = t < 5 ? 132 : t < 12.2 ? 154 : t < 23.4 ? 176 : t < 26.2 ? 760 : 974;
  const crabY = t < 26.2 ? 388 : 526;
  const crabScale = t < 26.2 ? 0.76 : 1.05;
  const crabArms = t > 26.2 ? 'up' : 'down';
  const sunglasses = (t > 17.1 && t < 18.7) || t > 25.0;

  const showTrash = t > 7.75 && t < 11.0;
  const trashDrop = spring({frame: Math.max(0, frame - at(8.0)), fps: 30, config: {damping: 10, stiffness: 180, mass: 0.55}});
  const keyP = pop(frame, T.ctrlZ, 10, 170, 0.55);
  const stick = (time: number, x: number, y: number, text: string, opts: any = {}) => {
    const p = pop(frame, time, 12, 150, 0.6);
    return <Sticker x={x} y={y} text={text} scale={p} opacity={ramp(t, time, time + 0.12)} {...opts} />;
  };

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${(0.985 + 0.015 * build) * zoom}) translate(${shake}px, ${shake * 0.4}px)`,
          transformOrigin: '50% 44%',
          opacity: build,
        }}
      >
        {/* paper texture */}
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(30,24,18,0.11) 0.7px, transparent 0.8px)', backgroundSize: '8px 8px', opacity: 0.12}} />

        {/* shell */}
        <div style={{position: 'absolute', left: 12, top: 10, width: 1256, height: 700, background: 'rgba(251,247,240,0.96)', border: `2px solid ${C.ink}`, borderRadius: 18, boxShadow: '0 4px 0 rgba(33,26,18,0.14)', opacity: chrome}} />
        <Toolbar t={t} chrome={chrome} />

        <AssetPanel t={t} tab={tab} selected={selected} opacity={chrome} />
        <Inspector t={t} opacity={chrome} />
        <Timeline t={t} playTime={playTime} markers={t > T.markers} clips={clips} wave={wave} opacity={chrome} />

        {/* phone + soft shadow */}
        <div style={{position: 'absolute', left: phoneX, top: phoneY, transform: 'scale(0.9)', transformOrigin: 'top left', zIndex: 8}}>
          <Phone
            scene={scene}
            t={t}
            social={social}
            caption={social}
            filter={`saturate(${insp.saturation / 100}) brightness(${1 + (insp.saturation - 100) / 900})`}
            focus={focus}
            stamp={stamp}
            posed={t > 28.55}
          />
        </div>
        <div style={{position: 'absolute', left: 595, top: 383, fontFamily: Z, fontSize: 12, color: C.muted, opacity: chrome, display: 'flex', gap: 12}}>
          <span>⏮</span><span>▶</span><span>⏭</span>
        </div>

        {/* long arm annotations */}
        {t > 2.95 && t < 3.9 ? <CrabArm x1={crabX + 52} y1={crabY + 38} x2={196} y2={225} opacity={ramp(t, 2.95, 3.2) * (1 - ramp(t, 3.6, 3.9))} /> : null}
        {t > 16.0 && t < 18.65 ? <CrabArm x1={crabX + 52} y1={crabY + 38} x2={1178} y2={162} opacity={ramp(t, 16.0, 16.3) * (1 - ramp(t, 18.3, 18.65))} /> : null}
        {t > 23.85 && t < 26.2 ? <CrabArm x1={crabX + 52} y1={crabY + 38} x2={1200} y2={32} opacity={ramp(t, 23.85, 24.1) * (1 - ramp(t, 25.45, 25.7))} /> : null}

        {/* crab */}
        <div style={{position: 'absolute', left: crabX, top: crabY, zIndex: 22}}>
          <Crab x={0} y={0} scale={crabScale} arms={crabArms} sunglasses={sunglasses} blush={t > 12} rotate={t > 25.5 && t < 26.2 ? -6 : 0} />
        </div>

        {/* stickers / speech */}
        {t > T.crabIn && t < 4.25 ? <SpeechBubble x={180} y={380} text="开工！" width={92} scale={pop(frame, T.crabIn)} opacity={1 - ramp(t, 3.7, 4.25)} /> : null}
        {t > 5.75 && t < 7.8 ? <SpeechBubble x={466} y={440} text="这段在发呆 zzz" width={150} scale={pop(frame, 5.75)} opacity={1 - ramp(t, 7.2, 7.8)} /> : null}
        {showTrash ? <TrashVisual t={t} drop={trashDrop} frame={frame} /> : null}
        {t > 7.9 && t < 10.2 ? <Sticker x={452} y={595} text="哐当!" size={48} color={C.yellow} rotate={-5} scale={pop(frame, 7.95, 9, 170, 0.55)} opacity={1 - ramp(t, 9.6, 10.2)} /> : null}
        {t > 9.9 && t < 12.3 ? <Sticker x={374} y={300} text="空心入网!" size={40} color="#71d2ca" rotate={-4} scale={pop(frame, 9.95, 10, 170, 0.55)} opacity={1 - ramp(t, 11.8, 12.3)} /> : null}
                        {t > 13.2 && t < 15.2 ? <Sticker x={300} y={420} text="撤销!" size={35} color="#62d2c8" rotate={-2} scale={pop(frame, 13.2, 10, 160, 0.55)} opacity={1 - ramp(t, 14.7, 15.2)} /> : null}
        {t > 14.15 && t < 15.5 ? <KeyCap x={230} y={505} text="Ctrl+Z" scale={keyP} opacity={1 - ramp(t, 15.25, 15.5)} rotate={-2} /> : null}
        {t > 16.8 && t < 18.8 ? stick(17.15, 360, 100, '饱和度:拉满', {size: 34, color: '#f05a9e', rotate: -2}) : null}
        {t > 17.8 && t < 18.85 ? <SpeechBubble x={350} y={320} text="……太亮了" width={128} scale={pop(frame, 17.8)} opacity={1 - ramp(t, 18.5, 18.85)} /> : null}
        {t > 21.45 && t < 24.2 ? stick(21.45, 282, 365, '卡点!', {size: 38, color: '#67cfc7', rotate: -4}) : null}
        {t > 25.5 && t < 26.6 ? stick(25.5, 642, 395, "BONK!", {size: 62, color: C.yellow, rotate: -8, font: COMIC, strokeWidth: 4}) : null}
        {t > 25.52 && t < 25.72 ? <div style={{position: "absolute", inset: 0, background: "#fff", opacity: 0.55 * (1 - ramp(t, 25.52, 25.72)), zIndex: 80, pointerEvents: "none"}} /> : null}

        {/* 卡点 button */}
        <div style={{position: 'absolute', left: 1120, top: 608, width: 88, height: 30, border: `2px solid ${C.ink}`, borderRadius: 8, background: t > T.markers ? C.yellow : C.paper, fontFamily: Z, fontSize: 15, color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: t > T.markers ? chrome : 0}}>▽ 卡点</div>

        {/* end card */}
        {end ? <EndCardOverlay t={t} /> : null}
      </div>
      {t < 1.72 ? <Terminal t={t} /> : null}
    </AbsoluteFill>
  );
};

const TrashVisual: React.FC<{t: number; drop: number; frame: number}> = ({t, drop, frame}) => {
  const y = 522 + (1 - drop) * 30;
  return (
    <>
      <div style={{position: 'absolute', left: 432, top: y, zIndex: 25}}>
        <svg width="82" height="106" viewBox="0 0 82 106">
          <ellipse cx="41" cy="102" rx="28" ry="5" fill="rgba(30,24,18,0.15)" />
          <path d="M12 24 L70 24 L64 92 Q41 102 18 92 Z" fill="#c8c2b6" stroke={C.ink} strokeWidth="2.5" />
          <path d="M8 18 L74 18 L70 30 L12 30 Z" fill="#aaa397" stroke={C.ink} strokeWidth="2.5" />
          <path d="M28 12 Q41 4 54 12" fill="none" stroke={C.ink} strokeWidth="3" />
          {[30, 41, 52].map((x) => <line key={x} x1={x} y1="34" x2={x - 2} y2="86" stroke="#8e887c" strokeWidth="2" />)}
        </svg>
      </div>
      {t < 9.8 ? <SpeechBubble x={500} y={474} text="拜拜~" width={74} scale={pop(frame, 8.05)} opacity={1 - ramp(t, 9.4, 9.8)} /> : null}
    </>
  );
};

const Terminal: React.FC<{t: number}> = ({t}) => {
  const out = ramp(t, 1.42, 1.68, 1, 0);
  const code1 = 'const 剪辑软件 = 小克.写代码()';
  const code2 = '剪辑软件.画出(时间轴, 预览, 面板)';
  const code3 = '小克.钻';
  const p1 = Math.floor(ramp(t, 0.18, 0.62) * code1.length);
  const p2 = Math.floor(ramp(t, 0.62, 1.04) * code2.length);
  const p3 = Math.floor(ramp(t, 1.04, 1.38) * code3.length);
  const blink = Math.floor(t * 4) % 2 === 0;
  return (
    <div style={{position: 'absolute', inset: 0, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1, transform: `scale(${1 + (1 - out) * 0.05})`}}>
      <div style={{width: 660, height: 250, background: C.paper, border: `2px solid ${C.ink}`, borderRadius: 12, boxShadow: '0 3px 0 rgba(33,26,18,0.15)', overflow: 'hidden', transform: `scale(${out})`, opacity: out}}>
        <div style={{height: 34, background: '#ece4d8', borderBottom: `1.5px solid ${C.ink}`, display: 'flex', alignItems: 'center', padding: '0 12px', position: 'relative'}}>
          {['#ec7c6e', '#f2cb63', '#82c897'].map((c) => <span key={c} style={{width: 10, height: 10, borderRadius: 10, background: c, border: `1px solid ${C.ink}`, marginRight: 6}} />)}
          <div style={{position: 'absolute', left: 0, right: 0, textAlign: 'center', fontFamily: Z, fontSize: 12, color: C.inkSoft}}>小克.js — 终端</div>
        </div>
        <div style={{padding: '22px 28px', fontFamily: MONO, fontSize: 18, lineHeight: 2, color: C.ink}}>
          <div style={{clipPath: `inset(0 ${Math.max(0, 100 - (p1 / code1.length) * 100)}% 0 0)`}}>
            <span style={{color: '#b9b0a3'}}>1</span>　<span style={{color: '#8656b8'}}>const</span> <span style={{color: '#c65b4c'}}>剪辑软件</span> = <span style={{color: '#2c9a91'}}>小克</span>.<span style={{color: '#3b6bb0'}}>写代码</span>()
          </div>
          <div style={{clipPath: `inset(0 ${Math.max(0, 100 - (p2 / code2.length) * 100)}% 0 0)`}}>
            <span style={{color: '#b9b0a3'}}>2</span>　<span style={{color: '#c65b4c'}}>剪辑软件</span>.<span style={{color: '#3b6bb0'}}>画出</span>(<span style={{color: '#c79532'}}>时间轴, 预览, 面板</span>)
          </div>
          <div style={{position: 'relative'}}>
            <div style={{clipPath: `inset(0 ${Math.max(0, 100 - (p3 / code3.length) * 100)}% 0 0)`}}>
              <span style={{color: '#b9b0a3'}}>3</span>　<span style={{color: '#c65b4c'}}>小克</span>.<span style={{color: '#3b6bb0'}}>钻</span>
            </div>
            <span style={{position: 'absolute', left: 66 + p3 * 19, top: 0, color: '#b95042', opacity: blink ? 1 : 0}}>▍</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EndCardOverlay: React.FC<{t: number}> = ({t}) => {
  const n1 = ramp(t, T.note1, T.note1 + 0.2);
  const n2 = ramp(t, T.note2, T.note2 + 0.2);
  const n3 = ramp(t, T.note3, T.note3 + 0.2);
  return (
    <>
      <div style={{position: 'absolute', left: 42, top: 158, width: 372, height: 238, zIndex: 55}}>
        <TypingNote
          x={0}
          y={0}
          line1={n1 > 0.1 ? '30 秒剪完,' : ''}
          line2={n2 > 0.1 ? 'Opus 5.5' : undefined}
          line3={n3 > 0.1 ? '— 小克 收工✨' : undefined}
          scale={0.96 + n1 * 0.04}
          opacity={0.98}
          rotate={-2}
        />
      </div>
      {Array.from({length: 26}).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 120 + rnd(i, 4) * 1040,
            top: 80 + rnd(i, 7) * 480,
            width: 5 + rnd(i, 9) * 8,
            height: 7 + rnd(i, 11) * 10,
            background: [C.yellow, C.pink, C.teal, C.lavender, C.red][i % 5],
            border: `1px solid ${C.ink}`,
            transform: `rotate(${rnd(i, 13) * 180}deg)`,
            opacity: ramp(t, T.endcard + 0.1, T.endcard + 0.5) * 0.9,
            zIndex: 52,
          }}
        />
      ))}
    </>
  );
};





