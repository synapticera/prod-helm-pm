# Vendor Profile: Yellow.ai

## Overview

| Attribute              | Value                                          |
| ---------------------- | ---------------------------------------------- |
| **Vendor**             | Yellow.ai                                      |
| **Product**            | Yellow.ai Dynamic Automation Platform          |
| **Category**           | Enterprise Conversational AI & Automation      |
| **Primary Market**     | Asia-Pacific, Middle East, Global enterprises  |
| **AI Capabilities**    | DynamicNLP, Multi-LLM, Generative AI, Voice AI |
| **Case Studies in KB** | 5                                              |

---

## Product Architecture

### Yellow.ai Platform Ecosystem

```
┌─────────────────────────────────────────────────────────────┐
│              Yellow.ai Dynamic Automation Platform           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Customer   │  │  Employee   │  │  Commerce   │        │
│  │ Experience  │  │ Experience  │  │   Cloud     │        │
│  │   Cloud     │  │   Cloud     │  │             │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │
│  ┌──────┴────────────────┴────────────────┴──────┐        │
│  │              DynamicNLP™ Engine                │        │
│  │  • Zero-Shot Learning                         │        │
│  │  • Multi-LLM Orchestration                    │        │
│  │  • 135+ Languages                             │        │
│  │  • Goal-Based Conversations                   │        │
│  └───────────────────────────────────────────────┘        │
│                                                             │
│  ┌───────────────────────────────────────────────┐        │
│  │              Channel Connectors               │        │
│  │  • WhatsApp • Voice • Web • Social • SMS     │        │
│  │  • Teams • Slack • Mobile Apps               │        │
│  └───────────────────────────────────────────────┘        │
│                                                             │
│  ┌───────────────────────────────────────────────┐        │
│  │              Integrations Hub                 │        │
│  │  • 150+ Pre-Built Connectors                 │        │
│  │  • CRM • ERP • ITSM • Payment                │        │
│  └───────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Key AI Components

**1. DynamicNLP™**

- Zero-shot learning for new intents without training
- Multi-intent detection
- Entity recognition across 135+ languages
- Contextual understanding
- Self-learning from conversations

**2. Multi-LLM Orchestration**

- YellowG (proprietary GenAI)
- OpenAI GPT integration
- Azure OpenAI
- Google PaLM
- Dynamic model selection based on query

**3. Generative AI Features**

- Knowledge base RAG
- Response generation
- Summarization
- Sentiment analysis
- Conversation analytics

**4. Voice AI**

- Native voice capabilities
- IVR modernization
- Voice biometrics
- Multi-accent support
- Regional language support

---

## Case Study Evidence

### From Knowledge Base

| Company          | Industry  | Key Result                           | Link                                                                                      |
| ---------------- | --------- | ------------------------------------ | ----------------------------------------------------------------------------------------- |
| Lulu Hypermarket | Retail    | 3M+ users in 4 weeks                 | [cs-2025-yellowai-lulu-hypermarket](../case-studies/cs-2025-yellowai-lulu-hypermarket.md) |
| Lion Parcel      | Logistics | 85% deflection, 3.2M+ messages       | [cs-2024-yellowai-lion-parcel](../case-studies/cs-2024-yellowai-lion-parcel.md)           |
| UnionBank        | Banking   | 329% user growth, 51% cost reduction | [cs-2024-yellowai-unionbank](../case-studies/cs-2024-yellowai-unionbank.md)               |
| IndiGo Airlines  | Airline   | 35+ use cases, 300+ journeys         | [cs-2024-yellowai-indigo](../case-studies/cs-2024-yellowai-indigo.md)                     |
| Growsari         | B2B Tech  | 74K+ quarterly queries               | [cs-2025-yellowai-growsari](../case-studies/cs-2025-yellowai-growsari.md)                 |

### Key Metrics from Case Studies

| Metric                 | Value | Source           |
| ---------------------- | ----- | ---------------- |
| Unique Users (4 weeks) | 3M+   | Lulu Hypermarket |
| Deflection Rate        | 85%   | Lion Parcel      |
| User Growth            | 329%  | UnionBank        |
| Cost Reduction         | 51%   | UnionBank        |
| Quarterly Messages     | 3.2M+ | Lion Parcel      |

---

## How It Works: Yellow.ai Flow

### Customer Interaction Flow

```
Customer Message
(WhatsApp/Voice/Web/Social)
        ↓
