import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  // Title fade in
  const titleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtitle fade in
  const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
      }}
    >
      {/* Dispatch Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          marginBottom: 60,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32">
          <path
            d="M16 2L28 9v14l-12 7-12-7V9l12-7z"
            fill="#5FD068"
          />
          <path
            d="M16 8l8 4.5v9L16 26l-8-4.5v-9L16 8z"
            fill="#1a1a1a"
          />
          <path
            d="M14 12h4v3h3l-5 7v-5h-4l2-5z"
            fill="#5FD068"
          />
        </svg>
      </div>

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 72,
          fontWeight: 'bold',
          color: '#F0F6FC',
          marginBottom: 30,
          textAlign: 'center',
        }}
      >
        AI Opportunity Analysis
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: 36,
          color: '#8BA4C4',
          textAlign: 'center',
        }}
      >
        Strategic ROI Assessment
      </div>

      {/* ARR Badge */}
      <div
        style={{
          opacity: subtitleOpacity,
          marginTop: 60,
          padding: '20px 40px',
          borderRadius: 50,
          border: '2px solid #FB4100',
          background: 'rgba(251, 65, 0, 0.1)',
          color: '#FB4100',
          fontSize: 28,
          fontWeight: '600',
          boxShadow: '0 0 20px rgba(251, 65, 0, 0.3)',
        }}
      >
        $25.7M ARR
      </div>
    </AbsoluteFill>
  );
};
