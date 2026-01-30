# Mindzie Studio - Technical Architecture & Implementation Specification

**Version:** 1.0
**Date:** December 2024
**Audience:** Architects, Senior Developers, DevOps Engineers
**Status:** Detailed Technical Design

---

## Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Technology Stack](#2-technology-stack)
3. [Frontend Architecture](#3-frontend-architecture)
4. [Backend Architecture](#4-backend-architecture)
5. [Database Architecture](#5-database-architecture)
6. [Data Integration & ETL](#6-data-integration--etl)
7. [API Design & Specifications](#7-api-design--specifications)
8. [Authentication & Authorization](#8-authentication--authorization)
9. [Deployment Architecture](#9-deployment-architecture)
10. [Performance & Scalability](#10-performance--scalability)
11. [Security Architecture](#11-security-architecture)
12. [Implementation Phases](#12-implementation-phases)

---

## 1. System Architecture Overview

### 1.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Web UI     │  │   Mobile App │  │ Third-party  │           │
│  │  (React)     │  │   (React     │  │     Apps     │           │
│  │              │  │   Native)    │  │   (via API)  │           │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘           │
└─────────┼──────────────────┼──────────────────┼──────────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │ HTTP/HTTPS
        ┌────────────────────▼────────────────────┐
        │  API Gateway / Load Balancer            │
        │  (Rate Limiting, SSL/TLS, Routing)    │
        └────────────────────┬────────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │      AUTHENTICATION LAYER               │
        │  ┌────────────────────────────────────┐ │
        │  │ JWT Token Management               │ │
        │  │ AD/Azure AD Integration            │ │
        │  │ OAuth2/OIDC Support                │ │
        │  └────────────────────────────────────┘ │
        └────────────────────┬────────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │      APPLICATION LAYER                  │
        │  ┌──────────────────────────────────┐  │
        │  │  Mindzie Studio Services         │  │
        │  │  - Process Discovery Engine      │  │
        │  │  - Analytics Engine              │  │
        │  │  - Dashboard Engine              │  │
        │  │  - Enrichment Engine             │  │
        │  └──────────────────────────────────┘  │
        │  ┌──────────────────────────────────┐  │
        │  │  Data Designer Services          │  │
        │  │  - ETL Pipeline                  │  │
        │  │  - Data Connectors               │  │
        │  │  - Transformation Engine         │  │
        │  └──────────────────────────────────┘  │
        │  ┌──────────────────────────────────┐  │
        │  │  Administrative Services         │  │
        │  │  - Tenant Management             │  │
        │  │  - User Management               │  │
        │  │  - Project Management            │  │
        │  └──────────────────────────────────┘  │
        └────────────────────┬────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
    ┌───▼────────┐   ┌──────▼───────┐   ┌──────▼──────┐
    │  Job Queue │   │  Cache Layer │   │  Search    │
    │  (Redis)   │   │  (Redis)     │   │  (Elastic) │
    │            │   │              │   │            │
    └────────────┘   └──────────────┘   └────────────┘
        │
    ┌───▼─────────────────────────────────────────────┐
    │         DATA PERSISTENCE LAYER                  │
    │  ┌────────────────────────────────────────────┐ │
    │  │  Primary Data Store (SQL Server/PostgreSQL)
    │  │  - Event logs, Cases, Events             │ │
    │  │  - Users, Projects, Dashboards           │ │
    │  │  - Enrichments, Configurations           │ │
    │  └────────────────────────────────────────────┘ │
    │  ┌────────────────────────────────────────────┐ │
    │  │  Time-Series Data Store (InfluxDB/Timescale)
    │  │  - Real-time metrics                      │ │
    │  │  - Performance data                       │ │
    │  │  - Audit logs                             │ │
    │  └────────────────────────────────────────────┘ │
    │  ┌────────────────────────────────────────────┐ │
    │  │  Document Store (MongoDB - optional)      │ │
    │  │  - Dashboards, Notebooks                  │ │
    │  │  - Analysis configurations                │ │
    │  └────────────────────────────────────────────┘ │
    └───┬─────────────────────────────────────────────┘
        │
    ┌───▼──────────────────────────────────────────────┐
    │        EXTERNAL DATA SOURCES                     │
    │  ┌────────────────────────────────────────────┐  │
    │  │  Database Connectors (15+ types)          │  │
    │  │  - SQL Server, MySQL, PostgreSQL          │  │
    │  │  - Oracle, SAP HANA, Snowflake            │  │
    │  │  - Redshift, Teradata, etc.               │  │
    │  └────────────────────────────────────────────┘  │
    │  ┌────────────────────────────────────────────┐  │
    │  │  Event Streaming (Kafka, Kinesis)         │  │
    │  │  File Uploads (S3, Azure Blob)            │  │
    │  │  APIs (REST, GraphQL)                     │  │
    │  └────────────────────────────────────────────┘  │
    └──────────────────────────────────────────────────┘
```

### 1.2 Core Components

| Component | Purpose | Technology |
|-----------|---------|-----------|
| **API Gateway** | Route, throttle, authenticate requests | Kong, AWS API Gateway, or custom |
| **Studio Services** | Process mining & analytics core | Node.js/Java microservices |
| **Data Designer** | ETL and data integration | Python/Scala Spark jobs |
| **Admin Services** | Tenant, user, project management | Node.js/Java services |
| **Job Queue** | Async task processing | Redis Queue, Celery, or AWS SQS |
| **Cache Layer** | In-memory caching for performance | Redis |
| **Search Engine** | Full-text search and log analysis | Elasticsearch |
| **Primary Database** | Transactional data | SQL Server or PostgreSQL |
| **Time-Series DB** | Metrics and performance data | InfluxDB or TimescaleDB |
| **Document Store** | Flexible schemas (dashboards, configs) | MongoDB (optional) |

---

## 2. Technology Stack

### 2.1 Frontend Stack

```yaml
Framework & UI:
  - React 18+ (SPA framework)
  - TypeScript (type safety)
  - Redux Toolkit (state management)
  - Material-UI v5 or shadcn/ui (component library)

Visualization:
  - Apache ECharts (process maps, charts)
  - Recharts (dashboard visualizations)
  - D3.js (custom complex visualizations)
  - Cytoscape.js (process flow networks)

Data Management:
  - React Query (server state)
  - Zustand or Redux (client state)
  - Immer (immutable state updates)

Build & Dev:
  - Vite (build tool - fast bundling)
  - ESLint + Prettier (code quality)
  - Vitest (unit testing)
  - Cypress or Playwright (E2E testing)

UI/UX:
  - Tailwind CSS (utility-first styling)
  - Framer Motion (animations)
  - Headless UI (accessible components)

Performance:
  - Code splitting (lazy loading routes)
  - Virtual scrolling (large lists)
  - Memoization (React.memo, useMemo)
  - WebWorkers (heavy computations)
```

### 2.2 Backend Stack

```yaml
Runtime & Framework:
  - Node.js 18+ LTS (JavaScript runtime)
  - Express.js or Fastify (HTTP framework)
  - NestJS (optional, for structure and DI)

Alternative Backend:
  - Java 17+ with Spring Boot (for enterprise)
  - Go (for high-performance services)
  - C# with .NET 7+ (Windows-first deployment)

API & Data:
  - GraphQL (Apollo Server) for flexible queries
  - REST API (OpenAPI/Swagger)
  - Protocol Buffers (efficient serialization)

Data Processing:
  - Apache Spark (distributed data processing)
  - Python with Pandas/NumPy (data manipulation)
  - Apache Arrow (columnar data format)

Message Queue:
  - Redis (caching, simple queuing)
  - RabbitMQ (reliable message queuing)
  - Apache Kafka (event streaming)
  - AWS SQS/SNS (cloud option)

Job Scheduling:
  - Node-schedule or Bull (Node.js)
  - Quartz or APScheduler (Java/Python)
  - Temporal (workflow orchestration)

Authentication:
  - Passport.js (Node.js auth strategies)
  - Auth0 or Okta integration
  - ADAL/MSAL (Azure AD)
  - JsonWebToken (JWT handling)

Testing & Quality:
  - Jest (unit testing)
  - Supertest (HTTP testing)
  - SonarQube (code quality)
  - Artillery (load testing)
```

### 2.3 Database Stack

```yaml
Primary Transactional:
  - PostgreSQL 15+ (preferred for flexibility)
    OR SQL Server 2019+ (Windows environment)
    OR MySQL 8.0+ (legacy support)

  Features needed:
    - JSONB/JSON columns (flexible attributes)
    - Window functions (advanced analytics)
    - Partitioning (large tables)
    - Full-text search
    - PostGIS extension (optional, for geo-location)

Time-Series Database:
  - TimescaleDB (PostgreSQL extension, recommended)
    OR InfluxDB 2.x (specialized time-series)

  Purpose:
    - Real-time metrics collection
    - Performance dashboard data
    - Audit trail storage
    - Alert history

Document Store (Optional):
  - MongoDB 5.0+ (dashboards, flexible configs)
    OR DynamoDB (cloud option)

  Purpose:
    - Dashboard definitions (complex nested structures)
    - Analysis notebooks (version control)
    - User preferences
    - Custom enrichment definitions

Cache:
  - Redis 7.0+ (primary cache and queue)

  Purpose:
    - Session storage
    - Query result caching
    - Rate limiting counters
    - Job queue (Bull)
    - Real-time notifications (Pub/Sub)

Search:
  - Elasticsearch 8.0+ (log analysis, full-text search)
    OR OpenSearch (AWS alternative)

  Purpose:
    - Event log search
    - Audit log search
    - Dashboard search
    - Auto-complete

File Storage:
  - S3 (AWS) / Blob Storage (Azure) / GCS (Google)
    OR MinIO (self-hosted S3-compatible)

  Purpose:
    - Dataset uploads
    - Report exports
    - Backup storage
    - Log archives
```

### 2.4 DevOps & Infrastructure

```yaml
Containerization:
  - Docker (container images)
  - Docker Compose (local development)

Orchestration:
  - Kubernetes 1.25+ (production deployment)
  - Helm (package manager for K8s)
  - Operators (custom resource definitions)

Cloud Platforms:
  - AWS (ECS/EKS, RDS, S3, Lambda)
  - Azure (AKS, SQL Database, Blob Storage)
  - Google Cloud (GKE, Cloud SQL, GCS)

CI/CD:
  - GitHub Actions / GitLab CI / Jenkins
  - Terraform (infrastructure as code)
  - GitOps workflows (ArgoCD)

Monitoring & Observability:
  - Prometheus (metrics collection)
  - Grafana (metrics visualization)
  - ELK Stack (logs: Elasticsearch, Logstash, Kibana)
  - Jaeger (distributed tracing)
  - DataDog / New Relic (commercial option)

SSL/TLS:
  - Let's Encrypt (auto-renewal)
  - Cert-manager (Kubernetes integration)
```

---

## 3. Frontend Architecture

### 3.1 Application Structure

```
mindzie-studio/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── index.tsx
│   ├── App.tsx
│   │
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   │
│   │   ├── studio/           # Studio feature components
│   │   │   ├── ProcessMap.tsx
│   │   │   ├── CaseExplorer.tsx
│   │   │   ├── VariantsView.tsx
│   │   │   ├── FilterBuilder.tsx
│   │   │   ├── Calculator.tsx
│   │   │   └── ...
│   │   │
│   │   ├── dashboard/        # Dashboard components
│   │   │   ├── DashboardGrid.tsx
│   │   │   ├── Panel.tsx
│   │   │   ├── PanelEditor.tsx
│   │   │   └── ...
│   │   │
│   │   ├── admin/            # Administration components
│   │   │   ├── TenantManagement.tsx
│   │   │   ├── UserManagement.tsx
│   │   │   ├── ProjectManagement.tsx
│   │   │   └── ...
│   │   │
│   │   └── dataimport/       # Data Designer components
│   │       ├── ConnectorSetup.tsx
│   │       ├── DataPreview.tsx
│   │       ├── ETLMapping.tsx
│   │       └── ...
│   │
│   ├── pages/                # Page components (routes)
│   │   ├── StudioPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── AdminPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   └── ...
│   │
│   ├── services/             # API client services
│   │   ├── api.ts            # Axios/Fetch wrapper
│   │   ├── studioService.ts
│   │   ├── dashboardService.ts
│   │   ├── adminService.ts
│   │   ├── authService.ts
│   │   └── ...
│   │
│   ├── store/                # Redux store
│   │   ├── index.ts
│   │   ├── slices/
│   │   │   ├── projectSlice.ts
│   │   │   ├── filterSlice.ts
│   │   │   ├── dashboardSlice.ts
│   │   │   ├── userSlice.ts
│   │   │   └── ...
│   │   └── hooks.ts
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useProject.ts
│   │   ├── useFilters.ts
│   │   ├── useProcessMap.ts
│   │   ├── useAuth.ts
│   │   └── ...
│   │
│   ├── types/                # TypeScript type definitions
│   │   ├── index.ts
│   │   ├── process.ts
│   │   ├── user.ts
│   │   ├── dashboard.ts
│   │   ├── api.ts
│   │   └── ...
│   │
│   ├── utils/                # Utility functions
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── dateUtils.ts
│   │   ├── chartUtils.ts
│   │   └── ...
│   │
│   ├── constants/            # App constants
│   │   ├── api.ts
│   │   ├── config.ts
│   │   └── ...
│   │
│   ├── styles/               # Global styles
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── ...
│   │
│   └── config/               # Configuration
│       ├── auth.config.ts
│       ├── api.config.ts
│       └── ...
│
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind configuration
└── package.json
```

### 3.2 Key Frontend Components

#### **Studio Workspace Component**

```typescript
// src/components/studio/StudioWorkspace.tsx
interface StudioWorkspaceProps {
  projectId: string;
  datasetId: string;
}

export const StudioWorkspace: React.FC<StudioWorkspaceProps> = ({
  projectId,
  datasetId,
}) => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [calculators, setCalculators] = useState<Calculator[]>([]);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Layout: Split view (filters + calculators on left, results on right)
  return (
    <div className="flex h-screen">
      <AnalysisPanel
        projectId={projectId}
        datasetId={datasetId}
        filters={filters}
        calculators={calculators}
        onFiltersChange={setFilters}
        onCalculatorsChange={setCalculators}
        onResults={setResults}
        loading={loading}
      />

      <ResultsPanel
        results={results}
        loading={loading}
        onExport={handleExport}
      />
    </div>
  );
};
```

#### **Process Map Component**

```typescript
// src/components/studio/ProcessMap.tsx
interface ProcessMapProps {
  data: ProcessMapData;
  selectedActivity?: string;
  onActivitySelect?: (activity: string) => void;
  onPathSelect?: (path: string[]) => void;
}

export const ProcessMap: React.FC<ProcessMapProps> = ({
  data,
  selectedActivity,
  onActivitySelect,
  onPathSelect,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [echarts, setEcharts] = useState<any>(null);

  useEffect(() => {
    // Initialize ECharts Sankey diagram for process flow
    const chart = echarts.init(chartRef.current);
    chart.setOption({
      series: [
        {
          type: 'sankey',
          data: data.nodes,
          links: data.links,
          // Flow visualization
        },
      ],
    });

    return () => chart.dispose();
  }, [data]);

  return <div ref={chartRef} className="w-full h-full" />;
};
```

#### **Dashboard Component**

```typescript
// src/components/dashboard/Dashboard.tsx
interface DashboardProps {
  dashboardId: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ dashboardId }) => {
  const [dashboard, setDashboard] = useState<DashboardDefinition | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Load dashboard definition
    dashboardService.getDashboard(dashboardId).then(setDashboard);
  }, [dashboardId]);

  if (!dashboard) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <DashboardHeader
        dashboard={dashboard}
        editMode={editMode}
        onEditModeChange={setEditMode}
      />

      <DashboardGrid
        layout={dashboard.layout}
        panels={dashboard.panels}
        editMode={editMode}
      />
    </div>
  );
};
```

### 3.3 State Management (Redux)

```typescript
// src/store/slices/filterSlice.ts
interface FilterState {
  active: Filter[];
  history: FilterHistory[];
  presets: FilterPreset[];
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState: { active: [], history: [], presets: [] },
  reducers: {
    addFilter: (state, action: PayloadAction<Filter>) => {
      state.active.push(action.payload);
      state.history.push({ ...action.payload, timestamp: Date.now() });
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      state.active = state.active.filter(f => f.id !== action.payload);
    },
    updateFilter: (state, action: PayloadAction<Filter>) => {
      const index = state.active.findIndex(f => f.id === action.payload.id);
      if (index !== -1) state.active[index] = action.payload;
    },
    saveFilterPreset: (state, action: PayloadAction<FilterPreset>) => {
      state.presets.push(action.payload);
    },
    applyFilterPreset: (state, action: PayloadAction<string>) => {
      const preset = state.presets.find(p => p.id === action.payload);
      if (preset) state.active = [...preset.filters];
    },
  },
});
```

---

## 4. Backend Architecture

### 4.1 Microservices Architecture

```
┌─────────────────────────────────────────────────────┐
│              API Gateway (Kong/AWS)                 │
│  - Authentication, Rate Limiting, Routing           │
└────────────────────┬────────────────────────────────┘
                     │
     ┌───────────────┼───────────────┐
     │               │               │
┌────▼────────┐ ┌───▼───────┐ ┌────▼────────┐
│   Studio    │ │   Admin   │ │   Designer  │
│   Service   │ │  Service  │ │   Service   │
│             │ │           │ │             │
│ • Process   │ │ • Tenant  │ │ • ETL       │
│   Discovery │ │ • Users   │ │ • Connectors│
│ • Analytics │ │ • Projects│ │ • Import    │
│ • Dashboard │ │ • Roles   │ │ • Transform │
│ • Notebooks │ │           │ │             │
└─────────────┘ └───────────┘ └─────────────┘
     │               │               │
     └───────────────┼───────────────┘
                     │
    ┌────────────────▼──────────────────┐
    │    Message Queue (Redis/Kafka)    │
    │  - Job Distribution                │
    │  - Event Streaming                 │
    │  - Inter-service Communication     │
    └────────────────┬──────────────────┘
                     │
     ┌───────────────┼───────────────┐
     │               │               │
┌────▼────────┐ ┌───▼───────┐ ┌────▼────────┐
│Job Workers  │ │  Cache    │ │   Search   │
│(Process)    │ │  Service  │ │  Service   │
│             │ │  (Redis)  │ │(Elasticsearch)
│ • Enrichment│ │           │ │             │
│ • Analytics │ │ • Session │ │ • Indexing │
│ • Export    │ │ • Results │ │ • Full-text│
└─────────────┘ └───────────┘ └─────────────┘
```

### 4.2 Service Specifications

#### **Studio Service**

```typescript
// src/services/studio/StudioService.ts
export class StudioService {
  // Process Discovery
  async discoverProcess(
    datasetId: string,
    options: DiscoveryOptions
  ): Promise<ProcessModel> {
    // Algorithm: Process mining on event log
    // Returns: Process map with activities and flows
  }

  // Analytics - Filters
  async applyFilters(
    datasetId: string,
    filters: Filter[],
    paginationOptions: Pagination
  ): Promise<FilterResult> {
    // Apply filters to dataset
    // Return filtered events and statistics
  }

  // Analytics - Calculators
  async executeCalculator(
    datasetId: string,
    calculator: Calculator,
    filters?: Filter[]
  ): Promise<CalculatorResult> {
    // Execute specific calculator on filtered data
    // Return metrics and visualizations
  }

  // Process Analysis
  async getProcessVariants(
    datasetId: string,
    filters?: Filter[]
  ): Promise<Variant[]> {
    // Identify process variants
    // Return frequency and performance metrics
  }

  async getVariantDNA(
    variantId1: string,
    variantId2: string
  ): Promise<VariantDNA> {
    // Compare variants at activity level
    // Identify differences
  }

  // Case Explorer
  async getCaseDetails(caseId: string): Promise<Case> {
    // Return full case timeline
    // All events and attributes
  }

  async searchCases(query: CaseSearchQuery): Promise<Case[]> {
    // Full-text search on cases
    // Filter by attributes
  }

  // Dashboards
  async createDashboard(
    projectId: string,
    definition: DashboardDefinition
  ): Promise<Dashboard> {
    // Create new dashboard
  }

  async getDashboard(dashboardId: string): Promise<Dashboard> {
    // Retrieve dashboard with live data
  }

  async refreshDashboard(dashboardId: string): Promise<Dashboard> {
    // Refresh all panels with latest data
  }

  // Notebooks
  async createNotebook(
    projectId: string,
    notebook: Notebook
  ): Promise<Notebook> {
    // Create analytical notebook
  }

  async executeNotebook(notebookId: string): Promise<NotebookResult[]> {
    // Execute all cells in notebook
  }
}
```

#### **Admin Service**

```typescript
// src/services/admin/AdminService.ts
export class AdminService {
  // Tenant Management
  async createTenant(tenantData: TenantCreationRequest): Promise<Tenant> {
    // Create new tenant
    // Initialize databases, storage
    // Return tenant credentials
  }

  async updateTenant(
    tenantId: string,
    updates: Partial<Tenant>
  ): Promise<Tenant> {
    // Update tenant settings
  }

  async deleteTenant(tenantId: string): Promise<void> {
    // Deactivate tenant
    // Archive data
  }

  // User Management
  async createUser(
    tenantId: string,
    userData: UserCreationRequest
  ): Promise<User> {
    // Create user in tenant
    // Send invitation email
  }

  async updateUser(
    userId: string,
    updates: Partial<User>
  ): Promise<User> {
    // Update user profile
  }

  async promoteToServiceAccount(userId: string): Promise<ServiceAccount> {
    // Convert user to service account
    // Generate API keys
  }

  async assignRole(userId: string, roleId: string): Promise<void> {
    // Assign role to user
    // Update permissions
  }

  // Role Management
  async createRole(
    tenantId: string,
    roleData: RoleCreationRequest
  ): Promise<Role> {
    // Create custom role
    // Define permissions
  }

  async updateRolePermissions(
    roleId: string,
    permissions: Permission[]
  ): Promise<Role> {
    // Update role permissions
  }

  // Project Management
  async createProject(
    tenantId: string,
    projectData: ProjectCreationRequest
  ): Promise<Project> {
    // Create new project
  }

  async getProject(projectId: string): Promise<Project> {
    // Retrieve project with metadata
  }

  async updateProject(
    projectId: string,
    updates: Partial<Project>
  ): Promise<Project> {
    // Update project settings
  }

  async shareProject(
    projectId: string,
    shareRequest: ShareRequest
  ): Promise<void> {
    // Share project with users/groups
  }

  // Authentication
  async configureAzureAD(
    tenantId: string,
    azureConfig: AzureADConfig
  ): Promise<void> {
    // Configure Azure AD integration
  }

  async validateAzureADConnection(
    config: AzureADConfig
  ): Promise<boolean> {
    // Test connection
  }

  // Audit & Compliance
  async getAuditLog(
    tenantId: string,
    filters: AuditLogFilter
  ): Promise<AuditLogEntry[]> {
    // Retrieve audit trail
  }

  async exportAuditLog(
    tenantId: string,
    format: 'csv' | 'json'
  ): Promise<Buffer> {
    // Export audit logs for compliance
  }
}
```

#### **Data Designer Service**

```typescript
// src/services/designer/DesignerService.ts
export class DesignerService {
  // Connectors
  async testConnection(connectorConfig: ConnectorConfig): Promise<boolean> {
    // Test database connection
  }

  async createConnector(
    projectId: string,
    config: ConnectorConfig
  ): Promise<Connector> {
    // Create data connector
  }

  // Data Import
  async previewData(
    connectorId: string,
    query: string,
    limit: number
  ): Promise<PreviewData> {
    // Show first N rows
  }

  async importData(
    connectorId: string,
    mappingConfig: DataMappingConfig
  ): Promise<ImportJob> {
    // Queue data import
    // Return job ID
  }

  async getImportJobStatus(jobId: string): Promise<ImportJobStatus> {
    // Check import progress
  }

  // ETL Mapping
  async createETLMapping(
    projectId: string,
    mapping: ETLMapping
  ): Promise<ETLMapping> {
    // Define source-to-target mapping
  }

  async validateMapping(mapping: ETLMapping): Promise<ValidationResult> {
    // Validate mapping configuration
  }

  async previewTransformation(
    mapping: ETLMapping,
    sampleRows: any[]
  ): Promise<any[]> {
    // Show transformation preview
  }

  // Enrichment Pipeline
  async createEnrichmentPipeline(
    datasetId: string,
    pipeline: EnrichmentPipeline
  ): Promise<EnrichmentPipeline> {
    // Create enrichment pipeline
  }

  async executeEnrichment(
    pipelineId: string,
    options?: ExecutionOptions
  ): Promise<Job> {
    // Queue enrichment job
  }

  // Data Quality
  async runDataQualityChecks(
    datasetId: string
  ): Promise<QualityReport> {
    // Check for completeness, duplicates, anomalies
  }

  async getDataQualityScore(datasetId: string): Promise<number> {
    // Return quality score (0-100)
  }
}
```

### 4.3 Data Processing Pipeline

```typescript
// src/workers/enrichment/EnrichmentWorker.ts
export class EnrichmentWorker {
  async processEnrichment(job: Job) {
    const { datasetId, enrichments } = job.data;

    // Load dataset in batches (streaming)
    const dataset = await this.loadDataset(datasetId);

    for await (const batch of dataset.batch(1000)) {
      let enrichedBatch = batch;

      // Apply enrichments in sequence
      for (const enrichment of enrichments) {
        enrichedBatch = await this.applyEnrichment(
          enrichedBatch,
          enrichment
        );
      }

      // Save enriched data
      await this.saveEnrichedBatch(datasetId, enrichedBatch);
    }
  }

  private async applyEnrichment(
    batch: any[],
    enrichment: Enrichment
  ): Promise<any[]> {
    switch (enrichment.type) {
      case 'text_manipulation':
        return batch.map(row => ({
          ...row,
          [enrichment.targetField]: this.transformText(
            row[enrichment.sourceField],
            enrichment.operation
          ),
        }));

      case 'temporal':
        return batch.map(row => ({
          ...row,
          [enrichment.targetField]: this.calculateTemporal(
            row,
            enrichment.config
          ),
        }));

      case 'mathematical':
        return batch.map(row => ({
          ...row,
          [enrichment.targetField]: this.calculateMath(
            row,
            enrichment.config
          ),
        }));

      case 'conformance':
        return this.evaluateConformance(batch, enrichment.rules);

      case 'ml_prediction':
        return await this.predictWithModel(batch, enrichment.modelId);

      default:
        return batch;
    }
  }

  private transformText(text: string, operation: string): string {
    switch (operation) {
      case 'upper': return text.toUpperCase();
      case 'lower': return text.toLowerCase();
      case 'trim': return text.trim();
      // ... more text operations
      default: return text;
    }
  }

  private calculateTemporal(row: any, config: any): any {
    // Date calculations, duration, time differences
    const date1 = new Date(row[config.field1]);
    const date2 = config.field2 ? new Date(row[config.field2]) : new Date();
    return (date2.getTime() - date1.getTime()) / (1000 * 60 * 60); // hours
  }

  private calculateMath(row: any, config: any): number {
    const val1 = parseFloat(row[config.field1]);
    const val2 = parseFloat(row[config.field2]);

    switch (config.operation) {
      case 'add': return val1 + val2;
      case 'subtract': return val1 - val2;
      case 'multiply': return val1 * val2;
      case 'divide': return val1 / val2;
      default: return 0;
    }
  }

  private evaluateConformance(batch: any[], rules: ConformanceRule[]): any[] {
    return batch.map(row => {
      const violations = rules
        .filter(rule => !this.evaluateRule(row, rule))
        .map(rule => rule.id);

      return {
        ...row,
        conformance_violations: violations,
        is_conformant: violations.length === 0,
      };
    });
  }

  private async predictWithModel(batch: any[], modelId: string): Promise<any[]> {
    // Load ML model and score records
    const model = await this.modelRegistry.getModel(modelId);
    const features = batch.map(row => this.extractFeatures(row));
    const predictions = await model.predict(features);

    return batch.map((row, idx) => ({
      ...row,
      prediction: predictions[idx],
    }));
  }
}
```

### 4.4 Process Mining Engine

```typescript
// src/engines/processDiscovery/ProcessMiningEngine.ts
export class ProcessMiningEngine {
  /**
   * Discover process from event log
   * Uses Alpha algorithm, Heuristic Miner, or Inductive Miner
   */
  async discoverProcess(
    eventLog: EventLog,
    algorithm: 'alpha' | 'heuristic' | 'inductive' = 'inductive'
  ): Promise<ProcessModel> {
    switch (algorithm) {
      case 'alpha':
        return this.alphaAlgorithm(eventLog);
      case 'heuristic':
        return this.heuristicMiner(eventLog);
      case 'inductive':
        return this.inductiveMiner(eventLog);
    }
  }

  private alphaAlgorithm(eventLog: EventLog): ProcessModel {
    // Classic alpha algorithm implementation
    const traces = this.extractTraces(eventLog);
    const activities = this.extractActivities(eventLog);

    // Build directly-follows and causality relationships
    const directlyFollows = this.buildDirectlyFollows(traces);
    const causality = this.extractCausality(directlyFollows);
    const parallelism = this.extractParallelism(directlyFollows);

    // Build petri net from relationships
    return this.buildPetriNet(activities, causality, parallelism);
  }

  private heuristicMiner(eventLog: EventLog): ProcessModel {
    // Heuristic miner with dependency threshold
    const traces = this.extractTraces(eventLog);
    const dependencyMatrix = this.buildDependencyMatrix(traces);

    // Filter dependencies below threshold
    const filteredDeps = this.filterDependencies(dependencyMatrix, 0.5);

    // Build causal net
    return this.buildCausalNet(filteredDeps);
  }

  private inductiveMiner(eventLog: EventLog): ProcessModel {
    // Recursive inductive mining
    // Divides log into sublogs and mines recursively

    if (eventLog.traces.length === 0) {
      return { activities: [], transitions: [] };
    }

    // Find activity cutting directly follows relationship
    const directlyFollows = this.buildDirectlyFollows(eventLog.traces);
    const cut = this.findActivityCut(directlyFollows);

    if (cut) {
      // Partition traces by cut activity
      const partitions = this.partitionByActivity(eventLog, cut.activity);

      // Recursively mine each partition
      const submodels = partitions.map(partition =>
        this.inductiveMiner(partition)
      );

      return this.sequenceSubmodels(cut.activity, submodels);
    }

    // Fallback to direct follows graph if no cut
    return this.buildDirectFollowsGraph(eventLog);
  }

  private extractTraces(eventLog: EventLog): string[][] {
    // Convert event log to traces
    const traces = new Map<string, string[]>();

    for (const event of eventLog.events) {
      if (!traces.has(event.caseId)) {
        traces.set(event.caseId, []);
      }
      traces.get(event.caseId)!.push(event.activity);
    }

    return Array.from(traces.values());
  }

  private buildDirectlyFollows(traces: string[][]): Map<string, Set<string>> {
    const df = new Map<string, Set<string>>();

    for (const trace of traces) {
      for (let i = 0; i < trace.length - 1; i++) {
        const current = trace[i];
        const next = trace[i + 1];

        if (!df.has(current)) {
          df.set(current, new Set());
        }
        df.get(current)!.add(next);
      }
    }

    return df;
  }

  private buildPetriNet(
    activities: string[],
    causality: Map<string, Set<string>>,
    parallelism: Map<string, Set<string>>
  ): ProcessModel {
    // Convert relationships to Petri net structure
    const places: Place[] = [{ id: 'start', name: 'Start' }];
    const transitions: Transition[] = activities.map(act => ({
      id: act,
      name: act,
      type: 'task',
    }));

    // Add arcs based on causality and parallelism
    const arcs: Arc[] = [];

    // Add start transitions
    const startActivities = this.findStartActivities(activities, causality);
    for (const activity of startActivities) {
      arcs.push({
        from: 'start',
        to: activity,
        type: 'transition',
      });
    }

    // Add causal relationships
    for (const [source, targets] of causality.entries()) {
      for (const target of targets) {
        arcs.push({
          from: source,
          to: target,
          type: 'transition',
        });
      }
    }

    places.push({ id: 'end', name: 'End' });

    return {
      activities,
      places,
      transitions,
      arcs,
      startActivities,
      endActivities: this.findEndActivities(activities, causality),
    };
  }
}
```

---

## 5. Database Architecture

### 5.1 Database Schema

#### **Core Event Log Schema**

```sql
-- Tenants (Multi-tenancy)
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(name)
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  archived_at TIMESTAMP
);

-- Datasets
CREATE TABLE datasets (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id),
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50),
  row_count BIGINT,
  size_bytes BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_refresh TIMESTAMP
);

-- Cases (Process Instances)
CREATE TABLE cases (
  id UUID PRIMARY KEY,
  dataset_id UUID NOT NULL REFERENCES datasets(id),
  case_id VARCHAR(255) NOT NULL,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  duration_minutes INT,
  case_status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- JSONB for flexible case attributes
  attributes JSONB,
  INDEX idx_dataset_id (dataset_id),
  INDEX idx_case_id (dataset_id, case_id),
  UNIQUE(dataset_id, case_id)
);

-- Events (Activities)
CREATE TABLE events (
  id UUID PRIMARY KEY,
  case_id UUID NOT NULL REFERENCES cases(id),
  event_index INT NOT NULL,
  activity_name VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  resource VARCHAR(255),
  lifecycle_state VARCHAR(50),
  -- JSONB for flexible event attributes
  attributes JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_case_id (case_id),
  INDEX idx_activity (activity_name),
  INDEX idx_timestamp (timestamp),
  INDEX idx_resource (resource)
);

-- Case Attributes (Denormalized for quick access)
CREATE TABLE case_attributes (
  id UUID PRIMARY KEY,
  case_id UUID NOT NULL REFERENCES cases(id),
  attribute_name VARCHAR(255) NOT NULL,
  attribute_value TEXT,
  value_type VARCHAR(50), -- 'string', 'number', 'date', 'boolean'
  INDEX idx_case_id (case_id),
  INDEX idx_attribute (attribute_name, attribute_value)
);

-- Event Attributes (Denormalized)
CREATE TABLE event_attributes (
  id UUID PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES events(id),
  attribute_name VARCHAR(255) NOT NULL,
  attribute_value TEXT,
  value_type VARCHAR(50),
  INDEX idx_event_id (event_id),
  INDEX idx_attribute (attribute_name)
);

-- Process Models (Discovered Processes)
CREATE TABLE process_models (
  id UUID PRIMARY KEY,
  dataset_id UUID NOT NULL REFERENCES datasets(id),
  model_type VARCHAR(50), -- 'petri_net', 'bpmn', 'dfg'
  model_definition JSONB, -- Serialized process model
  fitness_score FLOAT, -- 0-1 score
  precision_score FLOAT,
  generalization_score FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Process Variants
CREATE TABLE process_variants (
  id UUID PRIMARY KEY,
  dataset_id UUID NOT NULL REFERENCES datasets(id),
  variant_sequence TEXT, -- Comma-separated activity sequence
  case_count INT,
  frequency FLOAT, -- Percentage of cases
  avg_duration_minutes FLOAT,
  min_duration_minutes FLOAT,
  max_duration_minutes FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_dataset_id (dataset_id),
  INDEX idx_frequency (frequency DESC)
);

-- Conformance Violations
CREATE TABLE conformance_violations (
  id UUID PRIMARY KEY,
  case_id UUID NOT NULL REFERENCES cases(id),
  rule_id UUID NOT NULL REFERENCES conformance_rules(id),
  violation_type VARCHAR(100),
  severity VARCHAR(50), -- 'error', 'warning', 'info'
  details JSONB,
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_case_id (case_id),
  INDEX idx_rule_id (rule_id)
);

-- Enrichment Definitions
CREATE TABLE enrichments (
  id UUID PRIMARY KEY,
  dataset_id UUID NOT NULL REFERENCES datasets(id),
  name VARCHAR(255) NOT NULL,
  enrichment_type VARCHAR(100),
  source_field VARCHAR(255),
  target_field VARCHAR(255),
  configuration JSONB, -- Type-specific config
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_dataset_id (dataset_id)
);

-- Dashboards
CREATE TABLE dashboards (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  layout JSONB, -- Grid layout definition
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_public BOOLEAN DEFAULT FALSE
);

-- Dashboard Panels
CREATE TABLE dashboard_panels (
  id UUID PRIMARY KEY,
  dashboard_id UUID NOT NULL REFERENCES dashboards(id),
  panel_type VARCHAR(100), -- 'chart', 'metric', 'table', 'map'
  title VARCHAR(255),
  configuration JSONB, -- Panel-specific config
  position_x INT,
  position_y INT,
  width INT,
  height INT,
  refresh_interval_seconds INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notebooks (Analytical investigations)
CREATE TABLE notebooks (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cells JSONB, -- Array of cells with code/markdown
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_executed_at TIMESTAMP
);

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,
  UNIQUE(tenant_id, email),
  INDEX idx_email (email)
);

-- User Roles (RBAC)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB, -- Array of permission strings
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tenant_id, name)
);

-- User Role Assignments
CREATE TABLE user_role_assignments (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  role_id UUID NOT NULL REFERENCES user_roles(id),
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, role_id)
);

