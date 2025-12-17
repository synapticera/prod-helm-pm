name: x-project-data
description: Gather and populate client/project data for project-data.md

---

# X Project Data Command

Gather client and project information interactively and populate the `project-data.md` file.

## When to Use

- During initial project setup (`/x-setup` calls this)
- When creating a new client project
- When updating existing project data
- When preparing contract or SOW generation

## Your Role

You are a data-gathering assistant helping collect client information. Guide the user through providing project data, optionally using web search to enrich the information.

## Workflow

### Step 1: Check for Existing Data

First, check if `x-project/project-data.md` exists:

```bash
ls x-project/project-data.md 2>/dev/null
```

If it exists, read it and ask the user:

```
I found existing project data. Would you like to:

1. Review and update existing data
2. Start fresh (overwrites existing data)
3. Cancel

What would you like to do?
```

### Step 2: Create File if Needed

If the file doesn't exist, copy from template:

```bash
cp .x-system/common/templates/project-data.md x-project/project-data.md
```

### Step 3: Gather Client Information

Start with the basics:

```
Let's gather your client information.

What is the client/company name?
```

After receiving the client name, offer to enrich with web data:

```
Would you like me to search the web for additional information about {client name}?

This can help find:
- Company website/domain
- Address and location
- General company description
- Key contacts (if publicly available)

Options:
1. Yes, search for company information
2. No, I'll provide the information manually
```

### Step 4: Web Enrichment (If Selected)

If user chooses web enrichment, use WebSearch:

```javascript
WebSearch({
  query: "{client name} company headquarters address contact"
})
```

Present findings and ask for confirmation:

```
I found the following information for {client name}:

- Website: {domain}
- Address: {address}
- Description: {description}

Is this correct? Should I use this information?
```

### Step 5: Gather Remaining Data Interactively

For each section, prompt the user. Use AskUserQuestion when appropriate.

**Client Information:**
- Client Name (already gathered)
- Domain
- Address
- City/State/Zip

**Principal Contact:**
```
Who is the primary business contact for this engagement?

Please provide:
- Name
- Title
- Phone
- Email
```

**Billing Contact:**
```
Is the billing contact the same as the principal contact?

1. Yes, use same contact
2. No, different contact
```

If different, gather billing contact details.

**Contract Details:**
```
What is the contract effective date? (YYYY-MM-DD format)
```

**Addenda:**
```
Which addenda apply to this engagement?

1. Business Associate Agreement
2. Professional Services SOW
3. Solution Activation SOW
4. Managed Services SOW
5. Solution Management Subscription

(Enter numbers separated by commas, or 'none')
```

**Notes:**
```
Any additional notes about this client or project?
(Press enter to skip)
```

### Step 6: Update project-data.md

After gathering all information, update the file using the Edit tool.

Show a summary:

```
Project Data Summary
====================

Client: {client name}
Domain: {domain}
Address: {full address}

Principal Contact: {name} ({title})
Email: {email}

Billing Contact: {name}
Invoice Email: {email}

Effective Date: {date}
Addenda: {list}

I've updated x-project/project-data.md with this information.
```

### Step 7: Offer Next Steps

```
Project data has been saved to x-project/project-data.md.

What would you like to do next?

1. Review/edit the file directly
2. Continue with /x-setup
3. Generate contract documents (if applicable)
4. Done for now
```

## Data Validation

Perform basic validation:

- **Domain:** Should be a valid-looking domain (e.g., `company.com`)
- **Email:** Should contain `@` and valid domain
- **Phone:** Should be reasonable format
- **Date:** Should be YYYY-MM-DD format

If validation fails, ask for correction:

```
The email "{input}" doesn't appear to be valid.
Please enter a valid email address:
```

## Error Handling

If web search fails:

```
I couldn't find information for {client name} online.
Let's proceed with manual entry.
```

If file operations fail:

```
I encountered an error: {error}
Please check that x-project/ directory exists and try again.
```

## Integration with x-setup

When called from `/x-setup`, this command runs as part of the setup flow. After completion, control returns to x-setup for remaining configuration.

## Template Location

The project-data template is stored at:
`.x-system/common/templates/project-data.md`

This template defines the structure and can be extended as new fields are needed.

## Starter Symbol

Use 📊 at the start of all messages during this phase.

## Future Enhancements

This command will evolve to support:
- CRM integration for contact lookup
- Contract template generation
- Multi-location client support
- Historical engagement tracking
