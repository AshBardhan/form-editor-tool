# Form Kit - A Visual DnD Form Editor
View Demo: [https://my-formkit-ui.netlify.app](https://my-formkit-ui.netlify.app/)

## Overview
The application is crafted using `Next.js` and `React` to build scalable and reusable components.
* Components are categorised for reusability and scalability.
    *   **Builder**: Page-specific components for the form builder consisting of
        *   Form Builder Container
        *   Form Component Sidebar
        *   Form Builder Canvas
        *   Form/Field Configuration Sidebar
        *   Form Builder Header
    *   **Form Field**: Components specific for Form Builder Canvas.
    *   **Field Prop**: Components specific for Field Configuration Sidebar.
    *   **UI**: Basic components being used by Form Field and Field Prop components.
    *   **Layout**: Wrapper Components used by Builder components.
*   **TailwindCSS** has been used maintaining styling of multiple components.
    *   A set of commonly used colors.
    *   Dark and Light themed classes.
*   Optimised performance to minimise redundant re-renders and computations, by managing
    *   In-build `useMemo` and `useCallback` hooks.
    *   Selector-based `zustand` stores (states and actions).
*   **Semantic HTML** to promote SEO and accessibility.
*   Multiple animated components using `Framer motion`.
    

## Features Implemented
As per given requirements
*   **Form Builder Container**
    *   The main container that wraps all the components related to form building.
    *   Renders the form with prefilled data fetched from API if an `id` is provided. Otherwise, renders an empty form.
*   **Form Component Sidebar**
    *   A list of components are grouped under categories.
    *   Every category can be collapsed/expanded by a caret icon next to category heading.
    *   Search bar input at the top to get filtered results by component or category name.
    *   Any component can be dragged and dropped to the Form Builder Canvas (with keyboard a11y).
*   **Form Builder Canvas**
    *   A list of dropped components, which are Form Field items.
    *   Each Form Field item has the following capabilities.
        *   **Select** to edit the required properties (as shown in Field Configuration Sidebar).
        *   **Rearrange** their position within the list (with keyboard a11y).
        *   **Copy** to save some form building time (unavailable on error state).
        *   **Delete** the existing item.
    *   A Device Selector toolbar can be used to toggle to check the canvas responsiveness.
*   **Form/Field Configuration Sidebar**
    *   Form Configuration is shown by default, to update
        *   **Form Title** (changes are reflected on the Form Builder Header).
        *   **Theme** (changes reflected on the Form Builder Canvas).
    *   Field Configuration is shown, once a field has been selected from Form Builder Canvas
        *   A list of editable properties are shown of the selected field.
        *   Every property has some validation check (implemented with `zod`) which will reflect error message below and error block on the selected field of canvas.
*   **Form Builder Header**
    *   Toggle buttons to expand and collapse both sidebars.
    *   Form title at the middle configured for Form/Field Configuration Sidebar.
    *   Publish and Preview buttons (just for presentation purposes).

## Tech Stack and Rationale
- **Next.js 15**: Robust web application framework for routing, CSR/SSR, and static site generation.
- **React 19**: Modern UI development library for reusable components.
- **TypeScript** – Ensures strong typing for props, state, and domain models, reducing runtime errors.
- **Vite**: Lightning-fast development builds with optimized bundling (simplifies setup for unit tests via `Vitest` in future).
- **MSW**: Mock HTTP requests during development without external services.
- **Zustand**: As an alternative to `Redux` for state management due to its simplicity and ease of use.
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
│  ├─ app                       # App-router directory
│  │  ├─ forms                  # Forms pages (/forms/new, /forms/:formId)
│  │  ├─ pages.tsx              # Main page
│  │  ├─ layout.tsx             # Main page layout
│  │  └─ global.css             # Global stylesheets with Tailwind Setup and CSS variables
│  ├─ lib/
│  │  ├─ constants              # Constants for various values
│  │  ├─ stores                 # Zustand stores for states and actions
│  │  ├─ hooks                  # Custom Hooks
│  │  ├─ utils                  # Utility functions
│  │  └─ schema                 # Zod schemas for validations
│  ├─ mocks/
│  │  ├─ handlers.ts            # MSW request handlers
│  │  └─ browser.ts             # MSW worker configuration
│  ├─ types/                    # Type definitions
│  ├─ components/
│  │  ├─ builder                # Builder page-specific components
│  │  ├─ form-field             # Form Field-specific components
│  │  ├─ field-prop             # Field Property-specific components
│  │  ├─ layout                 # Generic Layout wrapper components
│  │  └─ ui                     # Primitive UI components (Button, Input, etc.)
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
    Open the your browser at http://localhost:3000/.

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

- ✅ **Route Restructuring**: Migrated from `/builder` routes to `/forms` for RESTful structure
  - `/forms/new` → Create new form (empty builder)
  - `/forms/:formId` → Edit existing form (prefilled builder)
- **Terminology Standardization**: Rename ambiguous terms for clarity
  - `form-field` → `widgets` (dropped components in canvas)
  - `field-prop` → `property-editors` (configuration inputs)
  - Component → Widget (to distinguish from React components)
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

### Proposed File Structure

```text
form-editor-tool/
├── public/
│   └── mockServiceWorker.js
│
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── layout.tsx                    # Root layout
│   │   ├── page.tsx                      # Dashboard (/) - Form list
│   │   ├── globals.css                   # Global styles
│   │   │
│   │   └── forms/                        # Forms feature routes
│   │       ├── layout.tsx                # Forms layout wrapper
│   │       ├── new/                      
│   │       │   └── page.tsx              # Create new form (/forms/new)
│   │       └── [formId]/
│   │           └── page.tsx              # Edit form (/forms/:formId)
│   │
│   ├── components/
│   │   ├── dashboard/                    # Dashboard-specific components
│   │   │   ├── FormCard.tsx              # Form tile with metrics
│   │   │   ├── FormGrid.tsx              # Grid layout for forms
│   │   │   ├── DashboardHeader.tsx       # Dashboard header
│   │   │   └── index.ts
│   │   │
│   │   ├── builder/                      # Form builder components
│   │   │   ├── FormBuilderContainer.tsx  # Main builder wrapper
│   │   │   ├── FormBuilderHeader.tsx     # Builder header with actions
│   │   │   ├── FormBuilderContent.tsx    # Builder layout coordinator
│   │   │   │
│   │   │   ├── widgets/                  # Widget panel (left sidebar)
│   │   │   │   ├── WidgetPanel.tsx       # Main widget sidebar
│   │   │   │   ├── WidgetPalette.tsx     # Widget categories & list
│   │   │   │   ├── WidgetCategory.tsx    # Collapsible category
│   │   │   │   ├── WidgetItem.tsx        # Draggable widget item
│   │   │   │   ├── WidgetSearch.tsx      # Search/filter widgets
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── canvas/                   # Canvas (center)
│   │   │   │   ├── FormCanvas.tsx        # Main canvas component
│   │   │   │   ├── CanvasField.tsx       # Sortable field wrapper
│   │   │   │   ├── CanvasEmptyState.tsx  # Empty canvas state
│   │   │   │   ├── CanvasDropIndicator.tsx # Drop placeholder
│   │   │   │   ├── DeviceSelector.tsx    # Device preview toolbar
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── configuration/            # Configuration panel (right sidebar)
│   │   │   │   ├── ConfigurationPanel.tsx        # Main config sidebar
│   │   │   │   ├── FormConfigurationView.tsx     # Form-level settings
│   │   │   │   ├── WidgetConfigurationView.tsx   # Widget-level settings
│   │   │   │   ├── PropertyEditor.tsx            # Generic property editor
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── preview/                  # Preview mode
│   │   │   │   ├── PreviewModal.tsx      # Preview popup modal
│   │   │   │   ├── PreviewForm.tsx       # Rendered working form
│   │   │   │   ├── SubmissionSuccessModal.tsx  # Success popup
│   │   │   │   ├── SubmissionErrorModal.tsx    # Error popup
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   ├── widgets/                      # Droppable form widgets (canvas)
│   │   │   ├── index.ts                  # Widget registry
│   │   │   │
│   │   │   ├── fields/                   # Input-based widgets
│   │   │   │   ├── TextInputWidget.tsx
│   │   │   │   ├── TextareaWidget.tsx
│   │   │   │   ├── NumberInputWidget.tsx
│   │   │   │   ├── EmailInputWidget.tsx
│   │   │   │   ├── PasswordInputWidget.tsx
│   │   │   │   ├── URLInputWidget.tsx
│   │   │   │   ├── SelectWidget.tsx
│   │   │   │   ├── RadioGroupWidget.tsx
│   │   │   │   ├── CheckboxWidget.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── content/                  # Content-based widgets
│   │   │   │   ├── HeadingWidget.tsx
│   │   │   │   ├── ParagraphWidget.tsx
│   │   │   │   ├── SeparatorWidget.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── controls/                 # Control widgets
│   │   │   │   ├── ButtonWidget.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── layouts/                  # Layout widgets (FUTURE)
│   │   │       ├── GroupWidget.tsx       # Flex container
│   │   │       ├── ColumnWidget.tsx      # Column layout
│   │   │       └── index.ts
│   │   │
│   │   ├── property-editors/             # Property inputs (config sidebar)
│   │   │   ├── TextPropertyEditor.tsx    # String input
│   │   │   ├── NumberPropertyEditor.tsx  # Number input
│   │   │   ├── LongTextPropertyEditor.tsx # Textarea
│   │   │   ├── SelectPropertyEditor.tsx  # Dropdown
│   │   │   ├── CheckboxPropertyEditor.tsx # Boolean toggle
│   │   │   ├── ListPropertyEditor.tsx    # Array editor (options)
│   │   │   └── index.ts
│   │   │
│   │   ├── ui/                           # Primitive UI components
│   │   │   ├── Avatar.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Dialog.tsx                # NEW: For modals
│   │   │   ├── Form.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── InputOTP.tsx
│   │   │   ├── Label.tsx
│   │   │   ├── RadioGroup.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Separator.tsx
│   │   │   ├── Skeleton.tsx              # NEW: Loading states
│   │   │   ├── Spinner.tsx               # NEW: Loading spinner
│   │   │   ├── Switch.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Toast.tsx                 # NEW: Notifications
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                       # Layout wrappers
│   │   │   ├── Header.tsx
│   │   │   ├── MainContent.tsx
│   │   │   ├── PageContent.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── shared/                       # Shared components
│   │       ├── LoadingState.tsx          # Generic loading
│   │       ├── ErrorState.tsx            # Generic error
│   │       ├── EmptyState.tsx            # Generic empty
│   │       └── index.ts
│   │
│   ├── lib/
│   │   ├── stores/                       # Zustand stores
│   │   │   ├── formDataStore.ts          # Form data & widgets
│   │   │   ├── uiStateStore.ts           # UI state (selection, sidebars)
│   │   │   ├── validationStore.ts        # Validation errors
│   │   │   ├── previewStore.ts           # NEW: Preview mode state
│   │   │   ├── dashboardStore.ts         # NEW: Dashboard/forms list
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/
│   │   │   ├── useFetch.ts               # Data fetching
│   │   │   ├── useFormBuilder.ts         # NEW: Builder logic
│   │   │   ├── useFormPreview.ts         # NEW: Preview logic
│   │   │   ├── useFormValidation.ts      # NEW: Validation logic
│   │   │   ├── useAutoSave.ts            # NEW: Auto-save drafts
│   │   │   └── index.ts
│   │   │
│   │   ├── constants/
│   │   │   ├── widgetPalette.ts          # Widget categories & definitions
│   │   │   ├── widgetTemplates.ts        # Default widget properties
│   │   │   ├── devicePresets.ts          # Device viewport configs
│   │   │   ├── formStatuses.ts           # NEW: draft/published states
│   │   │   └── index.ts
│   │   │
│   │   ├── schemas/                      # Zod validation
│   │   │   ├── widgetSchemas.ts          # Widget property validation
│   │   │   ├── formSchemas.ts            # Form-level validation
│   │   │   ├── submissionSchemas.ts      # NEW: Submission validation
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── widgetUtils.ts            # Widget helpers
│   │   │   ├── formUtils.ts              # Form helpers
│   │   │   ├── validationUtils.ts        # Validation helpers
│   │   │   ├── styleUtils.ts             # Style utilities
│   │   │   ├── domUtils.ts               # DOM manipulation
│   │   │   ├── keyboardUtils.ts          # Keyboard handlers
│   │   │   └── index.ts
│   │   │
│   │   └── api/                          # NEW: API client functions
│   │       ├── forms.ts                  # Forms CRUD
│   │       ├── submissions.ts            # Form submissions
│   │       └── index.ts
│   │
│   ├── types/
│   │   ├── widget.ts                     # Widget types
│   │   ├── form.ts                       # Form types
│   │   ├── dashboard.ts                  # NEW: Dashboard types
│   │   ├── submission.ts                 # NEW: Submission types
│   │   ├── api.ts                        # NEW: API response types
│   │   └── index.ts
│   │
│   ├── data/                             # Mock data
│   │   ├── sampleForms.ts                # Sample form configurations
│   │   ├── sampleFormsList.ts            # Sample forms with metrics
│   │   └── index.ts
│   │
│   └── mocks/                            # MSW
│       ├── index.ts
│       ├── browser.ts
│       └── handlers/                     # NEW: Organized handlers
│           ├── forms.ts                  # Form endpoints
│           ├── submissions.ts            # Submission endpoints
│           └── index.ts
│
├── .env.example                          # NEW: Environment template
├── .env.development                      # Development config
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

### Existing Planned Improvements

- **Real data & actions**: Integrate API calls via `REST` or `GraphQL` from a backend service.
- **Persisted preferences**: Save `theme` and `form layout` preferences in `localStorage` for a consistent experience across sessions.
- **Testing**: Implement unit tests with `Vitest + React Testing Library` and end-to-end/integration tests with `Playwright`.
- **Form Listing**: Introduce `React Query` for fetching and displaying multiple forms from the server, as the project scales.
- **Performance Optimization**: Further optimize performance through lazy loading, caching strategies, and more efficient rendering techniques.

## Screenshots

### Component Architecture
![Components Architecture](./screenshots/dnd-form-components.png)
### Desktop View
![Desktop View](./screenshots/dnd-form-default.png)
### Tablet View
![Desktop View](./screenshots/dnd-form-tablet.png)
### Mobile View
![Desktop View](./screenshots/dnd-form-mobile.png)
### Dark Mode View
![Dark Mode View](./screenshots/dnd-form-dark.png)