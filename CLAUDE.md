# Claude Code Workflow Guardrails

> **CRITICAL**: This document defines MANDATORY workflow rules. Claude MUST follow these phases sequentially. No coding without requirements. No implementation without design review. No backlog creation without spec approval.

---

## Core Principles

1. **Ask First, Act Later** - Use `AskUserQuestion` extensively before making assumptions
2. **Document Before Code** - Requirements and design docs MUST exist before implementation
3. **Explicit Approval Gates** - NEVER proceed to next phase without user saying "approved" or equivalent
4. **Small Commits, Frequent Updates** - Commit after each backlog task; update state file after each commit
5. **State Persistence** - The `PROJECT_STATE.md` file is the source of truth for progress

---

## Mandatory Workflow Phases

### Phase 1: Gather Requirements

**STOP and ask questions. Do NOT proceed without clarity.**

Before ANY work begins:

1. Read `PROJECT_STATE.md` if it exists (resume context)
2. Use `AskUserQuestion` to clarify:
   - What is the user trying to achieve? (goal)
   - What does success look like? (acceptance criteria)
   - What constraints exist? (tech stack, time, dependencies)
   - What is out of scope?
3. Document requirements in a structured format
4. **APPROVAL GATE**: Ask user to confirm requirements are complete

**Exit Criteria:**
- [ ] User has explicitly confirmed requirements are complete
- [ ] Acceptance criteria are documented
- [ ] Scope boundaries are clear

---

### Phase 2: Design Review

**Create and review design document BEFORE any code.**

1. Create design document: `docs/design/DESIGN-{feature-name}.md`
2. Include:
   - Problem statement
   - Proposed solution (high-level)
   - Key decisions and trade-offs
   - Risks and mitigations
   - File/component changes needed
3. Present design to user using `AskUserQuestion`:
   - "Does this approach make sense?"
   - "Any concerns with [specific decision]?"
   - "Should I proceed to technical specification?"
4. **APPROVAL GATE**: Wait for explicit "approved" before proceeding

**Exit Criteria:**
- [ ] Design document saved
- [ ] User has explicitly approved design
- [ ] No unresolved questions

---

### Phase 3: Technical Specification

**Detail the implementation plan BEFORE writing code. Get approval BEFORE creating backlog tasks.**

#### Step 3a: Technical Clarification Questions

BEFORE writing the spec, use `AskUserQuestion` to clarify technical decisions:

1. **Architecture Questions**:
   - "What patterns should this follow? (e.g., existing service patterns, new approach)"
   - "Where should new files be located?"
   - "Should this extend existing components or create new ones?"

2. **Implementation Questions**:
   - "What's the preferred tech stack for [specific component]?"
   - "Are there existing utilities/services to reuse?"
   - "What are the integration points with existing code?"

3. **Testing Questions**:
   - "What level of test coverage is expected?"
   - "Should this include integration tests, unit tests, or both?"
   - "Are there specific edge cases to cover?"

4. **Scope Questions**:
   - "Should [optional feature] be included in this phase?"
   - "What's the MVP vs nice-to-have?"

#### Step 3b: Write Technical Spec

After clarifications, create technical spec: `docs/specs/SPEC-{feature-name}.md`

Include:
- Implementation steps (ordered)
- Files to create/modify
- Test strategy (what tests, what coverage)
- Dependencies between steps
- API/interface definitions if applicable

#### Step 3c: Spec Approval

Present spec summary to user using `AskUserQuestion`:
- "Here's the implementation plan. Should I proceed to create backlog tasks?"
- Options: "Approved - Create Backlog", "Changes Needed", "Review Spec First"

**APPROVAL GATE**: Do NOT create backlog tasks until user explicitly approves the spec.

**Exit Criteria:**
- [ ] Technical clarifications gathered via AskUserQuestion
- [ ] Technical spec saved
- [ ] User has explicitly approved the spec
- [ ] User has authorized backlog creation

---

### Phase 4: Create Backlog Tasks

**ONLY proceed to this phase after explicit spec approval.**

1. Confirm: "You approved the spec. Now creating backlog tasks..."
2. Launch `x-backlog-task-manager` subagent
3. Transform spec into backlog items:
   - One task per logical unit of work (2-4 hours max)
   - Clear acceptance criteria per task
   - Dependencies between tasks identified
   - Priority assigned
4. Present task summary to user
5. **APPROVAL GATE**: Ask "Ready to begin implementation?"
6. Update `PROJECT_STATE.md` with task summary

**Exit Criteria:**
- [ ] Spec was explicitly approved first
- [ ] All tasks created in backlog
- [ ] Dependencies documented
- [ ] User has approved task breakdown
- [ ] User has authorized implementation to begin

---

### Phase 5: Execute Tasks (TDD)

