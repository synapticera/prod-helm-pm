# Summary: call with mindsie 1

Generated: 2025-12-01 19:26:22

# Call Summary: Synaptic & Mindzie Discussion

## Key Points

- **Mindzie Overview**: Founded 5 years ago by Soren Frederiksen and James Henderson; originated from frustration with expensive, ineffective consulting (KPMG charging $1M for reports with no follow-up)
- **Process Mining Approach**: Mindzie focuses on extracting 3 data points (Case ID, Activity, Timestamp) from any database to create process maps—simpler than competitors like Celonis
- **Deployment Flexibility**: Offers three deployment models:
  - Cloud (multi-tenant SaaS)
  - On-premise (same architecture, for hospitals/banks with offline requirements)
  - Desktop version (similar to Disco, for individual researchers)
- **Core Differentiator**: On-premise deployment is a major competitive advantage; most vendors (including Celonis) have abandoned it
- **Target Market**: Best fit for companies with $100M–$4B annual revenue; Celonis targets $500M+ minimum
- **Pricing**: Approximately $40K–$250K/year per customer; OEM pricing around $10K/year per analyst + user packs

## Decisions Made

- **Task Mining Stance**: Mindzie has intentionally deprioritized task mining; Soren argues it's too intrusive and that process mining alone solves 80%+ of problems
- **Architecture Decision**: Built on Jupyter notebook-style blocks (no-code for 95% of use cases); Python integration for remaining 5%
- **AI Integration**: Added LLM support ~6 months after ChatGPT launch; uses OpenAI and supports local LLM integration (LM Studio, Open Router)
- **Data Strategy**: Focus on SQL databases; REST API integrations (like Salesforce) require intermediate steps; no proprietary data warehouse requirement

## Action Items

- **Bill & Dan to Review**: Digest conversation and compare notes with internal team
- **Next Steps**: Circle back to Mindzie with follow-up questions and potential partnership exploration
- **Documentation Review**: Bill to review Mindzie's technical documentation (non-advertised resource with AI agent for Q&A)
- **OEM Exploration**: Discuss potential OEM partnership model where Synaptic could white-label Mindzie's process mining

## Important Takeaways

1. **Data Access is the Real Bottleneck**: 60–80% of project effort goes to data extraction/transformation; analysis itself is comparatively trivial
2. **Conformance via Rules Over BPMN**: Instead of requiring customers to model BPMN processes, Mindzie uses "negative conformance"—defining rules for what *shouldn't* happen (e.g., paying before receiving goods)
3. **Log Enrichment Critical**: Custom attributes and enrichment calculations reduce noise and surface actionable insights; filtering by frequency/impact is essential
4. **Compliance Matters**: Security posture affects sales cycle; CSV-based workflows easier to get approved but labor-intensive; SOC 2 certification essential; Motorola took 12 months for compliance approval
5. **Real-World Example**: Train leasing company found 3 costly steps accounting for $2M/month in losses—distilled to one simple dashboard with 4 numbers
6. **Operational Integration Over One-Time Analysis**: Key to scaling; product must integrate into daily workflows (command centers, automated emails, dashboards) not just deliver reports
7. **AI as Analyst Assistant**: LLMs help scope projects, ask questions about data, and generate insights; but base knowledge pre-feeding crucial (can't dump 10M activities into ChatGPT)
8. **Small but Mighty Team**: Mindzie operates with minimal headcount but extensive consulting partnerships (TCS, PwC); leverages partners for go-to-market
