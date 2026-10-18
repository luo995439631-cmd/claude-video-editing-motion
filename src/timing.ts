import {interpolate, spring} from 'remotion';

export const FPS = 30;
export const DURATION = 900;

export const T = {
  terminalOut: 1.52,
  buildIn: 1.42,
  crabIn: 2.3,
  clipsIn: 3.9,
  focus: 6.0,
  ramen: 6.65,
  trash: 8.0,
  transitionTab: 9.85,
  cat: 10.15,
  submitted: 11.85,
  fixed: 13.55,
  undo: 13.25,
  ctrlZ: 14.25,
  disco: 15.45,
  saturate: 17.15,
  tooBright: 17.95,
  back: 18.45,
  markers: 21.55,
  exportClick: 23.9,
  rendering: 24.85,
  bonk: 25.55,
  endcard: 26.2,
  note1: 26.55,
  note2: 27.9,
  note3: 29.0,
  end: 30,
};

export const at = (sec: number) => Math.round(sec * FPS);

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const ramp = (t: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(t, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const ease = (t: number, a: number, b: number) => {
  const p = ramp(t, a, b);
  return p * p * (3 - 2 * p);
};

export const pop = (frame: number, sec: number, damping = 14, stiffness = 130, mass = 0.65) =>
  spring({
    frame: Math.max(0, frame - at(sec)),
    fps: FPS,
    config: {damping, stiffness, mass},
  });

export const bounce = (frame: number, sec: number) =>
  spring({
    frame: Math.max(0, frame - at(sec)),
    fps: FPS,
    config: {damping: 9, stiffness: 150, mass: 0.55},
  });

// Deterministic pseudo-random for stars, windows, sparkles.
export const rnd = (i: number, seed = 1) => {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453123;
  return x - Math.floor(x);
};

export const typeProgress = (t: number, start: number, count: number, cps = 28) =>
  Math.floor(clamp01((t - start) * cps) * count);
