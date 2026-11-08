# Future Improvements

A backlog of planned improvements, grouped by priority and then by area. Each entry states what should change and why it matters, followed by the specific work involved.

- **High Priority**: noticeable gaps in quality or usability that affect most users today.
- **Medium Priority**: valuable additions that build on what already exists.
- **Low Priority**: larger features and long-term investments.

## High Priority

### Design & Visual Consistency

The interface has small inconsistencies in sizing, icons and typography that add up to a dated, unpolished look. These items establish shared rules so every screen looks like part of the same product.

- **Consistent Control Sizes**: Buttons, text inputs and dropdowns placed side by side should be the same height.
  - Use one size scale (small / medium / large) for height, padding and text across `AppButton`, `AppInput` and `AppSelect`. Today a large button is shorter than a large input or dropdown.
  - Controls that share a row use the same size. For example, the "Create form" button on the dashboard is currently larger than the search and filter fields next to it.
- **Consistent Icons**: Icons in the same area should share one size and one stroke width.
  - Define icon size and stroke in a shared constant instead of setting them on each icon.
  - Replace the standalone home icon in the app header with a product wordmark, or remove it. It duplicates existing navigation back to the forms list.
- **Clear Typographic Hierarchy**: Text size and weight should reflect importance.
  - Define a fixed set of text styles (title, section heading, body, metadata, caption) and use only those.
  - Status badges (Draft, Published, Archived) should look lighter than the form title they sit beside. Today they compete with it.
  - Remove one-off text-size overrides scattered across components.
- **Refreshed Visual Style**: Update the overall look so it feels current.
  - Consistent spacing rhythm, corner radius, and use of borders vs. shadows.
  - Better contrast between surfaces (page, panels, cards), driven by the existing theme tokens.

### Form Builder

The builder currently uses two permanent sidebars and drag-and-drop for every action, which takes up space and is hard to use precisely. These items follow a "do more with less" approach: the canvas stays central, and tools appear only where and when they are needed.

- **Floating Side Panels**: Replace the two sidebars at the screen edges with two panels attached to the sides of the form canvas, so tools stay close to the form on any screen size.
  - Widget palette on the left of the canvas, open by default. Form and block settings on the right, closed by default.
  - Each panel has its own floating button to open it (palette: building-blocks icon; settings: sliders icon). On desktop the buttons sit just outside the canvas's top corners; on mobile they move inside the canvas.
  - Close either panel with the X button in its top corner or the `Escape` key.
  - On wide screens both panels can be open beside the canvas. When there is room for only one, opening one closes the other.
  - On mobile, panels become sliding drawers over the canvas (palette from the left, settings from the right). Both start closed on mobile so the form is visible first. Drawers close with the X button, `Escape`, or a tap outside.
  - Clicking a widget in the palette adds it below the selected block (or at the end of the form). This is the only way to add widgets on mobile; on desktop, widgets can still be dragged onto the canvas.
  - The canvas fills the remaining height of the screen and scrolls independently of the panels.
- **Block Selection Opens Its Settings**: Clicking a block opens the settings panel (or drawer) and shows that block's settings.
  - Clicking empty canvas, pressing `Escape`, or deleting the selected block switches the panel back to form settings (title, theme, submit/reset buttons).
  - The settings panel shows which block is being edited and has a clear "Form settings" link back.
  - `Escape` closes an open panel or drawer first; pressing it again deselects the block.
- **Block Controls Outside the Block**: Move block controls off the block's content so they never cover it.
  - The drag handle sits just outside the block's left edge, and duplicate and delete sit just outside its right edge. The canvas gets side margins to fit them.
  - Controls appear when a block is hovered, selected, or focused with the keyboard.
  - Blocks are dragged only by the handle; clicking anywhere else on a block selects it. This fixes Firefox, which currently cannot tell a click from the start of a drag.
  - A small movement threshold before a drag starts, so clicking the handle doesn't trigger a drag by accident. Keyboard users can focus the handle and reorder with the arrow keys.
  - On touch screens and narrow layouts (no hover and no side space), controls appear only on the selected block, inside its top edge.
