"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

/**
 * Textarea Component Demo
 * Showcases various use cases for multi-line text input
 */
export function TextareaDemo() {
  const [value, setValue] = useState("");
  const [comment, setComment] = useState("");
  const maxLength = 500;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Textarea Component</h2>
        <p className="text-lg text-muted-foreground">
          Multi-line text input for longer form content like comments,
          descriptions, and messages.
        </p>
      </div>

      {/* Basic Textarea */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Textarea</h3>
          <p className="text-muted-foreground">
            Standard multi-line text input
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="textarea-basic">Description</Label>
          <Textarea
            id="textarea-basic"
            placeholder="Enter your text here..."
            rows={4}
          />
        </div>
      </section>

      {/* Controlled Textarea */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Controlled Textarea</h3>
          <p className="text-muted-foreground">
            Textarea with state management
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="textarea-controlled">Message</Label>
          <Textarea
            id="textarea-controlled"
            placeholder="Type your message..."
            rows={4}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Character count: {value.length}
          </p>
        </div>
      </section>

      {/* With Character Limit */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">With Character Limit</h3>
          <p className="text-muted-foreground">
            Textarea with maximum character count
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="textarea-limited">Comment (max 500 characters)</Label>
          <Textarea
            id="textarea-limited"
            placeholder="Write your comment..."
            rows={5}
            maxLength={maxLength}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">
              {comment.length}/{maxLength} characters
            </p>
            <p
              className={
                comment.length >= maxLength * 0.9
                  ? "text-orange-600"
                  : "text-muted-foreground"
              }
            >
              {maxLength - comment.length} remaining
            </p>
          </div>
        </div>
      </section>

      {/* Different Sizes */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Different Sizes</h3>
          <p className="text-muted-foreground">
            Textareas with varying row counts
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="textarea-small">Small (3 rows)</Label>
            <Textarea
              id="textarea-small"
              placeholder="Small textarea..."
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="textarea-medium">Medium (5 rows)</Label>
            <Textarea
              id="textarea-medium"
              placeholder="Medium textarea..."
              rows={5}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="textarea-large">Large (8 rows)</Label>
            <Textarea
              id="textarea-large"
              placeholder="Large textarea..."
              rows={8}
            />
          </div>
        </div>
      </section>

      {/* States */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">States</h3>
          <p className="text-muted-foreground">Different textarea states</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="textarea-normal">Normal</Label>
            <Textarea
              id="textarea-normal"
              placeholder="Normal state..."
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="textarea-disabled" className="opacity-50">
              Disabled
            </Label>
            <Textarea
              id="textarea-disabled"
              placeholder="Disabled state..."
              rows={3}
              disabled
              defaultValue="This textarea is disabled"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="textarea-readonly">Read Only</Label>
            <Textarea
              id="textarea-readonly"
              rows={3}
              readOnly
              value="This textarea is read-only and cannot be edited"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="textarea-invalid">Invalid (with error)</Label>
            <Textarea
              id="textarea-invalid"
              placeholder="This field is required..."
              rows={3}
              aria-invalid="true"
            />
            <p className="text-sm text-destructive">This field is required</p>
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Real-world Examples</h3>
          <p className="text-muted-foreground">Common textarea use cases</p>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-semibold mb-4">Feedback Form</h4>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="textarea-feedback">What can we improve?</Label>
                <Textarea
                  id="textarea-feedback"
                  placeholder="Tell us what you think..."
                  rows={4}
                />
              </div>
              <Button>Submit Feedback</Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Comment Section</h4>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="textarea-comment">Add a comment</Label>
                <Textarea
                  id="textarea-comment"
                  placeholder="Share your thoughts..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button>Post Comment</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Support Ticket</h4>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="textarea-issue">Describe your issue</Label>
                <Textarea
                  id="textarea-issue"
                  placeholder="Please provide as much detail as possible..."
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  Include any error messages, steps to reproduce, and what you
                  expected to happen.
                </p>
              </div>
              <Button>Submit Ticket</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the Textarea component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";

// Basic textarea
<Textarea placeholder="Enter text..." rows={4} />

// Controlled textarea
const [value, setValue] = useState("");
<Textarea 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  rows={4}
/>

// With label
<div className="space-y-3">
  <Label htmlFor="textarea-message">Message</Label>
  <Textarea id="textarea-message" placeholder="Your message..." rows={4} />
</div>

// With character limit
<Textarea 
  maxLength={500}
  value={text}
  onChange={(e) => setText(e.target.value)}
/>

// Disabled
<Textarea disabled value="Read-only text" />

// Invalid state
<Textarea aria-invalid="true" />

// Read-only
<Textarea readOnly value="Cannot be edited" />`}</code>
          </pre>
        </div>
      </section>

      {/* Props Documentation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props</h3>
          <p className="text-muted-foreground">
            Available props for the Textarea component
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
                <td className="py-3 pr-4 font-mono text-xs">value</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Controlled value</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">defaultValue</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Initial value (uncontrolled)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">placeholder</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Placeholder text</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">rows</td>
                <td className="py-3 pr-4 font-mono text-xs">number</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Number of visible text rows</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">maxLength</td>
                <td className="py-3 pr-4 font-mono text-xs">number</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Maximum character count</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">disabled</td>
                <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                <td className="py-3 pr-4 font-mono text-xs">false</td>
                <td className="py-3">Disable the textarea</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">readOnly</td>
                <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                <td className="py-3 pr-4 font-mono text-xs">false</td>
                <td className="py-3">Make textarea read-only</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">onChange</td>
                <td className="py-3 pr-4 font-mono text-xs">function</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Callback when value changes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">aria-invalid</td>
                <td className="py-3 pr-4 font-mono text-xs">boolean</td>
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
