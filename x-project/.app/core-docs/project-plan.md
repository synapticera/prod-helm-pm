# Project Plan - CSA Summer Camp Staffing Platform

**Project Duration:** 5 weeks (Dec 2025 - Jan 2026)
**Delivery Model:** Agile (5 x 1-week sprints)

---

## Swim Lane Overview

| Swim Lane | Focus Areas |
|-----------|-------------|
| **Business** | Requirements, decisions, branding, UAT, design partner coordination, knowledge transfer |
| **UX** | Wireframes, UI design, user flows, prototypes, branding implementation |
| **Backend** | Architecture, APIs, database, integrations, infrastructure, deployment |

---

## Week 1: Foundation & Setup

| Swim Lane | Activities |
|-----------|------------|
| **Business** | • Project kickoff meeting<br>• Finalize branding and design inputs<br>• Provide Bullhorn API credentials and documentation<br>• Provide recruitment workflow documentation<br>• Define subscription tiers and posting limits<br>• Identify design partners for testing |
| **UX** | • Discovery and requirements alignment<br>• Information architecture definition<br>• Wireframes: Registration & authentication flows (employer + candidate)<br>• Wireframes: Job creation form<br>• Initial branding/style guide setup |
| **Backend** | • Architecture design and documentation<br>• GCP environment setup<br>• Database schema design<br>• Authentication system setup (employer + candidate)<br>• Bullhorn API integration spike<br>• Project scaffolding and CI/CD setup |

**Week 1 Milestone:** Architecture approved, environments ready, Bullhorn access confirmed

---

## Week 2: Core Employer & Candidate Features

| Swim Lane | Activities |
|-----------|------------|
| **Business** | • Review and approve wireframes<br>• Finalize job posting field requirements<br>• Define candidate profile required fields<br>• Confirm Bullhorn data mapping<br>• Approve branding/style guide |
| **UX** | • UI designs: Employer registration and dashboard<br>• UI designs: Job creation and management<br>• Wireframes: Candidate profile and resume upload<br>• Wireframes: Search and filtering interfaces<br>• Prototype: Employer job posting flow |
| **Backend** | • Employer registration and authentication API<br>• Job CRUD APIs (create, read, update, delete)<br>• Job posting status tracking<br>• Bullhorn read-only integration (candidate data sync)<br>• Candidate account creation from Bullhorn data<br>• Resume upload and storage |

**Week 2 Milestone:** Employer can register and create jobs; Bullhorn integration functional

---

## Week 3: Search, Filtering & AI Features

| Swim Lane | Activities |
|-----------|------------|
| **Business** | • Review search/filter UX designs<br>• Define AI suggestion requirements for job titles/descriptions<br>• Review candidate onboarding landing page copy<br>• Begin design partner outreach |
| **UX** | • UI designs: Candidate profile and resume management<br>• UI designs: Job search and filtering (employer + candidate)<br>• UI designs: Natural language search interface<br>• UI designs: Candidate onboarding landing pages<br>• Prototype: Candidate search flow |
| **Backend** | • Resume parsing, extraction, and mapping (education, skills, experience)<br>• AI-powered job title and description suggestions<br>• Multi-criteria filtering engine<br>• Keyword search implementation<br>• Natural language search (AI-powered)<br>• Results scoring and ranking algorithm<br>• Favorites/saved searches functionality |

**Week 3 Milestone:** Search and filtering operational; AI features functional

---

## Week 4: Payments, Admin & Integration

| Swim Lane | Activities |
|-----------|------------|
| **Business** | • Define payment/subscription trigger logic<br>• Review admin dashboard requirements<br>• Prepare UAT test cases<br>• Coordinate design partner testing schedule |
| **UX** | • UI designs: Payment/subscription flow<br>• UI designs: Admin dashboard<br>• UI designs: Metrics reporting views<br>• Final polish and consistency review<br>• Prepare user documentation screenshots |
| **Backend** | • Stripe payment integration<br>• Subscription tier enforcement (posting limits)<br>• Admin dashboard APIs<br>• User management (add, update, delete, password reset)<br>• Metrics reporting APIs (employer count, candidate count, subscriptions, activity)<br>• Candidate outreach landing pages |

**Week 4 Milestone:** Payments functional; Admin dashboard complete; Ready for UAT

---

## Week 5: Testing, Deployment & Knowledge Transfer

| Swim Lane | Activities |
|-----------|------------|
| **Business** | • Lead User Acceptance Testing<br>• Manage design partner testing<br>• Final requirements sign-off<br>• Attend knowledge transfer sessions<br>• Review functional and technical specifications |
| **UX** | • Support UAT with design clarifications<br>• Bug fixes and polish<br>• Prepare train-the-trainer materials<br>• Deliver live training session on system usage |
| **Backend** | • Production deployment to GCP<br>• Performance testing and optimization<br>• Bug fixes from UAT<br>• Security review<br>• Technical specification documentation<br>• Knowledge transfer sessions (architecture and deployment) |

**Week 5 Milestone:** Production deployment complete; UAT passed; Knowledge transfer delivered

---

## Deliverables Summary

| Deliverable | Owner | Due |
|-------------|-------|-----|
| Functioning software platform | Backend + UX | Week 5 |
| Functional specification document | Business + UX | Week 5 |
| Technical specification document | Backend | Week 5 |
| Train-the-trainer materials | UX | Week 5 |
| 2x Live training sessions (system usage) | UX + Business | Week 5 |
| 2x Knowledge transfer sessions (architecture/deployment) | Backend | Week 5 |

---

## Key Dependencies & Assumptions

| Dependency | Owner | Required By |
|------------|-------|-------------|
| Branding and design inputs | CSA | Week 1-2 |
| Bullhorn API credentials and documentation | CSA | Week 1 |
| Recruitment workflow documentation | CSA | Week 1 |
| Design partner availability for testing | CSA | Week 4-5 |
| Timely feedback on designs/deliverables (3 business days) | CSA | Ongoing |
| Project team with decision-making authority | CSA | Ongoing |

---

## Weekly Ceremonies

- **Weekly Status Meeting** - Review progress, confirm requirements, get feedback, make decisions
- **Sprint Demo** - End of each week, demonstrate completed functionality
- **UAT Support** - Week 5, daily standups during testing period
