# Dispatch ROI Navigator + HELM Explorer Integration Design

**Goal**: Integrate Dispatch ROI Navigator into HELM Explorer as a single unified deployment on Google Cloud Platform.

---

## Current State Analysis

### Dispatch ROI App (`prod-helm-pm/x-project/customer-examples/dispatch/dispatch-roi-app`)

**Tech Stack**:
- Next.js 16.1.6 (App Router)
- React 19.2.3
- Recharts (data visualization)
- Tailwind CSS v4
- TypeScript
- Remotion (video generation)
- No authentication
- No backend API/database

**Architecture**:
- Pure client-side rendering
- Static data from JSON files (`src/lib/data/dispatch-roi.json`)
- Component-based charts and tables
- 4 main tabs: Core Data, EBITDA/EV, Cash Flow, AI Roadmap
- Standalone deployment capability (already has Dockerfile + GCP deploy script)

### HELM Explorer (`prod-helm-explore/proto/app`)

**Tech Stack**:
- Next.js 16.1.3 (App Router)
- React 19.2.3
- AI SDK (Anthropic + Google providers)
- Tailwind CSS v4
- TypeScript
- Authentication (middleware.ts with access control)
- Backend API routes (`/api/chat`, `/api/auth/*`, `/api/feedback`)

**Architecture**:
- AI-powered chat interface
- Multi-provider LLM support (Claude + Gemini)
- Session-based conversations
- File-based storage (transitioning to Firestore for GCP)
- Middleware-based access control
- Already has GCP deployment infrastructure (Dockerfile)

---

## Integration Options

### Option 1: Separate Apps, Shared Deployment (Recommended)

**Architecture**: Deploy both as separate services under the same GCP project, with navigation links between them.

```
GCP Project: helm-platform
├── Service 1: helm-explorer (chat/AI agent)
│   └── URL: explorer.helm.synaptic.build
├── Service 2: dispatch-roi-navigator (ROI calculator)
│   └── URL: dispatch-roi.helm.synaptic.build
└── Shared: Cloud Storage, Firestore, logging
```

**Pros**:
- ✅ Minimal code changes (each app stays independent)
- ✅ Independent scaling (ROI app can be static CDN, Explorer needs compute)
- ✅ Faster iteration (deploy one without affecting the other)
- ✅ Clear separation of concerns (calculator vs. conversational AI)
- ✅ Easy to add more customer-specific calculators later
- ✅ Different auth requirements (ROI public, Explorer gated)

**Cons**:
- ❌ Two separate deployments to manage
- ❌ Slightly higher infrastructure cost (minimal with Cloud Run)
- ❌ Cross-app navigation requires URL changes

**Implementation**:
1. Add navigation header to Dispatch ROI app with link to HELM Explorer
2. Add "Customer ROI Calculators" section to HELM Explorer with link to Dispatch
3. Deploy both to Cloud Run with custom domains
4. Share analytics/logging backend (Firestore)

**Effort**: 2-3 hours

---

### Option 2: Embed as Route in HELM Explorer

**Architecture**: Move Dispatch ROI app into HELM Explorer as `/customers/dispatch` route.

```
prod-helm-explore/proto/app/
├── app/
│   ├── page.tsx (HELM Explorer chat)
│   ├── customers/
│   │   └── dispatch/
│   │       └── page.tsx (ROI Navigator)
│   └── api/
└── components/
    ├── Chat.tsx (existing)
    └── dispatch-roi/ (new - all ROI components)
```

**Pros**:
- ✅ Single deployment pipeline
- ✅ Unified navigation (no URL changes)
- ✅ Shared component library
- ✅ Single authentication system
- ✅ Easier to maintain long-term

**Cons**:
- ❌ Significant refactoring required
- ❌ Package.json conflicts (Recharts, Remotion, jspdf need to be added to HELM)
- ❌ CSS conflicts (both use Tailwind v4 but different configurations)
- ❌ Recharts adds ~500KB to bundle size for all users
- ❌ Tightly couples customer-specific code with core platform

