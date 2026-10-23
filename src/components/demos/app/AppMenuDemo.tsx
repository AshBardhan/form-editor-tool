import { ChevronDown } from "lucide-react";
import {
  AppMenu,
  AppMenuContent,
  AppMenuGroup,
  AppMenuGroupLabel,
  AppMenuItem,
  AppMenuSeparator,
  AppMenuTrigger,
} from "@/design-system/app/AppMenu";
import { DemoBlock, DemoSection } from "@/components/demos/DemoSection";

export function AppMenuDemo() {
  return (
    <DemoSection
      scope="app"
      title="Menu"
      description="Action menu with a themed trigger, items, groups, and separators"
    >
      <div className="flex flex-col gap-6">
        <DemoBlock scope="app" title="Basic">
          <AppMenu>
            <AppMenuTrigger>
              Add to playlist
              <ChevronDown />
            </AppMenuTrigger>
            <AppMenuContent>
              <AppMenuItem>Get Up!</AppMenuItem>
              <AppMenuItem>Inside Out</AppMenuItem>
              <AppMenuItem>Night Beats</AppMenuItem>
              <AppMenuSeparator />
              <AppMenuItem>New playlist…</AppMenuItem>
            </AppMenuContent>
          </AppMenu>
        </DemoBlock>

        <DemoBlock scope="app" title="Grouped">
          <AppMenu>
            <AppMenuTrigger>Account</AppMenuTrigger>
            <AppMenuContent>
              <AppMenuGroup>
                <AppMenuGroupLabel>My Account</AppMenuGroupLabel>
                <AppMenuItem>Profile</AppMenuItem>
                <AppMenuItem>Settings</AppMenuItem>
                <AppMenuItem disabled>Billing</AppMenuItem>
              </AppMenuGroup>
              <AppMenuSeparator />
              <AppMenuItem className="text-app-error">Sign out</AppMenuItem>
            </AppMenuContent>
          </AppMenu>
        </DemoBlock>

        <DemoBlock scope="app" title="Alignment">
          <div className="flex items-center gap-2 flex-wrap">
            <AppMenu>
              <AppMenuTrigger>Align start</AppMenuTrigger>
              <AppMenuContent align="start">
                <AppMenuItem>First action</AppMenuItem>
                <AppMenuItem>Second action</AppMenuItem>
              </AppMenuContent>
            </AppMenu>
            <AppMenu>
              <AppMenuTrigger>Align end</AppMenuTrigger>
              <AppMenuContent align="end">
                <AppMenuItem>First action</AppMenuItem>
                <AppMenuItem>Second action</AppMenuItem>
              </AppMenuContent>
            </AppMenu>
          </div>
        </DemoBlock>
      </div>
    </DemoSection>
  );
}
