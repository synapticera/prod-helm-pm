# Vendor Profile: ServiceNow Now Assist

## Overview

| Attribute              | Value                                                    |
| ---------------------- | -------------------------------------------------------- |
| **Vendor**             | ServiceNow                                               |
| **Product**            | Now Assist (GenAI), Virtual Agent                        |
| **Category**           | Enterprise AI Service Management                         |
| **Primary Market**     | Enterprise IT, HR, Customer Service                      |
| **AI Capabilities**    | Now Assist GenAI, Virtual Agent, Predictive Intelligence |
| **Case Studies in KB** | 4+                                                       |

---

## Product Architecture

### Now Platform with AI

```
┌─────────────────────────────────────────────────────────────┐
│                    Now Platform                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Now Assist (GenAI)                 │   │
│  │  • Case Summarization                               │   │
│  │  • Resolution Recommendations                       │   │
│  │  • Knowledge Article Generation                     │   │
│  │  • Code Generation                                  │   │
│  │  • Conversational Search                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Virtual   │  │  Predictive │  │ Performance │        │
│  │    Agent    │  │ Intelligence│  │  Analytics  │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │
│  ┌──────┴────────────────┴────────────────┴──────┐        │
│  │              Now Platform Core                 │        │
│  │  • ITSM     • HRSD     • CSM                  │        │
│  │  • Workflows • Automation • Integration        │        │
│  └────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Key AI Components

**1. Now Assist (Generative AI)**

- Case summarization and handoff
- Resolution note generation
- Knowledge article creation
- Conversational search
- Code assist for developers

**2. Virtual Agent**

- Conversational chatbot
- Pre-built topic models
- NLU for intent detection
- Integration with workflows
- Omnichannel deployment

**3. Predictive Intelligence**

- Ticket classification
- Assignment recommendation
- Similar case matching
- Priority prediction
- SLA risk forecasting

---

## Case Study Evidence

### From Knowledge Base

| Company             | Industry      | Key Result                         | Link                                                                                            |
| ------------------- | ------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| ServiceNow Internal | Technology    | 80% AI-handled, $325M value        | [cs-2024-servicenow-internal](../case-studies/cs-2024-servicenow-internal.md)                   |
| Healthcare ROI      | Healthcare    | 310% ROI                           | [cs-2025-servicenow-healthcare-roi](../case-studies/cs-2025-servicenow-healthcare-roi.md)       |
| Manufacturing NPV   | Manufacturing | $4.7M NPV                          | [cs-2025-servicenow-manufacturing-npv](../case-studies/cs-2025-servicenow-manufacturing-npv.md) |
| IT Services         | Technology    | 4.5 hour resolution time reduction | [cs-2025-servicenow-it-services](../case-studies/cs-2025-servicenow-it-services.md)             |

### Key Metrics from Case Studies

| Metric                    | Value     | Source              |
| ------------------------- | --------- | ------------------- |
| AI-Handled Rate           | 80%       | ServiceNow Internal |
| Annualized Value          | $325M     | ServiceNow Internal |
| ROI                       | 310%      | Healthcare Org      |
| NPV                       | $4.7M     | Manufacturing       |
| Resolution Time Reduction | 4.5 hours | IT Services         |

---

## Strengths (Evidence-Based)

1. **Platform Integration**: AI deeply integrated into workflows, not bolted on
2. **Internal Validation**: ServiceNow uses own product, 80% AI-handled, $325M value
3. **Enterprise ITSM**: Market leader in IT service management
4. **Multi-Domain**: Works across IT, HR, Customer Service, Field Service
5. **Proven ROI**: 310% ROI documented in healthcare deployment

---

## Limitations

1. **Platform Dependency**: Best results require ServiceNow ecosystem
2. **Cost**: Enterprise pricing, significant investment
3. **Complexity**: Full value requires mature ServiceNow deployment
4. **Customer Service**: Stronger in IT/HR than external customer service

---

## How It Works: Now Assist

### Case Summarization Flow

```
Support Case Created
        ↓
Agent Works on Case
        ↓
Now Assist Monitors Activity
        ↓
┌─────────────────────────────────────┐
│  GenAI Processing                    │
│  • Conversation analysis            │
│  • Action extraction                │
│  • Outcome summarization            │
└─────────────────────────────────────┘
        ↓
Auto-Generated Summary
        ↓
Agent Review & Approval
        ↓
Knowledge Article Creation (Optional)
```

### Virtual Agent Conversation Flow

```
Employee/Customer Query
        ↓
NLU Intent Detection
        ↓
Topic Matching
        ↓
┌─────────────────────────────────────┐
│  Resolution Path                     │
│  • Self-service completion          │
│  • Workflow automation              │
│  • Guided troubleshooting           │
│  • Live agent escalation            │
└─────────────────────────────────────┘
        ↓
Ticket Creation (if needed)
        ↓
Predictive Classification & Routing
```

### Predictive Intelligence Flow

```
New Ticket Submitted
        ↓
ML Model Analysis
        ↓
┌───────────────┬───────────────┬───────────────┐
│  Category     │  Assignment   │   Priority    │
│  Prediction   │  Recommendation│  Prediction   │
└───────┬───────┴───────┬───────┴───────┬───────┘
        │               │               │
        └───────────────┼───────────────┘
                        ↓
              Confidence Score
                        ↓
High Confidence ────→ Auto-Apply
        ↓
Low Confidence ────→ Suggest to Agent
```

---

## Competitive Positioning

| vs. Competitor | ServiceNow Advantage      | Competitor Advantage       |
| -------------- | ------------------------- | -------------------------- |
| vs. Salesforce | Deeper ITSM, workflow     | CRM/sales integration      |
| vs. Zendesk    | Enterprise scale, process | Ease of use, cost          |
| vs. Freshworks | Enterprise features       | Mid-market pricing         |
| vs. BMC        | Modern platform, GenAI    | Legacy enterprise presence |

---

## Best Fit Scenarios

**Ideal For:**

- Enterprise IT service desks
- HR service delivery
- Organizations with existing ServiceNow
- Complex workflow automation needs
- Multi-department service management

**Less Ideal For:**

- Pure customer service (external)
- SMB organizations
- Simple ticketing needs
- Cost-sensitive deployments

---

## Pricing Model

| Component      | Typical Range            |
| -------------- | ------------------------ |
| Now Platform   | Per user/month, tiered   |
| Now Assist     | Add-on per user          |
| Virtual Agent  | Per conversation or user |
| Implementation | Professional services    |

_Note: Enterprise pricing, typically requires sales engagement_

---

## Integration Capabilities

### Native Integrations

- Microsoft 365/Teams
- Slack
- Major cloud providers
- Identity providers (Okta, Azure AD)

### APIs and Extensibility

- REST API
- IntegrationHub
- Flow Designer
- Custom applications

---

## Key Differentiators

1. **Platform Native AI**: AI built into platform, not separate product
2. **Workflow Integration**: AI actions trigger automated workflows
3. **Multi-Domain**: Single platform for IT, HR, Customer Service
4. **Enterprise Trust**: Trusted by Fortune 500 for critical operations
5. **GenAI Innovation**: Now Assist bringing GenAI across all modules

---

_Profile Version: 1.0_
_Last Updated: 2026-01-20_
_Case Studies: 4+_
