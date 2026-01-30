module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/x-project/proto/app/lib/ai/provider.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "anthropic",
    ()=>anthropic,
    "defaultModel",
    ()=>defaultModel,
    "getModel",
    ()=>getModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$anthropic$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/@ai-sdk/anthropic/dist/index.mjs [app-route] (ecmascript)");
;
const anthropic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f40$ai$2d$sdk$2f$anthropic$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAnthropic"])({
});
const defaultModel = anthropic('claude-sonnet-4-20250514');
function getModel(provider = 'anthropic') {
    switch(provider){
        case 'anthropic':
            return defaultModel;
        // Future: add other providers
        // case 'openai':
        //   return openai('gpt-4o');
        // case 'vertex':
        //   return vertex('gemini-1.5-pro');
        default:
            return defaultModel;
    }
}
}),
"[project]/x-project/proto/app/lib/ai/system-prompt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CS_ADVISOR_SYSTEM_PROMPT",
    ()=>CS_ADVISOR_SYSTEM_PROMPT
]);
const CS_ADVISOR_SYSTEM_PROMPT = `You are an expert AI advisor helping Customer Service executives understand what's possible with AI in their service operations. Your role is to educate, inform, and help them discover opportunities - NOT to sell.

## Your Persona

- **Knowledgeable but approachable** - You know the space deeply but explain things simply
- **Honest about limitations** - AI can't do everything; be upfront about what works and what doesn't
- **Curious about their situation** - Ask good questions, listen carefully
- **Educational first** - Your goal is to help them learn, not to qualify them as leads

## Available Tools

You have access to these tools to create interactive UI components:

1. **showQuestion** - Display multiple choice questions. Use this for ALL discovery questions.
2. **showEducation** - Display educational content with key points and drill-down options.
3. **showBenchmarks** - Display industry-specific metrics and benchmarks.
4. **showOpportunities** - Display tactical and strategic AI opportunities with ROI estimates.
5. **showRoadmap** - Display quarterly implementation roadmap.
6. **showSummary** - Display summary sections.
7. **searchWeb** - Search the web for company information, industry data, and current stats.

## Conversation Flow

### Phase 0: Upfront Discovery (ALWAYS START HERE)

Before diving into the conversation, gather basic information to personalize the entire experience.

**Step 1: Get Their Name**
Start with a warm welcome and ask for their name. Use showQuestion with inputType: "text":
- Header: "Welcome"
- Question: "Hi! I'm your AI advisor for exploring customer service opportunities. Before we begin, what should I call you?"
- inputType: "text"
- placeholder: "Your name"

When the user responds with their name (e.g., "John"), immediately proceed to Step 2. Store their name using updateContext.

**Step 2: Get Their Role**
Use showQuestion (inputType: "select") to ask about their role:
- Header: "Your Role"
- Question: "Great to meet you, [NAME]! What's your role in the organization?"
- options: [
    { id: "vp_director", label: "VP/Director of Customer Service/Support", description: "Operational leader focused on team efficiency and metrics" },
    { id: "cxo", label: "Chief Customer Officer / CXO", description: "Strategic executive focused on customer experience transformation" },
    { id: "ops", label: "CS Operations / Enablement", description: "Focused on tools, processes, and team productivity" }
  ]

When the user selects a role, store it using updateContext and proceed to Step 3.

**Step 3: Get Their Company Domain**
Use showQuestion (inputType: "text") to ask for their company domain:
- Header: "Your Company"
- Question: "What's your company's website domain? (e.g., acme.com) This helps me tailor the conversation to your industry."
- inputType: "text"
- placeholder: "company.com"

When the user responds with a domain, proceed to Step 4.

**Step 4: Research & Confirm Industry**
After getting the domain:
1. Use searchWeb to research their company:
   - What industry they're in
   - Company size (if findable)
   - What they sell/do
   - Any public info about their customer service model
2. Summarize what you found and confirm:
   - "Based on what I found, [COMPANY] appears to be a [INDUSTRY] company that [BRIEF DESCRIPTION]. Is that accurate?"
3. If they correct you, update your understanding

**Step 5: Where They Want to Apply AI**
This is a KEY branching question. Use showQuestion with allowMultiple: true:
- Header: "AI Focus Areas"
- Question: "Where are you most interested in applying AI? (Select all that apply)"
- allowMultiple: true
- Options:
  - { id: "product", label: "In the Product Experience", description: "AI features your customers interact with directly" }
  - { id: "service", label: "In the Service Experience", description: "AI to help your support team serve customers better" }
  - { id: "operations", label: "In Internal Operations", description: "AI to streamline back-office processes and workflows" }

Based on their selection, tailor the rest of the conversation:
- **Product**: Focus on customer-facing AI, chatbots, self-service, proactive support
- **Service**: Focus on agent copilots, knowledge assist, ticket routing, quality assurance
- **Operations**: Focus on automation, analytics, forecasting, workforce management
- **Multiple areas**: Cover all selected areas, noting connections between them

**Step 6: Route Their Journey**
Now use showQuestion to understand their learning preference:
- Header: "What's Helpful"
- Question: "Thanks, [NAME]! What would be most valuable for you right now?"
- Options:
  - "Help me learn" - I'm exploring what AI can do in customer service. Educate me.
  - "Assess my situation" - I understand the basics. Help me find opportunities specific to my operation.
  - "Both" - Start with education, then help me assess where I can apply it.

**IMPORTANT**: Always use the person's name throughout the conversation after learning it. Adapt your language based on their role:
- **VP/Director**: Focus on metrics, team productivity, tactical wins
- **CXO**: Focus on competitive advantage, transformation, strategic positioning
- **Operations**: Focus on tools, workflows, implementation details

### Phase 1: Welcome & Discovery (After Upfront)

Continue gathering context through questions:

1. **Customer Type** - B2B vs B2C vs Both vs Internal
2. **Interest Path** - "Help me learn" vs "Assess my situation" vs "Both"

### Phase 2: Education Path (if selected)

Cover these topics, offering drill-downs:

1. **Three Levels of AI**: Chatbots, Agent Copilots, Autonomous Agents
2. **Where AI Works vs Struggles**: Strengths and limitations
3. **Industry Benchmarks**: Use their industry for relevant stats
4. **Common Questions**: ROI expectations, costs, timeline, risks
5. **Security & Compliance**: Enterprise requirements

### Phase 3: Assessment Path

Gather specific operational data through showQuestion:

1. **Monthly ticket volume** - Use inputType: "select" with ranges
2. **Support channels** - Use allowMultiple: true (companies use multiple channels)
   - Options: Email, Phone, Chat, Social Media, Self-Service Portal, etc.
3. **Team size** - Use inputType: "select" with ranges
4. **Primary pain points** - Use allowMultiple: true (multiple pain points)
5. **Current platforms** - **ALWAYS use allowMultiple: true** (companies often use multiple tools)
   - Options: Zendesk, Salesforce Service Cloud, Freshdesk, Intercom, HubSpot, Custom/Internal, Other
6. **Data/categorization state** - How well are tickets categorized today?

**IMPORTANT for multi-select questions**: Set allowMultiple: true in the showQuestion parameters. This shows checkboxes instead of radio buttons and lets users select multiple options before submitting.

### Phase 4: Results

Based on assessment, provide:
- Opportunity map (tactical + strategic)
- ROI estimates
- Priority recommendations
- Quarterly roadmap
- Platform-specific guidance

## Important Guidelines

1. **Tools ONLY, no text** - When using a tool like showQuestion, showEducation, etc., do NOT output any text before or after the tool call. The tool renders the UI; text would be redundant. Only output text if you need to say something without a tool.
2. **One step at a time** - Don't overwhelm. Ask one question, wait for response, then proceed.
3. **Be honest about ROI** - Vendor claims are optimistic. Year 1 is often break-even.
4. **Adapt to their level** - CXOs want strategy, VPs want tactics, Ops wants implementation details.
5. **Offer exports** - At the end, offer to summarize everything they can share with their team.
6. **User responses are answers** - When a user responds after a showQuestion tool, their message IS their answer to that question. Process it accordingly and move to the next step.

## ROI Framing

Always frame ROI conservatively:
- Year 1 = foundation building, often break-even
- Years 2-3 = compounding value
- Vendor claims are cherry-picked; set realistic expectations

## Start the Conversation

DO NOT output any text. Immediately use the showQuestion tool to ask for their name (this is Step 1 of Upfront Discovery). The question card itself contains the welcome message.`;
}),
"[project]/x-project/proto/app/lib/ai/tools.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "advisorTools",
    ()=>advisorTools,
    "benchmarkSchema",
    ()=>benchmarkSchema,
    "educationSchema",
    ()=>educationSchema,
    "opportunitySchema",
    ()=>opportunitySchema,
    "questionSchema",
    ()=>questionSchema,
    "roadmapSchema",
    ()=>roadmapSchema,
    "searchWebSchema",
    ()=>searchWebSchema,
    "summarySchema",
    ()=>summarySchema,
    "updateContextSchema",
    ()=>updateContextSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
const questionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    header: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Short label for the question category'),
    question: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('The full question to ask the user'),
    inputType: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'select',
        'text'
    ]).optional().describe('Type of input: select for multiple choice, text for free-form input. Defaults to select.'),
    placeholder: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe('Placeholder text for text input'),
    options: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Unique identifier for this option'),
        label: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Display text for the option'),
        description: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe('Additional context for the option')
    })).optional().describe('2-4 answer options (required for select inputType)'),
    allowMultiple: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional().describe('Allow selecting multiple options (only for select inputType)')
});
const educationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Topic title'),
    content: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Main educational content (markdown supported)'),
    keyPoints: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().describe('Bullet point key takeaways'),
    drillDownOptions: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().describe('Topics user can explore deeper')
});
const benchmarkSchema = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    industry: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Industry name'),
    metrics: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Metric name'),
        value: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Metric value'),
        context: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe('What this means')
    })).describe('Industry benchmark metrics'),
    insights: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().describe('Key insights about this industry')
});
const opportunitySchema = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    tactical: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        name: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        description: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        effort: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            'Low',
            'Medium',
            'High'
        ]),
        timeline: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        estimatedSavings: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).describe('Quick wins (30-90 days)'),
    strategic: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        name: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        description: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        effort: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            'Low',
            'Medium',
            'High'
        ]),
        timeline: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        estimatedSavings: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        prerequisites: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional()
    })).describe('Longer-term initiatives (6-18 months)')
});
const roadmapSchema = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    quarters: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        quarter: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Quarter label (e.g., "Q1")'),
        title: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Quarter theme'),
        initiatives: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            description: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            milestone: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
        }))
    }))
});
const summarySchema = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    sections: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        heading: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        content: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    }))
});
const searchWebSchema = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    query: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Search query to find company info, industry data, or current statistics')
});
const updateContextSchema = __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe('User name'),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe('User role'),
    company: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe('Company name'),
    domain: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe('Company domain'),
    industry: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe('Industry/sub-industry')
});
const advisorTools = {
    showQuestion: {
        description: 'Display a multiple choice question to gather information from the user. Use this for all discovery questions.',
        parameters: questionSchema
    },
    showEducation: {
        description: 'Display educational content about AI in customer service. Use for teaching concepts.',
        parameters: educationSchema
    },
    showBenchmarks: {
        description: 'Display industry-specific benchmarks and metrics. Use after identifying their industry.',
        parameters: benchmarkSchema
    },
    showOpportunities: {
        description: 'Display AI opportunities with ROI estimates. Use after completing assessment.',
        parameters: opportunitySchema
    },
    showRoadmap: {
        description: 'Display quarterly implementation roadmap. Use after presenting opportunities.',
        parameters: roadmapSchema
    },
    showSummary: {
        description: 'Display a summary or conclusion section.',
        parameters: summarySchema
    },
    searchWeb: {
        description: 'Search the web for company information, industry data, or current statistics. Use to research a company by their domain.',
        parameters: searchWebSchema
    },
    updateContext: {
        description: 'Store context about the user for personalizing the conversation. Call this after learning name, role, company, or industry.',
        parameters: updateContextSchema
    }
};
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/x-project/proto/app/lib/storage/file-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appendMessage",
    ()=>appendMessage,
    "createSession",
    ()=>createSession,
    "ensureDataDir",
    ()=>ensureDataDir,
    "listSessions",
    ()=>listSessions,
    "loadSession",
    ()=>loadSession,
    "saveSession",
    ()=>saveSession,
    "updateSessionData",
    ()=>updateSessionData
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const DATA_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), '..', 'data', 'sessions');
async function ensureDataDir() {
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(DATA_DIR, {
        recursive: true
    });
}
async function saveSession(sessionId, data) {
    await ensureDataDir();
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DATA_DIR, `${sessionId}.json`);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, JSON.stringify(data, null, 2));
}
async function loadSession(sessionId) {
    try {
        const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DATA_DIR, `${sessionId}.json`);
        const content = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch  {
        return null;
    }
}
async function createSession(sessionId) {
    const session = {
        id: sessionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        phase: 'discovery',
        messages: []
    };
    await saveSession(sessionId, session);
    return session;
}
async function appendMessage(sessionId, role, content, toolCalls) {
    const session = await loadSession(sessionId);
    if (!session) {
        throw new Error(`Session ${sessionId} not found`);
    }
    session.messages.push({
        role,
        content,
        timestamp: new Date().toISOString(),
        toolCalls
    });
    session.updatedAt = new Date().toISOString();
    await saveSession(sessionId, session);
}
async function updateSessionData(sessionId, updates) {
    const session = await loadSession(sessionId);
    if (!session) {
        throw new Error(`Session ${sessionId} not found`);
    }
    Object.assign(session, updates);
    session.updatedAt = new Date().toISOString();
    await saveSession(sessionId, session);
}
async function listSessions() {
    try {
        await ensureDataDir();
        const files = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readdir(DATA_DIR);
        return files.filter((f)=>f.endsWith('.json')).map((f)=>f.replace('.json', ''));
    } catch  {
        return [];
    }
}
}),
"[project]/x-project/proto/app/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/x-project/proto/app/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$provider$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/lib/ai/provider.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$system$2d$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/lib/ai/system-prompt.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/lib/ai/tools.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$storage$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/x-project/proto/app/lib/storage/file-store.ts [app-route] (ecmascript)");
;
;
;
;
;
const maxDuration = 60;
async function POST(req) {
    try {
        const { messages, sessionId } = await req.json();
        console.log('[API] Received request with', messages.length, 'messages, sessionId:', sessionId);
        console.log('[API] Last message:', JSON.stringify(messages[messages.length - 1]).substring(0, 200));
        // Ensure session exists
        let session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$storage$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadSession"])(sessionId);
        if (!session) {
            session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$storage$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSession"])(sessionId);
        }
        // Get the last user message to save
        const lastUserMessage = messages[messages.length - 1];
        if (lastUserMessage?.role === 'user') {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$storage$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appendMessage"])(sessionId, 'user', lastUserMessage.content);
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["streamText"])({
            model: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$provider$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultModel"],
            system: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$system$2d$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CS_ADVISOR_SYSTEM_PROMPT"],
            messages,
            maxSteps: 5,
            tools: {
                showQuestion: {
                    description: 'Display a multiple choice question to gather information from the user. Use this for all discovery questions.',
                    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["questionSchema"],
                    execute: async (args)=>{
                        // UI tool - just acknowledge for message history
                        return {
                            displayed: true,
                            type: 'question',
                            header: args.header
                        };
                    }
                },
                showEducation: {
                    description: 'Display educational content about AI in customer service. Use for teaching concepts.',
                    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["educationSchema"],
                    execute: async (args)=>{
                        return {
                            displayed: true,
                            type: 'education',
                            title: args.title
                        };
                    }
                },
                showBenchmarks: {
                    description: 'Display industry-specific benchmarks and metrics. Use after identifying their industry.',
                    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["benchmarkSchema"],
                    execute: async (args)=>{
                        return {
                            displayed: true,
                            type: 'benchmarks',
                            industry: args.industry
                        };
                    }
                },
                showOpportunities: {
                    description: 'Display AI opportunities with ROI estimates. Use after completing assessment.',
                    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["opportunitySchema"],
                    execute: async ()=>{
                        return {
                            displayed: true,
                            type: 'opportunities'
                        };
                    }
                },
                showRoadmap: {
                    description: 'Display quarterly implementation roadmap. Use after presenting opportunities.',
                    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["roadmapSchema"],
                    execute: async ()=>{
                        return {
                            displayed: true,
                            type: 'roadmap'
                        };
                    }
                },
                showSummary: {
                    description: 'Display a summary or conclusion section.',
                    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["summarySchema"],
                    execute: async (args)=>{
                        return {
                            displayed: true,
                            type: 'summary',
                            title: args.title
                        };
                    }
                },
                searchWeb: {
                    description: 'Search the web for company information, industry data, or current statistics. Use to research a company by their domain.',
                    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchWebSchema"],
                    execute: async ({ query })=>{
                        // For prototype: simulate web search with structured response
                        // In production, this would call a real search API
                        console.log('[searchWeb] Query:', query);
                        // Extract domain from query if present
                        const domainMatch = query.match(/(?:about\s+)?(\w+(?:\.\w+)+)/i);
                        const domain = domainMatch ? domainMatch[1] : null;
                        if (domain) {
                            // Simulate company research
                            return {
                                success: true,
                                domain,
                                message: `Research completed for ${domain}. Note: This is prototype mode - in production, real web search results would be returned here. Please infer reasonable company information based on the domain name to continue the conversation.`,
                                hint: 'Infer the industry, company type, and likely customer service model from the domain name.'
                            };
                        }
                        return {
                            success: true,
                            query,
                            message: `Search completed for: ${query}. Note: This is prototype mode - in production, real search results would appear here.`
                        };
                    }
                },
                updateContext: {
                    description: 'Store context about the user for personalizing the conversation. Call this after learning name, role, company, or industry. After calling this, ALWAYS proceed to the next step by calling showQuestion.',
                    parameters: __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$ai$2f$tools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateContextSchema"],
                    execute: async (args)=>{
                        // Store the context in session
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$storage$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateSessionData"])(sessionId, args);
                        // Return a result that prompts the AI to continue
                        return {
                            success: true,
                            message: 'Context updated. Now proceed to the next discovery question.',
                            stored: args
                        };
                    }
                }
            },
            onFinish: async ({ text, toolCalls })=>{
                // Save assistant response
                if (text) {
                    const toolCallData = toolCalls?.map((tc)=>({
                            name: tc.toolName,
                            args: tc.args
                        }));
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$x$2d$project$2f$proto$2f$app$2f$lib$2f$storage$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appendMessage"])(sessionId, 'assistant', text, toolCallData);
                }
            // Note: updateContext is now handled in its execute function
            }
        });
        return result.toDataStreamResponse();
    } catch (error) {
        console.error('[API] Error:', error);
        return new Response(JSON.stringify({
            error: String(error)
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bc47c7a2._.js.map