name: x-qa
description: Base QA command - overridden by project type

---

# QA Phase (Base)

This is a placeholder command. Your project type should provide a type-specific `x-qa.md` that overrides this.

## Type-Specific QA Workflows

Each project type provides its own QA workflow:

- **client-salesforce**: Apex test coverage, governor limits, FLS/CRUD checks
- **client-other**: Test coverage, linting, security checks
- **product**: Comprehensive testing, versioning, changelog verification
- **general**: Basic quality checks

## If You See This Message

Your project setup may be incomplete. Check that:

1. Project type was selected during setup
2. Type-specific commands were copied to `.claude/commands/`
3. The type-specific `x-qa.md` is present

Run `/x-setup` to reconfigure your project if needed.
