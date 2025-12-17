name: x-get-tasks
description: Break design into actionable backlog tasks via backlog-task-manager subagent
arguments:
  - name: mode
    description: "Optional: 'full' for comprehensive task breakdown (default is simple/fast mode)"
    required: false

---

# Phase 3: Decomposition (Task Creation)

You are breaking an approved design into granular, actionable tasks by spawning the backlog-task-manager subagent.

**DEFAULT BEHAVIOR:** Uses SIMPLE mode (fast, direct task creation from spec). Use `full` argument for comprehensive task breakdown with dependencies.

## Determine Mode

**Check the argument for mode:**

- `full` → Use MODE: FULL (comprehensive task breakdown)
- No argument or `simple` → Use MODE: SIMPLE (default, fast)

## Before You Begin

1. **Find the spec/design:**
   - List files in `x-project/specs/` using Glob tool: `x-project/specs/*.md`
   - Identify the most recently created spec file (by modification time or SPEC number)
   - **READ the spec file** - you need to know its contents to pass to the subagent
   - Note the full path to the spec file

2. **For FULL mode only:** Also read:
   - `x-project/master-state.md` for context
   - `x-project/master-spec.md` for architecture

**CRITICAL:** You MUST pass the spec file path AND the spec contents to the backlog-task-manager subagent.

## Your Tasks

### 1. Spawn backlog-task-manager Subagent (CRITICAL)

**NEVER create tasks yourself. Always use the Task tool to spawn the backlog-task-manager subagent.**

#### For SIMPLE Mode (Default):

```javascript
Task({
  subagent_type: "x-backlog-task-manager",
  description: "Create tasks from spec (simple mode)",
  prompt: `Create backlog tasks from the specification.

MODE: SIMPLE
- Create tasks directly from the spec's implementation steps
- Do NOT analyze dependencies deeply
- Do NOT create elaborate task structures
- Keep it minimal and fast

Spec file path: {FULL PATH to spec file, e.g. /Users/.../x-project/specs/SPEC-005-feature-name.md}

Spec contents:
---
{PASTE THE ENTIRE SPEC FILE CONTENTS HERE}
---

IMPORTANT: All task management MUST be done through backlog.md MCP tools. Never create task files manually.

For each implementation step in the spec, create a task using the backlog MCP:
- Title: The step description
- Description: Brief context
- Priority: medium
- Status: To Do
- Acceptance Criteria: ["Step complete", "Tests pass if applicable"]

If the backlog MCP is not initialized, report to the user that they need to run 'backlog init' first.

Return a brief summary of tasks created.
`
});
```

#### For FULL Mode:

```javascript
Task({
  subagent_type: "x-backlog-task-manager",
  description: "Decompose {design} into backlog tasks (full mode)",
  prompt: `Break down the approved design/specification into granular, actionable backlog tasks.

MODE: FULL
- Analyze the spec thoroughly
- Create detailed task structures with dependencies
- Include effort estimates and acceptance criteria

Spec file path: {FULL PATH to spec file, e.g. /Users/.../x-project/specs/SPEC-005-feature-name.md}

Spec contents:
---
{PASTE THE ENTIRE SPEC FILE CONTENTS HERE}
---

IMPORTANT: All task management MUST be done through backlog.md MCP tools. Never create task files manually.

Requirements:
- Create tasks using mcp__backlog__task_create tool
- If MCP is not initialized, report to user to run 'backlog init' first
- Each task should take 2-4 hours max
- Include acceptance criteria for each task
- Set proper dependencies between tasks
- Use labels: apex, lwc, trigger, test, data-model, integration, etc.
- Follow task naming: TASK-XXX: {title}

Task Structure for each task:
{
  "title": "TASK-XXX: {Concise title}",
  "description": "{Detailed description from design}",
  "priority": "high|medium|low",
  "status": "To Do",
  "labels": ["apex|lwc|trigger|test", ...],
  "dependencies": ["task-1", "task-2"],
  "acceptanceCriteria": [
    "AC-1: {Specific, testable criterion}",
    "AC-2: Tests written with >75% coverage",
    "AC-3: Code passes lint and security review"
  ]
}

Typical Task Sequence:
1. Data Model Tasks (no dependencies)
2. Service Layer Tasks (depends on data model)
3. Trigger Tasks (depends on service layer)
4. LWC Tasks (depends on service layer)
5. Integration Tasks (depends on service layer)

After creating all tasks:
- Verify dependency chain makes sense
- Ensure parallel work is possible
- Return task summary with count and dependencies
`
});
```

### 2. Wait for Subagent to Complete

The backlog-task-manager subagent will:
- Read the spec
- Create tasks in Backlog.md using MCP tools
- Return a summary of created tasks

### 3. Update Master Files

**For SIMPLE mode:** Skip master file updates.

**For FULL mode:**
- Update `x-project/master-state.md`: Set Current Phase to DECOMPOSITION
- Update `x-project/master-spec.md`: Add any newly discovered constraints

### 4. Present Tasks to User

Show task summary:

```
Task Decomposition Complete

Created {N} tasks:
1. {task title}
2. {task title}
3. {task title}

Ready to implement. Run /x-do-tasks to start.
```

## IMPORTANT

**NEVER create tasks yourself.** Always use the backlog-task-manager subagent via the Task tool.

## Quick Reference

| Argument | Mode | Behavior |
|----------|------|----------|
| (none) | SIMPLE | Fast task creation from spec steps |
| `simple` | SIMPLE | Same as no argument |
| `full` | FULL | Detailed breakdown with dependencies |
