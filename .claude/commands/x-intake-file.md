name: x-intake-file
description: Read requirements from x-project/intake.md and generate a specification

---

# Intake from File

This command reads requirements directly from `x-project/intake.md` and generates a specification.

## Your Task

1. **Log the intake file (FIRST):**

Before processing, create a timestamped backup of the intake file for audit purposes:

```bash
python3 .x-system/scripts/intake-logger.py log-intake-file
```

This creates a copy at `x-project/logs/intake/intake-YYYYMMDD-HHMMSS.md`

2. **Read the intake file:**

```
Read x-project/intake.md
```

**IMPORTANT:** Stop reading at `## Ignore Below Here`. Any content below that heading must be completely ignored and not passed to the spec generator.

3. **Parse the Intake Execution Plan:**

Check which options have `[x]` selected:

**Confirmation:**
- `no confirm` - Skip confirmation, proceed immediately

**Spec Generation Mode:**
- `simple` - Skip detailed architectural review, generate lightweight spec
- (unchecked) - Full architectural analysis and comprehensive spec

**Post-Spec Actions:**
- `auto execute` - will call `/x-get-tasks` AND `/x-do-tasks` after spec
- `auto decomp` - will call `/x-get-tasks` but NOT `/x-do-tasks`
- `auto design` - will call `/x-design` for complicated tasks
- `do nothing` - stop after spec generation, user calls next step

4. **Display summary of what was found:**

```
Intake from File

Request: {summary of Request Description section}
Type: {type of work checked}
Context: {context if any}
Acceptance Criteria: {criteria if any}
Mode: {simple or full}
Execution Plan: {which post-intake option is selected}
```

5. **Ask for confirmation (unless "no confirm" is checked):**

If `no confirm` is NOT checked:
"Does this look correct? Should I proceed with generating a specification? [Y/n]"

If `no confirm` IS checked:
Skip confirmation and proceed immediately.

6. **Spawn the task-spec-generator subagent:**

**If `simple` is checked:**

```javascript
Task({
  subagent_type: "x-task-spec-generator",
  description: "Generate spec from intake file (simple mode)",
  prompt: `Create a SIMPLE, lightweight specification based on the intake document.

MODE: SIMPLE
- Do NOT analyze the entire codebase
- Do NOT do extensive architectural discovery
- Skip Phase 1 (Discovery & Analysis) entirely
- Focus only on: What needs to be done, Where to do it, Acceptance criteria
- Keep the spec concise and actionable

Intake Document Contents:
---
{Contents of x-project/intake.md UP TO but NOT INCLUDING "## Ignore Below Here"}
---

Create a minimal spec with:
1. Overview (2-3 sentences)
2. Implementation Steps (just the key steps, no extensive code examples)
3. Acceptance Criteria
4. Skip: Rollback plans, extensive testing strategies, architecture analysis

The spec should be saved to x-project/specs/SPEC-{XXX}-{short-description}.md
`
});
```

**If `simple` is NOT checked (full mode):**

```javascript
Task({
  subagent_type: "x-task-spec-generator",
  description: "Generate spec from intake file (full mode)",
  prompt: `Create a comprehensive specification based on the intake document.

MODE: FULL
- Analyze existing codebase for patterns and architecture
- Do thorough discovery before specifying
- Include detailed implementation steps with code examples

Intake Document Contents:
---
{Contents of x-project/intake.md UP TO but NOT INCLUDING "## Ignore Below Here"}
---

Analyze the request and create a specification. Pay attention to:
- The "Request Description" section for the main goal
- The "Type of Work" for context on scope
- The "Context & Related Work" for dependencies and constraints
- The "Acceptance Criteria" for success measures

The spec should be saved to x-project/specs/SPEC-{XXX}-{short-description}.md
`
});
```

7. **If not confirmed:** Ask what they'd like to change

## After Spec Generation - Execute Post Intake Plan

**IMPORTANT:** The x-task-spec-generator will return the spec file path in its response. Capture this path to pass to the next steps.

Based on the **Intake Execution Plan** selection in the intake file, execute the appropriate next steps:

### If "auto execute" is selected `[x]`:
1. Note the spec file path returned by the spec generator (e.g., `x-project/specs/SPEC-005-minor-ui-fixes.md`)
2. **Read the spec file** to get its contents
3. Spawn the x-backlog-task-manager subagent directly (do NOT just run `/x-get-tasks`):

```javascript
Task({
  subagent_type: "x-backlog-task-manager",
  description: "Create tasks from spec",
  prompt: `Create backlog tasks from the specification.

MODE: SIMPLE

Spec file path: {FULL PATH from spec generator}

Spec contents:
---
{PASTE THE SPEC FILE CONTENTS YOU JUST READ}
---

IMPORTANT: All task management MUST be done through backlog.md MCP tools. Never create task files manually.

Create tasks for each implementation step using the backlog MCP.
If backlog MCP is not initialized, report to user to run 'backlog init' first.
Return a summary of tasks created.
`
});
```

4. After decomposition completes, automatically run `/x-do-tasks` to begin implementation
5. Continue until all tasks are complete or user intervenes

### If "auto decomp" is selected `[x]`:
1. Note the spec file path returned by the spec generator
2. **Read the spec file** to get its contents
3. Spawn the x-backlog-task-manager subagent directly with the spec contents (same as above)
4. STOP after decomposition - do NOT run `/x-do-tasks`
5. Report: "Decomposition complete. Tasks are ready in the backlog. Run `/x-do-tasks` when ready to implement."

### If "auto design" is selected `[x]`:
1. Automatically run `/x-design` to create a detailed design document
2. STOP after design - let user review before proceeding
3. Report: "Design document created. Review and run `/x-get-tasks` when ready."

### If "do nothing" is selected `[x]`:
1. STOP after spec generation
2. Report: "Specification created at {spec path}. You can now:
   - Run `/x-design` for detailed architecture planning
   - Run `/x-get-tasks` to create backlog tasks
   - Review and edit the spec manually"

## Update Master Files

After spec generation (before executing post-intake plan):

**Update `x-project/master-state.md`:**
- Set Current Phase to: INTAKE
- Set Current Task to: SPEC-{XXX} created
- Note the execution plan being followed
- Add entry to Key Decisions Log if significant decisions were made

**Update `x-project/master-spec.md`:**
- Fill in Original Requirements section with gathered requirements

## Starter Symbol

Use the appropriate symbol at the start of all messages:
- During intake/spec generation
- During decomposition (if auto)
- During implementation (if auto execute)