-- Service Accounts (API Users)
CREATE TABLE service_accounts (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50),
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tenant_id, name)
);

-- API Keys
CREATE TABLE api_keys (
  id UUID PRIMARY KEY,
  service_account_id UUID NOT NULL REFERENCES service_accounts(id),
  key_hash VARCHAR(255) NOT NULL,
  last_used_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(key_hash)
);

-- Audit Log
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100),
  resource_type VARCHAR(100),
  resource_id VARCHAR(255),
  changes JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_tenant_id (tenant_id),
  INDEX idx_timestamp (timestamp),
  INDEX idx_resource (resource_type, resource_id)
);

-- Data Connectors
CREATE TABLE data_connectors (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id),
  connector_type VARCHAR(100), -- 'sql_server', 'mysql', 'postgresql', etc.
  name VARCHAR(255) NOT NULL,
  connection_config JSONB, -- Encrypted connection details
  status VARCHAR(50),
  last_test_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Import Jobs
CREATE TABLE import_jobs (
  id UUID PRIMARY KEY,
  dataset_id UUID NOT NULL REFERENCES datasets(id),
  connector_id UUID NOT NULL REFERENCES data_connectors(id),
  status VARCHAR(50),
  rows_processed BIGINT,
  rows_failed BIGINT,
  errors JSONB,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_cases_dataset_time ON cases(dataset_id, start_time);
CREATE INDEX idx_events_activity_time ON events(activity_name, timestamp);
CREATE INDEX idx_events_resource ON events(resource);
CREATE INDEX idx_variants_dataset_freq ON process_variants(dataset_id, frequency DESC);
```

### 5.2 Time-Series Schema (TimescaleDB)

```sql
-- Real-time metrics (TimescaleDB hypertable)
CREATE TABLE metrics (
  time TIMESTAMP NOT NULL,
  tenant_id UUID NOT NULL,
  metric_name VARCHAR(255) NOT NULL,
  metric_value FLOAT,
  tags JSONB,
  labels JSONB
);

-- Convert to hypertable for optimization
SELECT create_hypertable('metrics', 'time', if_not_exists => TRUE);

-- Continuous aggregates for dashboard queries
CREATE MATERIALIZED VIEW metrics_1h AS
SELECT
  time_bucket('1 hour', time) as bucket,
  tenant_id,
  metric_name,
  AVG(metric_value) as avg_value,
  MAX(metric_value) as max_value,
  MIN(metric_value) as min_value
FROM metrics
GROUP BY bucket, tenant_id, metric_name;

CREATE MATERIALIZED VIEW metrics_1d AS
SELECT
  time_bucket('1 day', time) as bucket,
  tenant_id,
  metric_name,
  AVG(metric_value) as avg_value,
  MAX(metric_value) as max_value,
  MIN(metric_value) as min_value
FROM metrics
GROUP BY bucket, tenant_id, metric_name;
```

### 5.3 Search Schema (Elasticsearch)

```json
{
  "mappings": {
    "properties": {
      "case_id": { "type": "keyword" },
      "event_id": { "type": "keyword" },
      "activity_name": { "type": "text", "analyzer": "standard" },
      "timestamp": { "type": "date" },
      "resource": { "type": "keyword" },
      "attributes": {
        "type": "nested",
        "properties": {
          "key": { "type": "keyword" },
          "value": { "type": "text" }
        }
      },
      "case_attributes": {
        "type": "nested",
        "properties": {
          "key": { "type": "keyword" },
          "value": { "type": "text" }
        }
      },
      "full_text_search": {
        "type": "text",
        "analyzer": "standard"
      },
      "dataset_id": { "type": "keyword" }
    }
  }
}
```

---

## 6. Data Integration & ETL

### 6.1 Data Connector Architecture

```typescript
// src/connectors/base/BaseConnector.ts
export abstract class BaseConnector {
  protected config: ConnectorConfig;
  protected logger: Logger;

  abstract testConnection(): Promise<boolean>;
  abstract query(sql: string, params?: any[]): Promise<any[]>;
  abstract getTableSchema(tableName: string): Promise<ColumnMetadata[]>;
  abstract disconnect(): Promise<void>;

  async previewData(
    query: string,
    limit: number = 100
  ): Promise<PreviewData> {
    const sql = `${query} LIMIT ${limit}`;
    const rows = await this.query(sql);
    const columns = Object.keys(rows[0] || {});

    return {
      rows,
      columns,
      totalRows: rows.length,
    };
  }

  async validateMapping(mapping: DataMappingConfig): Promise<ValidationResult> {
    // Validate source and target columns exist
    const sourceSchema = await this.getTableSchema(mapping.sourceTable);
    const sourceColumns = sourceSchema.map(col => col.name);

    const invalidColumns = mapping.columnMappings
      .filter(cm => !sourceColumns.includes(cm.sourceColumn))
      .map(cm => cm.sourceColumn);

    return {
      isValid: invalidColumns.length === 0,
      errors: invalidColumns.map(col => `Column not found: ${col}`),
    };
  }
}

// Specific connector implementations
export class SqlServerConnector extends BaseConnector {
  private pool: mssql.ConnectionPool;

  async connect(): Promise<void> {
    this.pool = new mssql.ConnectionPool(this.config.connectionString);
    await this.pool.connect();
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.pool.request().query('SELECT 1');
      return true;
    } catch (error) {
      this.logger.error('Connection test failed', error);
      return false;
    }
  }

  async query(sql: string, params?: any[]): Promise<any[]> {
    const request = this.pool.request();

    // Add parameters
    if (params) {
      params.forEach((param, index) => {
        request.input(`param${index}`, param);
      });
    }

    const result = await request.query(sql);
    return result.recordset;
  }

  async getTableSchema(tableName: string): Promise<ColumnMetadata[]> {
    const sql = `
      SELECT COLUMN_NAME, DATA_TYPE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = '${tableName}'
    `;

    const rows = await this.query(sql);
    return rows.map(row => ({
      name: row.COLUMN_NAME,
      type: row.DATA_TYPE,
    }));
  }

  async disconnect(): Promise<void> {
    await this.pool.close();
  }
}

