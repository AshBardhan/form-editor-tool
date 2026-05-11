"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Mail, Lock, Search, User } from "lucide-react";

/**
 * Input Component Demo
 * Showcases various use cases and states for the Input component
 */
export function InputDemo() {
  const [value, setValue] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Input Component</h2>
        <p className="text-lg text-muted-foreground">
          Text input component for forms with various types and states.
        </p>
      </div>

      {/* Basic Input */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Input</h3>
          <p className="text-muted-foreground">Simple text input with label</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="basic">Basic Input</Label>
            <Input id="basic" placeholder="Enter text..." />
          </div>

          <div>
            <Label htmlFor="with-value">With Default Value</Label>
            <Input
              id="with-value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type something..."
            />
            {value && (
              <p className="text-sm text-muted-foreground mt-2">
                Current value: {value}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Input Types */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Input Types</h3>
          <p className="text-muted-foreground">Different HTML input types</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="text">Text</Label>
            <Input id="text" type="text" placeholder="Enter text" />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
          </div>

          <div>
            <Label htmlFor="number">Number</Label>
            <Input id="number" type="number" placeholder="0" />
          </div>

          <div>
            <Label htmlFor="tel">Telephone</Label>
            <Input id="tel" type="tel" placeholder="+1 (555) 000-0000" />
          </div>

          <div>
            <Label htmlFor="url">URL</Label>
            <Input id="url" type="url" placeholder="https://example.com" />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" />
          </div>

          <div>
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" />
          </div>
        </div>
      </section>

      {/* States */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">States</h3>
          <p className="text-muted-foreground">Different input states</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="normal">Normal</Label>
            <Input id="normal" placeholder="Normal input" />
          </div>

          <div>
            <Label htmlFor="disabled">Disabled</Label>
            <Input id="disabled" placeholder="Disabled input" disabled />
          </div>

          <div>
            <Label htmlFor="readonly">Read Only</Label>
            <Input id="readonly" value="This is read-only" readOnly />
          </div>

          <div>
            <Label htmlFor="invalid">Invalid (aria-invalid)</Label>
            <Input
              id="invalid"
              placeholder="Invalid input"
              aria-invalid="true"
            />
            <p className="text-sm text-destructive mt-1">
              This field has an error
            </p>
          </div>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">
            With Icons (Wrapper Pattern)
          </h3>
          <p className="text-muted-foreground">
            Inputs styled with icon containers
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input id="search" placeholder="Search..." className="pl-10" />
            </div>
          </div>

          <div>
            <Label htmlFor="email-icon">Email with Icon</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="email-icon"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password-icon">Password with Icon</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="password-icon"
                type="password"
                placeholder="Enter password"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="username">Username with Icon</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="username"
                placeholder="Enter username"
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* File Input */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">File Input</h3>
          <p className="text-muted-foreground">
            File upload input with styled button
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="file">Upload File</Label>
            <Input id="file" type="file" />
          </div>

          <div>
            <Label htmlFor="multiple">Upload Multiple Files</Label>
            <Input id="multiple" type="file" multiple />
          </div>

          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" type="file" accept="image/*" />
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the Input component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

// Basic input
<Input placeholder="Enter text..." />

// With label
<div>
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="your@email.com" 
  />
</div>

// Controlled input
const [value, setValue] = useState("");
<Input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// With icon
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" />
  <Input placeholder="Search..." className="pl-10" />
</div>

// Disabled
<Input disabled placeholder="Disabled" />

// Invalid state
<Input aria-invalid="true" placeholder="Invalid" />`}</code>
          </pre>
        </div>
      </section>

      {/* Props Documentation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props</h3>
          <p className="text-muted-foreground">
            Available props for the Input component
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
                <td className="py-3 pr-4 font-mono text-xs">type</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3 pr-4 font-mono text-xs">'text'</td>
                <td className="py-3">HTML input type</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">placeholder</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Placeholder text</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">disabled</td>
                <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                <td className="py-3 pr-4 font-mono text-xs">false</td>
                <td className="py-3">Disable the input</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">readOnly</td>
                <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                <td className="py-3 pr-4 font-mono text-xs">false</td>
                <td className="py-3">Make input read-only</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">aria-invalid</td>
                <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                <td className="py-3 pr-4">false</td>
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
