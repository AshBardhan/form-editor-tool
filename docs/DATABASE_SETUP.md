# Database Setup and Management

## Overview

The application uses **PostgreSQL** with **Prisma ORM** for data persistence. The database schema includes:

- **Form Management**: Form, FormBlock
- **Submissions**: FormSubmission, FormFieldResponse

## Database Schema

### Form

**Description:** Form definitions with metadata, ownership, status tracking, and analytics counters.

| Field | Type | Attributes |
| ----- | ---- | ---------- |
| `id` | String | PRIMARY KEY |
| `title` | String | NOT NULL |
| `description` | String | NULLABLE |
| `theme` | FormTheme | DEFAULT: light |
| `status` | FormStatus | DEFAULT: draft, INDEXED |
| `views` | Int | DEFAULT: 0 |
| `starts` | Int | DEFAULT: 0 |
| `completions` | Int | DEFAULT: 0 |
| `submitAttempts` | Int | DEFAULT: 0 |
| `userId` | Int | FOREIGN KEY → User.id, NOT NULL, INDEXED |
| `slug` | String | UNIQUE, NOT NULL, INDEXED |
| `createdAt` | DateTime | DEFAULT: now(), INDEXED |
| `updatedAt` | DateTime | AUTO_UPDATE |
| `publishedAt` | DateTime | NULLABLE |

**Relationships:**

- Many Forms → One User (n:1)
- One Form → Many FormBlocks (1:n)
- One Form → Many FormSubmissions (1:n)

**Enums:**

- `FormTheme`: `light`, `dark`
- `FormStatus`: `draft`, `published`, `archived`

**Indexes:** `userId`, `status`, `slug`, `createdAt`  
**Cascade:** ON DELETE CASCADE (delete form when user deleted)

### FormBlock

**Description:** Individual form fields/widgets with flexible JSON properties and ordering.

| Field | Type | Attributes |
| ----- | ---- | ---------- |
| `id` | String | PRIMARY KEY |
| `formId` | String | FOREIGN KEY → Form.id, NOT NULL, INDEXED |
| `type` | String | NOT NULL (text/textarea/select/etc.) |
| `name` | String | NOT NULL (unique within form) |
| `props` | Json | NOT NULL (label, placeholder, options) |
| `order` | Int | NOT NULL (0-indexed) |
| `createdAt` | DateTime | DEFAULT: now() |
| `updatedAt` | DateTime | AUTO_UPDATE |

**Relationships:**

- Many FormBlocks → One Form (n:1)
- One FormBlock → Many FormFieldResponses (1:n)

**Indexes:** `formId`, `formId + order` (composite)  
**Cascade:** ON DELETE CASCADE (delete blocks when form deleted)

### FormSubmission

**Description:** Anonymous form submissions with timestamp for analytics.

| Field | Type | Attributes |
| ----- | ---- | ---------- |
| `id` | String | PRIMARY KEY |
| `formId` | String | FOREIGN KEY → Form.id, NOT NULL, INDEXED |
| `submittedAt` | DateTime | DEFAULT: now(), INDEXED |

**Relationships:**

- Many FormSubmissions → One Form (n:1)
- One FormSubmission → Many FormFieldResponses (1:n)

**Indexes:** `formId`, `submittedAt`  
**Cascade:** ON DELETE CASCADE (delete submissions when form deleted)

### FormFieldResponse

**Description:** Individual field responses within submissions. Flexible JSON storage for various data types.

| Field | Type | Attributes |
| ----- | ---- | ---------- |
| `id` | String | PRIMARY KEY |
| `submissionId` | String | FOREIGN KEY → FormSubmission.id, NOT NULL, INDEXED |
| `blockId` | String | FOREIGN KEY → FormBlock.id, NOT NULL, INDEXED |
| `value` | Json | NOT NULL (string/number/boolean/array) |

**Relationships:**

- Many FormFieldResponses → One FormSubmission (n:1)
- Many FormFieldResponses → One FormBlock (n:1)

**Indexes:** `submissionId`, `blockId`  
**Cascade:** ON DELETE CASCADE (delete responses when submission deleted)

## Database Options

Choose the database option that fits your use case:

