# Form Kit - A Visual DnD Form Editor

View Demo: [https://my-formkit-ui.netlify.app](https://my-formkit-ui.netlify.app/)

## Features Overview

The application is crafted using `Next.js` and `React` to build scalable and reusable components, with `Prisma ORM` and `PostgreSQL` for data persistence.

- **Form Management**: Create, edit, and publish forms with status tracking and grid-based dashboard.
- **Drag-and-Drop Builder**: Visual form builder with configurable widgets and reorderable blocks.
- **Form Preview**: Fully functional preview modal with submission handling and multi-device responsive views.
- **Public Form Access**: Renders published form which records user's interaction and field response.
- **Form Submission Reports**: Anonymous form submission with analytics (response tracking, completion rates, value distribution).
- **UI Component Library**: Reusable primitive components with interactive demos and documentation.
- **Database Integration**: RESTful API with PostgreSQL and Prisma for forms CRUD actions, publishing, submissions, and analytics.

## Routing Summary

### Application Routes

| Route | Description |
| ----- | ----------- |
| `/` | Dashboard with form grid and creation button |
| `/demo` | Interactive showcase of 15+ UI primitives with code examples |
| `/forms/new` | Form builder interface for creating new forms |
| `/forms/[id]` | Edit existing form with builder interface and preview modal |
| `/test` | Database connectivity test with statistics and health check links |

### API Routes

| Route | Description |
| ----- | ----------- |
| `/api/health` | Database connectivity check with latency measurement |
| `/api/forms` | **GET**: List all forms with filtering and pagination<br>**POST**: Create new draft form |
| `/api/forms/[id]` | **GET**: Retrieve form with ordered blocks<br>**PUT**: Update form metadata and blocks in transaction<br>**DELETE**: Delete form with cascade |
| `/api/forms/[id]/publish` | **PATCH**: Publish/unpublish form with auto-generated slug |
| `/api/forms/[id]/submit` | **POST**: Anonymous form submission with optional respondent info |
| `/api/forms/[id]/submissions` | **GET**: Retrieve all submissions with pagination |
| `/api/forms/[id]/analytics` | **GET**: Comprehensive analytics (submissions over time, completion rates, value distribution) |

## File Structure

```text
form-editor-tool/
├─ prisma/
│  ├─ migrations/                    # Database migration history
│  ├─ schema.prisma                  # Database schema definition
│  └─ seed.ts                        # Database seeding script
├─ src/
│  ├─ app/                           # App-router directory
│  │  ├─ api/                        # API routes
│  │  │  ├─ health/                  # Database Connection Check
│  │  │  └─ forms/                   # Forms-based API
│  │  ├─ demo/                       # UI components showcase
│  │  ├─ forms/                      # Forms routes
│  │  │  ├─ [id]/                    # Dynamic form editor route
│  │  │  └─ new/                     # New form creation route
│  │  ├─ test/                       # Database test page
│  │  ├─ page.tsx                    # Main dashboard page
│  │  ├─ layout.tsx                  # Root layout
│  │  └─ globals.css                 # Global styles
│  ├─ components/
│  │  ├─ builder/                    # Form builder
│  │  │  ├─ canvas/                  # Drag-drop canvas
│  │  │  ├─ configuration/           # Property editor
│  │  │  └─ widgets/                 # Widget palette
│  │  ├─ dashboard/                  # Dashboard components
│  │  ├─ demos/                      # UI component demos
│  │  ├─ form/                       # Form rendering components
│  │  │  ├─ blocks/                  # Form blocks (Input, Checkbox, etc.)
│  │  │  └─ configs/                 # Block configuration components
│  │  ├─ layout/                     # Layout wrapper components
│  │  ├─ preview/                    # Form preview components
│  │  └─ ui/                         # Primitive UI components
│  ├─ lib/
│  │  ├─ constants/                  # App constants (themes, styles, templates)
│  │  ├─ hooks/                      # Custom React hooks
│  │  ├─ providers/                  # Context providers (MSW, etc.)
│  │  ├─ queries/                    # Prisma queries 
│  │  ├─ schema/                     # Zod validation schemas
│  │  ├─ stores/                     # Zustand state management
│  │  ├─ types/                      # TypeScript type definitions
│  │  ├─ utils/                      # Utility functions
│  │  └─ prisma.ts                   # Prisma Client singleton
│  └─ mocks/
│     ├─ data/                       # Mock data (sample forms)
│     ├─ handlers.ts                 # MSW request handlers
│     └─ browser.ts                  # MSW browser worker
├─ public/
│  └─ mockServiceWorker.js           # MSW service worker
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

## Documentation

- **[Database Setup Guide](docs/DATABASE_SETUP.md)** - Detailed instructions for Local PostgreSQL, Prisma Dev, and Cloud options
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
