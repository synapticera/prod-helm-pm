name: x-notes
description: Add a note to the project notes file

---

# 📝 Project Notes

This command adds notes to `x-project/project-notes.md`.

## Your Task

1. **Check if project-notes.md exists:**

If `x-project/project-notes.md` doesn't exist, create it with the template header:

```markdown
# Project Notes

Notes, observations, and informal documentation for this project.

---

```

2. **Ask for the note:**

```
📝 Add Project Note

What would you like to note? (Enter your note, can be multiple lines)
```

3. **Format and append the note:**

Add the note with a timestamp:

```markdown

## {Date} - {Time}

{User's note content}

---
```

4. **Confirm when done:**

```
📝 Note Added

Your note has been added to x-project/project-notes.md

Would you like to add another note? [y/N]
```

If yes, repeat from step 2.

## Note Format

Each note should include:
- Timestamp (YYYY-MM-DD HH:MM)
- The note content
- A separator line

## Starter Symbol

Use 📝 at the start of all messages during this command.