export class PostgresConnector extends BaseConnector {
  private client: Pool;

  async connect(): Promise<void> {
    this.client = new Pool(this.config.connectionString);
  }

  async testConnection(): Promise<boolean> {
    const client = await this.client.connect();
    try {
      await client.query('SELECT 1');
      return true;
    } finally {
      client.release();
    }
  }

  async query(sql: string, params?: any[]): Promise<any[]> {
    const result = await this.client.query(sql, params);
    return result.rows;
  }

  async getTableSchema(tableName: string): Promise<ColumnMetadata[]> {
    const sql = `
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = $1
    `;

    const rows = await this.query(sql, [tableName]);
    return rows.map(row => ({
      name: row.column_name,
      type: row.data_type,
    }));
  }

  async disconnect(): Promise<void> {
    await this.client.end();
  }
}

// Factory for connector creation
export class ConnectorFactory {
  static createConnector(config: ConnectorConfig): BaseConnector {
    switch (config.type) {
      case 'sql_server':
        return new SqlServerConnector(config);
      case 'postgresql':
        return new PostgresConnector(config);
      case 'mysql':
        return new MySqlConnector(config);
      // ... more connectors
      default:
        throw new Error(`Unknown connector type: ${config.type}`);
    }
  }
}
```

### 6.2 ETL Mapping & Transformation

```typescript
// src/services/etl/ETLEngine.ts
export class ETLEngine {
  async executeMappingJob(
    mapping: ETLMapping,
    source: DataSource,
    target: DataTarget
  ): Promise<ETLResult> {
    const startTime = Date.now();
    let rowsProcessed = 0;
    let rowsErrors = 0;

    try {
      // Extract
      const sourceData = await this.extract(source, mapping.sourceQuery);

      // Transform
      const transformedData = [];
      for (const row of sourceData) {
        try {
          const transformed = this.transform(row, mapping.transformations);
          transformedData.push(transformed);
          rowsProcessed++;
        } catch (error) {
          rowsErrors++;
          this.logger.error(`Transformation error for row: ${JSON.stringify(row)}`, error);
        }
      }

      // Load
      await this.load(transformedData, target, mapping.targetTable);

      return {
        success: true,
        rowsProcessed,
        rowsErrors,
        duration: Date.now() - startTime,
      };
    } catch (error) {
      this.logger.error('ETL job failed', error);
      throw error;
    }
  }

