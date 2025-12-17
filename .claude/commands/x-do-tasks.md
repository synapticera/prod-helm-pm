name: x-do-tasks
description: Execute all open tasks in the backlog until complete

---

# 🔄 Do Tasks

This command implements all open tasks from the backlog, continuing until no tasks remain.

**CRITICAL:** You MUST run the backlog commands to update task status. The backlog.md file must reflect current task state at all times.

## Your Task

### 0. Check Workflow Configuration (CRITICAL)

**FIRST**, read the workflow configuration to determine git behavior:

```
Read x-project/workflow-config.yml
```

Check the `git.auto_feature_branches` setting:
- If `true`: Use feature branches (step 4b creates branches, step 4h merges)
- If `false`: Commit directly to main (skip branch creation/merge steps)

Store this setting for use throughout task execution.

### 1. Check for In-Progress Tasks (Recovery Mode)

**FIRST**, check if any tasks are stuck in "In Progress" status from a previous session:

```bash
backlog task list --status "In Progress"
```

If in-progress tasks are found:

```
🔄 Do Tasks - Recovery Mode

Found {N} task(s) in progress that may need recovery:

  ⚠️ TASK-XXX: {title} [Status: In Progress]

Resuming work on TASK-XXX...
```

**Resume working on in-progress tasks before starting new ones.** Skip to step 4 to continue implementation.

**Recovery notes:**
- Skip step 4a (task is already In Progress)
- If `auto_feature_branches: true`: Check for existing feature branch: `git branch | grep TASK-XXX`
  - If branch exists, switch to it: `git checkout feature/TASK-XXX-...`
  - If no branch, create one as normal (step 4b)
- If `auto_feature_branches: false`: Stay on main, continue work

### 2. Check for Open Tasks

Only if NO in-progress tasks exist, list tasks that are ready to work on:

```bash
backlog task list --status "To Do"
```

If no tasks are found (and no in-progress tasks):

```
🔄 Do Tasks

No open tasks in the backlog.

Options:
- Run /x-intake to add new requirements
- Run /x-get-tasks to break down existing specs into tasks
- Run /x-add-task to add a simple task
```

Exit if no tasks.

### 3. Show Task Queue

```
🔄 Do Tasks

Open tasks to implement:

  1. TASK-001: {title} [Priority: {priority}]
  2. TASK-002: {title} [Priority: {priority}]
  3. TASK-003: {title} [Priority: {priority}]

Starting with TASK-001...
```

### 4. Implement Current Task

For each task, follow the implementation workflow:

**a) Mark task as In Progress (DO THIS FIRST!):**
```bash
backlog task edit TASK-XXX --status "In Progress"
```
Then verify the update worked by running `backlog task view TASK-XXX` - status should show "In Progress".

**b) Git Setup (based on workflow-config.yml):**

**If `auto_feature_branches: true`:**
```bash
git checkout -b feature/TASK-XXX-short-description
```

**If `auto_feature_branches: false`:**
```bash
# Stay on main branch - no branch creation needed
git status  # Verify on main
```

**c) Spawn test-writer subagent (TDD - RED):**

```javascript
Task({
  subagent_type: "x-test-writer",
  description: "Write tests for {task title}",
  prompt: `Write comprehensive test coverage for the task BEFORE implementation.

Task: {task description}
Acceptance Criteria: {criteria}

Create tests that will FAIL initially (TDD RED phase).
`
});
```

**d) Implement code (TDD - GREEN):**
- Write minimal code to pass tests
- Follow existing patterns
- Run tests frequently

**e) Refactor (TDD - REFACTOR):**
- Improve code while keeping tests green
- Commit changes

**f) Run QA checks:**
```bash
npm test
npm run lint
```

**g) Mark task complete (REQUIRED!):**
```bash
backlog task edit TASK-XXX --status "Done"
```
Then verify: `backlog task view TASK-XXX` - status should show "Done".

**h) Commit and finalize (based on workflow-config.yml):**

**If `auto_feature_branches: true`:**
```bash
git add -A && git commit -m "feat(TASK-XXX): {task title}"
git checkout main && git merge feature/TASK-XXX-short-description
git branch -d feature/TASK-XXX-short-description
```

**If `auto_feature_branches: false`:**
```bash
git add -A && git commit -m "feat(TASK-XXX): {task title}"
# No merge needed - already on main
```

### 5. Loop to Next Task

After completing a task, show the updated board:

```bash
backlog board
```

Then continue:

```
✓ TASK-001 completed

Remaining tasks: 2

Continuing with TASK-002...
```

**Repeat step 4 for each remaining task.**

### 6. Completion

When all tasks are done, show final board state:

```bash
backlog board
```

```
🔄 Tasks Complete!

Completed {N} tasks:
  ✓ TASK-001: {title}
  ✓ TASK-002: {title}
  ✓ TASK-003: {title}

Next steps:
- Run /x-qa for final verification
- Run /x-pr to create a pull request (if auto_feature_branches: true)
- Run /x-archive-tasks to archive completed tasks
```

## Critical Requirements

1. **ALWAYS read workflow-config.yml first** - respect git settings
2. **ALWAYS run `backlog task edit` commands** - don't just describe them
3. **VERIFY status updates** - run `backlog task view TASK-XXX` after each status change
4. **Show board after each task** - run `backlog board` to show progress
5. The backlog.md file MUST be updated for each status change

## Interruption Handling

If the user wants to stop:
- Commit current work
- Update task status to reflect actual state (In Progress, Blocked, etc.)
- Run `backlog board` to show current state
- Report progress

## Starter Symbol

Use 🔄 at the start of all messages during this command.
