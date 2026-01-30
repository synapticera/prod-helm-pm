import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { TitleScene } from './scenes/TitleScene';
import { OpportunityOverviewScene } from './scenes/OpportunityOverviewScene';
import { CurrentStateScene } from './scenes/CurrentStateScene';
import { ScenarioScene } from './scenes/ScenarioScene';
import { ConclusionScene } from './scenes/ConclusionScene';

export const DispatchROI1Min: React.FC = () => {
  // Condensed scene timings for 1-minute video (30fps)
  const sceneDurations = {
    title: 240,        // 8s - Quick title + hook
    scenarios: 360,    // 12s - All three scenarios rapid-fire
    departments: 360,  // 12s - Department highlights
    financial: 390,    // 13s - EBITDA & EV impact
    conclusion: 450,   // 15s - Call to action
  };

  let startFrame = 0;
  const getNextStart = (duration: number) => {
    const current = startFrame;
    startFrame += duration;
    return current;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D1321' }}>
      {/* Scene 1: Title & Hook (8s) */}
      <Sequence from={getNextStart(sceneDurations.title)} durationInFrames={sceneDurations.title}>
        <TitleScene />
        <Audio src={staticFile('audio/scene1-fast.mp3')} />
      </Sequence>

      {/* Scene 2: Three Scenarios Rapid (12s) */}
      <Sequence from={getNextStart(sceneDurations.scenarios)} durationInFrames={sceneDurations.scenarios}>
        <OpportunityOverviewScene />
        <Audio src={staticFile('audio/scene2-fast.mp3')} />
      </Sequence>

      {/* Scene 3: Department Impact (12s) */}
      <Sequence from={getNextStart(sceneDurations.departments)} durationInFrames={sceneDurations.departments}>
        <CurrentStateScene />
        <Audio src={staticFile('audio/scene3-fast.mp3')} />
      </Sequence>

      {/* Scene 4: Financial Impact (13s) */}
      <Sequence from={getNextStart(sceneDurations.financial)} durationInFrames={sceneDurations.financial}>
        <ScenarioScene
          scenario="aggressive"
          savings="$10.0M"
          reduction="53%"
          investment="$1.9M"
          roi="6.5x"
          payback="30x EV Return"
        />
        <Audio src={staticFile('audio/scene4-fast.mp3')} />
      </Sequence>

      {/* Scene 5: Conclusion (15s) */}
      <Sequence from={getNextStart(sceneDurations.conclusion)} durationInFrames={sceneDurations.conclusion}>
        <ConclusionScene />
        <Audio src={staticFile('audio/scene5-fast.mp3')} />
      </Sequence>
    </AbsoluteFill>
  );
};
