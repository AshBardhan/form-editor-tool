import { FormSeparator } from "@/design-system/form/FormSeparator";
import { FormText } from "@/design-system/form/FormText";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function FormSeparatorDemo() {
  return (
    <DemoSection
      scope="form"
      title="Separator"
      description="Horizontal or vertical divider for grouping related form content"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="form" title="Horizontal">
          <div className="flex flex-col gap-3">
            <FormText variant="p">Contact details</FormText>
            <FormSeparator />
            <FormText variant="p">Preferences</FormText>
          </div>
        </DemoBlock>

        <DemoBlock scope="form" title="Vertical">
          <div className="flex items-center gap-4 h-12">
            <FormText variant="span">Name</FormText>
            <FormSeparator orientation="vertical" className="h-full" />
            <FormText variant="span">Email</FormText>
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}
