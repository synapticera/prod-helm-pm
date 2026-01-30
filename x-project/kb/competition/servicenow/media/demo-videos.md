# ServiceNow AI Control Tower - Demo Videos & Media Assets

**Last Updated:** 2026-01-29
**Status:** Video analysis in progress

---

## Primary Demo Video

### AI Control Tower Overview Demo
- **URL:** https://www.youtube.com/watch?v=NJDH_LMgbjE&list=PLkGSnjw5y2U7c1YqQwOzFbLu85RB7leJq&index=3
- **Title:** "AI Control Tower"
- **Release Date:** May 2025 (Knowledge 2025)
- **Duration:** TBD (requires extraction)
- **Platform:** YouTube (ServiceNow Official Channel)

#### Demo Description
Demonstrates alignment of enterprise AI initiatives, from strategy through implementation to oversight and compliance, across the entire platform. Enables AI Center of Excellence teams, product owners, and risk/compliance personnel to collaborate on innovation with regulatory oversight.

#### Key Topics Covered (Expected)
- [ ] Strategic AI portfolio management
- [ ] AI asset intake and registration workflow
- [ ] Risk assessment and compliance checking
- [ ] Integration with CMDB/CSDM
- [ ] Performance dashboard and metrics
- [ ] Multi-persona collaboration workflows

#### Screenshots to Extract
- [ ] Main dashboard / landing page
- [ ] AI asset inventory view
- [ ] Risk & compliance workspace
- [ ] Performance metrics dashboard
- [ ] Workflow orchestration interface
- [ ] Integration points (CMDB, GRC)

---

## Related Demo Videos (May 2025 Store Release)

### 2. Now Assist for IRM - Risk Assessment Summarization
- **URL:** https://youtu.be/-E5mkB4xnL8?si=AEiFArqC6S3twcNV
- **Focus:** Automated extraction of key insights from risk assessments
- **Use Case:** Provide quick context for evaluators and decision-makers
- **Relevance to AI Control Tower:** Shows how AI assists with risk management workflows

### 3. Now Assist for IRM - Control Objective Rationalization
- **URL:** https://youtu.be/WDo4YuLPTDA?si=u1XyglqKtBmz4k_W
- **Focus:** Identification and elimination of redundant control objectives
- **Use Case:** Boost team efficiency and compliance adherence
- **Relevance to AI Control Tower:** Demonstrates compliance optimization capabilities

### 4. Now Assist for IRM - Regulatory Change Management
- **URL:** https://youtu.be/T9tOaOqhOno?si=s6BcP2nI1lDAUv4S
- **Focus:** Two capabilities:
  1. Highlighting significant regulatory modifications
  2. Proposing mappings between regulatory alerts and objectives
- **Relevance to AI Control Tower:** Shows regulatory compliance tracking

### 5. Agentic AI - GRC Issue Resolution
- **URL:** https://youtu.be/6akxdYDFju4?si=M4Oh7dP_sMcXUGQZ
- **Focus:** AI-powered agents for "faster, standardized remediation plans for complex risk and compliance issues"
- **Relevance to AI Control Tower:** Demonstrates AI Agent Fabric capabilities

### 6. Entity-Based User Access Configuration
- **URL:** https://youtu.be/fW81FrLr3sw?si=tNJHVfJkbaC0zLr5
- **Focus:** Framework for customizing data segregation by entity
- **Use Case:** Enhanced security and risk mitigation
- **Relevance to AI Control Tower:** Shows governance and access control features

---

## Additional Video Resources

### 7. AI Impact Assessment - Banking Use Case
- **URL:** https://www.youtube.com/watch?v=YdC6fMg2u2M
- **Title:** "How ServiceNow AI Control Tower Does AI Impact Assessment — Real Bank Use Case Explained"
- **Focus:** Real-world example using Indian banking scenario
- **Key Takeaway:** Shows practical application of impact assessment workflow

### 8. Knowledge 2025 Broadcast
- **Event:** "The AI Control Tower + AI Agent Fabric"
- **Date:** May 6, 2025
- **URL:** https://www.servicenow.com/events/knowledge/2025/sessions/may-6-broadcast--the-ai-control-tower--ai-agent-fabric.html
- **Format:** Live broadcast with Q&A
- **Content:** Product announcement, demo, partner showcase

---

## Official ServiceNow Resources

