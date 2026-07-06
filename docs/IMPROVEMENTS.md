# Future Improvements

## High Priority - User Experience & Features

- **Modal System Enhancements**: Expand modal functionality
  - Form builder help/documentation modals
  - Widget property help tooltips
- **Form Lifecycle Management**: Implement save/discard/publish workflow
  - Discard changes (revert to last saved version)
  - Auto-save functionality with periodic saves
  - "Last saved" timestamp indicator
- **Enhanced Toast System**: Extend toast notifications
  - Success/error messages for save, publish, delete actions
  - Real-time feedback for widget operations
  - Action undo functionality in toasts
- **Loading States**: Add comprehensive loading indicators
  - Skeleton loaders for form preview loading
  - Spinner components for async operations
  - Loading states for save/publish actions

## Medium Priority - Backend Integration & Data

- **Persisted Preferences**: Save user preferences
  - Save `theme` preferences in `localStorage`
  - Save `device mode` preferences
  - Save sidebar collapse/expand states
  - Form layout preferences across sessions

## Medium Priority - Analytics & Metrics

- **Enhanced Analytics Dashboard**: Extend existing analytics features
  - Time-based filtering for analytics (last 7/30/90 days)
  - Export analytics data to CSV/PDF
  - Comparative analytics across multiple forms
  - Response time tracking and analysis
  - Geographic distribution of respondents (if location data available)
  - Real-time dashboard updates with WebSocket or polling

## Low Priority - Advanced Features

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
- **Form Versioning**: Track and manage form versions
  - Version history with changes log
  - Restore previous versions
  - Compare version differences
  - Branch and merge forms
- **Conditional Logic**: Dynamic form behavior
  - Show/hide fields based on other field values
  - Conditional validation rules
  - Branching form flows
  - Skip logic for surveys
- **Form Templates**: Pre-built form templates
  - Contact forms, surveys, registration forms
  - Custom template creation and sharing
  - Template marketplace/gallery
  - Template categories and search
- **Advanced Validation**: Enhanced validation capabilities
  - Cross-field validation
  - Custom validation functions
  - Async validation (API-based checks)
  - Regex pattern validation
- **File Upload**: Add file upload widget
  - Single/multiple file upload
  - File type and size restrictions
  - Image preview functionality
  - Drag-and-drop file uploads
- **Internationalization**: Multi-language support
  - UI translation support
  - Form field label translations
  - RTL language support
  - Locale-specific formatting

## Code Quality & Testing

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
