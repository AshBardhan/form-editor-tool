import { AppButton } from "@/design-system/app/AppButton";
import { toast } from "@/design-system/app/AppToast";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppToastDemo() {
  return (
    <DemoSection
      scope="app"
      title="Toast"
      description="Stacked notifications with success, error, info, and warning variants"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Variants">
          <div className="flex items-center gap-2 flex-wrap">
            <AppButton
              onClick={() =>
                toast.success({
                  title: "Changes saved",
                  description: "Your form settings were updated.",
                })
              }
            >
              Success
            </AppButton>
            <AppButton
              onClick={() =>
                toast.error({
                  title: "Save failed",
                  description: "We could not update the form. Try again.",
                })
              }
            >
              Error
            </AppButton>
            <AppButton
              onClick={() =>
                toast.info({
                  title: "New comment received",
                  description: "Alex left feedback on this form.",
                })
              }
            >
              Info
            </AppButton>
            <AppButton
              onClick={() =>
                toast.warning({
                  title: "Unsaved changes",
                  description: "Leave this page and your edits will be lost.",
                })
              }
            >
              Warning
            </AppButton>
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="Action">
          <AppButton
            onClick={() =>
              toast.error({
                title: "Failed to delete",
                description: "The form could not be removed.",
                action: {
                  label: "Retry",
                  onClick: () => toast.info({ title: "Retrying..." }),
                },
              })
            }
          >
            With action
          </AppButton>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}
