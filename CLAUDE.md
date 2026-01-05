# Claude Code Workflow Guardrails

**SUPER FUCKING CRITICAL**
ALWAYS USE `AskUserQuestion` utility. After every fucking prompt. I don't want to have to type. I want you to give me options for next steps. We can chat if I dont like any of your recommendations.

> **CRITICAL**: This document defines MANDATORY workflow rules. Claude MUST follow these phases sequentially. No coding without requirements. No implementation without design review. No backlog creation without spec approval.

TREAT EVERY TASK IN THIS WAY. ALWAYS FOLLOW THIS SPEC DRIVEN APPROACH, REGARDLESS OF HOW SMALL THE TASK (JUST BE EFFICIENT ABOUT IT, AND SMART). I WANT YOU CONSTANTLY LOGGING DESIGN, SPEC, AND ARCHIVING BACKLOG TASKS.

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


---

# PM Core Module - AI Instructions

> Guidelines for Claude when working on the pm-core module

## Module Purpose

The PM Core module serves as the foundational component for project management projects. It provides:

- Core project management workflows
- Essential utilities and helpers
- Templates for project management artifacts
- Base UI components for PM tasks

## Synaptic Branding Skills

PM Core includes Synaptic brand styling resources accessible via skills with the `x-` prefix:

### Available Skills

**x-synaptic-style** (`skills/x-synaptic-style.md`)
- Quick-reference skill for applying Synaptic branding
- Provides colors, fonts, spacing, and component styles
- Includes ready-to-use code snippets for PowerPoint, HTML, and documents
- Use when generating PM documents, presentations, or web interfaces

**x-brand-guidelines** (Global skill: `~/.claude/skills/x-brand-guidelines/`)
- Comprehensive Synaptic brand guidelines
- PowerPoint, document, and web-specific styling
- Technical details for color application and font management

**x-frontend-design** (Global skill: `~/.claude/skills/x-frontend-design/`)
- Creates Synaptic-branded web interfaces and components
- Applies Synaptic colors and Poppins font by default
- Generates production-grade HTML/CSS/JS with brand consistency

**x-canvas-design** (Global skill: `~/.claude/skills/x-canvas-design/`)
- Creates visual designs and graphics with Synaptic branding
- Suitable for PM posters, diagrams, and visual artifacts
- Incorporates Synaptic brand elements when appropriate

### Skill Naming Convention

Skills with the `x-` prefix are Synaptic-specific customizations:
- **x-synaptic-style**: Local pm-core quick reference
- **x-brand-guidelines**: Global Synaptic branding skill
- **x-frontend-design**: Global Synaptic web design skill
- **x-canvas-design**: Global Synaptic visual design skill

The `x-` prefix helps distinguish custom Synaptic skills from standard skills while maintaining searchability. These skills can be invoked by:
- Full name: `/x-synaptic-style`, `/x-brand-guidelines`
- Skill tool: `Skill(skill="x-synaptic-style")` or `Skill(skill="x-brand-guidelines")`
- Reference in instructions: "Use the x-synaptic-style skill to apply Synaptic branding"

### Complete Style Guide

For comprehensive guidelines, reference:
`/Users/wkarp/devlocal/x-library/modules/pm-core/synaptic-style-guide.md`

This master document includes:
- Complete color palette with usage guidelines
- Typography system (Poppins font family)
- Spacing and layout guidelines
- Component styles (buttons, cards, tables, forms)
- PowerPoint, document, and web-specific instructions
- Accessibility standards (WCAG AA compliance)

## Component Structure

### Commands (`commands/`)
Location: `modules/pm-core/commands/*.md`

PM commands should follow the naming convention `x-pm-{action}.md` and provide:
- Clear description of what the command does
- Step-by-step instructions
- Parameter definitions
- Usage examples
- Context-aware prompts

### Webviews (`webviews/{action}/dist/`)
Location: `modules/pm-core/webviews/{action}/dist/`

