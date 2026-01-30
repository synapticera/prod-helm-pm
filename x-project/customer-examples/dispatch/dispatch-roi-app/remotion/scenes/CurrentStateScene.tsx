import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const CurrentStateScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1]);
  const contentOpacity = interpolate(frame, [20, 40], [0, 1]);

  const departments = [
    { name: 'Customer Success', spend: '$2.8M', pct: '15%' },
    { name: 'R&D / Engineering', spend: '$6.3M', pct: '33%' },
    { name: 'Sales', spend: '$4.6M', pct: '24%' },
    { name: 'Marketing', spend: '$1.0M', pct: '5%' },
    { name: 'G&A / Finance', spend: '$4.3M', pct: '23%' },
  ];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0D1321 0%, #1a2332 100%)',
        padding: 80,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ opacity: titleOpacity }}>
        <h1 style={{ fontSize: 56, fontWeight: 'bold', color: '#F0F6FC', marginBottom: 20 }}>
          Current State
        </h1>
        <p style={{ fontSize: 24, color: '#8BA4C4', marginBottom: 60 }}>
          Annual Operating Expenses: $19.0M
        </p>
      </div>

      <div style={{ opacity: contentOpacity }}>
        {departments.map((dept, idx) => (
          <div
            key={dept.name}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 30px',
              marginBottom: 20,
              background: 'rgba(30, 41, 59, 0.6)',
              borderRadius: 12,
              border: '1px solid rgba(139, 164, 196, 0.2)',
              transform: `translateX(${interpolate(frame, [30 + idx * 5, 50 + idx * 5], [-100, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}px)`,
            }}
          >
            <span style={{ fontSize: 24, color: '#F0F6FC', fontWeight: '600' }}>
              {dept.name}
            </span>
            <div style={{ display: 'flex', gap: 40, alignItems: 'baseline' }}>
              <span style={{ fontSize: 32, color: '#00D4FF', fontWeight: 'bold' }}>
                {dept.spend}
              </span>
              <span style={{ fontSize: 20, color: '#8BA4C4' }}>
                {dept.pct} of total
              </span>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