- **Remember Panel Preferences**: The builder remembers which panels were open and restores them on the next visit, saved automatically on every change.
  - Saved separately for desktop and mobile layouts on each device, since the two layouts work differently.
  - Panels appear in their saved state on load without visibly jumping into place.
- **Inline Insertion and Command Menu**: Add a block exactly where it belongs without going through the palette.
  - A "+" button appears between blocks and at the end of the form (as in Medium). Clicking it adds a block at that position.
  - The "+" opens a searchable menu of block types (as in Notion), usable with mouse or keyboard. A shortcut (`/` or `Ctrl/Cmd+K`) opens the same menu.
  - On touch screens, the "+" is always shown below the selected block.
- **Read-only Archived Forms**: Archived forms show no drag handles, block controls, "+" buttons or palette insertion, and their settings are shown read-only.

### User Experience & Features

- **Builder Onboarding**: A short, skippable walkthrough of the builder for first-time users.
  - A welcome screen with "Start tour" and "Skip".
  - Then about five hints pointing at the real interface, in order: the canvas, the widget palette, block controls, the settings panel, and preview & publish. Each shows its position ("2 of 5") with Back, Next and Skip; `Escape` also skips.
  - The tour opens whatever panel or selection it needs to point at, and restores the user's own layout when it ends.
  - Finishing or skipping is saved to the user's account automatically, so the tour doesn't reappear on other browsers or devices. Closing the page mid-tour shows it again next time.
  - A help button (question-mark icon) in the bottom-right corner of the builder replays the tour at any time.
  - The saved state records which version of the tour was seen, so a future redesign can show an updated tour once.
  - The tour does not start automatically on archived forms.
- **Builder Help**: Explain block settings without leaving the page.
  - Tooltips explaining what each block setting does.
  - The help button grows into a small menu (replay tour, keyboard shortcuts, documentation).
- **Save and Discard Workflow**: Make it clear what has been saved and allow changes to be undone.
  - "Discard changes" to revert the form to its last saved version.
  - A "Last saved" timestamp in the builder.
- **Undo from Notifications**: Let users reverse a destructive action straight from its confirmation toast (e.g. "Block deleted — Undo").

### Authentication & Authorization

- **Social Sign-in**: Let users sign in with existing accounts instead of creating a new password.
  - Google and GitHub sign-in.
  - Link a social account to an existing email/password account with the same address.
- **User Impersonation**: Let admins see the app exactly as a specific user does, to help with support requests.
  - Admins can temporarily act as any user.
  - Every impersonation session is recorded in an audit log (who, whom, when).

## Medium Priority

### User Experience & Features

- **Show Less by Default**: Review what each screen displays, rank it by importance, and show secondary information only when it is needed (on hover, expand, or in a menu).
  - Dashboard form cards: keep the title, status and one key metric visible. "Created by" and creation date become secondary.
  - Form page header: keep the main action and Preview visible. Move less frequent actions (archive, clear report, delete) into the "more" menu.
  - Block settings panel: always show the basics (label, field key, required). Put validation and advanced settings in collapsible sections.
- **User Settings Page**: A page where users can see and change their saved preferences in one place, instead of each preference only being set where it is used.
  - Default panel visibility in the builder.
  - Replay or reset the builder onboarding.
  - App theme (light/dark) and default device preview.
  - Optionally sync builder preferences across devices by storing them on the user's account instead of in the browser.

### Form Builder

- **Change Block Type**: Convert an existing block to a related type without deleting and recreating it.
  - Conversions are allowed only between related types: heading ↔ paragraph; text-style fields (short text, long text, number, email, URL, password); choice fields (radio, dropdown, checkbox group).
  - Settings both types share (label, field key, placeholder, required, options) carry over. Settings specific to the old type are reset.
  - On a published form with submissions, ask for confirmation first, because changing a field's type can make earlier answers inconsistent in analytics.
