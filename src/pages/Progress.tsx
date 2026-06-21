import { useProgressQuery } from '../application/queries/useProgressQuery';
import { useProgressSnapshot } from '../application/snapshots/useProgressSnapshot';
import { SectionHeader } from '../components/ui/SectionHeader';
import { AppCard } from '../components/ui/AppCard';
import { ProgressIndicator } from '../components/ui/ProgressIndicator';
import { Calendar, CheckCircle2, Flame, Award } from 'lucide-react';
import { useDashboardQuery } from '../application/queries/useDashboardQuery';
import { useDashboardSnapshot } from '../application/snapshots/useDashboardSnapshot';

export default function Progress() {
  const rawProgressState = useProgressQuery();
  const progressSnapshot = useProgressSnapshot(rawProgressState);
  const rawState = useDashboardQuery();
  const dashboard = useDashboardSnapshot(rawState);

  const { streakMetrics, dailyCheckIns, completedMissions } = progressSnapshot;
  const completedCount = completedMissions.length;
  const completionRate = streakMetrics.engagementRate;

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        title="My Progress"
        description="Track your journey toward becoming a Climate Champion."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AppCard className="flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-carbon-50 to-white">
          <Flame className="w-8 h-8 text-orange-500 mb-2" />
          <div className="text-3xl font-bold text-gray-900">{streakMetrics.currentStreak}</div>
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">Current Streak</div>
        </AppCard>

        <AppCard className="flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-carbon-50 to-white">
          <Award className="w-8 h-8 text-yellow-500 mb-2" />
          <div className="text-3xl font-bold text-gray-900">{streakMetrics.longestStreak}</div>
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">Longest Streak</div>
        </AppCard>

        <AppCard className="flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-carbon-50 to-white">
          <CheckCircle2 className="w-8 h-8 text-carbon-500 mb-2" />
          <div className="text-3xl font-bold text-gray-900">{completedCount}</div>
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">Missions Completed</div>
        </AppCard>

        <AppCard className="flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-carbon-50 to-white">
          <Calendar className="w-8 h-8 text-blue-500 mb-2" />
          <div className="text-3xl font-bold text-gray-900">{completionRate}%</div>
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">Completion Rate</div>
        </AppCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AppCard>
          <h3 className="font-bold text-gray-900 mb-6 text-lg">Tier Progression</h3>
          {dashboard.scoreOutput && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">Current Tier: {dashboard.scoreOutput.statusLevel}</span>
                  <span className="font-bold text-carbon-700">{dashboard.scoreOutput.carbonHealthScore} / 100</span>
                </div>
                {dashboard.scoreOutput.progressPercentage !== undefined && (
                  <ProgressIndicator
                    value={dashboard.scoreOutput.progressPercentage}
                    label={`Progress to ${dashboard.scoreOutput.nextTier || 'Max'}`}
                  />
                )}
                {dashboard.scoreOutput.pointsToNextTier && (
                  <p className="text-sm text-gray-500 mt-2">
                    {dashboard.scoreOutput.pointsToNextTier} points needed to reach the next tier.
                  </p>
                )}
              </div>
            </div>
          )}
        </AppCard>

        <AppCard>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Check-ins</h3>
          {dailyCheckIns.length > 0 ? (
            <div className="space-y-4">
              {dailyCheckIns.slice(-5).reverse().map(checkin => (
                <div key={checkin.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    {checkin.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-carbon-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {checkin.completed ? 'Mission Completed' : 'Mission Skipped'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(checkin.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No check-ins yet. Complete your first mission!
            </div>
          )}
        </AppCard>
      </div>

    </div>
  );
}
