"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
} from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";

export function SelectDemo() {
  const [country, setCountry] = React.useState("");
  const [framework, setFramework] = React.useState("react");

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Select Component</h2>
        <p className="text-lg text-muted-foreground">
          Dropdown select menus for choosing from a list of options with support
          for grouping and custom styling.
        </p>
      </div>

      {/* Basic Select */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Select</h3>
          <p className="text-muted-foreground">
            Simple select with a list of options
          </p>
        </div>

        <div className="space-y-3 max-w-xs">
          <Label htmlFor="basic">Choose a fruit</Label>
          <Select>
            <SelectTrigger id="basic">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
              <SelectItem value="mango">Mango</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Controlled Select */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Controlled Select</h3>
          <p className="text-muted-foreground">Select with state management</p>
        </div>

        <div className="space-y-4 max-w-xs">
          <div className="space-y-3">
            <Label htmlFor="controlled">Select Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="controlled">
                <SelectValue placeholder="Choose a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">
            Selected: {country || "(none)"}
          </p>
        </div>
      </section>

      {/* Grouped Select */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Grouped Options</h3>
          <p className="text-muted-foreground">
            Organize options into labeled groups
          </p>
        </div>

        <div className="space-y-3 max-w-xs">
          <Label htmlFor="grouped">Choose a framework</Label>
          <Select value={framework} onValueChange={setFramework}>
            <SelectTrigger id="grouped">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Frontend</SelectLabel>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
              </SelectGroup>

              <SelectSeparator />

              <SelectGroup>
                <SelectLabel>Backend</SelectLabel>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="fastify">Fastify</SelectItem>
                <SelectItem value="nestjs">NestJS</SelectItem>
              </SelectGroup>

              <SelectSeparator />

              <SelectGroup>
                <SelectLabel>Full Stack</SelectLabel>
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="nuxt">Nuxt.js</SelectItem>
                <SelectItem value="remix">Remix</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>
    </div>
  );
}
