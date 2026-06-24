# Mock Implementation Guide

This document explains the mocking strategy for offline development and testing.

## Overview

The application uses **Mock Prisma** to enable complete offline development without a database connection. All Prisma queries are intercepted at the data layer and return sample data.

---

## Architecture

### Single-Layer Mocking: Mock Prisma Only

**What it intercepts:**

- Server component Prisma queries
- API route Prisma queries  
- All database operations throughout the application

**Location:** [src/mocks/mockPrisma.ts](src/mocks/mockPrisma.ts)

**Benefits:**

- ✅ API routes execute with full business logic (validation, transformations, error handling)
- ✅ Server components work as expected
- ✅ Single source of truth for mock data
- ✅ Better test coverage (tests actual application code, not just mocks)
- ✅ No duplication between mocks and real implementation
- ✅ Simpler architecture (one mocking layer instead of two)

---

## How It Works

### 1. Conditional Prisma Export

[src/lib/prisma.ts](src/lib/prisma.ts) checks the environment variable:

```typescript
const isMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

if (isMockingEnabled) {
  // Use Mock Prisma (no database connection)
  const { mockPrisma } = require("@/mocks/mockPrisma");
  prisma = mockPrisma as PrismaClient;
} else {
  // Use Real Prisma (database connection required)
  prisma = new PrismaClient({ adapter, log: [...] });
}

export default prisma;
```

### 2. Application Flow with Mocking

#### Server Components

- imports prisma from @/lib/prisma
- gets mockPrisma
- prisma.form.findMany()
- returns sample data
- no database connection made

#### Client Components

- fetch('/api/forms', { method: 'POST' })
- API Route Handler runs
  - validation (CreateFormSchema)
  - Business logic (generateUniqueSlug, toSlug)
  - Error handling
  - imports prisma from @/lib/prisma
  - prisma.form.create() → mockPrisma
- returns real API response with mock data

**Key Point:** Unlike MSW which bypasses API routes, Mock Prisma lets API routes run completely, testing all your application logic.

---

## Sample Data Files

All mock data is centralized in simple TypeScript files:

| File | Purpose | Count |
| ---- | ------- | ----- |
| [src/mocks/data/sampleFormsList.ts](src/mocks/data/sampleFormsList.ts) | Dashboard forms | 10 forms |
| [src/mocks/data/sampleForms.ts](src/mocks/data/sampleForms.ts) | Form builder config | 1 form with 10 blocks |
| [src/mocks/data/sampleSubmissions.ts](src/mocks/data/sampleSubmissions.ts) | Form submissions | 20 submissions |

## Mocked Prisma Methods

The Mock Prisma client implements only the methods actually used in the application:

### Form Model

- `findMany()` - Dashboard form list
- `findUnique()` - Builder and reports
- `findFirst()` - API route lookups
- `create()` - Form creation
- `update()` - Form updates
- `updateMany()` - Analytics counters
- `delete()` - Form deletion
- `count()` - Statistics

### FormSubmission Model

- `findMany()` - Reports page
- `create()` - Form submission

### FormBlock Model (for transactions)

- `findMany()` - Block lookups
- `update()` - Block updates
- `create()` - Block creation
- `deleteMany()` - Block deletion

### FormFieldResponse Model

- `count()` - Validation

### User Model

- `findFirst()` - User lookup for forms
- `count()` - Statistics

### Utilities

- `$queryRaw()` - Raw SQL queries (test page)
- `$transaction()` - Complex operations
- `$disconnect()` - Cleanup

---

## Enabling/Disabling Mocks

### Enable Mocking (Offline Development)

Create `.env.local` or `.env.development`:

```bash
NEXT_PUBLIC_API_MOCKING=enabled
```

**What happens:**

- No database connection needed
- Works completely offline
- Fast development with consistent data
- All API routes execute normally
- Changes are not persisted

### Disable Mocking (Real Database)

Remove or comment out the variable:

```bash
# NEXT_PUBLIC_API_MOCKING=enabled
DATABASE_URL="postgres://user:password@localhost:5432/database"
```

**What happens:**

- Real database queries
- Data persistence
- Full production behavior
- Requires database connection
- Slower than mocks

---

## Verification

### 1. Check Console Logs

**With mocking enabled:**

- [Prisma] Using Mock Prisma Client (no database connection)
- [Mock Prisma] form.findMany called with: {...}
- [Mock Prisma] form.create called with: {...}

**With mocking disabled:**

- [Prisma] Using Real Prisma Client
- prisma:query SELECT "Form"."id", "Form"."slug" FROM "Form"

### 2. Check Network Tab

**With mocking:**

- API routes still execute normally
- Responses contain mock data
- Response times are fast and consistent

**Without mocking:**

- API routes query real database
- Variable response times
- Real data in responses

### 3. Check Database

**With mocking:**

- No connections to PostgreSQL
- Can disconnect database completely
- Works without `DATABASE_URL`

**Without mocking:**

