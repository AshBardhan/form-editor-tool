# Architecture Decision Record

## Tech Stack and Rationale

- **Next.js 15**: Robust web application framework for routing, CSR/SSR and static site generation with App Router.
- **React 19**: Modern UI development library for reusable components with latest features.
- **TypeScript**: Ensures strong typing for props, state and domain models, reducing runtime errors.
- **Zustand**: Lightweight state management alternative to `Redux` with simplicity and ease of use.
- **TailwindCSS v4**: Utility-first styling with theme tokens, responsive support and container queries.
- **@dnd-kit**: Modern drag-and-drop toolkit for React with accessibility features.
- **Zod**: Type-safe client-side validation with schema-based approach for both builder and preview modes.
- **Motion**: Modern animation library for drag-and-drop, toast notifications and UI feedback.
- **Class Variance Authority (CVA)**: Manage component variants and styling combinations in a type-safe and reusable way
- **Lucide React**: Lightweight, modern SVG icon library for clean, scalable icons.
- **Prisma ORM**: Type-safe database ORM with auto-generated client and migration system for PostgreSQL.
- **PostgreSQL**: Robust relational database for data persistence with ACID compliance.
- **NextAuth.js**: Industry-standard authentication library for Next.js with built-in session management, OAuth providers, and JWT support.
- **bcryptjs**: Secure password hashing library for credential-based authentication.
- **@auth/prisma-adapter**: Official Prisma adapter for NextAuth.js to store sessions and accounts in database.

## Key Design Decisions

### State Management

- **Zustand Stores**: 4 separate stores for different concerns
  - `formDataStore` - Form blocks and data
  - `formConfigStore` - Form metadata (title, theme)
  - `UIStateStore` - UI state (device mode, sidebar visibility)
  - `formBlockValidationStore` - Validation errors per block
- **Selector Pattern**: Used throughout to minimize re-renders
- **Immutable Updates**: State updates follow immutability patterns
- **Initialization Logic**: Smart defaults for form fields (e.g., first option for required selects)

### Component Architecture

- **Composition over Inheritance**: Components built using composition patterns
- **Separation of Concerns**: Clear separation between presentational and container components
- **Single Responsibility**: Each component has a focused responsibility
- **Reusability**: UI primitives shared across the application
- **Container Queries**: Component-level responsive design for better flexibility
- **Error Boundaries**: Proper error handling and display with dedicated ErrorMessages component
- **Toast System**: Non-blocking notifications for user feedback with Motion animations
- **Route Groups**: Next.js route groups for logical organization
  - `(dashboard)/` - Dashboard-related pages
  - `(form)/` - Form management pages (builder, reports)
  - Enables shared layouts without affecting URL structure

### Responsive Design

- **Container Queries**: Modern CSS container queries for component-level responsiveness
- **Mobile-First Approach**: Forms adapt from mobile to desktop seamlessly
- **Device Preview**: Toggle between desktop, tablet and mobile views in builder
- **Flexible Layouts**: Form blocks adjust based on container width, not viewport
- **Typography Scaling**: Text sizes adapt to different container sizes (@sm, @md, @lg breakpoints)

### Validation Strategy

- **Zod Schemas**: Type-safe validation schemas for each block type
- **Builder Validation**: Real-time validation on configuration changes in builder mode
- **Preview Validation**: Form submission validation with inline error messages
- **Error Display**: Context-aware error messages below invalid fields
- **Visual Feedback**: Error states reflected in block UI (red borders, asterisks)
- **Required Fields**: Visual indicators (red asterisk) for required fields
- **Type-Specific Rules**: Email format, number ranges, text length constraints

### Performance Optimizations

- **Memoization**: Strategic use of `useMemo` and `useCallback`
- **Selective Re-renders**: Zustand selectors prevent unnecessary renders
- **Code Organization**: Logical grouping reduces bundle size
- **Lazy Imports**: Dynamic imports for heavy components (where applicable)
- **Optimized Form Rendering**: Efficient block updates and validation checks

### Authentication & Authorization

- **NextAuth.js Integration**: Production-ready authentication system
  - Multiple providers: Credentials (email/password), Google OAuth, GitHub OAuth
  - JWT-based sessions for stateless authentication
  - Secure session management with automatic token refresh
  - Built-in CSRF protection and secure cookie handling
