# Architecture Decision Record

## Tech Stack and Rationale

- **Next.js 15**: Robust web application framework for routing, CSR/SSR and static site generation with App Router.
- **React 19**: Modern UI development library for reusable components with latest features.
- **TypeScript**: Ensures strong typing for props, state and domain models, reducing runtime errors.
- **Zustand**: Lightweight state management alternative to `Redux` with simplicity and ease of use.
- **TailwindCSS v4**: Utility-first styling with `@theme inline` tokens, responsive support and container queries.
- **@base-ui/react**: Unstyled primitive behavior (focus, keyboard, ARIA, portals) for Select, Menu, Modal, Toast, and related widgets.
- **@dnd-kit**: Modern drag-and-drop toolkit for React with accessibility features.
- **Zod**: Type-safe client-side validation with schema-based approach for both builder and preview modes.
- **Motion**: Animation library for drag-and-drop, layout transitions and UI feedback.
- **Class Variance Authority (CVA)**: Manage derived-component variants (`variant`, `size`, `color`) in a type-safe way
- **Lucide React**: Lightweight, modern SVG icon library for clean, scalable icons.
- **Prisma ORM**: Type-safe database ORM with auto-generated client and migration system for PostgreSQL.
- **PostgreSQL**: Robust relational database for data persistence with ACID compliance.
- **NextAuth.js**: Industry-standard authentication library for Next.js with built-in session management, OAuth providers, and JWT support.
- **bcryptjs**: Secure password hashing library for credential-based authentication.
- **@auth/prisma-adapter**: Official Prisma adapter for NextAuth.js to store sessions and accounts in database.

## Key Design Decisions

### State Management

- **Zustand Stores**: 4 separate stores for different concerns
  - `formDataStore` - Respondent field values in preview/public
  - `formConfigStore` - Form metadata, blocks, actions; `updateFormTheme` for the persisted form theme id
  - `UIStateStore` - Block selection, sidebar collapse, hydrated app theme (`light` / `dark`)
  - `formBlockValidationStore` - Validation errors per block
- **Selector Pattern**: Used throughout to minimize re-renders
- **Immutable Updates**: State updates follow immutability patterns
- **Initialization Logic**: Smart defaults for form fields (e.g., first option for required selects)

### Design System & Theming

Two independent surfaces must not bleed into each other. Scoping is DOM nesting plus CSS custom properties, not a React theme context.

- **App theme** (`light` | `dark`) — product chrome on opted-in routes (dashboard, form workspace, admin, `/demo`). A route opts in by rendering `AppThemeContainer` (`[data-app-scope]`). Preference lives in `localStorage`; a pre-paint script on `<html>` sets `data-app-theme` to avoid flash. Unscoped routes (`/`, auth, `/f/[slug]`) stay on default app tokens.
- **Form theme** (`light` | `dark` | `forest` | `beach` | `frost` | `fire`) — authored form content only (builder canvas, preview, public form). `FormThemeContainer` sets `data-form-theme` and `form-container`. Unknown ids fall back via `resolveFormTheme` to `DEFAULT_FORM_THEME`. Persisted as `Form.theme` (`enum PredefinedFormTheme`); the builder picker is `FormThemeSelector`.
- **Namespaced tokens** — app themes define `--app-*`; form themes define `--form-*`. `@theme inline` maps each namespace to utilities (`bg-app-surface`, `bg-form-surface`). A missing form variable does not inherit the app theme. No `dark:` utilities.
- **Token tiers** — Tier 1 (semantic color) and Tier 2 (font, radius, shadow) are per-theme in `src/styles/theme/{app,form}.css`. Tier 3 (spacing, motion, z-index, focus ring) is global in `src/styles/primitives.css` and cannot be shadowed by a theme.
- **Layers**
  - **Primitives** (`src/design-system/primitives/`) — behavior and a11y only. Complex widgets wrap Base UI (`Select`, `Menu`, `Modal`, `Toast`, …). Simple controls wrap native elements. Zero appearance classes.
  - **Derived app** (`src/design-system/app/`, `App*`) — chrome and config UI; `bg-app-*` / `text-app-*`.
  - **Derived form** (`src/design-system/form/`, `Form*`) — canvas, preview, public fields and actions; `bg-form-*` / `text-form-*`.
- **Composition** — Base UI `render` is the slot API. Navigation CTAs use `AppButton` / `FormButton` with `render={<Link href="…" />}` so the host is a single `<a>`. Do not nest a button inside `Link`.
- **Custom / user-authored form themes** are deferred (`docs/IMPROVEMENTS.md`). When added, they overlay inline `--form-*` on `FormThemeContainer` while `Form.theme` remains the CSS base. Do not add `"custom"` to `PredefinedFormTheme`.

### Component Architecture

- **Composition over Inheritance**: Derived components wrap primitives; they never re-implement keyboard or ARIA behavior
- **Paired surfaces**: App chrome uses `App*`; authored form content uses `Form*`. There is no shared unprefixed `bg-surface` component
- **Separation of Concerns**: Presentational vs container; theme scope vs widget behavior
- **Single Responsibility**: Each component has a focused responsibility
- **Container Queries**: Form typography (`FormText`) scales with `.form-container` (`@sm`, `@5xl`); app typography (`AppText`) scales with the viewport
- **Field validation**: Inline errors via `FormError` on public/preview/builder blocks
- **Toast System**: `AppToast` on Base UI, provided once from the root layout (`AppToastProvider`)
- **Route Groups**: Next.js route groups for logical organization
  - `(dashboard)/` - Dashboard-related pages
  - `(form)/` - Form management pages (builder, analytics, submissions)
  - Enables shared layouts without affecting URL structure

### Responsive Design

- **Container Queries**: Modern CSS container queries for component-level responsiveness
- **Mobile-First Approach**: Forms adapt from mobile to desktop seamlessly
- **Device Preview**: Toggle between desktop, tablet and mobile views in builder
- **Flexible Layouts**: Form blocks adjust based on container width, not viewport
- **Typography Scaling**: Form text uses container breakpoints (from `@sm` to `@5xl`); app text uses viewport breakpoints (from `sm` to `2xl`)

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
  - Public routes: `/f/[slug]` (published forms)
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
  - **FormTheme**: Predefined themes - `light`, `dark`, `frost`, `forest`, `fire`, `beach`
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
