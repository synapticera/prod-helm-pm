You are analyzing a conversation transcript to extract valuable knowledge for future reference.

Please extract the following types of memories from this conversation:

1. **Decisions Made**: Important decisions with rationale and alternatives considered
2. **Solutions Found**: Problems solved with the solution approach and patterns used
3. **Context Learned**: Architecture details, conventions, constraints discovered
4. **Preferences Observed**: Coding style, workflow preferences, tool choices

For each memory, provide:
- **type**: decision | solution | context | preference
- **title**: Brief descriptive title (max 80 chars)
- **content**: Full description with relevant details
- **importance**: 1-10 scale (10 = critical, 1 = minor)
- **tags**: Relevant keywords for search
- **source_quotes**: 1-2 relevant quotes from the conversation

Output as JSON in this exact format:
```json
{
  "session_id": "{{SESSION_ID}}",
  "extracted_at": "{{TIMESTAMP}}",
  "memories": [
    {
      "type": "decision",
      "title": "Brief title",
      "content": "Full description...",
      "importance": 8,
      "tags": ["tag1", "tag2"],
      "source_quotes": ["quote from conversation"]
    }
  ],
  "summary": "2-3 sentence session summary"
}
```

Only extract genuinely valuable knowledge. Skip trivial interactions. If nothing valuable, return empty memories array.

---
CONVERSATION TRANSCRIPT:

{{TRANSCRIPT}}
