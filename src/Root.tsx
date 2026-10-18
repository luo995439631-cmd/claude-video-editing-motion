import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="EditorMotion"
    component={Video}
    durationInFrames={900}
    fps={30}
    width={1280}
    height={720}
  />
);
