# Form Kit - A Visual DnD Form Editor

View Demo: [https://my-formkit-ui.netlify.app](https://my-formkit-ui.netlify.app/)

## Overview

The application is crafted using `Next.js` and `React` to build scalable and reusable components.

- Components are categorised for reusability and scalability.
  - **Builder**: Page-specific components for the form builder consisting of
    - Form Builder Container
    - Widget Panel (drag-and-drop component palette)
    - Canvas (drag-drop area with device preview)
    - Configuration Panel (form/block property editor)
    - Form Builder Header
  - **Form Blocks**: Renderable form components (Input, Checkbox, Textarea, etc.) displayed on the canvas.
  - **Block Configs**: Configuration components for editing block properties in the Configuration Panel.
  - **UI**: Primitive components (Button, Input, Select, etc.) used across the application.
  - **Layout**: Wrapper components for consistent page structure.
  - **Dashboard**: Components for the main dashboard (FormCard, FormGrid, etc.).
- **TailwindCSS** has been used maintaining styling of multiple components.
  - A set of commonly used colors.
  - Dark and Light themed classes.
- Optimised performance to minimise redundant re-renders and computations, by managing
  - In-build `useMemo` and `useCallback` hooks.
  - Selector-based `zustand` stores (states and actions).
- **Semantic HTML** to promote SEO and accessibility.
- Multiple animated components using `Framer motion`.

## Features Implemented

As per given requirements

- **Form Builder Container**
  - The main container that wraps all the components related to form building.
  - Renders the form with prefilled data fetched from API if an `id` is provided. Otherwise, renders an empty form.
- **Widget Panel**
  - Widgets are grouped under categories (Input Fields, Content, Layout).
  - Every category can be collapsed/expanded by a caret icon next to category heading.
  - Search bar input at the top to get filtered results by widget or category name.
  - Any widget can be dragged and dropped to the Canvas (with keyboard a11y).
- **Canvas**
  - A list of dropped widgets, rendered as Form Blocks.
  - Each Form Block has the following capabilities:
    - **Select** to edit properties (shown in Configuration Panel).
    - **Rearrange** their position within the list (with keyboard a11y).
    - **Copy** to duplicate blocks quickly (unavailable on error state).
    - **Delete** the block from canvas.
  - A Device Selector toolbar can be used to toggle between desktop, tablet, and mobile views for responsive preview.
- **Configuration Panel**
  - Form Configuration is shown by default, to update:
    - **Form Title** (changes are reflected on the Form Builder Header).
    - **Theme** (changes reflected on the Canvas).
  - Block Configuration is shown once a block has been selected from the Canvas:
    - A list of editable properties specific to the selected block type.
    - Every property has validation checks (implemented with `zod`) which will reflect error messages below and error state on the selected block.
- **Form Builder Header**
  - Toggle buttons to expand and collapse both sidebars.
  - Form title at the center configured via Configuration Panel.
  - Publish and Preview buttons (currently for presentation purposes).

## Tech Stack and Rationale

- **Next.js 15**: Robust web application framework for routing, CSR/SSR, and static site generation.
- **React 19**: Modern UI development library for reusable components.
- **TypeScript**: Ensures strong typing for props, state, and domain models, reducing runtime errors.
- **MSW**: Mock HTTP requests during development without external services.
- **Zustand**: Lightweight state management alternative to `Redux` with simplicity and ease of use.
- **TailwindCSS v4**: Utility-first styling with theme tokens and responsive support.
- **Radix UI Primitives**: Accessible, unstyled components for building complex UI.
- **Zod**: Type-safe client-side validation.
- **Framer Motion**: Animations for drag-and-drop and other UI feedback.
- **Class Variance Authority (CVA)**: Manage component variants and styling combinations in a type-safe and reusable way.
- **Lucide React**: Lightweight, modern SVG icon library for clean, scalable icons.

## File Structure

```text
form-editor-tool/
├─ src/
│  ├─ app/                      # App-router directory
│  │  ├─ forms/                 # Forms routes
│  │  │  ├─ layout.tsx          # Forms layout
│  │  │  ├─ [formId]/           # Dynamic form editor route
│  │  │  └─ new/                # New form creation route
│  │  ├─ page.tsx               # Main dashboard page
│  │  ├─ layout.tsx             # Root layout
│  │  └─ globals.css            # Global styles with Tailwind and CSS variables
│  ├─ components/
│  │  ├─ builder/               # Form builder components
│  │  │  ├─ canvas/             # Canvas drag-drop components
│  │  │  ├─ configuration/      # Configuration panel components
│  │  │  └─ widgets/            # Widget palette components
│  │  ├─ dashboard/             # Dashboard page components
│  │  ├─ form/                  # Form rendering components
│  │  │  ├─ blocks/             # Block components (Input, Checkbox, etc.)
│  │  │  └─ configs/            # Block configuration components
│  │  ├─ layout/                # Layout wrapper components
│  │  └─ ui/                    # Primitive UI components (Button, Input, etc.)
│  ├─ lib/
│  │  ├─ constants/             # App constants (themes, styles, templates)
│  │  ├─ hooks/                 # Custom React hooks
│  │  ├─ providers/             # Context providers (MSW, etc.)
│  │  ├─ schema/                # Zod validation schemas
│  │  ├─ stores/                # Zustand state management
│  │  ├─ types/                 # TypeScript type definitions
│  │  └─ utils/                 # Utility functions
│  └─ mocks/
│     ├─ data/                  # Mock data (sample forms)
│     ├─ handlers.ts            # MSW request handlers
│     ├─ browser.ts             # MSW browser worker
│     └─ index.ts               # Mock exports
├─ public/
│  └─ mockServiceWorker.js      # MSW service worker
├─ instructions/                 # Project documentation
├─ screenshots/                  # Screenshots for README
└─ [config files]               # Next.js, TypeScript, ESLint, Tailwind configs
```

## Setup Instructions

1. **Prerequisites**
   - Node.js 18+ (recommended 20+)
   - npm 9+

2. **Install dependencies**

   ```bash
     npm install
   ```

3. **Setup environment variables**
   Copy the `.env.sample` file into `.env.development` and update the environment variables to enable `MSW`.

   ```bash
     NEXT_PUBLIC_API_MOCKING=enabled
   ```

4. **Start development server**

   ```bash
     npm run dev
   ```

   Open the your browser at `http://localhost:3000/`.

5. **Build for production server (Optional)**

   ```bash
     npm run build && npm run start
   ```

6. **Linting codebase (Optional)**

   ```bash
     npm run lint
   ```

## Future Improvements

### High Priority - Architecture & Refactoring

- **Dashboard Enhancement**: Build form management dashboard with metrics
  - Form cards with title, status, and thumbnails
  - Display metrics: total input widgets, submission count
  - Create new form button
- **Modal System**: Add Dialog/Modal components for user interactions
  - Preview modal for testing working forms
  - Success modal showing form submission data
  - Error modal displaying validation failures
- **Notification System**: Implement Toast notifications for user feedback
  - Success/error messages for save, publish, delete actions
  - Real-time feedback for widget operations
- **Loading States**: Add comprehensive loading indicators
  - Skeleton loaders for form data fetching
  - Spinner components for async operations
  - Loading states for all user actions
- **Preview Mode**: Implement functional preview functionality
  - Render working form in modal popup
  - Enable form submission with validation
  - Display success/error results with data
- **Form Lifecycle Management**: Implement save/discard/publish workflow
  - Save draft (persist to backend/localStorage)
  - Discard changes (revert to last saved version)
  - Publish form (validate + make public)
  - Track form status (draft vs published)
- **Type Definition Updates**: Revise core type structures
  - `Widget` types (replacing FormField)
  - `Form` types with status and timestamps
  - `FormMetrics` for dashboard
  - `SubmissionResult` for preview validation

### Medium Priority - Features & Functionality

- **Form State Management**: Add form status tracking
  - Draft vs Published states
  - Version control for forms
  - Timestamps (createdAt, updatedAt, publishedAt)
- **Auto-Save**: Implement automatic draft saving
  - Periodic auto-save to backend/localStorage
  - "Last saved" timestamp indicator
  - Conflict resolution for simultaneous edits
- **Submission Validation**: Add client-side form validation
  - Required field checks
  - Pattern validation (email, URL, etc.)
  - Custom validation rules per widget type
- **Success/Error Handling**: Enhanced error states
  - Form-level error messages
  - Widget-level validation errors
  - Network error recovery
- **MSW Organization**: Restructure mock handlers by feature
  - `/handlers/forms.ts` for form CRUD
  - `/handlers/submissions.ts` for submission endpoints
  - Organized handler exports
- **API Client Layer**: Create API wrapper functions
  - `lib/api/forms.ts` for form operations
  - `lib/api/submissions.ts` for submission handling
  - Centralized error handling
- **Metrics Calculation**: Implement form analytics
  - Count input widgets dynamically
  - Track submission statistics
  - Display form engagement metrics

### Low Priority - Advanced Features

- **Layout Widgets**: Add container components for nested structures
  - Group widget (flex-based container)
  - Column widget (multi-column layout)
  - Nested drag-and-drop support
  - Updated data store for hierarchical widgets
- **Form Versioning**: Track and manage form versions
  - Version history
  - Restore previous versions
  - Compare version differences
- **Form Analytics Dashboard**: Advanced metrics and insights
  - Submission trends over time
  - Field completion rates
  - Drop-off analysis
- **Form Templates**: Pre-built form templates
  - Contact forms, surveys, registration forms
  - Custom template creation
  - Template marketplace/gallery

### Existing Planned Improvements

- **Real data & actions**: Integrate API calls via `REST` or `GraphQL` from a backend service.
- **Persisted preferences**: Save `theme` and `form layout` preferences in `localStorage` for a consistent experience across sessions.
- **Testing**: Implement unit tests with `Vitest + React Testing Library` and end-to-end/integration tests with `Playwright`.
- **Form Listing**: Introduce `React Query` for fetching and displaying multiple forms from the server, as the project scales.
- **Performance Optimization**: Further optimize performance through lazy loading, caching strategies, and more efficient rendering techniques.

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
