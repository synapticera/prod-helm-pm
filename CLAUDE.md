# Claude Code Workflow

> **Core Philosophy**: Use Claude Code's native tooling. Ask questions to clarify intent. Plan before building. Track work systematically. Test before completing.

---

## Workflow Phases

### 1. Requirements & Clarification

When receiving a new task:

1. **Ask clarifying questions** (use `AskUserQuestion` tool)
   - Understand the goal and success criteria
   - Clarify technical constraints
   - Identify scope boundaries
   - Don't go overboard - keep it focused and helpful

2. **Confirm understanding** before proceeding
   - Brief summary of what you'll build
   - Key assumptions or decisions

---

### 2. Planning (For Non-Trivial Tasks)

For complex or multi-step work:

1. **Enter Planning Mode** (use `EnterPlanMode` tool)
   - Explore codebase architecture
   - Design implementation approach
   - Identify affected files and dependencies
   - Ask questions during planning as needed

2. **Exit with approval** (use `ExitPlanMode` tool)
   - Present plan for review
   - Wait for explicit approval to proceed

**Skip planning for**: Simple bug fixes, one-line changes, trivial tasks

---

### 3. Task Management

After planning (or for simpler tasks):

1. **Create tasks** (use `TodoWrite` tool)
   - Break work into concrete, trackable steps
   - Use clear, actionable task descriptions
   - Keep tasks granular but meaningful

2. **Track progress**
   - Mark tasks `in_progress` when starting
   - Mark `completed` immediately after finishing
   - Keep exactly ONE task `in_progress` at a time

---

### 4. Implementation

During implementation:

1. **Use Synaptic design system**
   - Apply `synaptic-frontend-design` skill for all UI work
   - Use `synaptic-brand-guidelines` for colors and branding
   - Maintain consistent visual identity

2. **Follow best practices**
   - Keep solutions simple and focused
   - Only change what's needed
   - Avoid over-engineering

---

### 5. Testing (Always Complete Before Done)

Before marking work complete:

1. **Run automated testing**
   - Use Playwright in headless mode
   - Capture screenshots of key flows
   - Verify functionality works as expected

2. **Complete end-user testing**
   - Test from user perspective
   - Verify acceptance criteria are met
   - Document any issues found

3. **Only mark complete when**:
   - Tests pass
   - Screenshots confirm correct behavior
   - Acceptance criteria are satisfied

---

## Git & Commits

- **Do NOT auto-commit** - Wait for explicit instruction
- Create meaningful commit messages when asked
- Follow conventional commit format when appropriate

---

## Design & Branding

All frontend work MUST use:

- `synaptic-frontend-design` skill for UI implementation
- `synaptic-brand-guidelines` for colors, typography, logos
- Consistent Synaptic visual identity

---

## Key Principles

1. **Ask questions** to clarify intent (but don't overdo it)
2. **Plan complex work** in planning mode
3. **Track tasks** systematically with TodoWrite
4. **Test thoroughly** before completion
5. **Use Synaptic design** for all frontend work
6. **Wait for commit approval** before pushing to git

---

## Media Generation

API keys for all services are stored in environment variables.

| Request | Tool/Service | Notes |
|---------|--------------|-------|
| Video generation | Remotion skill | Use `ELEVEN_API_KEY` for any voice in videos |
| Image generation | Gemini Nano Banana model | Use `GEMINI_API_KEY` |
| Voice generation | ElevenLabs API | Use `ELEVEN_API_KEY` |
