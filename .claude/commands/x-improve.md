name: x-improve
description: Start a continuous improvement cycle to iterate on deployed features based on feedback, metrics, or optimization opportunities
arguments:
  - name: focus
    description: "Optional: 'feedback' for user feedback, 'metrics' for performance data, 'tech-debt' for technical improvements, or 'optimize' for general optimization"
    required: false

---

# 🔄 Continuous Improvement

You are entering the continuous improvement phase. This phase happens after a feature has been deployed and is used to iterate based on real-world feedback, metrics, or identified optimization opportunities.

## Before You Begin

1. **Read state file:** `x-project/master-state.md`
2. **Read master spec:** `x-project/master-spec.md` - understand current capabilities
3. **Review deployed features:** Check what's currently in production
4. **Gather context:** Understand what triggered this improvement cycle

## Improvement Types

### If argument is `feedback`:
Focus on user feedback, bug reports, or feature requests related to deployed functionality.

### If argument is `metrics`:
Focus on performance metrics, error rates, usage patterns, or analytics data.

### If argument is `tech-debt`:
Focus on code quality, refactoring opportunities, or architectural improvements.

### If argument is `optimize`:
Focus on general optimization - performance, UX, maintainability.

### If no argument:
Ask the user what type of improvement they want to focus on.

## Your Tasks

### 1. Assess Current State

Gather information about what needs improvement:

```
🔄 Continuous Improvement Assessment

What triggered this improvement cycle?
- [ ] User feedback or bug reports
- [ ] Performance metrics or monitoring alerts
- [ ] Technical debt identified during development
- [ ] Optimization opportunity identified
- [ ] Scheduled review/retrospective

Related deployed feature(s):
- {feature name and PR/commit reference}

Current state:
- Working as designed? {yes/no}
- Known issues: {list any}
- User sentiment: {positive/neutral/negative/unknown}
```

### 2. Gather Improvement Ideas

Ask clarifying questions:

- What specific feedback or metrics prompted this improvement?
- Are there any constraints (time, breaking changes, etc.)?
- What's the desired outcome?
- Is this a quick fix or a larger iteration?

### 3. Categorize the Work

Determine if this improvement requires:

**A. Quick Fix (direct implementation)**
- Bug fix or minor adjustment
- No architectural changes
- Can be done in current session
- Go directly to implementation

**B. New Iteration (full cycle)**
- Significant changes to existing feature
- New requirements or scope expansion
- Requires spec and decomposition
- Spawn x-task-spec-generator for new spec

**C. Technical Debt (focused refactor)**
- Code quality improvements
- No functional changes
- Tests must continue passing
- Document before/after in memory

### 4. Route Appropriately

**For Quick Fixes:**
```
Update x-project/master-state.md:
- Current Phase: 🔄 CONTINUOUS_IMPROVEMENT
- Current Task: {brief description}
- Add to Key Decisions Log: what's being fixed and why

Then proceed directly to implementation with TDD approach.
```

**For New Iterations:**
```javascript
Task({
  subagent_type: "x-task-spec-generator",
  description: "Generate improvement spec",
  prompt: `Create a specification for improving an existing feature.

Context:
- Original feature: {description}
- Improvement trigger: {feedback/metrics/tech-debt/optimize}
- Specific feedback or data: {details}
- Constraints: {any constraints}
- Desired outcome: {what success looks like}

This is an IMPROVEMENT to existing functionality, not a new feature.
Focus the spec on:
1. What exists currently (reference existing code/specs)
2. What specific changes are needed
3. How to maintain backwards compatibility (if applicable)
4. How to measure improvement success

The spec should be saved to x-project/specs/IMPROVE-{XXX}-{short-description}.md
`
});
```

**For Technical Debt:**
```
Update x-project/master-state.md:
- Current Phase: 🔄 CONTINUOUS_IMPROVEMENT (Tech Debt)
- Add to Key Decisions Log: Area being improved, current vs target state

Update x-project/master-spec.md:
- Add to Constraints & Limitations: document the tech debt being addressed
- After fix: move to Evolution History > Improvements & Optimizations

Then proceed with refactoring, ensuring tests pass throughout.
```

### 5. Update State

After routing:

```markdown
## Current Phase

CONTINUOUS_IMPROVEMENT

## Current Task

{Description of improvement work}

## Improvement Context

- Trigger: {feedback/metrics/tech-debt/optimize}
- Type: {quick-fix/new-iteration/tech-debt}
- Related Feature: {original feature reference}
```

## Continuous Improvement Cycle

```
        ┌──────────────────────────────────────────┐
        │                                          │
        ▼                                          │
   ┌─────────┐    ┌─────────┐    ┌─────────┐      │
   │ Deploy  │───▶│ Monitor │───▶│ Gather  │      │
   │   PR    │    │ & Use   │    │ Feedback│      │
   └─────────┘    └─────────┘    └─────────┘      │
        ▲                              │          │
        │                              ▼          │
   ┌─────────┐    ┌─────────┐    ┌─────────┐      │
   │   QA    │◀───│Implement│◀───│ Assess  │──────┘
   │         │    │         │    │& Decide │ (if new iteration)
   └─────────┘    └─────────┘    └─────────┘
                                       │
                                       │ (if quick fix)
                                       ▼
                                  Direct Fix
```

## Success Criteria for Improvement Cycle

Before marking improvement complete:

- [ ] Original issue/feedback addressed
- [ ] No regression in existing functionality
- [ ] Tests updated/added for changes
- [ ] Metrics improved (if applicable)
- [ ] Documentation updated (if applicable)
- [ ] master-state.md updated with completion and learnings
- [ ] master-spec.md updated with new/changed capabilities

## Starter Symbol

Use 🔄 at the start of all messages during continuous improvement phase.