  private async extract(
    source: DataSource,
    query: string
  ): Promise<any[]> {
    const connector = ConnectorFactory.createConnector({
      type: source.connectorType,
      connectionString: source.connectionString,
    });

    await connector.connect();
    const data = await connector.query(query);
    await connector.disconnect();

    return data;
  }

  private transform(row: any, transformations: Transformation[]): any {
    let transformed = { ...row };

    for (const transformation of transformations) {
      switch (transformation.type) {
        case 'map_field':
          transformed[transformation.targetField] =
            transformed[transformation.sourceField];
          delete transformed[transformation.sourceField];
          break;

        case 'convert_type':
          transformed[transformation.field] = this.convertType(
            transformed[transformation.field],
            transformation.targetType
          );
          break;

        case 'format_date':
          transformed[transformation.field] = moment(
            transformed[transformation.field]
          ).format(transformation.format);
          break;

        case 'computed_field':
          transformed[transformation.targetField] = this.evaluateExpression(
            transformation.expression,
            transformed
          );
          break;

        case 'lookup':
          transformed[transformation.targetField] = this.lookupValue(
            transformed[transformation.sourceField],
            transformation.lookupTable
          );
          break;

        case 'filter':
          if (!this.evaluateCondition(transformation.condition, transformed)) {
            throw new Error('Row filtered out');
          }
          break;
      }
    }

    return transformed;
  }

