/**
 * Formats a date to a human-readable string in the format "MMM DD, YYYY".
 * If the date is null or undefined, returns null.
 *
 * @param {Date | null | undefined} date - The date to format.
 * @returns {string | null} The formatted date string or null if the input is invalid.
 */

export function formatDate(date: Date | null | undefined) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}