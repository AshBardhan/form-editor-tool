/**
 * Centralized store exports for the form builder application.
 * 
 * Store Architecture:
 * - FormDataStore: Manages form data and field operations (less frequent changes)
 * - UIStateStore: Manages UI state like selections and sidebar state (frequent changes)
 * - ValidationStore: Manages field validation errors (moderate frequency)
 * 
 * Benefits of separation:
 * 1. Reduces unnecessary re-renders by isolating frequently changing state
 * 2. Improves performance by allowing components to subscribe only to relevant state
 * 3. Better code organization and maintainability
 * 4. Easier testing and debugging
 */

export { useFormDataStore } from './formDataStore';
export { useUIStateStore } from './uiStateStore';
export { useValidationStore } from './validationStore';

// Legacy export for backward compatibility
// TODO: Remove this after migrating all components to use separate stores
export { useFormStore } from '../store';