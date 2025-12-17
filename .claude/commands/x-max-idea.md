name: x-max-idea
description: Capture new ideas for MAX workflow improvements, optionally build prototypes
arguments:
  - name: mode
    description: "Optional: 'prototype' to jump to prototype mode"
    required: false

---

# 💡 Add Idea Command

This command captures ideas for improving the MAX workflow system. Ideas can be explored interactively, prototyped locally, or queued for future development.

## FIRST: Check Mode Argument

**If argument is `prototype`:**
→ Skip to "Prototype Mode" section

**Otherwise:**
→ Continue with interactive capture below

---

## Interactive Idea Capture

### 1. Welcome and Context

```
💡 New Idea Capture

Welcome! I'd like to hear about your idea for improving MAX.

This could be:
- A new command or workflow
- An improvement to existing functionality
- A new integration or tool
- A process optimization
- Anything else that would make MAX better

Let's explore your idea together.
```

### 2. Gather Idea Details

Ask these questions conversationally (adapt based on responses):

**Core Concept:**
- What's the basic idea? (one sentence summary)
- What problem does this solve or what value does it add?

**Use Case:**
- When would someone use this?
- Who benefits from this feature?

**Implementation Thoughts:**
- Do you have any thoughts on how it might work?
- Are there existing tools/patterns we could leverage?

**Scope:**
- Is this a small tweak or a major addition?
- Does it affect just MAX or also target projects?

### 3. Summarize and Confirm

```
💡 Idea Summary

**Title:** {concise title}
**Problem/Value:** {one-liner}
**Use Case:** {when/who}
**Scope:** {small/medium/large}
**Implementation Notes:** {any technical thoughts}

Does this capture your idea correctly? [Y/n]
```

### 4. Ask About Prototype

```
Would you like to:

1. **Build a prototype** - Try implementing this in your current project environment
2. **Add to ideas queue** - Save for future development
3. **Both** - Prototype now AND add to queue for proper implementation later

Which would you like to do? [1/2/3]
```

---

## Prototype Mode

**If user chose prototype (option 1 or 3):**

### Prototype Guidelines

```
💡 Prototype Mode

Great! Let's build a quick prototype to test your idea.

Guidelines for prototyping:
- This is exploratory - we're testing the concept, not building production code
- We'll work in your LOCAL project environment
- Prototypes can be rough - focus on validating the core idea
- We can iterate quickly based on what we learn

Ready to start? [Y/n]
```

### Build the Prototype

1. **Understand the scope** - What's the minimum we need to test the idea?
2. **Identify components** - What files/commands/agents need to be created or modified?
3. **Implement iteratively** - Build small pieces, test, adjust
4. **Get feedback** - Ask user to try it out and report back

### After Prototype

```
💡 Prototype Complete

How did the prototype work?

1. **It works well** - Let's add this to the ideas queue for proper implementation
2. **Needs adjustments** - Let's iterate on the prototype
3. **Not viable** - The idea didn't work as expected (that's okay! we learned something)
4. **Ready for production** - The prototype is good enough, let's document and keep it

Which best describes the result? [1/2/3/4]
```

---

## Add to Ideas Queue

**Central Ideas File Location:** `x-project/ideas-queue.md` (for project ideas) or `.x-system/max-roadmap.md` (for MAX system ideas)

### Create/Update Ideas Queue Entry

```markdown
## IDEA-{XXX}: {Title}

**Submitted:** {date}
**Status:** 🆕 New | 🔬 Prototyped | 📋 Planned | 🚧 In Progress | ✅ Done | ❌ Rejected
**Priority:** 🔴 High | 🟡 Medium | 🟢 Low
**Scope:** Small | Medium | Large

### Problem/Value
{What problem does this solve or value does it add?}

### Use Case
{When would this be used? Who benefits?}

### Implementation Notes
{Any technical thoughts, approaches, or constraints}

### Prototype Results
{If prototyped: what worked, what didn't, lessons learned}

### Discussion
{Any follow-up thoughts, questions, or decisions}

---
```

### Update Confirmation

```
💡 Idea Added

Your idea has been added to the ideas queue as IDEA-{XXX}.

Location: x-project/ideas-queue.md

You can:
- View and vote on ideas: `/x-max-roadmap`
- Return to prototype: `/x-max-idea prototype`
- Start fresh: `/x-max-idea`

Thank you for contributing to MAX!
```

---

## Starter Symbol

Use 💡 at the start of all messages during this command.

---

## Decision Flow Summary

```
/x-max-idea called
       │
       ▼
┌──────────────────┐
│ Check argument   │
└───────┬──────────┘
        │
    ┌───┴───────────┐
    │               │
    ▼               ▼
prototype        (none)
    │               │
    ▼               ▼
┌─────────┐ ┌──────────────┐
│ Build   │ │ Interactive  │
│ proto   │ │ capture      │
└────┬────┘ └──────┬───────┘
     │             │
     └──────┬──────┘
            ▼
    ┌──────────────┐
    │ Ask: proto   │
    │ or queue?    │
    └──────┬───────┘
           │
    ┌──────┼──────┐
    ▼      ▼      ▼
 Proto   Queue  Both
    │      │      │
    └──────┴──────┘
           │
           ▼
    ┌─────────────┐
    │ Save idea   │
    │ to queue    │
    └─────────────┘
```
