# Context Graphs: Technical Architecture Analysis for HELM

**Date:** 2026-01-26
**Source:** [Context Graphs: A Practical Guide](https://medium.com/@adnanmasood/context-graphs-a-practical-guide-to-governed-context-for-llms-agents-and-knowledge-systems-c49610c8ff27) by Adnan Masood, PhD.
**Purpose:** Analyze context graph architecture patterns and identify integration opportunities for HELM

---

## Executive Summary

**What are Context Graphs?**
Context graphs are governed, queryable "memory layers" that connect entities, events, decisions, policies, and evidence so LLMs/agents can answer **why** (not just what). They represent a convergence of:
- Knowledge graphs (semantic relationships)
- Data lineage (operational flows)
- AI governance (policy enforcement, auditability)

**Why This Matters for HELM:**
HELM already captures agent execution traces, compliance context, and decision records. Context graphs provide a proven architectural pattern to make this data queryable, governed, and reusable - transforming HELM from an execution engine into an "organizational memory system" for AI agents.

**Key Insight:**
> "The wall isn't missing data; it's missing decision traces" - the reasoning and context that human experts take into account aren't stored as durable artifacts in current systems.

HELM is uniquely positioned because we ALREADY CAPTURE these decision traces through agent execution. We just need to structure them as a queryable context graph.

---

## 1. Core Concepts: What Goes Into a Context Graph

### 1.1 Node Types (Building Blocks)

| Node Type | Description | Example in Context Graph | HELM Equivalent |
|-----------|-------------|-------------------------|-----------------|
| **Entities** | Real-world objects/concepts | Customer, Account, Product | Agents, Tasks, Users, Resources |
| **Events/Decisions** | Things that happened | Decision node, Transaction, Incident | Agent runs, Task executions, Approvals |
| **Contextual Metadata** | Governance/reference info | Policy, Rule, Metric Definition | Compliance rules, Templates, Guardrails |
| **Evidence/Sources** | Artifacts used in decisions | Document, Email, Alert | API responses, Tool outputs, Retrieved docs |
| **Lineage Links** | Chains of influence | Decision A → Decision B | Task dependencies, Agent workflows |
| **Temporal Attributes** | Time-based context | valid_from, valid_to | Execution timestamps, Version history |
| **Confidence Scores** | Trust/quality indicators | confidence=0.9, sources=[...] | Validation results, Approval states |

### 1.2 Relationship Types (Edges)

```
Entity-Entity:        (Customer) -[:OWNS]-> (Account)
Entity-Event:         (Ticket) -[:RESOLVED_BY]-> (Decision)
Decision-Policy:      (Decision) -[:UNDER_POLICY]-> (Policy)
Decision-Exception:   (Decision) -[:OVERRODE_POLICY]-> (Policy)
Decision-Evidence:    (Decision) -[:SUPPORTED_BY]-> (Document)
Decision-Person:      (Decision) -[:APPROVED_BY]-> (Person)
Causal:              (Decision) -[:PRECEDENT_FOR]-> (Decision)
Governance:          (Person) -[:ROLE]-> (Team)
```

**HELM Equivalents:**
```
Agent-Task:          (Agent) -[:EXECUTED]-> (Task)
Task-Policy:         (Task) -[:REQUIRED_COMPLIANCE]-> (ComplianceRule)
Task-Evidence:       (Task) -[:USED_CONTEXT]-> (RetrievedDocument)
Task-Approval:       (Task) -[:APPROVED_BY]-> (User)
Task-Task:           (Task) -[:TRIGGERED]-> (Task)
Task-Exception:      (Task) -[:EXCEPTION_HANDLED]-> (Policy)
```

---

## 2. Architecture Layers: How Context Graphs Work

### 2.1 Standard Context Graph Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Sources Layer                            │
│  CRM | Databases | Logs | Tickets | Docs | Slack | APIs    │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│              Ingestion & Extraction                         │
│  Extract entities, events, relationships from sources       │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│           Graph Store (Context Graph DB)                    │
│  • Entities, Events, Policies, Evidence nodes               │
│  • Temporal, Causal, Lineage relationships                  │
│  • Provenance, Confidence scores                            │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│         Retrieval & Query Layer (GraphRAG)                  │
│  • Graph queries (Cypher, SPARQL, Gremlin)                  │
│  • Subgraph extraction for specific queries                 │
│  • Hybrid: Vector search + Graph traversal                  │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│              AI/Agent Layer                                 │
│  LLM consumes context subgraph via:                         │
│  • Prompt injection (serialized graph)                      │
│  • Tool interface (live graph queries)                      │
└──────────────┬──────────────────────────────────────────────┘
               │
               ▼
         Feedback Loop: Decisions → Graph
```

### 2.2 HELM's Current Architecture (Mapped to Context Graph Pattern)

```
┌─────────────────────────────────────────────────────────────┐
│                HELM Sources Layer                           │
│  Agents | Tasks | Tools | APIs | Documents | User Actions  │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│         HELM Execution Engine (Capture)                     │
│  • Agent runs captured                                      │
│  • Tool calls logged                                        │
│  • Decisions recorded                                       │
│  • Compliance checks tracked                                │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│        HELM Storage (Currently)                             │
│  • Execution logs (JSON/structured)                         │
│  • Markdown documentation                                   │
│  • File-based task tracking                                 │
│  ⚠️  NOT QUERYABLE AS GRAPH                                │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│         HELM Retrieval (Limited)                            │
│  • Search execution logs                                    │
│  • View individual runs                                     │
│  ⚠️  NO GRAPH TRAVERSAL                                     │
│  ⚠️  NO "WHY" QUERIES                                       │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│         Agents (Next Execution)                             │
│  ⚠️  LIMITED ACCESS TO PRECEDENTS                           │
│  ⚠️  NO ORGANIZATIONAL MEMORY                               │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 HELM with Context Graph Integration (Proposed)

```
┌─────────────────────────────────────────────────────────────┐
│                HELM Sources Layer                           │
│  Agents | Tasks | Tools | APIs | Documents | User Actions  │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│    HELM Execution Engine + Graph Writer                     │
│  Every execution automatically creates:                     │
│  • Task node (with metadata)                                │
│  • Evidence nodes (retrieved docs, API responses)           │
│  • Relationship edges (precedents, causality)               │
│  • Policy compliance nodes                                  │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│        HELM Context Graph Store                             │
│  Property Graph DB (Neo4j) OR RDF Store (GraphDB)          │
│  ✅ Queryable with Cypher/SPARQL                            │
│  ✅ Multi-hop traversal                                     │
│  ✅ Temporal queries                                        │
│  ✅ Precedent discovery                                     │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│    HELM GraphRAG Query Engine                               │
│  • "Why was this decision made?" → Traverse evidence        │
│  • "Find similar past tasks" → Precedent search             │
│  • "What policy applies?" → Policy graph navigation         │
│  • Hybrid: Vector similarity + Graph relationships          │
└──────────────┬──────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────────┐
│         HELM Agents (Context-Aware)                         │
│  Agents can now:                                            │
│  ✅ Query precedents before acting                          │
│  ✅ Understand "why" previous decisions were made           │
│  ✅ Learn from organizational history                       │
│  ✅ Explain decisions with evidence chains                  │
└──────────────┬──────────────────────────────────────────────┘
               │
               ▼
         Feedback Loop: New decisions enrich graph
```

---

## 3. Key Benefits for HELM

### 3.1 Solving the "Missing Context" Problem

**Current State:**
- Agents execute tasks but don't learn from past executions
- No way to query "Why did we approve this exception last time?"
- Compliance decisions are one-off, not precedent-based
- Limited organizational memory between agent runs

**With Context Graph:**
- **Precedent Discovery:** "Find similar tasks where we granted an exception"
- **Causal Reasoning:** "What evidence led to this decision?"
- **Policy Evolution:** "Which tasks violated policy X and why?"
- **Learning Loop:** Each execution enriches the graph, improving future decisions

### 3.2 Explanation Packets

Context graphs produce **explanation packets**: an answer + evidence paths + provenance + policy constraints.

**Example Query:**
```
"Why was Task #T-1234 (customer refund) approved for $10,000
when policy says $5,000 is the limit?"
```

**Without Context Graph:**
```
Response: "Approved by user@example.com on 2025-10-15"
⚠️  No WHY, no evidence, no policy context
```

**With Context Graph (Cypher Query):**
```cypher
MATCH (task:Task {id: 'T-1234'})-[:APPROVED_BY]->(approver:User)
MATCH (task)-[:REQUIRED_COMPLIANCE]->(policy:Policy)
MATCH (task)-[:EXCEPTION_JUSTIFIED_BY]->(evidence:Evidence)
MATCH (task)-[:PRECEDENT]->(priorTask:Task)
RETURN task, approver, policy, evidence, priorTask
```

**Response:**
```
Task #T-1234 was approved for $10,000 because:

1. **Policy Context:**
   - Standard limit: $5,000 (Policy: REFUND-001 v2.3)
   - Exception: Executive approval required for >$5,000

2. **Evidence:**
   - Customer had 3 outages in past 30 days (Incident #INC-456, #INC-789, #INC-890)
   - Contract includes SLA penalty clause (Document: contract-acme-2024.pdf, page 12)
   - Legal review recommended goodwill gesture (Slack thread: #legal-2025-10-14)

3. **Precedent:**
   - Similar exception granted in Task #T-0987 (2025-08-20)
   - Customer: Different but same industry vertical
   - Amount: $8,500 with similar outage history

4. **Approval Chain:**
   - Initiated by: support-agent-ai@company.com
   - Reviewed by: manager@company.com
   - Approved by: vp-customer-success@company.com

5. **Confidence:** 0.92 (High)
   - Based on clear precedent and documented evidence

Source Graph:
(Task #T-1234) -[:SUPPORTED_BY]-> (Evidence: Incidents)
(Task #T-1234) -[:REFERENCED]-> (Document: Contract)
(Task #T-1234) -[:PRECEDENT]-> (Task #T-0987)
(Task #T-1234) -[:APPROVED_BY]-> (User: VP)
```

---

## 4. HELM-Specific Integration Opportunities

### 4.1 Opportunity #1: Agent Execution Memory

**What:** Every agent run becomes a node in the context graph

**Implementation:**
```python
# After agent execution
context_graph.create_node(
    type="AgentRun",
    id=run_id,
    agent_type=agent_type,
    timestamp=datetime.now(),
    status="completed",
    metadata={
        "tools_used": ["bash", "read", "edit"],
        "files_modified": ["src/app.py"],
        "outcome": "success"
    }
)

# Link to task
context_graph.create_edge(
    from_node=("Task", task_id),
    to_node=("AgentRun", run_id),
    relationship="EXECUTED_BY"
)

# Link to evidence (files read)
for file in files_read:
    context_graph.create_edge(
        from_node=("AgentRun", run_id),
        to_node=("File", file),
        relationship="READ"
    )
```

**Value:**
- Query: "Which agents have worked on this codebase area before?"
- Query: "What was the last successful approach to similar tasks?"
- Query: "Show me all runs that modified authentication code"

### 4.2 Opportunity #2: Compliance Precedent Graph

**What:** Link compliance decisions to policies, evidence, and precedents

**Schema:**
```
(Task) -[:REQUIRED_COMPLIANCE]-> (Policy)
(Task) -[:COMPLIED_WITH]-> (Policy)
(Task) -[:VIOLATED]-> (Policy)
(Task) -[:EXCEPTION_GRANTED]-> (Policy)
(Task) -[:JUSTIFIED_BY]-> (Evidence)
(Task) -[:SIMILAR_TO]-> (PriorTask)
```

**Use Case:**
```
Agent needs to make a decision that might violate a policy.
Instead of just checking "is this allowed?" it can:

1. Query: "Find precedents where this policy had exceptions"
2. Analyze: "What evidence justified those exceptions?"
3. Compare: "Does current situation match precedent criteria?"
4. Decide: "Request exception with similar justification" OR "Deny"
```

**Cypher Query Example:**
```cypher
// Find precedents for policy exceptions
MATCH (policy:Policy {id: 'DATA-ACCESS-001'})
MATCH (task:Task)-[:EXCEPTION_GRANTED]->(policy)
MATCH (task)-[:JUSTIFIED_BY]->(evidence:Evidence)
MATCH (task)-[:APPROVED_BY]->(approver:User)
WHERE task.timestamp > datetime() - duration('P90D') // Last 90 days
RETURN task, evidence, approver
ORDER BY task.timestamp DESC
```

### 4.3 Opportunity #3: Document Governance Graph

**What:** Track which documents were used in which decisions, with provenance

**Schema:**
```
(Task) -[:RETRIEVED]-> (Document)
(Document) -[:SOURCED_FROM]-> (System)
(Document) -[:VERSION {version: "v2.1", timestamp: "..."}]-> (Document)
(Document) -[:SUPERSEDED_BY]-> (Document)
(Document) -[:CLASSIFIED_AS {level: "confidential"}]-> (Classification)
```

**Value:**
- **Audit Trail:** "Which tasks accessed customer PII documents?"
- **Version Control:** "Was this decision based on outdated policy?"
- **Impact Analysis:** "If we change this document, which workflows are affected?"

### 4.4 Opportunity #4: Workflow Dependency Graph

**What:** Model task dependencies and triggering relationships

**Schema:**
```
(Task) -[:TRIGGERED]-> (Task)
(Task) -[:BLOCKED_BY]-> (Task)
(Task) -[:DEPENDS_ON]-> (Resource)
(Task) -[:FAILED_DUE_TO]-> (Issue)
```

**Value:**
```cypher
// Critical path analysis
MATCH path = (start:Task)-[:TRIGGERED*]->(end:Task)
WHERE start.milestone = "Sprint Start"
  AND end.milestone = "Release"
RETURN path, length(path) as depth
ORDER BY depth DESC
LIMIT 1
```

**Use Case:**
- "What's the critical path to ship this feature?"
- "If Task X fails, what downstream tasks are affected?"
- "Show me all tasks waiting on this approval"

### 4.5 Opportunity #5: Learning from Failures

**What:** Capture failure modes and their resolutions as reusable patterns

**Schema:**
```
(Task) -[:FAILED_WITH]-> (Error)
(Error) -[:RESOLVED_BY]-> (Fix)
(Fix) -[:DOCUMENTED_IN]-> (KnowledgeArticle)
(Error) -[:SIMILAR_TO]-> (PriorError)
```

**Agent Behavior:**
```python
# When agent encounters error
error_node = context_graph.find_node("Error", error_signature)

# Check for known resolutions
resolutions = context_graph.query("""
    MATCH (error:Error {signature: $sig})-[:RESOLVED_BY]->(fix:Fix)
    MATCH (fix)-[:APPLIED_IN]->(task:Task)
    WHERE task.status = 'success'
    RETURN fix, task
    ORDER BY task.timestamp DESC
    LIMIT 5
""", sig=error_signature)

if resolutions:
    # Try known fix
    apply_fix(resolutions[0])
else:
    # Novel error - escalate and learn
    escalate_to_human()
```

---

## 5. Technical Architecture Decisions

### 5.1 Property Graph vs. RDF

| Aspect | Property Graph (Neo4j) | RDF (GraphDB, Stardog) |
|--------|------------------------|------------------------|
| **Query Language** | Cypher (intuitive) | SPARQL (standards-based) |
| **Schema** | Flexible, schema-optional | Ontology-driven |
| **Performance** | Optimized for traversal | Optimized for reasoning |
| **Tooling** | Rich ecosystem | Semantic web tools |
| **Learning Curve** | Easier | Steeper |

**Recommendation for HELM:**
- **Start with Property Graph (Neo4j)** for:
  - Faster development velocity
  - Intuitive queries for developers
  - Rich visualization tools
  - Better operational traversal performance

- **Consider RDF later** if:
  - Need to integrate with external ontologies (e.g., FHIR, GDPR taxonomies)
  - Require formal reasoning (e.g., infer implicit relationships)
  - Want standards-based interoperability

### 5.2 Temporal Modeling Approaches

**Option A: Properties on Nodes/Edges**
```cypher
CREATE (task:Task {
    id: 'T-123',
    created_at: datetime('2025-10-15T10:00:00Z'),
    valid_from: datetime('2025-10-15T10:00:00Z'),
    valid_to: null  // Still valid
})

CREATE (task)-[:USED_POLICY {
    applied_at: datetime('2025-10-15T10:05:00Z')
}]->(policy)
```

**Option B: Versioned Nodes**
```cypher
// Create new version when state changes
CREATE (task_v1:Task {id: 'T-123', version: 1, status: 'pending'})
CREATE (task_v2:Task {id: 'T-123', version: 2, status: 'approved'})
CREATE (task_v2)-[:PREVIOUS_VERSION]->(task_v1)
```

**Option C: Separate Timeline Nodes**
```cypher
CREATE (task:Task {id: 'T-123'})
CREATE (event1:Event {type: 'created', timestamp: '...'})
CREATE (event2:Event {type: 'approved', timestamp: '...'})
CREATE (task)-[:HAS_EVENT]->(event1)
CREATE (task)-[:HAS_EVENT]->(event2)
```

**Recommendation:** **Option A (Properties)** for simplicity, add Option C (Event nodes) for complex temporal reasoning.

### 5.3 Hybrid Architecture: Graph + Vector Search

**Problem:** Context graphs are great for structure, but sometimes you need semantic search.

**Solution:** Combine both.

```python
# Hybrid retrieval
def retrieve_context(query: str, task_id: str):
    # 1. Vector search for semantic similarity
    similar_docs = vector_store.search(query, top_k=10)

    # 2. Graph traversal for structural relationships
    related_tasks = context_graph.query("""
        MATCH (current:Task {id: $task_id})
        MATCH (current)-[:SIMILAR_TO|PRECEDENT*1..3]-(related:Task)
        RETURN related
        ORDER BY related.confidence DESC
        LIMIT 5
    """, task_id=task_id)

    # 3. Merge and rank
    context = merge_and_rank(similar_docs, related_tasks)

    # 4. Return explanation packet
    return {
        "context": context,
        "provenance": graph.get_evidence_chain(task_id),
        "confidence": calculate_confidence(context)
    }
```

**Architecture:**
```
┌────────────────────────────────────────────────────┐
│              Query Interface                       │
└─────────────┬─────────────────────┬────────────────┘
              │                     │
      ┌───────▼───────┐     ┌──────▼───────┐
      │ Vector Search │     │ Graph Query  │
      │  (Embeddings) │     │   (Cypher)   │
      └───────┬───────┘     └──────┬───────┘
              │                     │
      ┌───────▼────────────────────▼───────┐
      │     Hybrid Ranking & Fusion        │
      │  • Semantic + Structural scores    │
      │  • Evidence chain assembly         │
      │  • Confidence calculation          │
      └────────────────┬───────────────────┘
                       │
               ┌───────▼────────┐
               │ Explanation    │
               │ Packet         │
               └────────────────┘
```

---

## 6. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
**Goal:** Minimal context graph with basic entities

**Deliverables:**
- [ ] Choose graph database (Neo4j recommended)
- [ ] Define core schema: Task, Agent, User, Policy nodes
- [ ] Implement graph writer in HELM execution engine
- [ ] Basic Cypher queries for task history

**Schema:**
```cypher
// Core entities
CREATE (agent:Agent {id, name, type})
CREATE (task:Task {id, status, timestamp})
CREATE (user:User {id, email, role})
CREATE (policy:Policy {id, name, version})

// Basic relationships
CREATE (agent)-[:EXECUTED]->(task)
CREATE (task)-[:APPROVED_BY]->(user)
CREATE (task)-[:REQUIRED_COMPLIANCE]->(policy)
```

### Phase 2: Evidence & Provenance (Weeks 5-8)
**Goal:** Add evidence nodes and compliance tracking

**Deliverables:**
- [ ] Evidence node types: Document, API Response, Tool Output
- [ ] Provenance relationships: SOURCED_FROM, RETRIEVED, USED
- [ ] Confidence scoring on relationships
- [ ] Audit trail queries

**Schema Extension:**
```cypher
CREATE (doc:Document {id, title, url, retrieved_at})
CREATE (api:APIResponse {endpoint, status, timestamp})
CREATE (output:ToolOutput {tool, result, timestamp})

CREATE (task)-[:USED_CONTEXT]->(doc)
CREATE (task)-[:API_CALLED]->(api)
CREATE (task)-[:TOOL_EXECUTED]->(output)
```

### Phase 3: Precedent Discovery (Weeks 9-12)
**Goal:** Link similar tasks and enable precedent queries

**Deliverables:**
- [ ] Similarity calculation between tasks
- [ ] PRECEDENT and SIMILAR_TO relationships
- [ ] GraphRAG query engine
- [ ] Agent integration: Query precedents before acting

**Key Query:**
```cypher
// Find precedents for current task
MATCH (current:Task {id: $current_task_id})
MATCH (precedent:Task)
WHERE precedent.type = current.type
  AND precedent.status = 'success'
  AND precedent.timestamp > datetime() - duration('P90D')
WITH current, precedent,
     algorithm.similarity.cosine(current.embedding, precedent.embedding) AS similarity
WHERE similarity > 0.7
MATCH (precedent)-[:USED_CONTEXT]->(evidence)
RETURN precedent, evidence, similarity
ORDER BY similarity DESC, precedent.timestamp DESC
LIMIT 5
```

### Phase 4: Temporal & Causal Reasoning (Weeks 13-16)
**Goal:** Enable "why" queries and impact analysis

**Deliverables:**
- [ ] Temporal queries (as-of-date)
- [ ] Causal chains: TRIGGERED, CAUSED, RESULTED_IN
- [ ] Impact analysis: "What depends on X?"
- [ ] Explanation packet generation

**Example:**
```cypher
// Why did this task fail?
MATCH path = (task:Task {id: $task_id})-[:FAILED_DUE_TO*]->(root_cause)
WHERE NOT (root_cause)-[:FAILED_DUE_TO]->()
RETURN path, root_cause
```

### Phase 5: Learning Loop (Weeks 17-20)
**Goal:** Agents learn from graph and improve over time

**Deliverables:**
- [ ] Feedback mechanism: Success/failure signals
- [ ] Pattern extraction from successful tasks
- [ ] Agent training: Use graph for few-shot examples
- [ ] Continuous graph enrichment

---

## 7. Minimal Viable Example

### 7.1 Simple Task Execution Graph

```cypher
// Create a task
CREATE (task:Task {
    id: 'T-1001',
    description: 'Fix authentication bug',
    status: 'completed',
    timestamp: datetime('2025-10-20T14:30:00Z')
})

// Create agent that executed it
CREATE (agent:Agent {
    id: 'agent-123',
    type: 'CodeAgent'
})

// Link execution
CREATE (agent)-[:EXECUTED {
    started_at: datetime('2025-10-20T14:30:00Z'),
    completed_at: datetime('2025-10-20T14:45:00Z')
}]->(task)

// Files modified
CREATE (file1:File {path: 'src/auth.py'})
CREATE (file2:File {path: 'tests/test_auth.py'})
CREATE (task)-[:MODIFIED]->(file1)
CREATE (task)-[:MODIFIED]->(file2)

// Evidence used
CREATE (doc:Document {
    id: 'DOC-456',
    title: 'Authentication Best Practices',
    url: 'https://internal.wiki/auth'
})
CREATE (task)-[:REFERENCED]->(doc)

// Precedent
CREATE (prior:Task {id: 'T-0899', description: 'Similar auth fix'})
CREATE (task)-[:SIMILAR_TO {similarity: 0.85}]->(prior)
```

### 7.2 Query: "How was this bug fixed?"

```cypher
MATCH (task:Task {id: 'T-1001'})<-[:EXECUTED]-(agent:Agent)
MATCH (task)-[:MODIFIED]->(file:File)
MATCH (task)-[:REFERENCED]->(doc:Document)
MATCH (task)-[:SIMILAR_TO]->(prior:Task)
RETURN {
    task: task.description,
    agent: agent.type,
    files_modified: collect(file.path),
    documentation_used: collect(doc.title),
    similar_tasks: collect(prior.id)
} AS fix_details
```

**Result:**
```json
{
  "fix_details": {
    "task": "Fix authentication bug",
    "agent": "CodeAgent",
    "files_modified": ["src/auth.py", "tests/test_auth.py"],
    "documentation_used": ["Authentication Best Practices"],
    "similar_tasks": ["T-0899"]
  }
}
```

---

## 8. Key Challenges & Mitigations

### Challenge 1: Graph Size & Performance

**Problem:** Context graphs can grow massive (millions of nodes)

**Mitigations:**
1. **Subgraph Extraction:** Query only relevant portions
2. **Time-based Pruning:** Archive old task nodes after 12 months
3. **Hierarchical Aggregation:** Roll up detailed events into summaries
4. **Indexing:** Proper indexes on timestamp, task_id, status fields

### Challenge 2: Data Quality

**Problem:** "Garbage in, garbage out" - bad data pollutes the graph

**Mitigations:**
1. **Schema Validation:** Enforce required fields on node creation
2. **Confidence Scoring:** Track reliability of evidence sources
3. **Human Review:** Flag novel situations for human validation
4. **Filtering:** Tag unreliable precedents, don't remove (maintain history)

### Challenge 3: Privacy & Security

**Problem:** Graph might expose sensitive data through traversal

**Mitigations:**
1. **Role-Based Subgraphs:** Different views for different users
2. **Attribute-Level ACLs:** Redact PII in query results
3. **Audit Logging:** Track who queries what
4. **Encryption:** Sensitive node properties encrypted at rest

### Challenge 4: Context Exfiltration

**Problem:** Adversarial queries could extract more than intended

**Mitigations:**
1. **Query Analysis:** Detect suspicious traversal patterns
2. **Rate Limiting:** Limit graph queries per user/agent
3. **Anomaly Detection:** Flag unusual query behaviors
4. **Guardrails:** Max hop depth, result set size limits

---

## 9. Success Metrics

| Metric Category | Measurement | Target |
|----------------|-------------|---------|
| **Retrieval Quality** | Precision/Recall of precedent discovery | >0.85 |
| **Explainability** | % of decisions with complete evidence chains | >90% |
| **Agent Performance** | Reduction in repeated errors (same failure mode) | >50% |
| **Compliance** | % of policy violations with documented exceptions | 100% |
| **Latency** | Graph query response time (p95) | <500ms |
| **Adoption** | % of agent runs that query context graph | >70% |
| **Cost** | Storage + compute costs per 1M executions | <$100 |

---

## 10. Next Steps & Recommendations

### Immediate Actions (This Week)

1. **Proof of Concept:**
   - [ ] Spin up Neo4j Community Edition locally
   - [ ] Model 10 recent HELM task executions as graph
   - [ ] Write 3-5 Cypher queries demonstrating value
   - [ ] Share with team for feedback

2. **Stakeholder Alignment:**
   - [ ] Present this analysis to engineering leads
   - [ ] Identify champion from data/ML team
   - [ ] Estimate effort for Phase 1 (4 weeks)

3. **Architecture Review:**
   - [ ] Review HELM's current execution logging
   - [ ] Identify integration points for graph writer
   - [ ] Evaluate hosting options (Neo4j Aura vs self-hosted)

### Decision Points

**Q1: Should we build this?**
- **Yes, if:** HELM's value proposition includes "learning agents" or "organizational memory"
- **No, if:** HELM is purely an execution engine with no memory requirements

**Q2: Property Graph or RDF?**
- **Property Graph (Neo4j)** - Recommended for MVP
- **RDF (GraphDB)** - Only if need semantic interoperability

**Q3: Build vs. Buy?**
- **Build:** Graph schema, query engine, agent integration
- **Buy:** Graph database (Neo4j Aura), visualization (Neo4j Bloom)
- **Partner:** Consider TrustGraph or similar "context graph as a service"

---

## Appendix: Related Concepts

### A. GraphRAG (Graph Retrieval-Augmented Generation)

GraphRAG = Vector search + Graph traversal for LLM context assembly

**Traditional RAG:**
```
Query → Vector Search → Top-K Docs → LLM
```

**GraphRAG:**
```
Query → Vector Search → Relevant Entities →
Graph Traversal (find related nodes) →
Subgraph Extraction → LLM
```

**Why Better:**
- Vector search finds semantically similar content
- Graph adds **relationships** and **context**
- Result: More complete, less hallucination

### B. Knowledge Graphs vs. Context Graphs

| Aspect | Knowledge Graph | Context Graph |
|--------|----------------|---------------|
| **Focus** | What things are | Why things happened |
| **Time** | Static/eternal facts | Temporal, versioned |
| **Content** | Entities, ontologies | + Events, decisions, evidence |
| **Use Case** | Semantic search | Decision support, audit |

### C. Glossary

- **Node:** A vertex in the graph (entity, event, policy, etc.)
- **Edge:** A relationship between two nodes
- **Property Graph:** Graph model with properties on nodes/edges
- **RDF:** Resource Description Framework (semantic web standard)
- **Triple:** Subject-Predicate-Object (RDF statement)
- **Cypher:** Query language for Neo4j property graphs
- **SPARQL:** Query language for RDF graphs
- **Subgraph:** A subset of the full graph (relevant to a query)
- **Provenance:** Origin/source information for a fact or decision
- **Bitemporal:** Tracking both valid-time and transaction-time
- **Graph Traversal:** Following edges from node to node
- **Multi-hop Query:** Query that traverses multiple edges

---

## References

Key citations from the article:
- [1] "Knowledge graph augmented with contextual metadata"
- [2] Jaya Gupta: "Living record of decision traces"
- [7] Research showing temporal/source context improves QA accuracy
- [16] Provenance and confidence in context graphs
- [24] Data lineage and causality tracking
- [45] Neo4j context graph models for financial services

---

**Document Version:** 1.0
**Last Updated:** 2026-01-26
**Author:** Analysis for HELM Product Team
**Status:** Draft for Review
