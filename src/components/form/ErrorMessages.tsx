import Text from "@/components/ui/Text";

/**
 * Props for the ErrorMessages component
 */
interface ErrorMessagesProps {
  /** Array of error messages to display */
  errors: string[];
}

/**
 * ErrorMessages Component
 *
 * Displays a list of validation error messages in a consistent format.
 * Used by form input blocks to show validation errors below the input field.
 *
 * @param {ErrorMessagesProps} props - Component props
 * @returns {JSX.Element | null} Rendered error messages or null if no errors
 *
 * @example
 * <ErrorMessages errors={["This field is required", "Must be a valid email"]} />
 */
export const ErrorMessages = ({ errors }: ErrorMessagesProps) => {
  // Early return if there are no errors to display
  if (errors.length === 0) return null;

  return (
    <div className="space-y-1">
      {errors.map((error, index) => (
        <Text
          key={index}
          className="text-xs sm:text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </Text>
      ))}
    </div>
  );
};
