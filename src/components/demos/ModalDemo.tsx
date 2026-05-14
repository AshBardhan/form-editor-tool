"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

/**
 * Modal Component Demo
 * Showcases various use cases for modal dialogs and overlays
 */
export function ModalDemo() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Modal Component</h2>
        <p className="text-lg text-muted-foreground">
          Display content in a dialog overlay with backdrop, headers, footers,
          and customizable actions.
        </p>
      </div>

      {/* Basic Modal */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Modal</h3>
          <p className="text-muted-foreground">
            Simple modal with form inputs and action buttons
          </p>
        </div>

        <Modal>
          <ModalTrigger asChild>
            <Button variant="outline">Open Modal</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Edit profile</ModalTitle>
              <ModalDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </ModalDescription>
            </ModalHeader>
            <div className="grid gap-4 px-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="modal-name-1">Name</Label>
                <Input
                  id="modal-name-1"
                  name="name"
                  defaultValue="Pedro Duarte"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modal-username-1">Username</Label>
                <Input
                  id="modal-username-1"
                  name="username"
                  defaultValue="@peduarte"
                />
              </div>
            </div>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <Button type="submit">Save changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>

      {/* Modal Sizes */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Modal Sizes</h3>
          <p className="text-muted-foreground">
            Small (384px), Medium (672px, default), and Large (1152px) widths
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Small Modal */}
          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline">Small Modal</Button>
            </ModalTrigger>
            <ModalContent size="sm">
              <ModalHeader>
                <ModalTitle>Small Modal</ModalTitle>
                <ModalDescription>
                  Compact modal for simple confirmations (384px)
                </ModalDescription>
              </ModalHeader>
              <div className="px-6 py-4">
                <p className="text-sm text-muted-foreground">
                  This modal is perfect for quick yes/no confirmations or brief
                  messages.
                </p>
              </div>
              <ModalFooter>
                <ModalClose asChild>
                  <Button variant="outline">Cancel</Button>
                </ModalClose>
                <Button>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Medium Modal */}
          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline">Medium Modal</Button>
            </ModalTrigger>
            <ModalContent size="md">
              <ModalHeader>
                <ModalTitle>Medium Modal (Default)</ModalTitle>
                <ModalDescription>
                  Standard size for forms and content (672px)
                </ModalDescription>
              </ModalHeader>
              <div className="px-6 py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  This is the default modal size, ideal for most use cases
                  including forms, settings, and moderate content.
                </p>
                <div className="grid gap-3">
                  <Input placeholder="Email address" />
                  <Input placeholder="Password" type="password" />
                </div>
              </div>
              <ModalFooter>
                <ModalClose asChild>
                  <Button variant="outline">Cancel</Button>
                </ModalClose>
                <Button>Submit</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Large Modal */}
          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline">Large Modal</Button>
            </ModalTrigger>
            <ModalContent size="lg">
              <ModalHeader>
                <ModalTitle>Large Modal</ModalTitle>
                <ModalDescription>
                  Spacious layout for complex content (1152px)
                </ModalDescription>
              </ModalHeader>
              <div className="px-6 py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Large modals work well for detailed forms, data tables, rich
                  content previews, or any complex interface that needs more
                  screen space.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="modal-large-1">First Name</Label>
                    <Input id="modal-large-1" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="modal-large-2">Last Name</Label>
                    <Input id="modal-large-2" placeholder="Doe" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="modal-large-3">Email</Label>
                    <Input
                      id="modal-large-3"
                      type="email"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                </div>
              </div>
              <ModalFooter>
                <ModalClose asChild>
                  <Button variant="outline">Cancel</Button>
                </ModalClose>
                <Button>Save</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </section>

      {/* Controlled Modal */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Controlled Modal</h3>
          <p className="text-muted-foreground">
            Manage modal state externally with open/onOpenChange props
          </p>
        </div>

        <ControlledModalExample />
      </section>

      {/* Large Content Modal */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Large Content Modal</h3>
          <p className="text-muted-foreground">
            Modal with scrollable content for lengthy information
          </p>
        </div>

        <Modal>
          <ModalTrigger asChild>
            <Button variant="outline">View Terms</Button>
          </ModalTrigger>
          <ModalContent size="md">
            <ModalHeader>
              <ModalTitle>Terms of Service</ModalTitle>
              <ModalDescription>
                Please read our terms carefully before proceeding.
              </ModalDescription>
            </ModalHeader>
            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
              <div className="prose prose-sm dark:prose-invert">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </div>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="outline">Decline</Button>
              </ModalClose>
              <ModalClose asChild>
                <Button>Accept</Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>

      {/* No Close Button Modal */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">No Close Button</h3>
          <p className="text-muted-foreground">
            Force user action by hiding the X button (showClose=false)
          </p>
        </div>

        <Modal>
          <ModalTrigger asChild>
            <Button variant="outline">Confirm Action</Button>
          </ModalTrigger>
          <ModalContent size="sm" showClose={false}>
            <ModalHeader>
              <ModalTitle>Are you absolutely sure?</ModalTitle>
              <ModalDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <ModalClose asChild>
                <Button variant="destructive">Delete Account</Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>
    </div>
  );
}

function ControlledModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Controlled Modal</Button>
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <ModalTitle>Contact Us</ModalTitle>
              <ModalDescription>
                Send us a message and we&apos;ll get back to you soon.
              </ModalDescription>
            </ModalHeader>
            <div className="grid gap-4 px-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="modal-email-1">Email</Label>
                <Input
                  id="modal-email-1"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modal-message-1">Message</Label>
                <textarea
                  id="modal-message-1"
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-950"
                  placeholder="Your message..."
                  required
                />
              </div>
            </div>
            <ModalFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Send Message</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
