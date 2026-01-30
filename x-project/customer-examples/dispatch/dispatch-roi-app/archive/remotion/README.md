# Dispatch AI ROI Video - Remotion Project

Professional 4-minute video walkthrough of the Dispatch AI ROI analysis.

## Quick Start

### 1. Generate Voiceover Audio

```bash
node remotion/generate-voiceover.js
```

This will create MP3 files in `remotion/audio/` using ElevenLabs API.

### 2. Preview Video

```bash
npx remotion preview remotion/Root.tsx
```

### 3. Render Video

```bash
npx remotion render remotion/Root.tsx DispatchROIAnalysis dispatch-roi-video.mp4
```

## Project Structure

```
remotion/
├── Root.tsx                    # Remotion root with composition
├── DispatchROIVideo.tsx        # Main video composition
├── generate-voiceover.js       # ElevenLabs API script
├── script.md                   # Full video script with timings
├── scenes/                     # Individual scene components
│   ├── TitleScene.tsx
│   ├── CurrentStateScene.tsx
│   ├── OpportunityOverviewScene.tsx
│   ├── ScenarioScene.tsx
│   ├── DepartmentScene.tsx
│   ├── FinancialImpactScene.tsx
│   ├── RoadmapScene.tsx
│   └── ConclusionScene.tsx
└── audio/                      # Generated voiceover files
    ├── scene1.mp3
    ├── scene2.mp3
    └── ...
```

## Video Scenes

1. **Title** (15s) - Dispatch logo, main title
2. **Current State** (20s) - Department spending overview
3. **Opportunity** (20s) - Three scenario introduction
4. **Conservative** (20s) - $2.3M savings scenario
5. **Moderate** (20s) - $6.0M savings scenario
6. **Aggressive** (25s) - $10.0M savings scenario
7. **Dept: Customer Success** (20s) - Department deep dive
8. **Dept: R&D** (15s) - Department deep dive
9. **Financial Impact** (25s) - EBITDA & EV gains
10. **Investment Returns** (20s) - 30x EV return multiple
11. **Roadmap** (20s) - Implementation timeline
12. **Conclusion** (20s) - Call to action

**Total**: ~4 minutes (7200 frames @ 30fps)

## Design System

- **Background**: Dark (#0D1321) with subtle gradients
- **Primary Text**: #F0F6FC (white)
- **Secondary Text**: #8BA4C4 (blue-gray)
- **Accent Colors**:
  - Conservative: #00D4FF (cyan)
  - Moderate: #10B981 (green)
  - Aggressive: #FB4100 (orange)
  - Dispatch Green: #5FD068

## Next Steps

The current implementation includes:

- ✅ Video script with scene-by-scene narration
- ✅ ElevenLabs voiceover generation script
- ✅ Main composition structure
- ✅ Title scene
- ✅ Scenario scene template
- ⏳ Additional scene components (CurrentState, Department, Financial, etc.)
- ⏳ Data integration from dispatch-roi.json
- ⏳ Animations and transitions

To complete the video, implement the remaining scene components following the same pattern as TitleScene and ScenarioScene.
