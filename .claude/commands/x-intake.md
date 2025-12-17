name: x-intake
description: Start a new project OR continue with improvements on existing projects
arguments:
  - name: mode
    description: "Optional: 'full' for comprehensive analysis (default is simple/fast mode)"
    required: false

---

# Intake Command

This command handles both new project intake AND improvements to existing projects.

**DEFAULT BEHAVIOR:** Uses SIMPLE mode (fast, no extensive codebase analysis). Use `full` argument for comprehensive architectural analysis.

**For file-based intake:** Use `/x-intake-file` instead.

## FIRST: Check Project State (CRITICAL)

**Before doing ANYTHING else, read `x-project/master-state.md` to determine the project lifecycle stage.**

```
Read x-project/master-state.md and check the Progress section.
```

### Route Based on State:

**If Phase 6 (PR) is checked OR phases 1-6 are all completed:**
```
Project Already Implemented

This project has already gone through the initial build cycle.
Routing to Continuous Improvement phase...

Run /x-improve to:
- Address bug fixes
- Implement enhancements
- Optimize performance
- Handle user feedback

Would you like me to run /x-improve now? [Y/n]
```
→ If yes, invoke `/x-improve` command
→ Do NOT proceed with new project intake questions

**If project is in progress (some phases checked but not complete):**
```
Project In Progress

Current phase: {phase from state.md}
Current task: {task from state.md}

Options:
1. Resume current work
2. Start a NEW project/feature (will create separate spec)
3. Add improvement task to existing backlog

Which would you like to do?
```

**If IDLE or no phases checked:**
→ Continue with new project intake below

---

## Determine Mode

**Check the argument for mode:**

- `full` → Use MODE: FULL (comprehensive architectural analysis)
- No argument or `simple` → Use MODE: SIMPLE (default, fast)

---

## New Project Intake (Interactive Mode)

**Only reach this section if:**
- State shows IDLE or no phases completed

### 1. Check for Existing Specs

List files in `x-project/specs/`:
- If specs exist, ask if user wants to:
  - Review/revise existing spec
  - Create new spec for different feature
  - Cancel

### 2. Gather Requirements

Ask clarifying questions (keep it brief for simple mode).

**After gathering requirements, log them:**

```bash
python3 .x-system/scripts/intake-logger.py log-intake --content "{summary of gathered requirements}" --summary "{brief description}" --mode {simple|full}
```

This creates a log at `x-project/logs/intake/session-YYYYMMDD-HHMMSS.md`

**For SIMPLE mode (default):**
- What do you want to accomplish?
- Any specific files or areas of code involved?
- How will we know it's done?

**For FULL mode:**
- What is the business goal?
- Who are the users?
- What are the key use cases?
- What are the success criteria?
- Are there technical constraints?
- Are there integration requirements?
- What is the timeline/urgency?

### 3. Spawn task-spec-generator Subagent

**NEVER create the spec yourself. Always use the Task tool.**

#### For SIMPLE Mode (Default):

```javascript
Task({
  subagent_type: "x-task-spec-generator",
  description: "Generate spec for {feature} (simple mode)",
  prompt: `Create a SIMPLE, lightweight specification for {feature description}.

MODE: SIMPLE
- Do NOT analyze the entire codebase
- Do NOT do extensive architectural discovery
- Skip Phase 1 (Discovery & Analysis) entirely
- Focus only on: What needs to be done, Where to do it, Acceptance criteria
- Keep the spec concise and actionable

Requirements gathered:
- Goal: {what user wants to accomplish}
- Location: {specific files/areas if mentioned}
- Done criteria: {how we know it's done}

Create a minimal spec with:
1. Overview (2-3 sentences)
2. Implementation Steps (just the key steps)
3. Acceptance Criteria

The spec should be saved to x-project/specs/SPEC-{XXX}-{short-description}.md
`
});
```

#### For FULL Mode:

```javascript
Task({
  subagent_type: "x-task-spec-generator",
  description: "Generate spec for {feature} (full mode)",
  prompt: `Create a comprehensive specification for {feature description}.

MODE: FULL
- Analyze existing codebase for patterns and architecture
- Do thorough discovery before specifying
- Include detailed implementation steps with code examples

Requirements gathered:
- Business goal: {goal}
- Users: {users}
- Use cases: {use cases}
- Success criteria: {criteria}
- Technical constraints: {constraints}
- Integration needs: {needs}
- Timeline: {urgency}

The spec should be saved to x-project/specs/SPEC-{XXX}-{short-description}.md
`
});
```

### 4. Update Master Files

After spec is created:

**For SIMPLE mode:** Skip master file updates unless critical.

**For FULL mode:**
- Update `x-project/master-state.md`: Set Current Phase to INTAKE, add to Key Decisions Log
- Update `x-project/master-spec.md`: Fill in Original Requirements section

### 5. Next Steps

After spec generation, ask:
- "Spec created. Would you like me to:"
  - "1. Run `/x-get-tasks` to create backlog tasks"
  - "2. Run `/x-get-tasks` then `/x-do-tasks` to implement immediately"
  - "3. Stop here so you can review the spec"

---

## Starter Symbol

Use the appropriate symbol at the start of all messages during this command.

---

## Quick Reference

| Argument | Mode | Behavior |
|----------|------|----------|
| (none) | SIMPLE | Fast spec, no codebase scan |
| `simple` | SIMPLE | Same as no argument |
| `full` | FULL | Comprehensive analysis |
