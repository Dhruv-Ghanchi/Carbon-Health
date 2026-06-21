import { useProfileQuery } from '../../application/queries/useProfileQuery';
import { useProfileSnapshot } from '../../application/snapshots/useProfileSnapshot';

export function Header() {
  const rawState = useProfileQuery();
  const { profile } = useProfileSnapshot(rawState);

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
      <div className="flex-1">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-gray-500">
            Welcome back to Carbon Health
          </p>
          <h2 className="text-xl font-bold text-gray-900">
            Carbon Intelligence Dashboard
          </h2>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{profile?.name || 'Guest'}</p>
            <p className="text-xs text-gray-500">Eco Explorer</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-carbon-100 flex items-center justify-center text-carbon-700 font-bold border border-carbon-200">
            {profile?.name?.charAt(0) || 'G'}
          </div>
        </div>
      </div>
    </header>
  );
}
