name: x-add-task
description: Add a new task to the backlog using the backlog CLI

---

# Add Task to Backlog

Add a new task to the backlog using the backlog CLI.

## Before You Begin

1. **Ensure backlog is initialized**
   - The backlog MCP must be available and initialized
   - If not initialized, instruct user to run `backlog init` in the project directory

**IMPORTANT: All task management MUST be done through backlog.md MCP tools. Never create task files manually.**

## Usage

When invoked, gather the following from the user:

### Required Information

1. **Title**: Clear, action-oriented task title
   - Example: "Implement account validation service"

2. **Description**: What needs to be done
   - Include context and requirements
   - Reference any specs or design docs

### Optional Information

3. **Priority**: High, Medium, or Low (default: Medium)

4. **Type**: Feature, Bug, Refactor, Documentation, Testing (default: Feature)

5. **Dependencies**: IDs of tasks that must complete first

## Execution

**Always use the backlog MCP to create tasks:**

```javascript
mcp__backlog__task_add({
  title: "{task title}",
  description: "{description}",
  priority: "{High|Medium|Low}",
  type: "{Feature|Bug|Refactor|Documentation|Testing}"
});
```

**Do NOT use CLI or create task files manually.** All task management goes through the backlog MCP.

## After Adding

1. Display the created task ID
2. Show current backlog status
3. Ask if user wants to add another task or proceed with other work

## Example

```
User: /x-add-task

Claude: I'll help you add a task to the backlog. Please provide:

1. **Task Title**: What should this task be called?
2. **Description**: What needs to be done?
3. **Priority**: High, Medium, or Low? (default: Medium)
4. **Type**: Feature, Bug, Refactor, Documentation, or Testing? (default: Feature)

User: Title: Implement account revenue calculator
Description: Create a service class that calculates revenue forecasts based on opportunity data. Should handle bulk operations and enforce FLS.
Priority: High
Type: Feature

Claude: Creating task...

Task created:
- ID: task-12
- Title: Implement account revenue calculator
- Priority: High
- Type: Feature
- Status: To Do

Current backlog has 5 tasks:
- 2 High priority
- 2 Medium priority
- 1 Low priority

Would you like to add another task or proceed with something else?
```
