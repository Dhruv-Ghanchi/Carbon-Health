import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Lightbulb, Calendar, User, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Insights', href: '/insights', icon: Lightbulb },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
  { name: 'Weekly Review', href: '/weekly-review', icon: Calendar },
];

const secondaryNavigation = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="text-xl font-bold font-display text-carbon-800">Carbon Health</div>
      </div>
      
      <div className="flex flex-col flex-grow px-4 mt-6 overflow-y-auto">
        <nav className="flex-1 space-y-1">
          <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main</p>
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive ? 'bg-carbon-50 text-carbon-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-xl transition-colors'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-carbon-600' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-5 w-5 transition-colors'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <nav className="mt-8 mb-6 space-y-1">
          <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Account</p>
          {secondaryNavigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive ? 'bg-carbon-50 text-carbon-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-xl transition-colors'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-carbon-600' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-5 w-5 transition-colors'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
