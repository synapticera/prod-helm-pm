---
name: requirements-gathering
description: Guide users through structured requirements gathering for software projects. Use when user wants to start a new feature, define requirements, gather specifications, or begin project intake. This workflow helps capture functional requirements, non-functional requirements, constraints, and acceptance criteria through systematic questioning. Trigger when user mentions requirements, specs, intake, new feature, or project planning.
---

# Requirements Gathering Workflow

This skill provides a structured workflow for gathering comprehensive software requirements. Act as an experienced business analyst, walking users through four stages: Discovery, Requirements Elicitation, Validation, and Documentation.

## When to Offer This Workflow

**Trigger conditions:**
- User mentions gathering requirements: "new feature", "requirements", "specs", "intake"
- User mentions starting a project: "start a project", "new project", "build something"
- User seems to be defining what to build without clear requirements

**Initial offer:**
Offer a structured workflow for requirements gathering. Explain the four stages:

1. **Discovery**: Understand the problem space, stakeholders, and context
2. **Requirements Elicitation**: Systematically capture functional and non-functional requirements
3. **Validation**: Verify requirements are complete, consistent, and testable
4. **Documentation**: Produce a structured requirements specification

Ask if they want to try this workflow or prefer to work freeform.

If user declines, work freeform. If user accepts, proceed to Stage 1.

## Stage 1: Discovery

**Goal:** Understand the problem being solved before defining solutions.

### Problem Statement

Start by asking foundational questions:

1. What problem are we trying to solve?
2. Who experiences this problem? (users, roles, personas)
3. What happens today without this solution? (current state)
4. What's the impact of not solving this? (business cost, user pain)
5. What does success look like? (desired outcome)

Inform them they can answer in shorthand or dump information however works best.

### Stakeholder Mapping

Once the problem is understood, identify stakeholders:

1. Who are the primary users of this system/feature?
2. Who are secondary stakeholders (admins, managers, integrations)?
3. Who has decision-making authority?
4. Who needs to be consulted but won't use the system directly?
5. Are there any external parties affected (customers, partners, regulators)?

### Context Gathering

Encourage the user to share relevant context:

- Existing systems or processes this relates to
- Technical constraints (platforms, languages, integrations)
- Business constraints (timeline, budget, compliance)
- Previous attempts or related projects
- Documentation, mockups, or reference materials

**During context gathering:**

- Track what's being learned and what's still unclear
- Ask clarifying questions as gaps emerge
- Don't let assumptions accumulate - verify them

**Exit condition:**
Sufficient context when the problem, stakeholders, and constraints are clearly understood.

**Transition:**
Ask if there's any more context to provide, or if it's time to move to requirements elicitation.

## Stage 2: Requirements Elicitation

**Goal:** Systematically capture what the system must do and how well it must do it.

### Functional Requirements

For each user type/persona identified, work through:

1. **User Goals**: What does this user need to accomplish?
2. **User Stories**: As a [role], I want [capability] so that [benefit]
3. **Acceptance Criteria**: Given [context], when [action], then [expected result]
4. **Edge Cases**: What happens in unusual situations?
5. **Error Handling**: How should the system respond to failures?

**Elicitation technique:**
For each capability area:

1. Ask 3-5 clarifying questions about scope and behavior
2. Brainstorm 5-15 potential requirements
3. Have user indicate which to keep/remove/modify
4. Capture final requirements with acceptance criteria

### Non-Functional Requirements

Systematically address quality attributes:

**Performance:**
- Response time expectations
- Throughput/capacity requirements
- Concurrent user expectations

**Security:**
- Authentication requirements
- Authorization/access control
- Data protection needs
- Compliance requirements (GDPR, HIPAA, SOC2, etc.)

**Reliability:**
- Uptime requirements
- Backup/recovery needs
- Error tolerance

**Usability:**
- Accessibility requirements
- Device/browser support
- Internationalization needs

**Scalability:**
- Expected growth
- Peak load scenarios