**Implementation**:
1. Create `/app/customers/dispatch` route in HELM Explorer
2. Move all Dispatch components to `components/dispatch-roi/`
3. Move data files to `lib/data/customers/dispatch/`
4. Merge package.json dependencies
5. Update import paths throughout
6. Test authentication flow for customer-specific routes
7. Update build configuration

**Effort**: 6-8 hours + testing

---

### Option 3: Monorepo with Shared Packages

**Architecture**: Create monorepo structure with shared components and separate apps.

```
helm-platform/
├── apps/
│   ├── explorer/ (HELM Explorer)
│   └── dispatch-roi/ (ROI Navigator)
├── packages/
│   ├── ui/ (shared components)
│   ├── charts/ (Recharts wrappers)
│   └── types/ (TypeScript types)
└── infra/
    └── deploy/ (GCP deployment scripts)
```

**Pros**:
- ✅ Code reuse across customer apps
- ✅ Independent deployments
- ✅ Scalable for multiple customers
- ✅ Modern architecture

**Cons**:
- ❌ Massive restructuring effort
- ❌ New build tooling (Turborepo/Nx)
- ❌ Overkill for 2 apps
- ❌ Longer onboarding for new developers

**Effort**: 2-3 days

---

## Recommended Approach: Option 1 (Separate Apps, Shared Deployment)

### Why This Is Best

1. **Speed to Production**: Can deploy both apps to GCP within hours, not days
2. **Flexibility**: ROI calculator can be public while Explorer stays gated
3. **Performance**: ROI app can be fully static (deploy to Cloud Storage + CDN), Explorer needs API routes
4. **Maintainability**: Changes to one app don't risk breaking the other
5. **Scalability**: Easy pattern for adding more customer-specific tools (e.g., AARP ROI, Healthcare ROI)
6. **Cost Optimization**: Static ROI apps cost ~$1/month on Cloud Storage vs. Cloud Run

### Deployment Architecture

```
Google Cloud Project: helm-platform-prod
├── Cloud Run Services:
│   └── helm-explorer
│       - Image: gcr.io/helm-platform-prod/helm-explorer
│       - URL: https://explorer.helm.synaptic.build
│       - Auth: Required
│       - Features: AI chat, session management, tools
│
├── Cloud Storage + CDN:
│   └── customer-roi-calculators bucket
│       ├── dispatch/index.html (static build of Dispatch ROI)
│       ├── aarp/index.html (future)
│       └── healthcare/index.html (future)
│       - URL: https://roi.helm.synaptic.build/dispatch
│       - Auth: None (public demos)
│       - Cost: ~$1/month
│
└── Shared Resources:
    ├── Firestore (sessions, analytics)
    ├── Cloud Logging
    └── Cloud Monitoring
```

### Navigation Flow

**HELM Explorer → ROI Calculator**:
- Add "Customer Examples" section in Explorer sidebar
- Link: "Dispatch AI ROI Analysis" → opens `https://roi.helm.synaptic.build/dispatch`

**ROI Calculator → HELM Explorer**:
- Add header with "Powered by HELM" + logo
- CTA button: "Explore HELM Platform" → opens `https://explorer.helm.synaptic.build`

### Implementation Steps

#### Phase 1: Prepare Dispatch ROI for Static Deployment (1 hour)

1. **Build static export**:
   ```bash
   cd dispatch-roi-app
   npm run build
   npx next export  # Or use existing export-standalone.sh
   ```

2. **Upload to Cloud Storage**:
   ```bash
   gsutil mb gs://helm-roi-calculators
   gsutil -m cp -r out/* gs://helm-roi-calculators/dispatch/
   gsutil web set -m index.html gs://helm-roi-calculators
   gsutil iam ch allUsers:objectViewer gs://helm-roi-calculators
   ```

3. **Configure CDN** (optional but recommended):
   - Enable Cloud CDN on the bucket
   - Configure custom domain via Cloud Load Balancer

#### Phase 2: Update HELM Explorer Navigation (30 min)

