"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

/**
 * Card Component Demo
 * Showcases various use cases and layouts for the Card component
 */
export function CardDemo() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Card Component</h2>
        <p className="text-lg text-muted-foreground">
          Versatile container component for grouping related content with
          headers, descriptions, and actions.
        </p>
      </div>

      {/* Basic Card */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Card</h3>
          <p className="text-muted-foreground">Simple card with content</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the main content area of the card.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>A card without description or footer.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Card with Footer */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Card with Footer</h3>
          <p className="text-muted-foreground">
            Cards with action buttons in the footer
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter</CardTitle>
              <CardDescription>
                Stay updated with our latest news
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Subscribe to our newsletter to get the latest updates and
                exclusive offers.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Subscribe</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Confirm Action</CardTitle>
              <CardDescription>This action cannot be undone</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Are you sure you want to proceed with this action?
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive">Confirm</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Interactive Cards */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Interactive Cards</h3>
          <p className="text-muted-foreground">
            Clickable cards with hover effects
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Feature A</CardTitle>
              <CardDescription>Click to learn more</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This card is interactive and responds to hover and click events.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Feature B</CardTitle>
              <CardDescription>Explore this option</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Interactive cards are great for navigation and selections.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Feature C</CardTitle>
              <CardDescription>Discover more</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Use hover effects to indicate interactivity.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cards with Badges */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Cards with Status</h3>
          <p className="text-muted-foreground">
            Cards displaying status badges
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Project Alpha</CardTitle>
                <Badge variant="success" label="Active" />
              </div>
              <CardDescription>Web application development</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                This project is currently in active development with 3 team
                members.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Project Beta</CardTitle>
                <Badge variant="warning" label="Pending" />
              </div>
              <CardDescription>Mobile app redesign</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Awaiting stakeholder approval before moving to development
                phase.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Stats Cards */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Stats Cards</h3>
          <p className="text-muted-foreground">
            Cards displaying metrics and statistics
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-3xl">10,234</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">↑ 12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Revenue</CardDescription>
              <CardTitle className="text-3xl">$45,678</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">↑ 8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Active Sessions</CardDescription>
              <CardTitle className="text-3xl">573</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-600">↓ 3% from last month</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Real-world Examples</h3>
          <p className="text-muted-foreground">Common card use cases</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <p className="text-sm text-muted-foreground">John Doe</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <p className="text-sm text-muted-foreground">
                  john.doe@example.com
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Badge variant="info" label="Administrator" />
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email notifications</span>
                  <Badge variant="success" label="Enabled" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Push notifications</span>
                  <Badge variant="success" label="Enabled" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS notifications</span>
                  <Badge variant="neutral" label="Disabled" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Manage Settings
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Login from new device</p>
                  <p className="text-muted-foreground">2 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Password changed</p>
                  <p className="text-muted-foreground">1 day ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Profile updated</p>
                  <p className="text-muted-foreground">3 days ago</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the Card component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Card without some sections
<Card>
  <CardHeader>
    <CardTitle>Simple Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>No description or footer</p>
  </CardContent>
</Card>

// Interactive card
<Card className="cursor-pointer hover:shadow-lg transition-shadow">
  <CardContent>Clickable card</CardContent>
</Card>`}</code>
          </pre>
        </div>
      </section>

      {/* Props Documentation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props</h3>
          <p className="text-muted-foreground">
            Available props for the Card components
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
                <td className="py-3 pr-4 font-mono text-xs">Card</td>
                <td className="py-3 pr-4 font-mono text-xs">className</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">CardHeader</td>
                <td className="py-3 pr-4 font-mono text-xs">className</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">CardTitle</td>
                <td className="py-3 pr-4 font-mono text-xs">className</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">CardDescription</td>
                <td className="py-3 pr-4 font-mono text-xs">className</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">CardContent</td>
                <td className="py-3 pr-4 font-mono text-xs">className</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">CardFooter</td>
                <td className="py-3 pr-4 font-mono text-xs">className</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