- **Custom Themes**: Let users create, save and reuse their own form themes, in addition to the six built-in presets.
  - Users can save multiple themes and apply one theme to many forms (managed from a theme library page).
  - A token editor in the builder's settings panel shows changes on the canvas instantly, without saving first.
  - "Save as custom theme" and "Reset to preset" actions. Users can only apply themes they own.
  - Theme values are validated against an allow-list before they reach a public form, and a contrast check prevents publishing an unreadable theme.
  - Implementation notes:
    - Store custom themes in a separate `CustomFormTheme` table (`tokens` as JSON, owned by a user), referenced from `Form.customThemeId`.
    - Do **not** add `"custom"` to the `PredefinedFormTheme` enum. `Form.theme` stays as the base preset, and the custom theme is a partial overlay on top of it.
    - Apply overrides as inline `--form-*` CSS variables on `FormThemeContainer`, which take precedence over the preset's `[data-form-theme]` styles.

### Analytics & Metrics

- **Richer Form Analytics**: Extend the existing analytics pages with more ways to slice and share data.
  - Filter by time range (last 7, 30 or 90 days).
  - Export analytics as CSV or PDF.
  - Compare results across multiple forms.
  - Track how long respondents take to complete a form.
  - Show where respondents are located.
  - Live updates while viewing analytics (via WebSockets or polling).

### Backend Integration & Data

- **Remember More Preferences**: Extend the saved builder preferences beyond panel visibility.
  - Selected device preview (desktop, tablet, mobile).
  - Form layout preferences.

## Low Priority

### Advanced Features

- **Inline Block Editing**: Edit a block's main content directly on the canvas, for the quickest changes.
  - Type a heading, field label or option text directly in the block.
  - Other settings for the selected block appear in a compact toolbar above it, with the full settings panel still available for everything else.
  - Validation errors stay in the settings panel or a small indicator, so the canvas keeps looking like the real form.
- **Scheduling and Duplication**: More control over a form's lifecycle.
  - Schedule a form to publish at a specific date and time.
  - Automatically archive a form after an expiry date.
  - Duplicate a form (created as "Copy of …").
- **Version History**: Keep a record of changes to each form.
  - Browse past versions with a log of what changed.
  - Restore a previous version.
  - Compare two versions side by side.
  - Handle conflicts when two people edit the same form at once.
- **Layout Blocks**: Arrange fields in groups and columns instead of a single vertical list.
  - Group block (a container that holds other blocks).
  - Column block (place blocks side by side).
  - Insert and reorder blocks inside containers.
  - Update the form data model to support nested blocks.
- **Conditional Logic**: Make forms respond to earlier answers.
  - Show or hide fields based on other answers.
  - Apply validation rules only under certain conditions.
  - Branch respondents to different sections.
  - Skip questions in surveys based on previous responses.
- **Form Templates**: Start from a ready-made form instead of a blank one.
  - Built-in templates such as contact forms, surveys and registration forms.
  - Save your own forms as templates and share them.
  - A gallery for browsing templates.
- **Advanced Validation**: Validation rules beyond the per-field basics.
  - Rules that compare fields (e.g. "end date after start date").
  - Custom validation functions.
  - Server-side checks (e.g. "username already taken").
- **File Upload Field**: Let respondents attach files.
  - Single or multiple files.
  - Limits on file type and size.
  - Image previews and drag-and-drop upload.
- **Multi-language Support**: Use the app and publish forms in multiple languages.
  - Translated app interface.
  - Translations for form labels and content.
  - Right-to-left language support.
  - Locale-aware dates and numbers.

### Code Quality & Testing

- **Automated Testing**: Catch regressions before they reach users.
  - Unit tests with Vitest and React Testing Library.
  - End-to-end tests of key user flows with Playwright.
  - Component tests for the design-system components (`App*` and `Form*`).
  - Tests for the state stores.
- **Performance**: Keep the app fast as forms and data grow.
  - Load routes and heavy components only when needed.
  - Smaller JavaScript bundles through code splitting.
  - Client-side data caching (e.g. React Query) to avoid repeat requests.
  - Virtualised scrolling for long form lists.
- **Design System Quality**: Make the shared components accessible and well documented.
  - Text and controls meet WCAG AA color contrast in every app and form theme.
  - Full keyboard support in dropdowns and modals (focus stays inside, `Escape` closes, type-to-search in dropdowns, focus returns to where it was), so the builder and public forms work without a mouse.
  - Keep the `/demo` component gallery until a dedicated tool such as Storybook replaces it.