1. **Add ROI Calculator link** in Explorer sidebar:
   ```tsx
   // components/Navigation.tsx or similar
   <a
     href="https://roi.helm.synaptic.build/dispatch"
     target="_blank"
     className="nav-link"
   >
     <FileText className="icon-sm" />
     Customer ROI Examples
   </a>
   ```

#### Phase 3: Update Dispatch ROI Header (30 min)

1. **Add HELM branding** and back-navigation:
   ```tsx
   // src/components/layout/Header.tsx
   <div className="flex items-center gap-4">
     <a href="https://explorer.helm.synaptic.build">
       <img src="/helm-logo.svg" alt="HELM" />
     </a>
     <span className="text-sm text-gray-400">|</span>
     <span>Dispatch AI ROI Navigator</span>
   </div>
   ```

#### Phase 4: Deploy HELM Explorer to Cloud Run (if not already done)

1. **Build and deploy**:
   ```bash
   cd prod-helm-explore/proto/app
   ./deploy-gcp.sh  # Assuming similar script exists
   ```

2. **Configure custom domain**:
   ```bash
   gcloud run domain-mappings create \
     --service helm-explorer \
     --domain explorer.helm.synaptic.build
   ```

### Cost Breakdown

| Service | Infrastructure | Monthly Cost |
|---------|---------------|--------------|
| HELM Explorer (Cloud Run) | 2 vCPU, 2GB RAM, pay-per-request | $5-20/month (low traffic) |
| Dispatch ROI (Cloud Storage + CDN) | Static hosting | ~$1/month |
| Firestore (shared data) | Document reads/writes | $1-5/month |
| **Total** | | **$7-26/month** |

### Benefits of This Approach

1. **Fast**: Can be deployed today
2. **Scalable**: Easy to add more customer calculators
3. **Cost-Effective**: Static calculators are nearly free
4. **Maintainable**: Clear boundaries between apps
5. **Flexible**: Different auth/access patterns per app
6. **Professional**: Custom domains, fast CDN delivery

---

## Alternative: Single App Integration (Option 2 Details)

If you prefer the single-app approach despite the trade-offs:

### Implementation Plan

#### Step 1: Merge Dependencies

```bash
# In prod-helm-explore/proto/app/package.json, add:
{
  "dependencies": {
    "recharts": "^3.7.0",
    "@remotion/player": "^4.0.414",
    "jspdf": "^4.0.0",
    "jspdf-autotable": "^5.0.7"
  }
}
```

#### Step 2: Create Route Structure

```bash
mkdir -p prod-helm-explore/proto/app/app/customers/dispatch
mkdir -p prod-helm-explore/proto/app/components/customers/dispatch
mkdir -p prod-helm-explore/proto/app/lib/data/customers/dispatch
```

#### Step 3: Move Components

```bash
# Copy all components
cp -r dispatch-roi-app/src/components/* prod-helm-explore/proto/app/components/customers/dispatch/

# Copy data
cp dispatch-roi-app/src/lib/data/dispatch-roi.json prod-helm-explore/proto/app/lib/data/customers/dispatch/

# Copy utilities
cp -r dispatch-roi-app/src/lib/utils prod-helm-explore/proto/app/lib/customers/dispatch/
cp -r dispatch-roi-app/src/lib/types prod-helm-explore/proto/app/lib/customers/dispatch/
```

#### Step 4: Create Page Route

```tsx
// prod-helm-explore/proto/app/app/customers/dispatch/page.tsx
import DispatchROINavigator from '@/components/customers/dispatch/DispatchROINavigator';

export default function DispatchROIPage() {
  return <DispatchROINavigator />;
}
```

#### Step 5: Update All Import Paths

```bash
# Find and replace in all moved files:
# FROM: '@/lib/data'
# TO:   '@/lib/data/customers/dispatch'
#
# FROM: '@/lib/utils/*'
# TO:   '@/lib/customers/dispatch/utils/*'
#
# FROM: '@/components/*'
# TO:   '@/components/customers/dispatch/*'
```

