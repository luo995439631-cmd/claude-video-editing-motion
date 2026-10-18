import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, staticFile} from 'remotion';
import {EditorUI} from './components/EditorUI';
import {C, fontFaces} from './theme';

export const Video: React.FC = () => {
  const [handle] = useState(() => delayRender('Loading fonts'));
  const [, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      document.fonts.load('20px "ZCOOL KuaiLe"'),
      document.fonts.load('20px "Caveat"'),
      document.fonts.load('20px "Luckiest Guy"'),
      document.fonts.ready,
    ])
      .then(() => {
        setReady(true);
        continueRender(handle);
      })
      .catch(() => {
        setReady(true);
        continueRender(handle);
      });
  }, [handle]);

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      <style>{fontFaces}</style>
      <Audio src={staticFile('audio/soundtrack.wav')} volume={1} />
      <EditorUI />
    </AbsoluteFill>
  );
};
