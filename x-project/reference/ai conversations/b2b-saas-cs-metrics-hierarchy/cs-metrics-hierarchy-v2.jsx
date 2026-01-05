import React from 'react';

const CSMetricsHierarchy = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">CS Support Metrics Hierarchy</h1>
          <p className="text-sm text-slate-500">From Operational Inputs to Business Impact</p>
        </div>

        {/* Main Flow */}
        <div className="flex items-start gap-10">
          
          {/* Left: Input Metrics */}
          <div className="flex-1 max-w-xl">
            
            {/* Need */}
            <div className="mb-5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">Need</div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-500 text-white text-sm px-4 py-2.5 rounded flex-1">
                    1) How much support demand exists?
                  </div>
                  <div className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded font-semibold w-40 text-center">
                    Case Volume
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-500 text-white text-sm px-4 py-2.5 rounded flex-1">
                    2) What drives support demand?
                  </div>
                  <div className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded font-semibold w-40 text-center">
                    Root Cause
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="mb-5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">Delivery</div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-500 text-white text-sm px-4 py-2.5 rounded flex-1">
                    3) How fast do we resolve issues?
                  </div>
                  <div className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded font-semibold w-40 text-center">
                    Time to Resolution
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-500 text-white text-sm px-4 py-2.5 rounded flex-1">
                    4) How do customers feel about it?
                  </div>
                  <div className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded font-semibold w-40 text-center">
                    Case Satisfaction
                  </div>
                </div>
              </div>
            </div>

            {/* System */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">System</div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-500 text-white text-sm px-4 py-2.5 rounded flex-1">
                    5) How do customers reach us?
                  </div>
                  <div className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded font-semibold w-40 text-center">
                    Channel Mix
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-500 text-white text-sm px-4 py-2.5 rounded flex-1">
                    6) How efficiently do cases flow?
                  </div>
                  <div className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded font-semibold w-40 text-center">
                    Resolution Efficiency
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Intermediate Outcomes */}
          <div className="w-52 flex-shrink-0">
            
            {/* Effectiveness */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 mb-3">
              <div className="text-center">
                <div className="text-sm font-bold text-slate-800 mb-1">Effectiveness</div>
                <div className="text-xs text-slate-500 mb-3">Doing the RIGHT things</div>
                <div className="text-xl font-bold text-blue-600 mb-2">Net Retention</div>
                <div className="text-xs text-slate-500">- Expansion Rate</div>
                <div className="text-xs text-slate-500">- Renewal Rate</div>
              </div>
            </div>

            {/* Multiplication Symbol */}
            <div className="text-center text-2xl font-bold text-slate-300 my-1">×</div>

            {/* Efficiency */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4">
              <div className="text-center">
                <div className="text-sm font-bold text-slate-800 mb-1">Efficiency</div>
                <div className="text-xs text-slate-500 mb-3">Doing things RIGHT</div>
                <div className="text-xl font-bold text-blue-600 mb-2">Cost to Serve</div>
                <div className="text-xs text-slate-500">- Total Cost</div>
                <div className="text-xs text-slate-500">- Total Revenue</div>
              </div>
            </div>
          </div>

          {/* Right: Business Impact */}
          <div className="w-44 flex-shrink-0">
            <div className="bg-slate-800 rounded-lg p-5 text-center">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">Business Impact</div>
              <div className="text-xl font-bold text-white mb-1">CS Impact</div>
              <div className="text-xl font-bold text-white mb-3">Index</div>
              <div className="border-t border-slate-600 pt-3 mt-2">
                <div className="text-xs text-white mb-1">Comparative Benchmark</div>
                <div className="text-xs text-slate-400">vs. Industry</div>
                <div className="text-xs text-slate-400">vs. Historical</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Equation */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-4 bg-slate-100 rounded-lg px-6 py-3">
              <span className="text-sm font-semibold text-slate-700">Effectiveness</span>
              <span className="text-xl font-bold text-slate-300">×</span>
              <span className="text-sm font-semibold text-slate-700">Efficiency</span>
              <span className="text-xl font-bold text-slate-300">=</span>
              <span className="text-sm font-bold text-blue-600">CS Impact Index</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSMetricsHierarchy;