  private async load(
    data: any[],
    target: DataTarget,
    tableName: string
  ): Promise<void> {
    const connector = ConnectorFactory.createConnector({
      type: target.connectorType,
      connectionString: target.connectionString,
    });

    await connector.connect();

    // Batch insert for performance
    const batchSize = 1000;
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      await this.insertBatch(connector, tableName, batch);
    }

    await connector.disconnect();
  }

  private convertType(value: any, targetType: string): any {
    switch (targetType) {
      case 'string':
        return String(value);
      case 'number':
        return Number(value);
      case 'date':
        return new Date(value);
      case 'boolean':
        return Boolean(value);
      default:
        return value;
    }
  }
}
```

---

## 7. API Design & Specifications

### 7.1 RESTful API Structure

```
/api/v1/
├── /projects
│   ├── GET    /          # List projects
│   ├── POST   /          # Create project
│   ├── GET    /{id}      # Get project
│   ├── PUT    /{id}      # Update project
│   ├── DELETE /{id}      # Delete project
│   └── /datasets
│       ├── GET    /                    # List datasets
│       ├── POST   /                    # Create/import dataset
│       ├── GET    /{datasetId}         # Get dataset
│       ├── PUT    /{datasetId}         # Update dataset
│       └── DELETE /{datasetId}         # Delete dataset
│
├── /analysis
│   ├── /filters
│   │   ├── POST   /apply         # Apply filters
│   │   ├── GET    /presets       # List filter presets
│   │   ├── POST   /presets       # Save filter preset
│   │   └── DELETE /presets/{id}  # Delete preset
│   │
│   ├── /calculators
│   │   ├── POST   /execute        # Execute calculator
│   │   ├── GET    /templates      # List calculator templates
│   │   └── GET    /templates/{id} # Get template
│   │
│   ├── /discovery
│   │   ├── POST   /process        # Discover process
│   │   ├── GET    /variants       # Get variants
│   │   ├── GET    /variants/{id}  # Get variant details
│   │   └── POST   /dna            # Compare variant DNA
│   │
│   └── /cases
│       ├── GET    /               # Search cases
│       ├── GET    /{caseId}       # Get case details
│       ├── GET    /{caseId}/events # Get case events
│       └── GET    /{caseId}/conformance # Get conformance
│
├── /dashboards
│   ├── GET    /                # List dashboards
│   ├── POST   /                # Create dashboard
│   ├── GET    /{dashboardId}   # Get dashboard
│   ├── PUT    /{dashboardId}   # Update dashboard
│   ├── DELETE /{dashboardId}   # Delete dashboard
│   ├── POST   /{dashboardId}/share # Share dashboard
│   └── /panels
│       ├── POST   /            # Add panel
│       ├── PUT    /{panelId}   # Update panel
│       └── DELETE /{panelId}   # Delete panel
│
├── /notebooks
│   ├── GET    /                # List notebooks
│   ├── POST   /                # Create notebook
│   ├── GET    /{notebookId}    # Get notebook
│   ├── PUT    /{notebookId}    # Update notebook
│   ├── DELETE /{notebookId}    # Delete notebook
│   └── POST   /{notebookId}/execute # Execute notebook
│
├── /admin
│   ├── /tenants
│   │   ├── GET    /           # List tenants
│   │   ├── POST   /           # Create tenant
│   │   ├── GET    /{id}       # Get tenant
│   │   ├── PUT    /{id}       # Update tenant
│   │   └── DELETE /{id}       # Delete tenant
│   │
│   ├── /users
│   │   ├── GET    /           # List users
│   │   ├── POST   /           # Create user
│   │   ├── GET    /{id}       # Get user
│   │   ├── PUT    /{id}       # Update user
│   │   ├── DELETE /{id}       # Delete user
│   │   └── POST   /{id}/promote # Promote to service account
│   │
│   ├── /roles
│   │   ├── GET    /           # List roles
│   │   ├── POST   /           # Create role
│   │   ├── GET    /{id}       # Get role
│   │   ├── PUT    /{id}       # Update role
│   │   └── DELETE /{id}       # Delete role
│   │
│   ├── /service-accounts
│   │   ├── GET    /           # List service accounts
│   │   ├── POST   /           # Create service account
│   │   ├── GET    /{id}       # Get service account
│   │   ├── DELETE /{id}       # Delete service account
│   │   └── /keys
│   │       ├── GET    /       # List API keys
│   │       ├── POST   /       # Create API key
│   │       └── DELETE /{id}   # Revoke API key
│   │
│   ├── /audit-logs
│   │   ├── GET    /           # Get audit logs
│   │   └── POST   /export     # Export audit logs
│   │
│   └── /settings
│       ├── GET    /           # Get settings
│       └── PUT    /           # Update settings
│
├── /data-designer
│   ├── /connectors
│   │   ├── GET    /           # List connectors
│   │   ├── POST   /           # Create connector
│   │   ├── GET    /{id}       # Get connector
│   │   ├── PUT    /{id}       # Update connector
│   │   ├── DELETE /{id}       # Delete connector
│   │   ├── POST   /{id}/test  # Test connection
│   │   └── GET    /{id}/tables # Get table list
│   │
│   ├── /import-jobs
│   │   ├── GET    /           # List import jobs
│   │   ├── POST   /           # Create import job
│   │   ├── GET    /{jobId}    # Get job status
│   │   └── GET    /{jobId}/preview # Preview data
│   │
│   └── /enrichments
│       ├── GET    /           # List enrichments
│       ├── POST   /           # Create enrichment
│       ├── PUT    /{id}       # Update enrichment
│       ├── DELETE /{id}       # Delete enrichment
│       ├── POST   /{id}/execute # Execute enrichment
│       └── GET    /{id}/preview # Preview enrichment
│
├── /auth
│   ├── POST   /login         # User login
│   ├── POST   /logout        # User logout
│   ├── POST   /refresh       # Refresh token
│   └── GET    /me            # Get current user
│
└── /health
    ├── GET    /              # Health check
    └── GET    /ready         # Readiness check