**ONLY proceed to this phase after explicit backlog approval.**

**Work through backlog tasks one at a time.**

For EACH task:

1. **Start Task**
   - Mark task `In Progress` in backlog
   - Create feature branch if first task: `git checkout -b feature/{feature-name}`

2. **Write Tests First** (TDD)
   - Write failing test that covers acceptance criteria
   - Verify test fails for the right reason

3. **Implement**
   - Write minimal code to pass tests
   - Run tests - all must pass
   - Refactor if needed (keep tests green)

4. **Commit**
   - Stage changes
   - Commit with descriptive message referencing task
   - Format: `feat(scope): description [TASK-XXX]`

5. **Update State**
   - Mark task `Done` in backlog
   - Update `PROJECT_STATE.md`:
     - Current task completed
     - Next task identified
     - Any blockers or notes

6. **Check for Manual Testing**
   - If task requires manual testing, STOP and notify user
   - Wait for user confirmation before proceeding

7. **Repeat** for next task

**Exit Criteria per Task:**
- [ ] Tests written and passing
- [ ] Code committed
- [ ] Backlog updated
- [ ] `PROJECT_STATE.md` updated

---

### Phase 6: Completion & PR

**When all tasks are done:**

1. Run full test suite
2. Run linter/formatter
3. Update documentation if needed
4. Create PR with:
   - Summary of changes
   - Link to design doc
   - Test plan
5. Update `PROJECT_STATE.md`:
   - Mark feature complete
   - Document any follow-up items
6. Notify user: "Ready for review"

---

## Approval Gate Summary

| Phase | Gate Question | Proceed Only If |
|-------|---------------|-----------------|
| Requirements | "Are requirements complete?" | User confirms "yes" |
| Design | "Design approved?" | User says "approved" |
| Spec | "Spec approved? Create backlog?" | User says "approved" |
| Backlog | "Ready to implement?" | User confirms "yes" |
| Each Task | "Continue to next task?" | User confirms or auto-proceed |

**CRITICAL**: If user says "review first", "changes needed", or anything other than clear approval, STOP and address their concerns before proceeding.

---

## PROJECT_STATE.md Structure

This file MUST be updated after EVERY task completion:

```markdown
# Project State

## Current Feature
- **Branch**: feature/{name}
- **Phase**: [Requirements | Design | Spec | Backlog | Implementation | Complete]
- **Started**: {date}

## Progress
- [x] Requirements gathered
- [x] Design approved
- [x] Spec approved
- [x] Backlog created
- [ ] Implementation (3/7 tasks)
- [ ] PR created

## Current Task
- **ID**: TASK-XXX
- **Description**: {what}
- **Status**: In Progress

## Completed Tasks
1. TASK-001: {description} - {commit hash}
2. TASK-002: {description} - {commit hash}

## Blockers
- None | {description of blocker}

## Notes
- {any important context}

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Tests passing
- [ ] Code reviewed
- [ ] Documentation updated
```

---

## Workflow Enforcement Rules

### NEVER Do:
- Start coding without requirements approval
- Skip design review
- Implement without a spec
- **Create backlog tasks without spec approval**
- Work on multiple tasks simultaneously
- Commit without updating state
- Assume - always ask
- Proceed on "maybe" or "I guess" - get clear approval

### ALWAYS Do:
- Use `AskUserQuestion` when uncertain
- Use `AskUserQuestion` for technical clarifications before writing spec
- Save documents before proceeding to next phase
- Get **explicit** user approval at phase gates
- Wait for clear "approved" before proceeding
- Update `PROJECT_STATE.md` after each task
- Commit after each completed task
- Check for manual testing requirements

---

## Quick Reference Commands

| Phase | Action | Tool/Command |
|-------|--------|--------------|
| Requirements | Ask questions | `AskUserQuestion` |
| Design | Save document | Write to `docs/design/` |
| Spec | Ask tech questions | `AskUserQuestion` |
| Spec | Save document | Write to `docs/specs/` |
| Backlog | Create tasks | `x-backlog-task-manager` subagent |
| Implement | Track progress | Backlog MCP tools |
| Commit | Save work | `git commit` |
| State | Update progress | Write to `PROJECT_STATE.md` |

---

## Recovery: Resuming Work

When starting a new session:

1. Read `PROJECT_STATE.md`
2. Check git status and branch
3. Check backlog for current task
4. Resume from last known state
5. Use `AskUserQuestion` if context is unclear

---

## Sources

Workflow best practices informed by:
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) - Anthropic Engineering
- [Practical Guide to Effective AI Coding](https://nx.dev/blog/practical-guide-effective-ai-coding) - NX Blog
- [Best Practices for AI-Assisted Coding](https://engineering.axur.com/2025/05/09/best-practices-for-ai-assisted-coding.html) - Axur Engineering
