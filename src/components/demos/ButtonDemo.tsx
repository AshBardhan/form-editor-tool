"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Download, Mail, Plus, Trash2, Settings } from "lucide-react";

/**
 * Button Component Demo
 * Showcases all variants, sizes, and use cases for the Button component
 */
export function ButtonDemo() {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Button Component</h2>
        <p className="text-lg text-muted-foreground">
          Interactive button component with multiple variants, sizes, and states
          for various use cases.
        </p>
      </div>

      {/* Variants */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Variants</h3>
          <p className="text-muted-foreground">
            Different visual styles for various contexts
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Sizes</h3>
          <p className="text-muted-foreground">
            Buttons available in different sizes
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="outline">
            <Settings />
          </Button>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">With Icons</h3>
          <p className="text-muted-foreground">
            Buttons can include icons for better context
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button>
            <Mail />
            Send Email
          </Button>
          <Button variant="secondary">
            <Download />
            Download
          </Button>
          <Button variant="outline">
            <Plus />
            Add Item
          </Button>
          <Button variant="destructive">
            <Trash2 />
            Delete
          </Button>
        </div>
      </section>

      {/* States */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">States</h3>
          <p className="text-muted-foreground">Different button states</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Click to Load"}
          </Button>
        </div>
      </section>

      {/* Icon Only */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Icon Only</h3>
          <p className="text-muted-foreground">
            Compact buttons with just an icon
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button size="icon">
            <Plus />
          </Button>
          <Button size="icon" variant="outline">
            <Settings />
          </Button>
          <Button size="icon" variant="secondary">
            <Download />
          </Button>
          <Button size="icon" variant="destructive">
            <Trash2 />
          </Button>
          <Button size="icon" variant="ghost">
            <Mail />
          </Button>
        </div>
      </section>

      {/* Loading State */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Loading State</h3>
          <p className="text-muted-foreground">
            Buttons with loading indicators
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
            <Button disabled>
              <svg
                className="animate-spin size-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </Button>
            <Button variant="outline" disabled>
              <svg
                className="animate-spin size-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </Button>
          </div>
      </section>

      {/* Usage Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the Button component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";

// Basic button
<Button>Click me</Button>

// With variant and size
<Button variant="outline" size="lg">
  Large Outline
</Button>

// With icon
<Button variant="secondary">
  <Mail />
  Send Email
</Button>

// Icon only
<Button size="icon">
  <Settings />
</Button>

// Disabled
<Button disabled>Disabled</Button>`}</code>
          </pre>
        </div>
      </section>

      {/* Props Documentation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props</h3>
          <p className="text-muted-foreground">
            Available props for the Button component
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
                  <td className="py-3 pr-4 font-mono text-xs">variant</td>
                  <td className="py-3 pr-4 font-mono text-xs">
                    &quot;default&quot; | &quot;destructive&quot; |
                    &quot;outline&quot; | &quot;secondary&quot; |
                    &quot;ghost&quot; | &quot;link&quot;
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs">
                    &quot;default&quot;
                  </td>
                  <td className="py-3">Visual style of the button</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">size</td>
                  <td className="py-3 pr-4 font-mono text-xs">
                    &quot;default&quot; | &quot;sm&quot; | &quot;lg&quot; |
                    &quot;icon&quot;
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs">
                    &quot;default&quot;
                  </td>
                  <td className="py-3">Size of the button</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">asChild</td>
                  <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                  <td className="py-3 pr-4 font-mono text-xs">false</td>
                  <td className="py-3">Render as child element</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-xs">disabled</td>
                  <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                  <td className="py-3 pr-4 font-mono text-xs">false</td>
                  <td className="py-3">Disable the button</td>
                </tr>
              </tbody>
            </table>
          </div>
      </section>
    </div>
  );
}