```

### 7.2 Sample API Endpoints

```typescript
// Process Discovery API
POST /api/v1/analysis/discovery/process
{
  "datasetId": "uuid",
  "algorithm": "inductive",
  "options": {
    "maxDepth": 10,
    "filterThreshold": 0.1
  }
}

Response 200:
{
  "processId": "uuid",
  "activities": [
    { "id": "A1", "name": "Create Invoice", "frequency": 1000 },
    { "id": "A2", "name": "Send Invoice", "frequency": 998 },
    { "id": "A3", "name": "Receive Payment", "frequency": 950 }
  ],
  "transitions": [
    { "from": "A1", "to": "A2", "count": 998, "frequency": 0.998 },
    { "from": "A2", "to": "A3", "count": 950, "frequency": 0.95 }
  ],
  "fitness": 0.92,
  "precision": 0.88,
  "generalization": 0.85
}

// Apply Filters API
POST /api/v1/analysis/filters/apply
{
  "datasetId": "uuid",
  "filters": [
    {
      "type": "activity_frequency",
      "activityName": "Create Invoice",
      "minOccurrences": 1,
      "maxOccurrences": 100
    },
    {
      "type": "time_period",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    },
    {
      "type": "case_attribute",
      "attributeName": "customerType",
      "operator": "equals",
      "value": "Premium"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 100
  }
}

Response 200:
{
  "casesFiltered": 450,
  "casesTotal": 1000,
  "eventsFiltered": 2250,
  "eventsTotal": 5000,
  "cases": [
    {
      "caseId": "case-001",
      "startTime": "2024-01-15T10:30:00Z",
      "endTime": "2024-01-15T14:45:00Z",
      "attributes": {
        "customerType": "Premium",
        "orderAmount": 15000
      }
    }
  ]
}

// Calculator Execution API
POST /api/v1/analysis/calculators/execute
{
  "datasetId": "uuid",
  "calculatorType": "case_duration",
  "options": {
    "aggregation": "distribution",
    "bins": 10
  },
  "filters": [...]
}

Response 200:
{
  "type": "histogram",
  "title": "Case Duration Distribution",
  "data": {
    "labels": ["0-1h", "1-2h", "2-3h", ...],
    "values": [120, 250, 180, ...]
  },
  "statistics": {
    "mean": 2.5,
    "median": 2.2,
    "min": 0.5,
    "max": 8.3,
    "stdDev": 1.2
  }
}

// Create Dashboard API
POST /api/v1/dashboards
{
  "projectId": "uuid",
  "name": "Process KPI Dashboard",
  "description": "Real-time KPIs for invoice process",
  "panels": [
    {
      "id": "p1",
      "type": "metric",
      "title": "Cases Today",
      "calculator": {
        "type": "case_count",
        "filters": [{ "type": "time_period", "value": "today" }]
      },
      "position": { "x": 0, "y": 0, "width": 3, "height": 2 }
    },
    {
      "id": "p2",
      "type": "chart",
      "title": "Process Flow",
      "calculator": {
        "type": "process_map"
      },
      "position": { "x": 3, "y": 0, "width": 6, "height": 4 }
    }
  ]
}

Response 201:
{
  "id": "dashboard-001",
  "projectId": "uuid",
  "name": "Process KPI Dashboard",
  "createdAt": "2024-12-02T12:00:00Z",
  "panels": [...]
}
```

---

## 8. Authentication & Authorization

### 8.1 Authentication Flow

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │ 1. Login Request
       │    (email/password or SSO)
       ▼
┌─────────────────────────┐
│   Auth Service          │
│ - Validate credentials  │
│ - Check 2FA (optional)  │
│ - Create JWT token      │
└──────┬──────────────────┘
       │ 2. JWT Token
       │    (AccessToken, RefreshToken)
       ▼
┌─────────────┐
│    Client   │
│ (Browser)   │
└──────┬──────┘
       │ 3. Store tokens
       │    (LocalStorage/Cookie)
       │
       │ 4. API Request with Authorization header
       │    Authorization: Bearer <accessToken>
       ▼
┌──────────────────────────┐
│   API Gateway            │
│ - Validate JWT signature │
│ - Check token expiration │
│ - Extract claims         │
└──────┬───────────────────┘
       │ 5. Authorization check
       │    (Extract tenant_id, user_id from token)
       ▼
┌──────────────────────────┐
│   Business Logic         │
│ - Apply row-level security
│ - Multi-tenant isolation │
└──────────────────────────┘
```

### 8.2 JWT Token Structure

```typescript
// Access Token (15 minutes)
{
  "sub": "user-id-uuid",           // Subject (user ID)
  "tenant_id": "tenant-id-uuid",   // Multi-tenancy
  "email": "user@example.com",
  "roles": ["analyst", "admin"],
  "permissions": ["read:projects", "write:dashboards"],
  "iat": 1701519600,                // Issued at
  "exp": 1701520500,                // Expiration (15 min)
  "iss": "https://auth.mindzie.com",
  "aud": "mindzie-studio"
}

// Refresh Token (7 days)
{
  "sub": "user-id-uuid",
  "tenant_id": "tenant-id-uuid",
  "type": "refresh",
  "iat": 1701519600,
  "exp": 1702124400,
  "jti": "token-id-uuid"          // Token ID for revocation
}
```

### 8.3 RBAC Implementation

```typescript
// src/middleware/authorization.ts
export const checkPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);
    const decoded = verifyToken(token);

    if (!decoded.permissions.includes(requiredPermission)) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        requiredPermission,
      });
    }

    // Multi-tenant check
    if (req.params.projectId) {
      const project = await projectService.getProject(req.params.projectId);
      if (project.tenant_id !== decoded.tenant_id) {
        return res.status(403).json({
          error: 'Access denied - different tenant',
        });
      }
    }

    next();
  };
};

// Usage in routes
app.post(
  '/api/v1/dashboards',
  checkPermission('write:dashboards'),
  createDashboard
);

app.get(
  '/api/v1/projects/:projectId',
  checkPermission('read:projects'),
  getProject
);
```

### 8.4 Azure AD Integration

```typescript
// src/services/auth/AzureADService.ts
import { ConfidentialClientApplication } from '@azure/msal-node';

export class AzureADService {
  private msalClient: ConfidentialClientApplication;

  constructor(config: AzureADConfig) {
    this.msalClient = new ConfidentialClientApplication({
      auth: {
        clientId: config.clientId,
        authority: `https://login.microsoftonline.com/${config.tenantId}`,
        clientSecret: config.clientSecret,
      },
    });
  }

  async authenticateUser(
    tokenRequest: TokenRequest
  ): Promise<AuthenticationResult> {
    // Using Authorization Code Flow (OAuth2)
    try {
      const tokenResponse = await this.msalClient.acquireTokenByCode(
        tokenRequest
      );

      // Extract user info from token
      const user = await this.extractUserInfo(tokenResponse.accessToken);

      return {
        accessToken: tokenResponse.accessToken,
        refreshToken: tokenResponse.refreshToken,
        user,
      };
    } catch (error) {
      throw new Error(`Azure AD authentication failed: ${error.message}`);
    }
  }

  private async extractUserInfo(accessToken: string): Promise<UserInfo> {
    // Call Microsoft Graph API to get user info
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await response.json();

    return {
      id: userData.id,
      email: userData.userPrincipalName,
      name: userData.displayName,
      givenName: userData.givenName,
      surname: userData.surname,
    };
  }
}
```

---

## 9. Deployment Architecture

### 9.1 Kubernetes Deployment

```yaml
# kubernetes/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: mindzie
  labels:
    environment: production

