"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";

/**
 * RadioGroup Component Demo
 * Showcases various use cases for radio button groups
 */
export function RadioGroupDemo() {
  const [plan, setPlan] = useState("free");
  const [notification, setNotification] = useState("email");

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">RadioGroup Component</h2>
        <p className="text-lg text-muted-foreground">
          Radio button groups for mutually exclusive selections where only one
          option can be chosen at a time.
        </p>
      </div>

      {/* Basic Radio Group */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Radio Group</h3>
          <p className="text-muted-foreground">
            Simple radio group with labels
          </p>
        </div>

        <RadioGroup defaultValue="option1">
          <div className="flex gap-2">
            <RadioGroupItem value="option1" id="radio-option1" />
            <Label htmlFor="radio-option1" className="cursor-pointer">
              Option 1
            </Label>
          </div>
          <div className="flex gap-2">
            <RadioGroupItem value="option2" id="radio-option2" />
            <Label htmlFor="radio-option2" className="cursor-pointer">
              Option 2
            </Label>
          </div>
          <div className="flex gap-2">
            <RadioGroupItem value="option3" id="radio-option3" />
            <Label htmlFor="radio-option3" className="cursor-pointer">
              Option 3
            </Label>
          </div>
        </RadioGroup>
      </section>

      {/* Controlled Radio Group */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">
            Controlled Radio Group
          </h3>
          <p className="text-muted-foreground">
            Radio group with state management
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <RadioGroup value={plan} onValueChange={setPlan}>
            <div className="flex gap-2">
              <RadioGroupItem value="free" id="radio-plan-free" />
              <Label htmlFor="radio-plan-free" className="cursor-pointer">
                Free Plan
              </Label>
            </div>
            <div className="flex gap-2">
              <RadioGroupItem value="pro" id="radio-plan-pro" />
              <Label htmlFor="radio-plan-pro" className="cursor-pointer">
                Pro Plan - $29/month
              </Label>
            </div>
            <div className="flex gap-2">
              <RadioGroupItem value="enterprise" id="radio-plan-enterprise" />
              <Label htmlFor="radio-plan-enterprise" className="cursor-pointer">
                Enterprise Plan - Contact Sales
              </Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground">
            Selected plan: <span className="font-medium">{plan}</span>
          </p>
        </div>
      </section>

      {/* With Descriptions */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">With Descriptions</h3>
          <p className="text-muted-foreground">
            Radio options with detailed descriptions
          </p>
        </div>

        <RadioGroup value={notification} onValueChange={setNotification}>
          <div className="flex gap-2 pb-3 border-b">
            <RadioGroupItem value="email" id="radio-notif-email" />
            <div className="flex-1 flex flex-col gap-1">
              <Label
                htmlFor="radio-notif-email"
                className="cursor-pointer font-medium"
              >
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email. You'll get updates about
                important events.
              </p>
            </div>
          </div>

          <div className="flex gap-2 py-4 border-b">
            <RadioGroupItem value="sms" id="radio-notif-sms" />
            <div className="flex-1 flex flex-col gap-1">
              <Label
                htmlFor="radio-notif-sms"
                className="cursor-pointer font-medium"
              >
                SMS Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Get instant notifications via text message. Standard message
                rates apply.
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <RadioGroupItem value="push" id="radio-notif-push" />
            <div className="flex-1 flex flex-col gap-1">
              <Label
                htmlFor="radio-notif-push"
                className="cursor-pointer font-medium"
              >
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications on your devices when you're signed
                in.
              </p>
            </div>
          </div>
        </RadioGroup>
      </section>

      {/* Horizontal Layout */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Horizontal Layout</h3>
          <p className="text-muted-foreground">
            Radio options arranged horizontally
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Label>Select Size</Label>
          <RadioGroup defaultValue="m" orientation="horizontal">
            <div className="flex gap-2">
              <RadioGroupItem value="xs" id="radio-size-xs" />
              <Label htmlFor="radio-size-xs" className="cursor-pointer">
                XS
              </Label>
            </div>
            <div className="flex gap-2">
              <RadioGroupItem value="s" id="radio-size-s" />
              <Label htmlFor="radio-size-s" className="cursor-pointer">
                S
              </Label>
            </div>
            <div className="flex gap-2">
              <RadioGroupItem value="m" id="radio-size-m" />
              <Label htmlFor="radio-size-m" className="cursor-pointer">
                M
              </Label>
            </div>
            <div className="flex gap-2">
              <RadioGroupItem value="l" id="radio-size-l" />
              <Label htmlFor="radio-size-l" className="cursor-pointer">
                L
              </Label>
            </div>
            <div className="flex gap-2">
              <RadioGroupItem value="xl" id="radio-size-xl" />
              <Label htmlFor="radio-size-xl" className="cursor-pointer">
                XL
              </Label>
            </div>
          </RadioGroup>
        </div>
      </section>

      {/* Disabled State */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Disabled State</h3>
          <p className="text-muted-foreground">Radio options can be disabled</p>
        </div>

        <RadioGroup defaultValue="available">
          <div className="flex gap-2">
            <RadioGroupItem value="available" id="radio-status-available" />
            <Label htmlFor="radio-status-available" className="cursor-pointer">
              Available
            </Label>
          </div>
          <div className="flex gap-2">
            <RadioGroupItem value="busy" id="radio-status-busy" />
            <Label htmlFor="radio-status-busy" className="cursor-pointer">
              Busy
            </Label>
          </div>
          <div className="flex gap-2 opacity-50">
            <RadioGroupItem value="away" id="radio-status-away" disabled />
            <Label htmlFor="radio-status-away" className="cursor-not-allowed">
              Away (Disabled)
            </Label>
          </div>
          <div className="flex gap-2 opacity-50">
            <RadioGroupItem
              value="offline"
              id="radio-status-offline"
              disabled
            />
            <Label
              htmlFor="radio-status-offline"
              className="cursor-not-allowed"
            >
              Offline (Disabled)
            </Label>
          </div>
        </RadioGroup>
      </section>

      {/* Real-world Examples */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Real-world Examples</h3>
          <p className="text-muted-foreground">Common radio group use cases</p>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-semibold mb-4">Shipping Options</h4>
            <RadioGroup defaultValue="standard">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex gap-3">
                  <RadioGroupItem value="standard" id="radio-ship-standard" />
                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor="radio-ship-standard"
                      className="cursor-pointer font-medium"
                    >
                      Standard Shipping
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      5-7 business days
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium">Free</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex gap-3">
                  <RadioGroupItem value="express" id="radio-ship-express" />
                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor="radio-ship-express"
                      className="cursor-pointer font-medium"
                    >
                      Express Shipping
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      2-3 business days
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium">$9.99</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex gap-3">
                  <RadioGroupItem value="overnight" id="radio-ship-overnight" />
                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor="radio-ship-overnight"
                      className="cursor-pointer font-medium"
                    >
                      Overnight Shipping
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Next business day
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium">$24.99</span>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Payment Method</h4>
            <RadioGroup defaultValue="card">
              <div className="flex gap-2 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="pay-card" />
                <Label htmlFor="pay-card" className="cursor-pointer">
                  Credit or Debit Card
                </Label>
              </div>
              <div className="flex gap-2 p-3 border rounded-lg">
                <RadioGroupItem value="paypal" id="pay-paypal" />
                <Label htmlFor="pay-paypal" className="cursor-pointer">
                  PayPal
                </Label>
              </div>
              <div className="flex gap-2 p-3 border rounded-lg">
                <RadioGroupItem value="bank" id="pay-bank" />
                <Label htmlFor="pay-bank" className="cursor-pointer">
                  Bank Transfer
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Survey Question</h4>
            <p className="text-sm text-muted-foreground mb-3">
              How satisfied are you with our service?
            </p>
            <RadioGroup>
              <div className="flex gap-2">
                <RadioGroupItem value="5" id="radio-rating-5" />
                <Label htmlFor="radio-rating-5" className="cursor-pointer">
                  ⭐⭐⭐⭐⭐ Very Satisfied
                </Label>
              </div>
              <div className="flex gap-2">
                <RadioGroupItem value="4" id="radio-rating-4" />
                <Label htmlFor="radio-rating-4" className="cursor-pointer">
                  ⭐⭐⭐⭐ Satisfied
                </Label>
              </div>
              <div className="flex gap-2">
                <RadioGroupItem value="3" id="radio-rating-3" />
                <Label htmlFor="radio-rating-3" className="cursor-pointer">
                  ⭐⭐⭐ Neutral
                </Label>
              </div>
              <div className="flex gap-2">
                <RadioGroupItem value="2" id="radio-rating-2" />
                <Label htmlFor="radio-rating-2" className="cursor-pointer">
                  ⭐⭐ Dissatisfied
                </Label>
              </div>
              <div className="flex gap-2">
                <RadioGroupItem value="1" id="radio-rating-1" />
                <Label htmlFor="radio-rating-1" className="cursor-pointer">
                  ⭐ Very Dissatisfied
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the RadioGroup component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";

// Basic radio group
<RadioGroup defaultValue="option1">
  <div className="flex gap-2">
    <RadioGroupItem value="option1" id="radio-opt1" />
    <Label htmlFor="radio-opt1">Option 1</Label>
  </div>
  <div className="flex gap-2">
    <RadioGroupItem value="option2" id="radio-opt2" />
    <Label htmlFor="radio-opt2">Option 2</Label>
  </div>
</RadioGroup>

// Controlled radio group
const [value, setValue] = useState("default");
<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex gap-2">
    <RadioGroupItem value="default" id="radio-r1" />
    <Label htmlFor="radio-r1">Default</Label>
  </div>
</RadioGroup>

// Horizontal layout
<RadioGroup orientation="horizontal" defaultValue="m">
  <div className="flex gap-2">
    <RadioGroupItem value="s" id="radio-s" />
    <Label htmlFor="radio-s">S</Label>
  </div>
  <div className="flex gap-2">
    <RadioGroupItem value="m" id="radio-m" />
    <Label htmlFor="radio-m">M</Label>
  </div>
</RadioGroup>

// Disabled option
<RadioGroupItem value="disabled" id="radio-dis" disabled />

// With description
<div className="flex items-start gap-3">
  <RadioGroupItem value="opt" id="radio-opt" className="mt-1" />
  <div>
    <Label htmlFor="radio-opt">Option Title</Label>
    <p className="text-sm text-muted-foreground">
      Detailed description here
    </p>
  </div>
</div>`}</code>
          </pre>
        </div>
      </section>

      {/* Props Documentation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props</h3>
          <p className="text-muted-foreground">
            Available props for the RadioGroup components
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold">Component</th>
                <th className="text-left py-2 pr-4 font-semibold">Prop</th>
                <th className="text-left py-2 pr-4 font-semibold">Type</th>
                <th className="text-left py-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">RadioGroup</td>
                <td className="py-3 pr-4 font-mono text-xs">value</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3">Controlled value</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">RadioGroup</td>
                <td className="py-3 pr-4 font-mono text-xs">onValueChange</td>
                <td className="py-3 pr-4 font-mono text-xs">function</td>
                <td className="py-3">Callback when value changes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">RadioGroup</td>
                <td className="py-3 pr-4 font-mono text-xs">defaultValue</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3">Initial value (uncontrolled)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">RadioGroup</td>
                <td className="py-3 pr-4 font-mono text-xs">orientation</td>
                <td className="py-3 pr-4 font-mono text-xs">
                  horizontal | vertical
                </td>
                <td className="py-3">Layout direction</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">RadioGroupItem</td>
                <td className="py-3 pr-4 font-mono text-xs">value</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3">Item value (required)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">RadioGroupItem</td>
                <td className="py-3 pr-4 font-mono text-xs">disabled</td>
                <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                <td className="py-3">Disable the radio item</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