| Option | Best For | Persistence | Setup Time |
| ------ | -------- | ----------- | ---------- |
| **Local PostgreSQL** | Solo development, offline work | Persistent | 5-10 min |
| **Prisma Cloud** | Team collaboration, staging | Persistent | 1-2 min |
| **Other Cloud** | Production, advanced features | Persistent | 2-5 min |

**Quick Guide:** Solo offline development → Local PostgreSQL | Team collaboration or production → Cloud

### Option A: Local PostgreSQL

```bash
# Install PostgreSQL
sudo apt update && sudo apt install postgresql postgresql-contrib  # Ubuntu
brew install postgresql@16                                         # macOS

# Start PostgreSQL
sudo systemctl start postgresql  # Ubuntu
brew services start postgresql@16  # macOS

# Create database
sudo -u postgres psql
CREATE DATABASE formkit_dev;
CREATE USER formkit_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE formkit_dev TO formkit_user;
\q

# Configure environment
cp .env.sample .env
# Edit .env: DATABASE_URL="postgresql://formkit_user:your_password@localhost:5432/formkit_dev?sslmode=disable"

# Generate Prisma Client and Run migrations
npx prisma generate
npx prisma migrate deploy

# Optional: Seed database with sample data (first time only)
npx prisma db seed
```

### Option B: Prisma Cloud

```bash
# Create free cloud database
npx create-db
# Copy the DATABASE_URL shown

# Configure environment
cp .env.sample .env
# Edit .env and paste the DATABASE_URL

# Run migrations
npx prisma generate
npx prisma migrate deploy

# Optional: Seed database with sample data (first time only)
npx prisma db seed
```

### Option C: Other Cloud (Supabase, Railway, Neon)

```bash
# 1. Create database on provider's website, copy connection string

# Configure environment
cp .env.sample .env
# Edit .env: DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Run migrations
npx prisma generate
npx prisma migrate deploy

# Optional: Seed database with sample data (first time only)
npx prisma db seed
```

## Additional Commands

**Database Management:**

```bash
npx prisma generate              # Generate Prisma Client (TypeScript types)
npx prisma migrate dev           # Create new migration (development)
npx prisma migrate deploy        # Apply migrations (production)
npx prisma migrate reset         # Reset database (deletes all data + re-runs migrations)
npx prisma db push               # Sync schema without creating migration files
npx prisma db seed               # Seed database with sample data
npx prisma db pull               # Pull schema from existing database (reverse engineering)
npx prisma studio                # Open Prisma Studio (database GUI at http://localhost:5555)
npx prisma validate              # Validate schema file syntax
npx prisma format                # Format schema file

# Database inspection (local PostgreSQL)
psql -U formkit_user -d formkit_dev -h localhost -p 5432
# Or using DATABASE_URL from .env:
psql "$(grep DATABASE_URL .env | cut -d '=' -f2-)"

# Useful psql commands:
# \l              - List all databases
# \dt             - List all tables in current database
# \d table_name   - Describe table structure
# \du             - List all database users/roles
# \dT+            - List all custom types (enums)
# \q              - Quit psql
```

## Troubleshooting

**Database connection error:**

```bash
# Check PostgreSQL is running (local)
sudo systemctl status postgresql

# Regenerate Prisma Client
npx prisma generate

# Verify DATABASE_URL in .env
```

**Port 3000 already in use:**

```bash
npm run dev -- -p 3001
```

**Role/database does not exist (local PostgreSQL):**

```bash
sudo -u postgres psql
CREATE DATABASE formkit_dev;
CREATE USER formkit_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE formkit_dev TO formkit_user;
```

**API routes returning errors:**

```bash
# Check if database is connected (test page)
# Visit http://localhost:3000/test in browser

# View detailed error in terminal running `npm run dev`

# Check if migrations are applied
npx prisma migrate deploy

# Verify data exists
npx prisma studio
# Or check via psql: SELECT COUNT(*) FROM "Form";
```

**Type errors after schema changes:**

```bash
# Regenerate Prisma Client after schema modifications
npx prisma generate

# Restart Next.js dev server
# Press Ctrl+C and run `npm run dev` again
```
