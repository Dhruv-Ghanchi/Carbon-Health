import { SectionHeader } from '../components/ui/SectionHeader';
import { AppCard } from '../components/ui/AppCard';
import { Button } from '../components/ui/Button';
import { Settings as SettingsIcon, Bell, Shield, Database, Trash2, Moon, Sun, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to delete all local data? This action cannot be undone.")) {
      localStorage.clear();
      window.location.href = '/Carbon-Health/#/onboarding';
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader 
        title="Settings" 
        description="Manage your preferences, data, and application settings." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-carbon-50 text-carbon-800 font-bold border border-carbon-100 flex items-center gap-3">
            <SettingsIcon className="w-5 h-5" /> General
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center gap-3">
            <Bell className="w-5 h-5" /> Notifications
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center gap-3">
            <Shield className="w-5 h-5" /> Privacy
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center gap-3">
            <Database className="w-5 h-5" /> Storage
          </button>
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 space-y-6">
          
          <AppCard>
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Sun className="w-5 h-5 text-gray-500" />
              Appearance Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                <div>
                  <div className="font-semibold text-gray-900">Theme Mode</div>
                  <div className="text-sm text-gray-500">Choose between light and dark mode.</div>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${theme === 'light' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <Sun className="w-4 h-4 inline-block mr-1 mb-0.5" /> Light
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${theme === 'dark' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <Moon className="w-4 h-4 inline-block mr-1 mb-0.5" /> Dark
                  </button>
                </div>
              </div>
            </div>
          </AppCard>

          <AppCard>
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Database className="w-5 h-5 text-gray-500" />
              Data & Privacy
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-carbon-600" />
                  <div className="font-semibold text-gray-900">Local-First Storage</div>
                </div>
                <p className="text-sm text-gray-600">
                  Your carbon footprint data, assessment history, and progress are stored entirely on your local device. 
                  No data is transmitted to external servers without your explicit permission.
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                <div>
                  <div className="font-semibold text-gray-900">Progress Notifications</div>
                  <div className="text-sm text-gray-500">Receive reminders for daily check-ins.</div>
                </div>
                <button 
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationsEnabled ? 'bg-carbon-600' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </AppCard>

          <AppCard className="border-red-100 bg-red-50/30">
            <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Permanently delete all your assessment data, active missions, and historical progress. This will reset the application to its initial state.
            </p>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={handleReset}>
              <Trash2 className="w-4 h-4 mr-2" /> Reset Local Data
            </Button>
          </AppCard>

        </div>
      </div>
    </div>
  );
}
