# Database Setup and Management

## Database Options

Choose the database option that fits your use case:

| Option | Best For | Persistence | Setup Time |
| ------ | -------- | ----------- | ---------- |
| **Local PostgreSQL** | Solo development, offline work | Persistent | 5-10 min |
| **Prisma Dev** | Quick prototyping, testing | Ephemeral | 10 seconds |
| **Prisma Cloud** | Team collaboration, staging | Persistent | 1-2 min |
| **Other Cloud** | Production, advanced features | Persistent | 2-5 min |

**Quick Guide:** Solo offline development → Local PostgreSQL | Quick prototyping → Prisma Dev | Team collaboration or production → Cloud

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

### Option B: Prisma Dev (Ephemeral)

**⚠️ Data deleted when stopped. For prototyping only.**

```bash
# Terminal 1: Start ephemeral database
npx prisma dev

# Terminal 2: Wait 5 seconds, then run
npx prisma generate
npx prisma db push
```

**Note:** Keep Terminal 1 running. No `.env` setup needed—`DATABASE_URL` is set automatically.

### Option C: Prisma Cloud

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

### Option D: Other Cloud (Supabase, Railway, Neon)

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
npx prisma db seed               # Seed database with sample data (users, forms, submissions)
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

**Prisma Dev connection timeout:**

```bash
# Wait 5-10 seconds after starting npx prisma dev
# Use npx prisma db push instead of migrate
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
# Check if database is connected
curl http://localhost:3000/api/health

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
