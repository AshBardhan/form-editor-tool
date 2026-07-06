"use client";

import { useState } from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "@/components/ui/Alert";
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
            <Alert>
              <Info className="size-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert. Use it for neutral information or
                general messages.
              </AlertDescription>
            </Alert>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Success
            </h4>
            <Alert variant="success">
              <CheckCircle className="size-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully. The form is now live.
              </AlertDescription>
            </Alert>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Info
            </h4>
            <Alert variant="info">
              <Info className="size-4" />
              <AlertTitle>New Feature Available</AlertTitle>
              <AlertDescription>
                We've added new customization options to the form builder. Check
                out the configuration panel to explore them.
              </AlertDescription>
            </Alert>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Warning
            </h4>
            <Alert variant="warning">
              <AlertTriangle className="size-4" />
              <AlertTitle>Attention Required</AlertTitle>
              <AlertDescription>
                Your session will expire in 5 minutes. Please save your work to
                avoid losing changes.
              </AlertDescription>
            </Alert>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Error
            </h4>
            <Alert variant="error">
              <XCircle className="size-4" />
              <AlertTitle>Error Occurred</AlertTitle>
              <AlertDescription>
                Failed to load form data. Please check your connection and try
                again.
              </AlertDescription>
            </Alert>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Destructive
            </h4>
            <Alert variant="destructive">
              <XCircle className="size-4" />
              <AlertTitle>Critical Error</AlertTitle>
              <AlertDescription>
                This action cannot be undone. All form data will be permanently
                deleted.
              </AlertDescription>
            </Alert>
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
          <Alert variant="info">
            <AlertTitle>Clean Design</AlertTitle>
            <AlertDescription>
              This alert has no icon, making it more subtle and suitable for
              dense layouts.
            </AlertDescription>
          </Alert>

          <Alert variant="warning">
            <AlertTitle>Simple Warning</AlertTitle>
            <AlertDescription>
              Important message without visual clutter.
            </AlertDescription>
          </Alert>
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
          <Alert variant="success">
            <CheckCircle className="size-4" />
            <AlertTitle>Form published successfully</AlertTitle>
          </Alert>

          <Alert variant="error">
            <XCircle className="size-4" />
            <AlertTitle>Connection failed</AlertTitle>
          </Alert>
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
            <Alert variant="info">
              <Lightbulb className="size-4" />
              <AlertTitle>Pro Tip</AlertTitle>
              <AlertDescription>
                You can use keyboard shortcuts to speed up your workflow. Press
                Ctrl+K to open the command palette.
              </AlertDescription>
              <AlertAction>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDismissable1(false)}
                >
                  Dismiss
                </Button>
              </AlertAction>
            </Alert>
          )}

          {showDismissable2 && (
            <Alert variant="warning">
              <AlertTriangle className="size-4" />
              <AlertTitle>Unsaved Changes</AlertTitle>
              <AlertDescription>
                You have unsaved changes. Do you want to save before leaving?
              </AlertDescription>
              <AlertAction>
                <div className="flex gap-2">
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
                </div>
              </AlertAction>
            </Alert>
          )}

          {showDismissable3 && (
            <Alert variant="error">
              <XCircle className="size-4" />
              <AlertTitle>Validation Failed</AlertTitle>
              <AlertDescription>
                3 fields contain errors. Please review and correct them before
                submitting.
              </AlertDescription>
              <AlertAction>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDismissable3(false)}
                >
                  ✕
                </Button>
              </AlertAction>
            </Alert>
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
          <Alert variant="warning">
            <AlertTriangle className="size-4" />
            <AlertTitle>System Update Required</AlertTitle>
            <AlertDescription>
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
            </AlertDescription>
          </Alert>

          <Alert variant="success">
            <CheckCircle className="size-4" />
            <AlertTitle>Welcome to the Platform! 🎉</AlertTitle>
            <AlertDescription>
              <p className="mb-2">
                Get started by creating your first form. Here's what you can do:
              </p>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>Choose from pre-built templates</li>
                <li>Customize fields and validation</li>
                <li>Preview and publish your form</li>
              </ol>
            </AlertDescription>
          </Alert>
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
            <code>{`import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

<Alert variant="success">
  <CheckCircle className="size-4" />
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>
    Your form has been saved successfully.
  </AlertDescription>
  <AlertAction>
    <Button variant="ghost" size="sm">
      Dismiss
    </Button>
  </AlertAction>
</Alert>`}</code>
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
