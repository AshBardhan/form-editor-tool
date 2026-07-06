"use client";

import { useState } from "react";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

/**
 * Toast Component Demo
 * Showcases all variants, props and use cases for the Toast component
 */
export function ToastDemo() {
  const [customTitle, setCustomTitle] = useState("Custom message");
  const [customDescription, setCustomDescription] = useState(
    "This is a custom toast notification",
  );
  const [customDuration, setCustomDuration] = useState("5000");

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Toast Component</h2>
        <p className="text-lg text-muted-foreground">
          Floating notification component that appears temporarily to provide
          feedback. Toasts auto-dismiss after a set duration and can be manually
          closed.
        </p>
      </div>

      {/* Basic Toast Types */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Toast Types</h3>
          <p className="text-muted-foreground">
            Click the buttons to trigger toasts with different types
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={() =>
              toast.show("Default notification", {
                description: "This is a default toast notification",
              })
            }
          >
            Default Toast
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.success("Success!", {
                description: "Your changes have been saved successfully",
              })
            }
          >
            Success Toast
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.info("New update available", {
                description: "Version 2.0 is now available for download",
              })
            }
          >
            Info Toast
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.warning("Warning", {
                description: "Your session will expire in 5 minutes",
              })
            }
          >
            Warning Toast
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.error("Error occurred", {
                description: "Failed to save changes. Please try again.",
              })
            }
          >
            Error Toast
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast.success("Form submitted");
              toast.info("Processing your request");
              toast.warning("This may take a moment");
            }}
          >
            Multiple Toasts
          </Button>
        </div>
      </section>

      {/* Title Only */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Title Only</h3>
          <p className="text-muted-foreground">
            Short, concise toasts with just a title
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={() => toast.success("Copied to clipboard")}
          >
            Copy Success
          </Button>

          <Button
            variant="outline"
            onClick={() => toast.error("Connection failed")}
          >
            Connection Error
          </Button>

          <Button variant="outline" onClick={() => toast.info("Loading...")}>
            Loading
          </Button>

          <Button
            variant="outline"
            onClick={() => toast.success("File uploaded")}
          >
            Upload Success
          </Button>

          <Button
            variant="outline"
            onClick={() => toast.warning("Low storage")}
          >
            Storage Warning
          </Button>

          <Button variant="outline" onClick={() => toast.show("Notification")}>
            Simple Notice
          </Button>
        </div>
      </section>

      {/* With Actions */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">With Action Buttons</h3>
          <p className="text-muted-foreground">
            Toasts can include action buttons for user interaction
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() =>
              toast.success("Form saved", {
                description: "Your form has been saved as a draft",
                action: {
                  label: "View",
                  onClick: () => alert("Opening form..."),
                },
              })
            }
          >
            Save with Action
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.error("Failed to delete", {
                description: "Could not delete the item. Network error.",
                action: {
                  label: "Retry",
                  onClick: () => toast.info("Retrying..."),
                },
              })
            }
          >
            Error with Retry
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.warning("Unsaved changes", {
                description: "You have unsaved changes in your form",
                action: {
                  label: "Save Now",
                  onClick: () => toast.success("Changes saved!"),
                },
              })
            }
          >
            Warning with Save
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.info("Update available", {
                description: "A new version of the app is ready",
                action: {
                  label: "Update",
                  onClick: () => toast.success("Updating..."),
                },
              })
            }
          >
            Update Prompt
          </Button>
        </div>
      </section>

      {/* Custom Duration */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Custom Duration</h3>
          <p className="text-muted-foreground">
            Control how long toasts remain visible
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            onClick={() =>
              toast.info("Quick message", {
                duration: 1000,
                description: "Disappears in 1 second",
              })
            }
          >
            1 Second
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.info("Normal message", {
                duration: 3000,
                description: "Disappears in 3 seconds",
              })
            }
          >
            3 Seconds (Fast)
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.info("Standard message", {
                duration: 5000,
                description: "Disappears in 5 seconds",
              })
            }
          >
            5 Seconds (Default)
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.warning("Important message", {
                duration: 10000,
                description: "Disappears in 10 seconds",
              })
            }
          >
            10 Seconds (Long)
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.error("Critical error", {
                duration: 0,
                description: "Must be manually dismissed",
              })
            }
            className="sm:col-span-2"
          >
            Persistent (No Auto-dismiss)
          </Button>
        </div>
      </section>

      {/* Non-dismissible */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">
            Non-dismissible Toasts
          </h3>
          <p className="text-muted-foreground">
            Toasts that cannot be manually closed
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() =>
              toast.info("Processing...", {
                description: "Please wait while we process your request",
                dismissible: false,
                duration: 3000,
              })
            }
          >
            Loading State
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast.success("Auto-saving...", {
                description: "Your work is being saved automatically",
                dismissible: false,
                duration: 2000,
              })
            }
          >
            Auto-save Notice
          </Button>
        </div>
      </section>

      {/* Custom Interactive Demo */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Custom Toast Builder</h3>
          <p className="text-muted-foreground">
            Create your own custom toast with various options
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Enter toast title"
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration (ms)</Label>
              <Input
                id="duration"
                type="number"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                placeholder="5000"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder="Enter toast description"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <Button
            onClick={() =>
              toast.show(customTitle, {
                description: customDescription || undefined,
                duration: parseInt(customDuration) || 5000,
              })
            }
          >
            Default
          </Button>
          <Button
            onClick={() =>
              toast.success(customTitle, {
                description: customDescription || undefined,
                duration: parseInt(customDuration) || 5000,
              })
            }
          >
            Success
          </Button>
          <Button
            onClick={() =>
              toast.info(customTitle, {
                description: customDescription || undefined,
                duration: parseInt(customDuration) || 5000,
              })
            }
          >
            Info
          </Button>
          <Button
            onClick={() =>
              toast.warning(customTitle, {
                description: customDescription || undefined,
                duration: parseInt(customDuration) || 5000,
              })
            }
          >
            Warning
          </Button>
          <Button
            onClick={() =>
              toast.error(customTitle, {
                description: customDescription || undefined,
                duration: parseInt(customDuration) || 5000,
              })
            }
          >
            Error
          </Button>
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Real-world Examples</h3>
          <p className="text-muted-foreground">
            Common use cases for toast notifications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => {
              toast.info("Uploading file...", {
                dismissible: false,
                duration: 2000,
              });
              setTimeout(() => {
                toast.success("File uploaded successfully", {
                  action: {
                    label: "View",
                    onClick: () => alert("Opening file..."),
                  },
                });
              }, 2000);
            }}
          >
            File Upload Flow
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText("Sample text");
              toast.success("Copied to clipboard");
            }}
          >
            Copy to Clipboard
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast.success("Form published!", {
                description: "Your form is now live and accepting responses",
                action: {
                  label: "Share",
                  onClick: () => toast.info("Opening share dialog..."),
                },
                duration: 7000,
              });
            }}
          >
            Form Published
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast.warning("Connection unstable", {
                description: "Trying to reconnect...",
                duration: 3000,
              });
              setTimeout(() => {
                toast.success("Connection restored");
              }, 3000);
            }}
          >
            Connection Issue
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast.error("Failed to save", {
                description: "Network error. Your changes were not saved.",
                action: {
                  label: "Retry",
                  onClick: () => toast.success("Saved successfully!"),
                },
                duration: 0,
              });
            }}
          >
            Save Error
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast.info("New comment received", {
                description: "John Doe commented on your form",
                action: {
                  label: "View",
                  onClick: () => toast.show("Opening comment..."),
                },
              });
            }}
          >
            Notification
          </Button>
        </div>
      </section>

      {/* Code Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the Toast component in your code
          </p>
        </div>

        <div className="p-6  rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import { toast } from "@/components/ui/Toast";

// Basic usage
toast.success("Saved successfully");

// With description
toast.error("Failed to load", {
  description: "Please check your connection and try again",
});

// With action button
toast.warning("Unsaved changes", {
  description: "You have unsaved changes",
  action: {
    label: "Save",
    onClick: () => saveChanges(),
  },
});

// Custom duration (0 = no auto-dismiss)
toast.info("Processing...", {
  duration: 10000,
  dismissible: false,
});

// Manual dismiss
const toastId = toast.show("Message");
toast.dismiss(toastId);`}</code>
          </pre>
        </div>
      </section>

      {/* API Documentation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">API Reference</h3>
          <p className="text-muted-foreground">
            Available methods and options for the Toast component
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Toast Methods</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-semibold">
                      Method
                    </th>
                    <th className="text-left py-2 pr-4 font-semibold">
                      Parameters
                    </th>
                    <th className="text-left py-2 font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">
                      toast.show()
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs">
                      title, options?
                    </td>
                    <td className="py-3">Display a default toast</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">
                      toast.success()
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs">
                      title, options?
                    </td>
                    <td className="py-3">Display a success toast</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">
                      toast.error()
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs">
                      title, options?
                    </td>
                    <td className="py-3">Display an error toast</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">
                      toast.info()
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs">
                      title, options?
                    </td>
                    <td className="py-3">Display an info toast</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">
                      toast.warning()
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs">
                      title, options?
                    </td>
                    <td className="py-3">Display a warning toast</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">
                      toast.dismiss()
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs">id</td>
                    <td className="py-3">Manually dismiss a toast by ID</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Options</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-semibold">
                      Option
                    </th>
                    <th className="text-left py-2 pr-4 font-semibold">Type</th>
                    <th className="text-left py-2 pr-4 font-semibold">
                      Default
                    </th>
                    <th className="text-left py-2 font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">description</td>
                    <td className="py-3 pr-4 font-mono text-xs">string</td>
                    <td className="py-3 pr-4">-</td>
                    <td className="py-3">Optional description text</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">duration</td>
                    <td className="py-3 pr-4 font-mono text-xs">number</td>
                    <td className="py-3 pr-4 font-mono text-xs">5000</td>
                    <td className="py-3">
                      Auto-dismiss duration in ms (0 = no auto-dismiss)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">dismissible</td>
                    <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                    <td className="py-3 pr-4 font-mono text-xs">true</td>
                    <td className="py-3">
                      Whether the toast can be manually dismissed
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-xs">action</td>
                    <td className="py-3 pr-4 font-mono text-xs">object</td>
                    <td className="py-3 pr-4">-</td>
                    <td className="py-3">
                      Action button with label and onClick handler
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
