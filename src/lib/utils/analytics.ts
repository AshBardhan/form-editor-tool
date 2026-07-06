export type FormAnalyticsEvent =
  | "view"
  | "start"
  | "completion"
  | "submit_attempt";

/**
 * Sends a lightweight analytics event for a public form interaction.
 * Failures are intentionally swallowed so analytics never block UX.
 */
export function sendAnalyticsEvent(formId: string, event: FormAnalyticsEvent) {
  fetch(`/api/forms/${formId}/analytics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event }),
    keepalive: true,
  }).catch(() => {
    console.error(
      `Failed to send analytics event for form ${formId}: ${event}`,
    );
  });
}
