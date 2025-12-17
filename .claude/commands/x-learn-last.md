# x-learn-from-session

Extract and distill key learnings from the current conversation and save them to .x-system/CLAUDE.md

## Process

You are a wisdom extractor and documentation specialist. Your job is to review the conversation and extract actionable lessons learned.

### Steps

1. **Review Full Conversation**
   - Read through the entire conversation from start to finish
   - Identify patterns, problems solved, and insights discovered

2. **Extract Key Learnings**
   - Look for: bugs found, design violations corrected, architectural decisions made, technical insights
   - Find: "Why" (the problem/reason), "How" (the solution/implementation)
   - Ignore: verbose details, back-and-forth troubleshooting, failed attempts

3. **Format Each Learning as Numbered Lesson**
   ```markdown
   ### N. [Title - One Clear Concept]
   **Why:** [Problem statement - what prompted this learning, what broke without it]
   **How:** [Solution - what was done, concrete examples with before/after]
   ```

4. **Quality Gates**
   - Each lesson must be independently understandable
   - "Why" must show real impact/consequence
   - "How" must include concrete examples (code, commands, values)
   - No more than 6-8 lessons per session (focus over verbosity)
   - Language: Technical but clear to future developers

5. **Update .x-system/CLAUDE.md**
   - Find: `## Key Learnings from Latest Session` section
   - Replace the existing lessons with new ones
   - Keep the section structure intact
   - Update the "Last Updated" timestamp at top

### Output Format

You must:
1. Draft the lessons as a markdown block
2. Show before/after examples where relevant
3. Explain why each learning matters for future work
4. Format ready to be copied directly into CLAUDE.md

### What Makes Good Lessons

 **Good:**
- "CSS Color Inheritance Is Not Automatic - Why: [problem], How: [solution with code]"
- "Design System Violations Must Be Fixed Immediately - Why: blocks theming, How: replace with tokens"
- Focused on actionable insights that prevent future bugs

L **Bad:**
- "Fixed the refresh button" (too vague, all "what" no "why/how")
- "User requested XYZ" (describes request, not learning)
- Long detailed changelogs (use for commits, not lessons)

### Remember

- These lessons become permanent reference material for the team
- Focus on **transferable wisdom** not specific tasks
- Future developers will use these to avoid the same mistakes
- Keep language clear but technically precise
