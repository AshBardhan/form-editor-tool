/**
 * Admin Settings Page
 * System configuration and settings
 */

import { AppText } from "@/design-system/app/AppText";
import { AppMetric } from "@/design-system/app/AppMetric";

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <AppText variant="h2">System Settings</AppText>
        <AppText variant="p" className="mt-1 text-app-fg-muted">
          Configure platform settings and integrations
        </AppText>
      </div>

      <div className="space-y-6">
        {/* Authentication Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <AppText variant="h3" className="mb-4">
            Authentication
          </AppText>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <AppText variant="h4" className="font-medium">
                  Email Authentication
                </AppText>
                <AppText variant="p">
                  Allow users to sign in with email and password
                </AppText>
              </div>
              <AppText className="font-medium text-app-success">
                Enabled
              </AppText>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <AppText variant="h4" className="font-medium">
                  Session Duration
                </AppText>
                <AppText variant="p">How long users stay logged in</AppText>
              </div>
              <AppText className="font-medium text-app-success">
                30 days
              </AppText>
            </div>
          </div>
        </div>

        {/* Form Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <AppText variant="h3" className="mb-4">
            Form Settings
          </AppText>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <AppText variant="h4" className="font-medium">
                  Public Form Access
                </AppText>
                <AppText variant="p">
                  Allow unauthenticated users to fill forms
                </AppText>
              </div>
              <AppText className="font-medium text-app-success">
                Enabled
              </AppText>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <AppText variant="h4" className="font-medium">
                  Form Analytics
                </AppText>
                <AppText variant="p">
                  Track form views and submission metrics
                </AppText>
              </div>
              <AppText className="font-medium text-app-success">
                Enabled
              </AppText>
            </div>
          </div>
        </div>

        {/* Database Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <AppText variant="h3" className="mb-4">
            Database
          </AppText>
          <div className="flex gap-4">
            <AppMetric value={"PostgreSQL"} label="Provider" />
            <AppMetric value={"Prisma v7.8.0"} label="ORM" />
            <AppMetric value={7} label="Migrations" />
          </div>
        </div>
      </div>
    </div>
  );
}
