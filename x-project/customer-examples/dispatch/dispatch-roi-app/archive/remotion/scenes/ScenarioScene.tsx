import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface ScenarioSceneProps {
  scenario: 'conservative' | 'moderate' | 'aggressive';
  savings: string;
  reduction: string;
  investment: string;
  roi: string;
  payback: string;
}

export const ScenarioScene: React.FC<ScenarioSceneProps> = ({
  scenario,
  savings,
  reduction,
  investment,
  roi,
  payback,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scenarioConfig = {
    conservative: {
      color: '#00D4FF',
      label: 'CONSERVATIVE',
      subtitle: 'Quick Wins • Low Risk',
    },
    moderate: {
      color: '#10B981',
      label: 'MODERATE',
      subtitle: 'Integrated Workflows • Balanced Approach',
    },
    aggressive: {
      color: '#FB4100',
      label: 'AGGRESSIVE',
      subtitle: 'AI-Native Operations • Maximum Impact',
    },
  };

  const config = scenarioConfig[scenario];

  // Animations
  const titleY = spring({
    frame: frame - 10,
    fps,
    config: { damping: 100, stiffness: 200 },
    from: -100,
    to: 0,
  });

  const metricsOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const metricsScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 80, stiffness: 150 },
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0D1321 0%, #1a2332 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: 80,
      }}
    >
      {/* Scenario Header */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: config.color,
            textAlign: 'center',
            marginBottom: 15,
            textShadow: `0 0 30px ${config.color}80`,
          }}
        >
          {config.label}
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#8BA4C4',
            textAlign: 'center',
          }}
        >
          {config.subtitle}
        </div>
      </div>

      {/* Key Metrics */}
      <div
        style={{
          opacity: metricsOpacity,
          transform: `scale(${metricsScale})`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          width: '100%',
          maxWidth: 1200,
        }}
      >
        {/* Annual Savings */}
        <MetricCard
          label="Annual Savings"
          value={savings}
          subtitle={`${reduction} cost reduction`}
          color={config.color}
        />

        {/* Investment */}
        <MetricCard
          label="AI Investment"
          value={investment}
          subtitle={`${roi} ROI multiple`}
          color="#00D4FF"
        />

        {/* Payback Period */}
        <MetricCard
          label="Payback Period"
          value={payback}
          subtitle="Time to full return"
          color="#10B981"
          span={2}
        />
      </div>
    </AbsoluteFill>
  );
};

const MetricCard: React.FC<{
  label: string;
  value: string;
  subtitle: string;
  color: string;
  span?: number;
}> = ({ label, value, subtitle, color, span = 1 }) => {
  return (
    <div
      style={{
        gridColumn: span > 1 ? `span ${span}` : undefined,
        background: 'rgba(30, 41, 59, 0.6)',
        border: `2px solid ${color}40`,
        borderRadius: 16,
        padding: 40,
        boxShadow: `0 0 40px ${color}20`,
      }}
    >
      <div style={{ fontSize: 20, color: '#8BA4C4', marginBottom: 15 }}>
        {label}
      </div>
      <div style={{ fontSize: 56, fontWeight: 'bold', color, marginBottom: 10 }}>
        {value}
      </div>
      <div style={{ fontSize: 18, color: '#F0F6FC80' }}>
        {subtitle}
      </div>
    </div>
  );
};