- Active PostgreSQL connections
- Queries logged in database
- Requires valid `DATABASE_URL`

---

## Testing Benefits

### Unit Tests

```typescript
import { POST } from '@/app/api/forms/route';
import { mockPrisma } from '@/mocks/mockPrisma';

test('creates form with validation', async () => {
  const request = new NextRequest('http://localhost/api/forms', {
    method: 'POST',
    body: JSON.stringify({ title: 'Test Form' })
  });
  
  const response = await POST(request);

});
```

**Benefits:**

- Tests actual API route
- Tests CreateFormSchema validation
- Tests generateUniqueSlug logic
- Tests error handling
- Uses Mock Prisma for data layer

### E2E Tests

```typescript
test('user creates form through UI', async ({ page }) => {
  await page.goto('/forms');
  await page.click('text=Create Form');
  await page.fill('[name="title"]', 'My Form');
  await page.click('text=Save');

});
```

**Benefits:**

- Tests full user flow
- Tests UI interactions
- Tests API route execution
- Tests business logic
- Uses Mock Prisma (no real database needed)

---

## Extending Mocks

### Add New Prisma Query

If you add a new Prisma query in your code:

```typescript
// In your application
const recentForms = await prisma.form.findMany({
  take: 5,
  orderBy: { createdAt: 'desc' }
});
```

Add it to mockPrisma.ts:

```typescript
// src/mocks/mockPrisma.ts
export const mockPrisma = {
  form: {
    findMany: async (args?: any) => {
      console.log("[Mock Prisma] form.findMany called with:", args);
      
      // Handle take/limit
      const limit = args?.take || sampleFormList.length;
      
      // Return limited results
      return sampleFormList.slice(0, limit).map(form => ({
        // ... transform data
      }));
    },
    // ... other methods
  },
};
```

### Add New Sample Data

Create new sample data files as needed:

```typescript
// src/mocks/data/sampleUsers.ts
export const sampleUsers = [
  { id: "user-001", email: "user1@example.com", name: "User One" },
  { id: "user-002", email: "user2@example.com", name: "User Two" },
];
```

---

## Production Safety

**Mocks are automatically disabled in production:**

1. Environment variable is not set in production
2. `NEXT_PUBLIC_API_MOCKING` is client-side only
3. Real Prisma client is always used in production builds
4. No mock code is bundled in production

**Verification:**

```bash
# Build for production
npm run build

# Check - no mock logs should appear
npm start
```

---

## Troubleshooting

### Issue: Mocks not working

**Check:**

1. Is `NEXT_PUBLIC_API_MOCKING=enabled` set?
2. Did you restart the dev server after changing env vars?
3. Check terminal for `[Prisma] Using Mock Prisma Client`
4. Check if mockPrisma has the method you're calling

### Issue: Prisma method not found

**Solution:**
Add the missing method to mockPrisma.ts. Check the console error to see which method is missing:

```typescript
// Error: prisma.form.findFirstOrThrow is not a function

// Add to mockPrisma.ts:
form: {
  findFirstOrThrow: async (args?: any) => {
    const result = await mockPrisma.form.findFirst(args);
    if (!result) throw new Error('Record not found');
    return result;
  },
}
```

### Issue: TypeScript errors

**Solution:**
Mock Prisma uses `any` types by design (disabled with eslint comment). If you need type safety, cast responses:

```typescript
const form = await prisma.form.findUnique({ where: { slug } }) as FormConfig;
```

### Issue: Transaction not working

**Solution:**
The mock `$transaction` passes mockPrisma itself as the transaction client. Make sure your transaction callback uses the `tx` parameter:

```typescript
// ✅ Correct
await prisma.$transaction(async (tx) => {
  await tx.form.update(...);
  await tx.formBlock.create(...);
});

// ❌ Wrong - uses prisma instead of tx
await prisma.$transaction(async (tx) => {
  await prisma.form.update(...);  // Should be tx.form
});
```

---

## Comparison with MSW

| Feature | Mock Prisma Only | Mock Prisma + MSW |
| ------- | ---------------- | ----------------- |
| API routes execute | ✅ Yes | ❌ No (bypassed) |
| Business logic tested | ✅ Yes | ❌ No |
| Validation tested | ✅ Yes | ❌ No |
| Error handling tested | ✅ Yes | ❌ No |
| Maintenance | ✅ Simple | ❌ Complex |
| Duplication | ✅ None | ❌ High |
| Test realism | ✅ High | ❌ Low |

**Conclusion:** Mock Prisma alone provides better test coverage and simpler architecture.

---

## Summary

- **Single-layer mocking** - Mock Prisma handles everything
- **Complete offline development** - No database needed
- **Tests real code** - API routes execute with full logic
- **Production safe** - Automatically disabled
- **Maintainable** - Single source of truth
- **Type-safe** - Uses existing TypeScript interfaces
- **Simple** - One mocking strategy instead of two

For questions or issues, see the [Troubleshooting](#troubleshooting) section above.
