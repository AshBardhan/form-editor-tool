# Database Setup and Management

## Overview

The application uses **PostgreSQL** with **Prisma ORM** for data persistence. The database schema includes:

- **User Management**: User, Account, Session, VerificationToken (NextAuth.js tables)
- **Form Management**: Form, FormBlock
- **Submissions**: FormSubmission, FormFieldResponse

Migrations are applied automatically as part of `npm run build` (via `prisma migrate deploy`), so production deploys stay in sync with committed migrations without a manual step.

## Setup

### 1. Choice of database

Choose the database option that fits your use case:

| Option | Best For | Persistence | Setup Time |
| ------ | -------- | ----------- | ---------- |
| **Local PostgreSQL** | Solo development, offline work | Persistent | 5-10 min |
| **Prisma Cloud** | Team collaboration, staging | Persistent | 1-2 min |
| **Other Cloud** | Production, advanced features | Persistent | 2-5 min |

**Quick Guide:** Solo offline development → Local PostgreSQL | Team collaboration or production → Cloud

#### Option A: Local PostgreSQL

```bash
# Install and start PostgreSQL
sudo apt update && sudo apt install postgresql postgresql-contrib  # Ubuntu
brew install postgresql@16                                         # macOS
sudo systemctl start postgresql  # Ubuntu
brew services start postgresql@16  # macOS

# Create database and user
sudo -u postgres psql
CREATE DATABASE formkit_dev;
CREATE USER formkit_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE formkit_dev TO formkit_user;
\q

# Configure environment
cp .env.sample .env
# Edit .env and paste the DATABASE_URL
DATABASE_URL="postgresql://formkit_user:your_password@localhost:5432/formkit_dev?sslmode=disable"
```

#### Option B: Prisma Cloud

```bash
npx create-db  # Creates a free cloud database and prints the DATABASE_URL

cp .env.sample .env
# Edit .env and paste the DATABASE_URL
```

#### Option C: Other Cloud (Supabase, Railway, Neon)

```bash
# Create a database on the provider's website and copy its connection string

cp .env.sample .env
# Edit .env and paste the DATABASE_URL
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

### 2. Initial migrations with existing schema and optional seed data

With `DATABASE_URL` set in `.env`, bring a fresh database up to date:

```bash
npx prisma generate              # Generate Prisma Client (also runs automatically via postinstall)
npx prisma migrate deploy        # Apply all existing migrations, in order
npx prisma db seed               # Optional: seed sample data (forms, blocks, submissions, auth users)
```

### 3. Update existing schema and migrations

You'll typically be in one of three scenarios. All three finish with the same two commands, run in order:

1. **Schema change with a generated migration** — edit `prisma/schema.prisma`, then run `npx prisma migrate dev --name your_change`. This diffs the schema against migration history and writes `prisma/migrations/<timestamp>_your_change/migration.sql`.
2. **Editing that newly generated migration** — e.g. adding a manual data backfill or safely enforcing `NOT NULL`. Edit the same `migration.sql` file directly. **DO NOT** edit a migration that's already been applied elsewhere — `npx prisma migrate deploy` checksums each file and fails if a previously-applied one changes; add a new migration instead.
3. **A separate, schema-neutral migration for a data-only backfill** — run `npx prisma migrate dev --create-only --name your_change` to scaffold an empty migration file, then add the backfill SQL (`UPDATE`/`DELETE`, etc.) into that generated `migration.sql`.

Regardless of which scenario(s) applied, run these two commands in this sequence to bring both the Prisma Client and the database fully in sync with whatever you just edited:

```bash
npx prisma generate        # Regenerate the Prisma Client so its types match schema.prisma
npx prisma migrate deploy  # Apply any pending migration(s) to the database
```

This is required even though `migrate dev` already applies+generates for scenario 1 — it's the safe, idempotent way to catch scenarios 2 and 3, where `migrate dev`/`--create-only` may leave the client stale or the migration unapplied.

### 4. Additional commands

```bash
npx prisma generate              # Generate Prisma Client (TypeScript types)
npx prisma migrate dev           # Create new migration (development)
npx prisma migrate deploy        # Apply migrations
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

## Schema

### User

**Description:** Authenticated users who create and manage forms. Supports both credential-based and OAuth authentication.

| Field | Type | Attributes |
| ----- | ---- | ---------- |
| `id` | Int | PRIMARY KEY, AUTO_INCREMENT |
| `email` | String | UNIQUE, NOT NULL, INDEXED |
| `name` | String | NULLABLE |
| `password` | String | NULLABLE (null for OAuth-only) |
| `image` | String | NULLABLE (profile picture URL) |
| `role` | UserRole | DEFAULT: CLIENT, INDEXED |
| `emailVerified` | DateTime | NULLABLE |
| `createdAt` | DateTime | DEFAULT: now() |
| `updatedAt` | DateTime | AUTO_UPDATE |

**Relationships:**

- One User → Many Forms (1:n)
- One User → Many Accounts (1:n) - OAuth providers
- One User → Many Sessions (1:n) - Multi-device login

**Indexes:** `email`, `role`

### Account

**Description:** OAuth provider connections (Google, GitHub, etc.) linked to users. Managed by NextAuth.js.

| Field | Type | Attributes |
| ----- | ---- | ---------- |
| `id` | String | PRIMARY KEY |
| `userId` | Int | FOREIGN KEY → User.id, NOT NULL, INDEXED |
| `type` | String | NOT NULL (oauth/credentials) |
| `provider` | String | NOT NULL (google/github/credentials) |
| `providerAccountId` | String | NOT NULL |
| `refresh_token` | Text | NULLABLE |
| `access_token` | Text | NULLABLE |
| `expires_at` | Int | NULLABLE (Unix timestamp) |
| `token_type` | String | NULLABLE |
| `scope` | String | NULLABLE |
| `id_token` | Text | NULLABLE |
| `session_state` | String | NULLABLE |

**Relationships:**

- Many Accounts → One User (n:1)

**Indexes:** `userId`  
**Unique Constraints:** `provider + providerAccountId`  
**Cascade:** ON DELETE CASCADE (delete account when user deleted)

### Session

**Description:** Active user sessions for multi-device support. Used when not using JWT-only strategy.

| Field | Type | Attributes |
| ----- | ---- | ---------- |
| `id` | String | PRIMARY KEY |
| `sessionToken` | String | UNIQUE, NOT NULL, INDEXED |
| `userId` | Int | FOREIGN KEY → User.id, NOT NULL, INDEXED |
| `expires` | DateTime | NOT NULL |

**Relationships:**

- Many Sessions → One User (n:1)

**Indexes:** `userId`, `sessionToken`  
**Cascade:** ON DELETE CASCADE (delete session when user deleted)

### VerificationToken

**Description:** Tokens for email verification and password reset flows.

| Field | Type | Attributes |
| ----- | ---- | ---------- |
| `identifier` | String | NOT NULL (email/phone) |
| `token` | String | UNIQUE, NOT NULL |
| `expires` | DateTime | NOT NULL |

**Unique Constraints:** `identifier + token`

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
