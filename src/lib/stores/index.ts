/**
 * Centralized store exports for the form builder application.
 *
 * Store Architecture:
 * - FormConfigStore: Manages form configurations and block operations
 * - BlockValidationStore: Manages block validation errors-
 * - UIStateStore: Manages UI state like selections and sidebar state-
 *
 * Benefits of separation:
 * 1. Reduces unnecessary re-renders by isolating frequently changing state
 * 2. Improves performance by allowing components to subscribe only to relevant state
 * 3. Better code organization and maintainability
 * 4. Easier testing and debugging
 */

export { useFormConfigStore } from "./formConfigStore";
export { useUIStateStore } from "./UIStateStore";
export { useFormBlockValidationStore } from "./formBlockValidationStore";
