"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";

/**
 * Checkbox Component Demo
 * Showcases various use cases and states for the Checkbox component
 */
export function CheckboxDemo() {
  const [checked, setChecked] = React.useState(false);
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Checkbox Component</h2>
        <p className="text-lg text-muted-foreground">
          Checkbox input component for boolean selections with customizable
          states.
        </p>
      </div>

      {/* Basic Checkbox */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Checkbox</h3>
          <p className="text-muted-foreground">Simple checkbox with label</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox id="basic" />
            <Label htmlFor="basic" className="cursor-pointer">
              Accept terms and conditions
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="checked" defaultChecked />
            <Label htmlFor="checked" className="cursor-pointer">
              Checked by default
            </Label>
          </div>
        </div>
      </section>

      {/* Controlled Checkbox */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Controlled Checkbox</h3>
          <p className="text-muted-foreground">
            Checkbox with state management
          </p>
        </div>

        <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="controlled"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <Label htmlFor="controlled" className="cursor-pointer">
                Subscribe to newsletter
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Current state:{" "}
              <span className="font-medium">
                {checked ? "Checked" : "Unchecked"}
              </span>
            </p>
          </div>
      </section>

      {/* States */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">States</h3>
          <p className="text-muted-foreground">Different checkbox states</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox id="unchecked" />
            <Label htmlFor="unchecked" className="cursor-pointer">
              Unchecked
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="checked-state" defaultChecked />
            <Label htmlFor="checked-state" className="cursor-pointer">
              Checked
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled" className="opacity-50 cursor-not-allowed">
              Disabled
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="disabled-checked" disabled defaultChecked />
            <Label
              htmlFor="disabled-checked"
              className="opacity-50 cursor-not-allowed"
            >
              Disabled & Checked
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="invalid" aria-invalid="true" />
            <Label htmlFor="invalid" className="cursor-pointer">
              Invalid (with error)
            </Label>
          </div>
        </div>
      </section>

      {/* Multiple Checkboxes */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Multiple Checkboxes</h3>
          <p className="text-muted-foreground">Group of related checkboxes</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Notification Preferences</h4>

          <div className="flex items-center gap-2">
            <Checkbox
              id="email-notif"
              checked={notifications.email}
              onChange={(e) =>
                setNotifications((prev) => ({
                  ...prev,
                  email: e.target.checked,
                }))
              }
            />
            <Label htmlFor="email-notif" className="cursor-pointer">
              Email notifications
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="sms-notif"
              checked={notifications.sms}
              onChange={(e) =>
                setNotifications((prev) => ({
                  ...prev,
                  sms: e.target.checked,
                }))
              }
            />
            <Label htmlFor="sms-notif" className="cursor-pointer">
              SMS notifications
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="push-notif"
              checked={notifications.push}
              onChange={(e) =>
                setNotifications((prev) => ({
                  ...prev,
                  push: e.target.checked,
                }))
              }
            />
            <Label htmlFor="push-notif" className="cursor-pointer">
              Push notifications
            </Label>
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-md">
            <p className="text-sm text-muted-foreground">
              Active:{" "}
              {Object.entries(notifications)
                .filter(([_, v]) => v)
                .map(([k]) => k)
                .join(", ") || "None"}
            </p>
          </div>
        </div>
      </section>

      {/* With Descriptions */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">With Descriptions</h3>
          <p className="text-muted-foreground">
            Checkboxes with additional context
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Checkbox id="marketing" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="marketing" className="cursor-pointer font-medium">
                Marketing emails
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Receive emails about new products, features, and more.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox id="security" className="mt-1" defaultChecked />
            <div className="flex-1">
              <Label htmlFor="security" className="cursor-pointer font-medium">
                Security alerts
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Get notified about security updates and suspicious activity on
                your account.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox id="updates" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="updates" className="cursor-pointer font-medium">
                Product updates
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Stay informed about product changes and new features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the Checkbox component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";

// Basic checkbox
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>

// Controlled checkbox
const [checked, setChecked] = useState(false);
<Checkbox 
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// With default checked
<Checkbox defaultChecked />

// Disabled
<Checkbox disabled />

// Invalid state
<Checkbox aria-invalid="true" />`}</code>
          </pre>
        </div>
      </section>

      {/* Props Documentation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props</h3>
          <p className="text-muted-foreground">
            Available props for the Checkbox component
          </p>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4 font-semibold">Prop</th>
                  <th className="text-left py-2 pr-4 font-semibold">Type</th>
                  <th className="text-left py-2 pr-4 font-semibold">Default</th>
                  <th className="text-left py-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">checked</td>
                  <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                  <td className="py-3 pr-4">-</td>
                  <td className="py-3">Controlled checked state</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">
                    defaultChecked
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                  <td className="py-3 pr-4 font-mono text-xs">false</td>
                  <td className="py-3">Initial checked state (uncontrolled)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">disabled</td>
                  <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                  <td className="py-3 pr-4 font-mono text-xs">false</td>
                  <td className="py-3">Disable the checkbox</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">onChange</td>
                  <td className="py-3 pr-4 font-mono text-xs">function</td>
                  <td className="py-3 pr-4">-</td>
                  <td className="py-3">Callback when checked state changes</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">aria-invalid</td>
                  <td className="py-3 pr-4 font-mono text-xs">
                    boolean | &quot;true&quot; | &quot;false&quot;
                  </td>
                  <td className="py-3 pr-4">-</td>
                  <td className="py-3">Indicates validation state</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">className</td>
                  <td className="py-3 pr-4 font-mono text-xs">string</td>
                  <td className="py-3 pr-4">-</td>
                  <td className="py-3">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
      </section>
    </div>
  );
}
