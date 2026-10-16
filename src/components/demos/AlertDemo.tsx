"use client";

import { useState } from "react";
import { AppAlert } from "@/design-system/app/AppAlert";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Lightbulb,
} from "lucide-react";

/**
 * Alert Component Demo
 * Showcases all variants, props and use cases for the Alert component
 */
export function AlertDemo() {
  const [showDismissable1, setShowDismissable1] = useState(true);
  const [showDismissable2, setShowDismissable2] = useState(true);
  const [showDismissable3, setShowDismissable3] = useState(true);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Alert Component</h2>
        <p className="text-lg text-muted-foreground">
          Inline notification component that displays important messages to
          users. Alerts are persistent and remain visible until dismissed.
        </p>
      </div>

      {/* Basic Variants */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Variants</h3>
          <p className="text-muted-foreground">
            Alert supports multiple variants for different message types
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Default
            </h4>
            <AppAlert
              icon={<Info />}
              heading="Default Alert"
              description="This is a default alert. Use it for neutral information or general messages."
            />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Success
            </h4>
            <AppAlert
              variant="success"
              icon={<CheckCircle />}
              heading="Success!"
              description="Your changes have been saved successfully. The form is now live."
            />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Info
            </h4>
            <AppAlert
              variant="info"
              icon={<Info />}
              heading="New Feature Available"
              description="We've added new customization options to the form builder. Check out the configuration panel to explore them."
            />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Warning
            </h4>
            <AppAlert
              variant="warning"
              icon={<AlertTriangle />}
              heading="Attention Required"
              description="Your session will expire in 5 minutes. Please save your work to avoid losing changes."
            />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Error
            </h4>
            <AppAlert
              variant="error"
              icon={<XCircle />}
              heading="Error Occurred"
              description="Failed to load form data. Please check your connection and try again."
            />
          </div>
        </div>
      </section>

      {/* Without Icons */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Without Icons</h3>
          <p className="text-muted-foreground">
            Alerts can be displayed without icons for a cleaner look
          </p>
        </div>

        <div className="space-y-6">
          <AppAlert
            variant="info"
            heading="Clean Design"
            description="This alert has no icon, making it more subtle and suitable for dense layouts."
          />

          <AppAlert
            variant="warning"
            heading="Simple Warning"
            description="Important message without visual clutter."
          />
        </div>
      </section>

      {/* Title Only */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Title Only</h3>
          <p className="text-muted-foreground">
            Short, concise alerts with just a title
          </p>
        </div>

        <div className="space-y-6">
          <AppAlert
            variant="success"
            icon={<CheckCircle />}
            heading="Form published successfully"
          />

          <AppAlert
            variant="error"
            icon={<XCircle />}
            heading="Connection failed"
          />
        </div>
      </section>

      {/* With Action Buttons */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">With Actions</h3>
          <p className="text-muted-foreground">
            Alerts can include action buttons for user interaction
          </p>
        </div>

        <div className="space-y-6">
          {showDismissable1 && (
            <AppAlert
              variant="info"
              icon={<Lightbulb />}
              heading="Pro Tip"
              description="You can use keyboard shortcuts to speed up your workflow. Press Ctrl+K to open the command palette."
              actions={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDismissable1(false)}
                >
                  Dismiss
                </Button>
              }
            />
          )}

          {showDismissable2 && (
            <AppAlert
              variant="warning"
              icon={<AlertTriangle />}
              heading="Unsaved Changes"
              description="You have unsaved changes. Do you want to save before leaving?"
              actions={
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDismissable2(false)}
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      alert("Changes saved!");
                      setShowDismissable2(false);
                    }}
                  >
                    Save
                  </Button>
                </>
              }
            />
          )}

          {showDismissable3 && (
            <AppAlert
              variant="error"
              icon={<XCircle />}
              heading="Validation Failed"
              description="3 fields contain errors. Please review and correct them before submitting."
              actions={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDismissable3(false)}
                >
                  ✕
                </Button>
              }
            />
          )}

          {(!showDismissable1 || !showDismissable2 || !showDismissable3) && (
            <div className="flex gap-2">
              {!showDismissable1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDismissable1(true)}
                >
                  Show Alert 1
                </Button>
              )}
              {!showDismissable2 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDismissable2(true)}
                >
                  Show Alert 2
                </Button>
              )}
              {!showDismissable3 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDismissable3(true)}
                >
                  Show Alert 3
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Custom Content */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Custom Content</h3>
          <p className="text-muted-foreground">
            Alerts can contain custom content like lists, links and formatted
            text
          </p>
        </div>

        <div className="space-y-6">
          <AppAlert
            variant="warning"
            icon={<AlertTriangle />}
            heading="System Update Required"
            description={
              <>
                <p className="mb-2">
                  A critical security update is available. Please update your
                  system to continue using the application.
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Security patches for authentication</li>
                  <li>Performance improvements</li>
                  <li>Bug fixes and stability updates</li>
                </ul>
                <a
                  href="#"
                  className="underline mt-2 inline-block hover:text-foreground"
                >
                  Learn more about this update
                </a>
              </>
            }
          />

          <AppAlert
            variant="success"
            icon={<CheckCircle />}
            heading="Welcome to the Platform! 🎉"
            description={
              <>
                <p className="mb-2">
                  Get started by creating your first form. Here's what you can
                  do:
                </p>
                <ol className="list-decimal list-inside space-y-1 mt-2">
                  <li>Choose from pre-built templates</li>
                  <li>Customize fields and validation</li>
                  <li>Preview and publish your form</li>
                </ol>
              </>
            }
          />
        </div>
      </section>

      {/* Code Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the Alert component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import { AppAlert } from "@/design-system/app/AppAlert";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

<AppAlert
  variant="success"
  icon={<CheckCircle />}
  heading="Success!"
  description="Your form has been saved successfully."
  actions={
    <Button variant="ghost" size="sm">
      Dismiss
    </Button>
  }
/>`}</code>
          </pre>
        </div>
      </section>

      {/* Props Documentation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props</h3>
          <p className="text-muted-foreground">
            Available props for the Alert component
          </p>
        </div>

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
                'default' | 'success' | 'info' | 'warning' | 'error' |
                'destructive'
              </td>
              <td className="py-3 pr-4 font-mono text-xs">'default'</td>
              <td className="py-3">Visual style of the alert</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-mono text-xs">icon</td>
              <td className="py-3 pr-4 font-mono text-xs">ReactNode</td>
              <td className="py-3 pr-4">-</td>
              <td className="py-3">Optional leading icon</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-mono text-xs">heading</td>
              <td className="py-3 pr-4 font-mono text-xs">ReactNode</td>
              <td className="py-3 pr-4">-</td>
              <td className="py-3">Alert title</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-mono text-xs">description</td>
              <td className="py-3 pr-4 font-mono text-xs">ReactNode</td>
              <td className="py-3 pr-4">-</td>
              <td className="py-3">Supporting message or rich content</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-mono text-xs">actions</td>
              <td className="py-3 pr-4 font-mono text-xs">ReactNode</td>
              <td className="py-3 pr-4">-</td>
              <td className="py-3">Trailing actions such as dismiss or save</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-mono text-xs">className</td>
              <td className="py-3 pr-4 font-mono text-xs">string</td>
              <td className="py-3 pr-4">-</td>
              <td className="py-3">Additional CSS classes</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
