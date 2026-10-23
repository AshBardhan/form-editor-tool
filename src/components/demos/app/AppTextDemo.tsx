import { AppText } from "@/design-system/app/AppText";
import { TEXT_VARIANTS } from "@/design-system/primitives";
import { DemoSection } from "@/components/demos/DemoSection";
import { TEXT_SAMPLES } from "@/components/demos/constants";

export function AppTextDemo() {
  return (
    <DemoSection
      scope="app"
      title="Text"
      description="Viewport-responsive type. Sizes step up at sm and 2xl."
    >
      <div className="flex flex-col gap-3">
        {TEXT_VARIANTS.map((variant) => (
          <AppText key={variant} variant={variant}>
            {TEXT_SAMPLES[variant]}
          </AppText>
        ))}
      </div>
    </DemoSection>
  );
}
