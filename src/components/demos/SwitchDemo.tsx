"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/Label";

/**
 * Switch Component Demo
 * Showcases various use cases and states for the Switch component
 */
export function SwitchDemo() {
  const [enabled, setEnabled] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    publicProfile: false,
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Switch Component</h2>
        <p className="text-lg text-muted-foreground">
          Toggle switch component for binary on/off states with smooth
          animations.
        </p>
      </div>

      {/* Basic Switch */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Switch</h3>
          <p className="text-muted-foreground">Simple switch with label</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch id="switch-basic" />
            <Label htmlFor="switch-basic" className="cursor-pointer">
              Enable feature
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Switch id="switch-checked" defaultChecked />
            <Label htmlFor="switch-checked" className="cursor-pointer">
              Enabled by default
            </Label>
          </div>
        </div>
      </section>

      {/* Controlled Switch */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Controlled Switch</h3>
          <p className="text-muted-foreground">Switch with state management</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch
              id="switch-controlled"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            <Label htmlFor="switch-controlled" className="cursor-pointer">
              Airplane mode
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Status:{" "}
            <span className="font-medium">{enabled ? "On" : "Off"}</span>
          </p>
        </div>
      </section>

      {/* States */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">States</h3>
          <p className="text-muted-foreground">Different switch states</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch id="switch-off" />
            <Label htmlFor="switch-off" className="cursor-pointer">
              Off
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Switch id="switch-on" defaultChecked />
            <Label htmlFor="switch-on" className="cursor-pointer">
              On
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Switch id="switch-disabled-off" disabled />
            <Label
              htmlFor="switch-disabled-off"
              className="opacity-50 cursor-not-allowed"
            >
              Disabled (Off)
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Switch id="switch-disabled-on" disabled defaultChecked />
            <Label
              htmlFor="switch-disabled-on"
              className="opacity-50 cursor-not-allowed"
            >
              Disabled (On)
            </Label>
          </div>
        </div>
      </section>

      {/* Multiple Switches */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Multiple Switches</h3>
          <p className="text-muted-foreground">
            Group of related switches for settings
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">User Settings</h4>

          <div className="flex items-center justify-between">
            <Label htmlFor="switch-notif" className="cursor-pointer">
              Push Notifications
            </Label>
            <Switch
              id="switch-notif"
              checked={settings.notifications}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  notifications: e.target.checked,
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="switch-dark" className="cursor-pointer">
              Dark Mode
            </Label>
            <Switch
              id="switch-dark"
              checked={settings.darkMode}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  darkMode: e.target.checked,
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="switch-autosave" className="cursor-pointer">
              Auto-save
            </Label>
            <Switch
              id="switch-autosave"
              checked={settings.autoSave}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  autoSave: e.target.checked,
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="switch-public" className="cursor-pointer">
              Public Profile
            </Label>
            <Switch
              id="switch-public"
              checked={settings.publicProfile}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  publicProfile: e.target.checked,
                }))
              }
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-md">
          <p className="text-sm text-muted-foreground">
            Active:{" "}
            {Object.entries(settings)
              .filter(([_, v]) => v)
              .map(([k]) => k)
              .join(", ") || "None"}
          </p>
        </div>
      </section>

      {/* With Descriptions */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">With Descriptions</h3>
          <p className="text-muted-foreground">
            Switches with additional context
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Label
                htmlFor="switch-marketing"
                className="cursor-pointer font-medium"
              >
                Marketing Communications
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Receive emails about new products, features and special offers.
              </p>
            </div>
            <Switch id="switch-marketing" className="mt-1" />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Label
                htmlFor="switch-security"
                className="cursor-pointer font-medium"
              >
                Security Alerts
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Get notified about unusual activity and security updates.
              </p>
            </div>
            <Switch id="switch-security" className="mt-1" defaultChecked />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Label
                htmlFor="switch-analytics"
                className="cursor-pointer font-medium"
              >
                Usage Analytics
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Help us improve by sharing anonymous usage data.
              </p>
            </div>
            <Switch id="switch-analytics" className="mt-1" />
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Real-world Examples</h3>
          <p className="text-muted-foreground">Common use cases for switches</p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">Privacy Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Show online status</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Allow search engines</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show activity status</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Feature Toggles</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable beta features</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Developer mode</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Experimental UI</span>
                <Switch />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the Switch component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/Label";

// Basic switch
<div className="flex items-center gap-3">
  <Switch id="switch" />
  <Label htmlFor="switch">Enable feature</Label>
</div>

// Controlled switch
const [enabled, setEnabled] = useState(false);
<Switch 
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>

// With default checked
<Switch defaultChecked />

// Disabled
<Switch disabled />

// Right-aligned with label
<div className="flex items-center justify-between">
  <Label htmlFor="setting">Dark Mode</Label>
  <Switch id="setting" />
</div>`}</code>
          </pre>
        </div>
      </section>

      {/* Props Documentation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props</h3>
          <p className="text-muted-foreground">
            Available props for the Switch component
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
                <td className="py-3 pr-4 font-mono text-xs">defaultChecked</td>
                <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                <td className="py-3 pr-4 font-mono text-xs">false</td>
                <td className="py-3">Initial checked state (uncontrolled)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">disabled</td>
                <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                <td className="py-3 pr-4 font-mono text-xs">false</td>
                <td className="py-3">Disable the switch</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">onChange</td>
                <td className="py-3 pr-4 font-mono text-xs">function</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Callback when checked state changes</td>
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