┌─────────────────────────────────────┐
│  Channel Gateway                    │
│  • Message normalization           │
│  • Session management              │
│  • Channel-specific formatting     │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│  DynamicNLP™ Processing             │
│  • Intent classification (zero-shot)│
│  • Entity extraction               │
│  • Context enrichment              │
│  • Language detection              │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│  Multi-LLM Decision Engine          │
│  • Select optimal model            │
│  • Knowledge retrieval (RAG)       │
│  • Generate response               │
│  • Apply guardrails                │
└─────────────────────────────────────┘
        ↓
┌───────────────┬───────────────┬───────────────┐
│  AI Response  │   Agent       │   Action      │
│  (Self-Serve) │   Handoff     │   Execution   │
└───────────────┴───────────────┴───────────────┘
```

### High-Volume Scaling (Lulu Example)

```
Salem Chatbot Launch
        ↓
3M+ Users in 4 Weeks
        ↓
┌─────────────────────────────────────┐
│  Auto-Scaling Infrastructure        │
│  • Dynamic capacity allocation     │
│  • Multi-region deployment         │
│  • Load balancing                  │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│  Query Processing at Scale          │
│  • Concurrent conversation handling│
│  • Agent workload significantly    │
│    reduced                         │
│  • Smooth live agent handoff       │
└─────────────────────────────────────┘
```

### Logistics AI Pattern (Lion Parcel)

```
Shipping Inquiry
        ↓
┌─────────────────────────────────────┐
│  GenAI-Powered Processing           │
│  • Package tracking lookup         │
│  • Delivery estimate generation    │
│  • Status update communication     │
└─────────────────────────────────────┘
        ↓
85% Deflected (Self-Service)
        ↓
15% → Human Agent (Complex Issues)
```

---

## Strengths (Evidence-Based)

1. **Massive Scale**: Lulu reaching 3M+ users in 4 weeks
2. **High Deflection**: Lion Parcel achieving 85% deflection rate
3. **Cost Efficiency**: UnionBank reducing costs by 51%
4. **Regional Expertise**: Strong APAC/MENA presence with local language support
5. **WhatsApp Excellence**: Deep integration with WhatsApp Business API

---

## Limitations

1. **North America Presence**: Less established in NA market vs. competitors
2. **Enterprise Depth**: May lack some features for very complex enterprise scenarios
3. **Brand Recognition**: Lower brand awareness outside APAC/MENA
4. **Professional Services**: Smaller global services footprint

---

## Competitive Positioning

| vs. Competitor   | Yellow.ai Advantage       | Competitor Advantage          |
| ---------------- | ------------------------- | ----------------------------- |
| vs. Intercom Fin | Enterprise scale, voice   | PLG/SMB, ease of use          |
| vs. Cognigy      | Cost, APAC presence       | Voice depth, CCaaS connectors |
| vs. Kore.ai      | WhatsApp, retail strength | Enterprise depth              |
| vs. Ada          | Regional languages        | North America presence        |

---

## Best Fit Scenarios

**Ideal For:**

- APAC/MENA-based enterprises
- High-volume consumer interactions (retail, logistics)
- WhatsApp-first customer engagement
- Cost-conscious enterprise deployments
- Regional language requirements (Southeast Asian, Arabic)

**Less Ideal For:**

- North America-focused companies seeking local support
- Complex enterprise integrations requiring extensive customization
- Voice-only contact center modernization
- Organizations requiring extensive professional services

---

## Pricing Model

| Component                   | Typical Range            |
| --------------------------- | ------------------------ |
| Platform Access             | Tiered by features       |
| Message/Conversation Volume | Per message or session   |
| Advanced AI Features        | Add-on pricing           |
| Professional Services       | Implementation + support |

_Competitive pricing especially for APAC markets_

---

## Integration Capabilities

### Messaging Channels

- WhatsApp Business API
- Facebook Messenger
- Instagram
- Telegram
- SMS/Voice

### Enterprise Systems

- Salesforce
- SAP
- ServiceNow
- Zendesk
- Freshdesk

### E-commerce & Payments

- Shopify
- Magento
- Payment gateways
- Order management systems

---

## Key Differentiators

1. **DynamicNLP™**: Zero-shot learning reduces training time significantly
2. **WhatsApp Mastery**: Deep WhatsApp Business API integration
3. **APAC Leadership**: #1 in multiple Southeast Asian markets
4. **Scale Proven**: 3M+ users in weeks (Lulu Hypermarket)
5. **Multi-LLM Architecture**: Flexible model selection for optimal results

---

_Profile Version: 1.0_
_Last Updated: 2026-01-20_
_Case Studies: 5_
