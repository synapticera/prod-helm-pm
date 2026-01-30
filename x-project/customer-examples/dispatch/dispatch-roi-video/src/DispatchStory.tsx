import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {TitleScene} from './scenes/TitleScene';
import {CurrentStateScene} from './scenes/CurrentStateScene';
import {OpportunityScene} from './scenes/OpportunityScene';
import {DepartmentBreakdownScene} from './scenes/DepartmentBreakdownScene';
import {ROIScene} from './scenes/ROIScene';
import {EVImpactScene} from './scenes/EVImpactScene';
import {CallToActionScene} from './scenes/CallToActionScene';

/**
 * Dispatch AI Opportunity Story
 *
 * Narrative Arc:
 * 1. Title - Who is Dispatch? (5s)
 * 2. Current State - Where they are today (15s)
 * 3. The Opportunity - AI transformation potential (20s)
 * 4. Department Breakdown - Where the value comes from (30s)
 * 5. ROI Story - Financial outcomes (25s)
 * 6. EV Impact - Valuation implications (20s)
 * 7. Call to Action - Next steps (10s)
 *
 * Total: ~2.5 minutes
 */

const SCENE_DURATIONS = {
  title: 5 * 30,           // 5 seconds
  currentState: 15 * 30,   // 15 seconds
  opportunity: 20 * 30,    // 20 seconds
  breakdown: 30 * 30,      // 30 seconds
  roi: 25 * 30,            // 25 seconds
  evImpact: 20 * 30,       // 20 seconds
  cta: 10 * 30,            // 10 seconds
};

export const DispatchStory: React.FC = () => {
  let cumulativeFrames = 0;

  return (
    <AbsoluteFill style={{background: '#050D18'}}>
      {/* Scene 1: Title */}
      <Sequence from={cumulativeFrames} durationInFrames={SCENE_DURATIONS.title}>
        <TitleScene />
      </Sequence>
      {(cumulativeFrames += SCENE_DURATIONS.title)}

      {/* Scene 2: Current State */}
      <Sequence from={cumulativeFrames} durationInFrames={SCENE_DURATIONS.currentState}>
        <CurrentStateScene />
      </Sequence>
      {(cumulativeFrames += SCENE_DURATIONS.currentState)}

      {/* Scene 3: The Opportunity */}
      <Sequence from={cumulativeFrames} durationInFrames={SCENE_DURATIONS.opportunity}>
        <OpportunityScene />
      </Sequence>
      {(cumulativeFrames += SCENE_DURATIONS.opportunity)}

      {/* Scene 4: Department Breakdown */}
      <Sequence from={cumulativeFrames} durationInFrames={SCENE_DURATIONS.breakdown}>
        <DepartmentBreakdownScene />
      </Sequence>
      {(cumulativeFrames += SCENE_DURATIONS.breakdown)}

      {/* Scene 5: ROI Story */}
      <Sequence from={cumulativeFrames} durationInFrames={SCENE_DURATIONS.roi}>
        <ROIScene />
      </Sequence>
      {(cumulativeFrames += SCENE_DURATIONS.roi)}

      {/* Scene 6: EV Impact */}
      <Sequence from={cumulativeFrames} durationInFrames={SCENE_DURATIONS.evImpact}>
        <EVImpactScene />
      </Sequence>
      {(cumulativeFrames += SCENE_DURATIONS.evImpact)}

      {/* Scene 7: Call to Action */}
      <Sequence from={cumulativeFrames} durationInFrames={SCENE_DURATIONS.cta}>
        <CallToActionScene />
      </Sequence>
    </AbsoluteFill>
  );
};
