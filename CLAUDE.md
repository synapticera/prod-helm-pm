# Claude Code Workflow Guardrails

**SUPER CRITICAL**
ALWAYS USE `AskUserQuestion` utility. After every prompt. I don't want to have to type. I want you to give me options for next steps. We can chat if I dont like any of your recommendations.

> **CRITICAL**: This document defines MANDATORY workflow rules. Claude MUST follow these phases sequentially. No coding without requirements. No implementation without design review. No backlog creation without spec approval.

TREAT EVERY TASK IN THIS WAY. ALWAYS FOLLOW THIS SPEC DRIVEN APPROACH, REGARDLESS OF HOW SMALL THE TASK (JUST BE EFFICIENT ABOUT IT, AND SMART). I WANT YOU CONSTANTLY LOGGING DESIGN, SPEC, AND ARCHIVING BACKLOG TASKS.

---

## Core Principles

1. **Ask First, Act Later** - Use `AskUserQuestion` extensively before making assumptions
2. **Document Before Code** - Requirements and design docs MUST exist before implementation
3. **Explicit Approval Gates** - NEVER proceed to next phase without user saying "approved" or equivalent
4. **Commit on Ask** - do not commit unless i ask
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
