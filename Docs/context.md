# SofClo - Software Asset Management (SAM) Platform

## Introduction
SofClo is a cloud-native platform revolutionizing Software Asset Management (SAM) and FinOps operations. By bridging the gap between operational management and strategic alignment, SofClo enables users to efficiently manage SAM project data through a structured, task-based workflow.

## Core Features

### 1. User Authentication & Authorization
- Firebase Authentication integration
- Protected routes with role-based access
- Secure session management
- Automatic profile loading

### 2. Dashboard & Analytics
- Real-time metrics visualization:
  - Total Licenses
  - Active Users
  - Compliance Rate
  - Cost Optimization
- Program Maturity Assessment:
  - Strategy & Governance
  - Process & Automation
  - Technology & Tools
  - People & Skills
  - Vendor Management
- Stakeholder Management:
  - Name and Role tracking
  - Status monitoring (active/inactive)
  - Priority levels (high/medium/low)
- Compliance Status:
  - Compliant assets
  - Non-compliant assets
  - At-risk assets

### 3. State Management
- Zustand for global state management
- Profile store for user data
- Dashboard data persistence
- Real-time updates

### 4. Data Structure
```typescript
interface DashboardFormData {
  metrics: {
    totalLicenses: number;
    activeUsers: number;
    complianceRate: number;
    costOptimization: number;
  };
  maturityScores: {
    [key: string]: number;  // Score from 0-5
  };
  complianceStatus: {
    compliant: number;
    nonCompliant: number;
    atRisk: number;
  };
  stakeholders: Array<{
    name: string;
    role: string;
    status: 'active' | 'inactive';
    priority: 'high' | 'medium' | 'low';
  }>;
}
```

### 5. UI Components
- Material-UI integration
- Responsive layout with sidebar
- Modern card-based design
- Form validation and error handling
- Toast notifications for user feedback

### 6. Database Schema (Firestore)
```typescript
organizations/{orgId} {
  name: string;
  dashboardData: DashboardFormData;
}

users/{userId} {
  organizationId: string;
  // other user data
}
```

## Technical Stack

### Frontend
- React with TypeScript
- Material-UI for components
- Zustand for state management
- React Router for navigation

### Authentication & Database
- Firebase Authentication
- Firestore for data storage
- Real-time data synchronization

### Development Tools
- TypeScript for type safety
- ESLint for code quality
- Modern ES6+ features

## Implementation Notes

### Protected Routes
- Implemented using React Router
- Authentication state check
- Loading states with Material-UI
- Redirect to login if unauthorized

### Profile Management
- Automatic profile loading on auth
- Organization data persistence
- Logout functionality
- Session management

### Form Validation
- Input validation for all fields
- Numeric constraints for metrics
- Required fields enforcement
- Error messaging

### Data Flow
1. User authentication
2. Profile/Organization loading
3. Dashboard data retrieval
4. Real-time updates
5. Firestore persistence

## Future Enhancements
1. Advanced analytics dashboard
2. Export functionality
3. Batch operations
4. Advanced search capabilities
5. Custom reporting tools

## Technical Architecture

### Frontend
- React.js
- Dynamic UI components
- Responsive design

### Backend
- Node.js
- Express.js
- RESTful API architecture

### Infrastructure
- Database: firebase
- Multi-factor authentication: Email, SSO, Enterprise using firebase
- Authentication: OAuth 2.0, JWT
- Cloud Platform: AWS/GCP/Azure
- API Integration Framework

## Roadmap

### Planned Enhancements
1. AI-Powered Features
   - License optimization
   - Contract negotiation assistance
   - Predictive analytics

2. Mobile Application
   - Remote SAM management
   - FinOps on-the-go
   - Real-time notifications

3. Advanced Automation
   - Smart workflow triggers
   - AI-driven task management
   - Automated compliance checks

## Summary
SofClo transforms traditional Software Asset Management by offering an intelligent, workflow-centric platform that combines technical excellence with strategic insight. Our solution streamlines SAM and FinOps processes while ensuring alignment with organizational objectives.

## Firebase Database Schema

### Collections & Documents Structure

