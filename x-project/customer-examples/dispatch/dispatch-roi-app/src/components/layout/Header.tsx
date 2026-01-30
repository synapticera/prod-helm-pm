'use client';

import DispatchLogo from '@/components/shared/DispatchLogo';
import { FileDown, Play } from 'lucide-react';

export default function Header() {
  const handleDownloadReport = () => {
    window.open('/api/generate-pdf', '_blank');
  };

  const handleWatchVideo = () => {
    window.open('/api/video', '_blank');
  };

  return (
    <header className="border-b border-border backdrop-blur-xl sticky top-0 z-50"
      style={{ background: 'var(--surface)', boxShadow: '0 2px 16px rgba(0, 0, 0, 0.3)' }}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DispatchLogo className="h-8" />
            <div className="h-8 w-px bg-border mx-2" />
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                AI Opportunity Analysis
              </h1>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all hover:scale-105"
              style={{
                background: 'var(--surface)',
                color: 'var(--accent-blue)',
                borderColor: 'var(--accent-blue)',
                boxShadow: 'var(--glow-blue-sm)'
              }}
            >
              <FileDown className="w-4 h-4" />
              <span>Download Report</span>
            </button>

            <button
              onClick={handleWatchVideo}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all hover:scale-105"
              style={{
                background: 'var(--synaptic-orange-subtle)',
                color: 'var(--synaptic-orange)',
                borderColor: 'var(--synaptic-orange)',
                boxShadow: 'var(--glow-orange-sm)'
              }}
            >
              <Play className="w-4 h-4" />
              <span>Watch Video</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