#### Step 6: Configure Routing

```tsx
// prod-helm-explore/proto/app/components/Navigation.tsx
<Link href="/customers/dispatch">
  Dispatch ROI Navigator
</Link>
```

#### Step 7: Handle Authentication

```tsx
// prod-helm-explore/proto/app/middleware.ts
// Add exemption for customer demo routes
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|customers).*)',
  ],
};
```

### Migration Checklist

- [ ] Merge package.json dependencies
- [ ] Create route structure
- [ ] Move all components with namespace
- [ ] Update 50+ import statements
- [ ] Fix any TypeScript errors
- [ ] Test all 4 tabs work correctly
- [ ] Test navigation from Explorer to ROI
- [ ] Test authentication exemption
- [ ] Update global CSS to avoid conflicts
- [ ] Test build process
- [ ] Deploy to GCP
- [ ] Verify production deployment

**Estimated Effort**: 6-8 hours
**Risk**: Medium (import path complexity, CSS conflicts)

---

## Decision Matrix

| Criteria | Option 1 (Separate) | Option 2 (Embedded) |
|----------|---------------------|---------------------|
| **Time to Deploy** | ⭐⭐⭐ 2-3 hours | ⭐ 6-8 hours |
| **Maintenance** | ⭐⭐⭐ Independent | ⭐⭐ Coupled |
| **Cost** | ⭐⭐⭐ $7-26/mo | ⭐⭐ $10-30/mo |
| **Scalability** | ⭐⭐⭐ Add more easily | ⭐ Monolithic growth |
| **User Experience** | ⭐⭐ URL change | ⭐⭐⭐ Seamless nav |
| **Performance** | ⭐⭐⭐ CDN for ROI | ⭐⭐ Bundled |
| **Risk** | ⭐⭐⭐ Low | ⭐⭐ Medium |

---

## Recommended Path Forward

**Choose Option 1: Separate Apps, Shared Deployment**

### Immediate Next Steps

1. **Today (30 min)**:
   - Add HELM branding to Dispatch ROI header
   - Add "Back to HELM Explorer" link
   - Test static build export

2. **This Week (2 hours)**:
   - Create `helm-roi-calculators` Cloud Storage bucket
   - Upload Dispatch ROI static build
   - Configure CDN + custom domain
   - Test public access

3. **Next Week (1 hour)**:
   - Update HELM Explorer navigation to include ROI calculator link
   - Add analytics tracking for cross-navigation
   - Document the pattern for future customer calculators

### Future Customer Calculators

This pattern scales easily:

```
Cloud Storage: helm-roi-calculators/
├── dispatch/     (Dispatch ROI Navigator)
├── aarp/         (AARP Member Services ROI)
├── healthcare/   (Healthcare Payer ROI)
└── saas/         (Generic SaaS ROI)
```

Each calculator:
- Independent Next.js app
- Static build exported to Cloud Storage
- Public access (no auth)
- Links back to HELM Explorer
- ~1MB size, $0.01/month hosting

---

## Why Not Option 2 (Embedded)?

While embedding seems cleaner, it creates hidden complexity:

1. **Dependency Conflicts**: Recharts + Remotion + jspdf add 2MB+ to Explorer bundle
2. **Build Time**: Every Explorer deploy must rebuild Dispatch code (slower CI/CD)
3. **Testing Scope**: Changes to Explorer require re-testing ROI calculator
4. **CSS Namespace**: Both apps use Tailwind v4 - potential class conflicts
5. **Future Burden**: Every new calculator adds to monolith weight

**Strategic Decision**: HELM Explorer should be the AI agent platform, not a monolith holding all customer demos.

---

## Implementation Guide: Option 1

### File Changes Required

#### 1. Dispatch ROI App Header Update