PM webviews should include:
- `index.html` - Semantic HTML with form structure
- `app.js` - VS Code API communication and validation
- `styles.css` - Theme-aware styling using VS Code variables

### Templates (`templates/`)
Location: `modules/pm-core/templates/*.md`

PM templates should:
- Use `{{variable_name}}` for placeholders
- Include clear sections and structure
- Support common PM artifacts (charters, plans, status reports, etc.)

## Development Workflow

When adding new components to pm-core:

1. **Plan** - Define the component's purpose and interface
2. **Create** - Add the component file with proper structure
3. **Document** - Update README.md and module-spec.yml
4. **Test** - Verify the component works as expected
5. **Commit** - With descriptive message following convention

## Module Integration

pm-core is included in:
- `pm-start` project type

Other PM modules may depend on pm-core utilities and should:
- Import shared templates
- Reference pm-core commands
- Extend pm-core webviews when appropriate

## Document Creation Guidelines

When creating project management documents, presentations, or spreadsheets, **ALWAYS** use the appropriate skills and tools:

### Skills to Use by Default

**For Presentations:**
- **Primary**: Use `document-skills:pptx` skill for creating/editing PowerPoint presentations
- **Alternative**: Use `document-skills:frontend-design` for web-based presentation artifacts
- **Tools**: `mcp__gdrive__createGoogleSlides`, `mcp__gdrive__getGoogleSlidesContent`

**For Documents:**
- **Primary**: Use `document-skills:docx` skill for creating/editing Word documents
- **Alternative**: Use `document-skills:doc-coauthoring` for collaborative documentation
- **Tools**: `mcp__gdrive__createGoogleDoc`, `mcp__gdrive__getGoogleDocContent`

**For Spreadsheets:**
- **Tools**: `mcp__gdrive__createGoogleSheet`, `mcp__gdrive__getGoogleSheetContent`, `mcp__gdrive__updateGoogleSheet`
- Apply formatting with `mcp__gdrive__formatGoogleSheetCells`, `mcp__gdrive__formatGoogleSheetText`

**For Visual Artifacts:**
- Use `document-skills:canvas-design` for posters, diagrams, and visual project materials
- Use `document-skills:frontend-design` for dashboards and interactive PM tools

### Document Creation Workflow

1. **Identify document type** - Presentation, document, spreadsheet, or visual
2. **Invoke appropriate skill** - Use Skill tool to load the relevant document-skills skill
3. **Create with tools** - Use MCP tools for Google Workspace or native file creation
4. **Apply PM context** - Incorporate project management best practices and templates
5. **Format appropriately** - Use theme-aware styling and professional formatting

### Commands Available

Current PM-core commands:
- `/x-pm-charter` - Create project charter documents
- `/x-pm-plan` - Generate project plans
- `/x-pm-status` - Create status reports
- Additional commands listed in module-spec.yml

**IMPORTANT**: When a user requests creating a presentation, document, or spreadsheet for project management purposes, automatically invoke the appropriate skill before proceeding with creation.

## Best Practices

- Keep commands focused and single-purpose
- Webviews should handle state persistence using VS Code API
- Templates should be reusable and configurable
- All components should respect VS Code theme variables
- Document all new features in README.md
- **Always use document-skills for document creation** - Don't create documents manually when skills are available

## File Locations Reference

| Item | Path |
|------|------|
| Module Spec | `modules/pm-core/module-spec.yml` |
| README | `modules/pm-core/README.md` |
| Commands | `modules/pm-core/commands/` |
| Webviews | `modules/pm-core/webviews/{action}/dist/` |
| Templates | `modules/pm-core/templates/` |

## Resources

