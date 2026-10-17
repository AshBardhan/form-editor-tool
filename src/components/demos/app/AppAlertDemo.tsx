import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { AppAlert } from "@/design-system/app/AppAlert";
import { AppButton } from "@/design-system/app/AppButton";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppAlertDemo() {
  return (
    <DemoSection
      scope="app"
      title="Alert"
      description="Inline notification with icon, heading, description, and optional actions"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Variants">
          <div className="flex flex-col gap-3">
            <AppAlert
              variant="default"
              heading="Default"
              description="Neutral status message for general page context."
            />
            <AppAlert
              variant="success"
              icon={<CheckCircle2 />}
              heading="Form published"
              description="Respondents can now submit this form."
            />
            <AppAlert
              variant="info"
              icon={<Info />}
              heading="Autosave is on"
              description="Edits are saved as you work."
            />
            <AppAlert
              variant="warning"
              icon={<AlertTriangle />}
              heading="Editing a published form"
              description="Changing fields may alter existing responses."
            />
            <AppAlert
              variant="error"
              icon={<XCircle />}
              heading="Save failed"
              description="Check your connection and try again."
            />
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="With actions">
          <AppAlert
            variant="warning"
            icon={<AlertTriangle />}
            heading="Unpublished changes"
            description="Publish to make this version live."
            actions={
              <AppButton variant="outline" color="secondary" size="sm">
                Publish
              </AppButton>
            }
          />
        </DemoBlock>
      </div>
    </DemoSection>
  );
}
