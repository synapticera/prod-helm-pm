import {Composition} from 'remotion';
import {DispatchStory} from './DispatchStory';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DispatchStory"
        component={DispatchStory}
        durationInFrames={150 * 30} // 150 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
