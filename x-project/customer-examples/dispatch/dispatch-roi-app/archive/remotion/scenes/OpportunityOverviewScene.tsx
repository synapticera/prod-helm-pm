import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const OpportunityOverviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0D1321 0%, #1a2332 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ opacity, textAlign: 'center' }}>
        <h1 style={{ fontSize: 64, fontWeight: 'bold', color: '#F0F6FC', marginBottom: 40 }}>
          Three Transformation Paths
        </h1>
        <div style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
          <div style={{ padding: 30, background: 'rgba(0, 212, 255, 0.1)', borderRadius: 12, border: '2px solid #00D4FF' }}>
            <div style={{ fontSize: 32, color: '#00D4FF', fontWeight: 'bold', marginBottom: 10 }}>CONSERVATIVE</div>
            <div style={{ fontSize: 20, color: '#8BA4C4' }}>0-3 months</div>
          </div>
          <div style={{ padding: 30, background: 'rgba(16, 185, 129, 0.1)', borderRadius: 12, border: '2px solid #10B981' }}>
            <div style={{ fontSize: 32, color: '#10B981', fontWeight: 'bold', marginBottom: 10 }}>MODERATE</div>
            <div style={{ fontSize: 20, color: '#8BA4C4' }}>6-9 months</div>
          </div>
          <div style={{ padding: 30, background: 'rgba(251, 65, 0, 0.1)', borderRadius: 12, border: '2px solid #FB4100' }}>
            <div style={{ fontSize: 32, color: '#FB4100', fontWeight: 'bold', marginBottom: 10 }}>AGGRESSIVE</div>
            <div style={{ fontSize: 20, color: '#8BA4C4' }}>12-15 months</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
