import { Textarea } from "@/components/ui/Textarea";

interface TextareaPropEditorProps {
  id: string;
  value: string;
  className?: string;
  onChange: (val: string) => void;
}

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
