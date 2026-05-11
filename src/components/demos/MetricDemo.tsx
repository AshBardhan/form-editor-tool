"use client";

import * as React from "react";
import Metric from "@/components/ui/Metric";

/**
 * Metric Component Demo
 * Showcases various use cases for displaying metrics and statistics
 */
export function MetricDemo() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Metric Component</h2>
        <p className="text-lg text-muted-foreground">
          Display key metrics, statistics, and KPIs with customizable labels and
          values in various layouts.
        </p>
      </div>

      {/* Basic Metrics */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Metrics</h3>
          <p className="text-muted-foreground">
            Simple metric displays with labels and values
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Metric label="Total Users" value="10,234" />
          <Metric label="Revenue" value="$45,678" />
          <Metric label="Conversion Rate" value="3.2%" />
        </div>
      </section>

      {/* Different Sizes */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Different Sizes</h3>
          <p className="text-muted-foreground">
            Metrics in small, medium, and large sizes
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold mb-3">Small</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Metric label="Active Users" value="1,234" size="sm" />
              <Metric label="Page Views" value="45.6K" size="sm" />
              <Metric label="Bounce Rate" value="32%" size="sm" />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">Medium (Default)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Metric label="Active Users" value="1,234" size="md" />
              <Metric label="Page Views" value="45.6K" size="md" />
              <Metric label="Bounce Rate" value="32%" size="md" />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">Large</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Metric label="Active Users" value="1,234" size="lg" />
              <Metric label="Page Views" value="45.6K" size="lg" />
              <Metric label="Bounce Rate" value="32%" size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Direction Variants */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Layout Direction</h3>
          <p className="text-muted-foreground">
            Vertical (column) and horizontal (row) layouts
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold mb-3">Column (Default)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Metric label="Total Sales" value="$125,430" direction="column" />
              <Metric label="New Orders" value="342" direction="column" />
              <Metric label="Pending" value="28" direction="column" />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">Row</p>
            <div className="space-y-3">
              <Metric label="Total Sales" value="$125,430" direction="row" />
              <Metric label="New Orders" value="342" direction="row" />
              <Metric label="Pending" value="28" direction="row" />
            </div>
          </div>
        </div>
      </section>

      {/* Reverse Order */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Reverse Order</h3>
          <p className="text-muted-foreground">
            Swap label and value positions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Metric label="Active Sessions" value="573" reverse />
          <Metric label="Avg. Duration" value="4m 32s" reverse />
          <Metric label="Success Rate" value="98.5%" reverse />
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Real-world Examples</h3>
          <p className="text-muted-foreground">Common metric use cases</p>
        </div>

        <div className="space-y-6">
          {/* Dashboard Stats */}
          <div className="p-6 border rounded-lg">
            <h4 className="text-sm font-semibold mb-4">Dashboard Overview</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <Metric label="Total Revenue" value="$892,450" size="lg" />
                <p className="text-sm text-green-600 mt-2">
                  ↑ 12.5% from last month
                </p>
              </div>
              <div>
                <Metric label="New Customers" value="1,245" size="lg" />
                <p className="text-sm text-green-600 mt-2">
                  ↑ 8.3% from last month
                </p>
              </div>
              <div>
                <Metric label="Active Users" value="8,532" size="lg" />
                <p className="text-sm text-red-600 mt-2">
                  ↓ 2.1% from last month
                </p>
              </div>
              <div>
                <Metric label="Avg. Order Value" value="$127" size="lg" />
                <p className="text-sm text-green-600 mt-2">
                  ↑ 5.7% from last month
                </p>
              </div>
            </div>
          </div>

          {/* Analytics Panel */}
          <div className="p-6 border rounded-lg">
            <h4 className="text-sm font-semibold mb-4">Analytics Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Metric label="Page Views" value="125.3K" size="sm" />
              <Metric label="Unique Visitors" value="42.1K" size="sm" />
              <Metric label="Bounce Rate" value="38.2%" size="sm" />
              <Metric label="Avg. Session" value="3m 45s" size="sm" />
              <Metric label="Pages/Session" value="4.2" size="sm" />
              <Metric label="New Users" value="12.4K" size="sm" />
              <Metric label="Returning Users" value="29.7K" size="sm" />
              <Metric label="Mobile Traffic" value="62%" size="sm" />
            </div>
          </div>

          {/* Sales Metrics */}
          <div className="p-6 border rounded-lg">
            <h4 className="text-sm font-semibold mb-4">Sales Performance</h4>
            <div>
              <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0 border-b last:border-0">
                <Metric
                  label="Today's Sales"
                  value="$12,450"
                  direction="row"
                  className="flex-1"
                />
                <span className="text-sm text-green-600">+15%</span>
              </div>
              <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0 border-b last:border-0">
                <Metric
                  label="This Week"
                  value="$84,320"
                  direction="row"
                  className="flex-1"
                />
                <span className="text-sm text-green-600">+8%</span>
              </div>
              <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0 border-b last:border-0">
                <Metric
                  label="This Month"
                  value="$324,180"
                  direction="row"
                  className="flex-1"
                />
                <span className="text-sm text-red-600">-3%</span>
              </div>
              <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0 border-b last:border-0">
                <Metric
                  label="This Year"
                  value="$3.2M"
                  direction="row"
                  className="flex-1"
                />
                <span className="text-sm text-green-600">+22%</span>
              </div>
            </div>
          </div>

          {/* Server Status */}
          <div className="p-6 border rounded-lg">
            <h4 className="text-sm font-semibold mb-4">Server Status</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div>
                <Metric label="CPU Usage" value="42%" />
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "42%" }}
                  ></div>
                </div>
              </div>
              <div>
                <Metric label="Memory" value="6.2GB" />
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "62%" }}
                  ></div>
                </div>
              </div>
              <div>
                <Metric label="Disk Space" value="234GB" />
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>
              <div>
                <Metric label="Network" value="1.2Gbps" />
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>
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
            How to use the Metric component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import Metric from "@/components/ui/Metric";