---
# kubernetes/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mindzie-config
  namespace: mindzie
data:
  API_PORT: "3000"
  LOG_LEVEL: "info"
  NODE_ENV: "production"
  DATABASE_HOST: "postgres.mindzie.svc.cluster.local"
  DATABASE_PORT: "5432"
  REDIS_HOST: "redis.mindzie.svc.cluster.local"
  REDIS_PORT: "6379"
  ELASTICSEARCH_HOST: "elasticsearch.mindzie.svc.cluster.local"
  ELASTICSEARCH_PORT: "9200"

---
# kubernetes/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: mindzie-secrets
  namespace: mindzie
type: Opaque
stringData:
  DATABASE_PASSWORD: ${DB_PASSWORD}
  JWT_SECRET: ${JWT_SECRET}
  AZURE_AD_SECRET: ${AZURE_AD_SECRET}
  API_KEY_ENCRYPTION_KEY: ${API_KEY_ENCRYPTION_KEY}

---
# kubernetes/postgres-deployment.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: mindzie
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_DB
          value: mindzie
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mindzie-secrets
              key: DATABASE_PASSWORD
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        livenessProbe:
          exec:
            command:
            - /bin/sh
            - -c
            - pg_isready -U postgres
          initialDelaySeconds: 30
          periodSeconds: 10
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 100Gi

---
# kubernetes/redis-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: mindzie
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"

---
# kubernetes/studio-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: studio-service
  namespace: mindzie
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: studio-service
  template:
    metadata:
      labels:
        app: studio-service
    spec:
      containers:
      - name: studio-service
        image: mindzie/studio-service:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: mindzie-config
        - secretRef:
            name: mindzie-secrets
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5

---
# kubernetes/studio-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: studio-service
  namespace: mindzie
spec:
  selector:
    app: studio-service
  ports:
  - protocol: TCP
    port: 3000
    targetPort: 3000
  type: ClusterIP

---
# kubernetes/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: mindzie-ingress
  namespace: mindzie
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.mindzie.com
    secretName: mindzie-tls
  rules:
  - host: api.mindzie.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-gateway
            port:
              number: 80

---
# kubernetes/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: studio-service-hpa
  namespace: mindzie
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: studio-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### 9.2 Docker Compose (Local Development)

