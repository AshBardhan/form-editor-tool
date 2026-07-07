import { useCallback, useEffect, useRef } from "react";
import { FormConfig } from "@/lib/types/form";
import { useFormConfigStore } from "@/lib/stores";
import { ApiResponse } from "@/lib/types/api";
import { toast } from "@/components/ui/Toast";

interface UseAutoSaveOptions {
  formId: string;
  debounceMs?: number;
  enabled?: boolean;
}

/**
 * Custom hook for auto-saving form changes
 * Watches formConfig for changes and auto-saves with debouncing
 */
export function useAutoSave({
  formId,
  debounceMs = 1000,
  enabled = true,
}: UseAutoSaveOptions) {
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedConfigRef = useRef<FormConfig | null>(null);
  const isSavingRef = useRef(false);
  const isInitialLoadRef = useRef(true);
  const savingToastIdRef = useRef<string | null>(null);

  const formConfig = useFormConfigStore((state) => state.formConfig);
  const setSaveStatus = useFormConfigStore((state) => state.setSaveStatus);
  const setLastSaved = useFormConfigStore((state) => state.setLastSaved);
  const setFormConfig = useFormConfigStore((state) => state.setFormConfig);

  /**
   * Performs the actual save operation
   */
  const performSave = useCallback(
    async (changes: Partial<FormConfig>) => {
      if (!enabled || isSavingRef.current || !formId) return;

      isSavingRef.current = true;
      setSaveStatus("saving");

      console.log('[Auto-Save] Starting save with changes:', Object.keys(changes));

      // Show saving toast (persistent until we update it)
      const toastId = toast.info("Saving changes...", {
        duration: Infinity,
        dismissible: false,
      });
      savingToastIdRef.current = toastId;
      
      console.log('[Auto-Save] Saving toast shown with ID:', toastId);

      // Ensure toast is visible for at least 500ms for better UX
      const minDisplayTime = new Promise(resolve => setTimeout(resolve, 500));

      try {
        const response = await fetch(`/api/forms/${formId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changes),
        });

        const result = (await response.json()) as ApiResponse<FormConfig>;

        if (!response.ok || !result.success) {
          throw new Error(
            result.error?.message || "Failed to save changes.",
          );
        }

        // Update store with response (merge pattern preserves other fields like submissionCount)
        if (result.data) {
          setFormConfig(result.data);
          lastSavedConfigRef.current = { ...formConfig, ...result.data };
        }

        // Wait for minimum display time before updating toast
        await minDisplayTime;

        // Update toast to success (in-place transformation)
        if (savingToastIdRef.current) {
          console.log('[Auto-Save] Updating toast to success:', savingToastIdRef.current);
          toast.update(savingToastIdRef.current, {
            type: "success",
            title: "Changes saved",
            description: "Your form has been updated successfully.",
            duration: 3000,
            dismissible: true,
          });
          savingToastIdRef.current = null;
        }

        console.log('[Auto-Save] Save completed successfully');

        setSaveStatus("saved");
        setLastSaved(new Date());

        // Reset to idle after animation
        setTimeout(() => {
          setSaveStatus("idle");
        }, 3000);
      } catch (error) {
        // Wait for minimum display time before updating toast
        await minDisplayTime;

        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to save changes.";

        // Update toast to error (in-place transformation)
        if (savingToastIdRef.current) {
          console.log('[Auto-Save] Updating toast to error:', savingToastIdRef.current);
          toast.update(savingToastIdRef.current, {
            type: "error",
            title: "Failed to save",
            description: errorMessage,
            duration: 5000,
            dismissible: true,
          });
          savingToastIdRef.current = null;
        }

        console.error('[Auto-Save] Save failed:', error);

        setSaveStatus("error", errorMessage);
      } finally {
        isSavingRef.current = false;
      }
    },
    [formId, enabled, setSaveStatus, setLastSaved, setFormConfig, formConfig],
  );

  /**
   * Detects changes between current and last saved config
   */
  const detectChanges = useCallback((): Partial<FormConfig> | null => {
    if (!lastSavedConfigRef.current) return null;

    const changes: Partial<FormConfig> = {};
    const current = formConfig;
    const last = lastSavedConfigRef.current;

    // Check metadata changes
    if (current.title !== last.title) changes.title = current.title;
    if (current.theme !== last.theme) changes.theme = current.theme;
    if (current.description !== last.description) changes.description = current.description;

    // Check blocks changes (compare by JSON to detect deep changes)
    if (JSON.stringify(current.blocks) !== JSON.stringify(last.blocks)) {
      changes.blocks = current.blocks;
    }

    return Object.keys(changes).length > 0 ? changes : null;
  }, [formConfig]);

  /**
   * Watch for formConfig changes and trigger auto-save
   */
  useEffect(() => {
    // Skip on initial load
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      lastSavedConfigRef.current = formConfig;
      console.log('[Auto-Save] Initialized with form config');
      return;
    }

    if (!enabled || !formId || isSavingRef.current) {
      if (!enabled) console.log('[Auto-Save] Disabled');
      if (!formId) console.log('[Auto-Save] No formId');
      if (isSavingRef.current) console.log('[Auto-Save] Already saving');
      return;
    }

    const changes = detectChanges();
    if (!changes) {
      console.log('[Auto-Save] No changes detected');
      return;
    }

    console.log('[Auto-Save] Changes detected, will save in:', changes.blocks ? debounceMs * 1.5 : debounceMs, 'ms');

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // For blocks changes, debounce longer (users might be doing multiple operations)
    const delay = changes.blocks ? debounceMs * 1.5 : debounceMs;

    // Set new timeout for debounced save
    saveTimeoutRef.current = setTimeout(() => {
      performSave(changes);
    }, delay);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formConfig, enabled, formId, debounceMs, detectChanges, performSave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      // Dismiss any active saving toast
      if (savingToastIdRef.current) {
        toast.dismiss(savingToastIdRef.current);
      }
    };
  }, []);
}
