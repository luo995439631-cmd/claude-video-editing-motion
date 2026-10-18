import {staticFile} from 'remotion';

export const C = {
  bg: '#f2ece4',
  paper: '#fbf7f0',
  paperDeep: '#f3ece1',
  ink: '#1b1a17',
  inkSoft: '#34312c',
  muted: '#8f887d',
  line: '#1d1b18',
  teal: '#68c6be',
  tealDeep: '#2c9a91',
  tealPale: '#d9f1ee',
  yellow: '#f4d268',
  yellowPale: '#ffe8ad',
  pink: '#f6c7d8',
  pinkDeep: '#e98aa8',
  lavender: '#c1b2f4',
  blue: '#b9d7f1',
  red: '#c65b4c',
  crab: '#c45b4b',
  crabDark: '#9d3f34',
  green: '#7fbe8d',
  greenDeep: '#4c9560',
  night: '#1d2258',
  night2: '#403570',
  white: '#fffdf8',
  black: '#11100e',
};

export const Z = '"ZCOOL KuaiLe", "Noto Sans SC", "Microsoft YaHei", sans-serif';
export const HAND = '"Caveat", "Segoe Script", cursive';
export const COMIC = '"Luckiest Guy", Impact, "Arial Black", sans-serif';
export const MONO = 'Consolas, "Courier New", monospace';

export const fontFaces = `
@font-face {
  font-family: 'ZCOOL KuaiLe';
  src: url('${staticFile('fonts/zcool-0.woff2')}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'Luckiest Guy';
  src: url('${staticFile('fonts/luckiest-0.woff2')}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'Caveat';
  src: url('${staticFile('fonts/caveat-0.woff2')}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: block;
}
`;