```yaml
# docker-compose.yml
version: '3.9'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: mindzie
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_INITDB_ARGS: "-c timescaledb.extension=true"
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  timescaledb:
    image: timescale/timescaledb:latest-pg15
    environment:
      POSTGRES_DB: mindzie_timeseries
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5433:5432"
    volumes:
      - timescaledb_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  api-gateway:
    build: ./services/api-gateway
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgres://postgres:${DB_PASSWORD}@postgres:5432/mindzie
      REDIS_URL: redis://redis:6379
      ELASTICSEARCH_URL: http://elasticsearch:9200
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./services/api-gateway/src:/app/src

  studio-service:
    build: ./services/studio
    ports:
      - "3001:3000"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgres://postgres:${DB_PASSWORD}@postgres:5432/mindzie
      REDIS_URL: redis://redis:6379
      ELASTICSEARCH_URL: http://elasticsearch:9200
    depends_on:
      - postgres
      - redis
      - elasticsearch
    volumes:
      - ./services/studio/src:/app/src

  admin-service:
    build: ./services/admin
    ports:
      - "3002:3000"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgres://postgres:${DB_PASSWORD}@postgres:5432/mindzie
    depends_on:
      - postgres
    volumes:
      - ./services/admin/src:/app/src

  frontend:
    build: ./frontend
    ports:
      - "3001:3000"
    environment:
      REACT_APP_API_URL: http://localhost:3000/api/v1
    volumes:
      - ./frontend/src:/app/src
    depends_on:
      - api-gateway

volumes:
  postgres_data:
  timescaledb_data:
  redis_data:
  elasticsearch_data:
```

---

## 10. Performance & Scalability

### 10.1 Query Optimization

```sql
-- Index Strategy
-- 1. Primary indexes on frequently queried columns
CREATE INDEX idx_cases_dataset_time ON cases(dataset_id, start_time);
CREATE INDEX idx_events_activity_time ON events(activity_name, timestamp);
CREATE INDEX idx_variants_dataset_freq ON process_variants(dataset_id, frequency DESC);

-- 2. Partial indexes for status columns
CREATE INDEX idx_cases_active ON cases(dataset_id) WHERE archived_at IS NULL;

-- 3. Composite indexes for common queries
CREATE INDEX idx_events_case_activity_time ON events(case_id, activity_name, timestamp);

-- 4. Expression indexes for case-insensitive search
CREATE INDEX idx_activity_lower ON events(LOWER(activity_name));

-- 5. JSONB indexes for flexible attribute queries
CREATE INDEX idx_case_attributes ON cases USING GIN(attributes);
CREATE INDEX idx_event_attributes ON events USING GIN(attributes);
```

### 10.2 Caching Strategy

```typescript
// src/middleware/caching.ts
export const cacheResults = (ttl: number = 3600) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = `${req.method}:${req.originalUrl}:${req.user?.id}`;

    // Try to get from cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // Intercept response
    const originalJson = res.json.bind(res);
    res.json = function(data) {
      // Cache successful responses
      if (res.statusCode === 200) {
        redis.setex(cacheKey, ttl, JSON.stringify(data));
      }
      return originalJson(data);
    };

    next();
  };
};

// Cache invalidation on data changes
export const invalidateCache = async (pattern: string) => {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
};

// Usage
app.get('/api/v1/dashboards/:id', cacheResults(3600), getDashboard);

app.put('/api/v1/dashboards/:id', async (req, res) => {
  const dashboard = await updateDashboard(req.body);
  await invalidateCache(`GET:/api/v1/dashboards/${req.params.id}:*`);
  res.json(dashboard);
});
```

### 10.3 Database Connection Pooling

```typescript
// src/db/connection.ts
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  max: 20,                    // Maximum connections
  idleTimeoutMillis: 30000,   // Close idle connections
  connectionTimeoutMillis: 2000,
  ssl: process.env.NODE_ENV === 'production',
});

// Connection monitoring
pool.on('error', (error, client) => {
  logger.error('Unexpected error on idle client', error);
  process.exit(-1);
});

pool.on('connect', () => {
  logger.debug('New connection established');
});

pool.on('remove', () => {
  logger.debug('Connection removed');
});

export default pool;
```

### 10.4 Data Partitioning Strategy

```sql
-- Partition large tables by dataset_id and time range
CREATE TABLE events_partitioned (
  id UUID,
  case_id UUID,
  dataset_id UUID,
  activity_name VARCHAR(255),
  timestamp TIMESTAMP,
  attributes JSONB,
  PRIMARY KEY (id, timestamp)
) PARTITION BY RANGE (timestamp);

-- Create monthly partitions
CREATE TABLE events_2024_01 PARTITION OF events_partitioned
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE events_2024_02 PARTITION OF events_partitioned
  FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- Create yearly partition for 2025
CREATE TABLE events_2025 PARTITION OF events_partitioned
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- Enable partition pruning
SET constraint_exclusion = partition;
```

---

## 11. Security Architecture

### 11.1 Data Encryption

```typescript
// src/services/security/EncryptionService.ts
import crypto from 'crypto';

export class EncryptionService {
  private algorithm = 'aes-256-gcm';
  private encryptionKey: Buffer;

  constructor(keyString: string) {
    // Key should be 32 bytes for AES-256
    this.encryptionKey = Buffer.from(keyString, 'base64');
  }

  encrypt(data: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.encryptionKey,
      iv
    );

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    // Return iv + authTag + encrypted data
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  decrypt(encryptedData: string): string {
    const [iv, authTag, encrypted] = encryptedData
      .split(':')
      .map(part => Buffer.from(part, 'hex'));

    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.encryptionKey,
      iv
    );

    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}

// Usage: Encrypt sensitive connection strings
const connectionConfig = {
  host: 'db.example.com',
  user: 'admin',
  password: 'secret', // Will be encrypted
};

const encrypted = encryptionService.encrypt(connectionConfig.password);
// Store encrypted password in database
await dataConnectorRepo.save({
  ...connector,
  encrypted_password: encrypted,
});
```

### 11.2 SQL Injection Prevention

```typescript
// Use parameterized queries
// BAD - vulnerable to SQL injection
const query = `SELECT * FROM users WHERE email = '${email}'`;

// GOOD - parameterized query
const query = 'SELECT * FROM users WHERE email = $1';
const result = await db.query(query, [email]);

// ORM example (Prisma)
const user = await prisma.user.findUnique({
  where: { email },
});
```

### 11.3 CORS & Security Headers

```typescript
// src/middleware/security.ts
import helmet from 'helmet';
import cors from 'cors';

export const setupSecurityMiddleware = (app: Express) => {
  // Helmet for security headers
  app.use(helmet());

  // CORS configuration
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
    credentials: true,
    optionsSuccessStatus: 200,
  }));

  // Additional security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    );
    next();
  });

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  });

  app.use('/api/v1/', limiter);
};
```

---

## 12. Implementation Phases

### Phase 1: Foundation (Months 1-2)
- **Setup infrastructure** (K8s, databases, CI/CD)
- **Implement API Gateway & Auth**
- **Build core data models** (cases, events, projects)
- **Setup admin service** (users, tenants, roles)
- **Deliverables:**
  - Multi-tenant architecture working
  - User authentication (local + Azure AD)
  - Basic project/dataset management

### Phase 2: Core Analytics (Months 3-4)
- **Implement process mining engine** (Alpha, Heuristic, Inductive)
- **Build filter system** (15+ filter types)
- **Implement calculators** (20+ calculator types)
- **Create Studio UI components**
- **Deliverables:**
  - Process discovery working
  - Basic analytics and filtering
  - React component library complete

### Phase 3: Data Integration (Months 5-6)
- **Implement data connectors** (SQL Server, PostgreSQL, MySQL, etc.)
- **Build ETL engine** (mapping, transformation, enrichment)
- **Create Data Designer UI**
- **Setup data import jobs**
- **Deliverables:**
  - 15+ database connectors
  - ETL pipeline working
  - Data quality reporting

### Phase 4: Dashboards & Visualization (Months 7-8)
- **Build dashboard engine**
- **Implement 20+ panel types** (charts, tables, maps, etc.)
- **Create real-time refresh** (WebSockets)
- **Build dashboard sharing & collaboration**
- **Deliverables:**
  - Full dashboard builder
  - Real-time data updates
  - Panel templates library

### Phase 5: Advanced Features (Months 9-10)
- **Implement conformance checking** (rule engine)
- **Build AI/ML integration** (predictions, ML models)
- **Create notebooks/investigations** (analytical workspaces)
- **Implement enrichment library** (50+ enrichments)
- **Deliverables:**
  - Conformance monitoring
  - Predictive analytics
  - Advanced enrichments

### Phase 6: Operations & Hardening (Months 11-12)
- **Performance optimization** (caching, indexing, partitioning)
- **Security hardening** (encryption, audit logging, pen testing)
- **Documentation** (API docs, user guides, architecture docs)
- **Testing** (unit, integration, load, security)
- **Deliverables:**
  - Production-ready system
  - Comprehensive documentation
  - 99.9% uptime SLA

---

## Conclusion

This technical architecture provides a comprehensive blueprint for implementing Mindzie Studio as an enterprise-grade process intelligence platform. The design emphasizes:

- **Scalability**: Microservices, caching, partitioning
- **Security**: Multi-tenancy, encryption, audit logging
- **Flexibility**: Pluggable connectors, extensible API
- **Performance**: Optimized queries, connection pooling, real-time updates
- **Reliability**: High availability, disaster recovery, monitoring

**Total Implementation Effort**: ~12 months
**Team Size**: 15-20 engineers (full-stack, DevOps, QA)
**Initial Infrastructure Cost**: $50-100K/month (cloud-hosted)

---

**Document Version**: 1.0
**Last Updated**: December 2, 2024
**Prepared by**: Claude AI Technical Architecture
