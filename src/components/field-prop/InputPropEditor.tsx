import { Input } from "@/components/ui/Input";

interface InputPropEditorProps {
  type?: "text" | "number";
  id: string;
  value: string | number;
  className?: string;
  onChange: (val: string | number) => void;
}

const InputPropEditor = ({
  type = "text",
  id,
  value,
  className,
  onChange,
}: InputPropEditorProps) => {
  return (
    <Input
      id={id}
      type={type}
      value={value}
      className={className}
      onChange={(e) =>
        onChange(
          type === "number"
            ? parseInt(e.target.value || "0", 10)
            : e.target.value,
        )
      }
    />
  );
};

export { InputPropEditor };
