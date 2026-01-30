# Mike Boosinger Call Summary - Consolidated Analysis

**Date Range:** January 24-26, 2026
**Sources:** 4 transcripts from calls with Mike Boosinger (Eureka)

---

## Key Takeaways

### 1. Core Problem Statement
Mike needs a **low-cost alternative to enterprise success platforms** (like Gainsight) that mid-market/SMB companies can actually afford and maintain. The tool should provide a true 360-view of the customer without requiring dedicated BI teams or additional systems.

### 2. The Vision: "Next Generation BI"
- **Conversational, AI-driven dashboards** that auto-configure and surface insights
- No need for dedicated BI people or manual dashboard building
- AI must build trust through transparency: "Show me the idea and tell me what report you looked at"
- Dynamic recommendations: "Here are the 5 reports we recommend. What do you think?"

### 3. Platform Strategy Decision
- Helm's Concierge Analytics is **~90% at parity** with native Salesforce capabilities
- Salesforce-native is nice for security/connection but **not a tier-one focus**
- Better to build dynamic BI experience **outside Salesforce** to avoid "Salesforce tax"
- Deep linking can bridge the workflow gap

### 4. Critical Business Goals
Mike explicitly stated what he cares about:
- **Customer retention risk** - identifying at-risk accounts
- **Expansion possibilities** - spotting growth opportunities
- **Employee happiness and retention**
- **Cost optimization** - reducing cost center while maintaining quality

### 5. The Staffing Use Case
Three open CS positions (PS person, SMB support, enterprise support). Mike wants to:
- **Not fill the SMB support position** if the tool can handle enough cases
- Use data to prove this is viable (30%+ case automation target)
- Focus AI analysis on SMB cases (enterprise cases are typically product issues)

---

## Capabilities Requested

| # | Capability | Description | Priority |
|---|------------|-------------|----------|
| 1 | **Conversational Dashboarding** | AI-driven dashboard recommendations; users can accept/dismiss; reduces cognitive load | High |
| 2 | **Concierge Analytics** | Automated insights surfacing key trends across forms and data sources | High |
| 3 | **360 Customer View** | Unified view combining: CSM activity, tickets, success metrics, tool usage data | High |
| 4 | **Team Performance Comparison** | Compare core metrics (cases closed) across team members doing similar jobs | High |
| 5 | **Trend Analysis Over Time** | Historical graphs showing performance trends (30-day views, etc.) | High |
| 6 | **Slack Integration** | Pull unstructured communication data to correlate with case activity | Medium |
| 7 | **Preventive Case Analysis** | AI identifies what % of cases it could handle autonomously | High |
| 8 | **Multi-BU Switching** | Global switcher for business units that are "three incredibly different" | Medium |
| 9 | **Performance Correlation** | Correlate metrics with complexity factors (explain low numbers with context) | Medium |
| 10 | **Activity Signal Tracking** | Track implicit signals (case record updates per day, response timing) | Medium |
| 11 | **Data Hygiene Alerts** | Identify issues like wrong case owner associations | Low |
| 12 | **Eureka Customer BI** | Provide Eureka customers with their own AI-driven dashboards for form data | Future |

---

## Specific Feature Requests

### Dynamic BI Requirements
- Auto-recommend dashboards based on role/context
- Allow users to dismiss reports ("don't show me this anymore")
- Show reasoning: "This is why I think this" with link to underlying data
- Near real-time data updates (current: daily button push)

### Team Performance Dashboard
- Cases closed per rep
- Case complexity correlation
- Trending data over time
- Comparison view for people doing similar jobs
- Identify underperformers with context

### Data Integration Needs
- **Salesforce cases** - core metrics (closed, open, time to resolution)
- **Email traffic** - already routed through Salesforce
- **Slack communications** - channels by customer, internal discussions about cases
- **Experience Cloud session tracking** - user behavior data
- **Activity signals** - record updates, response timing

### Trust-Building Features
- Show details initially so user can verify AI conclusions
- Link AI insights to source reports
- Allow drilling into underlying data
- Gradual transition from "I want to see everything" to "just bubble it up"

---

## Strategic Insights

### What Mid-Market Actually Needs
> "In the enterprise world there's a market for [Gainsight], but in the rest of the world it's like no one has time/money for that... If we can make the AI happen so readily here, then why would I buy that?"

### The Automation Goal
> "Did the tool then say, 'Hey Mike, I just realized that 30% of the cases I can handle'... That's obviously the key reason why we're doing all this."

### SMB Focus Rationale
> "Enterprise cases handled by higher tiers are typically big product issues... That's why I really think we should be focusing on SMB for this [preventive analysis]."

### The BI Value Proposition
> "Eureka customers with endless data in our forms... doing nothing with it. Imagine having a dashboard: here's all the opportunities you have, here's the trends we picked up on."

---

## Open Questions / Decisions Needed

1. **Salesforce Native vs. External Platform** - Need more prototyping to assess "Salesforce tax"
2. **Managed Package Strategy** - Business model implications of packaging approach
3. **Security Concerns** - Some customers will balk at data leaving Salesforce
4. **Slack Integration Architecture** - Formal linkage vs. AI-driven matching

---

## Next Steps Identified

- [ ] Keep hardening the dynamic BI environment
- [ ] Fix filtering and data segmentation issues
- [ ] Address data hygiene (case owner association issue)
- [ ] Build team comparison metrics with trending
- [ ] Prototype Slack integration
- [ ] Validate 30%+ case automation hypothesis with SMB data

---

*Summary generated from transcripts dated 2026-01-24 through 2026-01-26*
