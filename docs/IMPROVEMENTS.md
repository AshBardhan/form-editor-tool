# Future Improvements

## High Priority

### Authentication & Authorization

- **OAuth Integration**: Add social login providers
  - Google and GitHub OAuth providers
  - Account linking for existing credential users
- **User Impersonation**: Admin support tooling
  - Impersonate any user for customer support
  - Audit log of impersonation sessions

### User Experience & Features

- **Design System Foundation**: Replace the hardwired `components/ui` layer with a tokenised system
  - Three token tiers — semantic (must change per theme), structural (optional per theme), global primitives (constant across themes)
  - Scope-neutral `--ds-*` alias contract so one component follows whichever theme scope it renders in
  - Primitive layer for behaviour and accessibility, derived layer for visual variants, compositions for surface-specific semantics
  - Adopt a headless behaviour library for `Select` / `Modal` / `DropdownMenu` / `Toast` / `Tabs` instead of hand-rolled implementations
  - Decommission `components/ui` one component at a time once every consumer has migrated
- **Theme Management**: Support independent application and form themes
  - Replace imperative `.dark` class switching with server-rendered scoped CSS variables, removing the theme flash on public forms
  - App-wide light/dark from the user's persisted preference, applied to app chrome only
  - Per-form theme selection from predefined presets, applied to the editor canvas, preview and public view only
  - Keep each form's theme configuration independent from the application theme
  - Replace the `FormTheme` light/dark enum with a preset id, so the theme set grows without a schema change
- **Modal System Enhancements**: Expand modal functionality
  - Form builder help/documentation modals
  - Widget property help tooltips
- **Form Lifecycle Management**: Improve save/discard workflow
  - Discard changes (revert to last saved version)
  - "Last saved" timestamp indicator
- **Enhanced Toast System**: Extend toast notifications
  - Action undo functionality in toasts

## Medium Priority

### Backend Integration & Data

- **Persisted Preferences**: Save user preferences across sessions
  - `theme` and `device mode` preferences (prefer a cookie or the database over `localStorage`, which reintroduces a hydration flash)
  - Sidebar collapse/expand state persistence
  - Form layout preferences

### Analytics & Metrics

- **Enhanced Analytics Dashboard**: Extend existing analytics features
  - Time-based filtering (last 7/30/90 days)
  - Export analytics data to CSV/PDF
  - Comparative analytics across multiple forms
  - Response time tracking and analysis
  - Geographic distribution of respondents
  - Real-time updates with WebSocket or polling

## Low Priority

### Advanced Features

- **Custom Form Themes**: Let users author and reuse their own form themes
  - `FormTheme` table storing a token record, plus per-form token overrides
  - Layered resolution: defaults ← preset ← form overrides
  - Token editor in the configuration panel with live canvas preview (no save round-trip)
  - Save-as-custom-theme and reset-to-preset, with ownership checks on shared themes
  - Strict allow-list validation of token values before they reach a public page, plus a contrast check so an unreadable theme cannot be published
- **Form Status Management**: Enhanced status tracking
  - Scheduled publishing (publish at specific date/time)
  - Automatic archiving after expiration date
  - Form duplication with "Copy of" naming
- **Form Versioning**: Track and manage form versions
  - Version history with changes log
  - Restore previous versions
  - Compare version differences
  - Conflict resolution for simultaneous edits
- **Layout Widgets**: Add container components for nested structures
  - Group widget (flex-based container)
  - Column widget (multi-column layout)
  - Nested drag-and-drop support
  - Updated data store for hierarchical widgets
- **Conditional Logic**: Dynamic form behavior
  - Show/hide fields based on other field values
  - Conditional validation rules
  - Branching form flows
  - Skip logic for surveys
- **Form Templates**: Pre-built form templates
  - Contact forms, surveys, registration forms
  - Custom template creation and sharing
  - Template marketplace/gallery
- **Advanced Validation**: Enhanced validation capabilities
  - Cross-field validation
  - Custom validation functions
  - Async validation (API-based checks)
- **File Upload**: Add file upload widget
  - Single/multiple file upload
  - File type and size restrictions
  - Image preview and drag-and-drop
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
  - Virtual scrolling for large form lists
- **Accessibility Improvements**: Enhance accessibility
  - ARIA labels and roles
  - Keyboard navigation improvements
  - Screen reader support
  - Focus management
  - Color contrast compliance
