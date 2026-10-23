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

- **Modal System Enhancements**: Expand modal functionality
  - Form builder help/documentation modals
  - Widget property help tooltips
- **Form Lifecycle Management**: Improve save/discard workflow
  - Discard changes (revert to last saved version)
  - "Last saved" timestamp indicator
- **Enhanced Toast System**: Extend toast notifications
  - Action undo functionality in toasts (toasts themselves ship via `AppToast` / Base UI)

## Medium Priority

### Backend Integration & Data

- **Persisted Preferences**: Save user preferences across sessions
  - Device-preview mode in the builder
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

### Form Builder

- **Custom Themes**: Let users author and reuse their own form themes
  - `CustomFormTheme` table (`tokens Json`, owned by a user) plus `Form.customThemeId`
  - Do **not** add `"custom"` to `enum PredefinedFormTheme`. `Form.theme` stays the CSS base; the custom row is a partial overlay
  - User 1→n saved themes; a theme 1→n forms (library page), not 1:1 with Form
  - `FormThemeContainer` `overrides` as inline `--form-*` (`style` wins over `[data-form-theme]`)
  - Token editor in the configuration panel with live canvas preview (no save round-trip)
  - Save-as-custom-theme and reset-to-preset, with ownership checks on `customThemeId`
  - Strict allow-list validation of token values before they reach a public page, plus a contrast check so an unreadable theme cannot be published

## Low Priority

### Advanced Features

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
  - Component testing for derived `App*` / `Form*` components
  - Store testing for state management
- **Performance Optimization**: Further optimize performance
  - Lazy loading for routes and components
  - Code splitting and bundle optimization
  - Caching strategies with `React Query`
  - Virtual scrolling for large form lists
- **Improved Design System**
  - Color contrast: meet WCAG AA for text and controls in every app and form theme
  - Keyboard a11y: focus trap, Escape to dismiss, typeahead in selects, and restore focus on close — so Select/Modal on the public form and builder stay usable without a mouse
  - Keep `/demo` until Storybook (or equivalent) exists, then retire it
