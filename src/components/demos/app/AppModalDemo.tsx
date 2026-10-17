import { AppButton } from "@/design-system/app/AppButton";
import {
  AppModal,
  AppModalClose,
  AppModalContent,
  AppModalDescription,
  AppModalFooter,
  AppModalHeader,
  AppModalTitle,
  AppModalTrigger,
} from "@/design-system/app/AppModal";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppModalDemo() {
  return (
    <DemoSection
      scope="app"
      title="Modal"
      description="Dialog for general content, and a confirmation dialog that stays open until an action is chosen"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Dialog">
          <AppModal>
            <AppModalTrigger render={<AppButton />}>
              Open dialog
            </AppModalTrigger>
            <AppModalContent>
              <AppModalHeader>
                <AppModalTitle>Edit profile</AppModalTitle>
                <AppModalDescription>
                  Update how your name appears on published forms.
                </AppModalDescription>
              </AppModalHeader>
              <p className="px-6 pt-4 text-sm text-app-fg-muted">
                Outside click and Escape both dismiss this dialog.
              </p>
              <AppModalFooter>
                <AppModalClose
                  render={<AppButton variant="outline" color="secondary" />}
                >
                  Cancel
                </AppModalClose>
                <AppModalClose render={<AppButton />}>Save</AppModalClose>
              </AppModalFooter>
            </AppModalContent>
          </AppModal>
        </DemoBlock>

        <DemoBlock scope="app" title="Sizes">
          <div className="flex items-center gap-2 flex-wrap">
            {(
              [
                ["sm", "Small"],
                ["md", "Medium"],
                ["lg", "Large"],
              ] as const
            ).map(([size, label]) => (
              <AppModal key={size}>
                <AppModalTrigger
                  render={<AppButton variant="outline" color="secondary" />}
                >
                  {label}
                </AppModalTrigger>
                <AppModalContent size={size}>
                  <AppModalHeader>
                    <AppModalTitle>{label} dialog</AppModalTitle>
                    <AppModalDescription>
                      {size === "sm"
                        ? "384px wide."
                        : size === "md"
                          ? "672px wide."
                          : "1152px wide."}
                    </AppModalDescription>
                  </AppModalHeader>
                  <AppModalFooter>
                    <AppModalClose
                      render={<AppButton variant="outline" color="secondary" />}
                    >
                      Close
                    </AppModalClose>
                  </AppModalFooter>
                </AppModalContent>
              </AppModal>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="Confirmation">
          <AppModal type="alert">
            <AppModalTrigger render={<AppButton color="negative" />}>
              Delete form
            </AppModalTrigger>
            <AppModalContent size="sm">
              <AppModalHeader>
                <AppModalTitle>Delete this form?</AppModalTitle>
                <AppModalDescription>
                  This action cannot be undone. Submissions and analytics for
                  this form will be removed.
                </AppModalDescription>
              </AppModalHeader>
              <AppModalFooter>
                <AppModalClose
                  render={<AppButton variant="outline" color="secondary" />}
                >
                  Cancel
                </AppModalClose>
                <AppModalClose render={<AppButton color="negative" />}>
                  Delete
                </AppModalClose>
              </AppModalFooter>
            </AppModalContent>
          </AppModal>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}