- [X-Library Module Structure](../../CLAUDE.md#module-structure--conventions)
- [Webview Development Guide](../../CLAUDE.md#webview-development-guide)
- [Module Conventions](../../CLAUDE.md#naming-conventions)


---

# PPT Generator Module - AI Instructions

## Module Purpose

This module enables interactive PowerPoint presentation generation through the HTML2PPTX workflow. It leverages the comprehensive pptx skill (copied from dispatchConcierge) and creates reusable generation scripts.

---

## When to Use This Module

Use the `/x-ppt-generate` command when:
- User requests PowerPoint presentation creation
- User needs work summaries, client deliverables, status reports
- User mentions "presentation", "slides", ".pptx", "PowerPoint"
- User asks for visual presentations of data or information

---

## Key Concepts

### HTML2PPTX Workflow
The module uses **html2pptx.js** from the pptx skill to convert HTML content to PowerPoint:

1. Agent gathers content through Q&A
2. Agent generates HTML structure for each slide
3. Agent creates Node.js script with HTML content
4. Script calls html2pptx.js converter
5. Converter produces .pptx file

**Advantages**:
- Flexible content structure
- Easy to modify (HTML is readable)
- Reusable scripts (user can edit and re-run)
- Consistent with pptx skill patterns

### Synaptic Branding
All presentations must use Synaptic brand colors and fonts:

**Colors**:
- Dark Navy: #07253D (backgrounds, headers)
- Cyan: #01A9DB (accents, highlights)
- Orange: #FB4100 (secondary accents)
- White: #FFFFFF (primary text)
- Gray: #44546A (secondary text)

**Fonts**:
- Primary: Arial (throughout)
- Sizes: 48px (titles), 28px (subtitles), 24px (headers), 14px (body)

### Script Generation Pattern
Always generate reusable scripts, not inline execution:

**Why Scripts**:
- User can modify content without re-running Q&A
- Scripts are version-controllable
- Easy debugging and refinement
- Clear audit trail of what was generated

---

## Agent Workflow

### Conversation Structure

**Phase 1: Discovery (Purpose & Audience)**
```
Agent: "What is this presentation for?"
User: "Work summary for client"
Agent: "Who is the audience?"
User: "Client executives"
Agent: "What's the key message?"
User: "Show progress and value delivered"
```

**Phase 2: Structure (Outline & Approval)**
```
Agent: "Based on work summary for executives, I suggest:
1. Title slide
2. Executive summary (1 slide)
3. Work completed (3-4 slides)
4. Key results/metrics (2 slides)
5. Recommendations (1-2 slides)
6. Conclusion/next steps (1 slide)

Total: ~10-12 slides. Does this work?"
User: "Yes, sounds good"
```

**Phase 3: Content (Slide-by-Slide)**
For each slide:
```
Agent: "Slide 2: Executive Summary. What key points?"
User: [provides content]
Agent: "Any specific metrics or data?"
User: [provides data if applicable]
Agent: [Gathers all slide content]
```

**Phase 4: Review & Generate**
```
Agent: "Here's the complete structure:
- Slide 1: Title - 'Work Summary Q4 2025'
- Slide 2: Executive Summary - [bullets]
- ...
- Slide 12: Next Steps - [bullets]

Ready to generate?"
User: "Yes"
Agent: [Generates script and .pptx]
```

---

## HTML Generation Best Practices

### Learned from dispatchConcierge

**1. Color Constants**
Always define colors once:
```javascript
const C = {
  darkNavy: '#07253D',
  cyan: '#01A9DB',
  // ...
};
```

**2. Consistent Structure**
Use consistent HTML patterns:
- Title slides: `<div class="slide" data-layout="title">`
- Content slides: `<div class="slide" data-layout="content">`
- Chart slides: `<div class="slide" data-layout="chart">`

**3. Inline Styles**
Always use inline styles for colors and fonts:
```html
<h1 style="color: #FFFFFF; font-size: 48px;">Title</h1>
```

**4. Progress Logging**
Include console logging in scripts:
```javascript
console.log('[1/12] Creating title slide...');
console.log('[2/12] Creating executive summary...');
// ...
console.log('✅ Presentation generated: output/presentation.pptx');
```

**5. Descriptive Comments**
Add comments explaining each section:
```javascript
// Slide 3: Work Completed - Technical Architecture
// Shows the main components and integrations
```

---

## Common Patterns

### Title Slide
```html
<div class="slide" data-layout="title">
  <h1 style="color: #FFFFFF; font-size: 48px;">Main Title</h1>
  <h2 style="color: #01A9DB; font-size: 28px;">Subtitle</h2>
  <p style="color: #FFFFFF; font-size: 18px;">Author | Date</p>
</div>
```

### Bulleted Content Slide
```html
<div class="slide" data-layout="content">
  <h2 style="color: #07253D; font-size: 24px;">Slide Title</h2>
  <ul style="color: #44546A; font-size: 14px;">
    <li>First point</li>
    <li>Second point</li>
    <li>Third point</li>
  </ul>
</div>
```

### Metrics Card Slide
```html
<div class="slide" data-layout="metrics">
  <h2 style="color: #07253D; font-size: 24px;">Key Metrics</h2>
  <div style="display: flex; justify-content: space-around;">
    <div class="metric">
      <p style="font-size: 48px; color: #01A9DB; font-weight: bold;">120+</p>
      <p style="font-size: 14px; color: #44546A;">Features Delivered</p>
    </div>
    <div class="metric">
      <p style="font-size: 48px; color: #FB4100; font-weight: bold;">98%</p>
      <p style="font-size: 14px; color: #44546A;">Test Coverage</p>
    </div>
  </div>
</div>
```

### Chart Slide
```html
<div class="slide" data-layout="chart">
  <h2 style="color: #07253D; font-size: 24px;">Traffic Growth</h2>
  <div class="chart" data-type="bar">
    <table>
      <thead>
        <tr><th>Quarter</th><th>Visits</th></tr>
      </thead>
      <tbody>
        <tr><td>Q1</td><td>1200</td></tr>
        <tr><td>Q2</td><td>2400</td></tr>
        <tr><td>Q3</td><td>3000</td></tr>
        <tr><td>Q4</td><td>4500</td></tr>
      </tbody>
    </table>
  </div>
</div>
```

---

## Error Handling

### Common Issues & Solutions

**Issue: html2pptx.js not found**
- Check skills/pptx/scripts/ folder exists
- Verify skill was copied correctly
- Provide clear error message with path

**Issue: Script execution fails**
- Show full error output
- Check Node.js version (>= 18.0.0)
- Verify output/ folder exists and is writable
- Suggest running script manually for debugging

**Issue: Invalid HTML structure**
- Reference html2pptx.md for valid patterns
- Validate against examples
- Use consistent data-layout attributes

**Issue: User cancels mid-conversation**
- Save progress if possible
- Allow resumption
- Don't generate incomplete presentations

---

## Quality Standards

### Before Generation
- [ ] All required content gathered
- [ ] Structure approved by user
- [ ] HTML patterns match html2pptx.md spec
- [ ] Synaptic branding applied consistently
- [ ] Script includes progress logging

### After Generation
- [ ] Script saved to output/ folder
- [ ] Script is readable and well-commented
- [ ] .pptx file generated successfully
- [ ] File locations reported to user
- [ ] User can open .pptx in PowerPoint/Keynote

---

## References

### Key Files
- **SKILL.md**: Main presentation skill documentation
- **html2pptx.md**: HTML2PPTX workflow and patterns
- **html2pptx.js**: Converter script
- **create-synaptic-presentation.js**: Reference implementation (workspace example)

### Best Practices Source
Patterns and practices synthesized from:
- dispatchConcierge project (21-slide work summary)
- Successful generation runs
- Synaptic branding guidelines
- HTML2PPTX skill documentation

---

## Future Enhancements

*Out of scope for initial version, but documented for future reference:*

- Multi-brand support (client-specific themes)
- Direct pptxgenjs generation (alternative to HTML2PPTX)
- Animation and transition support
- Template library
- Collaborative editing
- Integration with data sources (APIs, databases)

---

**End of AI Instructions**
