# CSA Summer Camp Staffing Platform - Project Scope

**Project Name:** SummerJobFinder
**Client:** Carney Sandoe & Associates (CSA)
**Timeline:** 5 weeks (30-45 days from kickoff)

---

## Vision

Validate and launch a self-service platform connecting summer camps with high-quality job seekers, leveraging Carney Sandoe's 15,000+ vetted candidate database as a competitive differentiator.

---

## Core Thesis

Test the market thesis with the most focused experiment possible:

- **Market Pain** - Camp leaders are unhappy with existing options and willing to act—not just complain
- **Database Advantage** - CSA's candidate pool provides superior quality that leads to better conversion rates
- **Platform Viability** - CSA can rapidly deliver a compelling self-service experience
- **Brand Leverage** - CSA relationships and reputation accelerate trust and adoption

---

## Success Criteria

- **Conversion validation** - Candidates respond and get hired at reasonable rates
- **Employer willingness** - Design partners actively engage and would pay for the service
- **Candidate engagement** - Filtered candidates respond to targeted outreach
- **Platform confidence** - Technical feasibility validated for self-service model

---

## Approach: Design Partner Model

### Employer Partners (3)
| Partner | Location | Status |
|---------|----------|--------|
| Carly Rappaport | Camp Cohut, Maine | Identified |
| Robin Walker | North Carolina | Identified |
| TBD | New York | To confirm |

**Partner engagement includes:**
- Website job listings
- Searchable database access
- Direct feedback loop on experience

### Job Seeker Side
- Resume submission (required)
- 7-10 qualifying questions (3 new, rest from existing CSA data)
- Key filters: geographic preference, camp type (day/overnight), position type, compensation expectations
- Feedback mechanism: Seeker ambassadors/advisors for direct input

---

## Differentiation Vectors

- **Geography coverage** - Precise matching on location preferences
- **Camp type** - Day vs overnight filtering
- **Compensation alignment** - Realistic expectation setting
- **Mission fit** - Program type and culture matching
- **Specialties** - Role-specific filtering (counselor, waterfront, nurse, etc.)
- **Candidate quality** - Vetted education backgrounds (NESCAC, independent schools)

---

## Branding Approach

- Standalone brand with CSA affiliation ("powered by Carney Sandoe")
- Demonstrates camp-specific expertise
- Avoids cannibalization of existing school relationships
- Creates template for future vertical expansion

---

## Target Milestones

| Milestone | Target |
|-----------|--------|
| Pilot launch | 30-45 days from kickoff |
| First placements | February/March 2025 |
| ACA Conference (San Diego) | February 2025 |

---

## Core Capabilities (Phase 1)

### 1. Employer Job Posting & Management
- Registration/login for employers
- Job creation form (position, description, location, opportunity type, salary, work authorization)
- AI-assisted suggestions for titles and descriptions
- Job listing display with status (active, expired, archived)
- Tiered posting limits: Basic (1 position) / Premium (unlimited)

### 2. Candidate Profile & Resume Management
- Registration/login for candidates (new + existing CSA)
- Profile form: name, email, phone, location, opportunity type preference, work authorization, salary range
- Resume upload (required) with file validation
- Pre-populated fields for CSA candidates via Bullhorn (name, address, email, phone, geography)
- Profile completeness indicator

### 3. Resume Parsing & Data Extraction
- PDF/document text extraction
- Parse education (degrees, institutions, graduation years)
- Extract certifications and credentials (CPR, teaching licenses)
- Identify skills and keywords (languages, technical skills, subject expertise)
- Target accuracy: >85%

### 4. Advanced Candidate Search & Filtering
- Filter by: opportunity preference, location (state-based), work authorization, previous summer experience
- Keyword search (e.g., "equestrian," "STEM," "tennis," "theater")
- Viewed/Not Viewed toggle
- Sorting: relevance, recently added, most viewed, alphabetical
- Pagination for large result sets

### 5. Matching Algorithm & Score Display
- Display match percentage on candidate cards (e.g., "92% Match")
- Scoring: filter alignment (25% weight) + resume keyword overlap (75% weight)
- Real-time calculation when displaying candidates
- Handle edge cases (no resume, incomplete profile)

### 6. Payment & Subscription Model
- Two-tier pricing: Basic ($295/mo) + Premium ($1,295/mo)
- Freemium: browse 5 candidates free, paywall for full profiles
- Stripe integration for payment processing
- Subscription management (start, cancel, upgrade)
- Webhook handling for Stripe events

### 7. Bullhorn CRM Integration
- Read-only integration with Bullhorn REST API
- Pull candidate data for pre-population (name, contact, location, skills, resume)
- Authentication and secure API key management
- Rate limiting and error handling
- Fallback behavior if API unavailable

### Supporting: Basic Admin Dashboard
- User management (view, toggle visibility, delete)
- Position management (list, archive, edit)
- Basic metrics (employer count, candidate count, subscriptions)

---

## Out of Scope (This Phase)

- Mass outreach to full 15,000 candidate database
- Final pricing/paywall implementation
- Multi-vertical expansion
- Full production platform
- Advanced NLP/natural language search
- Geographic proximity/distance-based matching
- Machine learning-driven matching
- Email notifications and messaging
- Mobile application
- Analytics dashboard
- Bullhorn write-back capability

---

## Quantified Success Targets

- 15+ employer sign-ups
- 8+ paid subscriptions ($2,000+ MRR validated)
- 50+ candidate profiles
- 150+ paid candidate profile unlocks
- Resume parsing accuracy >85%
- Search relevance for 80% of queries
- System handles 20+ concurrent users

---

## Team & Capacity

- **Executive Sponsor:** Bill (5 hrs/week)
- **Lead Designer:** Joe (20 hrs/week)
- **Lead Architect:** Charles (20 hrs/week)
- **Total:** 225 hours over 5 weeks

---

*Last Updated: November 2025*
