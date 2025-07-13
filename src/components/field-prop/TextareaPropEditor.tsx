import { Textarea } from "@/components/ui/Textarea";

interface TextareaPropEditorProps {
  id: string;
  value: string;
  className?: string;
  onChange: (val: string) => void;
}

/**
 * Textarea Prop Editor
 * - Displays a textarea input field with an optional class name and change handler
 *
 * @param {TextareaPropEditorProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const TextareaPropEditor = ({
  id,
  value,
  className,
  onChange,
}: TextareaPropEditorProps) => {
  return (
    <Textarea
      id={id}
      value={value}
      className={className}
      rows={10}
      placeholder="Enter a long text"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export { TextareaPropEditor };
