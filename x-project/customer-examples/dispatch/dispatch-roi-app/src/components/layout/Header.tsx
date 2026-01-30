'use client';

import DispatchLogo from '@/components/shared/DispatchLogo';

export default function Header() {
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
        </div>
      </div>
    </header>
  );
}
