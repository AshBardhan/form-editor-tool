import { FormError } from "@/design-system/form/FormError";
import { FormInput } from "@/design-system/form/FormInput";
import { FormLabel } from "@/design-system/form/FormLabel";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function FormErrorDemo() {
  return (
    <DemoSection
      scope="form"
      title="Error"
      description="Validation messages for a single error or a list of errors"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="form" title="Single error">
          <div className="flex flex-col gap-2">
            <FormLabel size="md" htmlFor="form-error-email" aria-invalid>
              Email
            </FormLabel>
            <FormInput
              id="form-error-email"
              type="email"
              placeholder="you@example.com"
              aria-invalid
              aria-describedby="form-error-email-message"
            />
            <FormError
              id="form-error-email-message"
              errors={["Enter a valid email address."]}
            />
          </div>
        </DemoBlock>

        <DemoBlock scope="form" title="Multiple errors">
          <div className="flex flex-col gap-2">
            <FormLabel size="md" htmlFor="form-error-password" aria-invalid>
              Password
            </FormLabel>
            <FormInput
              id="form-error-password"
              type="password"
              placeholder="Password"
              aria-invalid
              aria-describedby="form-error-password-message"
            />
            <FormError
              id="form-error-password-message"
              errors={[
                "Must be at least 8 characters.",
                "Must include a number.",
              ]}
            />
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}
