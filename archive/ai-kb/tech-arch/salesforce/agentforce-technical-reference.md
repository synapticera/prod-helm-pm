# Agentforce Technical Architecture Reference

> Comprehensive technical documentation for Salesforce Agentforce platform architecture, APIs, configuration, and integration patterns.

**Last Updated:** 2026-01-21
**Version:** 1.0
**Audience:** Developers, Architects, Technical Evaluators

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Atlas Reasoning Engine](#atlas-reasoning-engine)
3. [Agent API](#agent-api)
4. [Topics, Actions, and Instructions](#topics-actions-and-instructions)
5. [Einstein Trust Layer & Security](#einstein-trust-layer--security)
6. [Data Cloud Integration](#data-cloud-integration)
7. [MuleSoft Integration](#mulesoft-integration)
8. [Hyperforce Infrastructure](#hyperforce-infrastructure)
9. [Implementation Patterns](#implementation-patterns)
10. [Enterprise Architecture Patterns](#enterprise-architecture-patterns)
11. [Agent Design Patterns](#agent-design-patterns)
12. [Deployment & Operations](#deployment--operations)

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AGENTFORCE PLATFORM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                   │
│  │   Channels   │    │  Agent API   │    │  Agent       │                   │
│  │  (Web, SMS,  │───▶│  (REST)      │───▶│  Builder     │                   │
│  │   Voice...)  │    │              │    │  (Low-Code)  │                   │
│  └──────────────┘    └──────────────┘    └──────────────┘                   │
│         │                   │                   │                            │
│         ▼                   ▼                   ▼                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                     ATLAS REASONING ENGINE                           │    │
│  │  ┌─────────┐  ┌─────────┐  ┌──────────────┐  ┌────────────────┐    │    │
│  │  │  State  │  │  Flow   │  │ Side Effects │  │ ReAct Loop     │    │    │
│  │  │ Manager │  │ Engine  │  │   Handler    │  │ (System 2)     │    │    │
│  │  └─────────┘  └─────────┘  └──────────────┘  └────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│         ┌──────────────────────────┼──────────────────────────┐             │
│         ▼                          ▼                          ▼             │
│  ┌──────────────┐    ┌──────────────────┐    ┌──────────────────┐          │
│  │ Einstein     │    │    Data Cloud    │    │    MuleSoft      │          │
│  │ Trust Layer  │    │  (Vector DB,     │    │  (API Gateway,   │          │
│  │ (Security)   │    │   DLOs, DMOs)    │    │   Topic Center)  │          │
│  └──────────────┘    └──────────────────┘    └──────────────────┘          │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                         HYPERFORCE INFRASTRUCTURE                            │
│            (Multi-Cloud: AWS, GCP, Alibaba | Cell-Based Architecture)       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Core Components

| Component | Purpose | Key Technology |
|-----------|---------|----------------|
| **Atlas Reasoning Engine** | AI brain that reasons about tasks | LLM + ReAct loop + State machine |
| **Agent API** | Programmatic agent interaction | REST API with streaming |
| **Agent Builder** | Low-code agent configuration | Declarative Topics/Actions/Instructions |
| **Einstein Trust Layer** | Security and governance | Data masking, toxicity detection, audit |
| **Data Cloud** | Data backbone | Vector DB, DLOs, DMOs |
| **MuleSoft** | API connectivity | API Gateway, Topic Center |
| **Hyperforce** | Infrastructure | Multi-cloud, containerized |

---

## Atlas Reasoning Engine

### Overview

The Atlas Reasoning Engine is the core "brain" of Agentforce. It implements a sophisticated reasoning system that goes beyond simple prompt-response patterns.

### Architecture Components

```
┌─────────────────────────────────────────────────────────────────┐
│                    ATLAS REASONING ENGINE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌────────────────────────────────────────────────────────┐    │
│   │                    STATE MANAGER                        │    │
│   │  • Conversation context                                 │    │
│   │  • User session data                                    │    │
│   │  • Action history                                       │    │
│   │  • Retrieved knowledge                                  │    │
│   └────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│   ┌────────────────────────────────────────────────────────┐    │
│   │                     FLOW ENGINE                         │    │
│   │  • ReAct Loop (Reason → Act → Observe)                 │    │
│   │  • System 2 reasoning (deliberate, multi-step)         │    │
│   │  • Plan generation and refinement                      │    │
│   │  • Tool selection and sequencing                       │    │
│   └────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│   ┌────────────────────────────────────────────────────────┐    │
│   │                  SIDE EFFECTS HANDLER                   │    │
│   │  • Action execution (Apex, Flow, API)                  │    │
│   │  • CRM data mutations                                   │    │
│   │  • External system calls                               │    │
│   │  • Response generation                                  │    │
│   └────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### ReAct Loop (Reasoning-Action Cycle)

The Atlas engine uses a **ReAct (Reasoning + Acting)** loop pattern:

```
┌─────────────────────────────────────────────────────────────────┐
│                        ReAct LOOP                                │
│                                                                  │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐               │
│   │  REASON  │────▶│   ACT    │────▶│ OBSERVE  │               │
│   │          │     │          │     │          │               │
│   │ Analyze  │     │ Execute  │     │ Evaluate │               │
│   │ context, │     │ selected │     │ results, │               │
│   │ plan     │     │ action   │     │ update   │               │
│   │ next     │     │          │     │ state    │               │
│   │ step     │     │          │     │          │               │
│   └──────────┘     └──────────┘     └──────────┘               │
│        ▲                                   │                    │
│        └───────────────────────────────────┘                    │
│              (Loop until goal achieved or escalate)             │
└─────────────────────────────────────────────────────────────────┘
```

**Loop Execution:**

1. **Reason**: Analyze current state, user intent, available actions, and plan next step
2. **Act**: Execute the selected action (call API, query data, invoke flow)
3. **Observe**: Evaluate action results, update conversation state
4. **Repeat**: Continue until goal achieved, escalation needed, or max iterations

### System 2 Reasoning

Atlas implements **System 2** thinking (deliberate, analytical reasoning) vs. simple System 1 (fast, pattern-matching):

| Aspect | System 1 | System 2 (Atlas) |
|--------|----------|------------------|
| **Speed** | Fast, immediate | Slower, deliberate |
| **Process** | Pattern matching | Multi-step reasoning |
| **Capability** | Simple Q&A | Complex problem solving |
| **Examples** | FAQ lookup | Multi-system orchestration |

**System 2 Capabilities:**

- **Multi-step planning**: Break complex requests into actionable steps
- **Tool composition**: Chain multiple actions together
- **Self-correction**: Detect errors and adjust approach
- **Context synthesis**: Combine information from multiple sources

### Inference-Time Compute

Atlas uses **inference-time compute** - spending more compute cycles during reasoning rather than just training:

```
Traditional LLM:
  User Query → Single LLM Call → Response

Atlas Reasoning Engine:
  User Query → [Plan] → [Act] → [Observe] → [Refine] → ... → Response
                 ↑                              │
                 └──────────────────────────────┘
                      (Multiple reasoning cycles)
```

This enables:
- More accurate responses for complex queries
- Dynamic tool selection based on context
- Error recovery and self-correction
- Better handling of ambiguous requests

---

## Agent API

### Overview

The Agent API provides programmatic access to Agentforce agents, enabling custom integrations beyond the standard Salesforce channels.

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/services/data/vXX.0/einstein/agent/sessions` | POST | Start new session |
| `/services/data/vXX.0/einstein/agent/sessions/{sessionId}/messages` | POST | Send message |
| `/services/data/vXX.0/einstein/agent/sessions/{sessionId}/messages/stream` | POST | Stream responses |
| `/services/data/vXX.0/einstein/agent/sessions/{sessionId}` | DELETE | End session |
| `/services/data/vXX.0/einstein/agent/sessions/{sessionId}/feedback` | POST | Submit feedback |

### Session Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                     SESSION LIFECYCLE                            │
│                                                                  │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐               │
│   │  START   │────▶│  ACTIVE  │────▶│   END    │               │
│   │ SESSION  │     │ (Messages│     │ SESSION  │               │
│   │          │     │  /Stream)│     │          │               │
│   └──────────┘     └──────────┘     └──────────┘               │
│        │                │                │                      │
│        │                │                │                      │
│        ▼                ▼                ▼                      │
│   POST /sessions   POST /messages   DELETE /sessions/{id}       │
│                    POST /stream                                  │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                    CONSTRAINTS                           │   │
│   │  • Session timeout: 120 seconds (idle)                  │   │
│   │  • Max message size: 32KB                               │   │
│   │  • Streaming chunk size: Variable (SSE)                 │   │
│   │  • Rate limits: Per-org configurable                    │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Starting a Session

```http
POST /services/data/v62.0/einstein/agent/sessions
Content-Type: application/json
Authorization: Bearer {access_token}

{
  "agentId": "0XxXXXXXXXXXXXXXXX",
  "context": {
    "userId": "005XXXXXXXXXXXX",
    "recordId": "001XXXXXXXXXXXX",
    "variables": {
      "customField": "value"
    }
  },
  "bypassUser": false
}
```

**Response:**
```json
{
  "sessionId": "session_abc123xyz",
  "expiresAt": "2026-01-21T12:05:00Z",
  "status": "active"
}
```

### Sending Messages

```http
POST /services/data/v62.0/einstein/agent/sessions/{sessionId}/messages
Content-Type: application/json
Authorization: Bearer {access_token}

{
  "message": "I need to return order #12345",
  "sequenceId": 1
}
```

**Response:**
```json
{
  "messageId": "msg_xyz789",
  "response": {
    "text": "I can help you with that return. I found order #12345 for a Blue Widget purchased on January 15th. Would you like me to initiate the return process?",
    "actions": [
      {
        "type": "button",
        "label": "Yes, start return",
        "value": "confirm_return"
      },
      {
        "type": "button",
        "label": "No, I have questions",
        "value": "ask_questions"
      }
    ]
  },
  "agentThinking": {
    "steps": [
      "Retrieved order details from Order object",
      "Checked return policy - within 30-day window",
      "Identified available return options"
    ]
  },
  "sequenceId": 2
}
```

### Streaming Responses

For real-time response streaming using Server-Sent Events (SSE):

```http
POST /services/data/v62.0/einstein/agent/sessions/{sessionId}/messages/stream
Content-Type: application/json
Accept: text/event-stream
Authorization: Bearer {access_token}

{
  "message": "Explain my account activity this month"
}
```

**SSE Stream:**
```
event: thinking
data: {"step": "Querying account transactions..."}

event: thinking
data: {"step": "Analyzing spending patterns..."}

event: chunk
data: {"text": "Looking at your account activity for January, "}

event: chunk
data: {"text": "I can see you had 23 transactions totaling $1,847.32. "}

event: chunk
data: {"text": "Your largest purchase was $423.00 at Electronics Store..."}

event: complete
data: {"messageId": "msg_abc123", "sequenceId": 3}
```

### Session Timeout Handling

Sessions have a **120-second idle timeout**. Best practices:

```javascript
// Implement session keepalive for long interactions
async function keepSessionAlive(sessionId) {
  const KEEPALIVE_INTERVAL = 90000; // 90 seconds

  setInterval(async () => {
    await fetch(`/sessions/${sessionId}/heartbeat`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }, KEEPALIVE_INTERVAL);
}

// Handle session expiration gracefully
async function sendMessage(sessionId, message) {
  try {
    const response = await fetch(`/sessions/${sessionId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message })
    });

    if (response.status === 404 || response.status === 410) {
      // Session expired - create new session and retry
      const newSession = await createSession();
      return sendMessage(newSession.sessionId, message);
    }

    return response.json();
  } catch (error) {
    handleError(error);
  }
}
```

### Feedback API

Submit user feedback for agent improvement:

```http
POST /services/data/v62.0/einstein/agent/sessions/{sessionId}/feedback
Content-Type: application/json

{
  "messageId": "msg_xyz789",
  "rating": "positive",
  "feedback": "Resolved my issue quickly",
  "categories": ["accuracy", "speed"]
}
```

---

## Topics, Actions, and Instructions

### Hierarchy Overview

Agentforce uses a three-tier configuration hierarchy:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONFIGURATION HIERARCHY                       │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                      TOPICS                              │   │
│   │  "What jobs can this agent do?"                         │   │
│   │  • Order Management                                      │   │
│   │  • Returns & Refunds                                     │   │
│   │  • Product Information                                   │   │
│   │  • Account Support                                       │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                     ACTIONS                              │   │
│   │  "What tools does the agent have?"                      │   │
│   │  • Apex Methods (@InvocableMethod)                      │   │
│   │  • Flows (Screen/Autolaunched)                          │   │
│   │  • Prompt Templates                                      │   │
│   │  • External APIs (via MuleSoft)                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                   INSTRUCTIONS                           │   │
│   │  "How should the agent behave?"                         │   │
│   │  • Agent-level guardrails                               │   │
│   │  • Topic-level constraints                              │   │
│   │  • Action-specific guidance                             │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Topics

Topics define **job categories** the agent can handle. Each topic:

- Has a clear scope and description
- Contains specific actions
- Has topic-level instructions

**Topic Configuration:**

```yaml
Topic: Order Management
  Description: "Handle all order-related inquiries including status,
               modifications, and tracking"

  Classification Examples:
    - "Where is my order?"
    - "Can I change my shipping address?"
    - "When will my package arrive?"
    - "I want to cancel my order"

  Out of Scope:
    - Product recommendations (→ Product Information)
    - Refund requests (→ Returns & Refunds)
    - Account password issues (→ Account Support)

  Actions:
    - GetOrderStatus
    - UpdateShippingAddress
    - CancelOrder
    - GetTrackingInfo

  Instructions:
    - Always confirm order number before taking action
    - For orders over $500, require email verification
    - Escalate if order is more than 7 days late
```

### Actions

Actions are the **tools** available to the agent. Four types:

#### 1. Apex Actions (@InvocableMethod)

```apex
public class OrderActions {

    @InvocableMethod(
        label='Get Order Status'
        description='Retrieves current status and details for an order'
        category='Order Management'
    )
    public static List<OrderStatusResult> getOrderStatus(
        List<OrderStatusRequest> requests
    ) {
        List<OrderStatusResult> results = new List<OrderStatusResult>();

        // Bulkified processing
        Set<String> orderNumbers = new Set<String>();
        for (OrderStatusRequest req : requests) {
            orderNumbers.add(req.orderNumber);
        }

        Map<String, Order> orders = new Map<String, Order>();
        for (Order o : [
            SELECT Id, OrderNumber, Status, ShippingAddress,
                   TotalAmount, CreatedDate, ShipDate__c
            FROM Order
            WHERE OrderNumber IN :orderNumbers
            WITH USER_MODE
        ]) {
            orders.put(o.OrderNumber, o);
        }

        for (OrderStatusRequest req : requests) {
            OrderStatusResult result = new OrderStatusResult();
            Order o = orders.get(req.orderNumber);

            if (o != null) {
                result.success = true;
                result.status = o.Status;
                result.shippingAddress = o.ShippingAddress;
                result.totalAmount = o.TotalAmount;
                result.estimatedDelivery = calculateDelivery(o);
            } else {
                result.success = false;
                result.errorMessage = 'Order not found';
            }

            results.add(result);
        }

        return results;
    }

    public class OrderStatusRequest {
        @InvocableVariable(required=true description='The order number to look up')
        public String orderNumber;
    }

    public class OrderStatusResult {
        @InvocableVariable(description='Whether the lookup succeeded')
        public Boolean success;

        @InvocableVariable(description='Current order status')
        public String status;

        @InvocableVariable(description='Shipping address')
        public String shippingAddress;

        @InvocableVariable(description='Order total amount')
        public Decimal totalAmount;

        @InvocableVariable(description='Estimated delivery date')
        public Date estimatedDelivery;

        @InvocableVariable(description='Error message if lookup failed')
        public String errorMessage;
    }
}
```

#### 2. Flow Actions

```xml
<!-- Autolaunched Flow: Process_Return_Request -->
<Flow>
    <label>Process Return Request</label>
    <processType>AutoLaunchedFlow</processType>

    <!-- Input Variables (from Agent) -->
    <variables>
        <name>OrderId</name>
        <dataType>String</dataType>
        <isInput>true</isInput>
    </variables>
    <variables>
        <name>ReturnReason</name>
        <dataType>String</dataType>
        <isInput>true</isInput>
    </variables>

    <!-- Output Variables (back to Agent) -->
    <variables>
        <name>ReturnCaseId</name>
        <dataType>String</dataType>
        <isOutput>true</isOutput>
    </variables>
    <variables>
        <name>ReturnLabel</name>
        <dataType>String</dataType>
        <isOutput>true</isOutput>
    </variables>

    <!-- Flow Logic -->
    <recordLookups>
        <name>Get_Order</name>
        <object>Order</object>
        <!-- ... -->
    </recordLookups>

    <decisions>
        <name>Check_Return_Eligibility</name>
        <!-- ... -->
    </decisions>

    <recordCreates>
        <name>Create_Return_Case</name>
        <object>Case</object>
        <!-- ... -->
    </recordCreates>
</Flow>
```

#### 3. Prompt Template Actions

```yaml
# Prompt Template: Generate_Product_Recommendation
Type: Flex Template
Name: Generate Product Recommendation

Grounding:
  - Object: Product2
    Fields: [Name, Description, Price__c, Category__c, Features__c]
  - Object: Order
    Relationship: Customer's Previous Orders
    Fields: [Product2Id, OrderedDate]
  - Object: Account
    Fields: [Industry, AnnualRevenue, Preferences__c]

Template:
  System: |
    You are a product recommendation specialist. Based on the customer's
    purchase history and account profile, suggest relevant products.

    Guidelines:
    - Recommend 2-3 products maximum
    - Explain why each product fits their needs
    - Include pricing information
    - Note any current promotions

  User: |
    Customer: {!Account.Name}
    Industry: {!Account.Industry}
    Recent Purchases: {!RecentOrders}

    Looking for: {!$Input:CustomerRequest}

  Output Format:
    recommendations:
      - productName: string
        reason: string
        price: number
        promotion: string (optional)
```

#### 4. External API Actions (MuleSoft)

```yaml
# MuleSoft Action: Check_Inventory_External
API: Inventory Management System
Endpoint: /api/v1/inventory/check
Method: GET

Input Mapping:
  - agentField: productSku
    apiParam: sku
  - agentField: warehouseCode
    apiParam: location

Output Mapping:
  - apiField: quantity_available
    agentField: availableStock
  - apiField: restock_date
    agentField: nextRestockDate
  - apiField: warehouse_name
    agentField: warehouseLocation

Error Handling:
  - 404: "Product not found in inventory system"
  - 503: "Inventory system temporarily unavailable"
  - timeout: "Unable to check inventory, please try again"
```

### Instructions

Instructions provide **behavioral guardrails** at three levels:

#### Agent-Level Instructions

```yaml
Agent: Customer Service Agent

Global Instructions:
  Tone & Style:
    - Be professional but friendly
    - Use the customer's name when known
    - Avoid jargon; explain technical terms
    - Keep responses concise (under 3 paragraphs)

  Safety Guardrails:
    - Never share other customers' information
    - Never commit to actions outside defined capabilities
    - Always confirm before executing irreversible actions
    - Escalate to human when customer expresses frustration (3+ negative signals)

  Data Handling:
    - Do not store or repeat full credit card numbers
    - Mask SSN after verification (show last 4 only)
    - Do not discuss internal pricing strategies

  Escalation Triggers:
    - Legal threats or mentions of lawsuits
    - Request to speak with manager/supervisor
    - Complaints about discrimination
    - Safety or health concerns
```

#### Topic-Level Instructions

```yaml
Topic: Returns & Refunds

Topic Instructions:
  Scope Boundaries:
    - Handle returns within 30-day policy window
    - Process refunds up to $500 without approval
    - For amounts over $500, create case for manager review

  Process Requirements:
    - Verify order exists and belongs to customer
    - Check item eligibility (some items non-returnable)
    - Confirm refund method matches original payment

  Exceptions:
    - Holiday purchases: Extended to 60 days
    - Damaged items: Escalate for investigation
    - Digital products: No returns, offer support instead
```

#### Action-Level Instructions

```yaml
Action: Process Refund

Action Instructions:
  Pre-Conditions:
    - Return case must exist and be approved
    - Original payment method must be available
    - Amount must match or be less than original

  Execution Guidelines:
    - Always show refund amount before processing
    - Require customer confirmation via button click
    - Log refund reason for analytics

  Post-Conditions:
    - Send confirmation email automatically
    - Update order status to "Refunded"
    - Note: Refund may take 3-5 business days to appear
```

---

## Einstein Trust Layer & Security

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                   EINSTEIN TRUST LAYER                           │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                  INPUT PROCESSING                        │   │
│   │                                                          │   │
│   │  User Input → [PII Detection] → [Masking] → LLM         │   │
│   │                     ↓              ↓                     │   │
│   │               SSN, CC#, etc.   Replace with              │   │
│   │               identified       tokens                    │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                   LLM PROCESSING                         │   │
│   │                                                          │   │
│   │  • Secure prompt injection                              │   │
│   │  • Data grounding (CRM context)                         │   │
│   │  • Zero data retention (no training on customer data)   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                  OUTPUT PROCESSING                       │   │
│   │                                                          │   │
│   │  LLM Response → [Toxicity] → [Unmasking] → User         │   │
│   │                     ↓              ↓                     │   │
│   │               Block harmful    Restore                   │   │
│   │               content          original values           │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                   AUDIT & MONITORING                     │   │
│   │                                                          │   │
│   │  • All interactions logged                              │   │
│   │  • Feedback loop for improvement                        │   │
│   │  • Anomaly detection                                    │   │
│   │  • Compliance reporting                                 │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Key Security Features

#### 1. Data Grounding

Responses are grounded in actual CRM data, reducing hallucinations:

```
Without Grounding:
  User: "What's my account balance?"
  LLM: "Your balance is $1,234.56" (hallucinated)

With Grounding:
  User: "What's my account balance?"
  [System retrieves Account.Balance__c = $5,678.90]
  LLM: "Your current balance is $5,678.90" (grounded in real data)
```

#### 2. Zero Data Retention

- Customer data is **never used to train** foundation models
- Conversation data retained only for session duration
- Configurable retention policies for audit logs

#### 3. Toxicity Detection

Multi-layer content filtering:

| Layer | Detection | Action |
|-------|-----------|--------|
| Input | Prompt injection attempts | Block and log |
| Input | Harmful/abusive language | Warn or escalate |
| Output | Inappropriate content | Block generation |
| Output | Off-topic responses | Redirect to topic |

#### 4. PII Masking

```
Input: "My SSN is 123-45-6789 and CC is 4111-1111-1111-1111"
       ↓
Masked: "My SSN is [SSN_TOKEN_1] and CC is [CC_TOKEN_1]"
       ↓
LLM Processing (no real PII exposed)
       ↓
Response: "I've verified your identity using [SSN_TOKEN_1]"
       ↓
Output: "I've verified your identity using ***-**-6789"
```

### Agentforce Guardrails

Two types of guardrails:

#### User-Defined Guardrails

Configurable restrictions:

```yaml
Guardrails:
  Content Restrictions:
    - Block competitor product recommendations
    - Prevent discussion of unreleased features
    - Limit financial advice to general information

  Action Restrictions:
    - Max refund amount: $500
    - Max discount: 20%
    - Require manager approval for account deletion

  Escalation Rules:
    - Escalate after 3 unsuccessful resolution attempts
    - Escalate if sentiment score < -0.5
    - Escalate for VIP customers (Account.Tier = 'Enterprise')
```

#### Salesforce Managed Guardrails

Built-in protections:

- **Prompt injection defense**: Detects and blocks manipulation attempts
- **Jailbreak prevention**: Prevents attempts to bypass instructions
- **Off-topic detection**: Keeps agent focused on defined topics
- **Harmful content blocking**: Filters inappropriate outputs

### Audit & Compliance

```sql
-- Sample Audit Query: Agent Interactions Report
SELECT
    Session_Id__c,
    User__c,
    Topic__c,
    Action_Executed__c,
    Guardrail_Triggered__c,
    Escalated__c,
    Resolution_Status__c,
    CreatedDate
FROM AgentInteraction__c
WHERE CreatedDate = LAST_N_DAYS:30
    AND Guardrail_Triggered__c = true
ORDER BY CreatedDate DESC
```

---

## Data Cloud Integration

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     DATA CLOUD INTEGRATION                       │
│                                                                  │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│   │   External  │    │   Data      │    │   Data      │        │
│   │   Sources   │───▶│   Lake      │───▶│   Model     │        │
│   │   (APIs,    │    │   Objects   │    │   Objects   │        │
│   │   Files,    │    │   (DLOs)    │    │   (DMOs)    │        │
│   │   Streams)  │    │             │    │             │        │
│   └─────────────┘    └─────────────┘    └─────────────┘        │
│                                               │                  │
│                                               ▼                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                  VECTOR DATABASE                         │   │
│   │                                                          │   │
│   │  • Unstructured data embeddings (documents, PDFs)       │   │
│   │  • Semantic search capabilities                         │   │
│   │  • RAG (Retrieval Augmented Generation) support         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                  AGENT RETRIEVAL                         │   │
│   │                                                          │   │
│   │  User Query → Vector Search → Relevant Context → LLM    │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Data Lake Objects (DLOs)

Raw data ingestion from external sources:

```yaml
DLO: Customer_Interactions_Raw
Source: External CRM API
Schema:
  - interaction_id: string
  - customer_id: string
  - channel: string
  - content: text
  - timestamp: datetime
  - metadata: json

Ingestion:
  Frequency: Real-time (streaming)
  Format: JSON
  Volume: ~100K records/day
```

### Data Model Objects (DMOs)

Harmonized, queryable data:

```yaml
DMO: Unified_Customer_Profile
Sources:
  - DLO: Customer_Interactions_Raw
  - DLO: Purchase_History_Raw
  - Salesforce: Account, Contact, Case

Schema:
  - UnifiedId: string (primary key)
  - Name: string
  - Email: string
  - LifetimeValue: decimal
  - PreferredChannel: string
  - SentimentScore: decimal
  - LastInteractionDate: datetime
  - TotalInteractions: integer
  - OpenCases: integer

Identity Resolution:
  Match Rules:
    - Email exact match
    - Phone number fuzzy match
    - Name + Address probabilistic
```

### Vector Search for RAG

```python
# Conceptual flow for RAG with Data Cloud

# 1. Index documents into vector database
def index_knowledge_base():
    documents = load_knowledge_articles()  # From Salesforce Knowledge

    for doc in documents:
        embedding = generate_embedding(doc.content)
        vector_db.upsert(
            id=doc.id,
            embedding=embedding,
            metadata={
                'title': doc.title,
                'category': doc.category,
                'last_updated': doc.modified_date
            }
        )

# 2. Agent retrieval at query time
def retrieve_context(user_query):
    query_embedding = generate_embedding(user_query)

    results = vector_db.search(
        embedding=query_embedding,
        top_k=5,
        filter={'category': current_topic}
    )

    return [r.content for r in results]

# 3. Augmented generation
def generate_response(user_query):
    context = retrieve_context(user_query)

    prompt = f"""
    Context from knowledge base:
    {context}

    User question: {user_query}

    Provide a helpful response based on the context above.
    """

    return llm.generate(prompt)
```

### Metadata for Agent Grounding

Data Cloud provides rich metadata for agent context:

```json
{
  "customer": {
    "unifiedId": "UC-123456",
    "name": "Acme Corp",
    "segment": "Enterprise",
    "lifetimeValue": 250000,
    "healthScore": 85,
    "preferredChannel": "email",
    "timezone": "America/New_York"
  },
  "recentInteractions": [
    {
      "date": "2026-01-15",
      "channel": "chat",
      "topic": "billing",
      "resolution": "resolved",
      "csat": 4.5
    }
  ],
  "openCases": [
    {
      "caseNumber": "00123456",
      "subject": "Integration issue",
      "priority": "High",
      "age": 3
    }
  ],
  "relevantKnowledge": [
    {
      "articleId": "KA-001234",
      "title": "Integration Troubleshooting Guide",
      "relevanceScore": 0.92
    }
  ]
}
```

---

## MuleSoft Integration

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                   MULESOFT + AGENTFORCE                          │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                    TOPIC CENTER                          │   │
│   │                                                          │   │
│   │  Automatically generate Topics & Actions from APIs       │   │
│   │                                                          │   │
│   │  API Spec (OpenAPI) → Topic Definition → Agent Actions   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                  AGENTFORCE GATEWAY                      │   │
│   │                                                          │   │
│   │  • Unified API access point for agents                  │   │
│   │  • Authentication handling                              │   │
│   │  • Rate limiting and throttling                         │   │
│   │  • Request/Response transformation                      │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                    API CATALOG                           │   │
│   │                                                          │   │
│   │  Discovery and management of available APIs:            │   │
│   │  • Internal Salesforce APIs                             │   │
│   │  • External third-party APIs                            │   │
│   │  • Custom MuleSoft integrations                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              EXTERNAL SYSTEMS                            │   │
│   │                                                          │   │
│   │  • ERP (SAP, Oracle, NetSuite)                          │   │
│   │  • Payment processors (Stripe, PayPal)                  │   │
│   │  • Shipping carriers (FedEx, UPS, USPS)                 │   │
│   │  • Legacy systems (mainframes, custom apps)             │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Topic Center

Automatically convert API specifications into agent-ready Topics and Actions:

```yaml
# Input: OpenAPI Specification
openapi: 3.0.0
info:
  title: Order Management API
  version: 1.0.0
paths:
  /orders/{orderId}:
    get:
      operationId: getOrder
      summary: Get order details
      parameters:
        - name: orderId
          in: path
          required: true
          schema:
            type: string
      responses:
        200:
          description: Order details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Order'

# Output: Agentforce Topic
Topic: Order Management (Generated)
  Actions:
    - Name: Get Order Details
      Source: MuleSoft API
      Endpoint: GET /orders/{orderId}
      Inputs:
        - orderId (required): Order identifier
      Outputs:
        - orderNumber
        - status
        - items
        - total
        - shippingAddress
```

### MuleSoft Vibes

Natural language-driven API development:

```
Developer: "I need an API to check inventory levels across all warehouses
            and return availability by product SKU"

MuleSoft Vibes generates:
  ├── API Specification (OpenAPI 3.0)
  ├── Integration Flow (DataWeave transformations)
  ├── Connection to warehouse systems
  ├── Agentforce Action definition
  └── Test cases
```

### Gateway Configuration

```yaml
# Agentforce Gateway Policy
Gateway: Agentforce-Production
Policies:
  Authentication:
    Type: OAuth 2.0
    Provider: Salesforce
    Scopes: [api, agent_actions]

  Rate Limiting:
    Default: 1000 requests/minute
    Per-Agent:
      - agent: ServiceAgent
        limit: 5000 requests/minute
      - agent: SalesAgent
        limit: 2000 requests/minute

  Transformation:
    Request:
      - Add correlation ID
      - Inject user context
    Response:
      - Sanitize errors
      - Format for agent consumption

  Circuit Breaker:
    Threshold: 50% failure rate
    Window: 60 seconds
    Recovery: 30 seconds
```

---

## Hyperforce Infrastructure

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    HYPERFORCE INFRASTRUCTURE                     │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                   MULTI-CLOUD LAYER                      │   │
│   │                                                          │   │
│   │     ┌─────────┐    ┌─────────┐    ┌─────────┐          │   │
│   │     │   AWS   │    │   GCP   │    │ Alibaba │          │   │
│   │     │         │    │         │    │  Cloud  │          │   │
│   │     └─────────┘    └─────────┘    └─────────┘          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                   CELL ARCHITECTURE                      │   │
│   │                                                          │   │
│   │   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │   │
│   │   │ Cell 1  │  │ Cell 2  │  │ Cell 3  │  │ Cell N  │   │   │
│   │   │ (NA)    │  │ (EU)    │  │ (APAC)  │  │ (...)   │   │   │
│   │   └─────────┘  └─────────┘  └─────────┘  └─────────┘   │   │
│   │                                                          │   │
│   │   Each cell is a complete, isolated Salesforce instance │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                CONTAINERIZED SERVICES                    │   │
│   │                                                          │   │
│   │   ┌──────────┐  ┌──────────┐  ┌──────────┐             │   │
│   │   │ Agent    │  │ Atlas    │  │ Trust    │             │   │
│   │   │ Runtime  │  │ Engine   │  │ Layer    │             │   │
│   │   └──────────┘  └──────────┘  └──────────┘             │   │
│   │                                                          │   │
│   │   ┌──────────┐  ┌──────────┐  ┌──────────┐             │   │
│   │   │ Data     │  │ API      │  │ Event    │             │   │
│   │   │ Cloud    │  │ Gateway  │  │ Bus      │             │   │
│   │   └──────────┘  └──────────┘  └──────────┘             │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Key Characteristics

| Feature | Description |
|---------|-------------|
| **Multi-Cloud** | Runs on AWS, GCP, Alibaba Cloud |
| **Cell-Based** | Isolated cells for different regions/customers |
| **Containerized** | Kubernetes-orchestrated microservices |
| **Data Residency** | Data stays in specified geographic region |
| **Elastic Scaling** | Auto-scales based on demand |

### Regional Deployment

```yaml
Hyperforce Regions:
  North America:
    - AWS US-East (Virginia)
    - AWS US-West (Oregon)
    - GCP US-Central (Iowa)

  Europe:
    - AWS EU-West (Frankfurt)
    - AWS EU-West (Ireland)
    - GCP EU-West (Belgium)

  Asia Pacific:
    - AWS AP-Northeast (Tokyo)
    - AWS AP-Southeast (Sydney)
    - Alibaba Cloud (Shanghai)

  Data Residency Compliance:
    - GDPR (EU data in EU cells)
    - LGPD (Brazil data residency)
    - PDPA (Singapore requirements)
```

### Scaling Model

```
┌─────────────────────────────────────────────────────────────────┐
│                      SCALING ARCHITECTURE                        │
│                                                                  │
│   Load Balancer                                                  │
│        │                                                         │
│        ├──────────┬──────────┬──────────┬──────────┐           │
│        ▼          ▼          ▼          ▼          ▼           │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │
│   │ Agent  │ │ Agent  │ │ Agent  │ │ Agent  │ │ Agent  │      │
│   │ Pod 1  │ │ Pod 2  │ │ Pod 3  │ │ Pod N  │ │ Pod N+1│      │
│   └────────┘ └────────┘ └────────┘ └────────┘ └────────┘      │
│                                                                  │
│   Horizontal Pod Autoscaler:                                    │
│     - Scale on: CPU > 70%, Memory > 80%, Queue depth > 100     │
│     - Min pods: 3                                               │
│     - Max pods: 100                                             │
│     - Scale-up: 30 seconds                                      │
│     - Scale-down: 5 minutes (cooldown)                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Implementation Patterns

### Apex InvocableMethod Best Practices

#### 1. Bulkification

Always design for bulk processing:

```apex
// ❌ BAD: Single record processing
@InvocableMethod
public static List<String> processOrder(List<String> orderIds) {
    List<String> results = new List<String>();
    for (String orderId : orderIds) {
        Order o = [SELECT Id, Status FROM Order WHERE Id = :orderId];
        // Process single record...
        results.add(o.Status);
    }
    return results;
}

// ✅ GOOD: Bulkified processing
@InvocableMethod
public static List<String> processOrders(List<String> orderIds) {
    List<String> results = new List<String>();

    // Single query for all records
    Map<Id, Order> ordersMap = new Map<Id, Order>([
        SELECT Id, Status, TotalAmount, ShippingAddress
        FROM Order
        WHERE Id IN :orderIds
        WITH USER_MODE
    ]);

    for (String orderId : orderIds) {
        Order o = ordersMap.get(orderId);
        results.add(o != null ? o.Status : 'Not Found');
    }

    return results;
}
```

#### 2. Error Handling

```apex
@InvocableMethod(label='Process Refund' description='Processes a customer refund')
public static List<RefundResult> processRefund(List<RefundRequest> requests) {
    List<RefundResult> results = new List<RefundResult>();

    for (RefundRequest req : requests) {
        RefundResult result = new RefundResult();

        try {
            // Validate input
            if (String.isBlank(req.orderId)) {
                throw new RefundException('Order ID is required');
            }

            if (req.amount <= 0) {
                throw new RefundException('Refund amount must be positive');
            }

            // Process refund
            Order order = getOrder(req.orderId);
            validateRefundEligibility(order, req.amount);
            Refund__c refund = createRefund(order, req.amount, req.reason);

            result.success = true;
            result.refundId = refund.Id;
            result.message = 'Refund processed successfully';

        } catch (RefundException e) {
            result.success = false;
            result.errorCode = 'VALIDATION_ERROR';
            result.message = e.getMessage();

        } catch (DmlException e) {
            result.success = false;
            result.errorCode = 'DATABASE_ERROR';
            result.message = 'Unable to process refund. Please try again.';
            // Log detailed error for debugging
            System.debug(LoggingLevel.ERROR, 'Refund DML Error: ' + e.getMessage());

        } catch (Exception e) {
            result.success = false;
            result.errorCode = 'SYSTEM_ERROR';
            result.message = 'An unexpected error occurred.';
            System.debug(LoggingLevel.ERROR, 'Refund Error: ' + e.getMessage());
        }

        results.add(result);
    }

    return results;
}
```

#### 3. Security with `WITH USER_MODE`

```apex
@InvocableMethod
public static List<AccountInfo> getAccountInfo(List<String> accountIds) {
    List<AccountInfo> results = new List<AccountInfo>();

    // WITH USER_MODE enforces sharing rules and field-level security
    for (Account acc : [
        SELECT Id, Name, Industry, AnnualRevenue,
               (SELECT Id, Subject, Status FROM Cases WHERE IsClosed = false)
        FROM Account
        WHERE Id IN :accountIds
        WITH USER_MODE
    ]) {
        AccountInfo info = new AccountInfo();
        info.accountId = acc.Id;
        info.name = acc.Name;
        info.industry = acc.Industry;
        info.openCaseCount = acc.Cases.size();
        results.add(info);
    }

    return results;
}
```

#### 4. InvocableVariable Annotations

```apex
public class OrderLookupRequest {
    @InvocableVariable(
        label='Order Number'
        description='The order number to look up (format: ORD-XXXXX)'
        required=true
    )
    public String orderNumber;

    @InvocableVariable(
        label='Include Line Items'
        description='Whether to include order line item details'
        required=false
    )
    public Boolean includeLineItems = false;

    @InvocableVariable(
        label='Customer Email'
        description='Email for verification (optional)'
        required=false
    )
    public String customerEmail;
}

public class OrderLookupResult {
    @InvocableVariable(description='Whether the lookup succeeded')
    public Boolean success;

    @InvocableVariable(description='Order ID if found')
    public String orderId;

    @InvocableVariable(description='Current order status')
    public String status;

    @InvocableVariable(description='List of line items (if requested)')
    public List<LineItem> lineItems;

    @InvocableVariable(description='Error message if lookup failed')
    public String errorMessage;

    public class LineItem {
        @InvocableVariable public String productName;
        @InvocableVariable public Integer quantity;
        @InvocableVariable public Decimal price;
    }
}
```

### Prompt Template Patterns

#### Field Generation Template

```yaml
Template Type: Field Generation
Purpose: Auto-populate record fields

Use Case: Generate case summary from description

Configuration:
  Object: Case
  Target Field: AI_Summary__c
  Source Fields: [Subject, Description, Priority, Account.Name]

Prompt:
  System: |
    Generate a concise 2-3 sentence summary of this support case.
    Include: the issue type, customer name, and urgency level.

  User: |
    Subject: {!Case.Subject}
    Description: {!Case.Description}
    Priority: {!Case.Priority}
    Customer: {!Case.Account.Name}

Output:
  Field: AI_Summary__c
  Max Length: 500 characters
```

#### Sales Email Template

```yaml
Template Type: Sales Email
Purpose: Generate personalized outreach

Configuration:
  Object: Lead
  Grounding:
    - Lead fields
    - Related Campaign
    - Company website (if available)

Prompt:
  System: |
    You are a sales representative writing a personalized outreach email.

    Guidelines:
    - Reference specific details about their company
    - Connect to the campaign they engaged with
    - Include a clear, low-pressure CTA
    - Keep under 150 words
    - Professional but warm tone

  User: |
    Lead: {!Lead.Name}
    Title: {!Lead.Title}
    Company: {!Lead.Company}
    Industry: {!Lead.Industry}
    Campaign: {!Campaign.Name}
    Lead Source: {!Lead.LeadSource}

Variables:
  - senderName: Current user's name
  - productFocus: Campaign's primary product

Output Format:
  subject: string (email subject line)
  body: string (email body)
  followUpDate: date (suggested follow-up)
```

#### Flex Template (Dynamic)

```yaml
Template Type: Flex
Purpose: Complex, multi-turn agent interactions

Configuration:
  Grounding Sources:
    - Knowledge Articles (vector search)
    - Product Catalog
    - Customer Case History
    - Order History

Prompt:
  System: |
    You are a technical support specialist helping customers troubleshoot
    product issues.

    Available context:
    - Customer's product: {!Product.Name}
    - Customer tier: {!Account.Support_Tier__c}
    - Open cases: {!RelatedCases}
    - Relevant articles: {!KnowledgeArticles}

    Guidelines:
    - Ask clarifying questions before suggesting solutions
    - Reference knowledge articles when applicable
    - For Enterprise customers, offer to schedule a call
    - Escalate hardware issues to field service

  User: {!$Input:CustomerMessage}

Dynamic Retrieval:
  On each turn:
    1. Extract key terms from customer message
    2. Vector search knowledge base
    3. Inject top 3 relevant articles into context

Response Handling:
  If confidence < 0.7:
    action: escalate_to_human
  If hardware_issue detected:
    action: create_field_service_case
```

---

## Enterprise Architecture Patterns

### SOMA (Single Org, Multiple Agents)

Most common pattern for enterprise deployments:

```
┌─────────────────────────────────────────────────────────────────┐
│                    SALESFORCE ORG                                │
│                                                                  │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│   │ Service  │  │  Sales   │  │ Field    │  │  HR      │       │
│   │  Agent   │  │  Agent   │  │ Service  │  │  Agent   │       │
│   │          │  │          │  │  Agent   │  │          │       │
│   └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
│        │             │             │             │               │
│        └─────────────┴──────┬──────┴─────────────┘               │
│                             │                                    │
│                             ▼                                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              SHARED INFRASTRUCTURE                       │   │
│   │  • Single Data Cloud instance                           │   │
│   │  • Shared Einstein Trust Layer                          │   │
│   │  • Common Knowledge Base                                │   │
│   │  • Unified customer profile                             │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

Benefits:
  ✅ Single source of truth for customer data
  ✅ Consistent governance and security
  ✅ Easier agent-to-agent handoffs
  ✅ Shared learning and improvement

Challenges:
  ⚠️ Complex permission model needed
  ⚠️ Potential for topic overlap conflicts
  ⚠️ Scaling limits within single org
```

### MOMA (Multi Org, Multiple Agents)

For large enterprises with multiple Salesforce instances:

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENTERPRISE LAYER                              │
│                                                                  │
│   ┌────────────────┐          ┌────────────────┐                │
│   │   ORG 1        │          │   ORG 2        │                │
│   │  (Americas)    │          │   (EMEA)       │                │
│   │                │          │                │                │
│   │  ┌──────────┐  │          │  ┌──────────┐  │                │
│   │  │ Service  │  │          │  │ Service  │  │                │
│   │  │  Agent   │  │          │  │  Agent   │  │                │
│   │  └──────────┘  │          │  └──────────┘  │                │
│   │  ┌──────────┐  │          │  ┌──────────┐  │                │
│   │  │  Sales   │  │          │  │  Sales   │  │                │
│   │  │  Agent   │  │          │  │  Agent   │  │                │
│   │  └──────────┘  │          │  └──────────┘  │                │
│   └───────┬────────┘          └───────┬────────┘                │
│           │                           │                          │
│           └───────────┬───────────────┘                          │
│                       │                                          │
│                       ▼                                          │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              ORCHESTRATION LAYER                         │   │
│   │                                                          │   │
│   │  • Cross-org routing (by region, language, product)     │   │
│   │  • Unified customer identity                            │   │
│   │  • Centralized analytics                                │   │
│   │  • Shared knowledge federation                          │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

Benefits:
  ✅ Data residency compliance (GDPR, etc.)
  ✅ Regional customization
  ✅ Blast radius isolation
  ✅ Independent scaling

Challenges:
  ⚠️ Complex cross-org handoffs
  ⚠️ Duplicate knowledge management
  ⚠️ Inconsistent customer experience risk
```

### Multi-Vendor A2A (Agent-to-Agent)

Emerging pattern for heterogeneous agent ecosystems:

```
┌─────────────────────────────────────────────────────────────────┐
│                 MULTI-VENDOR AGENT NETWORK                       │
│                                                                  │
│   ┌────────────┐    ┌────────────┐    ┌────────────┐           │
│   │ Salesforce │    │  Google    │    │  Custom    │           │
│   │ Agentforce │    │  Vertex    │    │  Agent     │           │
│   │            │    │  Agent     │    │  (Python)  │           │
│   └─────┬──────┘    └─────┬──────┘    └─────┬──────┘           │
│         │                 │                 │                    │
│         └────────────┬────┴────────────────┘                    │
│                      │                                           │
│                      ▼                                           │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              A2A PROTOCOL LAYER                          │   │
│   │                                                          │   │
│   │  Standard interfaces:                                    │   │
│   │  • Agent Card (capability advertisement)                │   │
│   │  • Task handoff protocol                                │   │
│   │  • Context passing format                               │   │
│   │  • Authentication/authorization                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   Example Flow:                                                  │
│   1. User asks Salesforce agent about shipping                  │
│   2. Agent detects need for carrier API (outside Salesforce)    │
│   3. Discovers carrier's agent via A2A protocol                 │
│   4. Hands off tracking request with context                    │
│   5. Receives response, synthesizes for user                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Agent Design Patterns

### Interaction Patterns

#### Greeter Agent

First point of contact, routes to specialists:

```yaml
Agent: Greeter
Role: Initial triage and routing

Topics:
  - Greeting & Intent Detection

Behavior:
  1. Welcome customer
  2. Identify primary intent
  3. Gather minimum required context
  4. Route to appropriate specialist agent

Routing Rules:
  - Billing questions → Billing Agent
  - Technical issues → Support Agent
  - Sales inquiries → Sales Agent
  - Complex/unclear → Human escalation

Example:
  User: "Hi, I have a problem"
  Agent: "Hello! I'm here to help. Could you tell me a bit more about
          what you're experiencing? Is this related to:
          • A billing or payment question
          • A technical issue with our product
          • Interest in new products or services
          • Something else"
```

#### Operator Agent

Handles multi-step workflows:

```yaml
Agent: Operator
Role: Complex transaction execution

Topics:
  - Returns Processing
  - Account Changes
  - Order Modifications

Behavior:
  1. Confirm customer identity
  2. Validate request parameters
  3. Execute multi-step workflow
  4. Handle exceptions
  5. Confirm completion

Guardrails:
  - Require confirmation before irreversible actions
  - Log all transactions
  - Escalate on repeated failures
```

#### Orchestrator Agent

Coordinates multiple agents/systems:

```yaml
Agent: Orchestrator
Role: Cross-system coordination

Capabilities:
  - Call multiple specialist agents
  - Aggregate responses
  - Manage conversation state
  - Handle partial failures

Example Flow:
  User: "I want to change my address and get my recent orders resent"

  Orchestrator:
    1. Call Identity Agent (verify customer)
    2. Call Account Agent (update address)
    3. Call Order Agent (get recent orders)
    4. Call Shipping Agent (arrange reshipment)
    5. Synthesize: "I've updated your address and scheduled
       reshipment for orders #123 and #456"
```

### Specialist Patterns

#### Answerbot Agent

Knowledge-based Q&A:

```yaml
Agent: Answerbot
Role: Knowledge retrieval and explanation

Data Sources:
  - Knowledge Articles
  - FAQ Database
  - Product Documentation

Behavior:
  - Search knowledge base for relevant content
  - Synthesize answer from multiple sources
  - Provide source citations
  - Suggest related articles

Guardrails:
  - Only answer from grounded sources
  - Admit when answer not found
  - Escalate speculative questions
```

#### Domain SME Agent

Deep expertise in specific area:

```yaml
Agent: Technical Support SME
Role: Expert-level technical assistance

Domain: Product Integration Issues

Knowledge:
  - API documentation
  - Error code database
  - Integration patterns
  - Troubleshooting runbooks

Actions:
  - Run diagnostic queries
  - Generate API test calls
  - Create detailed bug reports
  - Schedule engineering escalation

Behavior:
  - Ask systematic diagnostic questions
  - Request logs/error messages
  - Provide step-by-step solutions
  - Document resolution for knowledge base
```

### Utility Patterns

#### Generator Agent

Content creation:

```yaml
Agent: Content Generator
Role: Generate business content

Capabilities:
  - Email drafts
  - Report summaries
  - Meeting notes
  - Social media posts

Grounding:
  - CRM data for personalization
  - Brand guidelines
  - Previous communications

Quality Controls:
  - Human review for external content
  - Brand voice consistency check
  - Compliance scan for regulated content
```

#### Data Steward Agent

Data quality and enrichment:

```yaml
Agent: Data Steward
Role: Maintain data quality

Actions:
  - Detect duplicate records
  - Enrich incomplete profiles
  - Standardize formats
  - Flag data quality issues

Triggers:
  - New record creation
  - Scheduled data audits
  - User-reported issues

Outputs:
  - Merge recommendations
  - Data quality scores
  - Enrichment suggestions
```

### Long-Running Patterns

#### Project Manager Agent

Multi-session, goal-oriented:

```yaml
Agent: Project Manager
Role: Track and advance long-running initiatives

State Management:
  - Persist conversation across sessions
  - Track action items
  - Monitor deadlines
  - Send proactive reminders

Behavior:
  Session 1: Gather project requirements
  Session 2: Check progress on action items
  Session 3: Identify blockers, suggest solutions
  Session N: Project completion and retrospective

Integrations:
  - Task management (Jira, Asana)
  - Calendar (meeting scheduling)
  - Document management (requirements, specs)
```

---

## Deployment & Operations

### Deployment Checklist

```yaml
Pre-Deployment:
  Configuration:
    □ Topics defined and tested
    □ Actions validated (Apex, Flows)
    □ Instructions documented
    □ Guardrails configured

  Security:
    □ Trust Layer enabled
    □ PII masking rules defined
    □ Toxicity thresholds set
    □ Audit logging configured

  Integration:
    □ MuleSoft connections tested
    □ Data Cloud sync verified
    □ External APIs authenticated
    □ Error handling validated

Deployment:
  Sandbox Testing:
    □ Unit tests passing
    □ Integration tests passing
    □ User acceptance testing
    □ Performance benchmarks met

  Production Rollout:
    □ Change management approved
    □ Rollback plan documented
    □ Monitoring dashboards ready
    □ Support team trained

Post-Deployment:
  Monitoring:
    □ Error rate tracking
    □ Resolution rate monitoring
    □ CSAT score tracking
    □ Escalation rate analysis

  Optimization:
    □ Weekly prompt refinement
    □ Monthly action review
    □ Quarterly topic assessment
```

### Monitoring Metrics

```yaml
Core Metrics:
  Resolution Rate:
    Definition: % of conversations resolved without human
    Target: 40-60% (varies by industry)
    Alert: < 30%

  Escalation Rate:
    Definition: % of conversations escalated to human
    Target: 20-40%
    Alert: > 50%

  Average Handle Time:
    Definition: Time from start to resolution
    Target: < 5 minutes for simple issues
    Alert: > 10 minutes average

  Customer Satisfaction:
    Definition: Post-interaction CSAT score
    Target: > 4.0/5.0
    Alert: < 3.5/5.0

Operational Metrics:
  Error Rate:
    Definition: % of failed agent responses
    Target: < 1%
    Alert: > 5%

  Guardrail Triggers:
    Definition: Safety guardrails activated
    Target: Monitor trend
    Alert: Sudden spike

  API Latency:
    Definition: Agent response time (p95)
    Target: < 3 seconds
    Alert: > 5 seconds
```

### Troubleshooting Guide

| Issue | Symptoms | Resolution |
|-------|----------|------------|
| High Escalation Rate | > 50% escalating | Review topic coverage, add missing actions |
| Poor Resolution | Low confidence scores | Improve knowledge base, refine prompts |
| Slow Responses | High latency | Check API bottlenecks, optimize queries |
| Guardrail Overload | Too many blocks | Tune sensitivity, review false positives |
| Session Timeouts | Frequent 120s errors | Implement keepalive, optimize long operations |

---

## Reference Links

### Official Documentation

- [Salesforce Agentforce Developer Guide](https://developer.salesforce.com/docs/einstein/genai/guide/agentforce.html)
- [Agent API Reference](https://developer.salesforce.com/docs/einstein/genai/references/agent-api)
- [Apex InvocableMethod Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_InvocableMethod.htm)
- [Einstein Trust Layer](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_layer.htm)
- [Data Cloud Documentation](https://help.salesforce.com/s/articleView?id=sf.c360_a_data_cloud.htm)

### Engineering Resources

- [Atlas Reasoning Engine Blog Post](https://engineering.salesforce.com/atlas-reasoning-engine)
- [Enterprise Agentic Architecture Patterns](https://architect.salesforce.com/decision-guides/enterprise-agentic-architecture)
- [Prompt Builder Best Practices](https://help.salesforce.com/s/articleView?id=sf.prompt_builder_best_practices.htm)

### Trailhead Modules

- [Agentforce Fundamentals](https://trailhead.salesforce.com/content/learn/trails/agentforce-fundamentals)
- [Build Agents with Agentforce](https://trailhead.salesforce.com/content/learn/trails/build-agents-with-agentforce)
- [Einstein Trust Layer Basics](https://trailhead.salesforce.com/content/learn/modules/einstein-trust-layer-basics)

---

*This document is part of the HELM Technical Architecture Knowledge Base. For updates or corrections, see the [ai-kb contribution guidelines](../README.md).*
