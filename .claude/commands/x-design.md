name: x-design
description: Create architecture and implementation plan from spec
---

# 📐 Phase 2: Design (Architecture Planning)

You are creating a detailed implementation plan based on an approved specification.

## Before You Begin

1. **Read state file:** `x-project/master-state.md`
   - Verify a spec exists and is approved
   - If no spec exists, run `/x-intake` first

2. **Read the spec:**
   - Identify file in `x-project/specs/`
   - Read entire specification
   - Note any open questions

3. **Read master spec:** `x-project/master-spec.md`
   - Check for existing architecture decisions
   - Review original requirements

## Your Tasks

### 1. Analyze Current Architecture

Examine existing codebase:
- **Apex Classes:** What patterns exist? (Service layer, selector pattern, trigger handlers)
- **LWC Components:** What UI patterns are in use?
- **Database:** What custom objects/fields exist? Any relevant metadata?
- **Tests:** What testing patterns are in use?
- **Integrations:** Any existing API patterns?

### 2. Make Architecture Decisions

Consider:
- **Apex Architecture:**
  - Service layer for business logic?
  - Selector pattern for queries?
  - Trigger handler pattern?
  - Domain layer needed?
- **LWC Architecture:**
  - Component composition approach?
  - State management pattern?
  - API service layer?
- **Data Model:**
  - New objects/fields needed?
  - Relationships to existing objects?
  - Indexing strategy?
- **Testing Strategy:**
  - Test data factories?
  - Mock frameworks?
  - Bulk test scenarios?
- **Security:**
  - CRUD/FLS enforcement approach?
  - Sharing rules?
  - Platform encryption?
- **Governor Limits:**
  - Bulkification strategy?
  - Async processing (Queueable, Batch, Future)?
  - Query optimization?

### 3. Create Design Document

Create: `x-project/designs/DESIGN-{XXX}-{short-description}.md`

**Design structure:**
```markdown
# DESIGN-{XXX}: {Title}

**Related Spec:** SPEC-{XXX}
**Date:** {date}
**Author:** Claude Code
**Status:** Draft

## Architecture Overview

{High-level diagram or description}

## Components

### Apex Classes
| Class | Type | Purpose |
|-------|------|---------|
| {Name}Service | Service | {Business logic} |
| {Name}Selector | Selector | {SOQL queries} |
| {Name}TriggerHandler | Trigger Handler | {Trigger logic} |

### LWC Components
| Component | Purpose | Dependencies |
|-----------|---------|--------------|

### Database Changes
| Object/Field | Type | Purpose |
|--------------|------|---------|

### Tests
| Test Class | Coverage Target | Scenarios |
|------------|-----------------|-----------|

## Implementation Approach

### Phase 1: Data Model
1. {Step}
2. {Step}

### Phase 2: Business Logic
1. {Step}
2. {Step}

### Phase 3: UI
1. {Step}
2. {Step}

### Phase 4: Testing
1. {Step}
2. {Step}

## Key Decisions

| Decision | Rationale | Alternatives Considered |
|----------|-----------|-------------------------|

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|

## Governor Limit Analysis

| Operation | Limit Type | Risk Level | Mitigation |
|-----------|------------|------------|------------|
| {Query} | SOQL Queries | {Low/Med/High} | {Strategy} |

## Security Considerations

- CRUD/FLS: {Approach}
- Sharing: {Model}
- Sensitive Data: {Handling}

## Dependencies

- [ ] {External dependency 1}
- [ ] {Org configuration requirement}

## Success Criteria

- [ ] {Technical criterion 1}
- [ ] All governor limits respected
- [ ] >75% test coverage
- [ ] Security review passed

## Next Steps

1. Get user approval
2. Proceed to /x-get-tasks
```

### 4. Update Master Files (CRITICAL)

**Update `x-project/master-state.md`:**
- Set Current Phase to: 📐 DESIGN
- Set Current Task to: DESIGN-{XXX} created, awaiting user approval
- Add ALL architecture decisions to Key Decisions Log with rationale
- Update Implementation History with design milestone
- Set Active Plans based on implementation phases

**Update `x-project/master-spec.md`:**
- Fill in Architecture section with system overview
- Document Technology Stack decisions
- Add Key Components and their responsibilities
- Document Data Model design
- Add Non-Functional Requirements
- Record any Constraints & Limitations discovered

### 5. Wait for User Approval

Ask user:
- "Does this architecture approach make sense?"
- "Are there any concerns about the design?"
- "Should I proceed to task decomposition?"

**Do not proceed without approval.**

## Starter Symbol
Use 📐 at the start of all messages during this phase.

## Context Management
- If codebase is large, examine only relevant parts
- Save design document frequently
- Update memory with important decisions
```
