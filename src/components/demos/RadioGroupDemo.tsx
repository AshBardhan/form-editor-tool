"use client";

import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";

/**
 * RadioGroup Component Demo
 * Showcases various use cases for radio button groups
 */
export function RadioGroupDemo() {
  const [plan, setPlan] = React.useState("free");
  const [notification, setNotification] = React.useState("email");

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
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1" className="cursor-pointer">
                Option 1
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2" className="cursor-pointer">
                Option 2
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option3" id="option3" />
              <Label htmlFor="option3" className="cursor-pointer">
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

        <div className="space-y-4">
            <RadioGroup value={plan} onValueChange={setPlan}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="free" id="plan-free" />
                <Label htmlFor="plan-free" className="cursor-pointer">
                  Free Plan
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="pro" id="plan-pro" />
                <Label htmlFor="plan-pro" className="cursor-pointer">
                  Pro Plan - $29/month
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="enterprise" id="plan-enterprise" />
                <Label htmlFor="plan-enterprise" className="cursor-pointer">
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
            <div className="flex items-start gap-3 pb-4 border-b">
              <RadioGroupItem value="email" id="notif-email" className="mt-1" />
              <div className="flex-1">
                <Label
                  htmlFor="notif-email"
                  className="cursor-pointer font-medium"
                >
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Receive notifications via email. You&apos;ll get updates about
                  important events.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 py-4 border-b">
              <RadioGroupItem value="sms" id="notif-sms" className="mt-1" />
              <div className="flex-1">
                <Label
                  htmlFor="notif-sms"
                  className="cursor-pointer font-medium"
                >
                  SMS Notifications
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Get instant notifications via text message. Standard message
                  rates apply.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <RadioGroupItem value="push" id="notif-push" className="mt-1" />
              <div className="flex-1">
                <Label
                  htmlFor="notif-push"
                  className="cursor-pointer font-medium"
                >
                  Push Notifications
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Receive push notifications on your devices when you&apos;re
                  signed in.
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

        <div className="space-y-4">
            <Label>Select Size</Label>
            <RadioGroup defaultValue="m" orientation="horizontal">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="xs" id="size-xs" />
                <Label htmlFor="size-xs" className="cursor-pointer">
                  XS
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="s" id="size-s" />
                <Label htmlFor="size-s" className="cursor-pointer">
                  S
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="m" id="size-m" />
                <Label htmlFor="size-m" className="cursor-pointer">
                  M
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="l" id="size-l" />
                <Label htmlFor="size-l" className="cursor-pointer">
                  L
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="xl" id="size-xl" />
                <Label htmlFor="size-xl" className="cursor-pointer">
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
            <div className="flex items-center gap-2">
              <RadioGroupItem value="available" id="status-available" />
              <Label htmlFor="status-available" className="cursor-pointer">
                Available
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="busy" id="status-busy" />
              <Label htmlFor="status-busy" className="cursor-pointer">
                Busy
              </Label>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <RadioGroupItem value="away" id="status-away" disabled />
              <Label htmlFor="status-away" className="cursor-not-allowed">
                Away (Disabled)
              </Label>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <RadioGroupItem value="offline" id="status-offline" disabled />
              <Label htmlFor="status-offline" className="cursor-not-allowed">
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
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="standard" id="ship-standard" />
                  <div>
                    <Label
                      htmlFor="ship-standard"
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
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="express" id="ship-express" />
                  <div>
                    <Label
                      htmlFor="ship-express"
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
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="overnight" id="ship-overnight" />
                  <div>
                    <Label
                      htmlFor="ship-overnight"
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
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="pay-card" />
                <Label htmlFor="pay-card" className="cursor-pointer flex-1">
                  Credit or Debit Card
                </Label>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <RadioGroupItem value="paypal" id="pay-paypal" />
                <Label htmlFor="pay-paypal" className="cursor-pointer flex-1">
                  PayPal
                </Label>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <RadioGroupItem value="bank" id="pay-bank" />
                <Label htmlFor="pay-bank" className="cursor-pointer flex-1">
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
              <div className="flex items-center gap-2">
                <RadioGroupItem value="5" id="rating-5" />
                <Label htmlFor="rating-5" className="cursor-pointer">
                  ⭐⭐⭐⭐⭐ Very Satisfied
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="4" id="rating-4" />
                <Label htmlFor="rating-4" className="cursor-pointer">
                  ⭐⭐⭐⭐ Satisfied
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="3" id="rating-3" />
                <Label htmlFor="rating-3" className="cursor-pointer">
                  ⭐⭐⭐ Neutral
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="2" id="rating-2" />
                <Label htmlFor="rating-2" className="cursor-pointer">
                  ⭐⭐ Dissatisfied
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="1" id="rating-1" />
                <Label htmlFor="rating-1" className="cursor-pointer">
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
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option1" id="opt1" />
    <Label htmlFor="opt1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option2" id="opt2" />
    <Label htmlFor="opt2">Option 2</Label>
  </div>
</RadioGroup>

// Controlled radio group
const [value, setValue] = useState("default");
<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
</RadioGroup>

// Horizontal layout
<RadioGroup orientation="horizontal" defaultValue="m">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="s" id="s" />
    <Label htmlFor="s">S</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="m" id="m" />
    <Label htmlFor="m">M</Label>
  </div>
</RadioGroup>

// Disabled option
<RadioGroupItem value="disabled" id="dis" disabled />

// With description
<div className="flex items-start gap-3">
  <RadioGroupItem value="opt" id="opt" className="mt-1" />
  <div>
    <Label htmlFor="opt">Option Title</Label>
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
                  <th className="text-left py-2 pr-4 font-semibold">
                    Component
                  </th>
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
                  <td className="py-3 pr-4 font-mono text-xs">
                    RadioGroupItem
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs">value</td>
                  <td className="py-3 pr-4 font-mono text-xs">string</td>
                  <td className="py-3">Item value (required)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">
                    RadioGroupItem
                  </td>
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