**Integration:**
- External systems to connect with
- API requirements
- Data exchange formats

### Constraints and Assumptions

Document explicitly:

**Constraints (non-negotiable):**
- Technical platform constraints
- Timeline constraints
- Budget constraints
- Regulatory constraints

**Assumptions (need verification):**
- Things assumed to be true
- Dependencies on other teams/systems
- Risks if assumptions prove false

### Out of Scope

Explicitly capture what is NOT included:

- Features explicitly excluded
- User types not supported
- Integrations not needed in this phase
- Future considerations (documented but deferred)

## Stage 3: Validation

**Goal:** Ensure requirements are complete, consistent, and testable.

### Completeness Check

Review each requirement for:

1. **Clarity**: Is it unambiguous? Could two people interpret it differently?
2. **Testability**: Can we write a test to verify this requirement is met?
3. **Feasibility**: Is this technically achievable within constraints?
4. **Necessity**: Does this trace back to a real user need or business goal?

### Consistency Check

Look for:

1. **Contradictions**: Do any requirements conflict with each other?
2. **Gaps**: Are there user journeys without complete coverage?
3. **Duplicates**: Are requirements stated multiple ways?

### Priority Assignment

For each requirement, assign:

- **Must Have (P0)**: System is unusable without this
- **Should Have (P1)**: Important but workarounds exist
- **Nice to Have (P2)**: Enhances experience but not essential
- **Future (P3)**: Captured for later consideration

### Stakeholder Review

Prepare questions for stakeholder validation:

1. Have we captured all the key user needs?
2. Are priorities correctly assigned?
3. Are constraints accurately represented?
4. Is anything missing or misunderstood?

## Stage 4: Documentation

**Goal:** Produce a structured, usable requirements specification.

### Document Structure

Create a requirements document with:

```markdown
# Requirements Specification: [Project Name]

## 1. Executive Summary
- Problem statement
- Proposed solution overview
- Key stakeholders
- Timeline/constraints summary

## 2. Stakeholders
- Primary users
- Secondary stakeholders
- Decision makers

## 3. Functional Requirements
### 3.1 [Feature Area 1]
- FR-001: [Requirement]
  - User Story: As a [role]...
  - Acceptance Criteria: Given/When/Then
  - Priority: [P0/P1/P2/P3]

### 3.2 [Feature Area 2]
...

## 4. Non-Functional Requirements
### 4.1 Performance
### 4.2 Security
### 4.3 Reliability
### 4.4 Usability
### 4.5 Scalability
### 4.6 Integration

## 5. Constraints
- Technical constraints
- Business constraints
- Regulatory constraints

## 6. Assumptions and Dependencies

## 7. Out of Scope

## 8. Glossary
- Domain-specific terms defined

## 9. Appendix
- Reference materials
- Mockups/wireframes
- Related documentation
```

### Output Location

Save the specification to:
- `x-project/specs/SPEC-{number}-{feature-name}.md`

### Handoff

When documentation is complete:

1. Confirm the spec captures everything discussed
2. Suggest next steps (design, task breakdown, implementation)
3. Recommend the spec be reviewed by stakeholders before development begins

## Tips for Effective Requirements Gathering

**Questioning Technique:**
- Ask "why" to understand underlying needs
- Ask "what else" to ensure completeness
- Ask "what if" to uncover edge cases
- Avoid leading questions that suggest answers

**Common Pitfalls:**
- Jumping to solutions before understanding problems
- Assuming technical knowledge from business stakeholders
- Capturing "how" instead of "what"
- Missing non-functional requirements
- Not documenting out-of-scope items

**Handling Uncertainty:**
- Mark assumptions explicitly
- Flag items needing stakeholder confirmation
- Use "TBD" for items requiring more research
- Document risks associated with unknowns

**Quality Indicators:**
- Each requirement traces to a user need
- Requirements are testable with clear pass/fail criteria
- No ambiguous language ("fast", "easy", "flexible")
- Priorities are assigned and justified
