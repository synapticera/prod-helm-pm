import React from 'react';
import { AbsoluteFill } from 'remotion';

export const DepartmentScene: React.FC<any> = (props) => {
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0D1321 0%, #1a2332 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: '#F0F6FC',
        fontSize: 48,
      }}
    >
      DepartmentScene - Coming Soon
    </AbsoluteFill>
  );
};