### Product Page
- **URL:** https://www.servicenow.com/products/ai-control-tower.html
- **Access:** Public (but may require form submission for detailed demo)
- **Content:** Product overview, feature highlights, customer testimonials (if available)

### On-Demand Webinar
- **Topic:** "Master AI with ServiceNow AI Control Tower"
- **Access:** Registration required (likely)
- **URL:** Referenced in community posts, specific link TBD

---

## Demo Personas Showcased

Based on demo descriptions, the videos showcase these personas:

1. **AI Center of Excellence Lead**
   - Strategic alignment and portfolio management
   - Initiative prioritization and approval workflows

2. **Product Owner / AI Developer**
   - AI asset submission and request workflows
   - Lifecycle status tracking
   - Integration with development processes

3. **Risk & Compliance Officer**
   - Risk assessment and scoring
   - Regulatory compliance monitoring (EU AI Act, NIST)
   - Audit trail and documentation

4. **IT Operations / Enterprise Architect**
   - CMDB integration and asset mapping
   - Performance monitoring
   - System health and security

---

## Video Analysis Tasks (Next Steps)

### Phase 1: Primary Video Extraction
- [ ] Download main demo video (NJDH_LMgbjE)
- [ ] Generate timestamped transcript
- [ ] Extract key feature demonstrations with timestamps
- [ ] Capture screenshots of all major UI elements
- [ ] Identify workflow sequences and user journeys

### Phase 2: Feature Cataloging
- [ ] Map demonstrated features to AI Control Tower capabilities
- [ ] Document UI/UX patterns and design principles
- [ ] Identify integration points shown in demos
- [ ] Note any performance metrics or benchmarks mentioned

### Phase 3: Comparative Analysis
- [ ] Compare demonstrated features to HELM capabilities
- [ ] Identify competitive gaps and advantages
- [ ] Document differentiation opportunities
- [ ] Create side-by-side feature comparison

### Phase 4: Sales Enablement
- [ ] Create annotated screenshot deck
- [ ] Develop "what to watch for" guide for sales team
- [ ] Build objection handling based on video content
- [ ] Generate competitive battle card

---

## Screenshot Library (To Be Populated)

```
media/screenshots/
├── 01-dashboard-overview.png
├── 02-ai-asset-inventory.png
├── 03-risk-compliance-workspace.png
├── 04-performance-metrics.png
├── 05-workflow-orchestration.png
├── 06-cmdb-integration.png
├── 07-agent-fabric-interface.png
├── 08-regulatory-frameworks.png
├── 09-persona-views/
│   ├── ai-coe-lead-view.png
│   ├── product-owner-view.png
│   ├── compliance-officer-view.png
│   └── it-ops-view.png
└── 10-integration-points/
    ├── strategic-portfolio-mgmt.png
    ├── enterprise-architecture.png
    └── grc-modules.png
```

---

## Video Extraction Tools & Process

### Recommended Approach
1. **Transcript Extraction:** YouTube auto-captions + manual verification
2. **Screenshot Capture:** ffmpeg or VLC for high-quality frame extraction
3. **Timestamping:** Manual review with notepad for key moments
4. **Analysis:** Frame-by-frame review of UI elements and workflows

### Commands for Video Processing
```bash
# Download video (if publicly accessible)
yt-dlp https://www.youtube.com/watch?v=NJDH_LMgbjE -o "servicenow-ai-control-tower-demo.mp4"

# Extract frames at key moments
ffmpeg -i servicenow-ai-control-tower-demo.mp4 -ss 00:01:30 -vframes 1 screenshot-01.png

# Extract full transcript
yt-dlp --write-auto-sub --skip-download https://www.youtube.com/watch?v=NJDH_LMgbjE
```

---

## Sources

- [ServiceNow Community - May 2025 Store Release Demos](https://www.servicenow.com/community/grc-articles/may-2025-store-release-demos-ai-control-tower-now-assist-in-irm/ta-p/3244573)
- [ServiceNow Events - Knowledge 2025](https://www.servicenow.com/events/knowledge/2025/sessions/may-6-broadcast--the-ai-control-tower--ai-agent-fabric.html)
- [ServiceNow Community - AI Impact Assessment Video](https://www.servicenow.com/community/now-assist-articles/how-servicenow-ai-control-tower-does-ai-impact-assessment-real/ta-p/3316570)
