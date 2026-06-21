import { useDashboardQuery } from '../application/queries/useDashboardQuery';
import { useDashboardSnapshot } from '../application/snapshots/useDashboardSnapshot';
import { useProgressQuery } from '../application/queries/useProgressQuery';
import { useProgressSnapshot } from '../application/snapshots/useProgressSnapshot';
import { SectionHeader } from '../components/ui/SectionHeader';
import { AppCard } from '../components/ui/AppCard';
import { MetricCard } from '../components/ui/MetricCard';
import { User, Award, Flame, Target, MapPin, Zap, CheckCircle } from 'lucide-react';

export default function Profile() {
  const rawState = useDashboardQuery();
  const dashboard = useDashboardSnapshot(rawState);
  
  const rawProgressState = useProgressQuery();
  const progressSnapshot = useProgressSnapshot(rawProgressState);

  const { profile, assessment } = dashboard.isReady ? rawState : { profile: null, assessment: null };
  const { scoreOutput, footprint, benchmark, forecast } = dashboard;
  const { streakMetrics, completedMissions } = progressSnapshot;

  if (!profile || !assessment || !dashboard.isReady) {
    return <div>Loading Profile...</div>;
  }

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader 
        title="User Profile" 
        description="Your carbon identity, assessment details, and platform statistics." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column - Identity */}
        <div className="md:col-span-1 space-y-6">
          <AppCard className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-carbon-100 text-carbon-600 rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-carbon-50 text-carbon-700 mt-2 border border-carbon-100">
              {scoreOutput.statusLevel}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Joined {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </AppCard>

          <AppCard>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-carbon-500" />
              Initial Assessment
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Motivation</span>
                <span className="font-semibold text-gray-900 capitalize">{profile.motivationLevel}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Transport</span>
                <span className="font-semibold text-gray-900 capitalize">{assessment.primaryTransport.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Diet</span>
                <span className="font-semibold text-gray-900 capitalize">{assessment.meatConsumption.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-500">Household</span>
                <span className="font-semibold text-gray-900">{assessment.householdSize} people</span>
              </div>
            </div>
          </AppCard>
        </div>

        {/* Right Column - Stats */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              title="Carbon Score"
              icon={<Award className="w-5 h-5 text-yellow-500" />}
              value={`${scoreOutput.carbonHealthScore} / 100`}
              subtitle={scoreOutput.nextTier ? `${scoreOutput.pointsToNextTier} points to ${scoreOutput.nextTier}` : 'Max Tier Reached'}
            />
            <MetricCard
              title="Current Footprint"
              icon={<Zap className="w-5 h-5 text-purple-500" />}
              value={`${footprint.totalFootprint} kg`}
              subtitle={`Forecast: -${forecast.projectedReduction} kg`}
            />
            <MetricCard
              title="Missions Completed"
              icon={<CheckCircle className="w-5 h-5 text-carbon-500" />}
              value={completedMissions.length.toString()}
              subtitle={`Total check-ins: ${streakMetrics.totalCheckIns}`}
            />
            <MetricCard
              title="Longest Streak"
              icon={<Flame className="w-5 h-5 text-orange-500" />}
              value={`${streakMetrics.longestStreak} days`}
              subtitle={`Current streak: ${streakMetrics.currentStreak} days`}
            />
          </div>

          <AppCard className="bg-gradient-to-r from-carbon-900 to-carbon-800 text-white border-none">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold font-display mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-carbon-300" />
                  Global Standing
                </h3>
                <p className="text-carbon-200 mb-4 max-w-md">
                  {benchmark.explanation}
                </p>
                <div className="text-3xl font-bold text-white">
                  {benchmark.percentileText}
                </div>
              </div>
            </div>
          </AppCard>
        </div>

      </div>
    </div>
  );
}
