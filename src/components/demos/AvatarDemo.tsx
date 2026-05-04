"use client";

import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

export function AvatarDemo() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-3">Avatar Component</h2>
        <p className="text-lg text-muted-foreground">
          Display user profile images with automatic fallback text for missing
          images.
        </p>
      </div>

      {/* Basic Avatar */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Basic Avatar</h3>
          <p className="text-muted-foreground">
            Avatar with image and fallback
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">@shadcn</p>
            <p className="text-sm text-muted-foreground">With image</p>
          </div>
        </div>
      </section>

      {/* Fallback Avatar */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Fallback Avatar</h3>
          <p className="text-muted-foreground">
            When image fails to load, fallback text is shown
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/invalid-url.png" alt="Invalid" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Alex Brown</p>
            <p className="text-sm text-muted-foreground">
              Fallback initials shown
            </p>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Different Sizes</h3>
          <p className="text-muted-foreground">
            Avatars in various sizes using className
          </p>
        </div>

        <div className="flex items-center gap-6 flex-wrap">
          <div className="text-center">
            <Avatar className="h-8 w-8 mb-2">
              <AvatarFallback className="text-xs">XS</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground">Extra Small</p>
          </div>

          <div className="text-center">
            <Avatar className="h-10 w-10 mb-2">
              <AvatarFallback className="text-sm">SM</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground">Small</p>
          </div>

          <div className="text-center">
            <Avatar className="h-12 w-12 mb-2">
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground">Medium</p>
          </div>

          <div className="text-center">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarFallback className="text-lg">LG</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground">Large</p>
          </div>

          <div className="text-center">
            <Avatar className="h-20 w-20 mb-2">
              <AvatarFallback className="text-xl">XL</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground">Extra Large</p>
          </div>
        </div>
      </section>

      {/* Avatar Group */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Avatar Group</h3>
          <p className="text-muted-foreground">
            Multiple avatars displayed together
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Team Members</h4>
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-background">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Member 1"
                />
                <AvatarFallback>M1</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback>M2</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback>M3</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback>M4</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback className="text-xs">+5</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">With Spacing</h4>
            <div className="flex gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* Remaining sections unchanged */}
    </div>
  );
}
