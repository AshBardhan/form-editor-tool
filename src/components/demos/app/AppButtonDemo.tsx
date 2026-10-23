import Link from "next/link";
import { AppButton } from "@/design-system/app/AppButton";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppButtonDemo() {
  return (
    <DemoSection
      scope="app"
      title="Button"
      description="Flexible button with variants, colors, and sizes"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Variants">
          <div className="flex items-center gap-2 flex-wrap">
            <AppButton variant="solid" color="primary">
              Solid
            </AppButton>
            <AppButton variant="outline" color="primary">
              Outline
            </AppButton>
            <AppButton variant="ghost" color="primary">
              Ghost
            </AppButton>
            <AppButton variant="link" color="primary">
              Link
            </AppButton>
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="Colors">
          <div className="flex items-center gap-2 flex-wrap">
            <AppButton variant="solid" color="primary">
              Primary
            </AppButton>
            <AppButton variant="solid" color="secondary">
              Secondary
            </AppButton>
            <AppButton variant="solid" color="positive">
              Positive
            </AppButton>
            <AppButton variant="solid" color="negative">
              Negative
            </AppButton>
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="Sizes">
          <div className="flex items-center gap-2 flex-wrap">
            <AppButton variant="solid" color="primary" size="sm">
              Small
            </AppButton>
            <AppButton variant="solid" color="primary" size="md">
              Medium
            </AppButton>
            <AppButton variant="solid" color="primary" size="lg">
              Large
            </AppButton>
          </div>
        </DemoBlock>

        <DemoBlock scope="app" title="As link">
          <div className="flex items-center gap-2 flex-wrap">
            <AppButton
              render={<Link href="/demo" />}
              variant="solid"
              color="primary"
            >
              Solid link
            </AppButton>
            <AppButton
              render={<Link href="/demo" />}
              variant="link"
              color="secondary"
            >
              Text link
            </AppButton>
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}
