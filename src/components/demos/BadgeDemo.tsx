"use client";

import { Badge } from "@/components/ui/Badge";

export function BadgeDemo() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Badge Component</h2>
        <p className="text-lg text-muted-foreground">
          Small status indicators to label, categorize, or organize items using
          keywords.
        </p>
      </div>

      {/* Variants */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Variants</h3>
          <p className="text-muted-foreground">
            Different color variants for various status types
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Badge label="Success" variant="success" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Error" variant="error" />
          <Badge label="Info" variant="info" />
          <Badge label="Neutral" variant="neutral" />
        </div>
      </section>

      {/* Sizes */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Sizes</h3>
          <p className="text-muted-foreground">
            Badges available in different sizes
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge label="Small" size="sm" variant="info" />
          <Badge label="Medium" size="md" variant="info" />
          <Badge label="Large" size="lg" variant="info" />
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Real-world Examples</h3>
          <p className="text-muted-foreground">Common use cases for badges</p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Task Status</h4>
            <div className="flex flex-wrap gap-2">
              <Badge label="To Do" variant="neutral" />
              <Badge label="In Progress" variant="info" />
              <Badge label="Completed" variant="success" />
              <Badge label="Blocked" variant="error" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Priority Levels</h4>
            <div className="flex flex-wrap gap-2">
              <Badge label="Low" variant="success" size="sm" />
              <Badge label="Medium" variant="warning" size="sm" />
              <Badge label="High" variant="error" size="sm" />
              <Badge label="Critical" variant="error" size="md" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Form Status</h4>
            <div className="flex flex-wrap gap-2">
              <Badge label="Draft" variant="neutral" />
              <Badge label="Published" variant="success" />
              <Badge label="Archived" variant="info" />
              <Badge label="Needs Review" variant="warning" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">User Roles</h4>
            <div className="flex flex-wrap gap-2">
              <Badge label="Admin" variant="error" size="sm" />
              <Badge label="Editor" variant="info" size="sm" />
              <Badge label="Viewer" variant="neutral" size="sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the Badge component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import { Badge } from "@/components/ui/Badge";

// Basic badge
<Badge label="New" />

// With variant
<Badge label="Success" variant="success" />

// With size
<Badge label="Large Badge" variant="info" size="lg" />

// Custom styling
<Badge 
  label="Custom" 
  variant="warning" 
  className="font-bold"
/>`}</code>
          </pre>
        </div>
      </section>

      {/* Props */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props</h3>
          <p className="text-muted-foreground">
            Available props for the Badge component
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
                <td className="py-3 pr-4 font-mono text-xs">label</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Text content of the badge (required)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">variant</td>
                <td className="py-3 pr-4 font-mono text-xs">
                  'success' | 'warning' | 'error' | 'info' | 'neutral'
                </td>
                <td className="py-3 pr-4 font-mono text-xs">'neutral'</td>
                <td className="py-3">Color scheme of the badge</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">size</td>
                <td className="py-3 pr-4 font-mono text-xs">
                  'sm' | 'md' | 'lg'
                </td>
                <td className="py-3 pr-4 font-mono text-xs">'md'</td>
                <td className="py-3">Size of the badge</td>
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
