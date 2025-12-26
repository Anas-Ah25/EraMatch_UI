import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Bell, Mail, Lock, User, Palette, Globe } from 'lucide-react';

interface AdminSettingsProps {
  onSignOut: () => void;
}

export function AdminSettings({ onSignOut }: AdminSettingsProps) {
  return (
    <div className="px-12 py-8">
      <div className="mb-8">
        <h2 className="text-gray-700 mb-2">Settings</h2>
        <p className="text-gray-600 text-sm">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EEF2FF' }}>
              <User className="w-5 h-5" style={{ color: '#6366F1' }} />
            </div>
            <div>
              <h3 className="text-gray-700">Profile Settings</h3>
              <p className="text-gray-500 text-sm">Manage your personal information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="John" 
                  defaultValue="Admin"
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe" 
                  defaultValue="User"
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                defaultValue="admin@eramatch.com"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input 
                id="role" 
                placeholder="Administrator" 
                defaultValue="System Administrator"
                disabled
                className="rounded-lg bg-gray-50"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button 
              className="text-white rounded-full px-6"
              style={{ backgroundColor: '#6366F1' }}
            >
              Save Changes
            </Button>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EEF2FF' }}>
              <Bell className="w-5 h-5" style={{ color: '#6366F1' }} />
            </div>
            <div>
              <h3 className="text-gray-700">Notification Preferences</h3>
              <p className="text-gray-500 text-sm">Choose what notifications you receive</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-700">Email Notifications</p>
                <p className="text-gray-500 text-sm">Receive notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-700">New Member Requests</p>
                <p className="text-gray-500 text-sm">Get notified when new members request to join</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-700">Project Updates</p>
                <p className="text-gray-500 text-sm">Receive updates about project changes</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-gray-700">Weekly Summary</p>
                <p className="text-gray-500 text-sm">Get a weekly summary of activities</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EEF2FF' }}>
              <Lock className="w-5 h-5" style={{ color: '#6366F1' }} />
            </div>
            <div>
              <h3 className="text-gray-700">Security Settings</h3>
              <p className="text-gray-500 text-sm">Manage your security preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-700">Two-Factor Authentication</p>
                <p className="text-gray-500 text-sm">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-700">Session Timeout</p>
                <p className="text-gray-500 text-sm">Auto-logout after 30 minutes of inactivity</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="py-3">
              <Button 
                variant="outline"
                className="rounded-full px-6"
              >
                Change Password
              </Button>
            </div>
          </div>
        </Card>

        {/* Appearance Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EEF2FF' }}>
              <Palette className="w-5 h-5" style={{ color: '#6366F1' }} />
            </div>
            <div>
              <h3 className="text-gray-700">Appearance</h3>
              <p className="text-gray-500 text-sm">Customize the look and feel</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-gray-700">Dark Mode</p>
                <p className="text-gray-500 text-sm">Use dark theme</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-gray-700">Compact View</p>
                <p className="text-gray-500 text-sm">Show more content on screen</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Organization Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EEF2FF' }}>
              <Globe className="w-5 h-5" style={{ color: '#6366F1' }} />
            </div>
            <div>
              <h3 className="text-gray-700">Organization Settings</h3>
              <p className="text-gray-500 text-sm">Manage organization-wide settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input 
                id="orgName" 
                placeholder="Organization Name" 
                defaultValue="ERAMATCH"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgEmail">Organization Email</Label>
              <Input 
                id="orgEmail" 
                type="email" 
                placeholder="contact@organization.com" 
                defaultValue="contact@eramatch.com"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select 
                id="timezone"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ focusRingColor: '#6366F1' }}
              >
                <option>UTC-08:00 (Pacific Time)</option>
                <option>UTC-05:00 (Eastern Time)</option>
                <option>UTC+00:00 (GMT)</option>
                <option>UTC+01:00 (Central European Time)</option>
                <option>UTC+08:00 (Singapore Time)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button 
              className="text-white rounded-full px-6"
              style={{ backgroundColor: '#6366F1' }}
            >
              Update Organization
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
