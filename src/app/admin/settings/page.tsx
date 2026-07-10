/**
 * Admin Settings Page
 * System configuration and settings
 */

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
        <p className="text-gray-600 mt-1">
          Configure platform settings and integrations
        </p>
      </div>

      <div className="space-y-6">
        {/* Authentication Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Authentication
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="font-medium text-gray-900">
                  Email Authentication
                </div>
                <div className="text-sm text-gray-500">
                  Allow users to sign in with email and password
                </div>
              </div>
              <div className="text-green-600 font-medium">Enabled</div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="font-medium text-gray-900">
                  Session Duration
                </div>
                <div className="text-sm text-gray-500">
                  How long users stay logged in
                </div>
              </div>
              <div className="text-gray-900 font-medium">30 days</div>
            </div>
          </div>
        </div>

        {/* Form Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Form Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="font-medium text-gray-900">
                  Public Form Access
                </div>
                <div className="text-sm text-gray-500">
                  Allow unauthenticated users to fill forms
                </div>
              </div>
              <div className="text-green-600 font-medium">Enabled</div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="font-medium text-gray-900">Form Analytics</div>
                <div className="text-sm text-gray-500">
                  Track form views and submission metrics
                </div>
              </div>
              <div className="text-green-600 font-medium">Enabled</div>
            </div>
          </div>
        </div>

        {/* Database Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Database</h3>
          <div className="space-y-2">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Provider</span>
              <span className="font-medium text-gray-900">PostgreSQL</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">ORM</span>
              <span className="font-medium text-gray-900">Prisma v7.8.0</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Migrations</span>
              <span className="font-medium text-gray-900">7 applied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
