# Form Kit - A Visual DnD Form Editor

View Demo: [https://my-formkit-ui.netlify.app](https://my-formkit-ui.netlify.app/)

## Features Overview

The application is crafted using `Next.js` and `React` to build scalable and reusable components, with `Prisma ORM` and `PostgreSQL` for data persistence.

- **Form Management**: Create, edit and publish forms with status tracking and grid-based dashboard.
- **Drag-and-Drop Builder**: Visual form builder with configurable widgets and reorderable blocks.
- **Form Preview**: Fully functional preview modal with submission handling and multi-device responsive views.
- **Public Form Access**: Renders published form which records user's interaction and field response.
- **Form Submission Reports**: Anonymous form submission with analytics (response tracking, completion rates, value distribution).
- **UI Component Library**: Reusable primitive components with interactive demos and documentation.
- **Database Integration**: RESTful API with PostgreSQL and Prisma for forms CRUD actions, publishing, submissions and analytics.

## Routing Summary

### Application Routes

| Route | Description |
| ----- | ----------- |
| `/` | Dashboard with form grid and creation button (via `/forms`) |
| `/demo` | Interactive showcase of 15+ UI primitives with code examples |
| `/forms` | Dashboard page listing all forms with statistics |
| `/forms/[slug]` | Form overview page with navigation to builder and reports |
| `/forms/[slug]/builder` | Form builder interface for creating and editing forms |
| `/forms/[slug]/reports` | Form analytics and submission reports |
| `/forms/[slug]/reports/submissions` | List all form submissions with pagination |
| `/forms/[slug]/reports/fields` | Field-level analytics and value distribution |
| `/f/[slug]` | Public form view for respondents to fill and submit |
| `/f/[slug]/success` | Form submission success confirmation page |
| `/test` | Database connectivity test with statistics and health check links |

### API Routes

| Route | Description |
| ----- | ----------- |
| `/api/forms` | **GET**: List all forms with filtering and pagination<br>**POST**: Create new draft form |
| `/api/forms/[id]` | **GET**: Retrieve form with ordered blocks<br>**PATCH**: Automatically update form metadata and blocks<br>**DELETE**: Delete form with cascade |
| `/api/forms/[id]/status` | **PATCH**: Publish/unpublish/archive form with status updates |
| `/api/forms/[id]/submissions` | **GET**: Retrieve all submissions with pagination<br>**POST**: Submit form response with field values |
| `/api/forms/[id]/analytics` | **GET**: Comprehensive analytics (submissions over time, completion rates, field value distribution) |

## File Structure

```text
form-editor-tool/
├─ prisma/
│  ├─ migrations/                    # Database migration history
│  ├─ schema.prisma                  # Database schema definition
│  └─ seed/                          # Database seeding script and sample data
├─ src/
│  ├─ app/                           # App-router directory
│  │  ├─ (dashboard)/                # Route group for dashboard
│  │  │  └─ forms/                   # Dashboard forms list
│  │  ├─ (form)/                     # Route group for form management
│  │  │  └─ forms/[slug]/            # Dynamic form routes
│  │  │     ├─ builder/              # Form builder interface
│  │  │     └─ reports/              # Form reports and analytics
│  │  ├─ api/                        # API routes
│  │  │  └─ forms/                   # Forms-based API
│  │  │     ├─ route.ts              # Form-dashboard endpoints
│  │  │     └─ [id]/                 # Form-specific endpoints
│  │  ├─ demo/                       # UI components showcase
│  │  ├─ f/                          # Public forms directory
│  │  │  └─ [slug]/                  # Public form route
│  │  ├─ test/                       # Database test page
│  │  ├─ page.tsx                    # Main dashboard page (redirects to /forms)
│  │  ├─ layout.tsx                  # Root layout
│  │  └─ globals.css                 # Global styles
│  ├─ components/
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
│  │  ├─ reports/                    # Reports and analytics components
│  │  └─ ui/                         # Primitive UI components
│  ├─ lib/
│  │  ├─ constants/                  # App constants (themes, styles, templates)
│  │  ├─ errors/                     # Error handling utilities
│  │  ├─ hooks/                      # Custom React hooks
│  │  ├─ queries/                    # Prisma queries
│  │  ├─ schema/                     # Zod validation schemas
│  │  ├─ stores/                     # Zustand state management
│  │  ├─ types/                      # TypeScript type definitions
│  │  ├─ utils/                      # Utility functions
│  │  └─ prisma.ts                   # Prisma Client singleton (mock/real)
│  └─ mocks/
│     ├─ data/                       # Sample data for offline development
│     └─ mockPrisma.ts               # Mock Prisma client
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
- Form reports with 20 sample submissions
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
