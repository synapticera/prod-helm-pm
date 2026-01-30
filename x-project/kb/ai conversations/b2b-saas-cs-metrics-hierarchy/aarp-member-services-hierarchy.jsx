import React from 'react';

const AARPMemberServicesHierarchy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-600 text-white font-bold text-xl px-3 py-1 rounded">AARP</div>
              <h1 className="text-2xl font-bold text-slate-800">Member Services Metrics Hierarchy</h1>
            </div>
            <p className="text-slate-500 text-sm">From Service Interactions to Member & Mission Impact</p>
          </div>
          <div className="text-right text-xs text-slate-400">
            <div>38M+ Members</div>
            <div>50+ Demographic</div>
          </div>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          
          {/* Three Column Layout */}
          <div className="flex items-stretch gap-4">
            
            {/* LEFT COLUMN: Input Metrics */}
            <div className="flex-1 max-w-lg">
              
              {/* Group 1: Inquiry Assessment */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-slate-400 rounded"></div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Group 1: Inquiry Assessment</span>
                </div>
                <div className="text-xs text-slate-400 ml-3 mb-3 italic">"What did the member need?"</div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-700 text-white text-xs px-3 py-2 rounded flex-1">
                      <span className="font-semibold">Volume</span>
                      <span className="text-slate-300 ml-2">per 1K members, by tier/tenure</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-700 text-white text-xs px-3 py-2 rounded flex-1">
                      <span className="font-semibold">Intent</span>
                      <span className="text-slate-300 ml-2">Issue / Question / Request / Feedback</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-700 text-white text-xs px-3 py-2 rounded flex-1">
                      <span className="font-semibold">Service Domain</span>
                      <span className="text-slate-300 ml-2">see categories below</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-700 text-white text-xs px-3 py-2 rounded flex-1">
                      <span className="font-semibold">Root Cause</span>
                      <span className="text-slate-300 ml-2">5 Whys → systemic driver</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-700 text-white text-xs px-3 py-2 rounded flex-1">
                      <span className="font-semibold">Complexity & Severity</span>
                      <span className="text-slate-300 ml-2">1-5 scales</span>
                    </div>
                  </div>
                </div>

                {/* Service Domains Expansion */}
                <div className="mt-3 bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div className="text-xs font-semibold text-slate-600 mb-2">Service Domains (Topic Categories)</div>
                  <div className="grid grid-cols-2 gap-1 text-xs text-slate-500">
                    <div>• Medicare & Insurance</div>
                    <div>• Financial Services</div>
                    <div>• Membership & Billing</div>
                    <div>• Discounts & Benefits</div>
                    <div>• Travel & Leisure</div>
                    <div>• Digital & Technical</div>
                    <div>• Advocacy & Policy</div>
                    <div>• Events & Community</div>
                  </div>
                </div>
              </div>

              {/* Group 2: Response Assessment */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-red-500 rounded"></div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Group 2: Response Assessment</span>
                </div>
                <div className="text-xs text-slate-400 ml-3 mb-3 italic">"How did we serve the member?"</div>
                
                {/* Effectiveness Drivers */}
                <div className="mb-4">
                  <div className="text-xs text-red-600 font-medium mb-2 ml-1">Effectiveness Drivers → Retention & Engagement</div>
                  <div className="space-y-2 border-l-2 border-red-200 pl-3">
                    <div className="bg-red-600 text-white text-xs px-3 py-2 rounded">
                      <span className="font-semibold">Preventability</span>
                      <span className="text-red-200 ml-2">deflection opportunity</span>
                    </div>
                    <div className="bg-red-600 text-white text-xs px-3 py-2 rounded">
                      <span className="font-semibold">Resolution Quality</span>
                      <span className="text-red-200 ml-2">MSAT, FCR, completeness</span>
                    </div>
                    <div className="bg-red-600 text-white text-xs px-3 py-2 rounded">
                      <span className="font-semibold">Team Performance</span>
                      <span className="text-red-200 ml-2">agent scores, coaching flags</span>
                    </div>
                    <div className="bg-red-700 text-white text-xs px-3 py-2 rounded border-2 border-red-400">
                      <span className="font-semibold">★ Partner Coordination</span>
                      <span className="text-red-200 ml-2">handoff quality to/from partners</span>
                    </div>
                    <div className="bg-red-700 text-white text-xs px-3 py-2 rounded border-2 border-red-400">
                      <span className="font-semibold">★ Mission Alignment</span>
                      <span className="text-red-200 ml-2">connected to advocacy/empowerment?</span>
                    </div>
                  </div>
                </div>
                
                {/* Efficiency Drivers */}
                <div>
                  <div className="text-xs text-blue-600 font-medium mb-2 ml-1">Efficiency Drivers → Cost & Scalability</div>
                  <div className="space-y-2 border-l-2 border-blue-200 pl-3">
                    <div className="bg-blue-600 text-white text-xs px-3 py-2 rounded">
                      <span className="font-semibold">Channel Mix</span>
                      <span className="text-blue-200 ml-2">phone, digital, mail, in-person</span>
                    </div>
                    <div className="bg-blue-600 text-white text-xs px-3 py-2 rounded">
                      <span className="font-semibold">Resolution Speed</span>
                      <span className="text-blue-200 ml-2">time to resolution, bottlenecks</span>
                    </div>
                    <div className="bg-blue-600 text-white text-xs px-3 py-2 rounded">
                      <span className="font-semibold">Resolution Cost</span>
                      <span className="text-blue-200 ml-2">cost per interaction, automation %</span>
                    </div>
                    <div className="bg-blue-700 text-white text-xs px-3 py-2 rounded border-2 border-blue-400">
                      <span className="font-semibold">★ Accessibility</span>
                      <span className="text-blue-200 ml-2">service across ability levels</span>
                    </div>
                  </div>
                </div>

                {/* AARP-specific callout */}
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded p-2">
                  <div className="text-xs text-amber-700">
                    <span className="font-semibold">★ = AARP-specific extensions</span> reflecting partner ecosystem, mission focus, and 50+ demographic needs.
                  </div>
                </div>
              </div>
            </div>

            {/* ARROW 1 */}
            <div className="flex items-center justify-center w-10">
              <svg width="36" height="400" viewBox="0 0 36 400">
                <defs>
                  <linearGradient id="arrowGradAARP1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                </defs>
                <polygon points="0,120 0,280 32,200" fill="url(#arrowGradAARP1)" />
              </svg>
            </div>

            {/* MIDDLE COLUMN: Intermediate Outcomes */}
            <div className="w-72">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 text-center">Intermediate Outcomes</div>
              
              {/* Member Effectiveness */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <div className="text-sm font-bold text-red-800 mb-1">Member Effectiveness</div>
                  <div className="text-xs text-red-600 mb-3">"Are we serving members well?"</div>
                  
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-2 shadow-sm">
                      <div className="text-sm font-bold text-red-700">Renewal Rate</div>
                      <div className="text-xs text-slate-500">Annual membership retention</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm">
                      <div className="text-sm font-bold text-red-700">Engagement Score</div>
                      <div className="text-xs text-slate-500">Multi-channel participation</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm">
                      <div className="text-sm font-bold text-red-700">Partner NPS</div>
                      <div className="text-xs text-slate-500">Satisfaction with partner services</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-red-600 font-medium">Weight: 50%</div>
                </div>
              </div>

              {/* Multiplication */}
              <div className="text-center text-2xl font-bold text-slate-300 my-2">×</div>

              {/* Service Efficiency */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-sm font-bold text-blue-800 mb-1">Service Efficiency</div>
                  <div className="text-xs text-blue-600 mb-3">"Are we serving sustainably?"</div>
                  
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-2 shadow-sm">
                      <div className="text-sm font-bold text-blue-700">Cost per Member</div>
                      <div className="text-xs text-slate-500">Service cost / active members</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm">
                      <div className="text-sm font-bold text-blue-700">Digital Adoption</div>
                      <div className="text-xs text-slate-500">Self-service utilization %</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm">
                      <div className="text-sm font-bold text-blue-700">Partner Cost Share</div>
                      <div className="text-xs text-slate-500">% covered by partner royalties</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-blue-600 font-medium">Weight: 50%</div>
                </div>
              </div>
            </div>

            {/* ARROW 2 */}
            <div className="flex items-center justify-center w-10">
              <svg width="36" height="400" viewBox="0 0 36 400">
                <defs>
                  <linearGradient id="arrowGradAARP2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                </defs>
                <polygon points="0,120 0,280 32,200" fill="url(#arrowGradAARP2)" />
              </svg>
            </div>

            {/* RIGHT COLUMN: Business & Mission Impact */}
            <div className="w-60">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 text-center">Impact</div>
              
              {/* Business Impact */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-5 text-center shadow-lg mb-4">
                <div className="text-red-100 text-xs font-semibold uppercase tracking-wide mb-2">Business Impact</div>
                <div className="text-xl font-bold text-white mb-1">Member Services</div>
                <div className="text-xl font-bold text-white mb-3">Impact Index</div>
                
                <div className="bg-white/20 rounded-lg p-2 mb-3">
                  <div className="text-xs text-white font-medium mb-1">Formula</div>
                  <div className="text-xs text-red-100">
                    (Effectiveness × 0.5) + (Efficiency × 0.5)
                  </div>
                </div>
                
                <div className="border-t border-red-400 pt-3">
                  <div className="text-xs text-white font-medium mb-1">Benchmarks</div>
                  <div className="text-xs text-red-100">vs. Peer Associations</div>
                  <div className="text-xs text-red-100">vs. Historical Trend</div>
                </div>
              </div>

              {/* Mission Impact - AARP Specific */}
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-4 text-center shadow-lg">
                <div className="text-slate-300 text-xs font-semibold uppercase tracking-wide mb-2">Mission Impact</div>
                <div className="text-lg font-bold text-white mb-2">Empowerment Index</div>
                
                <div className="space-y-2 text-left">
                  <div className="bg-white/10 rounded p-2">
                    <div className="text-xs text-white font-medium">Advocacy Activation</div>
                    <div className="text-xs text-slate-300">% members engaged in advocacy</div>
                  </div>
                  <div className="bg-white/10 rounded p-2">
                    <div className="text-xs text-white font-medium">Service → Action</div>
                    <div className="text-xs text-slate-300">Inquiries leading to engagement</div>
                  </div>
                  <div className="bg-white/10 rounded p-2">
                    <div className="text-xs text-white font-medium">Member Empowerment</div>
                    <div className="text-xs text-slate-300">Self-reported confidence scores</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: AARP-Specific Context */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            
            {/* Root Cause Categories for AARP */}
            <div className="mb-6">
              <div className="font-bold text-slate-700 mb-3 uppercase tracking-wide text-xs">Root Cause Categories (AARP-Specific)</div>
              <div className="grid grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 rounded p-2 border border-slate-200">
                  <div className="font-semibold text-slate-700">Partner Issues</div>
                  <div className="text-slate-500">UHC claim, bank error, vendor gap</div>
                </div>
                <div className="bg-slate-50 rounded p-2 border border-slate-200">
                  <div className="font-semibold text-slate-700">Member Confusion</div>
                  <div className="text-slate-500">Benefit clarity, eligibility, process</div>
                </div>
                <div className="bg-slate-50 rounded p-2 border border-slate-200">
                  <div className="font-semibold text-slate-700">Digital Barriers</div>
                  <div className="text-slate-500">Login, navigation, accessibility</div>
                </div>
                <div className="bg-slate-50 rounded p-2 border border-slate-200">
                  <div className="font-semibold text-slate-700">Policy/Coverage</div>
                  <div className="text-slate-500">Medicare rules, benefit limits</div>
                </div>
                <div className="bg-slate-50 rounded p-2 border border-slate-200">
                  <div className="font-semibold text-slate-700">Billing/Renewal</div>
                  <div className="text-slate-500">Payment, auto-renew, tier change</div>
                </div>
                <div className="bg-slate-50 rounded p-2 border border-slate-200">
                  <div className="font-semibold text-slate-700">Documentation Gap</div>
                  <div className="text-slate-500">Missing/outdated content</div>
                </div>
                <div className="bg-slate-50 rounded p-2 border border-slate-200">
                  <div className="font-semibold text-slate-700">System/Technical</div>
                  <div className="text-slate-500">Outage, bug, integration</div>
                </div>
                <div className="bg-slate-50 rounded p-2 border border-slate-200">
                  <div className="font-semibold text-slate-700">Process Friction</div>
                  <div className="text-slate-500">Too many steps, handoff gaps</div>
                </div>
              </div>
            </div>

            {/* Segmentation Dimensions */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs">Segmentation Dimensions</div>
                <div className="space-y-1 text-xs text-slate-600">
                  <div><span className="font-semibold text-slate-700">Tenure:</span> New (&lt;1yr), Established (1-5yr), Loyal (5yr+)</div>
                  <div><span className="font-semibold text-slate-700">Tier:</span> Standard, Premium, Lifetime</div>
                  <div><span className="font-semibold text-slate-700">Product Mix:</span> Membership-only, Insurance, Financial, Multi-product</div>
                  <div><span className="font-semibold text-slate-700">Channel Pref:</span> Digital-first, Phone-first, Mail-dependent</div>
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs">Partner Ecosystem Tracking</div>
                <div className="space-y-1 text-xs text-slate-600">
                  <div><span className="font-semibold text-slate-700">UnitedHealth:</span> Medicare Supplement, Medicare Advantage</div>
                  <div><span className="font-semibold text-slate-700">Financial:</span> Credit cards, banking, insurance</div>
                  <div><span className="font-semibold text-slate-700">Travel:</span> Expedia partnership, car rental</div>
                  <div><span className="font-semibold text-slate-700">Retail:</span> Discount network partners</div>
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs">Accessibility Metrics (50+ Focus)</div>
                <div className="space-y-1 text-xs text-slate-600">
                  <div><span className="font-semibold text-slate-700">Phone Wait Time:</span> Critical for phone-dependent members</div>
                  <div><span className="font-semibold text-slate-700">Digital WCAG:</span> Accessibility compliance score</div>
                  <div><span className="font-semibold text-slate-700">Large Print/Audio:</span> Alternative format availability</div>
                  <div><span className="font-semibold text-slate-700">Language Access:</span> Spanish, other languages</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-700 rounded"></div>
                <span className="text-slate-600">Inquiry Assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded"></div>
                <span className="text-slate-600">Effectiveness Drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-slate-600">Efficiency Drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-800 rounded"></div>
                <span className="text-slate-600">Mission Impact</span>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              Adapted for AARP Member Services
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AARPMemberServicesHierarchy;
