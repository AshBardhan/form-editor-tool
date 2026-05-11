"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";

/**
 * Skeleton Component Demo
 * Showcases various use cases for loading skeletons
 */
export function SkeletonDemo() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Skeleton Component</h2>
        <p className="text-lg text-muted-foreground">
          Loading placeholder skeletons to indicate content is being fetched,
          improving perceived performance.
        </p>
      </div>

      {/* Basic Skeletons */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Skeletons</h3>
          <p className="text-muted-foreground">
            Simple skeleton shapes with different sizes
          </p>
        </div>

        <div className="space-y-4">
          <Skeleton width={100} height={20} />
          <Skeleton width={200} height={20} />
          <Skeleton width={300} height={20} />
          <Skeleton width="100%" height={20} />
        </div>
      </section>

      {/* Different Heights */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Different Heights</h3>
          <p className="text-muted-foreground">
            Skeletons with varying heights
          </p>
        </div>

        <div className="space-y-4">
          <Skeleton width="100%" height={10} />
          <Skeleton width="100%" height={20} />
          <Skeleton width="100%" height={30} />
          <Skeleton width="100%" height={50} />
          <Skeleton width="100%" height={100} />
        </div>
      </section>

      {/* Custom Shapes */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Custom Shapes</h3>
          <p className="text-muted-foreground">Circular and square skeletons</p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Skeleton width={40} height={40} className="rounded-full" />
          <Skeleton width={60} height={60} className="rounded-full" />
          <Skeleton width={80} height={80} className="rounded-full" />
          <Skeleton width={100} height={100} className="rounded-full" />
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Real-world Examples</h3>
          <p className="text-muted-foreground">Common loading state patterns</p>
        </div>

        <div className="space-y-6">
          {/* User Profile Card */}
          <div className="p-6 border rounded-lg">
            <h4 className="text-sm font-semibold mb-4">User Profile Loading</h4>
            <div className="flex items-center gap-4">
              <Skeleton width={60} height={60} className="rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton width="40%" height={20} />
                <Skeleton width="60%" height={16} />
              </div>
            </div>
          </div>

          {/* Article List */}
          <div className="p-6 border rounded-lg">
            <h4 className="text-sm font-semibold mb-4">Article List Loading</h4>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton width="80%" height={24} />
                  <Skeleton width="100%" height={16} />
                  <Skeleton width="100%" height={16} />
                  <Skeleton width="60%" height={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Card Grid */}
          <div className="p-6 border rounded-lg">
            <h4 className="text-sm font-semibold mb-4">Card Grid Loading</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton width="100%" height={120} />
                  <Skeleton width="100%" height={20} />
                  <Skeleton width="80%" height={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Table Loading */}
          <div className="p-6 border rounded-lg">
            <h4 className="text-sm font-semibold mb-4">Table Loading</h4>
            <div className="space-y-3">
              {/* Header */}
              <div className="grid grid-cols-4 gap-4">
                <Skeleton width="100%" height={16} />
                <Skeleton width="100%" height={16} />
                <Skeleton width="100%" height={16} />
                <Skeleton width="100%" height={16} />
              </div>
              {/* Rows */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="grid grid-cols-4 gap-4">
                  <Skeleton width="100%" height={12} />
                  <Skeleton width="100%" height={12} />
                  <Skeleton width="100%" height={12} />
                  <Skeleton width="100%" height={12} />
                </div>
              ))}
            </div>
          </div>

          {/* Form Loading */}
          <div className="p-6 border rounded-lg">
            <h4 className="text-sm font-semibold mb-4">Form Loading</h4>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Skeleton width={100} height={16} />
                <Skeleton width="100%" height={40} />
              </div>
              <div className="space-y-2">
                <Skeleton width={120} height={16} />
                <Skeleton width="100%" height={40} />
              </div>
              <div className="space-y-2">
                <Skeleton width={80} height={16} />
                <Skeleton width="100%" height={80} />
              </div>
              <Skeleton width={100} height={36} />
            </div>
          </div>

          {/* Comment Section */}
          <div className="p-6 border rounded-lg">
            <h4 className="text-sm font-semibold mb-4">Comments Loading</h4>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton width={40} height={40} className="rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width="30%" height={16} />
                    <Skeleton width="100%" height={14} />
                    <Skeleton width="80%" height={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Interactive Example</h3>
          <p className="text-muted-foreground">
            Toggle between loading and loaded states
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => setIsLoading(!isLoading)}>
            {isLoading ? "Show Content" : "Show Loading"}
          </Button>

          {isLoading ? (
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Skeleton width={50} height={50} className="rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton width="40%" height={18} />
                  <Skeleton width="60%" height={14} />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton width="100%" height={14} />
                <Skeleton width="100%" height={14} />
                <Skeleton width="80%" height={14} />
              </div>
            </div>
          ) : (
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </div>
              <p className="text-sm">
                This is the actual content that appears after loading is
                complete. The skeleton provides a visual placeholder while data
                is being fetched.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the Skeleton component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import { Skeleton } from "@/components/ui/Skeleton";

// Basic skeleton (full width)
<Skeleton width="100%" height={20} />

// Fixed width
<Skeleton width={200} height={20} />

// Circular skeleton
<Skeleton 
  width={50} 
  height={50} 
  className="rounded-full" 
/>

// Custom styling
<Skeleton 
  width="100%" 
  height={100}
  className="rounded-lg" 
/>

// Loading state pattern
{isLoading ? (
  <div className="space-y-2">
    <Skeleton width="60%" height={20} />
    <Skeleton width="100%" height={16} />
  </div>
) : (
  <div>
    <h3>Loaded Content</h3>
    <p>Your content here</p>
  </div>
)}

// User profile skeleton
<div className="flex items-center gap-3">
  <Skeleton width={40} height={40} className="rounded-full" />
  <div className="flex-1 space-y-2">
    <Skeleton width="40%" height={16} />
    <Skeleton width="60%" height={14} />
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
            Available props for the Skeleton component
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
                <td className="py-3 pr-4 font-mono text-xs">width</td>
                <td className="py-3 pr-4 font-mono text-xs">number | string</td>
                <td className="py-3 pr-4 font-mono text-xs">'100%'</td>
                <td className="py-3">Width (px or percentage)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">height</td>
                <td className="py-3 pr-4 font-mono text-xs">number | string</td>
                <td className="py-3 pr-4 font-mono text-xs">'10px'</td>
                <td className="py-3">Height (px or percentage)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">className</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">
                  Additional CSS classes (e.g. 'rounded-full')
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