// Basic metric
<Metric label="Total Users" value="10,234" />

// With size
<Metric label="Revenue" value="$45,678" size="lg" />

// Horizontal layout
<Metric 
  label="Conversion Rate" 
  value="3.2%" 
  direction="row" 
/>

// Reverse order (value on top)
<Metric 
  label="Active Sessions" 
  value="573" 
  reverse 
/>

// Small size in grid
<div className="grid grid-cols-3 gap-4">
  <Metric label="Page Views" value="45.6K" size="sm" />
  <Metric label="Visitors" value="12.3K" size="sm" />
  <Metric label="Bounce Rate" value="32%" size="sm" />
</div>

// With custom styling
<Metric 
  label="Total Sales" 
  value="$125,430" 
  className="text-blue-600"
/>

// In a card with additional info
<div>
  <Metric label="Revenue" value="$892,450" size="lg" />
  <p className="text-sm text-green-600 mt-2">
    ↑ 12.5% from last month
  </p>
</div>`}</code>
          </pre>
        </div>
      </section>

      {/* Props Documentation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props</h3>
          <p className="text-muted-foreground">
            Available props for the Metric component
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
                <td className="py-3">The metric label (required)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">value</td>
                <td className="py-3 pr-4 font-mono text-xs">string | number</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">The metric value (required)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">size</td>
                <td className="py-3 pr-4 font-mono text-xs">sm | md | lg</td>
                <td className="py-3 pr-4 font-mono text-xs">md</td>
                <td className="py-3">Size of the metric display</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">direction</td>
                <td className="py-3 pr-4 font-mono text-xs">row | column</td>
                <td className="py-3 pr-4 font-mono text-xs">column</td>
                <td className="py-3">Layout direction</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">reverse</td>
                <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                <td className="py-3 pr-4 font-mono text-xs">false</td>
                <td className="py-3">Swap label and value positions</td>
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
