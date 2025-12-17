name: x-pr
description: Create pull request and cleanup feature branch
---

# 🟣 Phase 4.6: PR (Pull Request Creation)

You are creating a pull request for a completed, QA-verified task.

## Before You Begin

1. **Read state file:** `x-project/master-state.md`
   - Verify task is "Ready for QA" or user confirmed QA passed
   - Verify feature branch is active

2. **Read task:**
   ```javascript
   mcp__backlog__task_view({ id: "task-X" })
   ```
   - Get task title and description
   - Get acceptance criteria

3. **Verify QA passed:**
   - If task status is not "Ready for QA", ask user if QA passed
   - If QA not done, run `/x-qa` first

## PR Creation Workflow

### Step 1: Final Pre-PR Checks

**Verify clean working directory:**
```bash
git status
# Should show: nothing to commit, working tree clean
```

**If uncommitted changes exist:**
- Review changes: `git diff`
- Ask user if they should be committed
- Commit or discard before proceeding

**Verify all tests pass one final time:**
```bash
bash scripts/distill/test.sh
bash scripts/distill/apex-test.sh  # If Apex changes
```

**If tests fail: STOP. Return to implementation.**

### Step 2: Prepare PR Description

**Extract information:**
- Task title
- Task description
- Acceptance criteria (formatted as checklist)
- Implementation notes
- Related spec/design files

**PR Title Format:**
```
BRIEF-XXX: {Concise title from task}
```

**PR Description Format:**
```markdown
## Summary
{Brief description of changes}

Related task: task-X
Related spec: x-project/specs/SPEC-XXX-{name}.md
Related design: x-project/designs/DESIGN-XXX-{name}.md

## Changes
- {Change 1}
- {Change 2}
- {Change 3}

## Testing
✅ All tests passing ({X} tests)
✅ Coverage: {Y}%
✅ Lint: Clean

## Acceptance Criteria
- [x] AC-1: {criterion}
- [x] AC-2: {criterion}
- [x] AC-3: Tests written with >75% coverage
- [x] AC-4: Code passes lint

## Deployment Notes
{Any special deployment considerations}
- Deployment order (if dependencies)
- Required org configuration
- Required permissions

## Rollback Plan
{How to revert if needed}

---
🤖 Generated with Claude Code
```

### Step 3: Push Feature Branch

**Push to remote:**
```bash
git push origin feature/BRIEF-XXX-{description}
```

**Verify push:**
```bash
git log origin/feature/BRIEF-XXX-{description} --oneline -5
```

### Step 4: Create PR via GitHub CLI

**Create PR:**
```bash
gh pr create \
  --title "BRIEF-XXX: {title}" \
  --body "{PR description from above}" \
  --base main \
  --head feature/BRIEF-XXX-{description}
```

**If gh CLI not available:**
- Provide URL for manual PR creation
- Show formatted PR description for copy/paste

### Step 5: Update Task

Mark task as Done:
```javascript
mcp__backlog__task_edit({
  id: "task-X",
  status: "Done",
  implementationNotes: `Completed and PR created.

  PR: {URL}
  Branch: feature/BRIEF-XXX-{description}

  QA Summary:
  ✅ Tests passing
  ✅ Lint clean
  ✅ All acceptance criteria met`
})
```

### Step 6: Update Master Files (CRITICAL)

**Update `x-project/master-state.md`:**
- Set Current Phase to: ⏸️ IDLE (awaiting PR review) or 🔄 if more tasks
- Set Current Task to: task-X completed - PR created
- Set Active Branch to: main
- Check Phase 6 in Lifecycle Progress if all initial tasks complete
- Add entry to Key Decisions Log with PR link and notable decisions
- Update Last Completed with task and PR URL
- Add to Implementation History: "Completed {task title} - PR #{number}"

**Update `x-project/master-spec.md`:**
- Update Current Capabilities with new features implemented
- Add any new integrations or API endpoints
- Update Version History with this change
- Add to Feature Additions if this was a new feature
- Update Testing Strategy if new test patterns were established

### Step 7: Clean Up Local Branch

**Switch back to main:**
```bash
git checkout main
