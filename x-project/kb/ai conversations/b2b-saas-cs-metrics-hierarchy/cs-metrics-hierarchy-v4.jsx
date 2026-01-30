import React from 'react';

const CSMetricsHierarchy = () => {
  return (
    <div className="min-h-screen bg-white p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Flow */}
        <div className="flex items-center gap-4">
          
          {/* Left: Input Metrics */}
          <div className="flex flex-col gap-5">
            
            {/* Need for Support */}
            <div>
              <div className="bg-[#0d4a5f] text-white text-base font-semibold py-3 px-5 rounded w-72 text-center">
                Need for Support
              </div>
              <div className="mt-1 ml-3 space-y-0.5">
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">Volume</div>
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">Intent</div>
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">Root Cause</div>
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">Complexity</div>
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">Severity</div>
              </div>
            </div>

            {/* Response Effectiveness */}
            <div>
              <div className="bg-[#0d4a5f] text-white text-base font-semibold py-3 px-5 rounded w-72 text-center">
                Response Effectiveness
              </div>
              <div className="mt-1 ml-3 space-y-0.5">
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">Preventability</div>
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">Resolution Quality</div>
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">First Contact Resolution</div>
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">Team Performance</div>
              </div>
            </div>

            {/* Response Efficiency */}
            <div>
              <div className="bg-[#0d4a5f] text-white text-base font-semibold py-3 px-5 rounded w-72 text-center">
                Response Efficiency
              </div>
              <div className="mt-1 ml-3 space-y-0.5">
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">Channel Mix</div>
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">Resolution Mix</div>
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">Resolution Speed</div>
                <div className="bg-[#2db5c9] text-white text-sm font-medium py-2.5 px-5 rounded w-64 text-center">Resolution Cost</div>
              </div>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="flex-shrink-0 w-16 flex items-center justify-center">
            <svg width="55" height="200" viewBox="0 0 55 200" fill="none">
              <polygon points="0,0 35,0 55,100 35,200 0,200 20,100" fill="#d1d5db"/>
            </svg>
          </div>

          {/* Middle: Intermediate Outcomes */}
          <div className="flex flex-col gap-4 self-center">
            
            {/* Effectiveness Box */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-5 w-56 text-center">
              <div className="text-[#0d4a5f] text-sm font-bold mb-0.5">Effectiveness</div>
              <div className="text-slate-500 text-xs mb-3">Doing the RIGHT things</div>
              <div className="text-[#2db5c9] text-lg font-bold mb-2">Net Retention</div>
              <div className="text-slate-500 text-xs leading-relaxed">
                - Expansion Rate<br/>
                - Renewal Rate
              </div>
            </div>

            {/* Multiply Symbol */}
            <div className="text-center text-2xl font-bold text-slate-300">×</div>

            {/* Efficiency Box */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-5 w-56 text-center">
              <div className="text-[#0d4a5f] text-sm font-bold mb-0.5">Efficiency</div>
              <div className="text-slate-500 text-xs mb-3">Doing things RIGHT</div>
              <div className="text-[#2db5c9] text-lg font-bold mb-2">Cost to Serve</div>
              <div className="text-slate-500 text-xs leading-relaxed">
                - Total Cost<br/>
                - Total Revenue
              </div>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="flex-shrink-0 w-16 flex items-center justify-center">
            <svg width="55" height="200" viewBox="0 0 55 200" fill="none">
              <polygon points="0,0 35,0 55,100 35,200 0,200 20,100" fill="#d1d5db"/>
            </svg>
          </div>

          {/* Right: Business Impact */}
          <div className="self-center">
            <div className="bg-[#0d4a5f] rounded-lg p-6 w-52 text-center">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Business Impact</div>
              <div className="text-white text-xl font-bold mb-3">CS Net Impact Index</div>
              <div className="border-t border-[#2db5c9] pt-3">
                <div className="text-white text-xs mb-1">Comparative Benchmark</div>
                <div className="text-slate-400 text-xs leading-relaxed">
                  vs. Industry<br/>
                  vs. Historical
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSMetricsHierarchy;
