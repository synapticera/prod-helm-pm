name: x-refresh-master-spec
description: Analyze x-project contents and regenerate master-spec.md to reflect current solution state

---

# 🔄 Refresh Master Spec

Analyze everything in `x-project/` and update `master-spec.md` to accurately reflect the current state of the solution.

## When to Use

- After a series of implementations without proper spec updates
- When master-spec.md has drifted from reality
- When onboarding to understand what exists
- After significant changes or refactoring
- Periodically to ensure accuracy

## Your Tasks

### 1. Read All Source Materials

Read these files to understand the current solution:

**Project Files:**
```
x-project/master-state.md     - Current phase, decisions, history
x-project/master-spec.md      - Current spec (to be updated)
x-project/intake.md           - Original intake (if populated)
```

**All Specifications:**
```
x-project/specs/*.md          - Read ALL spec files
```

**All Design Documents (if exist):**
```
x-project/designs/*.md        - Read ALL design files
```

**Backlog for Implementation Details:**
```
Use backlog tools to list completed tasks:
mcp__backlog__task_list({ status: "Done" })
```

### 2. Analyze the Codebase

If this is a code project, also examine:

- Key source files referenced in specs
- Configuration files
- API definitions
- Database schemas or models
- Test files (to understand what's been built)

### 3. Synthesize Current State

Create a comprehensive understanding of:

**What exists:**
- All implemented features
- All integrations
- All API endpoints
- All data models

**How it's built:**
- Technology stack
- Architecture patterns
- Key components

**What's documented vs. reality:**
- Note any discrepancies
- Identify undocumented features
- Flag outdated information

### 4. Update Master Spec

Rewrite `x-project/master-spec.md` with accurate information:

**Sections to update:**

1. **Executive Summary** - Accurate high-level description
2. **Original Requirements** - Preserve original (don't modify)
3. **Current Capabilities** - ACCURATE list of what exists TODAY
   - Core Features (with descriptions)
   - Integrations
   - User Roles & Permissions
4. **Architecture** - Actual current architecture
   - System Overview
   - Technology Stack
   - Key Components
   - Data Model
   - API Contracts
5. **Non-Functional Requirements** - What's actually implemented
6. **Constraints & Limitations** - Known issues, tech debt
7. **Evolution History** - Update with all changes found
   - Version History
   - Feature Additions
   - Improvements & Optimizations
   - Bug Fixes (Significant)
8. **Future Roadmap** - Based on backlog and discussions
9. **Testing Strategy** - What testing exists
10. **Deployment & Operations** - Current deployment state

### 5. Report Changes

After updating, provide a summary:

```
🔄 Master Spec Refreshed

Changes made:
- Added X features to Current Capabilities
- Updated Architecture section with Y
- Added Z to Evolution History
- Corrected A, B, C

Discrepancies found:
- [List any specs vs reality mismatches]

Recommendations:
- [Any follow-up actions needed]
```

### 6. Update Master State

Also update `x-project/master-state.md`:
- Add entry to Key Decisions Log: "Refreshed master-spec.md"
- Note any significant findings in Session Notes

## Important Guidelines

- **Don't invent** - Only document what actually exists
- **Preserve history** - Don't remove Evolution History entries
- **Be specific** - Use actual file names, component names, versions
- **Flag uncertainty** - If unsure about something, note it
- **Keep Original Requirements** - Never modify this section

## Starter Symbol

Use 🔄 at the start of all messages during this command.
