import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { DispatchROIVideo } from './DispatchROIVideo';
import { DispatchROI1Min } from './DispatchROI1Min';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DispatchROI-1Min"
        component={DispatchROI1Min}
        durationInFrames={1800} // 1 minute at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="DispatchROIAnalysis"
        component={DispatchROIVideo}
        durationInFrames={7200} // 4 minutes at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};

registerRoot(RemotionRoot);
