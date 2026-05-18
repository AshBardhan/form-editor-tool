"use client";

import Text from "@/components/ui/Text";

/**
 * Text Component Demo
 * Showcases various typography variants and responsive text sizing
 */
export function TextDemo() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Text Component</h2>
        <p className="text-lg text-muted-foreground">
          Responsive typography component with variants for headings and
          paragraphs that adapt to container and viewport sizes.
        </p>
      </div>

      {/* Heading Variants */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Heading Variants</h3>
          <p className="text-muted-foreground">
            Six heading levels with responsive sizing
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Text variant="h1">Heading 1 - Main Title</Text>
            <p className="text-sm text-muted-foreground mt-2">
              Variant: h1 - Largest heading, used for main page titles
            </p>
          </div>

          <div>
            <Text variant="h2">Heading 2 - Section Title</Text>
            <p className="text-sm text-muted-foreground mt-2">
              Variant: h2 - Used for major section headings
            </p>
          </div>

          <div>
            <Text variant="h3">Heading 3 - Subsection Title</Text>
            <p className="text-sm text-muted-foreground mt-2">
              Variant: h3 - Used for subsection headings
            </p>
          </div>

          <div>
            <Text variant="h4">Heading 4 - Minor Section</Text>
            <p className="text-sm text-muted-foreground mt-2">
              Variant: h4 - Used for minor sections
            </p>
          </div>

          <div>
            <Text variant="h5">Heading 5 - Small Heading</Text>
            <p className="text-sm text-muted-foreground mt-2">
              Variant: h5 - Used for small headings
            </p>
          </div>

          <div>
            <Text variant="h6">Heading 6 - Smallest Heading</Text>
            <p className="text-sm text-muted-foreground mt-2">
              Variant: h6 - Smallest heading variant
            </p>
          </div>
        </div>
      </section>

      {/* Paragraph Variants */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Paragraph Variants</h3>
          <p className="text-muted-foreground">Body text and div containers</p>
        </div>

        <div className="space-y-6">
          <div>
            <Text variant="p">
              This is a paragraph element with responsive text sizing. It adapts
              based on the container size and viewport width, providing optimal
              readability across different screen sizes.
            </Text>
            <p className="text-sm text-muted-foreground mt-2">
              Variant: p - Standard paragraph text
            </p>
          </div>

          <div>
            <Text variant="div">
              This is a div element styled as text. Use this when you need a
              generic text container without the semantic meaning of a paragraph
              tag.
            </Text>
            <p className="text-sm text-muted-foreground mt-2">
              Variant: div - Generic text container
            </p>
          </div>
        </div>
      </section>

      {/* Responsive Behavior */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Responsive Behavior</h3>
          <p className="text-muted-foreground">
            Text sizes adapt to viewport and container
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold mb-3">
              Container Query Mode (insideContainer=true)
            </p>
            <div className="border rounded p-4 bg-muted/30">
              <Text variant="h2" insideContainer>
                Responsive Heading
              </Text>
              <Text variant="p" insideContainer className="mt-2">
                This text adapts based on container size using container
                queries. Resize your browser to see it scale smoothly.
              </Text>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">
              Viewport Mode (default)
            </p>
            <div className="border rounded p-4 bg-muted/30">
              <Text variant="h2">Responsive Heading</Text>
              <Text variant="p" className="mt-2">
                This text adapts based on viewport size using standard media
                queries. It provides consistent sizing across the entire
                viewport.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styling */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Custom Styling</h3>
          <p className="text-muted-foreground">Combine with Tailwind classes</p>
        </div>

        <div className="space-y-6">
          <Text variant="h3" className="text-blue-600">
            Colored Heading
          </Text>

          <Text variant="h3" className="text-center">
            Centered Heading
          </Text>

          <Text variant="p" className="text-muted-foreground italic">
            Italic muted paragraph text with custom styling applied through
            className prop.
          </Text>

          <Text variant="h4" className="underline decoration-2">
            Underlined Heading
          </Text>

          <Text variant="p" className="font-bold">
            Bold paragraph text for emphasis
          </Text>
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Real-world Examples</h3>
          <p className="text-muted-foreground">Common text usage patterns</p>
        </div>

        <div className="space-y-8">
          <div>
            <Text variant="h3">Article Layout</Text>
            <Text variant="p" className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text variant="h4" className="mt-6">
              Subsection Heading
            </Text>
            <Text variant="p" className="mt-2">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </div>

          <div>
            <Text variant="h3">Feature Description</Text>
            <Text variant="h5" className="mt-3 text-muted-foreground">
              Powerful and flexible typography system
            </Text>
            <Text variant="p" className="mt-4">
              Our Text component provides a consistent and responsive typography
              system that adapts seamlessly to different screen sizes and
              contexts, ensuring optimal readability across all devices.
            </Text>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <Text variant="p" className="italic">
              &ldquo;This is a blockquote styled with the Text component. Use
              custom borders and padding to create distinctive quote
              layouts.&rdquo;
            </Text>
            <Text variant="p" className="mt-2 text-sm text-muted-foreground">
              — Anonymous
            </Text>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Usage Example</h3>
          <p className="text-muted-foreground">
            How to use the Text component in your code
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-200">
          <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`import Text from "@/components/ui/Text";

// Heading variants
<Text variant="h1">Main Title</Text>
<Text variant="h2">Section Title</Text>
<Text variant="h3">Subsection Title</Text>

// Paragraph
<Text variant="p">
  This is a paragraph of body text.
</Text>

// With custom styling
<Text variant="h2" className="text-blue-600 text-center">
  Styled Heading
</Text>

// Container query mode (adapts to container size)
<Text variant="h2" insideContainer>
  Container-responsive heading
</Text>

// As a div
<Text variant="div">
  Generic text container without semantic meaning
</Text>`}</code>
          </pre>
        </div>
      </section>

      {/* Props Documentation */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Props</h3>
          <p className="text-muted-foreground">
            Available props for the Text component
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
                <td className="py-3 pr-4 font-mono text-xs">variant</td>
                <td className="py-3 pr-4 font-mono text-xs">
                  h1 | h2 | h3 | h4 | h5 | h6 | p | div
                </td>
                <td className="py-3 pr-4 font-mono text-xs">div</td>
                <td className="py-3">The HTML element and style variant</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">insideContainer</td>
                <td className="py-3 pr-4 font-mono text-xs">boolean</td>
                <td className="py-3 pr-4 font-mono text-xs">false</td>
                <td className="py-3">
                  Use container queries instead of viewport queries
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">className</td>
                <td className="py-3 pr-4 font-mono text-xs">string</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">children</td>
                <td className="py-3 pr-4 font-mono text-xs">ReactNode</td>
                <td className="py-3 pr-4">-</td>
                <td className="py-3">Content to render inside the text</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
