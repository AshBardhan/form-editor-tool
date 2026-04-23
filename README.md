# Form Kit - A Visual DnD Form Editor

View Demo: [https://my-formkit-ui.netlify.app](https://my-formkit-ui.netlify.app/)

## Overview

The application is crafted using `Next.js` and `React` to build scalable and reusable components.

- Components are categorised for reusability and scalability.
  - **Builder**: Page-specific components for the form builder consisting of
    - Form Builder Container - Main wrapper managing form state and data fetching
    - Widget Panel - Drag-and-drop component palette with search and categorization
    - Canvas - Drag-drop area with device preview and block management
    - Configuration Panel - Form/block property editor with real-time validation
    - Form Builder Header - Header with sidebar toggles and action buttons
  - **Dashboard**: Components for the main landing page
  - **Preview**: Components for form preview mode
  - **Form Blocks**: Renderable form components displayed on the canvas
  - **Block Configs**: Configuration components for editing block properties
  - **UI**: Primitive components (Button, Input, Select, etc.) used across the application
    - 15+ reusable UI primitives built with Radix UI and Tailwind CSS
  - **Layout**: Wrapper components for consistent page structure
- **TailwindCSS** has been used maintaining styling of multiple components.
  - A set of commonly used colors and design tokens.
  - Dark and Light themed classes with CSS variables.
  - Responsive utilities for all device sizes.
- Optimised performance to minimise redundant re-renders and computations, by managing
  - In-build `useMemo` and `useCallback` hooks.
  - Selector-based `zustand` stores (states and actions).
  - Component composition patterns.
- **Semantic HTML** to promote SEO and accessibility.
- Multiple animated components using `Framer motion` library.
- **TypeScript** for type safety across the entire codebase.

## Features Implemented

As per given requirements

- **Dashboard**
  - Main landing page displaying all forms in a grid layout.
  - Form cards showing form title, description, and status badges.
  - Create new form button to start building.
  - Responsive grid adapting to different screen sizes.
- **Form Builder Container**
  - The main container that wraps all the components related to form building.
  - Renders the form with prefilled data fetched from API if an `id` is provided. Otherwise, renders an empty form.
  - Supports creating new forms at `/forms/new` route.
  - Supports editing existing forms at `/forms/[formId]` route.
- **Widget Panel**
  - Widgets are grouped under categories (Input Fields, Content, Layout).
  - Every category can be collapsed/expanded by a caret icon next to category heading.
  - Search bar input at the top to get filtered results by widget or category name.
  - Any widget can be dragged and dropped to the Canvas (with keyboard a11y).
  - Supports 11 different widget types: Input, Textarea, Select, Checkbox, Radio, Button, Buttons Group, Heading, Paragraph, and Separator.
- **Canvas**
  - A list of dropped widgets, rendered as Form Blocks.
  - Each Form Block has the following capabilities:
    - **Select** to edit properties (shown in Configuration Panel).
    - **Rearrange** their position within the list (with keyboard a11y).
    - **Copy** to duplicate blocks quickly (unavailable on error state).
    - **Delete** the block from canvas.
  - A Device Selector toolbar can be used to toggle between desktop, tablet, and mobile views for responsive preview.
  - Real-time validation with error state indicators.
- **Configuration Panel**
  - Form Configuration is shown by default, to update:
    - **Form Title** (changes are reflected on the Form Builder Header).
    - **Theme** (changes reflected on the Canvas).
  - Block Configuration is shown once a block has been selected from the Canvas:
    - A list of editable properties specific to the selected block type.
    - Every property has validation checks (implemented with `zod`) which will reflect error messages below and error state on the selected block.
    - Supports 5 different configuration types: Input Config, Checkbox Config, Select Config, List Config (Radio/Select), and Long Text Config (Textarea).
- **Form Builder Header**
  - Toggle buttons to expand and collapse both sidebars.
  - Form title at the center configured via Configuration Panel.
  - Preview button navigating to preview mode.
  - Publish button (currently for presentation purposes).
- **Form Preview Mode**
  - Dedicated preview routes for both new and existing forms.
  - Full-screen preview of the form as end-users would see it.
  - Renders all form blocks as functional form elements.
  - Preview header with back navigation and form title.
  - Supports all device modes (desktop, tablet, mobile).
- **State Management**
  - Zustand stores for form data, form configuration, UI state, and validation.
  - Optimized selector-based subscriptions to minimize re-renders.
  - Separate stores for different concerns (separation of concerns pattern).
- **Data Fetching**
  - MSW (Mock Service Worker) for API mocking during development.
  - Custom `useFetch` hook for data fetching with loading and error states.
  - Sample forms data for testing and demonstration.

## Tech Stack and Rationale

- **Next.js 15**: Robust web application framework for routing, CSR/SSR, and static site generation with App Router.
- **React 19**: Modern UI development library for reusable components with latest features.
- **TypeScript**: Ensures strong typing for props, state, and domain models, reducing runtime errors.
- **MSW**: Mock HTTP requests during development without external services for realistic API simulation.
- **Zustand**: Lightweight state management alternative to `Redux` with simplicity and ease of use.
- **TailwindCSS v4**: Utility-first styling with theme tokens and responsive support.
- **@dnd-kit**: Modern drag-and-drop toolkit for React with accessibility features.
- **Radix UI Primitives**: Accessible, unstyled components for building complex UI (Slot component).
- **Zod**: Type-safe client-side validation with schema-based approach.
- **Framer Motion**: Animations for drag-and-drop and other UI feedback.
- **Class Variance Authority (CVA)**: Manage component variants and styling combinations in a type-safe and reusable way.
- **Lucide React**: Lightweight, modern SVG icon library for clean, scalable icons.

## Application Routes

The application uses Next.js App Router with the following route structure:

- **`/`** - Dashboard/Home page
  - Displays all forms in a responsive grid
  - "Create New Form" button to start building
  - Form cards with title, description, and status
- **`/forms/new`** - New form builder
  - Empty canvas to create a new form from scratch
  - Full form builder interface with all features
- **`/forms/[formId]`** - Edit existing form
  - Loads form data from API (via MSW)
  - Edit and modify existing form blocks
  - Same builder interface as new form
- **`/forms/new/preview`** - Preview new form
  - Preview the form being created
  - Full-screen preview mode
  - Functional form elements
- **`/forms/[formId]/preview`** - Preview existing form
  - Preview saved form
  - Read-only view of the form
  - Test form interactions

## Key Design Decisions

### State Management

- **Zustand Stores**: 4 separate stores for different concerns
  - `formDataStore` - Form blocks and data
  - `formConfigStore` - Form metadata (title, theme)
  - `UIStateStore` - UI state (device mode, sidebar visibility)
  - `formBlockValidationStore` - Validation errors per block
- **Selector Pattern**: Used throughout to minimize re-renders
- **Immutable Updates**: State updates follow immutability patterns

### Component Architecture

- **Composition over Inheritance**: Components built using composition patterns
- **Separation of Concerns**: Clear separation between presentational and container components
- **Single Responsibility**: Each component has a focused responsibility
- **Reusability**: UI primitives shared across the application

### Validation Strategy

- **Zod Schemas**: Type-safe validation schemas for each block type
- **Real-time Validation**: Validation on every configuration change
- **Error Display**: Context-aware error messages below each field
- **Visual Feedback**: Error states reflected in block UI

### Performance Optimizations

- **Memoization**: Strategic use of `useMemo` and `useCallback`
- **Selective Re-renders**: Zustand selectors prevent unnecessary renders
- **Code Organization**: Logical grouping reduces bundle size
- **Lazy Imports**: Dynamic imports for heavy components (where applicable)

## File Structure

```text
form-editor-tool/
├─ src/
│  ├─ app/                           # App-router directory
│  │  ├─ forms/                      # Forms routes
│  │  │  ├─ [formId]/                # Dynamic form editor route
│  │  │  └─ new/                     # New form creation route
│  │  ├─ page.tsx                    # Main dashboard page
│  │  ├─ layout.tsx                  # Root layout
│  │  └─ globals.css                 # Global styles
│  ├─ components/
│  │  ├─ builder/                    # Form builder components
│  │  │  ├─ canvas/                  # Canvas drag-drop components
│  │  │  ├─ configuration/           # Configuration panel
│  │  │  └─ widgets/                 # Widget palette
│  │  ├─ dashboard/                  # Dashboard components
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
│  │  ├─ schema/                     # Zod validation schemas
│  │  ├─ stores/                     # Zustand state management
│  │  ├─ types/                      # TypeScript type definitions
│  │  └─ utils/                      # Utility functions
│  └─ mocks/
│     ├─ data/                       # Mock data (sample forms)
│     ├─ handlers.ts                 # MSW request handlers
│     └─ browser.ts                  # MSW browser worker
├─ public/
│  └─ mockServiceWorker.js           # MSW service worker
├─ instructions/                      # Project documentation
├─ screenshots/                       # Screenshots for README
├─ .env.sample                        # Environment variables template
└─ [config files]                     # Next.js, TypeScript, ESLint, Tailwind configs
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
   cp .env.sample .env.development
   ```

   Update `.env.development`:

   ```bash
   NEXT_PUBLIC_API_MOCKING=enabled
   ```

   For production, create `.env.production`:

   ```bash
   NEXT_PUBLIC_API_MOCKING=disabled
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

### High Priority - User Experience & Features

- **Modal System**: Add Dialog/Modal components for user interactions
  - Success modal showing form submission data
  - Error modal displaying validation failures
  - Confirmation dialogs for delete operations
- **Notification System**: Implement Toast notifications for user feedback
  - Success/error messages for save, publish, delete actions
  - Real-time feedback for widget operations
  - Auto-dismissing notifications
- **Loading States**: Add comprehensive loading indicators
  - Skeleton loaders for form data fetching (currently implemented for dashboard)
  - Spinner components for async operations
  - Loading states for all user actions
- **Form Submission**: Implement functional form submission
  - Enable form submission with validation in preview mode
  - Display success/error results with submitted data
  - Form data collection and processing
- **Form Lifecycle Management**: Implement save/discard/publish workflow
  - Save draft (persist to backend/localStorage)
  - Discard changes (revert to last saved version)
  - Publish form (validate + make public)
  - Track form status (draft vs published)
  - Auto-save functionality with periodic saves
  - "Last saved" timestamp indicator

### Medium Priority - Backend Integration & Data

- **Real Backend Integration**: Connect to actual backend service
  - Replace MSW with real API calls via `REST` or `GraphQL`
  - Implement authentication and authorization
  - Handle real-time data synchronization
- **Form State Management**: Add advanced form status tracking
  - Draft vs Published states
  - Version control for forms
  - Timestamps (createdAt, updatedAt, publishedAt)
  - Conflict resolution for simultaneous edits
- **API Client Layer**: Create API wrapper functions
  - `lib/api/forms.ts` for form CRUD operations
  - `lib/api/submissions.ts` for submission handling
  - Centralized error handling and retries
  - Request/response interceptors
- **MSW Organization**: Restructure mock handlers by feature
  - `/handlers/forms.ts` for form CRUD
  - `/handlers/submissions.ts` for submission endpoints
  - Better organized handler exports
- **Persisted Preferences**: Save user preferences
  - Save `theme` preferences in `localStorage`
  - Save `device mode` preferences
  - Save sidebar collapse/expand states
  - Form layout preferences across sessions

### Medium Priority - Analytics & Metrics

- **Dashboard Metrics**: Implement form analytics
  - Display total input widgets count per form
  - Track submission statistics
  - Show form engagement metrics
  - Last modified timestamps
- **Form Analytics**: Advanced metrics and insights
  - Submission trends over time
  - Field completion rates
  - Drop-off analysis
  - Popular form types

### Low Priority - Advanced Features

- **Layout Widgets**: Add container components for nested structures
  - Group widget (flex-based container)
  - Column widget (multi-column layout)
  - Nested drag-and-drop support
  - Updated data store for hierarchical widgets
- **Form Versioning**: Track and manage form versions
  - Version history with changes log
  - Restore previous versions
  - Compare version differences
  - Branch and merge forms
- **Form Templates**: Pre-built form templates
  - Contact forms, surveys, registration forms
  - Custom template creation and sharing
  - Template marketplace/gallery
  - Template categories and search
- **Advanced Validation**: Enhanced validation capabilities
  - Conditional validation rules
  - Cross-field validation
  - Custom validation functions
  - Async validation (API-based checks)
- **Internationalization**: Multi-language support
  - UI translation support
  - Form field label translations
  - RTL language support
  - Locale-specific formatting

### Code Quality & Testing

- **Testing**: Implement comprehensive test coverage
  - Unit tests with `Vitest + React Testing Library`
  - End-to-end/integration tests with `Playwright`
  - Component testing for all UI components
  - Store testing for state management
- **Performance Optimization**: Further optimize performance
  - Lazy loading for routes and components
  - Code splitting and bundle optimization
  - Caching strategies with `React Query`
  - More efficient rendering techniques
  - Virtual scrolling for large form lists
- **Accessibility Improvements**: Enhance accessibility
  - ARIA labels and roles
  - Keyboard navigation improvements
  - Screen reader support
  - Focus management
  - Color contrast compliance

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
