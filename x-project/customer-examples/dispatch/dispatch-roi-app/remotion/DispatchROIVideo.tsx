import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { TitleScene } from './scenes/TitleScene';
import { CurrentStateScene } from './scenes/CurrentStateScene';
import { OpportunityOverviewScene } from './scenes/OpportunityOverviewScene';
import { ScenarioScene } from './scenes/ScenarioScene';
import { DepartmentScene } from './scenes/DepartmentScene';
import { FinancialImpactScene } from './scenes/FinancialImpactScene';
import { RoadmapScene } from './scenes/RoadmapScene';
import { ConclusionScene } from './scenes/ConclusionScene';

export const DispatchROIVideo: React.FC = () => {
  // Scene timings (in frames at 30fps)
  const sceneDurations = {
    title: 450,           // 15s - Scene 1
    currentState: 600,    // 20s - Scene 2
    opportunity: 600,     // 20s - Scene 3
    conservative: 600,    // 20s - Scene 4
    moderate: 600,        // 20s - Scene 5
    aggressive: 750,      // 25s - Scene 6
    deptCS: 600,          // 20s - Scene 7
    deptRD: 450,          // 15s - Scene 8
    financial: 750,       // 25s - Scene 9
    investment: 600,      // 20s - Scene 10
    roadmap: 600,         // 20s - Scene 11
    conclusion: 600,      // 20s - Scene 12
  };

  let startFrame = 0;
  const getNextStart = (duration: number) => {
    const current = startFrame;
    startFrame += duration;
    return current;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D1321' }}>
      {/* Scene 1: Title */}
      <Sequence from={getNextStart(sceneDurations.title)} durationInFrames={sceneDurations.title}>
        <TitleScene />
        <Audio src={staticFile('audio/scene1.mp3')} />
      </Sequence>

      {/* Scene 2: Current State */}
      <Sequence from={getNextStart(sceneDurations.currentState)} durationInFrames={sceneDurations.currentState}>
        <CurrentStateScene />
        <Audio src={staticFile('audio/scene2.mp3')} />
      </Sequence>

      {/* Scene 3: Opportunity Overview */}
      <Sequence from={getNextStart(sceneDurations.opportunity)} durationInFrames={sceneDurations.opportunity}>
        <OpportunityOverviewScene />
        <Audio src={staticFile('audio/scene3.mp3')} />
      </Sequence>

      {/* Scene 4: Conservative Scenario */}
      <Sequence from={getNextStart(sceneDurations.conservative)} durationInFrames={sceneDurations.conservative}>
        <ScenarioScene
          scenario="conservative"
          savings="$2.3M"
          reduction="12%"
          investment="$380K"
          roi="6.2x"
          payback="2-3 months"
        />
        <Audio src={staticFile('audio/scene4.mp3')} />
      </Sequence>

      {/* Scene 5: Moderate Scenario */}
      <Sequence from={getNextStart(sceneDurations.moderate)} durationInFrames={sceneDurations.moderate}>
        <ScenarioScene
          scenario="moderate"
          savings="$6.0M"
          reduction="32%"
          investment="$950K"
          roi="6.3x"
          payback="6-9 months"
        />
        <Audio src={staticFile('audio/scene5.mp3')} />
      </Sequence>

      {/* Scene 6: Aggressive Scenario */}
      <Sequence from={getNextStart(sceneDurations.aggressive)} durationInFrames={sceneDurations.aggressive}>
        <ScenarioScene
          scenario="aggressive"
          savings="$10.0M"
          reduction="53%"
          investment="$1.9M"
          roi="6.5x"
          payback="12-15 months"
        />
        <Audio src={staticFile('audio/scene6.mp3')} />
      </Sequence>

      {/* Scene 7: Customer Success Department */}
      <Sequence from={getNextStart(sceneDurations.deptCS)} durationInFrames={sceneDurations.deptCS}>
        <DepartmentScene
          name="Customer Success"
          spend="$2.8M"
          ftes={19}
          savings="$1.7M"
          keyPoints={[
            'Autonomous AI handles 60% of tickets',
            'Predictive churn scoring',
            'Voice AI for 24/7 phone coverage'
          ]}
        />
        <Audio src={staticFile('audio/scene7.mp3')} />
      </Sequence>

      {/* Scene 8: R&D Department */}
      <Sequence from={getNextStart(sceneDurations.deptRD)} durationInFrames={sceneDurations.deptRD}>
        <DepartmentScene
          name="R&D / Engineering"
          spend="$6.3M"
          ftes={25}
          savings="$3.5M"
          keyPoints={[
            'AI pair programming (46% AI-generated code)',
            'Automated testing & code review',
            'DevOps automation & incident response'
          ]}
        />
        <Audio src={staticFile('audio/scene8.mp3')} />
      </Sequence>

      {/* Scene 9: Financial Impact */}
      <Sequence from={getNextStart(sceneDurations.financial)} durationInFrames={sceneDurations.financial}>
        <FinancialImpactScene />
        <Audio src={staticFile('audio/scene9.mp3')} />
      </Sequence>

      {/* Scene 10: Investment Returns */}
      <Sequence from={getNextStart(sceneDurations.investment)} durationInFrames={sceneDurations.investment}>
        <FinancialImpactScene showEVReturns />
        <Audio src={staticFile('audio/scene10.mp3')} />
      </Sequence>

      {/* Scene 11: Roadmap */}
      <Sequence from={getNextStart(sceneDurations.roadmap)} durationInFrames={sceneDurations.roadmap}>
        <RoadmapScene />
        <Audio src={staticFile('audio/scene11.mp3')} />
      </Sequence>

      {/* Scene 12: Conclusion */}
      <Sequence from={getNextStart(sceneDurations.conclusion)} durationInFrames={sceneDurations.conclusion}>
        <ConclusionScene />
        <Audio src={staticFile('audio/scene12.mp3')} />
      </Sequence>
    </AbsoluteFill>
  );
};