#### users
```json
{
  "uid": "string", // Firebase Auth UID
  "email": "string",
  "displayName": "string",
  "role": "string", // enum: SAM_MANAGER, FINOPS_ANALYST, IT_ASSET_MANAGER
  "organizationId": "string", // Reference to organizations
  "photoURL": "string",
  "settings": {
    "notifications": "boolean",
    "theme": "string", // light/dark
    "language": "string"
  },
  "createdAt": "timestamp",
  "lastLogin": "timestamp"
}
```

#### organizations
```json
{
  "id": "string",
  "name": "string",
  "industry": "string",
  "subscription": {
    "plan": "string", // FREE, PRO, ENTERPRISE
    "status": "string", // ACTIVE, SUSPENDED, CANCELLED
    "expiryDate": "timestamp"
  },
  "settings": {
    "ssoEnabled": "boolean",
    "allowedDomains": "array<string>",
    "mfaRequired": "boolean"
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

#### software_assets
```json
{
  "id": "string",
  "organizationId": "string",
  "name": "string",
  "vendor": "string",
  "type": "string", // DESKTOP, CLOUD, ENTERPRISE
  "licenses": [{
    "id": "string",
    "type": "string",
    "quantity": "number",
    "allocated": "number",
    "expiryDate": "timestamp",
    "cost": "number"
  }],
  "compliance": {
    "status": "string", // COMPLIANT, AT_RISK, NON_COMPLIANT
    "lastChecked": "timestamp"
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "createdBy": "string" // Reference to users
}
```

#### tasks
```json
{
  "id": "string",
  "organizationId": "string",
  "title": "string",
  "description": "string",
  "category": "string", // LICENSE_COMPLIANCE, COST_OPTIMIZATION, PROCUREMENT
  "priority": "string", // HIGH, MEDIUM, LOW
  "status": "string", // TODO, IN_PROGRESS, COMPLETED
  "assignedTo": "string", // Reference to users
  "dueDate": "timestamp",
  "attachments": [{
    "id": "string",
    "name": "string",
    "url": "string",
    "type": "string"
  }],
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "createdBy": "string" // Reference to users
}
```

#### audits
```json
{
  "id": "string",
  "organizationId": "string",
  "type": "string", // INTERNAL, EXTERNAL
  "status": "string", // PLANNED, IN_PROGRESS, COMPLETED
  "startDate": "timestamp",
  "endDate": "timestamp",
  "findings": [{
    "id": "string",
    "severity": "string", // HIGH, MEDIUM, LOW
    "description": "string",
    "resolution": "string"
  }],
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "conductedBy": "string" // Reference to users
}
```

### Firebase Storage Structure
```
/organizations/{organizationId}/
├── tasks/
│   └── {taskId}/
│       └── attachments/
├── audits/
│   └── {auditId}/
│       └── documents/
└── users/
    └── {userId}/
        └── profile/
```

## Application Structure

```
sofclo/
├── src/
│   ├── assets/                # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │
│   ├── components/           # Reusable components
│   │   ├── common/          # Shared components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── Modal/
│   │   ├── dashboard/
│   │   ├── tasks/
│   │   └── inventory/
│   │
│   ├── config/              # Configuration
│   │   ├── firebase.ts
│   │   └── constants.ts
│   │
│   ├── features/            # Feature modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── services/
│   │   ├── dashboard/
│   │   ├── tasks/
│   │   └── inventory/
│   │
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useFirestore.ts
│   │   └── useStorage.ts
│   │
│   ├── layouts/             # Page layouts
│   │   ├── MainLayout/
│   │   └── AuthLayout/
│   │
│   ├── pages/              # Route pages
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── settings/
│   │
│   ├── services/           # Firebase services
│   │   ├── auth.ts
│   │   ├── firestore.ts
│   │   └── storage.ts
│   │
│   ├── store/              # State management
│   │   ├── slices/
│   │   └── hooks.ts
│   │
│   ├── types/              # TypeScript types
│   │   ├── models.ts
│   │   └── common.ts
│   │
│   └── utils/              # Helper functions
│       ├── formatting.ts
│       └── validation.ts
│
├── functions/              # Firebase Cloud Functions
│   ├── src/
│   │   ├── auth/
│   │   ├── tasks/
│   │   └── notifications/
│   └── package.json
│
├── public/                # Public assets
├── tests/                 # Test files
│   ├── unit/
│   └── integration/
│
├── .github/              # GitHub workflows
├── firebase.json         # Firebase configuration
├── firestore.rules       # Firestore security rules
├── storage.rules         # Storage security rules
└── package.json