```tsx
// src/components/layout/Header.tsx
<header className="border-b border-border backdrop-blur-xl sticky top-0 z-50">
  <div className="container mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Left: HELM branding */}
      <div className="flex items-center gap-4">
        <a href="https://explorer.helm.synaptic.build" className="flex items-center gap-2">
          <img src="/helm-logo.svg" alt="HELM" className="h-8" />
          <span className="text-xs text-gray-400">Platform</span>
        </a>
        <div className="h-6 w-px bg-border" />
        <div>
          <h1 className="text-xl font-bold">Dispatch AI ROI Navigator</h1>
          <p className="text-xs text-gray-400">Customer Success Example</p>
        </div>
      </div>

      {/* Right: existing buttons */}
      <div className="flex items-center gap-3">
        <button>Download Report</button>
        <button>Watch Video</button>
      </div>
    </div>
  </div>
</header>
```

#### 2. HELM Explorer Navigation Update

```tsx
// prod-helm-explore/proto/app/components/Navigation.tsx (or similar)
<nav>
  <h3 className="text-xs font-semibold text-gray-400 mb-2">CUSTOMER EXAMPLES</h3>
  <a
    href="https://roi.helm.synaptic.build/dispatch"
    target="_blank"
    rel="noopener noreferrer"
    className="nav-link"
  >
    <FileText className="icon-sm" />
    Dispatch ROI Navigator
    <ExternalLink className="icon-xs ml-auto" />
  </a>
</nav>
```

#### 3. Deploy Script for Dispatch ROI

```bash
#!/bin/bash
# deploy-dispatch-static.sh

set -e

PROJECT_ID="helm-platform-prod"
BUCKET_NAME="helm-roi-calculators"

echo "Building Dispatch ROI Navigator..."
npm run build

echo "Exporting static site..."
npx next export

echo "Uploading to Cloud Storage..."
gsutil -m rsync -r -d out/ gs://${BUCKET_NAME}/dispatch/

echo "Setting cache control..."
gsutil -m setmeta -h "Cache-Control:public, max-age=3600" gs://${BUCKET_NAME}/dispatch/**

echo "✅ Deployed to: https://roi.helm.synaptic.build/dispatch"
```

---

## Post-Integration Architecture

### URL Structure

- `https://helm.synaptic.build` → Marketing site (future)
- `https://explorer.helm.synaptic.build` → HELM Explorer (AI chat platform)
- `https://roi.helm.synaptic.build/dispatch` → Dispatch ROI Navigator
- `https://roi.helm.synaptic.build/aarp` → AARP ROI (future)
- `https://roi.helm.synaptic.build/healthcare` → Healthcare ROI (future)

### Shared Infrastructure

```yaml
Firestore Collections:
  - sessions/          # HELM Explorer chat sessions
  - analytics/         # Cross-app usage tracking
  - customer-demos/    # ROI calculator interactions

Cloud Logging:
  - helm-explorer-prod
  - dispatch-roi-prod

Cloud Monitoring:
  - Uptime checks for both apps
  - Performance metrics
  - Error tracking
```

### Analytics Integration

Both apps can log to the same Firestore analytics collection:

```typescript
// Shared analytics utility
export async function trackEvent(event: {
  app: 'helm-explorer' | 'dispatch-roi';
  action: string;
  metadata?: Record<string, any>;
}) {
  await firestore.collection('analytics').add({
    ...event,
    timestamp: new Date(),
  });
}
```

---

## Migration Complexity Comparison

### Option 1: Separate Deployment
```
Files to Change: 2-3
Lines of Code: ~50
Risk Level: LOW
Time to Production: 2-3 hours
Rollback: Easy (revert DNS)
```

### Option 2: Embedded Route
```
Files to Change: 50+
Lines of Code: ~500+
Risk Level: MEDIUM
Time to Production: 6-8 hours
Rollback: Medium (code revert + redeploy)
```

---

## Recommendation Summary

✅ **Deploy as separate apps with shared GCP project**

**Rationale**:
1. 3x faster to production
2. Lower risk of breaking changes
3. Better performance (CDN for static ROI)
4. Clearer architectural boundaries
5. Easier to scale with more customers
6. Optimal cost structure

**Next Action**:
Execute Phase 1 (static build + Cloud Storage upload) to validate the approach with actual deployment.
