# Form Kit - A Visual DnD Form Editor

View Demo: [https://my-formkit-ui.netlify.app](https://my-formkit-ui.netlify.app/)

## Features Overview

The application is crafted using `Next.js` and `React` to build scalable and reusable components, with `Prisma ORM` and `PostgreSQL` for data persistence.

- **Form Management**: Create, edit and publish forms with status tracking and grid-based dashboard.
- **Drag-and-Drop Builder**: Visual form builder with configurable widgets and reorderable blocks.
- **Form Preview**: Fully functional preview modal with submission handling and multi-device responsive views.
- **Public Form Access**: Renders published form which records user's interaction and field response.
- **Form Submissions and Analytics**: Anonymous submissions with funnel metrics, field-level response analysis, and a per-submission detail view.
- **Authentication and Roles**: Email/password sign-in with NextAuth.js, CLIENT and ADMIN roles, and an admin area for managing users and forms.
- **UI Component Library**: Design system of primitives with `App*` and `Form*` derived components, separate app and form themes, and interactive demos.
- **Database Integration**: RESTful API with PostgreSQL and Prisma for forms CRUD actions, publishing, submissions and analytics.

## Routing Summary

### Application Routes

| Route | Description |
| ----- | ----------- |
| `/` | Public landing page with sign-in call to action |
| `/signin` | Sign in with email and password |
| `/signup` | Create a new account (CLIENT role) |
| `/error` | Authentication error page |
| `/forbidden` | Shown when a non-admin user opens an admin route |
| `/demo` | Interactive showcase of the `App*` and `Form*` design-system components |
| `/forms` | Dashboard page listing all forms with statistics |
| `/forms/[slug]` | Redirects to the form builder |
| `/forms/[slug]/builder` | Form builder interface for creating and editing forms |
| `/forms/[slug]/analytics` | Redirects to analytics overview |
| `/forms/[slug]/analytics/overview` | Funnel metrics and reserved trends slot |
| `/forms/[slug]/analytics/fields` | Field-level response analysis and value distribution |
| `/forms/[slug]/submissions` | Table of all form submissions; row click opens field responses in a modal |
| `/f/[slug]` | Public form view for respondents to fill and submit |
| `/f/[slug]/success` | Form submission success confirmation page |
| `/test` | Database connectivity test with statistics and health check links |
| `/admin` | Redirects to admin users (ADMIN role only) |
| `/admin/users` | List all users, change roles, and delete users |
| `/admin/forms` | List forms across all users with user and status filters |
| `/admin/analytics` | Platform-wide statistics |
| `/admin/settings` | System configuration and settings |

All routes except `/`, the auth pages and `/f/[slug]` require a signed-in user; the middleware redirects anyone else to `/signin`.

### API Routes

| Route | Description |
| ----- | ----------- |
| `/api/forms` | **GET**: List all forms with filtering and pagination<br>**POST**: Create new draft form |
| `/api/forms/[id]` | **GET**: Retrieve form with ordered blocks<br>**PATCH**: Automatically update form metadata and blocks<br>**DELETE**: Delete form with cascade |
| `/api/forms/[id]/status` | **PATCH**: Publish/unpublish/archive form with status updates |
| `/api/forms/[id]/submissions` | **GET**: Retrieve all submissions with pagination<br>**POST**: Submit form response with field values<br>**DELETE**: Clear all submissions and reset submission counters |
| `/api/forms/[id]/analytics` | **GET**: Comprehensive analytics (submissions over time, completion rates, field value distribution) |
| `/api/auth/[...nextauth]` | NextAuth.js handlers (sign in, sign out, session) |
| `/api/auth/signup` | **POST**: Register a new user with a hashed password |
| `/api/admin/users` | **GET**: List all users with their stats (ADMIN) |
| `/api/admin/users/[id]` | **PATCH**: Change a user's role<br>**DELETE**: Delete a user (ADMIN) |
| `/api/admin/forms` | **GET**: List forms filtered by user and status (ADMIN) |
| `/api/admin/analytics` | **GET**: Platform-wide statistics (ADMIN) |

## File Structure

```text
form-editor-tool/
├─ prisma/
│  ├─ migrations/                    # Database migration history
│  ├─ schema.prisma                  # Database schema definition
│  └─ seed/                          # Database seeding script and sample data
├─ src/
│  ├─ app/                           # App-router directory
│  │  ├─ (auth)/                     # Sign in, sign up and auth error pages
│  │  ├─ (dashboard)/                # Route group for dashboard
│  │  │  └─ forms/                   # Dashboard forms list
│  │  ├─ (form)/                     # Route group for form management
│  │  │  └─ forms/[slug]/            # Dynamic form routes
│  │  │     ├─ builder/              # Form builder interface
│  │  │     ├─ analytics/            # Funnel metrics and field analysis
│  │  │     └─ submissions/          # Submission list and detail
│  │  ├─ admin/                      # Admin area (users, forms, analytics, settings)
│  │  ├─ api/                        # API routes
│  │  │  ├─ admin/                   # Admin-only endpoints
│  │  │  ├─ auth/                    # NextAuth handlers and signup
│  │  │  └─ forms/                   # Forms-based API
│  │  │     ├─ route.ts              # Form-dashboard endpoints
│  │  │     └─ [id]/                 # Form-specific endpoints
│  │  ├─ demo/                       # UI components showcase
│  │  ├─ f/                          # Public forms directory
│  │  │  └─ [slug]/                  # Public form route
│  │  ├─ forbidden/                  # Access denied page
│  │  ├─ test/                       # Database test page
│  │  ├─ page.tsx                    # Public landing page
│  │  ├─ layout.tsx                  # Root layout
│  │  └─ globals.css                 # Global styles
│  ├─ components/
│  │  ├─ admin/                      # Admin users and forms tables
│  │  ├─ auth/                       # Sign in/up forms and user menu
│  │  ├─ builder/                    # Form builder
│  │  │  ├─ canvas/                  # Drag-drop canvas
│  │  │  ├─ configuration/           # Property editor
│  │  │  └─ widgets/                 # Widget palette
│  │  ├─ charts/                     # Chart components
│  │  ├─ dashboard/                  # Dashboard components
│  │  ├─ demos/                      # UI component demos
│  │  ├─ form/                       # Form rendering components
│  │  │  ├─ blocks/                  # Form blocks (Input, Checkbox, etc.)
│  │  │  └─ configs/                 # Block configuration components
│  │  ├─ layout/                     # Layout wrapper components
│  │  ├─ preview/                    # Form preview components
│  │  ├─ public/                     # Public form components
│  │  ├─ analytics/                  # Analytics overview and field analysis
│  │  └─ submissions/                # Submission list and detail
│  ├─ design-system/
│  │  ├─ primitives/                 # Behavior and a11y only (Base UI / native wrappers)
│  │  ├─ app/                        # App* components for product chrome
│  │  ├─ form/                       # Form* components for authored form content
│  │  └─ containers/                 # AppThemeContainer and FormThemeContainer
│  ├─ lib/
│  │  ├─ cache/                      # Form caching helpers
│  │  ├─ constants/                  # App constants (themes, styles, templates, routes)
│  │  ├─ errors/                     # Error handling utilities
│  │  ├─ hooks/                      # Custom React hooks
│  │  ├─ permissions/                # Role-permission definitions and guards
│  │  ├─ queries/                    # Prisma queries
│  │  ├─ schema/                     # Zod validation schemas
│  │  ├─ stores/                     # Zustand state management
│  │  ├─ types/                      # TypeScript type definitions
│  │  ├─ utils/                      # Utility functions
│  │  └─ prisma.ts                   # Prisma Client singleton (mock/real)
│  ├─ mocks/
│  │  ├─ data/                       # Sample data for offline development
│  │  └─ mockPrisma.ts               # Mock Prisma client
│  ├─ styles/                        # Theme tokens and component CSS
│  ├─ types/                         # Module augmentation (NextAuth session types)
│  ├─ auth.ts                        # NextAuth setup (Node runtime, credentials provider)
│  ├─ auth.config.ts                 # Edge-safe auth config used by middleware
│  └─ middleware.ts                  # Route protection (default-deny, admin guard)
├─ docs/                             # Documentation
│  ├─ ADR.md                         # Architecture Decision Records
│  ├─ DATABASE_SETUP.md              # Database setup guide
│  ├─ IMPROVEMENTS.md                # Future improvements
│  └─ MOCKING_GUIDE.md               # Mock implementation guide
├─ public/
│  └─ [next.js assets]               # SVG icons and static files
├─ screenshots/                      # Screenshots for README
├─ .env.sample                       # Environment variables template
├─ prisma.config.ts                  # Prisma configuration
└─ [config files]                    # Next.js, TypeScript, ESLint, Tailwind configs
```

## Quick Start

### Prerequisites

- **Node.js 22+** and **npm 9+**
- **PostgreSQL 14+** (for local setup)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Setup database (see docs/DATABASE_SETUP.md for detailed options)
# For local PostgreSQL setup:
sudo systemctl start postgresql      # Ubuntu
brew services start postgresql@16    # macOS

# Create database and user (first time only)
sudo -u postgres psql -c "CREATE DATABASE formkit_dev;"
sudo -u postgres psql -c "CREATE USER formkit_user WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE formkit_dev TO formkit_user;"

# 3. Configure environment
cp .env.sample .env
# Edit .env: DATABASE_URL="postgresql://formkit_user:your_password@localhost:5432/formkit_dev?sslmode=disable"

# 4. Run migrations
npx prisma generate
npx prisma migrate deploy

# 5. (Optional) Seed database with sample data
npx prisma db seed

# 6. Start development server
npm run dev
```

### Offline Development (No Database Required)

You can develop and test the application without setting up PostgreSQL:

```bash
# 1. Install dependencies
npm install

# 2. Enable mock mode
cp .env.sample .env.local
echo "NEXT_PUBLIC_API_MOCKING=enabled" >> .env.local

# 3. Start development server
npm run dev
```

**What works in offline mode:**

- Dashboard with 10 sample forms
- Form builder with full editing capabilities
- Form analytics, field analysis, and sample submissions
- Public form rendering and submission
- All API routes (create, update, delete, publish)

**Benefits:**

- No database setup required
- Fast and consistent responses
- Perfect for UI/UX development
- Automatic mocking via Mock Prisma

See [docs/MOCKING_GUIDE.md](docs/MOCKING_GUIDE.md) for complete details on the mocking architecture.

## Documentation

- **[Database Setup Guide](docs/DATABASE_SETUP.md)** - Detailed instructions for Local PostgreSQL, Prisma Dev and Cloud options
- **[Architecture Decision Records](docs/ADR.md)** - Key technical decisions and rationale
- **[Future Improvements](docs/IMPROVEMENTS.md)** - Planned enhancements and optimization opportunities

## Screenshots

**Component Architecture**
![Components Architecture](./screenshots/dnd-form-components.png)
**Desktop View**
![Desktop View](./screenshots/dnd-form-default.png)
**Tablet View**
![Desktop View](./screenshots/dnd-form-tablet.png)
**Mobile View**
![Desktop View](./screenshots/dnd-form-mobile.png)
**Dark Mode View**
![Dark Mode View](./screenshots/dnd-form-dark.png)
