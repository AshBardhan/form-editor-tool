# Architecture Decision Record

## Tech Stack and Rationale

- **Next.js 15**: Robust web application framework for routing, CSR/SSR, and static site generation with App Router.
- **React 19**: Modern UI development library for reusable components with latest features.
- **TypeScript**: Ensures strong typing for props, state, and domain models, reducing runtime errors.
- **Zustand**: Lightweight state management alternative to `Redux` with simplicity and ease of use.
- **TailwindCSS v4**: Utility-first styling with theme tokens, responsive support, and container queries.
- **@dnd-kit**: Modern drag-and-drop toolkit for React with accessibility features.
- **Zod**: Type-safe client-side validation with schema-based approach for both builder and preview modes.
- **Framer Motion**: Animations for drag-and-drop, toast notifications, and other UI feedback.
- **Class Variance Authority (CVA)**: Manage component variants and styling combinations in a type-safe and reusable way.
- **Lucide React**: Lightweight, modern SVG icon library for clean, scalable icons.
- **Prisma ORM**: Type-safe database ORM with auto-generated client and migration system for PostgreSQL.
- **PostgreSQL**: Robust relational database for data persistence with ACID compliance.

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
- **Toast System**: Non-blocking notifications for user feedback with Framer Motion animations

### Responsive Design

- **Container Queries**: Modern CSS container queries for component-level responsiveness
- **Mobile-First Approach**: Forms adapt from mobile to desktop seamlessly
- **Device Preview**: Toggle between desktop, tablet, and mobile views in builder
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

### Database Architecture

- **Prisma ORM**: Type-safe database access with auto-generated TypeScript types
- **Schema Design**: 5 models with clear separation of concerns
  - **User**: Form creators with role-based access (CLIENT, ADMIN)
  - **Form**: Form metadata with ownership, status tracking, and public slug
  - **FormBlock**: Individual form fields/widgets with JSON props and ordering
  - **FormSubmission**: Anonymous submissions with optional respondent metadata
  - **FormFieldResponse**: Individual field responses linked to submissions
- **Enum Types**: Database-level validation for consistency
  - **UserRole**: `CLIENT` (form creator), `ADMIN` (platform admin)
  - **FormTheme**: `light`, `dark`
  - **FormStatus**: `draft` (editing), `published` (accepting responses)
- **Relationships**:
  - User → Forms (1:n): One user creates many forms
  - Form → FormBlocks (1:n): One form contains many blocks
  - Form → FormSubmissions (1:n): One form receives many submissions
  - FormSubmission → FormFieldResponses (1:n): One submission contains many field responses
- **Self-Documenting Schema**: Comprehensive inline comments explaining:
  - Field purposes and data types
  - Relationship cardinalities (1:1, 1:n, n:m)
  - Index optimization purposes
  - Design decisions and constraints
- **Data Integrity**:
  - Cascade deletes ensure referential integrity (delete form → deletes blocks + submissions)
  - Unique constraints on email (User) and slug (Form)
  - Composite indexes for efficient queries (formId + order for FormBlock)
- **Performance Optimization**:
  - Strategic indexes on frequently queried fields (userId, formId, status, slug, submittedAt, respondentEmail, blockName)
  - Composite index (formId + order) for efficient block ordering
  - JSON fields (props, value) for flexible schema evolution
- **Schema Management**: Version-controlled database schema with migrations
- **Connection Pooling**: Efficient database connections using `@prisma/adapter-pg`
- **Singleton Pattern**: Prisma Client singleton to prevent connection exhaustion
- **Environment-based Configuration**: Separate database URLs for development/production/testing
- **SSL Configuration**: Secure connections for cloud databases (`sslmode=require`), disabled for local development (`sslmode=disable`)