- **Role-Based Access Control (RBAC)**: Fine-grained permission system
  - **CLIENT Role**: Form creators with full control over their own workspace
    - Create, read, update, delete own forms
    - View own submissions and analytics
    - Manage own profile
  - **ADMIN Role**: Platform administrators with superuser capabilities
    - All CLIENT permissions plus system-wide access
    - View/manage all users and forms
    - User impersonation for customer support
    - Platform-wide analytics and system configuration
- **Permission System**: Granular permission checks
  - Permission definitions: `form:read:own`, `form:read:all`, `user:impersonate`, etc.
  - Role-permission mapping for consistent authorization
  - Helper functions: `requireAuthSession()`, `requireAdmin()`, `requireOwnership()`
- **Route Protection**: Middleware-based access control
  - Public routes: `/auth/*`, `/f/[slug]` (published forms)
  - Protected routes: `/forms/*` (requires authentication)
  - Admin routes: `/admin/*` (requires ADMIN role)
  - API route guards with ownership validation
- **Security Best Practices**:
  - Password hashing with bcryptjs (12 rounds)
  - JWT signed with secret key
  - HTTP-only cookies for token storage
  - Session expiration (30 days default)
  - Rate limiting on auth endpoints (future)

### Database Architecture

- **Prisma ORM**: Type-safe database access with auto-generated TypeScript types
- **Schema Design**: 8 models with clear separation of concerns
  - **User**: Form creators with role-based access (CLIENT, ADMIN) and authentication fields
  - **Account**: OAuth provider connections (Google, GitHub, etc.)
  - **Session**: Active user sessions for multi-device support
  - **VerificationToken**: Email verification and password reset tokens
  - **Form**: Form metadata with ownership, status tracking, public slug and analytics counters
  - **FormBlock**: Individual form fields/widgets with JSON props and ordering
  - **FormSubmission**: Anonymous submissions with timestamp tracking
  - **FormFieldResponse**: Individual field responses linked to submissions
- **Enum Types**: Database-level validation for consistency
  - **UserRole**: `CLIENT` (form creator), `ADMIN` (platform admin)
  - **FormTheme**: `light`, `dark`
  - **FormStatus**: `draft` (editing), `published` (accepting responses), `archived` (inactive)
- **Analytics Tracking**: Built-in counters for form engagement metrics
  - `views`: Total public page visits
  - `starts`: Sessions that started filling at least one field
  - `completions`: Sessions that reached all required fields filled
  - `submitAttempts`: Total submit button clicks (success + failure)
- **Relationships**:
  - User → Forms (1:n): One user creates many forms
  - User → Accounts (1:n): One user can have multiple OAuth providers
  - User → Sessions (1:n): One user can be logged in on multiple devices
  - Form → FormBlocks (1:n): One form contains many blocks
  - Form → FormSubmissions (1:n): One form receives many submissions
  - FormSubmission → FormFieldResponses (1:n): One submission contains many field responses
- **Self-Documenting Schema**: Comprehensive inline comments explaining:
  - Field purposes and data types
  - Relationship cardinalities (1:1, 1:n, n:m)
  - Index optimization purposes
  - Design decisions and constraints
- **Data Integrity**:
  - Cascade deletes ensure referential integrity:
    - Delete form → deletes blocks + submissions
    - Delete user → deletes forms + accounts + sessions
  - Unique constraints on email (User), slug (Form), sessionToken (Session)
  - Composite unique constraint on provider + providerAccountId (Account)
  - Composite indexes for efficient queries (formId + order for FormBlock)
- **Performance Optimization**:
  - Strategic indexes on frequently queried fields:
    - User: email, role
    - Form: userId, status, slug, createdAt
    - FormBlock: formId, formId + order
    - FormSubmission: formId, submittedAt
    - Session: userId, sessionToken
    - Account: userId, provider + providerAccountId
  - JSON fields (props, value) for flexible schema evolution
- **Schema Management**: Version-controlled database schema with migrations
- **Connection Pooling**: Efficient database connections using `@prisma/adapter-pg`
- **Singleton Pattern**: Prisma Client singleton to prevent connection exhaustion
- **Environment-based Configuration**: Separate database URLs for development/production/testing
- **SSL Configuration**: Secure connections for cloud databases (`sslmode=require`), disabled for local development (`sslmode=disable`)
